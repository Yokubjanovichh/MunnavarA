import styles from "./Table.module.css";

export default function Table({
  columns = [],
  rows = [],
  keyField = "id",
  wrapClassName,
  tableClassName,
}) {
  const mergedWrapClassName = wrapClassName
    ? `${styles.wrap} ${wrapClassName}`
    : styles.wrap;

  const mergedTableClassName = tableClassName
    ? `${styles.table} ${tableClassName}`
    : styles.table;

  return (
    <div className={mergedWrapClassName}>
      <table className={mergedTableClassName}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key}>{c.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[keyField] ?? JSON.stringify(r)}>
              {columns.map((c) => (
                <td key={c.key}>{c.render ? c.render(r) : r[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
