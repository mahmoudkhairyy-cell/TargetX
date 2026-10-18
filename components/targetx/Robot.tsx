import { useEffect, useState, useSyncExternalStore } from "react";
import { AccessibilityInfo, Animated, Easing, Platform, View } from "react-native";
import Svg, { Circle, Ellipse, G, Path, Rect } from "react-native-svg";

export type RobotMood = "idle" | "happy" | "sad" | "angry" | "thinking" | "sleep";

let nativeReducedMotion = false;

function getReducedMotionSnapshot() {
  if (Platform.OS === "web" && typeof window !== "undefined" && "matchMedia" in window) {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return nativeReducedMotion;
}

function subscribeReducedMotion(onChange: () => void) {
  if (Platform.OS === "web" && typeof window !== "undefined" && "matchMedia" in window) {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    query.addEventListener?.("change", onChange);
    return () => query.removeEventListener?.("change", onChange);
  }
  let active = true;
  AccessibilityInfo.isReduceMotionEnabled().then((value) => {
    if (active) { nativeReducedMotion = value; onChange(); }
  }).catch(() => undefined);
  const subscription = AccessibilityInfo.addEventListener("reduceMotionChanged", (value) => {
    nativeReducedMotion = value;
    onChange();
  });
  return () => { active = false; subscription.remove(); };
}

export function useReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, () => false);
}

