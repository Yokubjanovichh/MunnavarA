function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  return function rng() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

function magnitudeForGranularity(granularity) {
  switch (granularity) {
    case "hour":
      return 8_000_000;
    case "day":
      return 35_000_000;
    case "week":
      return 55_000_000;
    case "month":
    default:
      return 60_000_000;
  }
}

function daysForFilter(activeFilter) {
  switch (activeFilter) {
    case "1-Kun":
      return 1;
    case "1-Hafta":
      return 7;
    case "1-Oy":
      return 30;
    case "3-Oy":
      return 90;
    case "6-Oy":
      return 180;
    case "1-Yil":
    default:
      return 365;
  }
}

function buildPoint(rng, baseMag, idx, len) {
  const season =
    0.65 + 0.25 * Math.sin(((idx + 1) / Math.max(1, len)) * Math.PI * 2);
  const noise = 0.55 + rng() * 0.9;

  let total = baseMag * season * noise;

  // Occasional peak to test dynamic scale
  if (rng() > 0.96) total *= 1.6;
  if (rng() > 0.985) total *= 1.9;

  total = clamp(total, 0, 120_000_000);

  // Split into sotuv/rasxod; keep variety so layer ordering changes per bar
  const ratio = 0.25 + rng() * 0.6; // sotuv share
  const sotuv = Math.round(total * ratio);
  const rasxod = Math.round(total - sotuv);

  return { sotuv, rasxod };
}

function buildTotals(meta, intervals, seed) {
  const revenue = intervals.reduce((acc, x) => acc + (x.sotuv ?? 0), 0);
  const expense = intervals.reduce((acc, x) => acc + (x.rasxod ?? 0), 0);

  const rng = mulberry32(seed ^ 0x9e3779b9);
  const d = daysForFilter(meta.activeFilter);

  // Counts: deterministic but scaled by range
  const customers = Math.round((1200 + rng() * 4800) * Math.sqrt(d / 30));
  const couriers = Math.round(4500 + rng() * 3500);
  const orders = Math.round((180 + rng() * 520) * (d / 30));
  const reviews = Math.round((60 + rng() * 180) * (d / 30));

  return {
    revenue,
    expense,
    customers,
    couriers,
    orders,
    reviews,
  };
}

export function getMockSalesAnalytics(meta, generatedIntervals) {
  const baseMag = magnitudeForGranularity(meta.granularity);
  const seedBase = hashString(`${meta.activeFilter}|${meta.granularity}`);

  const intervals = generatedIntervals.map((g, idx) => {
    const seed = hashString(
      `${seedBase}|${g.matchKey || g.key || g.label || idx}`,
    );
    const rng = mulberry32(seed);

    const { sotuv, rasxod } = buildPoint(
      rng,
      baseMag,
      idx,
      generatedIntervals.length,
    );

    return {
      ...g,
      sotuv,
      rasxod,
    };
  });

  const totals = buildTotals(meta, intervals, seedBase);

  return { intervals, totals };
}

export function sleep(ms, signal) {
  return new Promise((resolve, reject) => {
    const id = setTimeout(resolve, ms);

    const onAbort = () => {
      clearTimeout(id);
      const err = new DOMException("Aborted", "AbortError");
      reject(err);
    };

    if (signal) {
      if (signal.aborted) return onAbort();
      signal.addEventListener("abort", onAbort, { once: true });

      setTimeout(() => {
        signal.removeEventListener("abort", onAbort);
      }, ms + 10);
    }
  });
}
