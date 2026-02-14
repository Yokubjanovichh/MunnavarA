import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import styles from "./Promocodes.module.css";

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

export default function Promocodes() {
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(4);

  const initialRows = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: 123182,
        name: "MunavvarA2026",
        usage: 100,
        key: `${123182}-${i}`,
      })),
    [],
  );

  const [rows, setRows] = useState(initialRows);

  const [createOpen, setCreateOpen] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createUsage, setCreateUsage] = useState("100");

  const [editOpen, setEditOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState("");
  const [editUsage, setEditUsage] = useState("0");

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const totalPages = 15;
  const pages = [1, 2, 3, 4, "ellipsis", totalPages];

  const closeCreate = () => {
    setCreateOpen(false);
    setCreateName("");
    setCreateUsage("100");
  };

  const closeEdit = () => {
    setEditOpen(false);
    setEditIndex(null);
    setEditName("");
    setEditUsage("0");
  };

  const handleCreate = () => {
    const name = createName.trim();
    if (!name) return;

    const usageNumber = Math.max(0, Number.parseInt(createUsage, 10) || 0);
    const id = Math.floor(100000 + Math.random() * 900000);

    setRows((prev) => [
      {
        id,
        name,
        usage: usageNumber,
        key: `${id}-${Date.now()}`,
      },
      ...prev,
    ]);

    closeCreate();
  };

  const handleEditSave = () => {
    const name = editName.trim();
    if (!name) return;
    if (editIndex === null) return;

    const usageNumber = Math.max(0, Number.parseInt(editUsage, 10) || 0);

    setRows((prev) =>
      prev.map((row, i) =>
        i === editIndex ? { ...row, name, usage: usageNumber } : row,
      ),
    );

    closeEdit();
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Promokodlar</h1>
          <div className={styles.breadcrumbs}>
            <span className={styles.crumb}>Boshqaruv paneli</span>
            <span className={styles.sep}>
              <BreadcrumbChevron />
            </span>
            <span className={styles.crumbActive}>Promokodlar</span>
          </div>
        </div>

        <Button
          type="button"
          className={styles.createBtn}
          size="small"
          onClick={() => {
            setCreateOpen(true);
          }}
        >
          Yaratish
        </Button>
      </div>

      <div className={styles.card}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thId}>Promokod ID</th>
                <th className={styles.thName}>Promokod nomi</th>
                <th className={styles.thUsage}>Foydalanish</th>
                <th className={styles.thActions} aria-hidden="true" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={r.key} className={styles.tr}>
                  <td className={styles.tdId}>{r.id}</td>
                  <td className={styles.tdName}>{r.name}</td>
                  <td className={`${styles.tdUsage} ${styles.tdMuted}`}>
                    {r.usage}
                  </td>
                  <td className={styles.tdActions}>
                    <div className={styles.actions}>
                      <button
                        type="button"
                        className={styles.iconBtn}
                        aria-label="Edit"
                        data-tooltip="Tahrirlash"
                        onClick={() => {
                          setEditIndex(idx);
                          setEditName(r.name ?? "");
                          setEditUsage(String(r.usage ?? 0));
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
                          setDeleteIndex(idx);
                          setDeleteId(r.id);
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
              <ChevronLeft />
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
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={createOpen}
        title="Promokod yaratish"
        onClose={closeCreate}
        className={styles.createModal}
        headerClassName={styles.createHeader}
      >
        <div className={styles.createGrid}>
          <label className={styles.field}>
            <span className={styles.label}>Promokod nomi</span>
            <Input
              size="small"
              value={createName}
              placeholder="MunavvarA2026"
              onChange={(e) => setCreateName(e.target.value)}
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Foydalanishlar soni</span>
            <Input
              size="small"
              type="number"
              min={0}
              inputMode="numeric"
              value={createUsage}
              onChange={(e) => setCreateUsage(e.target.value)}
            />
          </label>
        </div>

        <div className={styles.createFooter}>
          <Button
            type="button"
            size="small"
            className={styles.createSubmit}
            onClick={handleCreate}
            disabled={!createName.trim()}
          >
            Yaratish
          </Button>
        </div>
      </Modal>

      <Modal
        open={editOpen}
        title="Promokodni tahrirlash"
        onClose={closeEdit}
        className={styles.createModal}
        headerClassName={styles.createHeader}
      >
        <div className={styles.createGrid}>
          <label className={styles.field}>
            <span className={styles.label}>Promokod nomi</span>
            <Input
              size="small"
              value={editName}
              placeholder="MunavvarA2026"
              onChange={(e) => setEditName(e.target.value)}
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Foydalanishlar soni</span>
            <Input
              size="small"
              type="number"
              min={0}
              inputMode="numeric"
              value={editUsage}
              onChange={(e) => setEditUsage(e.target.value)}
            />
          </label>
        </div>

        <div className={styles.createFooter}>
          <Button
            type="button"
            size="small"
            className={styles.createSubmit}
            onClick={handleEditSave}
            disabled={!editName.trim()}
          >
            Saqlash
          </Button>
        </div>
      </Modal>

      <Modal
        open={deleteOpen}
        title="Promokodni o'chirish"
        showClose={false}
        onClose={() => {
          setDeleteOpen(false);
          setDeleteIndex(null);
          setDeleteId(null);
        }}
        className={styles.confirmModal}
      >
        <div className={styles.confirmText}>
          Siz {deleteId} ushu promokodni o'chirmoqchisiz
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
