import { ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS, formatNumber } from "@/lib/targetx/constants";
import type { Achievement, TargetData, TargetSummary } from "@/lib/targetx/types";
import { ActionButton, Card, Footer, ProgressBar, SectionTitle } from "./UI";

export function ReportsScreen({ data, summary, onDelete, onClear }: { data: TargetData; summary: TargetSummary; onDelete: (entry: Achievement) => void; onClear: (count: number, month: string) => void }) {
  const entries = data.entries.filter((entry) => entry.date.startsWith(data.settings.month)).slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <SectionTitle title="تقارير مؤشرات الأداء" />
      <View style={styles.kpiList}>{summary.kpis.map((kpi) => <Card key={kpi.id} style={styles.kpiCard}>
        <View style={styles.kpiTop}><Text style={styles.kpiPct}>{formatNumber(kpi.pct)}%</Text><Text style={styles.kpiName}>{kpi.icon} {kpi.name}</Text></View>
        <ProgressBar pct={kpi.pct} />
        <Text style={styles.kpiNums}>{formatNumber(kpi.achieved)} من {formatNumber(kpi.target)} {kpi.unit}</Text>
      </Card>)}</View>
      <SectionTitle title={`سجل الإنجازات · ${data.settings.month}`} action={<ActionButton label="مسح السجل" variant="danger" compact onPress={() => onClear(entries.length, data.settings.month)} />} />
      {entries.length === 0 ? <Card><Text style={styles.empty}>لا توجد تسجيلات لهذا الشهر.</Text></Card> : entries.map((entry) => {
        const kpi = data.settings.kpis.find((item) => item.id === entry.kpiId);
        return <Card key={entry.createdAt} style={styles.entryCard}>
          <View style={styles.entryMain}>
            <View style={{ flex: 1 }}><Text style={styles.entryName}>{kpi?.icon} {kpi?.name ?? "إنجاز"}</Text><Text style={styles.entryDate}>{entry.date}{entry.note ? ` · ${entry.note}` : ""}</Text></View>
            <Text style={styles.entryQty}>+{formatNumber(entry.qty)} {kpi?.unit}</Text>
          </View>
          <ActionButton label="حذف التسجيل" variant="outline" compact icon="⌫" onPress={() => onDelete(entry)} style={{ alignSelf: "flex-start", marginTop: 10 }} />
        </Card>;
      })}
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { width: "100%", maxWidth: 860, alignSelf: "center", paddingHorizontal: 16, paddingBottom: 110 },
  kpiList: { flexDirection: "row", flexWrap: "wrap", gap: 9 },
  kpiCard: { width: "48.5%", padding: 13, marginBottom: 1 },
  kpiTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  kpiName: { flex: 1, textAlign: "right", color: COLORS.text, fontFamily: "Tajawal_700Bold", fontSize: 12 },
  kpiPct: { color: COLORS.orange, fontFamily: "Tajawal_700Bold", fontSize: 14 },
  kpiNums: { textAlign: "right", color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 10, marginTop: 7 },
  entryCard: { padding: 14 },
  entryMain: { flexDirection: "row", alignItems: "center", gap: 10 },
  entryName: { textAlign: "right", fontFamily: "Tajawal_700Bold", color: COLORS.text, fontSize: 13 },
  entryDate: { textAlign: "right", fontFamily: "Tajawal_400Regular", color: COLORS.muted, fontSize: 10, marginTop: 3 },
  entryQty: { color: COLORS.green, fontFamily: "Tajawal_700Bold", fontSize: 15 },
  empty: { textAlign: "center", color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 13, paddingVertical: 5 },
});