export function TargetRobot({ size = 84, mood = "idle" }: { size?: number; mood?: RobotMood }) {
  const reduced = useReducedMotion();
  const [float] = useState(() => new Animated.Value(0));
  const [spin] = useState(() => new Animated.Value(0));
  const [jets] = useState(() => new Animated.Value(0.45));
  const [blink] = useState(() => new Animated.Value(0));
  const [lookRight, setLookRight] = useState(false);

  useEffect(() => {
    if (reduced || mood === "sleep") {
      float.stopAnimation();
      spin.stopAnimation();
      jets.stopAnimation();
      float.setValue(0);
      spin.setValue(0);
      jets.setValue(mood === "sleep" ? 0.08 : 0.45);
      return;
    }
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(float, { toValue: 1, duration: 1500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(float, { toValue: 0, duration: 1500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    );
    const jetLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(jets, { toValue: 0.95, duration: 650, useNativeDriver: true }),
        Animated.timing(jets, { toValue: 0.38, duration: 650, useNativeDriver: true }),
      ]),
    );
    floatLoop.start();
    jetLoop.start();
    let spinLoop: Animated.CompositeAnimation | undefined;
    if (mood === "happy") {
      spinLoop = Animated.loop(Animated.sequence([
        Animated.timing(spin, { toValue: 1, duration: 1150, easing: Easing.inOut(Easing.cubic), useNativeDriver: true }),
        Animated.timing(spin, { toValue: 0, duration: 1150, easing: Easing.inOut(Easing.cubic), useNativeDriver: true }),
      ]));
      spinLoop.start();
    }
    return () => {
      floatLoop.stop();
      jetLoop.stop();
      spinLoop?.stop();
    };
  }, [float, jets, mood, reduced, spin]);

  useEffect(() => {
    if (reduced || mood !== "idle") {
      blink.stopAnimation();
      blink.setValue(0);
      return;
    }
    const blinkLoop = Animated.loop(Animated.sequence([
      Animated.delay(2800),
      Animated.timing(blink, { toValue: 1, duration: 85, useNativeDriver: true }),
      Animated.delay(85),
      Animated.timing(blink, { toValue: 0, duration: 110, useNativeDriver: true }),
    ]));
    blinkLoop.start();
    return () => blinkLoop.stop();
  }, [blink, mood, reduced]);

  useEffect(() => {
    if (mood !== "thinking" || reduced) return;
    const timer = setInterval(() => setLookRight((current) => !current), 520);
    return () => clearInterval(timer);
  }, [mood, reduced]);

  const translateY = float.interpolate({ inputRange: [0, 1], outputRange: [2, -5] });
  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ["-5deg", "355deg"] });
  const mouth = mood === "sleep" ? "M80 111 Q100 111 120 111" : mood === "sad" ? "M78 119 Q100 97 122 119" : mood === "angry" ? "M78 118 L100 108 L122 118" : "M78 107 Q100 128 122 107";
  const leftEyeX = 78 + (mood === "thinking" && lookRight ? 4 : 0);
  const rightEyeX = 122 + (mood === "thinking" && !lookRight ? -4 : 0);

  return (
    <Animated.View style={{ width: size, height: size * 1.1, alignItems: "center", justifyContent: "center", transform: [{ translateY: reduced ? 0 : translateY }, { rotate: mood === "happy" && !reduced ? rotate : "0deg" }] }}>
      <Animated.View style={{ position: "absolute", bottom: 3, width: size * 0.42, height: size * 0.12, borderRadius: 99, backgroundColor: "#ff9d38", opacity: reduced ? 0.12 : jets, transform: [{ scaleX: 1.2 }] }} />
      <Svg width={size} height={size} viewBox="0 0 200 220">
        <Ellipse cx="100" cy="204" rx="46" ry="9" fill="#ff7900" opacity={mood === "sleep" ? 0.07 : 0.14} />
        <G opacity={mood === "sleep" ? 0.3 : 0.95}>
          <Path d="M70 177 L65 197 Q73 204 81 197 L86 181 M114 181 L119 197 Q127 204 135 197 L130 177" fill="#ff9d38" stroke="#e96900" strokeWidth="3" strokeLinejoin="round" />
          <Ellipse cx="73" cy="200" rx="11" ry="5" fill="#ff7900" />
          <Ellipse cx="127" cy="200" rx="11" ry="5" fill="#ff7900" />
        </G>
        <Path d={mood === "happy" ? "M44 114 Q24 98 26 79 Q39 75 51 94 L60 105" : "M44 111 Q25 112 24 128 Q36 139 53 126 L61 120"} fill="#fff" stroke="#ff7900" strokeWidth="7" strokeLinecap="round" />
        <Path d={mood === "happy" ? "M156 111 Q176 95 174 76 Q161 72 149 92 L140 103" : "M156 111 Q175 112 176 128 Q164 139 147 126 L139 120"} fill="#fff" stroke="#ff7900" strokeWidth="7" strokeLinecap="round" />
        <Circle cx="100" cy="28" r="7" fill="#ff7900" />
        <Path d="M100 34 L100 51" stroke="#ff7900" strokeWidth="6" strokeLinecap="round" />
        <Path d="M53 65 Q53 52 68 52 H132 Q147 52 147 67 V158 Q147 176 128 176 H72 Q53 176 53 158 Z" fill="#fff" stroke="#ff7900" strokeWidth="5" />
        <Path d="M67 70 Q67 63 76 63 H124 Q133 63 133 72 V118 Q133 127 124 127 H76 Q67 127 67 118 Z" fill="#272833" />
        {mood === "sleep" ? <>
          <Path d="M68 92 Q78 102 88 92 M112 92 Q122 102 132 92" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        </> : <>
          <Circle cx={leftEyeX} cy="91" r="7" fill="#fff" />
          <Circle cx={rightEyeX} cy="91" r="7" fill="#fff" />
        </>}
        {mood === "angry" && <Path d="M66 76 L88 83 M112 83 L134 76" fill="none" stroke="#ff7900" strokeWidth="5" strokeLinecap="round" />}
        {mood === "sad" && <Path d="M67 82 Q77 75 87 81 M113 81 Q123 75 133 82" fill="none" stroke="#ff9d38" strokeWidth="4" strokeLinecap="round" />}
        <Path d={mouth} fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        <Circle cx="70" cy="139" r="5" fill="#ff9d38" opacity="0.55" />
        <Circle cx="130" cy="139" r="5" fill="#ff9d38" opacity="0.55" />
        <Path d="M78 154 Q100 165 122 154" fill="none" stroke="#ededf1" strokeWidth="3" strokeLinecap="round" />
        <Rect x="87" y="169" width="26" height="5" rx="2.5" fill="#ff7900" opacity="0.7" />
        {mood === "happy" && <Path d="M48 45 L54 34 M152 45 L146 34 M100 43 L100 31" stroke="#ff9d38" strokeWidth="4" strokeLinecap="round" />}
      </Svg>
      {mood === "idle" && !reduced ? <>
        <Animated.View style={{ pointerEvents: "none", position: "absolute", top: size * 0.432, left: size * 0.368, width: size * 0.064, height: size * 0.064, borderRadius: size * 0.032, backgroundColor: "#272833", opacity: blink }} />
        <Animated.View style={{ pointerEvents: "none", position: "absolute", top: size * 0.432, left: size * 0.568, width: size * 0.064, height: size * 0.064, borderRadius: size * 0.032, backgroundColor: "#272833", opacity: blink }} />
        <Animated.View style={{ pointerEvents: "none", position: "absolute", top: size * 0.461, left: size * 0.377, width: size * 0.046, height: Math.max(1, size * 0.01), borderRadius: 99, backgroundColor: "#fff", opacity: blink }} />
        <Animated.View style={{ pointerEvents: "none", position: "absolute", top: size * 0.461, left: size * 0.577, width: size * 0.046, height: Math.max(1, size * 0.01), borderRadius: 99, backgroundColor: "#fff", opacity: blink }} />
      </> : null}
      <View style={{ pointerEvents: "none", position: "absolute", top: size * 0.06, width: size * 0.14, height: size * 0.14, borderRadius: 100, backgroundColor: "#ff9d38", opacity: mood === "sleep" || reduced ? 0.3 : 0.85, shadowColor: "#ff7900", shadowOpacity: mood === "sleep" || reduced ? 0 : 0.7, shadowRadius: 9 }} />
    </Animated.View>
  );
}
