import { useEffect, useMemo, useRef, useState } from "react";
import { api } from "@/services/api";
import { getMockSalesAnalytics, sleep } from "./mockSalesData";
import { computeAdaptiveYMax } from "./utils/yAxisScale";

const USE_MOCK = String(import.meta.env.VITE_MOCK_SALES_ANALYTICS) === "true";
const USE_MOCK_FALLBACK =
  String(import.meta.env.VITE_MOCK_SALES_ANALYTICS_FALLBACK) === "true";

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function endOfDay(d) {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function addMonths(date, months) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function toISO(date) {
  return new Date(date).toISOString();
}

function isoDayKey(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x.toISOString().slice(0, 10); // YYYY-MM-DD
}

function isoHourKey(d) {
  const x = new Date(d);
  x.setMinutes(0, 0, 0);
  return x.toISOString().slice(0, 13); // YYYY-MM-DDTHH
}

function isoMonthKey(d) {
  const x = new Date(d);
  x.setDate(1);
  x.setHours(0, 0, 0, 0);
  return x.toISOString().slice(0, 7); // YYYY-MM
}

function weekStartMonday(d) {
  const x = startOfDay(d);
  const day = x.getDay();
  const diff = (day + 6) % 7;
  return addDays(x, -diff);
}

function toMatchKey(date, granularity) {
  if (!date) return "";
  try {
    if (granularity === "hour") return isoHourKey(date);
    if (granularity === "day") return isoDayKey(date);
    if (granularity === "week") return isoDayKey(weekStartMonday(date));
    return isoMonthKey(date);
  } catch {
    return "";
  }
}

function buildRequestMeta(activeFilter) {
  const now = new Date();

  switch (activeFilter) {
    case "1-Kun": {
      const from = startOfDay(now);
      const to = endOfDay(now);
      return { activeFilter, from, to, granularity: "hour" };
    }
    case "1-Hafta": {
      const to = endOfDay(now);
      const from = startOfDay(addDays(to, -6));
      return { activeFilter, from, to, granularity: "day" };
    }
    case "1-Oy": {
      const to = endOfDay(now);
      const from = startOfDay(addMonths(to, -1));
      return { activeFilter, from, to, granularity: "day" };
    }
    case "3-Oy": {
      const to = endOfDay(now);
      const from = startOfDay(addMonths(to, -3));
      return { activeFilter, from, to, granularity: "week" };
    }
    case "6-Oy": {
      const to = endOfDay(now);
      const from = startOfDay(addMonths(to, -6));
      return { activeFilter, from, to, granularity: "month" };
    }
    case "1-Yil":
    default: {
      const to = endOfDay(now);
      const from = startOfDay(addMonths(to, -12));
      return { activeFilter: "1-Yil", from, to, granularity: "month" };
    }
  }
}

function fmtHour(h) {
  return String(h).padStart(2, "0");
}

function fmtDay(date) {
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
  }).format(date);
}

function fmtMonth(date) {
  return new Intl.DateTimeFormat("en", { month: "short" }).format(date);
}

function buildIntervals({ from, to, granularity }) {
  const intervals = [];

  if (granularity === "hour") {
    const day = startOfDay(from);
    for (let h = 0; h < 24; h++) {
      const d = new Date(day);
      d.setHours(h, 0, 0, 0);
      intervals.push({
        key: d.toISOString(),
        matchKey: toMatchKey(d, "hour"),
        label: `${fmtHour(h)}:00`,
        xLabel: fmtHour(h),
      });
    }
    return intervals;
  }

  if (granularity === "day") {
    let cursor = startOfDay(from);
    const end = startOfDay(to);
    while (cursor <= end) {
      const d = new Date(cursor);
      intervals.push({
        key: d.toISOString(),
        matchKey: toMatchKey(d, "day"),
        label: fmtDay(d),
        xLabel: String(d.getDate()),
      });
      cursor = addDays(cursor, 1);
    }
    return intervals;
  }

  if (granularity === "week") {
    let cursor = startOfDay(from);
    const end = startOfDay(to);

    // align to Monday
    const day = cursor.getDay();
    const diff = (day + 6) % 7; // 0 for Monday
    cursor = addDays(cursor, -diff);

    while (cursor <= end) {
      const d = new Date(cursor);
      intervals.push({
        key: d.toISOString(),
        matchKey: toMatchKey(d, "week"),
        label: fmtDay(d),
        xLabel: fmtDay(d),
      });
      cursor = addDays(cursor, 7);
    }
    return intervals;
  }

  // month
  const start = new Date(from);
  start.setDate(1);
  start.setHours(0, 0, 0, 0);

  const endMonth = new Date(to);
  endMonth.setDate(1);
  endMonth.setHours(0, 0, 0, 0);

  let cursor = start;
  while (cursor <= endMonth) {
    const d = new Date(cursor);
    intervals.push({
      key: d.toISOString(),
      matchKey: toMatchKey(d, "month"),
      label: fmtMonth(d),
      xLabel: fmtMonth(d),
    });
    cursor = addMonths(cursor, 1);
  }

  return intervals;
}

