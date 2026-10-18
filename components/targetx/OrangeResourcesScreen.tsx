import { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { COLORS } from "@/lib/targetx/constants";
import { normalizeSearchText } from "@/lib/targetx/search";
import { ORANGE_DOCS, ORANGE_DSL_OFFER_NOTE, ORANGE_DSL_ROUTERS, ORANGE_EMAILS, ORANGE_FREEMAX, ORANGE_HOME_DSL_ADDONS, ORANGE_HOME_DSL_PLANS, ORANGE_HUNTS, ORANGE_PLAN_GROUPS, ORANGE_PRICES_VERIFIED_ON, ORANGE_SOURCE_SNAPSHOT, ORANGE_SOURCE_URL } from "@/lib/targetx/orangeResources";
import { ActionButton, BackHeader, Card, Footer } from "./UI";

export type OrangeResourceSection = "hunts" | "emails" | "plans" | "otherPlans" | "premier" | "freemax" | "docs" | "dsl" | "dslAddons" | "routers";
type Section = OrangeResourceSection;
type MainSection = "packages" | "support" | "docs";
type DataRecord = Record<string, unknown>;

function searchableText(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) return value.map(searchableText).filter(Boolean).join(" ");
  if (typeof value === "object") return Object.entries(value as DataRecord).map(([key, nested]) => `${key} ${searchableText(nested)}`).join(" ");
  return String(value);
}

function matchesResource(record: unknown, term: string) {
  const needle = normalizeSearchText(term);
  return !needle || normalizeSearchText(searchableText(record)).includes(needle);
}

function formatValue(value: unknown): string {
  if (Array.isArray(value)) return value.map(formatValue).filter(Boolean).join(" · ");
  if (value && typeof value === "object") return Object.entries(value as DataRecord).map(([key, nested]) => {
    const text = formatValue(nested);
    return text ? `${fieldLabel(key)}: ${text}` : "";
  }).filter(Boolean).join(" · ");
  if (typeof value === "boolean") return value ? "نعم" : "لا";
  if (typeof value === "string" || typeof value === "number") return String(value);
  return "";
}

const totalPlanCount = ORANGE_PLAN_GROUPS.reduce((sum, group) => sum + group.plans.length, 0);
const premierGroup = ORANGE_PLAN_GROUPS.find((group) => group.category === "Orange Premier");
const premierPlanCount = premierGroup?.plans.length ?? 0;
const freeMaxPlanCount = ORANGE_FREEMAX.plans.length + 1;
const dslPlanCount = ORANGE_HOME_DSL_PLANS.length;
const dslAddonCount = ORANGE_HOME_DSL_ADDONS.length;

const mainTabs: { id: MainSection; label: string; icon: "pricetags-outline" | "headset-outline" | "document-text-outline" }[] = [
  { id: "packages", label: "الباقات", icon: "pricetags-outline" },
  { id: "support", label: "الدعم", icon: "headset-outline" },
  { id: "docs", label: "Docs Hub", icon: "document-text-outline" },
];

