import { useEffect } from "react";
import { Platform } from "react-native";
import { Tabs } from "expo-router";

export default function TabLayout() {
  useEffect(() => {
    if (Platform.OS !== "web" || typeof document === "undefined") return;
    const root = document.documentElement;
    const previousDir = root.dir;
    const previousLang = root.lang;
    root.dir = "rtl";
    root.lang = "ar";
    return () => {
      root.dir = previousDir;
      root.lang = previousLang;
    };
  }, []);

  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: "none" } }}>
      <Tabs.Screen name="index" options={{ title: "TargetX" }} />
    </Tabs>
  );
}
