import styles from "./sales-analytics.module.css";

const FILTERS = [
  { key: "1-Kun", label: "1-Kun" },
  { key: "1-Hafta", label: "1-H" },
  { key: "1-Oy", label: "1-Oy" },
  { key: "3-Oy", label: "3-Oy" },
  { key: "6-Oy", label: "6-Oy" },
  { key: "1-Yil", label: "1-Yil" },
];

export default function RangeFilter({ value, onChange, disabled = false }) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="Date range">
      {FILTERS.map((t) => {
        const isActive = t.key === value;
        return (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={disabled}
            className={
              isActive ? `${styles.tab} ${styles.tabActive}` : styles.tab
            }
            onClick={() => onChange?.(t.key)}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

export { FILTERS };
