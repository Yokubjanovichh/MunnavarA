import { useMemo, useState } from "react";

import styles from "./Products.module.css";
import product from "../assets/images/munavaraA product.jpg";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";

function SortIcon() {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 0.75V8.25Z" fill="#212B36" />
      <path d="M3.25 2L2 0.75L0.75 2" fill="#212B36" />
      <path d="M7.41667 7L6.16667 8.25L4.91667 7" fill="#212B36" />
      <path d="M6.16667 8.25V0.75Z" fill="#212B36" />
      <path
        d="M2 0.75V8.25M2 0.75L3.25 2M2 0.75L0.75 2M7.41667 7L6.16667 8.25M6.16667 8.25L4.91667 7M6.16667 8.25V0.75"
        stroke="#212B36"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.25 2.8334H1.66667C1.35725 2.8334 1.0605 2.95631 0.841709 3.1751C0.622916 3.3939 0.5 3.69064 0.5 4.00006V9.25006C0.5 9.55948 0.622916 9.85623 0.841709 10.075C1.0605 10.2938 1.35725 10.4167 1.66667 10.4167H6.91667C7.22609 10.4167 7.52283 10.2938 7.74162 10.075C7.96042 9.85623 8.08333 9.55948 8.08333 9.25006V8.66673M7.5 1.66673L9.25 3.41673M10.0579 2.59131C10.2877 2.36157 10.4167 2.04997 10.4167 1.72506C10.4167 1.40016 10.2877 1.08856 10.0579 0.858812C9.82817 0.629069 9.51657 0.5 9.19167 0.5C8.86676 0.5 8.55516 0.629069 8.32542 0.858812L3.41667 5.75006V7.50006H5.16667L10.0579 2.59131Z"
        stroke="#212B36"
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

function ChevronLeft() {
  return (
    <svg
      width="5"
      height="9"
      viewBox="0 0 5 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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

function ProductThumb({ src }) {
  return (
    <div className={styles.thumb} aria-hidden="true">
      <img src={src} alt="Product" />
    </div>
  );
}

export default function Products() {
  const initialRows = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: 123182,
        name: "Suv 25 litr",
        createdAt: [
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
        ][i],
        size: "25-L",
        qty: "100-Dona",
        imageUrl: product,
      })),
    [],
  );

  const [rows, setRows] = useState(initialRows);

  const [selected, setSelected] = useState(() => new Set());
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(4);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteKey, setDeleteKey] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [editOpen, setEditOpen] = useState(false);
  const [editKey, setEditKey] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editSize, setEditSize] = useState("");
  const [editQty, setEditQty] = useState("");
  const [editImageUrl, setEditImageUrl] = useState(product);

  const allSelected = selected.size === rows.length && rows.length > 0;

  const toggleAll = () => {
    setSelected((prev) => {
      if (prev.size === rows.length) return new Set();
      return new Set(rows.map((r) => r.id + "-" + r.createdAt));
    });
  };

  const toggleRow = (rowKey) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(rowKey)) next.delete(rowKey);
      else next.add(rowKey);
      return next;
    });
  };

  const totalPages = 15;
  const pages = [1, 2, 3, 4, "ellipsis", totalPages];

  const closeEdit = () => {
    setEditOpen(false);
    setEditKey(null);
    setEditId(null);
    setEditName("");
    setEditSize("");
    setEditQty("");
    setEditImageUrl(product);
  };

  const handlePickImage = (file) => {
    if (!file) return;
    if (!file.type?.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") setEditImageUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const handleEditSave = () => {
    const nextName = editName.trim();
    if (!nextName) return;
    if (!editKey) return;

    setRows((prev) =>
      prev.map((row) => {
        const rowKey = row.id + "-" + row.createdAt;
        if (rowKey !== editKey) return row;
        return {
          ...row,
          name: nextName,
          size: editSize,
          qty: editQty,
          imageUrl: editImageUrl,
        };
      }),
    );

    closeEdit();
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Mahsulotlar ro'yxati</h1>
        <div className={styles.breadcrumbs}>
          <span className={styles.crumb}>Boshqaruv paneli</span>
          <span className={styles.sep}>
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
          <span className={styles.crumbActive}>Mahsulotlar ro'yxati</span>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thCheck}>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    aria-label="Select all"
                  />
                </th>
                <th className={styles.thId}>
                  <span className={styles.thInner}>
                    Mahsulot ID <SortIcon />
                  </span>
                </th>
                <th className={styles.thName}>Mahsulot nomi</th>
                <th className={styles.thDate}>
                  <span className={styles.thInner}>
                    Yaratilgan sanasi <SortIcon />
                  </span>
                </th>
                <th className={styles.thSize}>Hajmi litrda</th>
                <th className={styles.thQty}>Miqdor</th>
                <th className={styles.thActions} aria-hidden="true" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const rowKey = r.id + "-" + r.createdAt;
                const isSelected = selected.has(rowKey);

                return (
                  <tr key={rowKey} className={styles.tr}>
                    <td className={styles.tdCheck}>
                      <input
                        className={styles.checkbox}
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRow(rowKey)}
                        aria-label="Select row"
                      />
                    </td>
                    <td className={styles.tdId}>{r.id}</td>
                    <td className={styles.tdName}>
                      <div className={styles.nameCell}>
                        <ProductThumb src={r.imageUrl || product} />
                        <span className={styles.nameText}>{r.name}</span>
                      </div>
                    </td>
                    <td className={styles.tdDate}>{r.createdAt}</td>
                    <td className={styles.tdSize}>{r.size}</td>
                    <td className={styles.tdQty}>{r.qty}</td>
                    <td className={styles.tdActions}>
                      <div className={styles.actions}>
                        <button
                          type="button"
                          className={styles.iconBtn}
                          aria-label="Edit"
                          data-tooltip="Tahrirlash"
                          onClick={() => {
                            setEditKey(rowKey);
                            setEditId(r.id);
                            setEditName(r.name ?? "");
                            setEditSize(r.size ?? "");
                            setEditQty(r.qty ?? "");
                            setEditImageUrl(r.imageUrl || product);
                            setEditOpen(true);
                          }}
                        >
                          <EditIcon />
                        </button>
                        <button
                          type="button"
                          className={styles.iconBtn}
                          aria-label="Delete"
                          data-tooltip="O'chirish"
                          onClick={() => {
                            setDeleteKey(rowKey);
                            setDeleteId(r.id);
                            setDeleteOpen(true);
                          }}
                        >
                          <TrashIcon />
                        </button>
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
              <ChevronLeft />
            </button>

            {pages.map((p, idx) =>
              p === "ellipsis" ? (
                <span key={`e-${idx}`} className={styles.ellipsis}>
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
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={editOpen}
        title="Mahsulotni tahrirlash"
        onClose={closeEdit}
        className={styles.editModal}
        headerClassName={styles.editHeader}
      >
        <div className={styles.editGrid}>
          <div className={styles.imageBlock}>
            <div className={styles.imagePreview}>
              <img src={editImageUrl || product} alt="Preview" />
            </div>
            <label className={styles.uploadBtn}>
              Rasm tanlash
              <input
                type="file"
                accept="image/*"
                className={styles.fileInput}
                onChange={(e) => handlePickImage(e.target.files?.[0])}
              />
            </label>
          </div>

          <div className={styles.fields}>
            <label className={styles.field}>
              <span className={styles.label}>Mahsulot nomi</span>
              <Input
                size="small"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </label>

            <div className={styles.row2}>
              <label className={styles.field}>
                <span className={styles.label}>Hajmi</span>
                <Input
                  size="small"
                  value={editSize}
                  onChange={(e) => setEditSize(e.target.value)}
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Miqdor</span>
                <Input
                  size="small"
                  value={editQty}
                  onChange={(e) => setEditQty(e.target.value)}
                />
              </label>
            </div>
          </div>
        </div>

        <div className={styles.editFooter}>
          <Button
            type="button"
            variant="secondary"
            size="small"
            className={`${styles.editBtn} ${styles.editCancel}`}
            onClick={closeEdit}
          >
            Bekor qilish
          </Button>

          <Button
            type="button"
            size="small"
            className={`${styles.editBtn} ${styles.editSubmit}`}
            onClick={handleEditSave}
            disabled={!editName.trim() || !editId}
          >
            Saqlash
          </Button>
        </div>
      </Modal>

      <Modal
        open={deleteOpen}
        title="Mahsulotni o'chirish"
        showClose={false}
        onClose={() => {
          setDeleteOpen(false);
          setDeleteKey(null);
          setDeleteId(null);
        }}
        className={styles.confirmModal}
      >
        <div className={styles.confirmText}>
          Siz {deleteId} ushu mahsulotni o'chirmoqchisiz
        </div>

        <div className={styles.confirmFooter}>
          <Button
            type="button"
            variant="secondary"
            size="small"
            onClick={() => {
              setDeleteOpen(false);
              setDeleteKey(null);
              setDeleteId(null);
            }}
          >
            Bekor qilish
          </Button>

          <Button
            type="button"
            size="small"
            onClick={() => {
              if (deleteKey) {
                setRows((prev) =>
                  prev.filter((rr) => rr.id + "-" + rr.createdAt !== deleteKey),
                );
                setSelected((prev) => {
                  const next = new Set(prev);
                  next.delete(deleteKey);
                  return next;
                });
              }

              setDeleteOpen(false);
              setDeleteKey(null);
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
