import bundledSRData from "../../sr-data.js";
import {
  ORANGE_DOCS,
  ORANGE_DSL_OFFER_NOTE,
  ORANGE_DSL_ROUTERS,
  ORANGE_EMAILS,
  ORANGE_FREEMAX,
  ORANGE_HUNTS,
  ORANGE_PLAN_GROUPS,
} from "./orangeResources";

export type SRRecord = {
  c: string;
  ta: string;
  te: string;
  k: string;
  da: string;
  r: boolean;
  steps: string;
};

export type SRKnowledge = {
  code: string;
  title: string;
  titleEn: string;
  category: string;
  description: string;
  steps: string;
};

export type LocalKnowledge = {
  section: string;
  title: string;
  category: string;
  content: string;
  code?: string;
};

export const SR_SOURCE = "Orange SR Encyclopedia · لقطة محلية 18 أكتوبر 2026";
export const LOCAL_REFERENCE_SNAPSHOT = "2026-10-18";

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function text(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return "";
}

function serialize(value: unknown): string {
  if (Array.isArray(value)) return value.map(serialize).filter(Boolean).join(" · ");
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .map(([key, nested]) => {
        const content = serialize(nested);
        return content ? `${key}: ${content}` : "";
      }).filter(Boolean).join(" · ");
  }
  return text(value);
}

function asRecords(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? value.filter((item) => item && typeof item === "object" && !Array.isArray(item)).map(asRecord) : [];
}

export function getSRRecords(): SRRecord[] {
  const source: unknown = bundledSRData;
  if (!Array.isArray(source)) return [];
  const seen = new Set<string>();
  const records: SRRecord[] = [];
  for (const value of source) {
    if (!value || typeof value !== "object") continue;
    const item = value as Record<string, unknown>;
    const code = typeof item.c === "string" ? item.c : "";
    if (!code || seen.has(code) || typeof item.te !== "string" || typeof item.k !== "string") continue;
    seen.add(code);
    records.push({
      c: code,
      ta: typeof item.ta === "string" ? item.ta : "",
      te: item.te,
      k: item.k,
      da: typeof item.da === "string" ? item.da : "",
      r: item.r === true,
      steps: typeof item.steps === "string" ? item.steps : "",
    });
  }
  return records;
}

const stopWords = new Set(["من", "في", "عن", "على", "الى", "إلى", "ايه", "إيه", "ازاي", "إزاي", "كام", "مع", "هو", "هي", "the", "and", "for", "how", "what"]);

