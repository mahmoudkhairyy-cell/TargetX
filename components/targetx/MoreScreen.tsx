import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/lib/targetx/constants";
import { Card, Footer, SectionTitle } from "./UI";

const OPTIONS = [
  { id: "reports", title: "تقارير الأداء", subtitle: "راجع تسجيلاتك ونتائج الشهر الحالي", icon: "reader-outline" as const },
  { id: "assistant", title: "مستر تارجت", subtitle: "اسأل عن التارجت أو سجلات SR المحلية", icon: "chatbubble-ellipses-outline" as const },
  { id: "targets", title: "إعدادات التارجت", subtitle: "حدّث الشهر والأهداف والنسخ الاحتياطي", icon: "settings-outline" as const },
] as const;

type MoreRoute = (typeof OPTIONS)[number]["id"];

export function MoreScreen({ onNavigate }: { onNavigate: (route: MoreRoute) => void }) {
  return <ScrollView contentContainerStyle={styles.content}>
    <SectionTitle title="المزيد" />
    <Text style={styles.intro}>كل أدوات TargetX في مكان واحد.</Text>
    {OPTIONS.map((option) => <Pressable key={option.id} onPress={() => onNavigate(option.id)} accessibilityRole="button">
      <Card style={styles.optionCard}>
        <View style={styles.optionIcon}><Ionicons name={option.icon} size={23} color={COLORS.orange} /></View>
        <View style={styles.optionCopy}><Text style={styles.optionTitle}>{option.title}</Text><Text style={styles.optionSubtitle}>{option.subtitle}</Text></View>
        <Ionicons name="chevron-back" size={18} color={COLORS.muted} />
      </Card>
    </Pressable>)}
    <Text style={styles.privacy}>ملفك الشخصي والتسجيلات محفوظة محليًا على هذا الجهاز.</Text>
    <Footer />
  </ScrollView>;
}

const styles = StyleSheet.create({
  content: { width: "100%", maxWidth: 760, alignSelf: "center", paddingHorizontal: 16, paddingBottom: 28, flexGrow: 1 },
  intro: { textAlign: "right", color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 12, marginBottom: 10 },
  optionCard: { flexDirection: "row", alignItems: "center", gap: 11, padding: 15 },
  optionIcon: { width: 45, height: 45, borderRadius: 15, backgroundColor: COLORS.orangeSoft, alignItems: "center", justifyContent: "center" },
  optionCopy: { flex: 1 },
  optionTitle: { textAlign: "right", color: COLORS.text, fontFamily: "Tajawal_700Bold", fontSize: 14 },
  optionSubtitle: { textAlign: "right", color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 10, marginTop: 3 },
  privacy: { textAlign: "center", color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 10, marginTop: 6 },
});
