import { describe, expect, it } from "vitest";
import { getSRRecords, searchSRRecords } from "./sr";

describe("local SR search for assistant context", () => {
  it("matches an exact local code and returns no more than five excerpts", () => {
    const sample = getSRRecords()[0];
    const results = searchSRRecords(sample.c, 99);
    expect(results[0]?.code).toBe(sample.c);
    expect(results.length).toBeLessThanOrEqual(5);
  });

  it("returns no records for an unrelated phrase absent from the local catalog", () => {
    expect(searchSRRecords("qzxv9876nonsense")).toEqual([]);
  });
});
