import type { KpiId, KpiSetting } from "./types";

export const COLORS = {
  orange: "#ff7900",
  orangeLight: "#ff9d38",
  orangeSoft: "#fff3e8",
  text: "#1f2029",
  muted: "#858591",
  background: "#f5f5f7",
  white: "#ffffff",
  divider: "#ededf1",
  green: "#16a56a",
  red: "#e34d59",
  dark: "#272833",
  darkSoft: "#41414d",
};

export const DATA_KEY = "trackYourSalesOrange_v1";
export const SESSION_KEY = `${DATA_KEY}_session`;
export const USERS_KEY = `${DATA_KEY}_users`;

export const DEFAULT_KPIS: KpiSetting[] = [
  { id: "lines", name: "الخطوط الجديدة", icon: "📱", target: 175, weight: 40, unit: "خط" },
  { id: "wallets", name: "محافظ أورنچ كاش الجديدة", icon: "💳", target: 158, weight: 0, unit: "محفظة" },
  { id: "existing", name: "المحافظ القائمة", icon: "👛", target: 74, weight: 15, unit: "محفظة" },
  { id: "points", name: "النقاط", icon: "⭐", target: 1737, weight: 10, unit: "نقطة" },
  { id: "postpaid", name: "خطوط الفاتورة", icon: "📞", target: 10, weight: 10, unit: "خط" },
  { id: "dsl", name: "خطوط الإنترنت المنزلي DSL", icon: "🌐", target: 1, weight: 10, unit: "خط" },
  { id: "quality", name: "الجودة", icon: "🛡️", target: 100, weight: 15, unit: "%" },
];

export const isKpiId = (value: unknown): value is KpiId =>
  typeof value === "string" && DEFAULT_KPIS.some((kpi) => kpi.id === value);

export const currentMonth = (date = new Date()) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${date.getFullYear()}-${month}`;
};

export const localISODate = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(Number.isFinite(value) ? value : 0);

export const formatArabicDate = (date = new Date()) =>
  new Intl.DateTimeFormat("ar-EG", { day: "numeric", month: "long", year: "numeric" }).format(date);

export const APP_FOOTER =
  "أداة مستقلة لتتبع الأداء الشخصي، وليست منتجًا رسميًا تابعًا لأورانج ولا معتمدة من الشركة.";
