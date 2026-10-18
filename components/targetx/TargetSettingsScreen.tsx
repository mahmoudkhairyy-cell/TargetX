import { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { COLORS, DEFAULT_KPIS, formatNumber } from "@/lib/targetx/constants";
import { makeBackup, parseBackup } from "@/lib/targetx/storage";
import type { LocalProfile, TargetData, TargetSettings } from "@/lib/targetx/types";
import { ActionButton, Card, Field, Footer, SectionTitle } from "./UI";

export function TargetSettingsScreen({ profile, data, onSave, onRestore, onLogout, onSwitchUser }: {
  profile: LocalProfile; data: TargetData; onSave: (next: TargetData, profile: LocalProfile) => void; onRestore: (next: TargetData) => void;
  onLogout: () => void; onSwitchUser: () => void;
}) {
  const [employee, setEmployee] = useState(data.settings.employee);
  const [branch, setBranch] = useState(data.settings.branch);
  const [month, setMonth] = useState(data.settings.month);
  const [targets, setTargets] = useState<Record<string, string>>(() => Object.fromEntries(data.settings.kpis.map((kpi) => [kpi.id, String(kpi.target)])));
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const shiftMonth = (delta: number) => {
    const parts = month.match(/^(\d{4})-(0[1-9]|1[0-2])$/);
    const next = parts ? new Date(Number(parts[1]), Number(parts[2]) - 1 + delta, 1) : new Date();
    if (!parts) next.setMonth(next.getMonth() + delta);
    setMonth(`${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}`);
  };
  const save = () => {
    const validMonth = /^\d{4}-(0[1-9]|1[0-2])$/.test(month);
    const parsed = data.settings.kpis.map((kpi) => ({ kpi, target: Number((targets[kpi.id] ?? "").replace(",", ".")) }));
    if (!employee.trim() || !branch.trim() || !validMonth || parsed.some(({ target }) => !Number.isFinite(target) || target < 0)) {
      setError("راجع اختيار الشهر وتأكد إن كل المستهدفات صفر أو أكتر.");
      return;
    }
    const nextProfile = { ...profile, employee: employee.trim().slice(0, 60), branch: branch.trim().slice(0, 60) };
    const settings: TargetSettings = {
      ...data.settings,
      employee: nextProfile.employee,
      branch: nextProfile.branch,
      month,
      kpis: parsed.map(({ kpi, target }) => ({ ...kpi, target })),
    };
    setError("");
    setMessage("تم حفظ الإعدادات بنجاح");
    onSave({ ...data, settings }, nextProfile);
    setTimeout(() => setMessage(""), 2600);
  };

  const exportBackup = async () => {
    setError("");
    try {
      const payload = JSON.stringify(makeBackup(profile, data), null, 2);
      const date = new Date();
      const filename = `targetx-backup-${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}.json`;
      if (Platform.OS === "web") {
        const blob = new Blob([payload], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = filename;
        anchor.click();
        URL.revokeObjectURL(url);
      } else {
        const dir = FileSystem.cacheDirectory ?? FileSystem.documentDirectory;
        if (!dir) throw new Error("no_file_directory");
        const uri = `${dir}${filename}`;
        await FileSystem.writeAsStringAsync(uri, payload, { encoding: FileSystem.EncodingType.UTF8 });
        if (await Sharing.isAvailableAsync()) await Sharing.shareAsync(uri, { mimeType: "application/json", dialogTitle: "نسخة TargetX الاحتياطية" });
        else throw new Error("sharing_unavailable");
      }
      setMessage("تم تجهيز النسخة الاحتياطية");
    } catch {
      setError("متعذر تصدير الملف على الجهاز ده.");
    }
  };

  const importBackup = async () => {
    setError("");
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: ["application/json", "public.json"], copyToCacheDirectory: true, multiple: false });
      if (result.canceled || !result.assets?.[0]) return;
      const text = Platform.OS === "web"
        ? await (await fetch(result.assets[0].uri)).text()
        : await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: FileSystem.EncodingType.UTF8 });
      let parsed: unknown;
      try { parsed = JSON.parse(text); } catch { parsed = null; }
      const restored = parseBackup(parsed);
      if (!restored) {
        setError("الملف مش نسخة TargetX صالحة");
        return;
      }
      onRestore(restored);
    } catch {
      setError("الملف مش نسخة TargetX صالحة");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <SectionTitle title="إعدادات التارجت" />
      <Card>
        <Field label="اسم الموظف" value={employee} onChangeText={(text) => setEmployee(text.slice(0, 60))} maxLength={60} autoCapitalize="words" />
        <Field label="الفرع" value={branch} onChangeText={(text) => setBranch(text.slice(0, 60))} maxLength={60} autoCapitalize="words" />
        <View style={styles.monthSelector}>
          <ActionButton label="‹" variant="outline" compact onPress={() => shiftMonth(-1)} style={{ width: 42 }} />
          <View style={{ flex: 1 }}><Field label="الشهر (YYYY-MM)" value={month} onChangeText={setMonth} placeholder="2026-10" keyboardType="numeric" /></View>
          <ActionButton label="›" variant="outline" compact onPress={() => shiftMonth(1)} style={{ width: 42 }} />
        </View>
        <Text style={styles.sectionMini}>المستهدفات الشهرية</Text>
        {DEFAULT_KPIS.map((kpi) => <Field key={kpi.id} label={`${kpi.icon} ${kpi.name} · ${kpi.unit} · الوزن ${kpi.weight}%`} value={targets[kpi.id] ?? String(data.settings.kpis.find((item) => item.id === kpi.id)?.target ?? kpi.target)} onChangeText={(text) => setTargets((current) => ({ ...current, [kpi.id]: text }))} keyboardType="decimal-pad" />)}
        <Text style={styles.helper}>الأوزان ثابتة: {formatNumber(data.settings.kpis.reduce((sum, item) => sum + item.weight, 0))}% — لا يمكن تعديلها.</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {message ? <Text style={styles.success}>{message}</Text> : null}
        <ActionButton label="حفظ الإعدادات" onPress={save} />
      </Card>
      <Card style={styles.backupCard}>
        <Text style={styles.backupTitle}>النسخ الاحتياطي</Text>
        <Text style={styles.backupText}>التصدير يحفظ إعداداتك وسجل الإنجازات. احتفظ بالملف في مكان آمن.</Text>
        <ActionButton label="تصدير نسخة احتياطية JSON" icon="↓" variant="soft" onPress={() => void exportBackup()} style={{ marginTop: 10 }} />
        <ActionButton label="استعادة نسخة احتياطية" icon="↑" variant="outline" onPress={() => void importBackup()} style={{ marginTop: 9 }} />
      </Card>
      <Card style={styles.accountCard}>
        <Text style={styles.backupTitle}>الحساب على هذا الجهاز</Text>
        <Text style={styles.accountText}>اليوزر: {profile.username}</Text>
        <ActionButton label="تسجيل خروج" variant="danger" onPress={onLogout} style={{ marginTop: 9 }} />
        <ActionButton label="تبديل المستخدم" variant="outline" onPress={onSwitchUser} style={{ marginTop: 9 }} />
      </Card>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { width: "100%", maxWidth: 840, alignSelf: "center", paddingHorizontal: 16, paddingBottom: 110 },
  sectionMini: { color: COLORS.text, fontFamily: "Tajawal_700Bold", fontSize: 14, textAlign: "right", marginTop: 5, marginBottom: 8 },
  monthSelector: { flexDirection: "row", alignItems: "center", gap: 8 },
  helper: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 11, textAlign: "right", marginBottom: 12 },
  error: { color: COLORS.red, fontFamily: "Tajawal_700Bold", fontSize: 12, textAlign: "right", marginBottom: 9 },
  success: { color: COLORS.green, fontFamily: "Tajawal_700Bold", fontSize: 12, textAlign: "center", marginBottom: 9 },
  backupCard: { backgroundColor: "#fffaf5", borderColor: "#ffe3cc" },
  backupTitle: { textAlign: "right", color: COLORS.text, fontFamily: "Tajawal_700Bold", fontSize: 15 },
  backupText: { textAlign: "right", color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 12, lineHeight: 20, marginTop: 4 },
  accountCard: { borderColor: "#e4e4e9" },
  accountText: { color: COLORS.muted, textAlign: "right", fontFamily: "Tajawal_400Regular", fontSize: 12, marginTop: 4 },
});
