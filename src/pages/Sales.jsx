import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import DateRangePicker from "@/components/DateRangePicker/DateRangePicker";
import Modal from "@/components/ui/Modal";
import styles from "./Sales.module.css";
import productImg from "../assets/images/munavaraA product.jpg";

function ChevronRight() {
  return (
    <svg
      width="5"
      height="8"
      viewBox="0 0 5 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0.5 0.5L4 4L0.5 7.5"
        stroke="#7A8086"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronLeftIcon() {
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

function ChevronRightIcon() {
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

function TrashIcon() {
  return (
    <svg
      width="11"
      height="12"
      viewBox="0 0 11 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
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

function ProductThumb() {
  return (
    <div className={styles.thumb} aria-hidden="true">
      <img src={productImg} alt="Product" />
    </div>
  );
}

export default function Sales() {
  const [range, setRange] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(4);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const soldDates = useMemo(
    () => [
      "24 Dec 2024",
      "10 Dec 2024",
      "27 Nov 2024",
      "18 Nov 2024",
      "06 Nov 2024",
      "25 Oct 2024",
      "14 Oct 2024",
      "03 Oct 2024",
      "20 Sep 2024",
      "10 Sep 2024",
    ],
    [],
  );

  const initialRows = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        productId: 123182,
        productName: "Suv 25 litr",
        client: "Andy Smith",
        phone: "+998 (00) 000-00-00",
        courier: "Andy Smith",
        address: "Chilonzor, 12-mavze",
        soldAt: soldDates[i % soldDates.length],
        size: "25-L",
        qty: ["3-Dona", "4-Dona", "5-Dona", "3-Dona"][i % 4],
      })),
    [soldDates],
  );

  const [rows, setRows] = useState(initialRows);

  const totalPages = 15;
  const pages = [1, 2, 3, 4, "ellipsis", totalPages];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Sotuv ro'yxati</h1>
          <div className={styles.breadcrumbs}>
            <span className={styles.crumb}>Boshqaruv paneli</span>
            <span className={styles.sep}>
              <ChevronRight />
            </span>
            <span className={styles.crumbActive}>Sotuv ro'yxati</span>
          </div>
        </div>

        <div className={styles.dateWrap}>
          <DateRangePicker onChange={setRange} align="right" />
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thId}>Mahsulot ID</th>
                <th className={styles.thName}>Mahsulot nomi</th>
                <th className={styles.thClient}>Mijoz</th>
                <th className={styles.thPhone}>Telefon raqam</th>
                <th className={styles.thCourier}>Kuryer</th>
                <th className={styles.thAddr}>Manzil</th>
                <th className={styles.thSold}>Sotildi</th>
                <th className={styles.thSize}>Hajmi litrda</th>
                <th className={styles.thQty}>Miqdor</th>
                <th className={styles.thActions} aria-hidden="true" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={`${r.productId}-${idx}`} className={styles.tr}>
                  <td className={styles.tdId}>{r.productId}</td>
                  <td className={styles.tdName}>
                    <div className={styles.nameCell}>
                      <ProductThumb />
                      <span className={styles.nameText}>{r.productName}</span>
                    </div>
                  </td>
                  <td className={styles.tdMuted}>{r.client}</td>
                  <td className={styles.tdMuted}>{r.phone}</td>
                  <td className={styles.tdMuted}>{r.courier}</td>
                  <td className={styles.tdMuted}>{r.address}</td>
                  <td className={styles.tdMuted}>{r.soldAt}</td>
                  <td className={styles.tdMuted}>{r.size}</td>
                  <td className={styles.tdMuted}>{r.qty}</td>
                  <td className={styles.tdActions}>
                    <div className={styles.actions}>
                      <button
                        type="button"
                        className={styles.iconBtn}
                        data-tooltip="Buyurtmani o'chirish"
                        aria-label="Delete"
                        onClick={() => {
                          setDeleteIndex(idx);
                          setDeleteId(r.productId);
                          setDeleteOpen(true);
                        }}
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
              onChange={(e) => setPerPage(Number(e.target.value))}
              aria-label="Rows per page"
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
              disabled={page <= 1}
              aria-label="Previous page"
            >
              <ChevronLeftIcon />
            </button>

            {pages.map((p, i) =>
              p === "ellipsis" ? (
                <span key={`e-${i}`} className={styles.ellipsis}>
                  …
                </span>
              ) : (
                <button
                  key={p}
                  type="button"
                  className={
                    p === page
                      ? `${styles.pageBtn} ${styles.pageBtnActive}`
                      : styles.pageBtn
                  }
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ),
            )}

            <button
              type="button"
              className={styles.navBtn}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              aria-label="Next page"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={deleteOpen}
        title="Buyurtmani o'chirish"
        showClose={false}
        onClose={() => {
          setDeleteOpen(false);
          setDeleteIndex(null);
          setDeleteId(null);
        }}
        className={styles.confirmModal}
      >
        <div className={styles.confirmText}>
          Siz {deleteId} ushu zakazni o'chirmoqchisiz
        </div>

        <div className={styles.confirmFooter}>
          <Button
            type="button"
            variant="secondary"
            size="small"
            onClick={() => {
              setDeleteOpen(false);
              setDeleteIndex(null);
              setDeleteId(null);
            }}
          >
            Bekor qilish
          </Button>

          <Button
            type="button"
            size="small"
            onClick={() => {
              if (deleteIndex !== null) {
                setRows((prev) => prev.filter((_, i) => i !== deleteIndex));
              }
              setDeleteOpen(false);
              setDeleteIndex(null);
              setDeleteId(null);
            }}
          >
            O'chirish
          </Button>
        </div>
      </Modal>
    </div>
  );
}
