import { currentMonth } from "./constants";
import type { TargetData, TargetSummary } from "./types";

export function summarizeTarget(data: TargetData, today = new Date()): TargetSummary {
  const month = data.settings.month || currentMonth(today);
  const monthlyEntries = data.entries.filter((entry) => entry.date?.slice(0, 7) === month);
  const kpis = data.settings.kpis.map((kpi) => {
    const achieved = monthlyEntries
      .filter((entry) => entry.kpiId === kpi.id)
      .reduce((total, entry) => total + entry.qty, 0);
    const pct = kpi.target > 0 ? (achieved / kpi.target) * 100 : 0;
    return { ...kpi, achieved, pct, remaining: Math.max(0, kpi.target - achieved) };
  });
  const totalWeight = kpis.reduce((total, kpi) => total + kpi.weight, 0);
  const weightedScore = totalWeight > 0
    ? kpis.reduce((total, kpi) => total + kpi.pct * kpi.weight, 0) / totalWeight
    : 0;
  const lines = kpis.find((kpi) => kpi.id === "lines");
  const wallets = kpis.find((kpi) => kpi.id === "wallets");
  const [year, monthNumber] = month.split("-").map(Number);
  const daysInMonth = year && monthNumber ? new Date(year, monthNumber, 0).getDate() : 30;
  const isCurrentMonth = month === currentMonth(today);
  const day = isCurrentMonth ? today.getDate() : month < currentMonth(today) ? daysInMonth : 0;
  const remainingWorkdays = isCurrentMonth ? Math.max(0, daysInMonth - day) : month < currentMonth(today) ? 0 : daysInMonth;
  const elapsedDays = Math.min(daysInMonth, Math.max(0, day));
  const expectedPct = daysInMonth > 0 ? (elapsedDays / daysInMonth) * 100 : 0;
  const targetReached = !!lines && lines.target > 0 && lines.achieved >= lines.target;
  const remainingLines = lines?.remaining ?? 0;
  const monthEnded = (month < currentMonth(today) || (isCurrentMonth && remainingWorkdays === 0)) && !targetReached;
  const pace = {
    remainingWorkdays,
    requiredPerDay: remainingWorkdays > 0 ? remainingLines / remainingWorkdays : 0,
    expectedPct,
    onTrack: (lines?.pct ?? 0) >= expectedPct,
    targetReached,
    monthEnded,
    remainingLines,
  };
  const walletCompliance = !lines || !wallets || wallets.pct >= lines.pct * 0.9;
  return { kpis, weightedScore, totalWeight, pace, walletCompliance };
}
