import { useState } from "react";
import DateRangePicker from "@/components/DateRangePicker/DateRangePicker";
import SalesAnalytics from "@/components/SalesAnalytics/SalesAnalytics";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const [range, setRange] = useState(null);

  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <div className={styles.titleWrap}>
          <div className={styles.h1}>Welcome, Admin</div>
        </div>

        <DateRangePicker onChange={setRange} />
      </div>

      <section className={styles.kpis}>
        <div className={`${styles.kpi} ${styles.kpiDark}`}>
          <div className={styles.kpiIcon} aria-hidden="true">
            <svg
              width="18"
              height="22"
              viewBox="0 0 18 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H15C15.5304 21 16.0391 20.7893 16.4142 20.4142C16.7893 20.0391 17 19.5304 17 19V7M11 1L17 7M11 1V7H17M13 12H5M13 16H5M7 8H5"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={styles.kpiText}>
            <div className={styles.kpiLabel}>Bugungi buyurtmalar</div>
            <div className={styles.kpiValue}>124</div>
          </div>
        </div>

        <div className={`${styles.kpi} ${styles.kpiNavy}`}>
          <div className={styles.kpiIcon} aria-hidden="true">
            <svg
              width="20"
              height="24"
              viewBox="0 0 20 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 1L19 5M19 5L15 9M19 5H5C3.93913 5 2.92172 5.42143 2.17157 6.17157C1.42143 6.92172 1 7.93913 1 9V11M5 23L1 19M1 19L5 15M1 19H15C16.0609 19 17.0783 18.5786 17.8284 17.8284C18.5786 17.0783 19 16.0609 19 15V13"
                stroke="#092C4C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={styles.kpiText}>
            <div className={styles.kpiLabel}>Faol buyurtmalar</div>
            <div className={styles.kpiValue}>18</div>
          </div>
        </div>

        <div className={`${styles.kpi} ${styles.kpiTeal}`}>
          <div className={styles.kpiIcon} aria-hidden="true">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 11V21H3V11M11 21V6M11 6H6.5C5.83696 6 5.20107 5.73661 4.73223 5.26777C4.26339 4.79893 4 4.16304 4 3.5C4 2.83696 4.26339 2.20107 4.73223 1.73223C5.20107 1.26339 5.83696 1 6.5 1C10 1 11 6 11 6ZM11 6H15.5C16.163 6 16.7989 5.73661 17.2678 5.26777C17.7366 4.79893 18 4.16304 18 3.5C18 2.83696 17.7366 2.20107 17.2678 1.73223C16.7989 1.26339 16.163 1 15.5 1C12 1 11 6 11 6ZM1 6H21V11H1V6Z"
                stroke="#0E9384"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={styles.kpiText}>
            <div className={styles.kpiLabel}>Faol kuryerlar</div>
            <div className={styles.kpiValue}>9</div>
          </div>
        </div>

        <div className={`${styles.kpi} ${styles.kpiBlue}`}>
          <div className={styles.kpiIcon} aria-hidden="true">
            <svg
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 8L11 12L15 8M3 1H19C19.5304 1 20.0391 1.21071 20.4142 1.58579C20.7893 1.96086 21 2.46957 21 3V9C21 11.6522 19.9464 14.1957 18.0711 16.0711C16.1957 17.9464 13.6522 19 11 19C9.68678 19 8.38642 18.7413 7.17317 18.2388C5.95991 17.7362 4.85752 16.9997 3.92893 16.0711C2.05357 14.1957 1 11.6522 1 9V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1Z"
                stroke="#155EEF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={styles.kpiText}>
            <div className={styles.kpiLabel}>Bugungi daromad</div>
            <div className={styles.kpiValue}>12 450 000 so'm</div>
          </div>
        </div>
      </section>

      <section className={styles.miniRow}>
        <div className={styles.miniCard}>
          <div className={styles.miniTop}>
            <div>
              <div className={styles.miniValue}>106</div>
              <div className={styles.miniLabel}>Yakunlangan buyurtmalar</div>
            </div>
            <div
              className={`${styles.miniBadge} ${styles.badgeBlue}`}
              aria-hidden="true"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.00024 11L7.66691 14.3333L14.3336 11M1.00024 7.66667L7.66691 11L14.3336 7.66667M7.66691 1L1.00024 4.33333L7.66691 7.66667L14.3336 4.33333L7.66691 1Z"
                  stroke="#06AED4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className={styles.miniDivider} aria-hidden="true" />
          <div className={styles.miniSub}>Bugun yetkazildi</div>
        </div>

        <div className={styles.miniCard}>
          <div className={styles.miniTop}>
            <div>
              <div className={styles.miniValue}>5</div>
              <div className={styles.miniLabel}>Bekor qilingan buyurtmalar</div>
            </div>
            <div
              className={`${styles.miniBadge} ${styles.badgeMint}`}
              aria-hidden="true"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.0324 11.5201C12.3862 12.3965 11.535 13.1014 10.5534 13.5729C9.57184 14.0444 8.48969 14.2683 7.40158 14.225C6.31346 14.1817 5.25253 13.8725 4.31152 13.3245C3.37051 12.7764 2.57808 12.0062 2.00351 11.0811C1.42895 10.1561 1.08973 9.10434 1.01553 8.0179C0.941328 6.93146 1.1344 5.84338 1.57785 4.84879C2.02131 3.8542 2.70166 2.98339 3.55941 2.31248C4.41717 1.64157 5.42621 1.19099 6.49833 1.00014M14.1492 9.12099C14.3533 8.26964 14.3877 7.38642 14.2505 6.52176C14.1133 5.6571 13.8071 4.82794 13.3494 4.08162C12.8918 3.33529 12.2916 2.68642 11.5831 2.17205C10.8747 1.65767 10.0719 1.28787 9.22053 1.08376L7.66626 7.56672L14.1492 9.12099Z"
                  stroke="#0E9384"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className={styles.miniDivider} aria-hidden="true" />
          <div className={styles.miniSub}>Bugun</div>
        </div>

        <div className={styles.miniCard}>
          <div className={styles.miniTop}>
            <div>
              <div className={styles.miniValue}>28 daqiqa</div>
              <div className={styles.miniLabel}>O'rtacha yetkazish vaqti</div>
            </div>
            <div
              className={`${styles.miniBadge} ${styles.badgeGray}`}
              aria-hidden="true"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.95333 2.95333L5.77999 5.77999M9.55334 9.55334L12.38 12.38M12.38 2.95333L9.55334 5.77999L11.9067 3.42668M2.95333 12.38L5.77999 9.55334M14.3333 7.66667C14.3333 11.3486 11.3486 14.3333 7.66667 14.3333C3.98477 14.3333 1 11.3486 1 7.66667C1 3.98477 3.98477 1 7.66667 1C11.3486 1 14.3333 3.98477 14.3333 7.66667ZM10.3333 7.66667C10.3333 9.13943 9.13943 10.3333 7.66667 10.3333C6.19391 10.3333 5 9.13943 5 7.66667C5 6.19391 6.19391 5 7.66667 5C9.13943 5 10.3333 6.19391 10.3333 7.66667Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className={styles.miniDivider} aria-hidden="true" />
          <div className={styles.miniSub}>Bugungi o'rtacha</div>
        </div>

        <div className={styles.miniCard}>
          <div className={styles.miniTop}>
            <div>
              <div className={styles.miniValue}>5</div>
              <div className={styles.miniLabel}>Kutilayotgan buyurtmalar</div>
            </div>
            <div
              className={`${styles.miniBadge} ${styles.badgeViolet}`}
              aria-hidden="true"
            >
              <svg
                width="13"
                height="14"
                viewBox="0 0 13 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5.00012H11.6667M1 9.00012H11.6667M5 1.00012L3.66667 13.0001M9 1.00012L7.66667 13.0001"
                  stroke="#6938EF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className={styles.miniDivider} aria-hidden="true" />
          <div className={styles.miniSub}>Hozir</div>
        </div>
      </section>

      <section className={styles.bottomGrid}>
        <SalesAnalytics />
      </section>
    </div>
  );
}