function normalizeSearch(value: string): string {
  return value.normalize("NFKC").toLocaleLowerCase()
    .replace(/[\u064b-\u065f\u0670\u0640]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/[ى]/g, "ي")
    .replace(/[^\u0600-\u06ffa-z0-9]+/gi, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function searchSRRecords(query: string, limit = 5): SRKnowledge[] {
  const normalized = normalizeSearch(query);
  if (!normalized) return [];
  const tokens = normalized.split(" ").filter((token) => token.length > 1 && !stopWords.has(token));
  const scored = getSRRecords().map((record) => {
    const code = normalizeSearch(record.c);
    const fields = [
      { value: normalizeSearch(record.ta), weight: 45 },
      { value: normalizeSearch(record.te), weight: 40 },
      { value: normalizeSearch(record.k), weight: 22 },
      { value: normalizeSearch(record.da), weight: 12 },
      { value: normalizeSearch(record.steps), weight: 8 },
    ];
    let score = code === normalized ? 1000 : code.includes(normalized) ? 200 : 0;
    for (const field of fields) {
      if (field.value.includes(normalized)) score += field.weight;
      for (const token of tokens) if (field.value.includes(token)) score += Math.ceil(field.weight / Math.max(1, tokens.length));
    }
    if (tokens.some((token) => code.includes(token))) score += 120;
    return { record, score };
  }).filter((item) => item.score > 0);
  scored.sort((a, b) => b.score - a.score || a.record.c.localeCompare(b.record.c));
  return scored.slice(0, Math.max(0, Math.min(5, limit))).map(({ record }) => ({
    code: record.c,
    title: record.ta || record.te,
    titleEn: record.te,
    category: record.k,
    description: record.da.slice(0, 500),
    steps: record.steps.slice(0, 1200),
  }));
}

function buildLocalKnowledge(): LocalKnowledge[] {
  const records: LocalKnowledge[] = getSRRecords().map((record) => ({
    section: "SR",
    title: record.ta || record.te,
    category: record.k,
    code: record.c,
    content: `SR #${record.c} · ${record.te} · ${record.ta} · ${record.k} · ${record.da} · ${record.steps}`.trim(),
  }));

  for (const item of asRecords(ORANGE_HUNTS)) {
    const title = text(item.name) || text(item.number);
    records.push({ section: "جهات الاتصال والتحويلات", title, category: text(item.type), content: serialize(item) });
  }
  for (const item of asRecords(ORANGE_EMAILS)) {
    records.push({ section: "البريد الإلكتروني", title: text(item.name) || text(item.email), category: text(item.description), content: serialize(item) });
  }
  for (const group of asRecords(ORANGE_PLAN_GROUPS)) {
    const category = text(group.category) || "Plans";
    for (const plan of asRecords(group.plans)) {
      records.push({ section: "الباقات", title: text(plan.name) || category, category, content: `${category} · ${serialize(plan)}` });
    }
  }
  records.push({ section: "Home DSL", title: "خصم العملاء الجدد", category: "العروض", content: ORANGE_DSL_OFFER_NOTE });
  for (const item of asRecords(ORANGE_DSL_ROUTERS)) {
    records.push({ section: "راوترات VDSL", title: text(item.name), category: "Home DSL", content: serialize(item) });
  }

  const freemax = asRecord(ORANGE_FREEMAX);
  const highlights = Array.isArray(freemax.highlights) ? freemax.highlights : [];
  records.push({
    section: "FreeMax",
    title: "FreeMax · معلومات عامة",
    category: "نظرة عامة",
    content: serialize({ tagline: freemax.tagline, simPrice: freemax.simPrice, highlights }),
  });
  for (const item of asRecords(freemax.globalPerks)) {
    records.push({ section: "FreeMax", title: text(item.label) || "FreeMax perk", category: "مميزات عامة", content: serialize(item) });
  }
  for (const item of asRecords(freemax.plans)) {
    records.push({ section: "FreeMax", title: text(item.nameAr) || text(item.name) || "FreeMax plan", category: "باقات FreeMax", content: serialize(item) });
  }
  if (Object.keys(asRecord(freemax.weekly)).length) {
    const weekly = asRecord(freemax.weekly);
    records.push({ section: "FreeMax", title: text(weekly.nameAr) || text(weekly.name) || "FreeMax weekly", category: "أسبوعي", content: serialize(weekly) });
  }

  for (const item of asRecords(ORANGE_DOCS)) {
    records.push({ section: "Hub Docs", title: text(item.title) || "Hub document", category: "مستندات Hub", content: serialize(item) });
  }
  return records.filter((item) => item.title && item.content);
}

const localKnowledge = buildLocalKnowledge();

export function searchLocalKnowledge(query: string, limit = 5): LocalKnowledge[] {
  const normalized = normalizeSearch(query);
  if (!normalized) return [];
  const tokens = normalized.split(" ").filter((token) => token.length > 1 && !stopWords.has(token)).slice(0, 12);
  const scored = localKnowledge.map((record) => {
    const code = normalizeSearch(record.code ?? "");
    const title = normalizeSearch(record.title);
    const category = normalizeSearch(record.category);
    const section = normalizeSearch(record.section);
    const content = normalizeSearch(record.content);
    let score = code && code === normalized ? 2000 : code && code.includes(normalized) ? 300 : 0;
    if (title.includes(normalized)) score += 100;
    if (category.includes(normalized)) score += 45;
    if (section.includes(normalized)) score += 25;
    if (content.includes(normalized)) score += 12;
    for (const token of tokens) {
      if (title.includes(token)) score += 45;
      if (category.includes(token)) score += 24;
      if (section.includes(token)) score += 14;
      if (content.includes(token)) score += 8;
    }
    return { record, score };
  }).filter((item) => item.score > 0);
  scored.sort((a, b) => b.score - a.score || a.record.section.localeCompare(b.record.section) || a.record.title.localeCompare(b.record.title));
  return scored.slice(0, Math.max(0, Math.min(5, limit))).map(({ record }) => ({
    ...record,
    content: record.content.slice(0, 1800),
  }));
}
