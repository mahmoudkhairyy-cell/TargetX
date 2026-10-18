import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle } from "react-native-svg";
import { COLORS, formatNumber } from "@/lib/targetx/constants";
import { coachMessage } from "@/lib/targetx/coach";
import type { LocalProfile, PaceSummary, TargetData, TargetSummary, KpiId } from "@/lib/targetx/types";
import { ActionButton, AppHeader, Card, Footer, ProgressBar, SectionTitle } from "./UI";
import { TargetRobot, type RobotMood } from "./Robot";

type Tab = "home" | "targets" | "reports" | "add" | "assistant" | "more";

export function HomeScreen({ profile, data, summary, onNavigate, onSettings, onQuickAdd, mood, robotLine, onRobotPress }: {
  profile: LocalProfile; data: TargetData; summary: TargetSummary; onNavigate: (tab: Tab) => void; onSettings: () => void;
  onQuickAdd: (id: KpiId) => void; mood: RobotMood; robotLine: string; onRobotPress: () => void;
}) {
  const lines = summary.kpis.find((kpi) => kpi.id === "lines");
  const monthEntries = data.entries.filter((entry) => entry.date.startsWith(data.settings.month));
  const latest = monthEntries.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 4);
  const overallRemaining = Math.max(0, 100 - summary.weightedScore);
  const lineRemaining = lines?.remaining ?? 0;
  const coachLine = robotLine || coachMessage(summary, profile.employee, data.settings.month, "hero");
  const coachCardLine = coachMessage(summary, profile.employee, data.settings.month, "card");
  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <AppHeader profile={profile} mood={mood} onSettings={onSettings} onReports={() => onNavigate("reports")} onRobotPress={onRobotPress} robotLine={robotLine} />
      <View style={styles.content}>
        <LinearGradient colors={["#ff7a00", "#ed4e00"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.heroCard}>
          <View style={styles.heroOrb} />
          <View style={styles.heroRow}>
            <View style={styles.heroCopy}>
              <Text style={styles.heroTitle}>إجمالي التارجت الشهري</Text>
              <Text style={styles.heroPct}>{formatNumber(summary.weightedScore)}%</Text>
              <Text style={styles.heroRemaining}>فاضل {formatNumber(overallRemaining)}%</Text>
              <View style={styles.heroBubble}><Text style={styles.heroBubbleText}>{coachLine}</Text></View>
              <View style={styles.heroMetaBubble}><Text style={styles.heroMetaText}>المساهمة الموزونة: {formatNumber(summary.weightedScore)} من {formatNumber(summary.totalWeight)} نقطة</Text></View>
            </View>
            <ProgressRing pct={summary.weightedScore} />
          </View>
        </LinearGradient>

        <View style={styles.lineStatsRow}>
          <Card style={styles.lineStatCard}>
            <View style={styles.lineStatTitle}><Text style={styles.lineStatLabel}>الخطوط المحققة</Text><Text style={styles.lineStatIcon}>▯</Text></View>
            <Text style={styles.lineStatValue}>{formatNumber(lines?.achieved ?? 0)}</Text>
            <Text style={styles.lineStatMeta}>من {formatNumber(lines?.target ?? 0)} خط</Text>
          </Card>
          <Card style={styles.lineStatCard}>
            <View style={styles.lineStatTitle}><Text style={styles.lineStatLabel}>المتبقي للخطوط</Text><Text style={styles.lineStatIcon}>◎</Text></View>
            <Text style={styles.lineStatValue}>{formatNumber(lineRemaining)}</Text>
            <Text style={styles.lineStatMeta}>خط للوصول للهدف</Text>
          </Card>
        </View>

        <View style={[styles.compliance, summary.walletCompliance ? styles.complianceOk : styles.complianceWarn]}>
          <Text style={styles.complianceText}>{summary.walletCompliance ? "✓" : "!"} محافظ أورنچ كاش الجديدة: المطلوب ≥90% من نسبة الخطوط</Text>
        </View>

        <SectionTitle title="مؤشرات الأداء" action={<ActionButton label="تسجيل" icon="＋" compact onPress={() => onNavigate("add")} />} />
        <View style={styles.kpiList}>
          {summary.kpis.map((kpi) => {
            const contribution = summary.totalWeight > 0 ? (kpi.pct * kpi.weight) / summary.totalWeight : 0;
            return <Card key={kpi.id} style={styles.kpiCard}>
              <View style={styles.kpiHeading}>
                <View style={styles.kpiIdentity}><Text style={styles.kpiIcon}>{kpi.icon}</Text><Text style={styles.kpiName} numberOfLines={2}>{kpi.name}</Text></View>
                <View style={styles.pill}><Text style={styles.pillText}>{formatNumber(kpi.pct)}%</Text></View>
              </View>
              <View style={styles.kpiStats}>
                <Text style={styles.kpiMetaText}>المحقق: <Text style={styles.kpiMetaStrong}>{formatNumber(kpi.achieved)} {kpi.unit}</Text></Text>
                <Text style={styles.kpiMetaText}>المستهدف: <Text style={styles.kpiMetaStrong}>{formatNumber(kpi.target)}</Text></Text>
              </View>
              <ProgressBar pct={kpi.pct} small />
              <View style={styles.kpiFoot}>
                <Text style={styles.kpiContribution}>المساهمة: {formatNumber(contribution)}%</Text>
                <Text style={styles.kpiWeight}>الوزن: {formatNumber(kpi.weight)}%</Text>
              </View>
              <ActionButton label="＋ تسجيل إنجاز" compact variant="soft" onPress={() => onQuickAdd(kpi.id)} style={styles.quickAdd} />
            </Card>;
          })}
        </View>

        <Card style={styles.paceCard}>
          <View style={styles.paceHeader}><Text style={styles.paceTitle}>محتاج تعمل كام خط؟</Text><Text style={styles.paceIcon}>{summary.pace.targetReached ? "🎉" : "⚡"}</Text></View>
          <PaceMessage pace={summary.pace} />
        </Card>

        <Card style={styles.coachCard}>
          <View style={styles.coachRobot}><TargetRobot size={66} mood={mood} /></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.coachTitle}>مستر تارجت بيقولك 💬</Text>
            <Text style={styles.coachText}>{coachCardLine}</Text>
            <ActionButton label="اسأل مستر تارجت" icon="💬" compact variant="soft" onPress={() => onNavigate("assistant")} style={{ alignSelf: "flex-start", marginTop: 7 }} />
          </View>
        </Card>

        <SectionTitle title="آخر الإنجازات" action={<ActionButton label="كل التقارير" compact variant="outline" onPress={() => onNavigate("reports")} />} />
        {latest.length === 0 ? <Card><Text style={styles.emptyText}>لسه مفيش إنجازات مسجلة. ابدأ أول تسجيل ليك! 🚀</Text></Card> : latest.map((entry) => {
          const kpi = data.settings.kpis.find((item) => item.id === entry.kpiId);
          return <Card key={entry.createdAt} style={styles.latestItem}><Text style={styles.latestIcon}>{kpi?.icon}</Text><View style={{ flex: 1 }}><Text style={styles.latestName}>{kpi?.name ?? "إنجاز"}</Text><Text style={styles.latestDate}>{entry.date}{entry.note ? ` · ${entry.note}` : ""}</Text></View><Text style={styles.latestQty}>+{formatNumber(entry.qty)}</Text></Card>;
        })}
      </View>
      <Footer />
    </ScrollView>
  );
}

