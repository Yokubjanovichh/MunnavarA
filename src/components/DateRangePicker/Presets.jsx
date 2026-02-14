import styles from "./date-range.module.css";

const PRESETS = [
  { key: "today", label: "Bugun" },
  { key: "yesterday", label: "Kecha" },
  { key: "last2", label: "Oxirgi 2 kun" },
  { key: "last7", label: "Oxirgi 7 kun" },
  { key: "prevMonth", label: "To‘liq o‘tgan oy" },
  { key: "thisMonth", label: "To‘liq shu oy" },
  { key: "prevYear", label: "O‘tgan yil" },
  { key: "thisYear", label: "To‘liq shu yil" },
];

export default function Presets({ activePreset, onSelect }) {
  return (
    <div className={styles.presets}>
      {PRESETS.map((p) => (
        <button
          key={p.key}
          type="button"
          className={
            activePreset === p.key
              ? `${styles.presetBtn} ${styles.presetBtnActive}`
              : styles.presetBtn
          }
          onClick={() => onSelect(p.key)}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
