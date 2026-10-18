import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Tajawal_400Regular, Tajawal_700Bold } from "@expo-google-fonts/tajawal";
import type { Achievement, ChatMessage, KpiId, LocalProfile, TargetData } from "@/lib/targetx/types";
import { APP_FOOTER, COLORS } from "@/lib/targetx/constants";
import { buildAssistantContext, checkAssistantAvailability, requestAssistantReply, AssistantRequestError, type AssistantAvailability } from "@/lib/targetx/chat";
import { coachMessage, coachMood, isSleeping } from "@/lib/targetx/coach";
import { summarizeTarget } from "@/lib/targetx/metrics";
import { endSession, persistData, resumeSession, signInOrRegister, updateLocalProfile } from "@/lib/targetx/storage";
import { AddEntryScreen } from "@/components/targetx/AddEntryScreen";
import { AssistantScreen } from "@/components/targetx/AssistantScreen";
import { HomeScreen } from "@/components/targetx/HomeScreen";
import { LoginScreen } from "@/components/targetx/LoginScreen";
import { MoreScreen } from "@/components/targetx/MoreScreen";
import { ReportsScreen } from "@/components/targetx/ReportsScreen";
import { EncyclopediaHomeScreen, type EncyclopediaDestination } from "@/components/targetx/EncyclopediaHomeScreen";
import { OrangeResourcesScreen, type OrangeResourceSection } from "@/components/targetx/OrangeResourcesScreen";
import { SRScreen } from "@/components/targetx/SRScreen";
import { TargetSettingsScreen } from "@/components/targetx/TargetSettingsScreen";
import { AppHeader, BottomNav, ConfirmDialog, Toast, type NavigationTab } from "@/components/targetx/UI";
import { TargetRobot, type RobotMood } from "@/components/targetx/Robot";

type Tab = "home" | "targets" | "reports" | "add" | "assistant" | "more";
type Confirmation = { title: string; message: string; destructive?: boolean; confirmLabel?: string; run: () => void | Promise<void> };

