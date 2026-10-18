export type KpiId = "lines" | "wallets" | "existing" | "points" | "postpaid" | "dsl" | "quality";

export type KpiSetting = {
  id: KpiId;
  name: string;
  icon: string;
  target: number;
  weight: number;
  unit: string;
};

export type Achievement = {
  /** ISO timestamp; deletion identity follows the supplied specification. */
  id: string;
  createdAt: string;
  /** Required to attribute this record to one of the seven KPIs. */
  kpiId: KpiId;
  qty: number;
  date: string;
  note: string;
};

export type TargetSettings = {
  employee: string;
  branch: string;
  month: string;
  kpis: KpiSetting[];
};

export type TargetData = {
  settings: TargetSettings;
  entries: Achievement[];
};

export type LocalProfile = {
  username: string;
  employee: string;
  branch: string;
};

export type KpiSummary = KpiSetting & {
  achieved: number;
  pct: number;
  remaining: number;
};

export type PaceSummary = {
  remainingWorkdays: number;
  requiredPerDay: number;
  expectedPct: number;
  onTrack: boolean;
  targetReached: boolean;
  monthEnded: boolean;
  remainingLines: number;
};

export type TargetSummary = {
  kpis: KpiSummary[];
  weightedScore: number;
  totalWeight: number;
  pace: PaceSummary;
  walletCompliance: boolean;
};

export type BackupFile = {
  app: "TargetX";
  owner: string;
  exportedAt: string;
  settings: TargetSettings;
  entries: Achievement[];
};

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};
