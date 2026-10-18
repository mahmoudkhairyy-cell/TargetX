import { useEffect, useMemo, useRef, useState } from "react";
import { Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Clipboard from "expo-clipboard";
import { COLORS } from "@/lib/targetx/constants";
import { normalizeSearchCode, normalizeSearchText } from "@/lib/targetx/search";
import { getSRRecords, SR_SOURCE, type SRRecord } from "@/lib/targetx/sr";
import { ActionButton, BackHeader, Card, Footer } from "./UI";

const MAX_VISIBLE = 60;

export function SRScreen({ onBack }: { onBack: () => void }) {
  const records = useMemo(() => getSRRecords(), []);
  const categories = useMemo(() => ["الكل", ...Array.from(new Set(records.map((record) => record.k))).sort((a, b) => a.localeCompare(b, "ar"))], [records]);
  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const record of records) counts.set(record.k, (counts.get(record.k) ?? 0) + 1);
    return counts;
  }, [records]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("الكل");
  const [reviewOnly, setReviewOnly] = useState(false);
  const [categoryPickerOpen, setCategoryPickerOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const normalizedQuery = normalizeSearchText(query);
  const codeQuery = normalizeSearchCode(query);
  const reviewCount = useMemo(() => records.filter((record) => record.r).length, [records]);

  useEffect(() => () => {
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
  }, []);

  const filtered = useMemo(() => records.filter((record) => {
    if (category !== "الكل" && record.k !== category) return false;
    if (reviewOnly && !record.r) return false;
    if (!normalizedQuery) return true;
    const code = normalizeSearchCode(record.c);
    const searchable = [record.ta, record.te, record.k, record.da, record.steps].map(normalizeSearchText);
    return (!!codeQuery && code.includes(codeQuery)) || searchable.some((field) => field.includes(normalizedQuery));
  }), [category, codeQuery, normalizedQuery, records, reviewOnly]);
  const visible = filtered.slice(0, MAX_VISIBLE);

  const showNotice = (message: string) => {
    setNotice(message);
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(""), 2400);
  };

  const copyRecord = async (record: SRRecord) => {
    const text = `SR #${record.c} - ${record.ta || record.te}`;
    if (Platform.OS === "web" && typeof navigator !== "undefined" && typeof window !== "undefined" && !navigator.clipboard && (window as Window & { isSecureContext?: boolean }).isSecureContext) {
      showNotice("النسخ مش مدعوم على المتصفح ده");
      return;
    }
    try {
      await Clipboard.setStringAsync(text);
      showNotice("اتنسخ ✓");
    } catch {
      showNotice("متعرفش تنسخ على الجهاز ده");
    }
  };

  return (
    <View style={styles.page}>
      <BackHeader title="موسوعة SR 📚" onBack={onBack} backLabel="الموسوعة" />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <LinearGradient colors={[COLORS.orange, COLORS.orangeLight]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
          <View style={styles.heroTop}>
            <View style={styles.heroIcon}><Ionicons name="book-outline" size={23} color={COLORS.white} /></View>
            <View style={styles.heroCopy}>
              <Text style={styles.heroTitle}>دليل SR اليومي</Text>
              <Text style={styles.heroSubtitle}>الأكواد والإجراءات في مكان واحد</Text>
            </View>
          </View>
          <View style={styles.heroStats}>
            <View style={styles.heroStat}><Text style={styles.heroStatValue}>{records.length.toLocaleString("en-US")}</Text><Text style={styles.heroStatLabel}>سجل</Text></View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStat}><Text style={styles.heroStatValue}>{Math.max(0, categories.length - 1).toLocaleString("en-US")}</Text><Text style={styles.heroStatLabel}>تصنيف</Text></View>
            <Text style={styles.heroHint}>ابحث بالكود أو العنوان أو الخطوة</Text>
          </View>
        </LinearGradient>

        <View style={styles.searchBox}>
          <Ionicons name="search" size={19} color={COLORS.orange} />
          <TextInput value={query} onChangeText={setQuery} placeholder="كود مثل 31490 أو كلمة مثل DSL" placeholderTextColor="#9b9ba4" style={styles.searchInput} textAlign="right" returnKeyType="search" accessibilityLabel="البحث في موسوعة SR" />
          {query ? <Pressable onPress={() => setQuery("")} style={styles.clearSearch} accessibilityRole="button" accessibilityLabel="مسح البحث"><Ionicons name="close-circle" size={20} color={COLORS.muted} /></Pressable> : null}
        </View>

        <View style={styles.filterHeadingRow}>
          <Text style={styles.filterLabel}>تصفية النتائج</Text>
          <Text style={styles.filterHint}>اختار التصنيف المناسب</Text>
        </View>
        <Pressable onPress={() => setCategoryPickerOpen(true)} style={styles.categoryPicker} accessibilityRole="button" accessibilityLabel={`التصنيف الحالي ${category}`}>
          <View style={styles.filterIcon}><Ionicons name="options-outline" size={18} color={COLORS.orange} /></View>
          <View style={styles.categoryPickerCopy}>
            <Text style={styles.categoryPickerTitle}>{category}</Text>
            <Text style={styles.categoryPickerCount}>{category === "الكل" ? `${records.length} سجل في كل التصنيفات` : `${categoryCounts.get(category) ?? 0} سجل في التصنيف`}</Text>
          </View>
          <Ionicons name="chevron-down" size={19} color={COLORS.muted} />
        </Pressable>
        <Pressable onPress={() => setReviewOnly((current) => !current)} style={[styles.reviewFilter, reviewOnly && styles.reviewFilterActive]} accessibilityRole="button" accessibilityState={{ selected: reviewOnly }}>
          <Ionicons name={reviewOnly ? "checkbox" : "square-outline"} size={17} color={reviewOnly ? COLORS.orange : COLORS.muted} />
          <Text style={[styles.reviewFilterText, reviewOnly && styles.reviewFilterTextActive]}>يحتاج مراجعة</Text>
          <Text style={[styles.reviewFilterCount, reviewOnly && styles.reviewFilterTextActive]}>{reviewCount.toLocaleString("en-US")}</Text>
        </Pressable>

        <View style={styles.resultSummary}>
          <View><Text style={styles.resultTitle}>النتائج</Text><Text style={styles.resultSub}>حسب البحث والتصنيف المحدد</Text></View>
          <View style={styles.resultCountPill}><Text style={styles.resultCountValue}>{filtered.length.toLocaleString("en-US")}</Text><Text style={styles.resultCountLabel}>نتيجة</Text></View>
        </View>
        <Text style={styles.resultTotal}>من أصل {records.length.toLocaleString("en-US")} سجل{filtered.length > MAX_VISIBLE ? " · أول 60 بس، ضيّق البحث" : ""}</Text>

        <View style={styles.warning}><Ionicons name="warning-outline" size={17} color="#904400" /><Text style={styles.warningText}>البيانات مرجع محلي غير رسمي، وبعض السجلات تحتاج مراجعة. راجع المصدر الحالي قبل الاعتماد.</Text></View>
        {notice ? <View style={styles.notice}><Ionicons name="checkmark-circle" size={17} color={COLORS.green} /><Text style={styles.noticeText}>{notice}</Text></View> : null}
        {visible.length === 0 ? <EmptyState hasData={records.length > 0} /> : visible.map((record) => <SRCard key={record.c} record={record} onCopy={() => void copyRecord(record)} />)}
        <Text style={styles.source}>المصدر: {SR_SOURCE} · orange-sr-cshunts.vercel.app · نسخة محلية غير رسمية</Text>
        <Footer />
      </ScrollView>

      <Modal visible={categoryPickerOpen} transparent animationType="slide" onRequestClose={() => setCategoryPickerOpen(false)}>
        <View style={styles.modalRoot}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setCategoryPickerOpen(false)} accessibilityRole="button" accessibilityLabel="إغلاق اختيار التصنيف" />
          <View style={styles.filterSheet}>
            <View style={styles.sheetHandle} />
            <View style={styles.sheetHeader}>
              <View style={styles.sheetHeaderCopy}><Text style={styles.sheetTitle}>اختار تصنيف SR</Text><Text style={styles.sheetSubtitle}>كل التصنيفات متاحة للبحث والتصفية</Text></View>
              <Pressable onPress={() => setCategoryPickerOpen(false)} style={styles.sheetClose} accessibilityRole="button" accessibilityLabel="إغلاق"><Ionicons name="close" size={19} color={COLORS.text} /></Pressable>
            </View>
            <ScrollView contentContainerStyle={styles.categoryOptions} showsVerticalScrollIndicator={false}>
              {categories.map((item) => {
                const count = item === "الكل" ? records.length : categoryCounts.get(item) ?? 0;
                const selected = category === item;
                return <Pressable key={item} onPress={() => { setCategory(item); setCategoryPickerOpen(false); }} style={[styles.categoryOption, selected && styles.categoryOptionSelected]} accessibilityRole="button" accessibilityState={{ selected }}>
                  <View style={styles.optionCount}><Text style={[styles.optionCountText, selected && styles.optionCountTextSelected]}>{count.toLocaleString("en-US")}</Text></View>
                  <Text style={[styles.categoryOptionText, selected && styles.categoryOptionTextSelected]}>{item}</Text>
                  {selected ? <Ionicons name="checkmark-circle" size={19} color={COLORS.orange} /> : <View style={styles.optionSpacer} />}
                </Pressable>;
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function EmptyState({ hasData }: { hasData: boolean }) {
  return <Card style={styles.emptyCard}>
    <View style={styles.emptyIcon}><Ionicons name={hasData ? "search-outline" : "library-outline"} size={24} color={COLORS.orange} /></View>
    <Text style={styles.emptyTitle}>{hasData ? "مفيش نتايج مطابقة" : "بيانات الموسوعة غير متاحة"}</Text>
    <Text style={styles.emptyText}>{hasData ? "جرّب كودًا أو كلمة مختلفة، أو اختار تصنيفًا آخر." : "تعذر تحميل بيانات الموسوعة المحلية على هذا الجهاز."}</Text>
  </Card>;
}

function SRCard({ record, onCopy }: { record: SRRecord; onCopy: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const hasDistinctSteps = !!record.steps && record.steps.trim() !== record.da.trim();
  const hasExtra = hasDistinctSteps || record.da.length > 180 || (!record.da && !!record.steps);
  const preview = record.da || record.steps;
  return <Card style={styles.recordCard}>
    <View style={styles.recordMeta}>
      <View style={styles.pills}><Text style={styles.codePill}>#{record.c}</Text><Text style={styles.catPill}>{record.k}</Text></View>
      {record.r ? <View style={styles.reviewPill}><Ionicons name="alert-circle-outline" size={13} color="#a55200" /><Text style={styles.reviewPillText}>يحتاج مراجعة</Text></View> : null}
    </View>
    <Text style={styles.recordTitle}>{record.ta || record.te}</Text>
    {record.ta && record.te ? <Text style={styles.english}>{record.te}</Text> : null}
    {preview ? <Text style={styles.description} numberOfLines={hasExtra && !expanded ? 3 : undefined}>{preview}</Text> : null}
    {expanded && hasDistinctSteps ? <View style={styles.stepsPanel}><Text style={styles.stepsTitle}>خطوات الإجراء</Text><Text selectable style={styles.steps}>{record.steps}</Text></View> : null}
    {hasExtra ? <Pressable onPress={() => setExpanded((current) => !current)} style={styles.detailsToggle} accessibilityRole="button" accessibilityState={{ expanded }}>
      <Text style={styles.detailsToggleText}>{expanded ? "إخفاء التفاصيل" : "عرض الوصف وخطوات الإجراء"}</Text>
      <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={17} color={COLORS.orange} />
    </Pressable> : null}
    <ActionButton label="نسخ الكود والعنوان" icon="▣" variant="soft" compact onPress={onCopy} style={styles.copyButton} />
  </Card>;
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: COLORS.background },
  content: { width: "100%", maxWidth: 860, alignSelf: "center", paddingHorizontal: 16, paddingBottom: 34 },
  hero: { borderRadius: 22, padding: 16, marginTop: 2, marginBottom: 12, overflow: "hidden" },
  heroTop: { flexDirection: "row-reverse", alignItems: "center", gap: 11 },
  heroIcon: { width: 45, height: 45, borderRadius: 15, backgroundColor: "rgba(255,255,255,0.22)", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.25)" },
  heroCopy: { flex: 1, alignItems: "flex-end" },
  heroTitle: { color: COLORS.white, fontFamily: "Tajawal_700Bold", fontSize: 19, textAlign: "right" },
  heroSubtitle: { color: "rgba(255,255,255,0.88)", fontFamily: "Tajawal_400Regular", fontSize: 11, textAlign: "right", marginTop: 1 },
  heroStats: { flexDirection: "row-reverse", alignItems: "center", gap: 10, marginTop: 14, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.25)", paddingTop: 10 },
  heroStat: { alignItems: "center", minWidth: 38 },
  heroStatValue: { color: COLORS.white, fontFamily: "Tajawal_700Bold", fontSize: 14 },
  heroStatLabel: { color: "rgba(255,255,255,0.88)", fontFamily: "Tajawal_400Regular", fontSize: 9 },
  heroStatDivider: { height: 25, width: 1, backgroundColor: "rgba(255,255,255,0.35)" },
  heroHint: { flex: 1, textAlign: "left", color: "rgba(255,255,255,0.94)", fontFamily: "Tajawal_700Bold", fontSize: 10 },
  searchBox: { minHeight: 52, borderRadius: 16, borderWidth: 1, borderColor: "#e8e8ed", backgroundColor: COLORS.white, flexDirection: "row-reverse", alignItems: "center", gap: 9, paddingHorizontal: 13, shadowColor: "#1f2029", shadowOpacity: 0.035, shadowRadius: 8, elevation: 1 },
  searchInput: { flex: 1, minHeight: 48, color: COLORS.text, fontFamily: "Tajawal_400Regular", fontSize: 14, paddingVertical: 9 },
  clearSearch: { width: 28, height: 34, alignItems: "center", justifyContent: "center" },
  filterHeadingRow: { flexDirection: "row-reverse", alignItems: "baseline", justifyContent: "space-between", marginTop: 15, marginBottom: 6 },
  filterLabel: { color: COLORS.text, fontFamily: "Tajawal_700Bold", fontSize: 13, textAlign: "right" },
  filterHint: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 10, textAlign: "left" },
  categoryPicker: { minHeight: 58, borderRadius: 16, borderWidth: 1, borderColor: COLORS.divider, backgroundColor: COLORS.white, paddingHorizontal: 11, flexDirection: "row-reverse", alignItems: "center", gap: 10 },
  filterIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: COLORS.orangeSoft, alignItems: "center", justifyContent: "center" },
  categoryPickerCopy: { flex: 1, alignItems: "flex-end" },
  categoryPickerTitle: { color: COLORS.text, fontFamily: "Tajawal_700Bold", fontSize: 13, textAlign: "right" },
  categoryPickerCount: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 10, textAlign: "right", marginTop: 1 },
  reviewFilter: { flexDirection: "row-reverse", alignItems: "center", alignSelf: "flex-start", gap: 6, marginTop: 8, borderRadius: 99, borderWidth: 1, borderColor: COLORS.divider, backgroundColor: COLORS.white, paddingHorizontal: 10, paddingVertical: 6 },
  reviewFilterActive: { borderColor: "#ffd3af", backgroundColor: COLORS.orangeSoft },
  reviewFilterText: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 10 },
  reviewFilterTextActive: { color: COLORS.orange, fontFamily: "Tajawal_700Bold" },
  reviewFilterCount: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 9, marginRight: 1 },
  resultSummary: { flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between", marginTop: 17, marginBottom: 1 },
  resultTitle: { color: COLORS.text, fontFamily: "Tajawal_700Bold", fontSize: 16, textAlign: "right" },
  resultSub: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 10, textAlign: "right", marginTop: 1 },
  resultCountPill: { flexDirection: "row", alignItems: "baseline", gap: 4, borderRadius: 99, backgroundColor: COLORS.orangeSoft, paddingHorizontal: 10, paddingVertical: 5 },
  resultCountValue: { color: COLORS.orange, fontFamily: "Tajawal_700Bold", fontSize: 14 },
  resultCountLabel: { color: COLORS.orange, fontFamily: "Tajawal_400Regular", fontSize: 9 },
  resultTotal: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 10, textAlign: "right", marginBottom: 8 },
  warning: { backgroundColor: "#fff1e5", borderWidth: 1, borderColor: "#ffd0aa", borderRadius: 14, paddingHorizontal: 10, paddingVertical: 9, marginBottom: 10, flexDirection: "row-reverse", alignItems: "center", gap: 7 },
  warningText: { flex: 1, textAlign: "right", color: "#904400", fontFamily: "Tajawal_700Bold", fontSize: 10, lineHeight: 17 },
  notice: { backgroundColor: "#eaf8f1", padding: 8, borderRadius: 12, marginBottom: 9, flexDirection: "row-reverse", alignItems: "center", justifyContent: "center", gap: 5 },
  noticeText: { textAlign: "center", color: COLORS.green, fontFamily: "Tajawal_700Bold", fontSize: 12 },
  emptyCard: { alignItems: "center", paddingVertical: 24, paddingHorizontal: 18 },
  emptyIcon: { width: 48, height: 48, borderRadius: 16, backgroundColor: COLORS.orangeSoft, alignItems: "center", justifyContent: "center", marginBottom: 8 },
  emptyTitle: { color: COLORS.text, fontFamily: "Tajawal_700Bold", fontSize: 14, textAlign: "center" },
  emptyText: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 11, lineHeight: 18, textAlign: "center", marginTop: 3 },
  source: { textAlign: "center", color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 10, lineHeight: 17, marginTop: 13 },
  recordCard: { padding: 14, marginBottom: 11 },
  recordMeta: { flexDirection: "row-reverse", justifyContent: "space-between", alignItems: "center", gap: 6 },
  pills: { flexDirection: "row-reverse", gap: 6, alignItems: "center", flexShrink: 1 },
  codePill: { color: COLORS.white, backgroundColor: COLORS.orange, borderRadius: 99, paddingHorizontal: 9, paddingVertical: 4, overflow: "hidden", fontSize: 10, fontFamily: "Tajawal_700Bold" },
  catPill: { color: COLORS.muted, backgroundColor: "#f1f1f4", borderRadius: 99, paddingHorizontal: 9, paddingVertical: 4, overflow: "hidden", fontSize: 9, fontFamily: "Tajawal_400Regular", flexShrink: 1 },
  reviewPill: { flexDirection: "row-reverse", alignItems: "center", gap: 3, backgroundColor: "#fff5e9", borderRadius: 99, paddingHorizontal: 7, paddingVertical: 4 },
  reviewPillText: { color: "#a55200", fontFamily: "Tajawal_700Bold", fontSize: 9 },
  recordTitle: { textAlign: "right", color: COLORS.text, fontFamily: "Tajawal_700Bold", fontSize: 15, lineHeight: 22, marginTop: 9 },
  english: { textAlign: "right", color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 10, marginTop: 1 },
  description: { textAlign: "right", color: "#4d4d56", fontFamily: "Tajawal_400Regular", fontSize: 12, lineHeight: 20, marginTop: 7 },
  stepsPanel: { backgroundColor: "#f8f8fa", borderRadius: 13, padding: 10, marginTop: 8 },
  stepsTitle: { color: COLORS.text, fontFamily: "Tajawal_700Bold", fontSize: 11, textAlign: "right", marginBottom: 3 },
  steps: { textAlign: "right", color: COLORS.text, fontFamily: "Tajawal_400Regular", fontSize: 11, lineHeight: 19 },
  detailsToggle: { marginTop: 7, paddingVertical: 5, flexDirection: "row-reverse", alignItems: "center", gap: 4, alignSelf: "flex-start" },
  detailsToggleText: { color: COLORS.orange, fontFamily: "Tajawal_700Bold", fontSize: 10 },
  copyButton: { marginTop: 8, alignSelf: "flex-start" },
  modalRoot: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(31,32,41,0.42)" },
  filterSheet: { maxHeight: "82%", backgroundColor: COLORS.background, borderTopLeftRadius: 25, borderTopRightRadius: 25, paddingTop: 9, paddingHorizontal: 16, paddingBottom: 22 },
  sheetHandle: { alignSelf: "center", width: 40, height: 4, borderRadius: 4, backgroundColor: "#d2d2d9", marginBottom: 13 },
  sheetHeader: { flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between", marginBottom: 9 },
  sheetHeaderCopy: { alignItems: "flex-end" },
  sheetTitle: { color: COLORS.text, fontFamily: "Tajawal_700Bold", fontSize: 17, textAlign: "right" },
  sheetSubtitle: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 10, textAlign: "right", marginTop: 1 },
  sheetClose: { width: 34, height: 34, borderRadius: 12, backgroundColor: COLORS.white, alignItems: "center", justifyContent: "center" },
  categoryOptions: { paddingBottom: 10 },
  categoryOption: { minHeight: 47, flexDirection: "row-reverse", alignItems: "center", gap: 9, paddingHorizontal: 11, marginBottom: 6, borderRadius: 14, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.divider },
  categoryOptionSelected: { backgroundColor: COLORS.orangeSoft, borderColor: "#ffd4b4" },
  optionCount: { minWidth: 38, height: 27, borderRadius: 9, backgroundColor: "#f3f3f6", alignItems: "center", justifyContent: "center", paddingHorizontal: 7 },
  optionCountText: { color: COLORS.muted, fontFamily: "Tajawal_700Bold", fontSize: 10 },
  optionCountTextSelected: { color: COLORS.orange },
  categoryOptionText: { flex: 1, textAlign: "right", color: COLORS.text, fontFamily: "Tajawal_400Regular", fontSize: 12 },
  categoryOptionTextSelected: { color: COLORS.orange, fontFamily: "Tajawal_700Bold" },
  optionSpacer: { width: 19 },
});
