const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MONTHS_FULL = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function pad2(value) {
  return String(value).padStart(2, "0");
}

export function toISODate(date) {
  const year = date.getFullYear();
  const month = pad2(date.getMonth() + 1);
  const day = pad2(date.getDate());
  return `${year}-${month}-${day}`;
}

export function fromISODate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

export function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function getToday() {
  const today = new Date();
  const iso = toISODate(today);
  return { startDate: iso, endDate: iso };
}

export function getLast7Days() {
  const today = new Date();
  const start = addDays(today, -6);
  return { startDate: toISODate(start), endDate: toISODate(today) };
}

export function getFullCurrentMonth() {
  const today = new Date();
  const start = startOfMonth(today);
  const end = endOfMonth(today);
  return { startDate: toISODate(start), endDate: toISODate(end) };
}

export function getPreviousMonth() {
  const today = new Date();
  const prev = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const start = startOfMonth(prev);
  const end = endOfMonth(prev);
  return { startDate: toISODate(start), endDate: toISODate(end) };
}

export function getCurrentYear() {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 1);
  const end = new Date(today.getFullYear(), 11, 31);
  return { startDate: toISODate(start), endDate: toISODate(end) };
}

export function formatDisplayDate(iso) {
  if (!iso) return "";
  const date = fromISODate(iso);
  const day = pad2(date.getDate());
  const month = MONTHS_SHORT[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export function formatMonthTitle(year, monthIndex) {
  return `${MONTHS_FULL[monthIndex]} ${year}`;
}

export function compareISO(a, b) {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

export function isBetweenISO(iso, startISO, endISO) {
  if (!startISO || !endISO) return false;
  return iso >= startISO && iso <= endISO;
}
