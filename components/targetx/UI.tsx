import type { ReactNode } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, APP_FOOTER, formatArabicDate } from "@/lib/targetx/constants";
import { TargetRobot, type RobotMood } from "./Robot";
import type { LocalProfile } from "@/lib/targetx/types";

export function Card({ children, style }: { children: ReactNode; style?: object }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function SectionTitle({ title, action }: { title: string; action?: ReactNode }) {
  return <View style={styles.sectionTitle}><Text style={styles.sectionHeading}>{title}</Text>{action}</View>;
}

export function ActionButton({ label, onPress, variant = "primary", icon, compact = false, disabled = false, style }: {
  label: string; onPress: () => void; variant?: "primary" | "soft" | "outline" | "danger"; icon?: string; compact?: boolean; disabled?: boolean; style?: object;
}) {
  const background = variant === "primary" ? COLORS.orange : variant === "soft" ? COLORS.orangeSoft : variant === "danger" ? "#fff0f1" : COLORS.white;
  const foreground = variant === "primary" ? COLORS.white : variant === "danger" ? COLORS.red : COLORS.orange;
  return (
    <Pressable onPress={onPress} disabled={disabled} style={({ pressed }) => [styles.button, compact && styles.buttonCompact, { backgroundColor: background, borderColor: variant === "outline" ? COLORS.divider : background, opacity: disabled ? 0.5 : pressed ? 0.82 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }, style]}>
      {icon ? <Text style={[styles.buttonIcon, { color: foreground }]}>{icon}</Text> : null}
      <Text style={[styles.buttonText, { color: foreground }, compact && styles.buttonTextCompact]}>{label}</Text>
    </Pressable>
  );
}

export function Field({ label, value, onChangeText, placeholder, keyboardType, maxLength, multiline, secureTextEntry, autoCapitalize = "none", onSubmitEditing, inputRef, style }: {
  label: string; value: string; onChangeText: (text: string) => void; placeholder?: string;
  keyboardType?: "default" | "numeric" | "decimal-pad"; maxLength?: number; multiline?: boolean; secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words"; onSubmitEditing?: () => void; inputRef?: React.RefObject<TextInput | null>; style?: object;
}) {
  return (
    <View style={[styles.fieldWrap, style]}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#a0a0aa"
        keyboardType={keyboardType}
        maxLength={maxLength}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        onSubmitEditing={onSubmitEditing}
        style={[styles.field, multiline && styles.multiline]}
        textAlign="right"
        textAlignVertical={multiline ? "top" : "center"}
        returnKeyType={onSubmitEditing ? "send" : "done"}
      />
      {typeof maxLength === "number" && <Text style={styles.counter}>{value.length}/{maxLength}</Text>}
    </View>
  );
}

export function ProgressBar({ pct, small = false, color = COLORS.orange }: { pct: number; small?: boolean; color?: string }) {
  const width = `${Math.min(100, Math.max(0, pct))}%` as `${number}%`;
  return <View style={[styles.progressTrack, small && styles.progressTrackSmall]}><View style={[styles.progressFill, small && styles.progressFillSmall, { width, backgroundColor: color }]} /></View>;
}

export function AppHeader({ profile, mood, onSettings, onReports, onRobotPress, robotLine }: {
  profile: LocalProfile; mood: RobotMood; onSettings: () => void; onReports: () => void; onRobotPress: () => void; robotLine: string;
}) {
  const [day] = [formatArabicDate()];
  return (
    <View style={styles.header}>
      <View style={styles.brandRow}>
        <View style={styles.headerActions}>
          <Pressable onPress={onSettings} style={styles.headerIconButton} accessibilityRole="button" accessibilityLabel="إعدادات الأهداف"><Ionicons name="settings-outline" size={20} color={COLORS.orange} /></Pressable>
          <Pressable onPress={onReports} style={styles.headerIconButton} accessibilityRole="button" accessibilityLabel="تقارير الأداء"><Ionicons name="reader-outline" size={20} color={COLORS.orange} /></Pressable>
        </View>
        <View style={styles.brandCopy}>
          <Text style={styles.brandName}>🍊 Target Tracker</Text>
          <Text style={styles.brandTagline}>by Mahmoud Khairy · TargetX</Text>
        </View>
        <Pressable onPress={onSettings} style={styles.employeeButton} accessibilityRole="button" accessibilityLabel="تعديل الأهداف"><Ionicons name="create-outline" size={21} color={COLORS.white} /></Pressable>
      </View>
      <View style={styles.greetingRow}>
        <View style={styles.greetingCopy}>
          <Text style={styles.greeting}>لسه متحسبها؟ يلا نكمل التارجت!</Text>
          <Text style={styles.employeeName}>{profile.employee || "جاهز تكسر التارجت؟"}</Text>
          <View style={styles.branchRow}><Ionicons name="location-outline" size={15} color={COLORS.muted} /><Text style={styles.branchText}>{profile.branch || "الفرع"}</Text></View>
          <Text style={styles.dateText}>{day}</Text>
          {!!robotLine && <View style={styles.robotBubble}><Text style={styles.robotBubbleText}>{robotLine}</Text></View>}
        </View>
        <Pressable onPress={onRobotPress} accessibilityRole="button" accessibilityLabel="مستر تارجت، اضغط لعبارة تحفيزية"><TargetRobot size={58} mood={mood} /></Pressable>
      </View>
    </View>
  );
}

export const TAB_ITEMS = [
  { id: "home", label: "الرئيسية", icon: "home-outline" },
  { id: "targets", label: "التارجت", icon: "locate-outline" },
  { id: "add", label: "تسجيل", icon: "add-circle-outline" },
  { id: "encyclopedia", label: "الموسوعة", icon: "book-outline" },
  { id: "more", label: "المزيد", icon: "menu-outline" },
] as const;

export type NavigationTab = (typeof TAB_ITEMS)[number]["id"];

export function BottomNav({ active, onChange }: { active: NavigationTab; onChange: (id: NavigationTab) => void }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bottomNav, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {TAB_ITEMS.map((item) => {
        const selected = active === item.id;
        return (
          <Pressable key={item.id} onPress={() => onChange(item.id)} style={[styles.navItem, selected && styles.navItemActive]}>
            <Ionicons name={item.icon as never} size={21} color={selected ? COLORS.orange : COLORS.muted} />
            <Text style={[styles.navLabel, selected && styles.navLabelActive]} numberOfLines={1}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function Footer() {
  return <View style={styles.footer}><Text style={styles.footerBy}>تم تطوير تارجت إكس بواسطة محمود خيري · Mahmoud Khairy</Text><Text style={styles.footerLegal}>{APP_FOOTER}</Text></View>;
}

export function ConfirmDialog({ visible, title, message, confirmLabel = "تأكيد", destructive = false, onCancel, onConfirm }: {
  visible: boolean; title: string; message: string; confirmLabel?: string; destructive?: boolean; onCancel: () => void; onConfirm: () => void;
}) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onCancel}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>{title}</Text><Text style={styles.modalMessage}>{message}</Text>
          <View style={styles.modalActions}><ActionButton label="إلغاء" variant="outline" onPress={onCancel} style={{ flex: 1 }} /><ActionButton label={confirmLabel} variant={destructive ? "danger" : "primary"} onPress={onConfirm} style={{ flex: 1 }} /></View>
        </View>
      </View>
    </Modal>
  );
}

export function Toast({ message, kind = "success" }: { message: string; kind?: "success" | "error" }) {
  if (!message) return null;
  return <View style={[styles.toast, kind === "error" && styles.toastError]}><Text style={styles.toastText}>{message}</Text></View>;
}

export function BackHeader({ title, onBack, trailing, backLabel = "الرئيسية" }: { title: string; onBack: () => void; trailing?: ReactNode; backLabel?: string }) {
  return <View style={styles.backHeader}><Pressable onPress={onBack} style={styles.backButton}><Ionicons name="arrow-forward" size={21} color={COLORS.text} /><Text style={styles.backText}>{backLabel}</Text></Pressable><Text style={styles.backTitle}>{title}</Text>{trailing ?? <View style={{ width: 82 }} />}</View>;
}

const styles = StyleSheet.create({
  card: { backgroundColor: "rgba(255,255,255,0.94)", borderRadius: 22, padding: 16, borderWidth: 1, borderColor: "rgba(237,237,241,0.85)", shadowColor: "#1f2029", shadowOpacity: 0.06, shadowRadius: 16, shadowOffset: { width: 0, height: 8 }, elevation: 2, marginBottom: 14 },
  sectionTitle: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 6, marginBottom: 12, gap: 10 },
  sectionHeading: { fontSize: 17, color: COLORS.text, fontFamily: "Tajawal_700Bold", textAlign: "right", flex: 1 },
  button: { minHeight: 46, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 15, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 6, borderWidth: 1 },
  buttonCompact: { minHeight: 36, paddingHorizontal: 11, paddingVertical: 7, borderRadius: 12 },
  buttonText: { fontSize: 14, fontFamily: "Tajawal_700Bold", textAlign: "center" },
  buttonTextCompact: { fontSize: 12 },
  buttonIcon: { fontSize: 16 },
  fieldWrap: { marginBottom: 12 },
  fieldLabel: { textAlign: "right", fontFamily: "Tajawal_700Bold", fontSize: 14, color: COLORS.text, marginBottom: 6 },
  field: { minHeight: 48, borderRadius: 14, borderWidth: 1, borderColor: COLORS.divider, backgroundColor: "#fff", color: COLORS.text, paddingHorizontal: 13, fontFamily: "Tajawal_400Regular", fontSize: 15 },
  multiline: { minHeight: 92, paddingTop: 11 },
  counter: { textAlign: "left", marginTop: 4, color: COLORS.muted, fontSize: 11, fontFamily: "Tajawal_400Regular" },
  progressTrack: { height: 9, borderRadius: 99, backgroundColor: "#f1f1f4", overflow: "hidden" },
  progressTrackSmall: { height: 6 },
  progressFill: { height: "100%", borderRadius: 99 },
  progressFillSmall: { height: "100%" },
  header: { paddingHorizontal: 18, paddingTop: 8, paddingBottom: 11, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.divider, marginBottom: 12 },
  headerOrbOne: { position: "absolute", width: 175, height: 175, borderRadius: 100, backgroundColor: "rgba(255,255,255,0.10)", top: -85, left: -38 },
  headerOrbTwo: { position: "absolute", width: 120, height: 120, borderRadius: 100, backgroundColor: "rgba(255,255,255,0.09)", bottom: -70, right: 45 },
  brandRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8, minHeight: 56 },
  headerActions: { flexDirection: "row", alignItems: "center", gap: 6 },
  headerIconButton: { width: 39, height: 39, borderRadius: 20, backgroundColor: "#f8f8fa", alignItems: "center", justifyContent: "center" },
  brandCopy: { flex: 1, alignItems: "flex-end" },
  brandIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.20)", alignItems: "center", justifyContent: "center" },
  brandName: { color: COLORS.text, fontSize: 17, fontFamily: "Tajawal_700Bold", textAlign: "right" },
  brandTagline: { color: COLORS.muted, fontSize: 10, fontFamily: "Tajawal_400Regular", textAlign: "right" },
  employeeButton: { width: 42, height: 42, borderRadius: 22, backgroundColor: COLORS.orange, alignItems: "center", justifyContent: "center" },
  employeeButtonText: { color: COLORS.white, fontFamily: "Tajawal_700Bold", fontSize: 12 },
  greetingRow: { flexDirection: "row", alignItems: "center", marginTop: 10, minHeight: 85, gap: 8 },
  greetingCopy: { flex: 1, alignItems: "flex-end" },
  greeting: { color: COLORS.text, fontFamily: "Tajawal_700Bold", fontSize: 22, lineHeight: 31, textAlign: "right" },
  employeeName: { color: COLORS.text, fontFamily: "Tajawal_700Bold", fontSize: 15, textAlign: "right", marginTop: 2 },
  branchRow: { flexDirection: "row", alignItems: "center", gap: 3, marginTop: 1 },
  branchText: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 12, textAlign: "right" },
  dateText: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 10, textAlign: "right", marginTop: 1 },
  robotBubble: { maxWidth: 200, backgroundColor: COLORS.orangeSoft, borderRadius: 12, paddingHorizontal: 8, paddingVertical: 5, alignSelf: "flex-end", marginTop: 4 },
  robotBubbleText: { color: COLORS.text, fontSize: 10, fontFamily: "Tajawal_700Bold", textAlign: "center" },
  bottomNav: { position: "absolute", bottom: 0, left: 0, right: 0, minHeight: 72, borderTopWidth: 1, borderTopColor: COLORS.divider, backgroundColor: "rgba(255,255,255,0.97)", flexDirection: "row", alignItems: "center", justifyContent: "space-around", paddingTop: 8, paddingHorizontal: 7 },
  navItem: { minWidth: 57, height: 51, borderRadius: 16, paddingHorizontal: 7, alignItems: "center", justifyContent: "center", gap: 1 },
  navItemActive: { backgroundColor: COLORS.orangeSoft },
  navLabel: { fontFamily: "Tajawal_400Regular", fontSize: 10, color: COLORS.muted },
  navLabelActive: { color: COLORS.orange, fontFamily: "Tajawal_700Bold" },
  footer: { paddingTop: 16, paddingBottom: 20, borderTopWidth: 1, borderTopColor: COLORS.divider, alignItems: "center", gap: 4, marginTop: 6 },
  footerBy: { fontSize: 11, fontFamily: "Tajawal_700Bold", color: COLORS.text, textAlign: "center" },
  footerLegal: { fontSize: 10, lineHeight: 17, fontFamily: "Tajawal_400Regular", color: COLORS.muted, textAlign: "center", maxWidth: 500 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(31,32,41,0.45)", justifyContent: "center", alignItems: "center", padding: 22 },
  modalCard: { backgroundColor: COLORS.white, borderRadius: 22, padding: 20, width: "100%", maxWidth: 440, shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 25, elevation: 6 },
  modalTitle: { textAlign: "right", fontFamily: "Tajawal_700Bold", color: COLORS.text, fontSize: 18 },
  modalMessage: { textAlign: "right", fontFamily: "Tajawal_400Regular", color: COLORS.muted, fontSize: 15, lineHeight: 24, marginTop: 8 },
  modalActions: { flexDirection: "row", gap: 9, marginTop: 18 },
  toast: { marginHorizontal: 16, marginBottom: 10, padding: 11, borderRadius: 13, backgroundColor: "#e9f8f1", borderWidth: 1, borderColor: "#c8eedc" },
  toastError: { backgroundColor: "#fff0f1", borderColor: "#ffd1d5" },
  toastText: { textAlign: "center", fontFamily: "Tajawal_700Bold", fontSize: 13, color: COLORS.text },
  backHeader: { paddingHorizontal: 17, paddingVertical: 12, alignItems: "center", flexDirection: "row", justifyContent: "space-between", gap: 8 },
  backButton: { flexDirection: "row", alignItems: "center", width: 82, gap: 4 },
  backText: { color: COLORS.text, fontSize: 12, fontFamily: "Tajawal_700Bold" },
  backTitle: { flex: 1, textAlign: "center", fontFamily: "Tajawal_700Bold", color: COLORS.text, fontSize: 17 },
});