export function OrangeResourcesScreen({ onBack, initialSection = "plans", initialPlanCategory }: { onBack: () => void; initialSection?: OrangeResourceSection; initialPlanCategory?: string }) {
  const [section, setSection] = useState<Section>(initialSection);
  const [selectedPlanCategory, setSelectedPlanCategory] = useState<string | null>(initialPlanCategory ?? null);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const term = query.trim();
  const activeMain: MainSection = section === "plans" || section === "otherPlans" || section === "premier" || section === "freemax" || section === "dsl" || section === "dslAddons" || section === "routers" ? "packages" : section === "hunts" || section === "emails" ? "support" : "docs";
  const secondarySections: { id: Section; label: string }[] = activeMain === "packages"
    ? [
      { id: "plans", label: `كل الباقات · ${totalPlanCount}` },
      { id: "premier", label: `Orange Premier · ${premierPlanCount}` },
      { id: "freemax", label: `FreeMax · ${freeMaxPlanCount}` },
      { id: "dsl", label: `Home DSL · ${dslPlanCount}` },
      { id: "dslAddons", label: `إضافات DSL · ${dslAddonCount}` },
      { id: "routers", label: `راوترات · ${ORANGE_DSL_ROUTERS.length}` },
      { id: "otherPlans", label: `باقات أخرى · ${Math.max(0, totalPlanCount - premierPlanCount)}` },
    ]
    : activeMain === "support"
      ? [
        { id: "hunts", label: `جهات الاتصال · ${ORANGE_HUNTS.length}` },
        { id: "emails", label: `البريد الإلكتروني · ${ORANGE_EMAILS.length}` },
      ]
      : [];

  useEffect(() => () => {
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
  }, []);

  const showNotice = (message: string) => {
    setNotice(message);
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(""), 2400);
  };

  const hunts = useMemo(() => ORANGE_HUNTS.filter((item) => matchesResource(item, term)), [term]);
  const emails = useMemo(() => ORANGE_EMAILS.filter((item) => matchesResource(item, term)), [term]);
  const docs = useMemo(() => ORANGE_DOCS.filter((item) => matchesResource(item, term)), [term]);
  const planGroups = useMemo(() => ORANGE_PLAN_GROUPS.map((group) => ({ ...group, plans: group.plans.filter((plan) => matchesResource(plan, term)) })).filter((group) => group.plans.length > 0 || (term && matchesResource(group.category, term))), [term]);
  const visiblePlanGroups = section === "otherPlans"
    ? planGroups.filter((group) => group.category !== "Orange Premier")
    : section === "dsl"
      ? planGroups.filter((group) => group.category === "Home DSL")
      : section === "dslAddons"
        ? planGroups.filter((group) => group.category === "إضافات Home DSL")
        : section === "plans" && selectedPlanCategory
          ? planGroups.filter((group) => group.category === selectedPlanCategory)
          : planGroups;
  const premierPlans = useMemo(() => (premierGroup?.plans ?? []).filter((plan) => matchesResource(plan, term)), [term]);
  const freeMaxMatches = matchesResource(ORANGE_FREEMAX, term);
  const routerMatches = useMemo(() => ORANGE_DSL_ROUTERS.filter((item) => matchesResource(item, term)), [term]);

  const copy = async (value: string, success: string) => {
    try {
      await Clipboard.setStringAsync(value);
      showNotice(success);
    } catch {
      showNotice("تعذر النسخ على هذا الجهاز");
    }
  };

  const selectMain = (main: MainSection) => {
    setSelectedPlanCategory(null);
    setSection(main === "packages" ? "plans" : main === "support" ? "hunts" : "docs");
    setQuery("");
  };

  const selectSection = (next: Section) => {
    setSection(next);
    setSelectedPlanCategory(null);
    setQuery("");
  };

  return (
    <View style={styles.page}>
      <BackHeader title="مكتبة Orange" backLabel="الموسوعة" onBack={onBack} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.subtitle}>المراجع الأساسية محفوظة محليًا؛ اختار نوع المحتوى ثم ابحث أو انسخ ما تحتاجه.</Text>
        <View style={styles.sourceNotice}>
          <View style={styles.sourceHeader}><Ionicons name="shield-checkmark-outline" size={16} color={COLORS.orange} /><Text style={styles.sourceTitle}>مرجع محلي غير رسمي</Text><Text style={styles.sourceDate}>{ORANGE_SOURCE_SNAPSHOT}</Text></View>
          <Text style={styles.sourceText}>تم التحقق من أسعار الباقات في {ORANGE_PRICES_VERIFIED_ON}. راجع المصدر الحالي قبل الاعتماد.</Text>
          <Text style={styles.sourceUrl}>{ORANGE_SOURCE_URL.replace(/^https?:\/\//, "")}</Text>
        </View>

        <View style={styles.mainTabs}>
          {mainTabs.map((item) => {
            const selected = activeMain === item.id;
            return <Pressable key={item.id} onPress={() => selectMain(item.id)} style={[styles.mainTab, selected && styles.mainTabActive]} accessibilityRole="button" accessibilityState={{ selected }}>
              <View style={[styles.mainTabIcon, selected && styles.mainTabIconActive]}><Ionicons name={item.icon} size={18} color={selected ? COLORS.orange : COLORS.muted} /></View>
              <Text style={[styles.mainTabText, selected && styles.mainTabTextActive]} numberOfLines={1}>{item.label}</Text>
            </Pressable>;
          })}
        </View>

        {secondarySections.length > 0 ? <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.subTabs}>
          {secondarySections.map((item) => <Pressable key={item.id} onPress={() => selectSection(item.id)} style={[styles.subTab, section === item.id && styles.subTabActive]} accessibilityRole="button" accessibilityState={{ selected: section === item.id }}><Text style={[styles.subTabText, section === item.id && styles.subTabTextActive]}>{item.label}</Text></Pressable>)}
        </ScrollView> : <View style={styles.docsSubLabel}><Text style={styles.docsSubLabelText}>المراجع والروابط الداخلية</Text></View>}

        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color={COLORS.orange} />
          <TextInput value={query} onChangeText={setQuery} placeholder="ابحث داخل القسم المحدد..." placeholderTextColor="#9b9ba4" style={styles.searchInput} textAlign="right" returnKeyType="search" accessibilityLabel="البحث في مكتبة Orange" />
          {query ? <Pressable onPress={() => setQuery("")} style={styles.clearSearch} accessibilityRole="button" accessibilityLabel="مسح البحث"><Ionicons name="close-circle" size={19} color={COLORS.muted} /></Pressable> : null}
        </View>
        {notice ? <View style={styles.notice}><Ionicons name="checkmark-circle" size={16} color={COLORS.green} /><Text style={styles.noticeText}>{notice}</Text></View> : null}

        {section === "hunts" ? <>
          <ResultHeading count={hunts.length} label="جهة اتصال" />
          {hunts.map((item, index) => <Card key={`${item.number}-${index}`} style={styles.card}>
            <View style={styles.contactHeader}><View style={styles.contactIcon}><Ionicons name="call-outline" size={17} color={COLORS.orange} /></View><Text style={styles.cardTitle}>{item.name}</Text></View>
            <Text style={styles.description}>{item.type} · {item.number}</Text>
            <ActionButton label="نسخ الرقم" icon="▣" variant="soft" compact onPress={() => void copy(item.number, "اتنسخ الرقم ✓")} style={styles.action} />
          </Card>)}
          {hunts.length === 0 ? <Empty /> : null}
        </> : null}

        {section === "emails" ? <>
          <ResultHeading count={emails.length} label="بريد إلكتروني" />
          {emails.map((item, index) => <Card key={`${item.email}-${index}`} style={styles.card}>
            <View style={styles.contactHeader}><View style={styles.contactIcon}><Ionicons name="mail-outline" size={17} color={COLORS.orange} /></View><Text style={styles.cardTitle}>{item.name}</Text></View>
            <Text selectable style={styles.email}>{item.email}</Text>
            {item.description ? <Text style={styles.description}>{item.description}</Text> : null}
            <ActionButton label="نسخ البريد" icon="▣" variant="soft" compact onPress={() => void copy(item.email, "اتنسخ البريد ✓")} style={styles.action} />
          </Card>)}
          {emails.length === 0 ? <Empty /> : null}
        </> : null}

        {section === "dsl" || section === "dslAddons" ? <View style={styles.sourceNotice}>
          <View style={styles.sourceHeader}><Ionicons name="information-circle-outline" size={16} color={COLORS.orange} /><Text style={styles.sourceTitle}>{section === "dsl" ? "أسعار Home DSL" : "الإضافات وأسعارها"}</Text></View>
          <Text style={styles.sourceText}>{section === "dsl" ? ORANGE_DSL_OFFER_NOTE : "الأسعار المعروضة للإضافات نهائية وشاملة الضريبة حسب المصدر."}</Text>
        </View> : null}

        {section === "plans" || section === "otherPlans" || section === "dsl" || section === "dslAddons" ? <>
          <ResultHeading count={visiblePlanGroups.reduce((sum, group) => sum + group.plans.length, 0)} label="باقة مطابقة" />
          {visiblePlanGroups.map((group) => <View key={group.category}>
            <View style={styles.groupHeading}><Text style={styles.groupTitle}>{group.category}</Text><Text style={styles.groupCount}>{group.plans.length}</Text></View>
            {group.plans.map((plan, index) => <PackageCard key={`${plan.name}-${index}`} record={plan as unknown as DataRecord} title={plan.name} category={group.category} />)}
          </View>)}
          {visiblePlanGroups.length === 0 ? <Empty /> : null}
        </> : null}

        {section === "premier" ? <>
          <View style={styles.featureBanner}><Ionicons name="ribbon-outline" size={22} color={COLORS.orange} /><View style={styles.featureCopy}><Text style={styles.featureTitle}>بريمير · Orange Premier</Text><Text style={styles.featureSubtitle}>تفاصيل الباقات ومزاياها من اللقطة المحلية</Text></View></View>
          <ResultHeading count={premierPlans.length} label="باقة مطابقة" />
          {premierPlans.map((plan, index) => <PackageCard key={`premier-${plan.name}-${index}`} record={plan as unknown as DataRecord} title={plan.name} category="Orange Premier" />)}
          {premierPlans.length === 0 ? <Empty /> : null}
        </> : null}

        {section === "freemax" ? freeMaxMatches ? <FreeMaxSection query={term} /> : <Empty /> : null}

        {section === "routers" ? <>
          <View style={styles.featureBanner}><Ionicons name="hardware-chip-outline" size={22} color={COLORS.orange} /><View style={styles.featureCopy}><Text style={styles.featureTitle}>أجهزة راوتر VDSL</Text><Text style={styles.featureSubtitle}>سعر الكاش للعميل الحالي والجديد وخيارات التقسيط</Text></View></View>
          <ResultHeading count={routerMatches.length} label="جهاز" />
          {routerMatches.map((router, index) => <PackageCard key={`${router.name}-${index}`} record={router as unknown as DataRecord} title={router.name} category="Home DSL · راوتر" />)}
          {routerMatches.length === 0 ? <Empty /> : null}
        </> : null}

        {section === "docs" ? <>
          <ResultHeading count={docs.length} label="مرجع" />
          <Card style={styles.linkNotice}><Text style={styles.description}>روابط Docs Hub محفوظة محليًا. التطبيق لا يفتحها ولا ينزّل ملفاتها تلقائيًا؛ يمكنك نسخ الرابط واستخدامه يدويًا.</Text></Card>
          {docs.map((item, index) => <Card key={`${item.title}-${index}`} style={styles.card}>
            <View style={styles.contactHeader}><View style={styles.contactIcon}><Ionicons name="document-text-outline" size={17} color={COLORS.orange} /></View><Text style={styles.cardTitle}>{item.title}</Text></View>
            {item.description ? <Text style={styles.description}>{item.description}</Text> : null}
            <Text selectable style={styles.url} numberOfLines={3}>{item.url}</Text>
            <ActionButton label="نسخ رابط المستند" icon="▣" variant="soft" compact onPress={() => void copy(item.url, "اتنسخ رابط المستند ✓")} style={styles.action} />
          </Card>)}
          {docs.length === 0 ? <Empty /> : null}
        </> : null}

        <Footer />
      </ScrollView>
    </View>
  );
}

