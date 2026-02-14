import styles from "./sales-analytics.module.css";

function formatNumber(value) {
  const n = Number(value ?? 0);
  if (!Number.isFinite(n)) return "0";
  return n.toLocaleString("ru-RU").replace(/,/g, " ");
}

function formatCurrency(value) {
  return `${formatNumber(value)} so'm`;
}

const CARDS = [
  {
    key: "expense",
    title: "Jami-Rasxod",
    icon: (
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="3.70239" cy="3.70239" r="3.70239" fill="#E8E8E8" />
      </svg>
    ),
    format: formatCurrency,
  },
  {
    key: "revenue",
    title: "Jami-Sotuv",
    icon: (
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="3.70239" cy="3.70239" r="3.70239" fill="black" />
      </svg>
    ),
    format: formatCurrency,
  },
  {
    key: "couriers",
    title: "Kurerlar",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_43_5712)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.46447 15.4645C2.40215 14.5268 3.67392 14 5 14H12C13.3261 14 14.5979 14.5268 15.5355 15.4645C16.4732 16.4021 17 17.6739 17 19V21C17 21.5523 16.5523 22 16 22C15.4477 22 15 21.5523 15 21V19C15 18.2044 14.6839 17.4413 14.1213 16.8787C13.5587 16.3161 12.7956 16 12 16H5C4.20435 16 3.44129 16.3161 2.87868 16.8787C2.31607 17.4413 2 18.2044 2 19V21C2 21.5523 1.55228 22 1 22C0.447715 22 0 21.5523 0 21V19C0 17.6739 0.526784 16.4021 1.46447 15.4645Z"
            fill="#155EEF"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.5 4C6.84315 4 5.5 5.34315 5.5 7C5.5 8.65685 6.84315 10 8.5 10C10.1569 10 11.5 8.65685 11.5 7C11.5 5.34315 10.1569 4 8.5 4ZM3.5 7C3.5 4.23858 5.73858 2 8.5 2C11.2614 2 13.5 4.23858 13.5 7C13.5 9.76142 11.2614 12 8.5 12C5.73858 12 3.5 9.76142 3.5 7Z"
            fill="#155EEF"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.7071 8.29289C24.0976 8.68342 24.0976 9.31658 23.7071 9.70711L19.7071 13.7071C19.3166 14.0976 18.6834 14.0976 18.2929 13.7071L16.2929 11.7071C15.9024 11.3166 15.9024 10.6834 16.2929 10.2929C16.6834 9.90237 17.3166 9.90237 17.7071 10.2929L19 11.5858L22.2929 8.29289C22.6834 7.90237 23.3166 7.90237 23.7071 8.29289Z"
            fill="#155EEF"
          />
        </g>
        <defs>
          <clipPath id="clip0_43_5712">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    format: formatNumber,
  },
  {
    key: "customers",
    title: "Mijoz",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_43_5717)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.46447 15.4645C2.40215 14.5268 3.67392 14 5 14H13C14.3261 14 15.5979 14.5268 16.5355 15.4645C17.4732 16.4021 18 17.6739 18 19V21C18 21.5523 17.5523 22 17 22C16.4477 22 16 21.5523 16 21V19C16 18.2044 15.6839 17.4413 15.1213 16.8787C14.5587 16.3161 13.7956 16 13 16H5C4.20435 16 3.44129 16.3161 2.87868 16.8787C2.31607 17.4413 2 18.2044 2 19V21C2 21.5523 1.55228 22 1 22C0.447715 22 0 21.5523 0 21V19C0 17.6739 0.526784 16.4021 1.46447 15.4645Z"
            fill="black"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 4C7.34315 4 6 5.34315 6 7C6 8.65685 7.34315 10 9 10C10.6569 10 12 8.65685 12 7C12 5.34315 10.6569 4 9 4ZM4 7C4 4.23858 6.23858 2 9 2C11.7614 2 14 4.23858 14 7C14 9.76142 11.7614 12 9 12C6.23858 12 4 9.76142 4 7Z"
            fill="black"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.0318 14.8799C19.1698 14.3451 19.7153 14.0236 20.25 14.1616C21.3227 14.4386 22.273 15.064 22.9517 15.9395C23.6304 16.8151 23.9992 17.8913 24 18.9991L24 20.9999C24 21.5522 23.5523 21.9999 23 21.9999C22.4477 21.9999 22 21.5522 22 20.9999L22 19.0006C22 19.0005 22 19.0007 22 19.0006C21.9994 18.336 21.7782 17.6901 21.371 17.1649C20.9638 16.6395 20.3936 16.2643 19.75 16.0981C19.2153 15.9601 18.8937 15.4146 19.0318 14.8799Z"
            fill="black"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.0312 2.88184C15.1682 2.34681 15.713 2.02414 16.248 2.16113C17.3236 2.43651 18.2768 3.06201 18.9576 3.93902C19.6383 4.81603 20.0078 5.89467 20.0078 7.00488C20.0078 8.11509 19.6383 9.19373 18.9576 10.0707C18.2768 10.9478 17.3236 11.5733 16.248 11.8486C15.713 11.9856 15.1682 11.6629 15.0312 11.1279C14.8943 10.5929 15.2169 10.0481 15.752 9.91113C16.3973 9.7459 16.9692 9.3706 17.3777 8.8444C17.7861 8.31819 18.0078 7.67101 18.0078 7.00488C18.0078 6.33875 17.7861 5.69157 17.3777 5.16536C16.9692 4.63915 16.3973 4.26385 15.752 4.09863C15.2169 3.96164 14.8943 3.41687 15.0312 2.88184Z"
            fill="black"
          />
        </g>
        <defs>
          <clipPath id="clip0_43_5717">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    format: formatNumber,
  },
  {
    key: "orders",
    title: "Buyurtma",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_43_5722)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 21C7 19.8954 7.89543 19 9 19C10.1046 19 11 19.8954 11 21C11 22.1046 10.1046 23 9 23C7.89543 23 7 22.1046 7 21Z"
            fill="#0E9384"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18 21C18 19.8954 18.8954 19 20 19C21.1046 19 22 19.8954 22 21C22 22.1046 21.1046 23 20 23C18.8954 23 18 22.1046 18 21Z"
            fill="#0E9384"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 1C0 0.447715 0.447715 0 1 0H5C5.47663 0 5.88701 0.336385 5.98055 0.803743L6.82043 5H23C23.298 5 23.5805 5.13293 23.7705 5.36256C23.9605 5.59218 24.0381 5.89458 23.9823 6.18733L22.3809 14.5848C22.2437 15.2754 21.868 15.8958 21.3195 16.3373C20.7738 16.7766 20.0916 17.011 19.3914 17H9.68864C8.98837 17.011 8.3062 16.7766 7.76048 16.3373C7.21225 15.8959 6.83664 15.2759 6.69933 14.5857C6.69927 14.5854 6.69939 14.5859 6.69933 14.5857L5.02879 6.2392C5.02201 6.21159 5.01638 6.18353 5.01195 6.15508L4.18032 2H1C0.447715 2 0 1.55228 0 1ZM7.22073 7L8.66084 14.1952C8.70656 14.4254 8.83179 14.6322 9.01461 14.7793C9.19743 14.9265 9.42619 15.0047 9.66084 15.0002L9.68 15H19.4L19.4192 15.0002C19.6538 15.0047 19.8826 14.9265 20.0654 14.7793C20.2474 14.6328 20.3723 14.4273 20.4185 14.1984L21.7913 7H7.22073Z"
            fill="#0E9384"
          />
        </g>
        <defs>
          <clipPath id="clip0_43_5722">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    format: formatNumber,
  },
  {
    key: "reviews",
    title: "Mijoz sharhlari",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_43_5727)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20Z"
            fill="#0E9384"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6ZM12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8C12.5523 8 13 8.44772 13 9C13 9.55228 12.5523 10 12 10Z"
            fill="#0E9384"
          />
        </g>
        <defs>
          <clipPath id="clip0_43_5727">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    format: formatNumber,
  },
];

export default function SummaryCards({ data, loading }) {
  return (
    <div className={styles.summaryRow} aria-busy={loading ? "true" : "false"}>
      {CARDS.map((c) => {
        const rawValue = data?.[c.key];
        const value = c.format(rawValue);

        return (
          <div key={c.key} className={styles.summaryCard}>
            <div className={styles.summaryIcon} aria-hidden="true">
              {c.icon}
            </div>

            <div className={styles.summaryText}>
              <div className={styles.summaryTitle}>{c.title}</div>

              {loading ? (
                <div className={styles.skeletonLine} />
              ) : (
                <div className={styles.summaryValue}>{value}</div>
              )}

              <div className={styles.summarySub}>Tanlangan davr uchun</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { formatNumber, formatCurrency };
