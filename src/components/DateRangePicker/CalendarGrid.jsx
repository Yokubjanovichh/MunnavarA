import styles from "./date-range.module.css";
import {
  compareISO,
  formatMonthTitle,
  fromISODate,
  isBetweenISO,
  toISODate,
} from "./utils/dateHelpers";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getMonthMatrix(viewYear, viewMonth) {
  const first = new Date(viewYear, viewMonth, 1);
  const firstDay = first.getDay(); // 0..6 (Sun..Sat)
  const offset = (firstDay + 6) % 7; // Monday-based

  const start = new Date(viewYear, viewMonth, 1 - offset);
  const days = [];
  for (let i = 0; i < 42; i += 1) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
}

export default function CalendarGrid({
  viewYear,
  viewMonth,
  startDate,
  endDate,
  onPrevMonth,
  onNextMonth,
  onDayClick,
}) {
  const days = getMonthMatrix(viewYear, viewMonth);
  const title = formatMonthTitle(viewYear, viewMonth);

  return (
    <div className={styles.calendar}>
      <div className={styles.calTop}>
        <button
          type="button"
          className={styles.navBtn}
          onClick={onPrevMonth}
          aria-label="Previous month"
        >
          <span aria-hidden="true">‹</span>
        </button>
        <div className={styles.monthTitle}>{title}</div>
        <button
          type="button"
          className={styles.navBtn}
          onClick={onNextMonth}
          aria-label="Next month"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <div className={styles.weekdays}>
        {WEEKDAYS.map((w) => (
          <div
            key={w}
            className={
              w === "Sun" ? `${styles.weekday} ${styles.sun}` : styles.weekday
            }
          >
            {w}
          </div>
        ))}
      </div>

      <div className={styles.grid}>
        {days.map((date) => {
          const iso = toISODate(date);
          const isCurrentMonth = date.getMonth() === viewMonth;
          const isSunday = date.getDay() === 0;

          const isStart = startDate === iso;
          const isEnd = endDate === iso;
          const hasRange = Boolean(startDate && endDate);
          const inRange = hasRange && isBetweenISO(iso, startDate, endDate);

          const isBeforeStart =
            startDate && !endDate && compareISO(iso, startDate) < 0;

          const className = [styles.dayBtn];
          if (!isCurrentMonth) className.push(styles.dayOutside);
          if (isSunday) className.push(styles.daySun);
          if (inRange) className.push(styles.dayInRange);
          if (isStart || isEnd) className.push(styles.dayEdge);
          if (isBeforeStart) className.push(styles.dayFaded);

          return (
            <button
              key={iso}
              type="button"
              className={className.join(" ")}
              onClick={() => onDayClick(iso)}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
