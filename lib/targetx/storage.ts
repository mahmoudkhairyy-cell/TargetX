import AsyncStorage from "@react-native-async-storage/async-storage";
import { currentMonth, DATA_KEY, DEFAULT_KPIS, SESSION_KEY, USERS_KEY, isKpiId } from "./constants";
import type { Achievement, BackupFile, KpiSetting, LocalProfile, TargetData } from "./types";

const safeProfile = (value: unknown): value is LocalProfile => {
  if (!value || typeof value !== "object") return false;
  const profile = value as Partial<LocalProfile>;
  return typeof profile.username === "string" && typeof profile.employee === "string" && typeof profile.branch === "string";
};

export const normalizeUsername = (value: string) => value.trim().replace(/\s+/g, " ").toLowerCase();
const profileKey = (username: string) => `${DATA_KEY}_${encodeURIComponent(normalizeUsername(username))}`;

function isIsoTimestamp(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const timestamp = Date.parse(value);
  return !Number.isNaN(timestamp) && new Date(timestamp).toISOString() === value;
}

export function createDefaultData(employee = "", branch = ""): TargetData {
  return {
    settings: { employee, branch, month: currentMonth(), kpis: DEFAULT_KPIS.map((kpi) => ({ ...kpi })) },
    entries: [],
  };
}

function sanitizeKpis(value: unknown): KpiSetting[] {
  const source = Array.isArray(value) ? value : [];
  const byId = new Map(source.filter((item): item is KpiSetting => !!item && typeof item === "object" && isKpiId((item as KpiSetting).id)).map((item) => [item.id, item]));
  return DEFAULT_KPIS.map((defaultKpi) => {
    const saved = byId.get(defaultKpi.id);
    return {
      ...defaultKpi,
      ...(saved && typeof saved === "object" ? saved : {}),
      id: defaultKpi.id,
      name: defaultKpi.name,
      icon: defaultKpi.icon,
      weight: defaultKpi.weight,
      unit: defaultKpi.unit,
      target: Number.isFinite(Number(saved?.target)) && Number(saved?.target) >= 0 ? Number(saved?.target) : defaultKpi.target,
    };
  });
}

function isValidCalendarDate(value: string): boolean {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return false;
  const [, year, month, day] = match;
  const parsed = new Date(Number(year), Number(month) - 1, Number(day));
  return Number(year) > 0 && parsed.getFullYear() === Number(year) && parsed.getMonth() + 1 === Number(month) && parsed.getDate() === Number(day);
}

function sanitizeEntry(value: unknown): Achievement | null {
  if (!value || typeof value !== "object") return null;
  const entry = value as Partial<Achievement>;
  if (!isKpiId(entry.kpiId) || !Number.isFinite(Number(entry.qty)) || Number(entry.qty) <= 0 || typeof entry.date !== "string" || !isValidCalendarDate(entry.date)) return null;
  const createdAt = isIsoTimestamp(entry.createdAt) ? entry.createdAt : isIsoTimestamp(entry.id) ? entry.id : "";
  if (!createdAt) return null;
  return {
    id: createdAt,
    createdAt,
    kpiId: entry.kpiId,
    qty: Number(entry.qty),
    date: entry.date,
    note: typeof entry.note === "string" ? entry.note.slice(0, 120) : "",
  };
}

function sanitizeEntries(value: unknown): Achievement[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  const entries: Achievement[] = [];
  for (const item of value) {
    const entry = sanitizeEntry(item);
    if (!entry || seen.has(entry.createdAt)) continue;
    seen.add(entry.createdAt);
    entries.push(entry);
  }
  return entries;
}

export function sanitizeTargetData(value: unknown, profile?: LocalProfile): TargetData {
  if (!value || typeof value !== "object") return createDefaultData(profile?.employee, profile?.branch);
  const raw = value as Partial<TargetData>;
  const rawSettings = raw.settings && typeof raw.settings === "object" ? raw.settings : {};
  const settings = rawSettings as Partial<TargetData["settings"]>;
  const month = typeof settings.month === "string" && /^\d{4}-(0[1-9]|1[0-2])$/.test(settings.month) ? settings.month : currentMonth();
  return {
    settings: {
      employee: typeof settings.employee === "string" ? settings.employee.slice(0, 60) : profile?.employee ?? "",
      branch: typeof settings.branch === "string" ? settings.branch.slice(0, 60) : profile?.branch ?? "",
      month,
      kpis: sanitizeKpis(settings.kpis),
    },
    entries: sanitizeEntries(raw.entries),
  };
}