export default function TargetXHome() {
  const [fontsLoaded] = useFonts({ Tajawal_400Regular, Tajawal_700Bold });
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<LocalProfile | null>(null);
  const [data, setData] = useState<TargetData | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [showSR, setShowSR] = useState(false);
  const [knowledgeRoute, setKnowledgeRoute] = useState<"hub" | "sr" | "resources">("hub");
  const [resourceSection, setResourceSection] = useState<OrangeResourceSection>("plans");
  const [resourcePlanCategory, setResourcePlanCategory] = useState<string | null>(null);
  const [selectedKpi, setSelectedKpi] = useState<KpiId | null>(null);
  const [toast, setToast] = useState<{ message: string; kind: "success" | "error" } | null>(null);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatPending, setChatPending] = useState(false);
  const [assistantAvailability, setAssistantAvailability] = useState<AssistantAvailability>("checking");
  const [assistantPrivacyDismissed, setAssistantPrivacyDismissed] = useState(false);
  const [robotBubble, setRobotBubble] = useState("");
  const [clock, setClock] = useState(0);
  const [lastInteraction, setLastInteraction] = useState(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let mounted = true;
    resumeSession().then((session) => {
      if (!mounted) return;
      const startedAt = Date.now();
      setClock(startedAt);
      setLastInteraction(startedAt);
      if (session) {
        setProfile(session.profile);
        setData(session.data);
      }
      setLoading(false);
    }).catch(() => {
      if (!mounted) return;
      const startedAt = Date.now();
      setClock(startedAt);
      setLastInteraction(startedAt);
      setLoading(false);
    });
    const interval = setInterval(() => setClock(Date.now()), 10_000);
    return () => {
      mounted = false;
      clearInterval(interval);
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  useEffect(() => {
    if (activeTab !== "assistant") return;
    let active = true;
    checkAssistantAvailability().then((availability) => {
      if (active) setAssistantAvailability(availability);
    });
    return () => { active = false; };
  }, [activeTab]);

  const summary = useMemo(() => data ? summarizeTarget(data, new Date(clock)) : null, [data, clock]);
  const robotMood: RobotMood = chatPending ? "thinking" : summary && isSleeping(lastInteraction, clock) ? "sleep" : summary ? coachMood(summary) : "idle";

  const showToast = useCallback((message: string, kind: "success" | "error" = "success") => {
    setToast({ message, kind });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  }, []);

  const markInteraction = () => {
    const now = Date.now();
    setLastInteraction(now);
    setClock(now);
  };

  const signIn = async (input: LocalProfile) => {
    try {
      const result = await signInOrRegister(input);
      if (!result.ok) {
        showToast("بيانات الدخول غير مطابقة", "error");
        return;
      }
      setProfile(result.profile);
      setData(result.data);
      setActiveTab("home");
      setShowSR(false);
      setKnowledgeRoute("hub");
      setChatMessages([]);
      markInteraction();
      showToast("أهلاً يا بطل 👋");
    } catch {
      showToast("حصلت مشكلة في حفظ البيانات على الجهاز.", "error");
    }
  };

  const saveTargetSettings = async (next: TargetData, nextProfile: LocalProfile) => {
    setData(next);
    setProfile(nextProfile);
    await Promise.all([persistData(nextProfile, next), updateLocalProfile(nextProfile)]);
    setActiveTab("home");
    showToast("تم حفظ الإعدادات بنجاح");
  };

  const restoreTargetData = (restored: TargetData) => setConfirmation({
    title: "تأكيد الاستعادة",
    message: "هيتم استبدال البيانات الحالية بالنسخة دي. متأكد؟",
    destructive: true,
    confirmLabel: "استعادة النسخة",
    run: async () => {
      if (!profile) return;
      const restoredProfile = { ...profile, employee: restored.settings.employee, branch: restored.settings.branch };
      setProfile(restoredProfile);
      setData(restored);
      await Promise.all([persistData(restoredProfile, restored), updateLocalProfile(restoredProfile)]);
      setActiveTab("home");
      showToast("تمت استعادة النسخة الاحتياطية");
    },
  });

  const addAchievement = async (draft: { kpiId: KpiId; qty: number; date: string; note: string }) => {
    if (!profile || !data) return;
    let timestamp = Date.now();
    let createdAt = new Date(timestamp).toISOString();
    while (data.entries.some((entry) => entry.createdAt === createdAt)) createdAt = new Date(++timestamp).toISOString();
    const entry: Achievement = { id: createdAt, createdAt, ...draft };
    const next = { ...data, entries: [...data.entries, entry] };
    setData(next);
    await persistData(profile, next);
    setSelectedKpi(null);
    setActiveTab("home");
    showToast("اتسجل الإنجاز بنجاح! عاش يا بطل 🍊");
  };

  const deleteAchievement = (entry: Achievement) => setConfirmation({
    title: "حذف التسجيل",
    message: "متأكد إنك عايز تحذف التسجيل ده؟",
    destructive: true,
    confirmLabel: "حذف التسجيل",
    run: async () => {
      if (!profile || !data) return;
      const next = { ...data, entries: data.entries.filter((item) => item.createdAt !== entry.createdAt) };
      setData(next);
      await persistData(profile, next);
      showToast("تم حذف التسجيل");
    },
  });

  const clearMonth = (count: number, month: string) => {
    if (!data || !profile) return;
    if (count === 0) {
      showToast("مفيش تسجيلات في الشهر ده", "error");
      return;
    }
    setConfirmation({
      title: "مسح سجل الشهر",
      message: `هتمسح ${count} تسجيل من شهر ${month}؟ الإجراء ده مينفعش يترجع.`,
      destructive: true,
      confirmLabel: "مسح السجل",
      run: async () => {
        const next = { ...data, entries: data.entries.filter((entry) => !entry.date.startsWith(month)) };
        setData(next);
        await persistData(profile, next);
        showToast("تم مسح سجل الشهر");
      },
    });
  };

  const signOut = async () => {
    if (profile && data) await persistData(profile, data).catch(() => undefined);
    await endSession();
    setProfile(null);
    setData(null);
    setActiveTab("home");
    setShowSR(false);
    setKnowledgeRoute("hub");
    setChatMessages([]);
  };

  const sendAssistantMessage = async (text: string) => {
    if (!data || !summary || chatPending || !profile) return;
    const previous = chatMessages.slice(-10);
    setChatMessages((current) => [...current, { role: "user", content: text.slice(0, 500) }]);
    setChatPending(true);
    try {
      const reply = await requestAssistantReply(text, previous, buildAssistantContext(data, summary, text));
      setChatMessages((current) => [...current, { role: "assistant", content: reply }]);
    } catch (error) {
      const message = error instanceof AssistantRequestError
        ? error.kind === "timeout" ? "الرد أخد وقت، جرب تاني 🙏" : error.kind === "offline" ? "مفيش اتصال بالإنترنت دلوقتي" : error.kind === "setup" ? "مستر تارجت مش متهيأ للرد دلوقتي، جرّب تاني بعد شوية." : "معرفتش أرد دلوقتي، جرب تاني بعد شوية 🤖"
        : "معرفتش أرد دلوقتي، جرب تاني بعد شوية 🤖";
      setChatMessages((current) => [...current, { role: "assistant", content: message }]);
    } finally {
      setChatPending(false);
    }
  };

  const openTab = (tab: Tab) => {
    markInteraction();
    setShowSR(false);
    setKnowledgeRoute("hub");
    setActiveTab(tab);
  };

  const openBottomTab = (tab: NavigationTab) => {
    if (tab === "encyclopedia") {
      markInteraction();
      setKnowledgeRoute("hub");
      setShowSR(true);
      return;
    }
    openTab(tab);
  };

  const openEncyclopediaDestination = (destination: EncyclopediaDestination) => {
    markInteraction();
    if (destination === "sr") {
      setKnowledgeRoute("sr");
      return;
    }
    if (destination.startsWith("plan:")) {
      setResourceSection("plans");
      setResourcePlanCategory(destination.slice("plan:".length));
    } else {
      setResourcePlanCategory(null);
      setResourceSection(destination as OrangeResourceSection);
    }
    setKnowledgeRoute("resources");
  };

  const pressRobot = () => {
    markInteraction();
    if (summary && profile && data) setRobotBubble(coachMessage(summary, profile.employee, data.settings.month, "hero"));
    else setRobotBubble("كل خطوة بتفرق يا بطل 🍊");
    setTimeout(() => setRobotBubble(""), 2600);
  };

  if (loading || !fontsLoaded) {
    return <SafeAreaView style={styles.loading}><StatusBar style="light" /><TargetRobot size={104} mood="idle" /><View style={{ height: 8 }} /><View><Text style={styles.loadingText}>تارجت إكس بيجهزلك...</Text><Text style={styles.loadingSub}>{APP_FOOTER}</Text></View></SafeAreaView>;
  }

  if (!profile || !data || !summary) {
    return <SafeAreaView style={styles.safe} edges={["top", "bottom"]} onTouchStart={markInteraction}>
      <StatusBar style="light" />
      <LoginScreen onSignIn={(input) => { void signIn(input); }} onExploreEncyclopedia={() => { setKnowledgeRoute("hub"); setShowSR(true); }} />
      {showSR && <View style={styles.srOverlay}>
        {knowledgeRoute === "hub" ? <EncyclopediaHomeScreen onBack={() => { setShowSR(false); setKnowledgeRoute("hub"); }} onSelect={openEncyclopediaDestination} />
          : knowledgeRoute === "sr" ? <SRScreen onBack={() => setKnowledgeRoute("hub")} />
            : <OrangeResourcesScreen key={`${resourceSection}-${resourcePlanCategory ?? "all"}`} initialSection={resourceSection} initialPlanCategory={resourcePlanCategory ?? undefined} onBack={() => setKnowledgeRoute("hub")} />}
      </View>}
      {toast && <View style={styles.toastOverlay}><Toast message={toast.message} kind={toast.kind} /></View>}
    </SafeAreaView>;
  }

  const header = <AppHeader profile={profile} mood={robotMood} onSettings={() => openTab("targets")} onReports={() => openTab("reports")} onRobotPress={pressRobot} robotLine={robotBubble} />;
  const selectedNav: NavigationTab = showSR ? "encyclopedia" : activeTab === "reports" || activeTab === "assistant" || activeTab === "more" ? "more" : activeTab;
  return (
    <SafeAreaView style={styles.safe} edges={["top"]} onTouchStart={markInteraction}>
      <StatusBar style="light" />
      <View style={styles.appShell}>
        {showSR ? (
          knowledgeRoute === "hub" ? <EncyclopediaHomeScreen onBack={() => { setShowSR(false); setKnowledgeRoute("hub"); setActiveTab("home"); }} onSelect={openEncyclopediaDestination} />
            : knowledgeRoute === "sr" ? <SRScreen onBack={() => setKnowledgeRoute("hub")} />
              : <OrangeResourcesScreen key={`${resourceSection}-${resourcePlanCategory ?? "all"}`} initialSection={resourceSection} initialPlanCategory={resourcePlanCategory ?? undefined} onBack={() => setKnowledgeRoute("hub")} />
        ) : activeTab === "home" ? (
          <HomeScreen profile={profile} data={data} summary={summary} onNavigate={openTab} onSettings={() => openTab("targets")} onQuickAdd={(id) => { setSelectedKpi(id); openTab("add"); }} mood={robotMood} robotLine={robotBubble} onRobotPress={pressRobot} />
        ) : activeTab === "assistant" ? (
          <AssistantScreen messages={chatMessages} pending={chatPending} availability={assistantAvailability} showPrivacyNotice={!assistantPrivacyDismissed} onDismissPrivacyNotice={() => setAssistantPrivacyDismissed(true)} onSend={(text) => { void sendAssistantMessage(text); }} onClear={() => { setChatMessages([]); showToast("تم مسح المحادثة"); }} />
        ) : activeTab === "more" ? (
          <View style={styles.innerScreen}>{header}<MoreScreen onNavigate={openTab} /></View>
        ) : (
          <View style={styles.innerScreen}>
            {header}
            {activeTab === "targets" ? <TargetSettingsScreen profile={profile} data={data} onSave={(next, nextProfile) => { void saveTargetSettings(next, nextProfile); }} onRestore={restoreTargetData} onLogout={() => { void signOut(); }} onSwitchUser={() => { void signOut(); }} />
              : activeTab === "reports" ? <ReportsScreen data={data} summary={summary} onDelete={deleteAchievement} onClear={clearMonth} />
                : <AddEntryScreen month={data.settings.month} initialKpi={selectedKpi} onSave={(entry) => { void addAchievement(entry); }} />}
          </View>
        )}
        <BottomNav active={selectedNav} onChange={openBottomTab} />
      </View>
      {toast && <View style={styles.toastOverlay}><Toast message={toast.message} kind={toast.kind} /></View>}
      <ConfirmDialog visible={!!confirmation} title={confirmation?.title ?? "تأكيد"} message={confirmation?.message ?? ""} destructive={confirmation?.destructive} confirmLabel={confirmation?.confirmLabel} onCancel={() => setConfirmation(null)} onConfirm={() => {
        const action = confirmation?.run;
        setConfirmation(null);
        if (action) void action();
      }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.orange, ...(Platform.OS === "web" ? {} : { direction: "rtl" }) },
  appShell: { flex: 1, backgroundColor: COLORS.background },
  innerScreen: { flex: 1, minHeight: 0 },
  srOverlay: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, zIndex: 5, backgroundColor: COLORS.background },
  toastOverlay: { position: "absolute", top: 8, left: 12, right: 12, zIndex: 20, pointerEvents: "none" },
  loading: { flex: 1, backgroundColor: COLORS.orange, alignItems: "center", justifyContent: "center", paddingHorizontal: 28 },
  loadingText: { color: COLORS.white, fontFamily: "Tajawal_700Bold", fontSize: 20, marginTop: 13, textAlign: "center" },
  loadingSub: { color: "rgba(255,255,255,0.72)", fontFamily: "Tajawal_400Regular", textAlign: "center", fontSize: 10, marginTop: 20 },
});
