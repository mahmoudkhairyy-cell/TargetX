import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS, DEFAULT_KPIS, localISODate } from "@/lib/targetx/constants";
import type { KpiId, KpiSetting } from "@/lib/targetx/types";
import { ActionButton, Card, Field, Footer, SectionTitle } from "./UI";

export function AddEntryScreen({ month, initialKpi, onSave }: { month: string; initialKpi: KpiId | null; onSave: (entry: { kpiId: KpiId; qty: number; date: string; note: string }) => void }) {
  const [kpiId, setKpiId] = useState<KpiId>(initialKpi ?? "lines");
  const [qty, setQty] = useState("");
  const [date, setDate] = useState(localISODate());
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const quantityRef = useRef<TextInput>(null);
  useEffect(() => {
    const timer = setTimeout(() => quantityRef.current?.focus(), initialKpi ? 180 : 350);
    return () => clearTimeout(timer);
  }, [initialKpi]);
  const save = () => {
    const parsedQty = Number(qty.replace(",", "."));
    const validKpi = DEFAULT_KPIS.some((item) => item.id === kpiId);
    const dateParts = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    const dateValid = !!dateParts && (() => {
      const [, year, monthNumber, day] = dateParts;
      const parsedDate = new Date(Number(year), Number(monthNumber) - 1, Number(day));
      return Number(year) > 0 && parsedDate.getFullYear() === Number(year) && parsedDate.getMonth() + 1 === Number(monthNumber) && parsedDate.getDate() === Number(day);
    })();
    if (!validKpi || !Number.isFinite(parsedQty) || parsedQty <= 0 || !dateValid) {
      setError("راجع نوع الإنجاز والكمية والتاريخ");
      return;
    }
    if (date.slice(0, 7) !== month) {
      setError("التاريخ خارج الشهر المحدد. غيّر الشهر من إعدادات التارجت أولاً.");
      return;
    }
    setError("");
    onSave({ kpiId, qty: parsedQty, date, note: note.slice(0, 120) });
    setQty("");
    setDate(localISODate());
    setNote("");
  };
  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <SectionTitle title="＋ تسجيل إنجاز" />
      <Card>
        <Text style={styles.label}>نوع الإنجاز</Text>
        <View style={styles.kpiOptions}>
          {DEFAULT_KPIS.map((kpi) => <KpiChoice key={kpi.id} kpi={kpi} selected={kpiId === kpi.id} onPress={() => setKpiId(kpi.id)} />)}
        </View>
        <Field label="الكمية المحققة" value={qty} onChangeText={setQty} placeholder="مثال: 1 أو 2.5" keyboardType="decimal-pad" inputRef={quantityRef} />
        <Field label="التاريخ" value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" keyboardType="numeric" />
        <Field label="ملاحظات (اختياري)" value={note} onChangeText={(text) => setNote(text.slice(0, 120))} placeholder="أضف ملاحظة قصيرة" multiline maxLength={120} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <ActionButton label="حفظ الإنجاز ✓" onPress={save} />
        <Text style={styles.note}>بيتم تحديث الأرقام فورًا وحفظ التسجيلات على نفس المتصفح والجهاز.</Text>
      </Card>
      <Card style={styles.monthCard}><Text style={styles.monthLabel}>الشهر المحدد</Text><Text style={styles.month}>{month}</Text><Text style={styles.helper}>التسجيلات تُقبل داخل هذا الشهر فقط.</Text></Card>
      <Footer />
    </ScrollView>
  );
}

function KpiChoice({ kpi, selected, onPress }: { kpi: KpiSetting; selected: boolean; onPress: () => void }) {
  return <Text onPress={onPress} style={[styles.kpiChoice, selected && styles.kpiSelected]}>{kpi.icon} {kpi.name}</Text>;
}

const styles = StyleSheet.create({
  content: { width: "100%", maxWidth: 820, alignSelf: "center", paddingHorizontal: 16, paddingBottom: 105 },
  label: { color: COLORS.text, fontFamily: "Tajawal_700Bold", textAlign: "right", fontSize: 14, marginBottom: 8 },
  kpiOptions: { flexDirection: "row", flexWrap: "wrap", gap: 7, marginBottom: 17 },
  kpiChoice: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 12, textAlign: "center", borderWidth: 1, borderColor: COLORS.divider, backgroundColor: COLORS.white, paddingHorizontal: 10, paddingVertical: 9, borderRadius: 12, overflow: "hidden" },
  kpiSelected: { color: COLORS.orange, borderColor: COLORS.orange, backgroundColor: COLORS.orangeSoft, fontFamily: "Tajawal_700Bold" },
  error: { color: COLORS.red, textAlign: "right", fontFamily: "Tajawal_700Bold", fontSize: 12, marginBottom: 10 },
  note: { color: COLORS.muted, textAlign: "center", fontFamily: "Tajawal_400Regular", fontSize: 11, lineHeight: 18, marginTop: 12 },
  monthCard: { backgroundColor: "#fffaf5", borderColor: "#ffe3cd" },
  monthLabel: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", textAlign: "right", fontSize: 11 },
  month: { color: COLORS.orange, fontFamily: "Tajawal_700Bold", textAlign: "right", fontSize: 20 },
  helper: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", textAlign: "right", fontSize: 10 },
});