function ResultHeading({ count, label }: { count: number; label: string }) {
  return <View style={styles.resultHeading}><Text style={styles.count}>{count.toLocaleString("en-US")} {label}</Text><View style={styles.resultIndicator}><View style={styles.resultDot} /><Text style={styles.resultIndicatorText}>نتائج محلية</Text></View></View>;
}

function FreeMaxSection({ query }: { query: string }) {
  const data = ORANGE_FREEMAX as unknown as DataRecord;
  const stringArray = (key: string) => Array.isArray(data[key]) ? (data[key] as unknown[]).filter((item) => typeof item === "string") as string[] : [];
  const objectArray = (key: string) => Array.isArray(data[key]) ? (data[key] as DataRecord[]) : [];
  const highlights = stringArray("highlights");
  const perks = objectArray("globalPerks");
  const plans = objectArray("plans").filter((item) => matchesResource(item, query));
  const weeklyRecord = data.weekly && typeof data.weekly === "object" && !Array.isArray(data.weekly) ? data.weekly as DataRecord : null;
  const weeklyMatches = weeklyRecord ? matchesResource(weeklyRecord, query) : false;
  const selectedHighlights = query ? highlights.filter((item) => matchesResource(item, query)) : highlights;
  const selectedPerks = query ? perks.filter((item) => matchesResource(item, query)) : perks;
  return <>
    {!query || matchesResource(data.tagline, query) || matchesResource(data.simPrice, query) ? <Card style={styles.freeMaxIntro}>
      <View style={styles.freeMaxIntroTop}><View style={styles.freeMaxIcon}><Ionicons name="sparkles-outline" size={20} color={COLORS.orange} /></View><View style={styles.featureCopy}><Text style={styles.freeMaxTagline}>{String(data.tagline ?? "FreeMax")}</Text><Text style={styles.description}>سعر الشريحة: {String(data.simPrice ?? "—")}</Text></View></View>
      <View style={styles.localDataBadge}><Ionicons name="cloud-offline-outline" size={13} color={COLORS.green} /><Text style={styles.localDataText}>بيانات محفوظة محليًا</Text></View>
    </Card> : null}
    {selectedHighlights.length > 0 ? <StringList title="أبرز المزايا" items={selectedHighlights} /> : null}
    {selectedPerks.length > 0 ? <View><View style={styles.groupHeading}><Text style={styles.groupTitle}>المزايا العامة</Text><Text style={styles.groupCount}>{selectedPerks.length}</Text></View>{selectedPerks.map((item, index) => <DataCard key={`perk-${index}`} record={item} omit={["color", "icon"]} title={String(item.label ?? `ميزة ${index + 1}`)} />)}</View> : null}
    {plans.length > 0 ? <View><View style={styles.groupHeading}><Text style={styles.groupTitle}>الباقات الشهرية</Text><Text style={styles.groupCount}>{plans.length}</Text></View>{plans.map((item, index) => <PackageCard key={`plan-${index}`} record={item} omit={["name"]} title={String(item.name ?? `باقة ${index + 1}`)} category="FreeMax · شهري" />)}</View> : null}
    {weeklyMatches && weeklyRecord ? <View><View style={styles.groupHeading}><Text style={styles.groupTitle}>الباقة الأسبوعية</Text><Text style={styles.groupCount}>1</Text></View><PackageCard record={weeklyRecord} omit={["name"]} title={String(weeklyRecord.nameAr ?? weeklyRecord.name ?? "FREEmax Weekly")} category="FreeMax · أسبوعي" /></View> : null}
    {selectedHighlights.length === 0 && selectedPerks.length === 0 && plans.length === 0 && !weeklyMatches && query ? <Empty /> : null}
  </>;
}

