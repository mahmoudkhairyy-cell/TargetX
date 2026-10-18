import { describe, expect, it } from "vitest";
import {
  ORANGE_DOCS,
  ORANGE_DSL_ROUTERS,
  ORANGE_EMAILS,
  ORANGE_FREEMAX,
  ORANGE_HOME_DSL_ADDONS,
  ORANGE_HOME_DSL_PLANS,
  ORANGE_HUNTS,
  ORANGE_PLANS,
  ORANGE_PLAN_GROUPS,
} from "./orangeResources";
import { getSRRecords, searchLocalKnowledge } from "./sr";

describe("local Orange knowledge index", () => {
  it("includes each local source section and expected snapshot counts", () => {
    const sr = getSRRecords();
    expect(sr).toHaveLength(365);
    expect(new Set(sr.map((item) => item.c)).size).toBe(365);
    expect(ORANGE_HUNTS).toHaveLength(33);
    expect(ORANGE_EMAILS).toHaveLength(37);
    expect(ORANGE_PLANS).toHaveLength(5);
    expect(ORANGE_PLANS.reduce((total, group) => total + group.plans.length, 0)).toBe(31);
    expect(ORANGE_PLAN_GROUPS).toHaveLength(7);
    expect(ORANGE_PLAN_GROUPS.reduce((total, group) => total + group.plans.length, 0)).toBe(51);
    expect(ORANGE_HOME_DSL_PLANS).toHaveLength(15);
    expect(ORANGE_HOME_DSL_ADDONS).toHaveLength(5);
    expect(ORANGE_DSL_ROUTERS).toHaveLength(2);
    expect(ORANGE_DOCS).toHaveLength(10);
    expect(ORANGE_FREEMAX.plans).toHaveLength(6);
  });

  it("finds records from SR, contacts, email, plans, FreeMax, and Hub Docs", () => {
    const srCode = getSRRecords()[0]?.c ?? "";
    const srResult = searchLocalKnowledge(srCode);
    expect(srResult[0]?.section).toBe("SR");

    expect(searchLocalKnowledge(ORANGE_HUNTS[0].name).some((item) => item.section === "جهات الاتصال والتحويلات")).toBe(true);
    expect(searchLocalKnowledge(ORANGE_EMAILS[0].name).some((item) => item.section === "البريد الإلكتروني")).toBe(true);
    expect(searchLocalKnowledge(ORANGE_PLANS[0].plans[0].name).some((item) => item.section === "الباقات")).toBe(true);
    const dslPackage = searchLocalKnowledge("Home DSL 330").find((item) => item.title === "Home DSL 330");
    expect(dslPackage?.content).toContain("376.2 جنيه / شهر");
    expect(searchLocalKnowledge("خصم 50%").some((item) => item.title === "خصم العملاء الجدد")).toBe(true);
    expect(searchLocalKnowledge(ORANGE_DSL_ROUTERS[0].name).some((item) => item.section === "راوترات VDSL")).toBe(true);
    expect(searchLocalKnowledge("FreeMax").some((item) => item.section === "FreeMax")).toBe(true);
    expect(searchLocalKnowledge(ORANGE_DOCS[0].title).some((item) => item.section === "Hub Docs")).toBe(true);
  });

  it("limits the context to five concise matching snippets", () => {
    const results = searchLocalKnowledge("Orange", 50);
    expect(results.length).toBeLessThanOrEqual(5);
    expect(results.every((item) => item.content.length <= 1800)).toBe(true);
  });
});
