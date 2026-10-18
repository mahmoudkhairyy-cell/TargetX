export type RateLimiter = {
  isLimited(key: string, now?: number): boolean;
  prune(now?: number): void;
  size(): number;
};

/** Fixed-window limiter with bounded memory for an unauthenticated public chat endpoint. */
export function createFixedWindowLimiter(
  limit = 30,
  windowMs = 60_000,
  maxKeys = 5_000,
): RateLimiter {
  const buckets = new Map<string, { count: number; resetAt: number }>();

  const prune = (now = Date.now()) => {
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(key);
    }
  };

  const isLimited = (key: string, now = Date.now()) => {
    const safeKey = key.trim() || "unknown";
    const current = buckets.get(safeKey);
    if (!current || current.resetAt <= now) {
      if (buckets.size >= maxKeys) {
        prune(now);
        while (buckets.size >= maxKeys) {
          const oldest = buckets.keys().next().value as string | undefined;
          if (!oldest) break;
          buckets.delete(oldest);
        }
      }
      buckets.set(safeKey, { count: 1, resetAt: now + windowMs });
      return false;
    }

    if (current.count >= limit) return true;
    current.count += 1;
    return false;
  };

  return { isLimited, prune, size: () => buckets.size };
}