function StringList({ title, items }: { title: string; items: string[] }) {
  return <Card style={styles.card}><View style={styles.groupHeading}><Text style={styles.groupTitle}>{title}</Text><Text style={styles.groupCount}>{items.length}</Text></View>{items.map((item, index) => <View key={`${index}-${item}`} style={styles.listItemRow}><View style={styles.listBullet} /><Text style={styles.listItem}>{item}</Text></View>)}</Card>;
}

function PackageCard({ record, title, category, omit = [] }: { record: DataRecord; title: string; category: string; omit?: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const entries = Object.entries(record).filter(([key, value]) => !omit.includes(key) && key !== "name" && key !== "icon" && key !== "color" && value !== null && value !== undefined).map(([key, value]) => ({ key, label: fieldLabel(key), value: formatValue(value) })).filter((item) => item.value);
  const priority = ["monthlyPrice", "fees", "price", "renewalPrice", "activationWithTax", "customerPrice", "simPrice", "speed", "quota", "data", "internet", "minutes", "units", "cashPriceNew", "cashPriceExisting", "installmentMonthly", "installmentTotal", "capacity"];
  const prioritized = entries.filter((item) => priority.includes(item.key)).sort((a, b) => priority.indexOf(a.key) - priority.indexOf(b.key));
  const highlights = (prioritized.length ? prioritized : entries).slice(0, 4);
  const highlightKeys = new Set(highlights.map((item) => item.key));
  const details = entries.filter((item) => !highlightKeys.has(item.key));
  return <Card style={styles.packageCard}>
    <View style={styles.packageHeader}>
      <View style={styles.packageIcon}><Ionicons name="pricetag-outline" size={17} color={COLORS.orange} /></View>
      <View style={styles.packageTitleCopy}><Text style={styles.packageTitle}>{title}</Text><Text style={styles.packageCategory}>{category}</Text></View>
    </View>
    {highlights.length > 0 ? <View style={styles.highlightGrid}>{highlights.map((item) => <View key={item.key} style={styles.highlightCell}><Text style={styles.highlightLabel}>{item.label}</Text><Text style={styles.highlightValue} numberOfLines={2}>{item.value}</Text></View>)}</View> : null}
    {details.length > 0 ? <>
      <Pressable onPress={() => setExpanded((current) => !current)} style={styles.packageDetailsToggle} accessibilityRole="button" accessibilityState={{ expanded }}>
        <Text style={styles.packageDetailsToggleText}>{expanded ? "إخفاء التفاصيل" : `كل تفاصيل الباقة · ${details.length}`}</Text>
        <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={17} color={COLORS.orange} />
      </Pressable>
      {expanded ? <View style={styles.packageDetails}>{details.map((item) => <View key={item.key} style={styles.detailRow}><Text style={styles.detailLabel}>{item.label}</Text><Text selectable style={styles.detailValue}>{item.value}</Text></View>)}</View> : null}
    </> : null}
  </Card>;
}

function DataCard({ record, title, omit = [] }: { record: DataRecord; title: string; omit?: string[] }) {
  const rows = Object.entries(record).filter(([key, value]) => !omit.includes(key) && value !== null && value !== undefined && key !== "icon" && key !== "color").map(([key, value]) => [key, formatValue(value)] as const).filter(([, value]) => value);
  return <Card style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    {rows.map(([key, value]) => <View key={key} style={styles.detailRow}><Text style={styles.detailLabel}>{fieldLabel(key)}</Text><Text selectable style={styles.detailValue}>{value}</Text></View>)}
  </Card>;
}

function Empty() {
  return <Card style={styles.emptyCard}><View style={styles.emptyIcon}><Ionicons name="search-outline" size={22} color={COLORS.orange} /></View><Text style={styles.emptyTitle}>مفيش نتائج في القسم ده</Text><Text style={styles.emptyText}>جرّب كلمة تانية أو امسح البحث لعرض المحتوى كله.</Text></Card>;
}

function fieldLabel(key: string) {
  const labels: Record<string, string> = {
    minutes: "الدقائق", data: "الإنترنت", familyLines: "خطوط العائلة", adslDiscount: "خصم DSL", hwDiscount: "خصم Home Wireless",
    dataRoaming: "التجوال", intlMinutes: "دقائق دولية", installment: "التقسيط", subscriptions: "الاشتراكات", fees: "السعر",
    units: "الوحدات", afterFinish: "بعد انتهاء الباقة", internet: "الإنترنت", name: "الاسم", number: "الرقم", type: "النوع",
    description: "التفاصيل", detail: "التفاصيل", label: "الميزة", price: "السعر", monthlyPrice: "السعر الشهري شامل الضريبة", previousPrice: "السعر السابق", taxIncluded: "السعر شامل الضريبة", status: "الحالة", renewalPrice: "سعر التجديد للعميل", activationWithTax: "سعر التفعيل شامل الضريبة", activationNoTax: "سعر التفعيل قبل الضريبة", customerPrice: "إجمالي بداية الخط (الخط + التفعيل)", channels: "قنوات التجديد",
    hasPerks: "المزايا", simPrice: "سعر الشريحة/الخط", tagLine: "الملخص", tagline: "الملخص", capacity: "السعة", speed: "السرعة", quota: "السعة الشهرية", color: "اللون", icon: "الأيقونة",
    cashPriceExisting: "سعر الكاش للعميل الحالي", cashPriceNew: "سعر الكاش للعميل الجديد", installmentMonthly: "القسط الشهري", installmentDuration: "مدة التقسيط", installmentTotal: "إجمالي التقسيط", coverage: "التغطية", features: "المزايا", nameAr: "الاسم بالعربية", nameEn: "الاسم بالإنجليزية", validity: "الصلاحية", duration: "المدة", category: "التصنيف", perks: "المزايا",
  };
  return labels[key] ?? key;
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: COLORS.background },
  content: { width: "100%", maxWidth: 900, alignSelf: "center", paddingHorizontal: 16, paddingBottom: 34 },
  subtitle: { color: COLORS.muted, textAlign: "right", fontFamily: "Tajawal_400Regular", fontSize: 12, lineHeight: 18, marginBottom: 10 },
  sourceNotice: { backgroundColor: "#fff7ef", borderRadius: 15, borderWidth: 1, borderColor: "#ffe0c5", paddingHorizontal: 11, paddingVertical: 9, marginBottom: 12 },
  sourceHeader: { flexDirection: "row-reverse", alignItems: "center", gap: 5 },
  sourceTitle: { flex: 1, color: COLORS.orange, textAlign: "right", fontFamily: "Tajawal_700Bold", fontSize: 11 },
  sourceDate: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 9 },
  sourceText: { color: COLORS.text, textAlign: "right", fontFamily: "Tajawal_400Regular", fontSize: 10, lineHeight: 16, marginTop: 3 },
  sourceUrl: { color: COLORS.muted, textAlign: "left", fontFamily: "Tajawal_400Regular", fontSize: 8, marginTop: 2 },
  mainTabs: { flexDirection: "row-reverse", gap: 7, marginBottom: 10 },
  mainTab: { flex: 1, minHeight: 55, borderRadius: 15, borderWidth: 1, borderColor: COLORS.divider, backgroundColor: COLORS.white, alignItems: "center", justifyContent: "center", gap: 3, paddingHorizontal: 5 },
  mainTabActive: { backgroundColor: COLORS.orangeSoft, borderColor: "#ffd5b5" },
  mainTabIcon: { width: 26, height: 25, borderRadius: 9, backgroundColor: "#f5f5f7", alignItems: "center", justifyContent: "center" },
  mainTabIconActive: { backgroundColor: "rgba(255,255,255,0.78)" },
  mainTabText: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 10 },
  mainTabTextActive: { color: COLORS.orange, fontFamily: "Tajawal_700Bold" },
  subTabs: { flexDirection: "row-reverse", gap: 7, paddingBottom: 9 },
  subTab: { backgroundColor: COLORS.white, borderRadius: 99, borderWidth: 1, borderColor: COLORS.divider, paddingHorizontal: 12, paddingVertical: 7 },
  subTabActive: { backgroundColor: COLORS.dark, borderColor: COLORS.dark },
  subTabText: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 10 },
  subTabTextActive: { color: COLORS.white, fontFamily: "Tajawal_700Bold" },
  docsSubLabel: { minHeight: 32, justifyContent: "center", alignItems: "flex-end", paddingHorizontal: 2, marginBottom: 5 },
  docsSubLabelText: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 10 },
  searchBox: { minHeight: 47, borderRadius: 15, borderWidth: 1, borderColor: COLORS.divider, backgroundColor: COLORS.white, flexDirection: "row-reverse", alignItems: "center", gap: 8, paddingHorizontal: 11, marginBottom: 9 },
  searchInput: { flex: 1, color: COLORS.text, fontFamily: "Tajawal_400Regular", fontSize: 13, paddingVertical: 8 },
  clearSearch: { width: 27, height: 33, alignItems: "center", justifyContent: "center" },
  notice: { backgroundColor: "#eaf8f1", padding: 8, borderRadius: 12, marginBottom: 9, flexDirection: "row-reverse", alignItems: "center", justifyContent: "center", gap: 5 },
  noticeText: { textAlign: "center", color: COLORS.green, fontFamily: "Tajawal_700Bold", fontSize: 11 },
  resultHeading: { flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between", marginTop: 2, marginBottom: 8 },
  count: { color: COLORS.text, textAlign: "right", fontFamily: "Tajawal_700Bold", fontSize: 12 },
  resultIndicator: { flexDirection: "row-reverse", alignItems: "center", gap: 4 },
  resultDot: { width: 6, height: 6, borderRadius: 4, backgroundColor: COLORS.green },
  resultIndicatorText: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 9 },
  card: { padding: 14 },
  cardTitle: { color: COLORS.text, textAlign: "right", fontFamily: "Tajawal_700Bold", fontSize: 13, flex: 1 },
  contactHeader: { flexDirection: "row-reverse", alignItems: "center", gap: 8 },
  contactIcon: { width: 32, height: 32, borderRadius: 11, backgroundColor: COLORS.orangeSoft, alignItems: "center", justifyContent: "center" },
  description: { color: COLORS.muted, textAlign: "right", fontFamily: "Tajawal_400Regular", fontSize: 10, lineHeight: 17, marginTop: 4 },
  email: { color: COLORS.orange, textAlign: "left", fontFamily: "Tajawal_700Bold", fontSize: 12, marginTop: 7 },
  url: { color: COLORS.muted, textAlign: "left", fontFamily: "Tajawal_400Regular", fontSize: 9, lineHeight: 14, marginTop: 6 },
  action: { marginTop: 9, alignSelf: "flex-start" },
  linkNotice: { backgroundColor: "#fff7ef", borderColor: "#ffe0c5" },
  groupHeading: { flexDirection: "row-reverse", alignItems: "center", gap: 7, marginTop: 5, marginBottom: 8 },
  groupTitle: { color: COLORS.text, textAlign: "right", fontFamily: "Tajawal_700Bold", fontSize: 15 },
  groupCount: { minWidth: 24, height: 22, textAlign: "center", textAlignVertical: "center", overflow: "hidden", color: COLORS.orange, backgroundColor: COLORS.orangeSoft, borderRadius: 8, paddingHorizontal: 6, fontFamily: "Tajawal_700Bold", fontSize: 9 },
  featureBanner: { flexDirection: "row-reverse", alignItems: "center", gap: 9, borderRadius: 16, borderWidth: 1, borderColor: "#ffdfc3", backgroundColor: "#fff8f2", padding: 12, marginTop: 2, marginBottom: 10 },
  featureCopy: { flex: 1, alignItems: "flex-end" },
  featureTitle: { color: COLORS.text, fontFamily: "Tajawal_700Bold", fontSize: 14, textAlign: "right" },
  featureSubtitle: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 10, textAlign: "right", marginTop: 1 },
  packageCard: { padding: 13, marginBottom: 10 },
  packageHeader: { flexDirection: "row-reverse", alignItems: "center", gap: 9 },
  packageIcon: { width: 35, height: 35, borderRadius: 12, backgroundColor: COLORS.orangeSoft, alignItems: "center", justifyContent: "center" },
  packageTitleCopy: { flex: 1, alignItems: "flex-end" },
  packageTitle: { color: COLORS.text, textAlign: "right", fontFamily: "Tajawal_700Bold", fontSize: 14 },
  packageCategory: { color: COLORS.muted, textAlign: "right", fontFamily: "Tajawal_400Regular", fontSize: 9, marginTop: 1 },
  highlightGrid: { flexDirection: "row-reverse", flexWrap: "wrap", gap: 7, marginTop: 11 },
  highlightCell: { width: "48.5%", minHeight: 50, borderRadius: 12, backgroundColor: "#fff8f2", borderWidth: 1, borderColor: "#ffead8", paddingHorizontal: 9, paddingVertical: 7, justifyContent: "center" },
  highlightLabel: { color: COLORS.muted, textAlign: "right", fontFamily: "Tajawal_400Regular", fontSize: 9 },
  highlightValue: { color: COLORS.text, textAlign: "right", fontFamily: "Tajawal_700Bold", fontSize: 11, lineHeight: 16, marginTop: 1 },
  packageDetailsToggle: { flexDirection: "row-reverse", alignItems: "center", alignSelf: "flex-start", gap: 4, marginTop: 9, paddingVertical: 4 },
  packageDetailsToggleText: { color: COLORS.orange, fontFamily: "Tajawal_700Bold", fontSize: 10 },
  packageDetails: { borderTopWidth: 1, borderTopColor: COLORS.divider, marginTop: 5, paddingTop: 2 },
  detailRow: { flexDirection: "row-reverse", justifyContent: "space-between", alignItems: "flex-start", gap: 10, borderTopWidth: 1, borderTopColor: COLORS.divider, paddingTop: 7, marginTop: 7 },
  detailLabel: { color: COLORS.muted, textAlign: "right", fontFamily: "Tajawal_400Regular", fontSize: 10, flex: 0.9 },
  detailValue: { color: COLORS.text, textAlign: "left", fontFamily: "Tajawal_400Regular", fontSize: 11, lineHeight: 17, flex: 1.2 },
  freeMaxIntro: { backgroundColor: "#fff9f3", borderColor: "#ffe0c5", padding: 14 },
  freeMaxIntroTop: { flexDirection: "row-reverse", alignItems: "center", gap: 9 },
  freeMaxIcon: { width: 40, height: 40, borderRadius: 14, backgroundColor: "#fff0e3", alignItems: "center", justifyContent: "center" },
  freeMaxTagline: { color: COLORS.orange, textAlign: "right", fontFamily: "Tajawal_700Bold", fontSize: 14, lineHeight: 20 },
  localDataBadge: { flexDirection: "row-reverse", alignItems: "center", gap: 4, alignSelf: "flex-start", backgroundColor: "#eaf8f1", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 99, marginTop: 9 },
  localDataText: { color: COLORS.green, fontFamily: "Tajawal_700Bold", fontSize: 9 },
  listItemRow: { flexDirection: "row-reverse", alignItems: "flex-start", gap: 8, marginTop: 5 },
  listBullet: { width: 6, height: 6, borderRadius: 4, backgroundColor: COLORS.orange, marginTop: 7 },
  listItem: { flex: 1, color: COLORS.text, textAlign: "right", fontFamily: "Tajawal_400Regular", fontSize: 11, lineHeight: 18 },
  emptyCard: { alignItems: "center", paddingVertical: 22, paddingHorizontal: 16 },
  emptyIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: COLORS.orangeSoft, alignItems: "center", justifyContent: "center", marginBottom: 7 },
  emptyTitle: { color: COLORS.text, fontFamily: "Tajawal_700Bold", fontSize: 13, textAlign: "center" },
  emptyText: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 10, lineHeight: 17, textAlign: "center", marginTop: 3 },
});
