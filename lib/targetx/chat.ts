import type { ChatMessage, TargetSummary, TargetData } from "./types";
import { localISODate } from "./constants";
import { getApiBaseUrl } from "@/constants/oauth";
import { searchLocalKnowledge, type LocalKnowledge } from "./sr";

export type AssistantContext = {
  employee: string;
  branch: string;
  month: string;
  today: string;
  kpis: { name: string; achieved: number; target: number; pct: number; weight: number }[];
  weightedScore: number;
  pace: { remainingWorkdays: number; requiredPerDay: number; expectedPct: number; onTrack: boolean };
  recentEntries: { product: string; qty: number; date: string; note: string }[];
  knowledge: LocalKnowledge[];
};

export function buildAssistantContext(data: TargetData, summary: TargetSummary, question = ""): AssistantContext {
  return {
    employee: data.settings.employee,
    branch: data.settings.branch,
    month: data.settings.month,
    today: localISODate(),
    kpis: summary.kpis.map(({ name, achieved, target, pct, weight }) => ({ name, achieved, target, pct, weight })),
    weightedScore: summary.weightedScore,
    pace: {
      remainingWorkdays: summary.pace.remainingWorkdays,
      requiredPerDay: summary.pace.requiredPerDay,
      expectedPct: summary.pace.expectedPct,
      onTrack: summary.pace.onTrack,
    },
    recentEntries: data.entries
      .filter((entry) => entry.date.startsWith(data.settings.month))
      .slice()
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 4)
      .map((entry) => ({
        product: data.settings.kpis.find((kpi) => kpi.id === entry.kpiId)?.name ?? entry.kpiId,
        qty: entry.qty,
        date: entry.date,
        note: entry.note,
      })),
    knowledge: searchLocalKnowledge(question, 5),
  };
}

export type AssistantAvailability = "checking" | "ready" | "not_configured" | "offline";

export async function checkAssistantAvailability(): Promise<Exclude<AssistantAvailability, "checking">> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);
  try {
    const response = await fetch(`${apiBase}/api/health`, { signal: controller.signal });
    if (!response.ok) return "offline";
    const result = (await response.json()) as { assistantConfigured?: unknown };
    return result.assistantConfigured === true ? "ready" : "not_configured";
  } catch {
    return "offline";
  } finally {
    clearTimeout(timer);
  }
}

export type ChatFailure = "timeout" | "offline" | "failed" | "setup";
export class AssistantRequestError extends Error {
  constructor(public readonly kind: ChatFailure) {
    super(kind);
  }
}

const apiBase = getApiBaseUrl();

export async function requestAssistantReply(
  message: string,
  history: ChatMessage[],
  context: AssistantContext,
): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20_000);
  try {
    const response = await fetch(`${apiBase}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message.slice(0, 500), history: history.slice(-10), context }),
      signal: controller.signal,
    });
    const result = (await response.json().catch(() => null)) as { reply?: unknown; error?: unknown } | null;
    if (!response.ok) {
      if (response.status === 503 && result?.error === "assistant_not_configured") throw new AssistantRequestError("setup");
      throw new AssistantRequestError("failed");
    }
    if (typeof result?.reply !== "string" || !result.reply.trim()) throw new AssistantRequestError("failed");
    return result.reply;
  } catch (error) {
    if (error instanceof AssistantRequestError) throw error;
    if (controller.signal.aborted) throw new AssistantRequestError("timeout");
    if (error instanceof TypeError) throw new AssistantRequestError("offline");
    throw new AssistantRequestError("failed");
  } finally {
    clearTimeout(timer);
  }
}
