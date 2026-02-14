import RangeFilter from "./RangeFilter";
import SalesChart from "./SalesChart";
import SummaryCards from "./SummaryCards";
import useSalesAnalytics from "./useSalesAnalytics";
import styles from "./sales-analytics.module.css";

export default function SalesAnalytics() {
  const {
    activeFilter,
    setActiveFilter,
    summaryData,
    chartData,
    yScaleMax,
    loading,
    empty,
  } = useSalesAnalytics();

  return (
    <div className={styles.panel}>
      <div className={styles.panelTop}>
        <div className={styles.panelTitle}>
          <span className={styles.panelTitleIcon} aria-hidden="true">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.583374 0.583252H2.91671L4.48004 8.39409C4.53338 8.66265 4.67949 8.90389 4.89278 9.07559C5.10606 9.24729 5.37295 9.3385 5.64671 9.33325H11.3167C11.5905 9.3385 11.8574 9.24729 12.0706 9.07559C12.2839 8.90389 12.43 8.66265 12.4834 8.39409L13.4167 3.49992H3.50004M5.83337 12.2499C5.83337 12.5721 5.57221 12.8333 5.25004 12.8333C4.92787 12.8333 4.66671 12.5721 4.66671 12.2499C4.66671 11.9278 4.92787 11.6666 5.25004 11.6666C5.57221 11.6666 5.83337 11.9278 5.83337 12.2499ZM12.25 12.2499C12.25 12.5721 11.9889 12.8333 11.6667 12.8333C11.3445 12.8333 11.0834 12.5721 11.0834 12.2499C11.0834 11.9278 11.3445 11.6666 11.6667 11.6666C11.9889 11.6666 12.25 11.9278 12.25 12.2499Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Savdolar dinamikasi
        </div>

        <RangeFilter
          value={activeFilter}
          onChange={setActiveFilter}
          disabled={loading}
        />
      </div>

      <SummaryCards data={summaryData} loading={loading} />

      <SalesChart
        data={chartData}
        yScaleMax={yScaleMax}
        loading={loading}
        empty={empty}
      />
    </div>
  );
}
