import { useEffect, useRef, useState } from "react";
import { Keyboard, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/lib/targetx/constants";
import type { AssistantAvailability } from "@/lib/targetx/chat";
import type { ChatMessage } from "@/lib/targetx/types";
import { TargetRobot } from "./Robot";
import { Footer } from "./UI";

const QUICK_QUESTIONS = ["إزاي أوصل للتارجت؟", "فاضل كام خط؟", "عملت إيه النهارده؟", "محتاج أعمل كام خط في اليوم؟"];

export function AssistantScreen({ messages, pending, availability, showPrivacyNotice, onDismissPrivacyNotice, onSend, onClear }: {
  availability: AssistantAvailability;
  messages: ChatMessage[]; pending: boolean; showPrivacyNotice: boolean; onDismissPrivacyNotice: () => void;
  onSend: (text: string) => void; onClear: () => void;
}) {
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);
  useEffect(() => { scrollRef.current?.scrollToEnd({ animated: true }); }, [messages, pending]);
  const submit = (value = draft) => {
    const text = value.trim();
    if (!text || pending) return;
    onSend(text.slice(0, 500));
    setDraft("");
    Keyboard.dismiss();
  };
  const statusText = availability === "ready" ? "متصل" : availability === "checking" ? "بنتأكد من الاتصال" : availability === "not_configured" ? "المساعد مش جاهز" : "غير متصل";
  const statusReady = availability === "ready";
  return (
    <View style={styles.container}>
      <View style={styles.chatHeader}>
        <View style={styles.robotAvatar}><TargetRobot size={43} mood={pending ? "thinking" : "idle"} /></View>
        <View style={{ flex: 1 }}><Text style={styles.assistantName}>مستر تارجت</Text><View style={styles.statusRow}><View style={[styles.onlineDot, !statusReady && styles.offlineDot]} /><Text style={[styles.onlineText, !statusReady && styles.offlineText]}>{statusText}</Text></View></View>
        <Pressable onPress={onClear} style={styles.clearButton}><Ionicons name="trash-outline" size={17} color={COLORS.muted} /><Text style={styles.clearText}>مسح المحادثة</Text></Pressable>
      </View>
      {showPrivacyNotice ? <View style={styles.privacyNotice}><Text style={styles.privacyText}>سؤالك وملخص الأداء وأفضل 5 مقتطفات محلية مرتبطة به (SR أو تحويلات أو بريد أو باقات أو FreeMax أو Hub Docs) بتتبعت إلى Gemini خارج التطبيق.</Text><Pressable onPress={onDismissPrivacyNotice}><Text style={styles.dismiss}>×</Text></Pressable></View> : null}
      <ScrollView ref={scrollRef} style={styles.messages} contentContainerStyle={styles.messageContent} keyboardShouldPersistTaps="handled">
        {messages.length === 0 && !pending ? <View style={styles.quickWrap}><Text style={styles.quickTitle}>اسأل مستر تارجت</Text><Text style={styles.quickSubtitle}>اختار سؤال أو اكتب اللي في بالك</Text>{QUICK_QUESTIONS.map((question) => <Pressable key={question} onPress={() => submit(question)} style={styles.quickQuestion}><Text style={styles.quickQuestionText}>{question}</Text><Ionicons name="arrow-back" size={15} color={COLORS.orange} /></Pressable>)}</View> : null}
        {messages.map((message, index) => <MessageBubble key={`${index}-${message.role}`} message={message} />)}
        {pending ? <View style={styles.typingRow}><View style={styles.typingAvatar}><TargetRobot size={37} mood="thinking" /></View><View style={styles.typingBubble}><Text style={styles.typingText}>مستر تارجت بيفكر...</Text><View style={styles.typingDots}><View /><View /><View /></View></View></View> : null}
      </ScrollView>
      <View style={styles.composer}>
        <TextInput
          ref={inputRef}
          value={draft}
          onChangeText={(text) => setDraft(text.slice(0, 500))}
          placeholder="اكتب رسالتك..."
          placeholderTextColor="#9999a3"
          maxLength={500}
          multiline
          editable={!pending}
          style={styles.input}
          textAlign="right"
          textAlignVertical="center"
          onSubmitEditing={() => submit()}
          onKeyPress={(event) => {
            if (Platform.OS !== "web") return;
            const native = event.nativeEvent as unknown as { key?: string; shiftKey?: boolean };
            const webEvent = event as unknown as { preventDefault?: () => void };
            if (native.key === "Enter" && !native.shiftKey) {
              webEvent.preventDefault?.();
              submit();
            }
          }}
        />
        <Pressable onPress={() => submit()} disabled={pending || !draft.trim()} style={[styles.sendButton, (pending || !draft.trim()) && styles.sendDisabled]} accessibilityLabel="إرسال الرسالة"><Ionicons name="send" size={18} color={COLORS.white} /></Pressable>
      </View>
      <Text style={styles.charCount}>{draft.length}/500</Text>
      <Footer />
    </View>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const user = message.role === "user";
  return <View style={[styles.messageRow, user && styles.userRow]}>
    {!user ? <View style={styles.smallAvatar}><TargetRobot size={30} mood="idle" /></View> : null}
    <View style={[styles.bubble, user ? styles.userBubble : styles.assistantBubble]}><RichText text={message.content} user={user} /></View>
  </View>;
}

function RichText({ text, user }: { text: string; user: boolean }) {
  return <View>{text.split("\n").map((line, index) => {
    const bullet = /^\s*[-*•]\s+/.test(line);
    const clean = bullet ? line.replace(/^\s*[-*•]\s+/, "• ") : line;
    const chunks = clean.split(/(\*\*[^*]+\*\*)/g);
    return <Text key={index} style={[styles.messageText, user && styles.userText, index > 0 && styles.newLine]}>{chunks.map((chunk, chunkIndex) => chunk.startsWith("**") && chunk.endsWith("**") ? <Text key={chunkIndex} style={styles.bold}>{chunk.slice(2, -2)}</Text> : <Text key={chunkIndex}>{chunk}</Text>)}</Text>;
  })}</View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, minHeight: 400 },
  chatHeader: { minHeight: 67, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: COLORS.divider, backgroundColor: COLORS.white, flexDirection: "row", alignItems: "center", gap: 8 },
  robotAvatar: { width: 48, height: 48, alignItems: "center", justifyContent: "center" },
  assistantName: { color: COLORS.text, fontFamily: "Tajawal_700Bold", fontSize: 15, textAlign: "right" },
  statusRow: { flexDirection: "row-reverse", alignItems: "center", gap: 4 },
  onlineDot: { width: 6, height: 6, borderRadius: 4, backgroundColor: COLORS.green },
  onlineText: { color: COLORS.green, fontFamily: "Tajawal_400Regular", fontSize: 10 },
  offlineDot: { backgroundColor: COLORS.muted },
  offlineText: { color: COLORS.muted },
  clearButton: { flexDirection: "row", alignItems: "center", gap: 4, borderWidth: 1, borderColor: COLORS.divider, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 7 },
  clearText: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 10 },
  privacyNotice: { flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 13, paddingVertical: 7, backgroundColor: "#fff2e8", borderBottomWidth: 1, borderBottomColor: "#ffe0c7" },
  privacyText: { color: "#8d480a", fontFamily: "Tajawal_400Regular", fontSize: 11 },
  dismiss: { color: "#8d480a", fontSize: 18, paddingHorizontal: 4 },
  messages: { flex: 1 },
  messageContent: { paddingHorizontal: 13, paddingVertical: 16, gap: 10, flexGrow: 1, justifyContent: "flex-end" },
  quickWrap: { alignItems: "center", justifyContent: "center", marginTop: 22, marginBottom: 15 },
  quickTitle: { color: COLORS.text, fontFamily: "Tajawal_700Bold", fontSize: 17 },
  quickSubtitle: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 11, marginTop: 1, marginBottom: 10 },
  quickQuestion: { width: "100%", maxWidth: 480, minHeight: 40, borderRadius: 13, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.divider, paddingHorizontal: 12, marginVertical: 3, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  quickQuestionText: { color: COLORS.text, fontFamily: "Tajawal_400Regular", fontSize: 12, textAlign: "right" },
  messageRow: { flexDirection: "row", alignItems: "flex-end", gap: 6, maxWidth: "91%", alignSelf: "flex-start" },
  userRow: { alignSelf: "flex-end", justifyContent: "flex-end" },
  smallAvatar: { width: 31, height: 32, alignItems: "center", justifyContent: "center" },
  bubble: { maxWidth: "100%", paddingHorizontal: 13, paddingVertical: 9, borderRadius: 18 },
  userBubble: { backgroundColor: COLORS.orange, borderBottomRightRadius: 5 },
  assistantBubble: { backgroundColor: COLORS.white, borderBottomLeftRadius: 5, shadowColor: "#1f2029", shadowOpacity: 0.06, shadowRadius: 8, elevation: 1 },
  messageText: { color: COLORS.text, fontFamily: "Tajawal_400Regular", fontSize: 13, lineHeight: 21, textAlign: "right", writingDirection: "rtl" },
  userText: { color: COLORS.white },
  newLine: { marginTop: 2 },
  bold: { fontFamily: "Tajawal_700Bold" },
  typingRow: { flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-start" },
  typingAvatar: { width: 36, alignItems: "center" },
  typingBubble: { backgroundColor: COLORS.white, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 8, minWidth: 150 },
  typingText: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 11, textAlign: "right" },
  typingDots: { flexDirection: "row", gap: 3, justifyContent: "flex-end", marginTop: 4 },
  dot: { width: 4, height: 4, borderRadius: 3, backgroundColor: COLORS.orangeLight },
  composer: { minHeight: 54, marginHorizontal: 12, marginBottom: 2, borderRadius: 17, borderWidth: 1, borderColor: COLORS.divider, backgroundColor: COLORS.white, flexDirection: "row", alignItems: "center", padding: 5, gap: 6 },
  input: { flex: 1, maxHeight: 96, minHeight: 40, paddingHorizontal: 10, color: COLORS.text, fontFamily: "Tajawal_400Regular", fontSize: 13 },
  sendButton: { width: 40, height: 40, borderRadius: 13, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.orange },
  sendDisabled: { opacity: 0.45 },
  charCount: { color: COLORS.muted, fontFamily: "Tajawal_400Regular", fontSize: 9, textAlign: "left", paddingHorizontal: 17, paddingBottom: 5 },
});
