import { describe, expect, it, vi } from "vitest";
import { DEFAULT_KPIS } from "./constants";

const storageMock = vi.hoisted(() => ({ getItem: vi.fn(), setItem: vi.fn(), removeItem: vi.fn() }));
vi.mock("@react-native-async-storage/async-storage", () => ({ default: storageMock }));

import { createDefaultData, makeBackup, parseBackup, sanitizeTargetData } from "./storage";
import type { Achievement, LocalProfile } from "./types";

const profile: LocalProfile = { username: "mariam", employee: "مريم", branch: "وسط البلد" };
const entry: Achievement = {
  id: "2026-10-05T09:30:12.123Z",
  createdAt: "2026-10-05T09:30:12.123Z",
  kpiId: "lines",
  qty: 4,
  date: "2026-10-05",
  note: "",
};

function backup() {
  const data = createDefaultData(profile.employee, profile.branch);
  data.entries = [{ ...entry }];
  return makeBackup(profile, data, new Date("2026-10-18T10:00:00.000Z"));
}

describe("TargetX backup validation", () => {
  it("accepts a complete backup with a canonical ISO entry id", () => {
    expect(parseBackup(backup())?.entries).toEqual([entry]);
  });

  it("rejects duplicate createdAt/id values before restoring", () => {
    const value = backup();
    value.entries.push({ ...entry, qty: 8 });
    expect(parseBackup(value)).toBeNull();
  });

  it("rejects a parseable but non-canonical timestamp", () => {
    const value = backup();
    value.entries[0]!.createdAt = "2026-10-05";
    value.entries[0]!.id = "2026-10-05";
    expect(parseBackup(value)).toBeNull();
  });

  it("deduplicates corrupt local data while sanitizing it", () => {
    const data = createDefaultData(profile.employee, profile.branch);
    const sanitized = sanitizeTargetData({ settings: data.settings, entries: [{ ...entry }, { ...entry, qty: 12 }] });
    expect(sanitized.entries).toHaveLength(1);
  });

  it("migrates old KPI labels to Arabic while preserving user targets", () => {
    const data = createDefaultData(profile.employee, profile.branch);
    data.settings.kpis[0] = { ...data.settings.kpis[0]!, name: "New Lines", target: 190 };
    const sanitized = sanitizeTargetData(data);
    expect(sanitized.settings.kpis[0]).toMatchObject({ name: DEFAULT_KPIS[0]!.name, target: 190, weight: 40 });
    expect(sanitized.settings.kpis[0]!.name).toBe("الخطوط الجديدة");
  });
});
