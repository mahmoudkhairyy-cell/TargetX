import { describe, expect, it } from "vitest";
import { createFixedWindowLimiter } from "./rateLimit";
import { buildGeminiPayload } from "./targetxChat";

describe("TargetX chat service safeguards", () => {
  it("limits each client independently and resets the fixed window", () => {
    const limiter = createFixedWindowLimiter(2, 1_000, 10);
    expect(limiter.isLimited("client-a", 0)).toBe(false);
    expect(limiter.isLimited("client-a", 1)).toBe(false);
    expect(limiter.isLimited("client-a", 2)).toBe(true);
    expect(limiter.isLimited("client-b", 2)).toBe(false);
    expect(limiter.isLimited("client-a", 1_000)).toBe(false);
  });

  it("prunes expired buckets and keeps the map bounded", () => {
    const limiter = createFixedWindowLimiter(1, 10, 2);
    limiter.isLimited("a", 0);
    limiter.isLimited("b", 0);
    expect(limiter.size()).toBe(2);
    limiter.isLimited("c", 1);
    expect(limiter.size()).toBe(2);
    limiter.prune(11);
    expect(limiter.size()).toBe(0);
  });

  it("uses a stateless Gemini request", () => {
    const payload = buildGeminiPayload("سؤال", "تعليمات");
    expect(payload.model).toBe("gemini-3.8-flash");
    expect(payload.store).toBe(false);
    expect(payload.input).toBe("سؤال");
    expect(payload.system_instruction).toBe("تعليمات");
  });
});
