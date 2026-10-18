import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "@/lib/targetx/constants";
import type { LocalProfile } from "@/lib/targetx/types";
import { ActionButton, Card, Field, Footer } from "./UI";
import { TargetRobot } from "./Robot";

export function LoginScreen({ onSignIn, onExploreEncyclopedia }: { onSignIn: (profile: LocalProfile) => void; onExploreEncyclopedia: () => void }) {
  const [employee, setEmployee] = useState("");
  const [username, setUsername] = useState("");
  const [branch, setBranch] = useState("");
  const [error, setError] = useState("");
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <LinearGradient colors={[COLORS.orange, COLORS.orangeLight]} style={styles.hero}>
        <View style={styles.orbOne} /><View style={styles.orbTwo} />
        <View style={styles.brandBadge}><Text style={{ fontSize: 34 }}>🍊</Text></View>
        <Text style={styles.brand}>تارجت إكس · TargetX</Text>
        <Text style={styles.tagline}>YOUR SALES. YOUR SUCCESS.</Text>
        <View style={{ marginTop: 4 }}><TargetRobot size={112} mood="idle" /></View>
        <Text style={styles.heroLine}>كل إنجاز صغير يقربك من هدفك</Text>
      </LinearGradient>
      <Card style={styles.formCard}>
        <Text style={styles.title}>سجّل دخولك</Text>
        <Text style={styles.subtitle}>بيانات بسيطة علشان نبدأ نتابع إنجازك</Text>
        <Field label="الاسم" value={employee} onChangeText={setEmployee} placeholder="اسم الموظف" maxLength={60} autoCapitalize="words" />
        <Field label="اليوزر" value={username} onChangeText={setUsername} placeholder="اختار اسم مستخدم" autoCapitalize="none" />
        <Field label="الفرع" value={branch} onChangeText={setBranch} placeholder="اسم الفرع" maxLength={60} autoCapitalize="words" />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <ActionButton label="دخول وابدأ التارجت" icon="→" onPress={() => {
          if (!employee.trim() || !username.trim() || !branch.trim()) {
            setError("اكتب الاسم واليوزر والفرع علشان تكمل.");
            return;
          }
          setError("");
          onSignIn({ employee: employee.trim(), username: username.trim(), branch: branch.trim() });
        }} />
        <View style={styles.privacy}><Text style={styles.lock}>▣</Text><Text style={styles.privacyText}>البيانات محفوظة على الجهاز ده بس</Text></View>
        <Text style={styles.assistantGate}>سجل دخولك الأول لاستخدام مستر تارجت.</Text>
        <ActionButton label="📚 افتح الموسوعة العامة" variant="soft" compact onPress={onExploreEncyclopedia} style={{ marginTop: 9 }} />
      </Card>
      <Text style={styles.finePrint}>أداة مستقلة وغير رسمية، لا تتبع Orange ولا تمثلها.</Text>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: COLORS.background },
  content: { alignItems: "center", paddingBottom: 26, paddingHorizontal: 15 },
  hero: { width: "100%", maxWidth: 480, alignItems: "center", paddingTop: 26, paddingBottom: 21, marginTop: 12, borderRadius: 28, overflow: "hidden" },
  orbOne: { position: "absolute", width: 200, height: 200, borderRadius: 100, backgroundColor: "rgba(255,255,255,0.10)", top: -115, left: -62 },
  orbTwo: { position: "absolute", width: 135, height: 135, borderRadius: 100, backgroundColor: "rgba(255,255,255,0.09)", bottom: -90, right: -12 },
  brandBadge: { width: 60, height: 60, borderRadius: 19, backgroundColor: "rgba(255,255,255,0.20)", alignItems: "center", justifyContent: "center" },
  brand: { color: COLORS.white, fontSize: 23, fontFamily: "Tajawal_700Bold", marginTop: 6 },
  tagline: { color: "rgba(255,255,255,0.86)", letterSpacing: 1.2, fontSize: 10 },
  heroLine: { color: COLORS.white, fontSize: 14, fontFamily: "Tajawal_700Bold", marginTop: -1 },
  formCard: { width: "100%", maxWidth: 480, marginTop: 15, padding: 18 },
  title: { textAlign: "right", fontSize: 21, color: COLORS.text, fontFamily: "Tajawal_700Bold" },
  subtitle: { textAlign: "right", fontSize: 13, color: COLORS.muted, fontFamily: "Tajawal_400Regular", marginBottom: 14, marginTop: 1 },
  error: { color: COLORS.red, textAlign: "right", fontFamily: "Tajawal_700Bold", fontSize: 13, marginBottom: 10 },
  privacy: { marginTop: 12, borderRadius: 12, backgroundColor: "#f8f8fa", padding: 10, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7 },
  lock: { color: COLORS.green, fontSize: 14 },
  privacyText: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 12 },
  assistantGate: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 11, textAlign: "center", marginTop: 7 },
  finePrint: { maxWidth: 460, textAlign: "center", color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 11, marginTop: 13 },
});