function ProgressRing({ pct }: { pct: number }) {
  const size = 108;
  const stroke = 9;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const visiblePct = Math.min(100, Math.max(0, pct));
  return <View style={styles.ringWrap}>
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.22)" strokeWidth={stroke} fill="none" />
      <Circle cx={size / 2} cy={size / 2} r={radius} stroke="#ffd39f" strokeWidth={stroke} fill="none" strokeLinecap="round" strokeDasharray={[circumference, circumference]} strokeDashoffset={circumference * (1 - visiblePct / 100)} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
    </Svg>
    <View style={styles.ringCenter}><Text style={styles.ringValue}>{formatNumber(pct)}%</Text><Text style={styles.ringCaption}>الإجمالي</Text></View>
  </View>;
}

function PaceMessage({ pace }: { pace: PaceSummary }) {
  if (pace.targetReached) return <View><Text style={styles.paceStatus}>🎉 تحقق</Text><Text style={styles.paceLead}>تم — حققت تارجت الخطوط. كمّل بنفس القوة!</Text></View>;
  if (pace.monthEnded) return <View><Text style={styles.paceStatus}>خلصت أيام الشهر</Text><Text style={styles.paceLead}>فاضل {formatNumber(pace.remainingLines)} خط ومفيش أيام شغل متبقية في الشهر.</Text></View>;
  return <View><View style={styles.requiredRow}><Text style={styles.requiredNumber}>{formatNumber(pace.requiredPerDay)}</Text><Text style={styles.requiredUnit}>خط / يوم</Text><Text style={[styles.trackPill, pace.onTrack ? styles.trackGood : styles.trackLate]}>{pace.onTrack ? "على المسار ✓" : "متأخر شوية"}</Text></View><Text style={styles.paceInfo}>المتوقع حتى اليوم: {formatNumber(pace.expectedPct)}%</Text><Text style={styles.paceLead}>فاضل {formatNumber(pace.remainingLines)} خط على {formatNumber(pace.remainingWorkdays)} يوم شغل.</Text><Text style={styles.paceFine}>الحساب بيعتبر كل أيام الأسبوع أيام شغل، عدّلها لو جدولك مختلف.</Text></View>;
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 102 },
  content: { width: "100%", maxWidth: 780, alignSelf: "center", paddingHorizontal: 16 },
  actions: { flexDirection: "row", gap: 9, marginBottom: 10 },
  heroCard: { borderRadius: 30, padding: 19, marginBottom: 13, overflow: "hidden", shadowColor: "#d74c00", shadowOpacity: 0.17, shadowRadius: 20, shadowOffset: { width: 0, height: 10 }, elevation: 4 },
  heroOrb: { position: "absolute", width: 180, height: 180, borderRadius: 100, backgroundColor: "rgba(255,255,255,0.08)", left: -75, top: -75 },
  heroRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  heroCopy: { flex: 1, alignItems: "flex-end" },
  heroTitle: { color: COLORS.white, fontFamily: "Tajawal_700Bold", fontSize: 16, textAlign: "right" },
  heroPct: { color: COLORS.white, fontFamily: "Tajawal_700Bold", fontSize: 37, lineHeight: 45, textAlign: "right", marginTop: 3 },
  heroRemaining: { color: "rgba(255,255,255,0.82)", fontFamily: "Tajawal_400Regular", fontSize: 12, textAlign: "right", marginTop: -2 },
  heroBubble: { backgroundColor: "rgba(255,255,255,0.20)", borderRadius: 99, paddingHorizontal: 12, paddingVertical: 6, marginTop: 11, alignSelf: "stretch" },
  heroBubbleText: { color: COLORS.white, fontFamily: "Tajawal_700Bold", fontSize: 11, textAlign: "center" },
  heroMetaBubble: { backgroundColor: "rgba(255,255,255,0.13)", borderRadius: 99, paddingHorizontal: 10, paddingVertical: 5, marginTop: 7, alignSelf: "stretch" },
  heroMetaText: { color: "#fff0df", fontFamily: "Tajawal_400Regular", fontSize: 10, textAlign: "center" },
  ringWrap: { width: 110, height: 110, alignItems: "center", justifyContent: "center" },
  ringCenter: { position: "absolute", alignItems: "center", justifyContent: "center" },
  ringValue: { color: COLORS.white, fontFamily: "Tajawal_700Bold", fontSize: 18, textAlign: "center" },
  ringCaption: { color: "rgba(255,255,255,0.82)", fontFamily: "Tajawal_400Regular", fontSize: 9, textAlign: "center" },
  lineStatsRow: { flexDirection: "row", gap: 10 },
  lineStatCard: { flex: 1, minHeight: 118, padding: 13, marginBottom: 10 },
  lineStatTitle: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  lineStatLabel: { color: COLORS.muted, fontFamily: "Tajawal_700Bold", fontSize: 12 },
  lineStatIcon: { color: COLORS.orange, fontSize: 20, fontWeight: "700" },
  lineStatValue: { color: COLORS.text, fontFamily: "Tajawal_700Bold", fontSize: 28, textAlign: "right", marginTop: 2 },
  lineStatMeta: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 10, textAlign: "right" },
  compliance: { borderRadius: 11, padding: 9, marginBottom: 9 },
  complianceOk: { backgroundColor: "#eaf8f1" },
  complianceWarn: { backgroundColor: "#fff2e7" },
  complianceText: { color: COLORS.text, textAlign: "right", fontFamily: "Tajawal_400Regular", fontSize: 10 },
  kpiList: { gap: 1 },
  kpiCard: { padding: 14, marginBottom: 10 },
  kpiHeading: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 },
  kpiIdentity: { flexDirection: "row", alignItems: "center", gap: 8, flex: 1 },
  kpiIcon: { fontSize: 20, color: COLORS.orange },
  kpiName: { color: COLORS.text, textAlign: "left", fontFamily: "Tajawal_700Bold", fontSize: 14, flex: 1 },
  pill: { paddingHorizontal: 9, paddingVertical: 4, backgroundColor: COLORS.orangeSoft, borderRadius: 99 },
  pillText: { color: COLORS.orange, fontFamily: "Tajawal_700Bold", fontSize: 11 },
  kpiStats: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: 11, marginBottom: 7 },
  kpiMetaText: { color: COLORS.muted, fontSize: 10, fontFamily: "Tajawal_400Regular" },
  kpiMetaStrong: { color: COLORS.text, fontFamily: "Tajawal_700Bold" },
  kpiFoot: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 7 },
  kpiContribution: { color: COLORS.orange, fontSize: 10, fontFamily: "Tajawal_700Bold" },
  kpiWeight: { color: COLORS.muted, fontSize: 10, fontFamily: "Tajawal_400Regular" },
  quickAdd: { marginTop: 9, alignSelf: "flex-start" },
  paceCard: { borderColor: "#ffe0c5", backgroundColor: "#fffaf5" },
  paceHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 7 },
  paceTitle: { color: COLORS.text, fontFamily: "Tajawal_700Bold", fontSize: 15 },
  paceIcon: { fontSize: 22 },
  paceStatus: { color: COLORS.green, textAlign: "right", fontFamily: "Tajawal_700Bold", fontSize: 15 },
  paceLead: { color: COLORS.text, textAlign: "right", fontFamily: "Tajawal_400Regular", fontSize: 12, lineHeight: 20, marginTop: 5 },
  paceFine: { color: COLORS.muted, textAlign: "right", fontFamily: "Tajawal_400Regular", fontSize: 10, marginTop: 4 },
  requiredRow: { flexDirection: "row", alignItems: "center", gap: 7 },
  requiredNumber: { color: COLORS.orange, fontSize: 26, fontFamily: "Tajawal_700Bold" },
  requiredUnit: { color: COLORS.text, fontFamily: "Tajawal_700Bold", fontSize: 12 },
  trackPill: { marginLeft: "auto", paddingHorizontal: 9, paddingVertical: 4, borderRadius: 99, overflow: "hidden", fontSize: 10, fontFamily: "Tajawal_700Bold" },
  trackGood: { color: COLORS.green, backgroundColor: "#e8f7f0" },
  trackLate: { color: COLORS.red, backgroundColor: "#fff0f1" },
  paceInfo: { color: COLORS.orange, textAlign: "right", fontFamily: "Tajawal_700Bold", fontSize: 11, marginTop: 5 },
  coachCard: { backgroundColor: COLORS.orangeSoft, borderColor: "#ffe4cc", flexDirection: "row-reverse", alignItems: "center", gap: 6, padding: 12 },
  coachRobot: { width: 70, alignItems: "center" },
  coachTitle: { textAlign: "right", fontFamily: "Tajawal_700Bold", fontSize: 14, color: COLORS.text },
  coachText: { textAlign: "right", fontFamily: "Tajawal_400Regular", fontSize: 12, lineHeight: 20, color: COLORS.text, marginTop: 3 },
  emptyText: { textAlign: "center", fontFamily: "Tajawal_400Regular", fontSize: 13, color: COLORS.muted, paddingVertical: 4 },
  latestItem: { flexDirection: "row-reverse", alignItems: "center", gap: 10, padding: 12, marginBottom: 8 },
  latestIcon: { fontSize: 21 },
  latestName: { textAlign: "left", color: COLORS.text, fontFamily: "Tajawal_700Bold", fontSize: 12 },
  latestDate: { textAlign: "right", color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 10, marginTop: 2 },
  latestQty: { color: COLORS.green, fontFamily: "Tajawal_700Bold", fontSize: 15 },
});
