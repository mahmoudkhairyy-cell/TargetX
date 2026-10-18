import type { PaceSummary, TargetSummary } from "./types";

export type CoachMood = "happy" | "sad" | "angry";
export type CoachSlot = "hero" | "card";

const phrases: Record<CoachMood, readonly string[]> = {
  happy: [
    "يا سلام عليك! بتكسر التارجت حتة حتة 🍊",
    "جامد يا نجم، كمل بنفس النفس!",
    "خطوة كمان وهتفرح بالأرقام!",
    "معلم.. مستوى يفرّح!",
    "كل تسجيل بيقربك من القمة، دوس!",
    "إنت قدها يا بطل، كمّل بنفس القوة 💪",
    "النتيجة بتتحسن، وإنت اللي عامل الشغل ده 👏",
    "كده الكلام! خليك محافظ على الحماس 🏆",
  ],
  sad: [
    "مش مشكلة يا بطل، لسه في فرصة نلمّ الدنيا.",
    "يوم تقيل؟ خد نفس وابدأ بخطوة صغيرة.",
    "لسه تقدر تعوض، وأنا معاك واحدة واحدة.",
    "النهارده مش أحسن حاجة؛ بكرة نرجع أقوى.",
    "متزعلش من رقم، هو بس بيقولنا نبدأ منين.",
    "لسه فيه وقت، نركز على إنجاز واحد دلوقتي.",
  ],
  angry: [
    "يا أرقام اتحركوا بقى.. إحنا مستنيينكم!",
    "ده إيه يا تارجت؟ خلينا نلحقك قبل نهاية الشهر!",
    "مش هاسيب الهدف يزوغ مننا.. شد حيلك يا وحش!",
    "هنعمل اجتماع مع الأرقام.. حالًا!",
    "الهدف عامل شاطر؟ هنفاجئه بإنجاز جديد!",
    "يلا ندي الأرقام دفعة محترمة، من غير زعل 😤",
  ],
};

function hash(value: string): number {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function linePct(summary: TargetSummary): number {
  return summary.kpis.find((kpi) => kpi.id === "lines")?.pct ?? 0;
}

export function coachMood(summary: TargetSummary): CoachMood {
  const gap = summary.pace.expectedPct - linePct(summary);
  if (summary.pace.targetReached || summary.pace.onTrack) return "happy";
  if (summary.pace.monthEnded || gap >= 22) return "sad";
  return "angry";
}

export function coachMessage(summary: TargetSummary, employee: string, month: string, slot: CoachSlot): string {
  const mood = coachMood(summary);
  const band = Math.floor(linePct(summary) / 10);
  const key = `${month}|${employee.toLowerCase()}|${band}|${mood}|${slot}`;
  return phrases[mood][hash(key) % phrases[mood].length];
}

export function isSleeping(lastInteraction: number, now: number): boolean {
  return lastInteraction > 0 && now - lastInteraction >= 120_000;
}

export function getRequiredLinesMessage(pace: PaceSummary): string {
  if (pace.targetReached) return "🎉 تحقق — حققت تارجت الخطوط. كمّل بنفس القوة!";
  if (pace.monthEnded) return `خلصت أيام الشهر؛ فاضل ${pace.remainingLines} خط ومفيش أيام شغل متبقية.`;
  return `محتاج تعمل ${pace.requiredPerDay} خط في اليوم. فاضل ${pace.remainingLines} خط على ${pace.remainingWorkdays} يوم شغل.`;
}