function pickIntervalsArray(raw) {
  if (!raw) return [];
  if (Array.isArray(raw.intervals)) return raw.intervals;
  if (Array.isArray(raw.data)) return raw.data;
  if (Array.isArray(raw.results)) return raw.results;
  if (Array.isArray(raw.items)) return raw.items;
  return [];
}

function extractDateCandidate(p) {
  const candidate =
    p?.date ??
    p?.start ??
    p?.from ??
    p?.timestamp ??
    p?.time ??
    p?.at ??
    p?.key;
  if (!candidate) return null;

  const d = new Date(candidate);
  return Number.isFinite(d.getTime()) ? d : null;
}

function normalizePoint(p, granularity) {
  const label =
    p?.label ??
    p?.name ??
    p?.title ??
    (typeof p?.date === "string" ? p.date : undefined) ??
    "";

  const sotuv = Number(p?.sotuv ?? p?.sales ?? p?.revenue ?? p?.income ?? 0);
  const rasxod = Number(p?.rasxod ?? p?.expense ?? p?.cost ?? p?.spend ?? 0);

  const dateCandidate = extractDateCandidate(p);
  const matchKey = dateCandidate ? toMatchKey(dateCandidate, granularity) : "";

  return {
    label,
    matchKey,
    sotuv: Number.isFinite(sotuv) ? sotuv : 0,
    rasxod: Number.isFinite(rasxod) ? rasxod : 0,
  };
}

function normalizeTotals(raw, fallbackFromIntervals) {
  const t = raw?.totals ?? raw?.total ?? raw?.summary ?? raw?.meta?.totals;
  const totals = {
    revenue: Number(t?.revenue ?? t?.sales ?? t?.income ?? t?.totalRevenue),
    expense: Number(
      t?.expense ?? t?.rasxod ?? t?.cost ?? t?.spend ?? t?.totalExpense,
    ),
    customers: Number(t?.customers ?? t?.clients ?? t?.users),
    couriers: Number(
      t?.couriers ?? t?.activeCouriers ?? t?.riders ?? t?.kuryerlar,
    ),
    orders: Number(t?.orders ?? t?.orderCount ?? t?.buyurtma ?? t?.orderTotal),
    reviews: Number(t?.comments ?? t?.reviews ?? t?.feedbacks ?? t?.sharhlar),
  };

  const out = {
    revenue: Number.isFinite(totals.revenue)
      ? totals.revenue
      : fallbackFromIntervals.revenue,
    expense: Number.isFinite(totals.expense)
      ? totals.expense
      : fallbackFromIntervals.expense,
    customers: Number.isFinite(totals.customers)
      ? totals.customers
      : fallbackFromIntervals.customers,
    couriers: Number.isFinite(totals.couriers)
      ? totals.couriers
      : fallbackFromIntervals.couriers,
    orders: Number.isFinite(totals.orders)
      ? totals.orders
      : fallbackFromIntervals.orders,
    reviews: Number.isFinite(totals.reviews)
      ? totals.reviews
      : fallbackFromIntervals.reviews,
  };

  return out;
}

function aggregateFallback(intervals) {
  const revenue = intervals.reduce((acc, x) => acc + (x?.sotuv ?? 0), 0);
  const expense = intervals.reduce((acc, x) => acc + (x?.rasxod ?? 0), 0);
  return { revenue, expense, customers: 0, couriers: 0, orders: 0, reviews: 0 };
}

