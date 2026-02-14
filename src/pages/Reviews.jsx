import { useEffect, useMemo, useState } from "react";

import styles from "./Reviews.module.css";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

function ChevronLeft() {
  return (
    <svg
      width="5"
      height="9"
      viewBox="0 0 5 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4.5 0.5L0.5 4.5L4.5 8.5"
        stroke="#646B72"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      width="5"
      height="9"
      viewBox="0 0 5 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0.5 0.5L4.5 4.5L0.5 8.5"
        stroke="#646B72"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.66699 0.5C6.74291 0.500085 6.87682 0.530134 7.13867 0.87207C7.40115 1.21483 7.69758 1.7436 8.12793 2.51562L8.34668 2.90723C8.56487 3.29858 8.73711 3.63029 9.02734 3.85059C9.32058 4.0732 9.68258 4.14358 10.1055 4.23926L10.5303 4.33594C11.3669 4.52523 11.9363 4.65495 12.3262 4.80859C12.7067 4.95856 12.7868 5.08221 12.8174 5.18066C12.8496 5.28456 12.8504 5.44361 12.623 5.80469C12.3922 6.17139 12.0031 6.62904 11.4336 7.29492L11.1445 7.63281C10.8902 7.93025 10.67 8.17683 10.5459 8.46875L10.499 8.59668C10.4178 8.85811 10.4222 9.13019 10.4482 9.44141L10.4785 9.7666L10.5225 10.2178C10.6085 11.1059 10.6671 11.7177 10.6475 12.1582C10.6279 12.5977 10.5347 12.7194 10.4609 12.7754C10.3952 12.8252 10.2732 12.8799 9.87793 12.7666C9.47615 12.6514 8.9422 12.4074 8.15918 12.0469L7.76172 11.8633C7.36754 11.6818 7.03342 11.5167 6.66699 11.5166C6.30058 11.5166 5.96636 11.6818 5.57227 11.8633L5.1748 12.0469C4.39129 12.4076 3.85698 12.6514 3.45508 12.7666C3.05958 12.8799 2.93774 12.8252 2.87207 12.7754C2.79828 12.7193 2.70612 12.5974 2.68652 12.1582C2.6669 11.7177 2.72448 11.1059 2.81055 10.2178L2.85449 9.7666C2.89848 9.31269 2.94333 8.94526 2.83496 8.59668C2.7259 8.24592 2.48013 7.97271 2.18945 7.63281L1.90039 7.29492C1.33077 6.62885 0.940868 6.17145 0.709961 5.80469C0.482724 5.44371 0.483427 5.28456 0.515625 5.18066C0.546238 5.08222 0.626456 4.95853 1.00684 4.80859C1.39679 4.65492 1.96683 4.52529 2.80371 4.33594L3.22754 4.23926C3.65042 4.14358 4.01239 4.07313 4.30566 3.85059C4.59584 3.6303 4.76907 3.29873 4.9873 2.90723L5.20508 2.51562C5.63538 1.7437 5.93188 1.21484 6.19434 0.87207C6.45657 0.529635 6.59114 0.5 6.66699 0.5Z"
        stroke="#FFC400"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3 6H21"
        stroke="#111827"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6"
        stroke="#111827"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 6L18 20C18 20.5304 17.7893 21.0391 17.4142 21.4142C17.0391 21.7893 16.5304 22 16 22H8C7.46957 22 6.96086 21.7893 6.58579 21.4142C6.21071 21.0391 6 20.5304 6 20L5 6"
        stroke="#111827"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 11V17"
        stroke="#111827"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 11V17"
        stroke="#111827"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Reviews() {
  const initialRows = useMemo(() => {
    const recipients = ["Andy Smith", "Aziz", "Dilnoza", "Sardor", "Bekzod"];
    const authors = ["Andy Smith", "John Doe", "Ali Karimov"];

    const comment =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type";

    return Array.from({ length: 150 }).map((_, i) => {
      const reviewId = 123182;
      const recipient = recipients[i % recipients.length];
      const author = authors[i % authors.length];
      const rating = i % 5 === 0 ? 4 : 5;
      return {
        key: `${reviewId}-${i}`,
        reviewId,
        recipient,
        author,
        comment,
        rating,
      };
    });
  }, []);

  const [rows, setRows] = useState(initialRows);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(4);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [activeKey, setActiveKey] = useState(null);

  const activeRow = useMemo(
    () => rows.find((r) => r.key === activeKey) ?? null,
    [rows, activeKey],
  );

  const totalPages = Math.max(1, Math.ceil(rows.length / perPage));

  useEffect(() => {
    setPage((prev) => Math.min(Math.max(1, prev), totalPages));
  }, [totalPages]);

  const startIndex = (page - 1) * perPage;
  const visibleRows = rows.slice(startIndex, startIndex + perPage);

  const pages = useMemo(() => {
    if (totalPages <= 6)
      return Array.from({ length: totalPages }, (_, i) => i + 1);

    if (page <= 4) return [1, 2, 3, 4, "ellipsis", totalPages];
    if (page >= totalPages - 3)
      return [
        1,
        "ellipsis",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];

    return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages];
  }, [totalPages, page]);

  const openDelete = (rowKey) => {
    setActiveKey(rowKey);
    setDeleteOpen(true);
  };

  const closeDelete = () => {
    setDeleteOpen(false);
    setActiveKey(null);
  };

  const confirmDelete = () => {
    if (!activeKey) return;
    setRows((prev) => prev.filter((r) => r.key !== activeKey));
    closeDelete();
  };

  const columns = [
    { key: "reviewId", title: "Sharh ID" },
    { key: "recipient", title: "Kimga" },
    { key: "author", title: "Avtor" },
    {
      key: "comment",
      title: "Sharh",
      render: (row) => <div className={styles.comment}>{row.comment}</div>,
    },
    {
      key: "rating",
      title: "Yulduzlar soni",
      render: (row) => (
        <div className={styles.rating}>
          <StarIcon />
          <span className={styles.ratingValue}>{row.rating}</span>
        </div>
      ),
    },
    {
      key: "actions",
      title: "",
      render: (row) => (
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.iconBtn}
            data-tooltip="O'chirish"
            aria-label="O'chirish"
            onClick={() => openDelete(row.key)}
          >
            <TrashIcon />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Sharhlar</h1>
        <div className={styles.breadcrumbs}>
          <span className={styles.crumb}>Boshqaruv paneli</span>
          <span className={styles.sep} aria-hidden="true">
            <svg
              width="5"
              height="8"
              viewBox="0 0 5 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.5 0.5L4 4L0.5 7.5"
                stroke="#7A8086"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className={styles.crumbActive}>Sharhlar</span>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thId}>Sharh ID</th>
                <th className={styles.thTo}>Kimga</th>
                <th className={styles.thAuthor}>Avtor</th>
                <th className={styles.thComment}>Sharh</th>
                <th className={styles.thRating}>Yulduzlar soni</th>
                <th className={styles.thActions} />
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row) => (
                <tr key={row.key} className={styles.tr}>
                  <td className={styles.tdId}>{row.reviewId}</td>
                  <td className={styles.tdTo}>{row.recipient}</td>
                  <td className={styles.tdAuthor}>{row.author}</td>
                  <td className={styles.tdComment}>
                    <div className={styles.comment}>{row.comment}</div>
                  </td>
                  <td className={styles.tdRating}>
                    <div className={styles.rating}>
                      <StarIcon />
                      <span className={styles.ratingValue}>{row.rating}</span>
                    </div>
                  </td>
                  <td className={styles.tdActions}>
                    <div className={styles.actions}>
                      <button
                        type="button"
                        className={styles.iconBtn}
                        data-tooltip="O'chirish"
                        aria-label="O'chirish"
                        onClick={() => openDelete(row.key)}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.footer}>
          <div className={styles.perPage}>
            <span className={styles.footerText}>Har bir sahifadagi qator</span>
            <select
              className={styles.select}
              value={perPage}
              onChange={(e) => {
                const next = Number(e.target.value);
                if (!Number.isFinite(next)) return;
                setPerPage(next);
                setPage(1);
              }}
              aria-label="Har bir sahifadagi qator"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className={styles.footerText}>Yozuvlar</span>
          </div>

          <div className={styles.pagination}>
            <button
              type="button"
              className={styles.navBtn}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              aria-label="Oldingi sahifa"
            >
              <ChevronLeft />
            </button>

            {pages.map((p, idx) => {
              if (p === "ellipsis") {
                return (
                  <div key={`e-${idx}`} className={styles.ellipsis} aria-hidden>
                    …
                  </div>
                );
              }

              const isActive = p === page;
              const cls = isActive
                ? `${styles.pageBtn} ${styles.pageBtnActive}`
                : styles.pageBtn;

              return (
                <button
                  key={p}
                  type="button"
                  className={cls}
                  onClick={() => setPage(p)}
                  aria-current={isActive ? "page" : undefined}
                >
                  {p}
                </button>
              );
            })}

            <button
              type="button"
              className={styles.navBtn}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              aria-label="Keyingi sahifa"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      <Modal open={deleteOpen} title="Sharhni o'chirish" onClose={closeDelete}>
        <div className={styles.modalBody}>
          <div className={styles.modalText}>
            Ushbu sharhni o'chirishni xohlaysizmi?
          </div>

          {activeRow ? (
            <div className={styles.modalMeta}>
              <div>
                <span className={styles.metaLabel}>Sharh ID:</span>{" "}
                <span className={styles.metaValue}>{activeRow.reviewId}</span>
              </div>
              <div>
                <span className={styles.metaLabel}>Avtor:</span>{" "}
                <span className={styles.metaValue}>{activeRow.author}</span>
              </div>
            </div>
          ) : null}

          <div className={styles.modalFooter}>
            <Button
              variant="secondary"
              size="small"
              className={`${styles.modalBtn} ${styles.modalCancel}`}
              onClick={closeDelete}
              type="button"
            >
              Bekor qilish
            </Button>
            <Button
              size="small"
              className={`${styles.modalBtn} ${styles.modalConfirm}`}
              onClick={confirmDelete}
              type="button"
            >
              O'chirish
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