export async function getProfiles(): Promise<LocalProfile[]> {
  try {
    const raw = await AsyncStorage.getItem(USERS_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter(safeProfile) : [];
  } catch {
    return [];
  }
}

export async function signInOrRegister(profile: LocalProfile): Promise<{ ok: true; profile: LocalProfile; data: TargetData } | { ok: false }> {
  const username = normalizeUsername(profile.username);
  const normalized = { ...profile, username, employee: profile.employee.trim(), branch: profile.branch.trim() };
  if (!username || !normalized.employee || !normalized.branch) return { ok: false };
  const profiles = await getProfiles();
  const existing = profiles.find((item) => item.username === username);
  if (existing && (existing.employee !== normalized.employee || existing.branch !== normalized.branch)) return { ok: false };
  const savedProfile = existing ?? normalized;
  if (!existing) await AsyncStorage.setItem(USERS_KEY, JSON.stringify([...profiles, savedProfile]));
  const dataKey = profileKey(username);
  let data: TargetData;
  try {
    const raw = await AsyncStorage.getItem(dataKey);
    data = sanitizeTargetData(raw ? JSON.parse(raw) : null, savedProfile);
  } catch {
    data = createDefaultData(savedProfile.employee, savedProfile.branch);
  }
  await AsyncStorage.setItem(dataKey, JSON.stringify(data));
  await AsyncStorage.setItem(SESSION_KEY, username);
  return { ok: true, profile: savedProfile, data };
}

export async function resumeSession(): Promise<{ profile: LocalProfile; data: TargetData } | null> {
  try {
    const username = await AsyncStorage.getItem(SESSION_KEY);
    if (!username) return null;
    const profile = (await getProfiles()).find((item) => item.username === username);
    if (!profile) return null;
    const raw = await AsyncStorage.getItem(profileKey(username));
    const data = sanitizeTargetData(raw ? JSON.parse(raw) : null, profile);
    await AsyncStorage.setItem(profileKey(username), JSON.stringify(data));
    return { profile, data };
  } catch {
    return null;
  }
}

export async function persistData(profile: LocalProfile, data: TargetData): Promise<void> {
  await AsyncStorage.setItem(profileKey(profile.username), JSON.stringify(data));
}

export async function endSession(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_KEY);
}

export function makeBackup(profile: LocalProfile, data: TargetData, exportedAt = new Date()): BackupFile {
  return {
    app: "TargetX",
    owner: profile.employee,
    exportedAt: exportedAt.toISOString(),
    settings: data.settings,
    entries: data.entries,
  };
}

export function parseBackup(value: unknown): TargetData | null {
  if (!value || typeof value !== "object") return null;
  const backup = value as Partial<BackupFile>;
  if (backup.app !== "TargetX" || typeof backup.owner !== "string" || !isIsoTimestamp(backup.exportedAt) || !backup.settings || !Array.isArray(backup.entries)) return null;
  const settings = backup.settings as Partial<TargetData["settings"]>;
  if (typeof settings.employee !== "string" || typeof settings.branch !== "string" || backup.owner !== settings.employee || typeof settings.month !== "string" || !/^\d{4}-(0[1-9]|1[0-2])$/.test(settings.month) || !Array.isArray(settings.kpis) || settings.kpis.length !== DEFAULT_KPIS.length) return null;
  const kpiIds = new Set<string>();
  for (const value of settings.kpis) {
    if (!value || typeof value !== "object") return null;
    const kpi = value as Partial<KpiSetting>;
    const original = DEFAULT_KPIS.find((item) => item.id === kpi.id);
    if (!original || kpiIds.has(original.id) || typeof kpi.target !== "number" || !Number.isFinite(kpi.target) || kpi.target < 0 || kpi.weight !== original.weight) return null;
    kpiIds.add(original.id);
  }
  const entryIds = new Set<string>();
  for (const value of backup.entries) {
    if (!value || typeof value !== "object") return null;
    const entry = value as Partial<Achievement>;
    if (typeof entry.id !== "string" || typeof entry.createdAt !== "string" || entry.id !== entry.createdAt || !isIsoTimestamp(entry.createdAt) || entryIds.has(entry.id) || !isKpiId(entry.kpiId) || typeof entry.qty !== "number" || !Number.isFinite(entry.qty) || entry.qty <= 0 || typeof entry.date !== "string" || !isValidCalendarDate(entry.date) || typeof entry.note !== "string" || entry.note.length > 120) return null;
    entryIds.add(entry.id);
  }
  const data = sanitizeTargetData({ settings: backup.settings, entries: backup.entries });
  if (!data.settings.month || data.settings.kpis.length !== DEFAULT_KPIS.length || kpiIds.size !== DEFAULT_KPIS.length) return null;
  return data;
}


export async function updateLocalProfile(profile: LocalProfile): Promise<void> {
  const username = normalizeUsername(profile.username);
  const profiles = await getProfiles();
  const next = profiles.map((item) => item.username === username ? { ...profile, username } : item);
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(next));
}
