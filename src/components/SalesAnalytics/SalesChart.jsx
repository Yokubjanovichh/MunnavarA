import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./sales-analytics.module.css";
import { formatNumber } from "./SummaryCards";
import { makeYAxisTicks } from "./utils/yAxisScale";

function formatMoney(value) {
  return `${formatNumber(value)} so'm`;
}

function formatAxisTick(value) {
  const n = Number(value ?? 0);
  if (!Number.isFinite(n) || n <= 0) return "0";

  if (n >= 1_000_000) {
    const m = n / 1_000_000;

    // For small ranges show one decimal (e.g. 3.2M) to avoid dead zones.
    if (m < 10 && !Number.isInteger(m)) return `${m.toFixed(1)}M`;

    return `${Math.round(m)}M`;
  }

  return String(n);
}

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

export default function SalesChart({ data, yScaleMax, loading, empty }) {
  const plotRef = useRef(null);
  const tooltipRef = useRef(null);

  const [tooltip, setTooltip] = useState({
    open: false,
    activeKey: "",
    x: 0,
    y: 0,
    anchorLeft: 0,
    anchorRight: 0,
    anchorY: 0,
    placement: "right",
    label: "",
    sotuv: 0,
    rasxod: 0,
  });

  const ticks = useMemo(() => {
    return makeYAxisTicks(yScaleMax);
  }, [yScaleMax]);

  const intervals = data?.intervals ?? [];

  const skeletonCols = loading ? intervals.length || 12 : 0;

  const skeletonHeights = useMemo(() => {
    if (!loading) return [];

    // Deterministic “natural” bar heights (no randomness to avoid jitter).
    const base = [26, 54, 34, 78, 46, 64, 30, 82, 40, 58, 22, 70];
    return Array.from({ length: skeletonCols || 12 }).map((_, i) => {
      const bump = i % 4 === 0 ? 6 : i % 4 === 2 ? -4 : 0;
      return clamp(base[i % base.length] + bump, 16, 88);
    });
  }, [loading, skeletonCols]);

  const closeTooltip = () => {
    setTooltip((t) => (t.open ? { ...t, open: false } : t));
  };

  const toggleTooltip = (triggerEl, point) => {
    const plot = plotRef.current;
    if (!plot || !triggerEl) return;

    const plotRect = plot.getBoundingClientRect();
    const barRect = triggerEl.getBoundingClientRect();

    const anchorLeft = barRect.left - plotRect.left;
    const anchorRight = barRect.right - plotRect.left;
    const anchorY = barRect.top - plotRect.top + barRect.height / 2;

    const barKey = String(point?.key ?? "");

    setTooltip((t) => {
      if (t.open && t.activeKey === barKey) {
        return { ...t, open: false };
      }

      return {
        open: true,
        activeKey: barKey,
        x: anchorRight,
        y: anchorY,
        anchorLeft,
        anchorRight,
        anchorY,
        placement: "right",
        label: point?.label ?? "",
        sotuv: point?.sotuv ?? 0,
        rasxod: point?.rasxod ?? 0,
      };
    });
  };

  const handlePlotClick = (e) => {
    // Close when clicking on empty plot area (not a bar).
    if (e.target === e.currentTarget) closeTooltip();
  };

  useEffect(() => {
    if (!tooltip.open) return;

    const el = plotRef.current;
    const tip = tooltipRef.current;
    if (!el || !tip) return;

    const rect = el.getBoundingClientRect();
    const tipRect = tip.getBoundingClientRect();

    const pad = 10;
    const gap = 10;

    let placement = tooltip.placement;
    let xCandidate =
      placement === "left"
        ? tooltip.anchorLeft - gap - tipRect.width
        : tooltip.anchorRight + gap;

    // Flip if it overflows.
    if (
      placement === "right" &&
      xCandidate + tipRect.width + pad > rect.width
    ) {
      placement = "left";
      xCandidate = tooltip.anchorLeft - gap - tipRect.width;
    } else if (placement === "left" && xCandidate < pad) {
      placement = "right";
      xCandidate = tooltip.anchorRight + gap;
    }

    const x = clamp(xCandidate, pad, rect.width - tipRect.width - pad);
    const y = clamp(
      tooltip.anchorY - tipRect.height / 2,
      pad,
      rect.height - tipRect.height - pad,
    );

    if (x !== tooltip.x || y !== tooltip.y || placement !== tooltip.placement) {
      setTooltip((t) => ({ ...t, x, y, placement }));
    }
  }, [
    tooltip.open,
    tooltip.activeKey,
    tooltip.x,
    tooltip.y,
    tooltip.anchorLeft,
    tooltip.anchorRight,
    tooltip.anchorY,
    tooltip.placement,
    tooltip.label,
    tooltip.sotuv,
    tooltip.rasxod,
  ]);

  const bars = useMemo(() => {
    const max = Number(yScaleMax ?? 60_000_000);
    if (!Number.isFinite(max) || max <= 0) return [];

    return intervals.map((p, idx) => {
      const sotuv = Number(p?.sotuv ?? 0);
      const rasxod = Number(p?.rasxod ?? 0);

      const rasxodVal = Number.isFinite(rasxod) ? rasxod : 0;
      const sotuvVal = Number.isFinite(sotuv) ? sotuv : 0;

      const rasxodH = clamp((rasxodVal / max) * 100, 0, 100);
      const sotuvH = clamp((sotuvVal / max) * 100, 0, 100);

      // Overlay logic: larger value behind, smaller value on top.
      // DOM order controls layering (no z-index).
      const backKey = rasxodVal >= sotuvVal ? "rasxod" : "sotuv";
      const frontKey = backKey === "rasxod" ? "sotuv" : "rasxod";
      const backH = backKey === "rasxod" ? rasxodH : sotuvH;
      const frontH = frontKey === "rasxod" ? rasxodH : sotuvH;

      return {
        key: p?.key ?? `${p?.label ?? "i"}-${idx}`,
        label: p?.label ?? "",
        xLabel: p?.xLabel ?? p?.label ?? "",
        sotuv: sotuvVal,
        rasxod: rasxodVal,
        rasxodH,
        sotuvH,
        backKey,
        frontKey,
        backH,
        frontH,
      };
    });
  }, [intervals, yScaleMax]);

  const cols = bars.length || 12;

  return (
    <div className={styles.chartSection}>
      <div className={styles.chartWrap}>
        <div className={styles.yAxis} aria-hidden="true">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={`sk-t-${i}`} className={styles.yTick}>
                  <span
                    className={styles.tickSkeleton}
                    style={{ width: `${22 + (i % 3) * 10}px` }}
                  />
                </div>
              ))
            : ticks.map((t) => (
                <div key={t} className={styles.yTick}>
                  {formatAxisTick(t)}
                </div>
              ))}
        </div>

        <div ref={plotRef} className={styles.plot} onClick={handlePlotClick}>
          {loading ? (
            <div
              className={styles.skeletonBars}
              style={{ "--cols": skeletonCols || 12 }}
              aria-hidden="true"
            >
              {Array.from({ length: skeletonCols || 12 }).map((_, i) => (
                <div
                  key={i}
                  className={styles.skeletonCol}
                  style={{ height: `${skeletonHeights[i] ?? 42}%` }}
                />
              ))}
            </div>
          ) : empty ? (
            <div className={styles.emptyState}>Ma'lumot topilmadi</div>
          ) : (
            <>
              <div className={styles.bars} style={{ "--cols": cols }}>
                {bars.map((b) => (
                  <div
                    key={b.key}
                    className={styles.barCol}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTooltip(e.currentTarget, b);
                    }}
                    role="button"
                    tabIndex={0}
                    onBlur={closeTooltip}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        closeTooltip();
                        return;
                      }

                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleTooltip(e.currentTarget, b);
                      }
                    }}
                  >
                    <div
                      className={
                        b.backKey === "sotuv"
                          ? `${styles.overlayBar} ${styles.segSotuv}`
                          : `${styles.overlayBar} ${styles.segRasxod}`
                      }
                      style={{ height: `${b.backH}%` }}
                      aria-hidden="true"
                    />
                    <div
                      className={
                        b.frontKey === "sotuv"
                          ? `${styles.overlayBar} ${styles.segSotuv}`
                          : `${styles.overlayBar} ${styles.segRasxod}`
                      }
                      style={{ height: `${b.frontH}%` }}
                      aria-hidden="true"
                    />
                  </div>
                ))}
              </div>

              <div
                className={styles.xAxis}
                style={{ "--cols": cols }}
                aria-hidden="true"
              >
                {bars.map((b) => (
                  <div key={`${b.key}-x`} className={styles.xTick}>
                    {b.xLabel}
                  </div>
                ))}
              </div>

              {tooltip.open ? (
                <div
                  ref={tooltipRef}
                  className={styles.tooltip}
                  style={{ left: tooltip.x, top: tooltip.y }}
                  role="status"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={styles.tooltipTitle}>{tooltip.label}</div>
                  <div className={styles.tooltipLine}>
                    <span
                      className={`${styles.tipDot} ${styles.tipDotSotuv}`}
                    />
                    Sotuv: {formatMoney(tooltip.sotuv)}
                  </div>
                  <div className={styles.tooltipLine}>
                    <span
                      className={`${styles.tipDot} ${styles.tipDotRasxod}`}
                    />
                    Rasxod: {formatMoney(tooltip.rasxod)}
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
