export function normalizeSearchText(value: string): string {
  return value.normalize("NFKC").toLocaleLowerCase()
    .replace(/[٠-٩۰-۹]/g, (digit) => {
      const code = digit.charCodeAt(0);
      return String(code >= 0x06f0 ? code - 0x06f0 : code - 0x0660);
    })
  .replace(/[\u064b-\u065f\u0670\u0640]/g, "")
  .replace(/[أإآٱ]/g, "ا")
  .replace(/[ىی]/g, "ي")
  .replace(/[؟،؛٬٫]/g, " ")
  .replace(/[^\u0600-\u06ffa-z0-9]+/gi, " ")
  .trim()
  .replace(/\s+/g, " ");
}

export function normalizeSearchCode(value: string): string {
  return normalizeSearchText(value).replace(/\bsr\b/g, " ").trim().replace(/\s+/g, " ");
}
