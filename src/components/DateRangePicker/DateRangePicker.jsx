import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./date-range.module.css";
import CalendarGrid from "./CalendarGrid";
import Presets from "./Presets";
import {
  addDays,
  compareISO,
  formatDisplayDate,
  fromISODate,
  getCurrentYear,
  getFullCurrentMonth,
  getLast7Days,
  getPreviousMonth,
  getToday,
  toISODate,
} from "./utils/dateHelpers";

function calcPreset(presetKey) {
  const today = new Date();

  switch (presetKey) {
    case "today":
      return getToday();
    case "yesterday": {
      const d = addDays(today, -1);
      const iso = toISODate(d);
      return { startDate: iso, endDate: iso };
    }
    case "last2": {
      const start = addDays(today, -1);
      return { startDate: toISODate(start), endDate: toISODate(today) };
    }
    case "last7":
      return getLast7Days();
    case "prevMonth":
      return getPreviousMonth();
    case "thisMonth":
      return getFullCurrentMonth();
    case "prevYear": {
      const y = today.getFullYear() - 1;
      return {
        startDate: `${y}-01-01`,
        endDate: `${y}-12-31`,
      };
    }
    case "thisYear":
      return getCurrentYear();
    default:
      return getLast7Days();
  }
}

export default function DateRangePicker({ onChange, align = "right" }) {
  const rootRef = useRef(null);

  const initial = useMemo(() => calcPreset("last7"), []);
  const [startDate, setStartDate] = useState(initial.startDate);
  const [endDate, setEndDate] = useState(initial.endDate);
  const [isOpen, setIsOpen] = useState(false);
  const [activePreset, setActivePreset] = useState("last7");

  const initialView = useMemo(
    () => fromISODate(initial.endDate),
    [initial.endDate],
  );
  const [viewYear, setViewYear] = useState(initialView.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialView.getMonth());

  const displayText = useMemo(() => {
    if (startDate && endDate) {
      return `${formatDisplayDate(startDate)} - ${formatDisplayDate(endDate)}`;
    }
    if (startDate && !endDate) {
      return `${formatDisplayDate(startDate)} - …`;
    }
    return "Select date range";
  }, [startDate, endDate]);

  useEffect(() => {
    if (!startDate || !endDate) return;
    onChange?.({ startDate, endDate });
  }, [startDate, endDate, onChange]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    const onMouseDown = (e) => {
      const root = rootRef.current;
      if (!root) return;
      if (root.contains(e.target)) return;
      setIsOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [isOpen]);

  const applyPreset = (presetKey) => {
    const next = calcPreset(presetKey);
    setActivePreset(presetKey);
    setStartDate(next.startDate);
    setEndDate(next.endDate);

    const view = fromISODate(next.endDate);
    setViewYear(view.getFullYear());
    setViewMonth(view.getMonth());

    setIsOpen(false);
  };

  const handleDayClick = (iso) => {
    setActivePreset(null);

    if (!startDate || (startDate && endDate)) {
      setStartDate(iso);
      setEndDate(null);
      const d = fromISODate(iso);
      setViewYear(d.getFullYear());
      setViewMonth(d.getMonth());
      return;
    }

    // second click => end
    let nextStart = startDate;
    let nextEnd = iso;

    if (compareISO(nextEnd, nextStart) < 0) {
      [nextStart, nextEnd] = [nextEnd, nextStart];
    }

    setStartDate(nextStart);
    setEndDate(nextEnd);
    setIsOpen(false);
  };

  const onPrevMonth = () => {
    const d = new Date(viewYear, viewMonth, 1);
    d.setMonth(d.getMonth() - 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };

  const onNextMonth = () => {
    const d = new Date(viewYear, viewMonth, 1);
    d.setMonth(d.getMonth() + 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={styles.inputBtn}
        onClick={() => setIsOpen((v) => !v)}
      >
        <svg
          className={styles.inputIcon}
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M14 2.5V4.5M6 2.5V4.5M3.5 7.5H16.5M4.5 4H15.5C16.0523 4 16.5 4.44772 16.5 5V16C16.5 16.5523 16.0523 17 15.5 17H4.5C3.94772 17 3.5 16.5523 3.5 16V5C3.5 4.44772 3.94772 4 4.5 4Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className={styles.inputText}>{displayText}</span>
      </button>

      {isOpen && (
        <div
          className={
            align === "left"
              ? `${styles.dropdown} ${styles.dropdownLeft}`
              : `${styles.dropdown} ${styles.dropdownRight}`
          }
          role="dialog"
          aria-label="Date range picker"
        >
          <div className={styles.leftPanel}>
            <Presets activePreset={activePreset} onSelect={applyPreset} />
          </div>
          <div className={styles.rightPanel}>
            <CalendarGrid
              viewYear={viewYear}
              viewMonth={viewMonth}
              startDate={startDate}
              endDate={endDate}
              onPrevMonth={onPrevMonth}
              onNextMonth={onNextMonth}
              onDayClick={handleDayClick}
            />
          </div>
        </div>
      )}
    </div>
  );
}
