const MILLION = 1_000_000;

function clampMinNumber(value, minValue) {
  const n = Number(value);
  if (!Number.isFinite(n)) return minValue;
  return Math.max(minValue, n);
}

function roundUpScaledMax(scaled) {
  const n = Number(scaled);
  if (!Number.isFinite(n) || n <= 0) return MILLION;

  const step =
    n < 10 * MILLION
      ? MILLION
      : n < 100 * MILLION
        ? 10 * MILLION
        : 20 * MILLION;
  return Math.ceil(n / step) * step;
}

export function computeAdaptiveYMax(
  intervals,
  { headroom = 0.15, min = MILLION } = {},
) {
  const maxStack = (intervals ?? []).reduce((m, p) => {
    const sotuv = Number(p?.sotuv ?? 0);
    const rasxod = Number(p?.rasxod ?? 0);
    const total =
      (Number.isFinite(sotuv) ? sotuv : 0) +
      (Number.isFinite(rasxod) ? rasxod : 0);
    return Math.max(m, total);
  }, 0);

  const scaled = maxStack + maxStack * headroom;
  const yMax = roundUpScaledMax(scaled);
  return clampMinNumber(yMax, min);
}

export function makeYAxisTicks(yMax) {
  const max = Number(yMax);
  if (!Number.isFinite(max) || max <= 0) return [0];

  // Prefer 5 ticks for small ranges to avoid super-dense labels.
  const tickCount = max < 10 * MILLION ? 5 : 6;
  const step = max / (tickCount - 1);

  const ticks = [];
  for (let i = tickCount - 1; i >= 0; i--) {
    ticks.push(i === tickCount - 1 ? max : i === 0 ? 0 : step * i);
  }

  return ticks;
}
