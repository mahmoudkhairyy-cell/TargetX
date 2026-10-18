import type { ComponentProps } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "@/lib/targetx/constants";
import {
  ORANGE_DOCS,
  ORANGE_DSL_ROUTERS,
  ORANGE_EMAILS,
  ORANGE_FREEMAX,
  ORANGE_HUNTS,
  ORANGE_PLAN_GROUPS,
  ORANGE_PRICES_VERIFIED_ON,
  ORANGE_SOURCE_SNAPSHOT,
} from "@/lib/targetx/orangeResources";
import { getSRRecords } from "@/lib/targetx/sr";
import { BackHeader, Footer } from "./UI";

type IconName = ComponentProps<typeof Ionicons>["name"];
export type EncyclopediaDestination =
  | "sr"
  | "plans"
  | "freemax"
  | "premier"
  | "otherPlans"
  | "dsl"
  | "dslAddons"
  | "routers"
  | "hunts"
  | "emails"
  | "docs"
  | `plan:${string}`;

type KnowledgeTile = {
  id: string;
  title: string;
  subtitle: string;
  count: number;
  countLabel: string;
  icon: IconName;
  destination: EncyclopediaDestination;
};

export function EncyclopediaHomeScreen({ onBack, onSelect }: { onBack: () => void; onSelect: (destination: EncyclopediaDestination) => void }) {
  const recordsCount = getSRRecords().length;
  const totalPlans = ORANGE_PLAN_GROUPS.reduce((sum, group) => sum + group.plans.length, 0);
  const premierCount = ORANGE_PLAN_GROUPS.find((group) => group.category === "Orange Premier")?.plans.length ?? 0;
  const freeMaxCount = ORANGE_FREEMAX.plans.length + 1;
  const planTiles: KnowledgeTile[] = ORANGE_PLAN_GROUPS
    .filter((group) => group.category !== "Orange Premier")
    .map((group) => {
      const isDsl = group.category === "Home DSL";
      const isDslAddon = group.category === "إضافات Home DSL";
      return {
        id: `group-${group.category}`,
        title: group.category,
        subtitle: isDsl ? "باقات الإنترنت المنزلي والأسعار الشهرية" : isDslAddon ? "سعات إضافية وأسعارها" : `تفاصيل مجموعة ${group.category}`,
        count: group.plans.length,
        countLabel: isDslAddon ? "إضافة" : "باقة",
        icon: isDsl || isDslAddon ? "wifi-outline" : "pricetags-outline",
        destination: isDsl ? "dsl" : isDslAddon ? "dslAddons" : `plan:${group.category}`,
      };
    });

  const tiles: KnowledgeTile[] = [
    { id: "all-plans", title: "كل الباقات", subtitle: "عرض جميع مجموعات الباقات في قائمة واحدة", count: totalPlans, countLabel: "باقة", icon: "apps-outline", destination: "plans" },
    { id: "freemax", title: "FreeMax", subtitle: "الباقات الشهرية والأسبوعية ومزاياها", count: freeMaxCount, countLabel: "باقة", icon: "sparkles-outline", destination: "freemax" },
    { id: "premier", title: "بريمير · Orange Premier", subtitle: "تفاصيل بريمير ومزاياها", count: premierCount, countLabel: "باقة", icon: "ribbon-outline", destination: "premier" },
    ...planTiles,
    { id: "routers", title: "راوترات VDSL", subtitle: "أسعار الكاش والتقسيط وعرض العميل الجديد", count: ORANGE_DSL_ROUTERS.length, countLabel: "جهاز", icon: "hardware-chip-outline", destination: "routers" },
    { id: "hunts", title: "جهات الاتصال", subtitle: "أرقام فرق وجهات الدعم", count: ORANGE_HUNTS.length, countLabel: "جهة", icon: "call-outline", destination: "hunts" },
    { id: "emails", title: "البريد الإلكتروني", subtitle: "إيميلات فرق الدعم", count: ORANGE_EMAILS.length, countLabel: "بريد", icon: "mail-outline", destination: "emails" },
    { id: "docs", title: "مستندات Docs Hub", subtitle: "مراجع وروابط المستندات", count: ORANGE_DOCS.length, countLabel: "مستند", icon: "document-text-outline", destination: "docs" },
  ];

  return (
    <View style={styles.page}>
      <BackHeader title="الموسوعة" onBack={onBack} backLabel="الرئيسية" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[COLORS.orange, COLORS.orangeLight]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
          <View style={styles.heroIcon}><Ionicons name="library-outline" size={25} color={COLORS.white} /></View>
          <Text style={styles.heroTitle}>كل مرجع في خانته</Text>
          <Text style={styles.heroSubtitle}>اختار القسم اللي محتاجه، وافتح بياناته المحلية مباشرة.</Text>
          <View style={styles.localBadge}><Ionicons name="cloud-offline-outline" size={14} color={COLORS.white} /><Text style={styles.localBadgeText}>مراجع محفوظة على الجهاز</Text></View>
        </LinearGradient>

        <View style={styles.sectionHeading}>
          <View><Text style={styles.sectionTitle}>أقسام الموسوعة</Text><Text style={styles.sectionSubtitle}>كل مجموعة باقات في خانة مستقلة</Text></View>
          <View style={styles.sectionCount}><Text style={styles.sectionCountValue}>{(tiles.length + 1).toLocaleString("en-US")}</Text><Text style={styles.sectionCountLabel}>أقسام</Text></View>
        </View>

        <Pressable onPress={() => onSelect("sr")} accessibilityRole="button" accessibilityLabel={`سجلات SR، ${recordsCount} سجل`} style={({ pressed }) => [styles.srTile, pressed && styles.pressed]}>
          <LinearGradient colors={["#252631", "#3b3d4a"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.srGradient}>
            <View style={styles.srTop}>
              <View style={styles.srIcon}><Ionicons name="book-outline" size={22} color={COLORS.white} /></View>
              <View style={styles.srCount}><Text style={styles.srCountValue}>{recordsCount.toLocaleString("en-US")}</Text><Text style={styles.srCountLabel}>سجل</Text></View>
            </View>
            <Text style={styles.srTitle}>سجلات SR</Text>
            <Text style={styles.srSubtitle}>الأكواد والإجراءات — ابحث بالكود أو بالعنوان</Text>
            <View style={styles.srAction}><Text style={styles.srActionText}>افتح موسوعة SR</Text><Ionicons name="chevron-back" size={17} color={COLORS.white} /></View>
          </LinearGradient>
        </Pressable>

        <View style={styles.tileGrid}>
          {tiles.map((tile) => <Pressable key={tile.id} onPress={() => onSelect(tile.destination)} accessibilityRole="button" accessibilityLabel={`${tile.title}، ${tile.count} ${tile.countLabel}`} style={({ pressed }) => [styles.tile, pressed && styles.pressed]}>
            <View style={styles.tileTop}>
              <View style={styles.tileIcon}><Ionicons name={tile.icon} size={19} color={COLORS.orange} /></View>
              <Ionicons name="chevron-back" size={17} color="#a0a0aa" />
            </View>
            <Text style={styles.tileTitle} numberOfLines={2}>{tile.title}</Text>
            <Text style={styles.tileSubtitle} numberOfLines={2}>{tile.subtitle}</Text>
            <View style={styles.tileCount}><Text style={styles.tileCountValue}>{tile.count.toLocaleString("en-US")}</Text><Text style={styles.tileCountLabel}>{tile.countLabel}</Text></View>
          </Pressable>)}
        </View>

        <View style={styles.sourceNote}>
          <Ionicons name="shield-checkmark-outline" size={16} color={COLORS.orange} />
          <Text style={styles.sourceText}>المراجع محلية وغير رسمية. لقطة البيانات: {ORANGE_SOURCE_SNAPSHOT}؛ تمت مراجعة أسعار الباقات في {ORANGE_PRICES_VERIFIED_ON}.</Text>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: COLORS.background },
  content: { width: "100%", maxWidth: 900, alignSelf: "center", paddingHorizontal: 16, paddingTop: 3, paddingBottom: 35 },
  hero: { borderRadius: 23, padding: 17, alignItems: "flex-end", marginBottom: 17, overflow: "hidden" },
  heroIcon: { width: 44, height: 44, borderRadius: 15, backgroundColor: "rgba(255,255,255,0.2)", borderWidth: 1, borderColor: "rgba(255,255,255,0.24)", alignItems: "center", justifyContent: "center", marginBottom: 9 },
  heroTitle: { color: COLORS.white, fontFamily: "Tajawal_700Bold", fontSize: 21, textAlign: "right" },
  heroSubtitle: { color: "rgba(255,255,255,0.9)", fontFamily: "Tajawal_400Regular", fontSize: 12, lineHeight: 19, textAlign: "right", marginTop: 2 },
  localBadge: { flexDirection: "row-reverse", alignItems: "center", gap: 5, marginTop: 11, backgroundColor: "rgba(255,255,255,0.16)", borderRadius: 99, paddingHorizontal: 9, paddingVertical: 5 },
  localBadgeText: { color: COLORS.white, fontFamily: "Tajawal_700Bold", fontSize: 10 },
  sectionHeading: { flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between", marginBottom: 9 },
  sectionTitle: { color: COLORS.text, fontFamily: "Tajawal_700Bold", fontSize: 16, textAlign: "right" },
  sectionSubtitle: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 10, textAlign: "right", marginTop: 1 },
  sectionCount: { flexDirection: "row", alignItems: "baseline", gap: 4, backgroundColor: COLORS.orangeSoft, borderRadius: 99, paddingHorizontal: 10, paddingVertical: 5 },
  sectionCountValue: { color: COLORS.orange, fontFamily: "Tajawal_700Bold", fontSize: 14 },
  sectionCountLabel: { color: COLORS.orange, fontFamily: "Tajawal_400Regular", fontSize: 9 },
  srTile: { borderRadius: 20, marginBottom: 10, overflow: "hidden", shadowColor: COLORS.dark, shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
  srGradient: { padding: 15, alignItems: "flex-end" },
  srTop: { width: "100%", flexDirection: "row-reverse", justifyContent: "space-between", alignItems: "center" },
  srIcon: { width: 40, height: 40, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.14)", borderWidth: 1, borderColor: "rgba(255,255,255,0.18)", alignItems: "center", justifyContent: "center" },
  srCount: { flexDirection: "row", alignItems: "baseline", gap: 4, borderRadius: 99, backgroundColor: "rgba(255,255,255,0.14)", paddingHorizontal: 10, paddingVertical: 5 },
  srCountValue: { color: COLORS.white, fontFamily: "Tajawal_700Bold", fontSize: 14 },
  srCountLabel: { color: "rgba(255,255,255,0.85)", fontFamily: "Tajawal_400Regular", fontSize: 9 },
  srTitle: { color: COLORS.white, fontFamily: "Tajawal_700Bold", fontSize: 17, textAlign: "right", marginTop: 9 },
  srSubtitle: { color: "rgba(255,255,255,0.82)", fontFamily: "Tajawal_400Regular", fontSize: 11, textAlign: "right", marginTop: 1 },
  srAction: { flexDirection: "row-reverse", alignItems: "center", gap: 4, marginTop: 8 },
  srActionText: { color: COLORS.white, fontFamily: "Tajawal_700Bold", fontSize: 10 },
  tileGrid: { flexDirection: "row-reverse", flexWrap: "wrap", justifyContent: "space-between" },
  tile: { width: "48.5%", minHeight: 137, padding: 12, marginBottom: 10, borderRadius: 17, borderWidth: 1, borderColor: COLORS.divider, backgroundColor: COLORS.white, alignItems: "flex-end", shadowColor: COLORS.dark, shadowOpacity: 0.035, shadowRadius: 7, shadowOffset: { width: 0, height: 2 }, elevation: 1 },
  tileTop: { width: "100%", flexDirection: "row-reverse", justifyContent: "space-between", alignItems: "center", marginBottom: 9 },
  tileIcon: { width: 35, height: 35, borderRadius: 12, backgroundColor: COLORS.orangeSoft, alignItems: "center", justifyContent: "center" },
  tileTitle: { width: "100%", color: COLORS.text, fontFamily: "Tajawal_700Bold", fontSize: 12, lineHeight: 17, textAlign: "right", minHeight: 34 },
  tileSubtitle: { width: "100%", color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 9, lineHeight: 14, textAlign: "right", marginTop: 1, minHeight: 28 },
  tileCount: { flexDirection: "row", alignItems: "baseline", gap: 4, borderRadius: 99, backgroundColor: "#f7f7f9", paddingHorizontal: 8, paddingVertical: 4, marginTop: 7 },
  tileCountValue: { color: COLORS.orange, fontFamily: "Tajawal_700Bold", fontSize: 11 },
  tileCountLabel: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 8 },
  pressed: { opacity: 0.86, transform: [{ scale: 0.99 }] },
  sourceNote: { flexDirection: "row-reverse", alignItems: "flex-start", gap: 7, borderRadius: 13, borderWidth: 1, borderColor: "#ffe0c5", backgroundColor: "#fff7ef", paddingHorizontal: 11, paddingVertical: 9, marginTop: 4 },
  sourceText: { flex: 1, color: "#7a4b27", fontFamily: "Tajawal_400Regular", fontSize: 10, lineHeight: 16, textAlign: "right" },
});
