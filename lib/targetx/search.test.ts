import { describe, expect, it } from "vitest";
import { normalizeSearchCode, normalizeSearchText } from "./search";

describe("normalizeSearchText", () => {
  it("normalizes common Arabic letter forms and diacritics", () => {
    expect(normalizeSearchText("إِزَاي DSL؟")).toBe("ازاي dsl");
  });

  it("normalizes Arabic and Persian digits to ASCII", () => {
    expect(normalizeSearchText("٣١٤٩٠ ۱۲۳")).toBe("31490 123");
  });
});

describe("normalizeSearchCode", () => {
  it("matches SR prefixed codes written with Arabic digits", () => {
    expect(normalizeSearchCode("SR #٣١٤٩٠")).toBe("31490");
  });
});
