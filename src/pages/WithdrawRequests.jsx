import { useEffect, useMemo, useState } from "react";

import styles from "./WithdrawRequests.module.css";
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

function CheckIcon() {
  return (
    <svg
      width="11"
      height="8"
      viewBox="0 0 11 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.83333 0.5L3.41667 6.91667L0.5 4"
        stroke="#212B36"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 3.5L3.5 10.5"
        stroke="black"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 3.5L10.5 10.5"
        stroke="black"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="11"
      height="12"
      viewBox="0 0 11 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.5 2.83333H9.83333M4 5.16667V8.66667M6.33333 5.16667V8.66667M1.08333 2.83333L1.66667 9.83333C1.66667 10.1428 1.78958 10.4395 2.00838 10.6583C2.22717 10.8771 2.52391 11 2.83333 11H7.5C7.80942 11 8.10616 10.8771 8.32496 10.6583C8.54375 10.4395 8.66667 10.1428 8.66667 9.83333L9.25 2.83333M3.41667 2.83333V1.08333C3.41667 0.928624 3.47812 0.780251 3.58752 0.670854C3.69692 0.561458 3.84529 0.5 4 0.5H6.33333C6.48804 0.5 6.63642 0.561458 6.74581 0.670854C6.85521 0.780251 6.91667 0.928624 6.91667 1.08333V2.83333"
        stroke="#212B36"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatMoneyUZS(amount) {
  const num = Number(amount);
  if (!Number.isFinite(num)) return String(amount ?? "");
  return `${num.toLocaleString("ru-RU")} so'm`;
}

function TooltipButton({ tooltip, className, children, ...props }) {
  const mergedClassName = className
    ? `${styles.iconBtn} ${className}`
    : styles.iconBtn;

  return (
    <button
      className={mergedClassName}
      type="button"
      data-tooltip={tooltip}
      {...props}
    >
      {children}
    </button>
  );
}

export default function WithdrawRequests() {
  const initialRows = useMemo(() => {
    const courierNames = [
      "Andy Smith",
      "John Doe",
      "Ali Karimov",
      "Bekzod Aliyev",
      "Sardor Xolmatov",
    ];
    const payTypes = ["Naqd", "Karta"];

    return Array.from({ length: 150 }).map((_, i) => {
      const id = 123;
      const courierName = courierNames[i % courierNames.length];
      const createdAt = "24 Dec 2024";
      const amount = 1_000_000;
      const payType = payTypes[i % payTypes.length];
      const details =
        payType === "Naqd" ? "Naqd pul bilan" : "1234 1234 1234 1234";

      return {
        key: `${id}-${i}`,
        withdrawId: id,
        courierName,
        createdAt,
        amount,
        payType,
        details,
        status: "pending",
      };
    });
  }, []);

  const [rows, setRows] = useState(initialRows);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(4);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmType, setConfirmType] = useState(null); // approve | reject | delete
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

  const openConfirm = (type, rowKey) => {
    setConfirmType(type);
    setActiveKey(rowKey);
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    setConfirmOpen(false);
    setConfirmType(null);
    setActiveKey(null);
  };

  const applyAction = () => {
    if (!activeKey || !confirmType) return;

    if (confirmType === "delete") {
      setRows((prev) => prev.filter((r) => r.key !== activeKey));
      closeConfirm();
      return;
    }

    setRows((prev) =>
      prev.map((r) => {
        if (r.key !== activeKey) return r;
        if (confirmType === "approve") return { ...r, status: "approved" };
        if (confirmType === "reject") return { ...r, status: "rejected" };
        return r;
      }),
    );

    closeConfirm();
  };

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

  const modalTitle =
    confirmType === "approve"
      ? "Chiqirishni tasdiqlash"
      : confirmType === "reject"
        ? "Chiqirishni rad etish"
        : confirmType === "delete"
          ? "Chiqirishni o'chirish"
          : "";

  const confirmLabel =
    confirmType === "approve"
      ? "Tasdiqlash"
      : confirmType === "reject"
        ? "Rad etish"
        : "O'chirish";

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Chiqirish uchun arizalar</h1>
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
          <span className={styles.crumbActive}>Chiqirish uchun arizalar</span>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thId}>Chiqirish ID</th>
                <th className={styles.thCourier}>Kuryer nomi</th>
                <th className={styles.thDate}>Yaratilgan sanasi</th>
                <th className={styles.thAmount}>Yechib olish summasi</th>
                <th className={styles.thType}>Xulosa turi</th>
                <th className={styles.thDetails}>Tafsilotlar</th>
                <th className={styles.thActions} aria-hidden="true" />
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row) => {
                const isPending = row.status === "pending";

                return (
                  <tr key={row.key} className={styles.tr}>
                    <td className={styles.tdId}>{row.withdrawId}</td>
                    <td className={styles.tdCourier}>{row.courierName}</td>
                    <td className={styles.tdMuted}>{row.createdAt}</td>
                    <td className={styles.tdMuted}>
                      {formatMoneyUZS(row.amount)}
                    </td>
                    <td className={styles.tdMuted}>{row.payType}</td>
                    <td className={styles.tdMuted}>{row.details}</td>
                    <td className={styles.tdActions}>
                      <div className={styles.actions}>
                        <TooltipButton
                          tooltip="Tasdiqlash"
                          aria-label="Tasdiqlash"
                          disabled={!isPending}
                          onClick={() => openConfirm("approve", row.key)}
                        >
                          <CheckIcon />
                        </TooltipButton>

                        <TooltipButton
                          tooltip="Rad etish"
                          aria-label="Rad etish"
                          disabled={!isPending}
                          onClick={() => openConfirm("reject", row.key)}
                        >
                          <XIcon />
                        </TooltipButton>

                        <TooltipButton
                          tooltip="O'chirish"
                          aria-label="O'chirish"
                          onClick={() => openConfirm("delete", row.key)}
                        >
                          <TrashIcon />
                        </TooltipButton>
                      </div>
                    </td>
                  </tr>
                );
              })}
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

      <Modal open={confirmOpen} title={modalTitle} onClose={closeConfirm}>
        <div className={styles.modalBody}>
          <div className={styles.modalText}>
            {confirmType === "delete"
              ? "Ushbu arizani o'chirishni xohlaysizmi?"
              : "Ushbu arizaga amal qo'llashni xohlaysizmi?"}
          </div>

          {activeRow ? (
            <div className={styles.modalMeta}>
              <div>
                <span className={styles.metaLabel}>Chiqirish ID:</span>{" "}
                <span className={styles.metaValue}>{activeRow.withdrawId}</span>
              </div>
              <div>
                <span className={styles.metaLabel}>Kuryer:</span>{" "}
                <span className={styles.metaValue}>
                  {activeRow.courierName}
                </span>
              </div>
              <div>
                <span className={styles.metaLabel}>Summa:</span>{" "}
                <span className={styles.metaValue}>
                  {formatMoneyUZS(activeRow.amount)}
                </span>
              </div>
            </div>
          ) : null}

          <div className={styles.modalFooter}>
            <Button
              variant="secondary"
              size="small"
              className={`${styles.modalBtn} ${styles.modalCancel}`}
              onClick={closeConfirm}
              type="button"
            >
              Bekor qilish
            </Button>
            <Button
              size="small"
              className={`${styles.modalBtn} ${styles.modalConfirm}`}
              onClick={applyAction}
              type="button"
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
