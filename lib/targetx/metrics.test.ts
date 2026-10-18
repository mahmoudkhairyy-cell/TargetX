import { describe, expect, it } from "vitest";
import { DEFAULT_KPIS } from "./constants";
import { summarizeTarget } from "./metrics";
import type { TargetData } from "./types";

function data(month = "2026-10", entries: TargetData["entries"] = []): TargetData {
  return {
    settings: { employee: "مريم", branch: "وسط البلد", month, kpis: DEFAULT_KPIS.map((item) => ({ ...item })) },
    entries,
  };
}

function entry(kpiId: TargetData["entries"][number]["kpiId"], qty: number, day: string): TargetData["entries"][number] {
  const createdAt = `${day}T10:00:00.000Z`;
  return { id: createdAt, createdAt, kpiId, qty, date: day, note: "" };
}

describe("TargetX monthly calculations", () => {
  it("keeps the default KPI weights at 100%", () => {
    expect(DEFAULT_KPIS.reduce((sum, item) => sum + item.weight, 0)).toBe(100);
  });

  it("computes month totals, weighted score, and current-month pace", () => {
    const result = summarizeTarget(data("2026-10", [entry("lines", 90, "2026-10-01"), entry("wallets", 80, "2026-10-03")]), new Date(2026, 9, 18));
    const lines = result.kpis.find((item) => item.id === "lines");
    expect(lines?.achieved).toBe(90);
    expect(lines?.remaining).toBe(85);
    expect(result.totalWeight).toBe(100);
    expect(result.pace.remainingWorkdays).toBe(13);
    expect(result.pace.expectedPct).toBeCloseTo((18 / 31) * 100);
    expect(result.pace.onTrack).toBe(false);
    expect(result.walletCompliance).toBe(true);
  });

  it("flags wallets below 90% of line achievement percentage", () => {
    const result = summarizeTarget(data("2026-10", [entry("lines", 100, "2026-10-01"), entry("wallets", 30, "2026-10-03")]), new Date(2026, 9, 18));
    expect(result.walletCompliance).toBe(false);
  });

  it("marks an unachieved past target month as ended", () => {
    const result = summarizeTarget(data("2026-09"), new Date(2026, 9, 18));
    expect(result.pace.monthEnded).toBe(true);
    expect(result.pace.remainingWorkdays).toBe(0);
  });

  it("filters records outside the selected month and lets every overachievement count without a cap", () => {
    const doubled = DEFAULT_KPIS.map((kpi) => entry(kpi.id, kpi.target * 2, "2026-10-02"));
    doubled.push(entry("points", 5000, "2026-09-30"));
    const result = summarizeTarget(data("2026-10", doubled), new Date(2026, 9, 18));
    const lines = result.kpis.find((item) => item.id === "lines");
    const points = result.kpis.find((item) => item.id === "points");
    expect(lines?.pct).toBe(200);
    expect(lines?.remaining).toBe(0);
    expect(points?.achieved).toBe(DEFAULT_KPIS.find((item) => item.id === "points")?.target! * 2);
    expect(result.weightedScore).toBe(200);
  });
});
