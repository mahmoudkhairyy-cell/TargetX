import { describe, expect, it } from "vitest";
import { getSRRecords } from "./sr";
import { ORANGE_DOCS, ORANGE_DSL_ROUTERS, ORANGE_EMAILS, ORANGE_FREEMAX, ORANGE_HOME_DSL_ADDONS, ORANGE_HOME_DSL_PLANS, ORANGE_HUNTS, ORANGE_PLAN_GROUPS, ORANGE_PLANS } from "./orangeResources";

describe("locally bundled Orange reference data", () => {
  it("loads all 365 unique SR records with readable plain-text procedures", () => {
    const records = getSRRecords();
    expect(records).toHaveLength(365);
    expect(new Set(records.map((record) => record.c)).size).toBe(365);
    expect(records.every((record) => record.c && record.te && record.k)).toBe(true);
    expect(records.some((record) => record.steps.length > 0)).toBe(true);
    expect(records.every((record) => !/<\/?(?:b|br|div|p|li)[^>]*>/i.test(record.steps))).toBe(true);
  });

  it("bundles the selected source lists and all categories", () => {
    expect(ORANGE_HUNTS).toHaveLength(33);
    expect(ORANGE_EMAILS).toHaveLength(37);
    expect(ORANGE_DOCS).toHaveLength(10);
    expect(ORANGE_PLANS).toHaveLength(5);
    expect(ORANGE_PLANS.reduce((sum, group) => sum + group.plans.length, 0)).toBe(31);
    expect(ORANGE_PLANS.map((group) => [group.category, group.plans.length])).toEqual([
      ["Orange Premier", 5], ["Super Max", 1], ["Go Monthly", 9], ["Go Extra", 9], ["Home Wireless", 7],
    ]);
    expect(ORANGE_PLAN_GROUPS).toHaveLength(7);
    expect(ORANGE_PLAN_GROUPS.reduce((sum, group) => sum + group.plans.length, 0)).toBe(51);
    expect(ORANGE_HOME_DSL_PLANS).toHaveLength(15);
    expect(ORANGE_HOME_DSL_PLANS.find((plan) => plan.name === "Home DSL 330")?.monthlyPrice).toBe("376.2 جنيه / شهر");
    expect(ORANGE_HOME_DSL_PLANS.every((plan) => plan.taxIncluded)).toBe(true);
    expect(ORANGE_HOME_DSL_ADDONS.map((item) => item.price)).toEqual(["68.4 جنيه", "159.6 جنيه", "216.6 جنيه", "319.2 جنيه", "570 جنيه"]);
    expect(ORANGE_DSL_ROUTERS).toHaveLength(2);
    expect(ORANGE_FREEMAX.plans).toHaveLength(6);
    expect(ORANGE_FREEMAX.weekly.name).toBe("FREEmax Weekly");
    expect(ORANGE_FREEMAX.weekly.channels).toHaveLength(8);
    expect(Object.keys(ORANGE_FREEMAX)).toEqual(["tagline", "highlights", "globalPerks", "simPrice", "plans", "weekly"]);
  });
});