export default function useSalesAnalytics() {
  const [activeFilter, setActiveFilter] = useState("1-Yil");
  const [loading, setLoading] = useState(false);
  const [summaryData, setSummaryData] = useState({
    revenue: 0,
    expense: 0,
    customers: 0,
    couriers: 0,
    orders: 0,
    reviews: 0,
  });
  const [chartData, setChartData] = useState({ intervals: [] });
  const [yScaleMax, setYScaleMax] = useState(() => computeAdaptiveYMax([]));

  const abortRef = useRef(null);

  const meta = useMemo(() => buildRequestMeta(activeFilter), [activeFilter]);

  useEffect(() => {
    const run = async () => {
      if (abortRef.current) abortRef.current.abort();
      const ac = new AbortController();
      abortRef.current = ac;

      setLoading(true);

      try {
        const generated = buildIntervals(meta);

        if (USE_MOCK) {
          await sleep(260, ac.signal);
          const mock = getMockSalesAnalytics(meta, generated);

          setSummaryData(
            normalizeTotals(
              { totals: mock.totals },
              aggregateFallback(mock.intervals),
            ),
          );
          setChartData({ intervals: mock.intervals });

          setYScaleMax(computeAdaptiveYMax(mock.intervals));
          return;
        }

        const res = await api.get("/analytics/sales", {
          signal: ac.signal,
          params: {
            from: toISO(meta.from),
            to: toISO(meta.to),
            granularity: meta.granularity,
          },
        });

        const raw = res?.data;
        const rawIntervals = pickIntervalsArray(raw).map((x) =>
          normalizePoint(x, meta.granularity),
        );

        const byMatchKey = new Map(
          rawIntervals
            .filter((x) => x.matchKey)
            .map((x) => [String(x.matchKey), x]),
        );

        const byLabel = new Map(
          rawIntervals.map((x) => [String(x.label ?? "").toLowerCase(), x]),
        );

        const canIndexMatch = rawIntervals.length === generated.length;

        const merged = generated.map((g, idx) => {
          const hit =
            (g?.matchKey ? byMatchKey.get(String(g.matchKey)) : null) ??
            byLabel.get(String(g.label).toLowerCase()) ??
            (canIndexMatch ? rawIntervals[idx] : null);

          return {
            ...g,
            sotuv: hit?.sotuv ?? 0,
            rasxod: hit?.rasxod ?? 0,
          };
        });

        const fallbackTotals = aggregateFallback(merged);
        const totals = normalizeTotals(raw, fallbackTotals);

        setSummaryData(totals);
        setChartData({ intervals: merged });

        setYScaleMax(computeAdaptiveYMax(merged));
      } catch (e) {
        if (e?.name === "CanceledError" || e?.code === "ERR_CANCELED") return;

        const generated = buildIntervals(meta);

        if (USE_MOCK_FALLBACK) {
          const mock = getMockSalesAnalytics(meta, generated);
          setSummaryData(
            normalizeTotals(
              { totals: mock.totals },
              aggregateFallback(mock.intervals),
            ),
          );
          setChartData({ intervals: mock.intervals });
          setYScaleMax(computeAdaptiveYMax(mock.intervals));
          return;
        }

        // Graceful fallback: keep generated intervals but show zeros + empty state
        const zeros = generated.map((g) => ({
          ...g,
          sotuv: 0,
          rasxod: 0,
        }));

        setSummaryData({
          revenue: 0,
          expense: 0,
          customers: 0,
          couriers: 0,
          orders: 0,
          reviews: 0,
        });
        setChartData({ intervals: zeros });
        setYScaleMax(computeAdaptiveYMax(zeros));
      } finally {
        setLoading(false);
      }
    };

    run();

    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [meta]);

  const empty = useMemo(() => {
    const intervals = chartData?.intervals ?? [];
    if (!intervals.length) return true;
    return intervals.every(
      (x) => (x?.sotuv ?? 0) === 0 && (x?.rasxod ?? 0) === 0,
    );
  }, [chartData]);

  const dateRange = useMemo(
    () => ({ from: meta.from, to: meta.to, granularity: meta.granularity }),
    [meta.from, meta.to, meta.granularity],
  );

  return {
    activeFilter,
    setActiveFilter,
    dateRange,
    summaryData,
    chartData,
    yScaleMax,
    loading,
    empty,
  };
}
