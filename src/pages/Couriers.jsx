import { useMemo, useState } from "react";

import styles from "./Couriers.module.css";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import PhoneInput from "@/components/ui/PhoneInput";
import { formatUzPhone } from "@/components/ui/formatUzPhone";

function BreadcrumbChevron() {
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

function EditIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
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

function EyeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2.25 12C3.75 7.5 7.5 4.5 12 4.5C16.5 4.5 20.25 7.5 21.75 12C20.25 16.5 16.5 19.5 12 19.5C7.5 19.5 3.75 16.5 2.25 12Z"
        stroke="#212B36"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15.25C13.7949 15.25 15.25 13.7949 15.25 12C15.25 10.2051 13.7949 8.75 12 8.75C10.2051 8.75 8.75 10.2051 8.75 12C8.75 13.7949 10.2051 15.25 12 15.25Z"
        stroke="#212B36"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3 3L21 21"
        stroke="#212B36"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.6 10.6C10.2 11 10 11.5 10 12C10 13.1 10.9 14 12 14C12.5 14 13 13.8 13.4 13.4"
        stroke="#212B36"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.88 5.09C10.56 4.86 11.27 4.75 12 4.75C16.5 4.75 20.25 7.75 21.75 12.25C21.27 13.69 20.46 14.94 19.41 15.95"
        stroke="#212B36"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.07 6.06C4.36 7.23 3.03 8.98 2.25 11.25C3.75 15.75 7.5 18.75 12 18.75C13.64 18.75 15.2 18.35 16.59 17.62"
        stroke="#212B36"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Couriers() {
  const initialRows = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        key: `courier-${i}`,
        name: "Andy Smith",
        createdAt: "24 Dec 2024",
        ordersDone: 100,
        phone: "+998 90 123 45 67",
        password: "123475",
      })),
    [],
  );

  const [rows, setRows] = useState(initialRows);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const [createOpen, setCreateOpen] = useState(false);
  const [createName, setCreateName] = useState("Andy Smith");
  const [createPhone, setCreatePhone] = useState("+998");
  const [createPassword, setCreatePassword] = useState("123475");

  const [editOpen, setEditOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editPassword, setEditPassword] = useState("");

  const [passwordVisibleByKey, setPasswordVisibleByKey] = useState({});

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteName, setDeleteName] = useState("");

  const totalPages = 15;
  const pages = [1, 2, 3, 4, "ellipsis", totalPages];

  const startIndex = (page - 1) * perPage;
  const visibleRows = rows.slice(startIndex, startIndex + perPage);

  const closeCreate = () => {
    setCreateOpen(false);
    setCreateName("Andy Smith");
    setCreatePhone("+998");
    setCreatePassword("123475");
  };

  const closeEdit = () => {
    setEditOpen(false);
    setEditIndex(null);
    setEditName("");
    setEditPhone("");
    setEditPassword("");
  };

  const handleCreate = () => {
    const name = createName.trim();
    if (!name) return;

    setRows((prev) => [
      {
        key: `courier-${Date.now()}`,
        name,
        createdAt: "24 Dec 2024",
        ordersDone: 0,
        phone: createPhone,
        password: createPassword,
      },
      ...prev,
    ]);

    closeCreate();
  };

  const handleEditSave = () => {
    if (editIndex === null) return;

    const name = editName.trim();
    if (!name) return;

    setRows((prev) =>
      prev.map((r, idx) =>
        idx === editIndex
          ? {
              ...r,
              name,
              phone: editPhone,
              password: editPassword,
            }
          : r,
      ),
    );

    closeEdit();
  };

  const handleDelete = () => {
    if (deleteIndex === null) return;
    setRows((prev) => prev.filter((_, idx) => idx !== deleteIndex));
    setDeleteOpen(false);
    setDeleteIndex(null);
    setDeleteName("");
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Kuryerlar</h1>
          <div className={styles.breadcrumbs}>
            <span className={styles.crumb}>Boshqaruv paneli</span>
            <span className={styles.sep}>
              <BreadcrumbChevron />
            </span>
            <span className={styles.crumbActive}>Kuryerlar</span>
          </div>
        </div>

        <Button
          type="button"
          className={styles.createBtn}
          size="small"
          onClick={() => setCreateOpen(true)}
        >
          Yaratish
        </Button>
      </div>

      <div className={styles.card}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thName}>Kuryer nomi</th>
                <th className={styles.thDate}>Yaratilgan sanasi</th>
                <th className={styles.thOrdersDone}>Buyurtmalar bajarildi</th>
                <th className={styles.thPhone}>Telefon raqam</th>
                <th className={styles.thPassword}>Parol</th>
                <th className={styles.thActions} aria-hidden="true" />
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((r, idx) => (
                <tr key={r.key} className={styles.tr}>
                  <td className={styles.tdName}>{r.name}</td>
                  <td className={styles.tdMuted}>{r.createdAt}</td>
                  <td className={styles.tdMuted}>{r.ordersDone}</td>
                  <td className={styles.tdMuted}>{r.phone}</td>
                  <td className={styles.tdPassword}>
                    <div className={styles.passwordCell}>
                      <span className={styles.passwordText}>
                        {passwordVisibleByKey[r.key] ? r.password : "••••••"}
                      </span>
                      <button
                        type="button"
                        className={styles.eyeBtn}
                        aria-label={
                          passwordVisibleByKey[r.key] ? "Hide" : "Show"
                        }
                        data-tooltip={
                          passwordVisibleByKey[r.key]
                            ? "Yashirish"
                            : "Ko'rsatish"
                        }
                        onClick={() =>
                          setPasswordVisibleByKey((prev) => ({
                            ...prev,
                            [r.key]: !prev[r.key],
                          }))
                        }
                      >
                        {passwordVisibleByKey[r.key] ? (
                          <EyeOffIcon />
                        ) : (
                          <EyeIcon />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className={styles.tdActions}>
                    <div className={styles.actions}>
                      <button
                        type="button"
                        className={styles.iconBtn}
                        aria-label="Edit"
                        data-tooltip="Tahrirlash"
                        onClick={() => {
                          const realIndex = startIndex + idx;
                          setEditIndex(realIndex);
                          setEditName(r.name ?? "");
                          setEditPhone(formatUzPhone(r.phone ?? ""));
                          setEditPassword(r.password ?? "");
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
                          const realIndex = startIndex + idx;
                          setDeleteIndex(realIndex);
                          setDeleteName(r.name ?? "");
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
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setPage(1);
              }}
              aria-label="Rows per page"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className={styles.footerText}>Yozuvlar</span>
            <span className={styles.total}>Jami kuryerlar: {rows.length}</span>
          </div>

          <div className={styles.pagination}>
            <button
              type="button"
              className={styles.navBtn}
              aria-label="Previous"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft />
            </button>

            {pages.map((p) =>
              p === "ellipsis" ? (
                <span key="ellipsis" className={styles.ellipsis}>
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
              aria-label="Next"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={createOpen}
        title="Kuryer yaratish"
        onClose={closeCreate}
        className={styles.formModal}
        headerClassName={styles.formHeader}
        bodyClassName={styles.formBody}
      >
        <div className={styles.formGrid}>
          <div className={`${styles.field} ${styles.span2}`}>
            <div className={styles.label}>Kuryer nomi</div>
            <Input
              size="small"
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.label}>Telefon raqam</div>
            <PhoneInput
              size="small"
              value={createPhone}
              onChange={setCreatePhone}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.label}>Parol</div>
            <Input
              size="small"
              value={createPassword}
              onChange={(e) => setCreatePassword(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.formFooter}>
          <Button
            type="button"
            size="small"
            className={styles.formSubmit}
            onClick={handleCreate}
          >
            Yaratish
          </Button>
        </div>
      </Modal>

      <Modal
        open={editOpen}
        title="Kuryerni tahrirlash"
        onClose={closeEdit}
        className={styles.formModal}
        headerClassName={styles.formHeader}
        bodyClassName={styles.formBody}
      >
        <div className={styles.formGrid}>
          <div className={`${styles.field} ${styles.span2}`}>
            <div className={styles.label}>Kuryer nomi</div>
            <Input
              size="small"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.label}>Telefon raqam</div>
            <PhoneInput
              size="small"
              value={editPhone}
              onChange={setEditPhone}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.label}>Parol</div>
            <Input
              size="small"
              value={editPassword}
              onChange={(e) => setEditPassword(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.formFooter}>
          <Button
            type="button"
            size="small"
            className={styles.formSubmit}
            onClick={handleEditSave}
          >
            Saqlash
          </Button>
        </div>
      </Modal>

      <Modal
        open={deleteOpen}
        title="Kuryerni o'chirish"
        onClose={() => setDeleteOpen(false)}
      >
        <div className={styles.confirmText}>
          Ushbu kuryerni o'chirishni xohlaysizmi?
        </div>
        <div className={styles.confirmMeta}>
          <span className={styles.metaLabel}>Kuryer:</span>{" "}
          <span className={styles.metaValue}>{deleteName}</span>
        </div>
        <div className={styles.confirmFooter}>
          <Button
            type="button"
            variant="secondary"
            size="small"
            className={styles.confirmBtn}
            onClick={() => setDeleteOpen(false)}
          >
            Bekor qilish
          </Button>
          <Button
            type="button"
            size="small"
            className={styles.confirmBtn}
            onClick={handleDelete}
          >
            O'chirish
          </Button>
        </div>
      </Modal>
    </div>
  );
}
