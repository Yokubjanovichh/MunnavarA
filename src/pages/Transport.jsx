import { useMemo, useState } from "react";

import styles from "./Transport.module.css";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";

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

function SortIcon() {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
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

function normalizePlate(value) {
  return String(value ?? "")
    .toUpperCase()
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeCapacity(value) {
  const num = Number.parseInt(String(value ?? "").replace(/\D/g, ""), 10);
  if (!Number.isFinite(num)) return 0;
  return Math.max(0, num);
}

export default function Transport() {
  const initialRows = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => {
        const isCourier = i % 3 === 0;
        return {
          key: `transport-${i}`,
          name: ["Labo", "Damas", "Gazel", "Isuzu", "Cobalt"][i % 5],
          plate: [
            "01 A 123 AA",
            "10 B 777 BB",
            "25 C 456 CC",
            "80 D 999 DD",
            "30 E 111 EE",
          ][i % 5],
          capacity: [20, 30, 50, 60, 25][i % 5],
          ownerType: isCourier ? "courier" : "company",
          ownerName: isCourier ? "Andy Smith" : "",
        };
      }),
    [],
  );

  const [rows, setRows] = useState(initialRows);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const [createOpen, setCreateOpen] = useState(false);
  const [createName, setCreateName] = useState("Labo");
  const [createPlate, setCreatePlate] = useState("01 A 123 AA");
  const [createCapacity, setCreateCapacity] = useState("20");
  const [createOwnerType, setCreateOwnerType] = useState("company");
  const [createOwnerName, setCreateOwnerName] = useState("");

  const [editOpen, setEditOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPlate, setEditPlate] = useState("");
  const [editCapacity, setEditCapacity] = useState("0");
  const [editOwnerType, setEditOwnerType] = useState("company");
  const [editOwnerName, setEditOwnerName] = useState("");

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteLabel, setDeleteLabel] = useState("");

  const totalPages = 15;
  const pages = [1, 2, 3, 4, "ellipsis", totalPages];

  const startIndex = (page - 1) * perPage;
  const visibleRows = rows.slice(startIndex, startIndex + perPage);

  const closeCreate = () => {
    setCreateOpen(false);
    setCreateName("Labo");
    setCreatePlate("01 A 123 AA");
    setCreateCapacity("20");
    setCreateOwnerType("company");
    setCreateOwnerName("");
  };

  const closeEdit = () => {
    setEditOpen(false);
    setEditIndex(null);
    setEditName("");
    setEditPlate("");
    setEditCapacity("0");
    setEditOwnerType("company");
    setEditOwnerName("");
  };

  const handleCreate = () => {
    const name = createName.trim();
    const plate = normalizePlate(createPlate);
    const capacity = normalizeCapacity(createCapacity);

    if (!name || !plate) return;

    if (createOwnerType === "courier" && !createOwnerName.trim()) return;

    setRows((prev) => [
      {
        key: `transport-${Date.now()}`,
        name,
        plate,
        capacity,
        ownerType: createOwnerType,
        ownerName: createOwnerType === "courier" ? createOwnerName.trim() : "",
      },
      ...prev,
    ]);

    closeCreate();
  };

  const handleEditSave = () => {
    if (editIndex === null) return;

    const name = editName.trim();
    const plate = normalizePlate(editPlate);
    const capacity = normalizeCapacity(editCapacity);

    if (!name || !plate) return;
    if (editOwnerType === "courier" && !editOwnerName.trim()) return;

    setRows((prev) =>
      prev.map((r, idx) =>
        idx === editIndex
          ? {
              ...r,
              name,
              plate,
              capacity,
              ownerType: editOwnerType,
              ownerName:
                editOwnerType === "courier" ? editOwnerName.trim() : "",
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
    setDeleteLabel("");
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Transportlar ro'yxati</h1>
          <div className={styles.breadcrumbs}>
            <span className={styles.crumb}>Boshqaruv paneli</span>
            <span className={styles.sep}>
              <BreadcrumbChevron />
            </span>
            <span className={styles.crumbActive}>Transportlar ro'yxati</span>
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
                <th className={styles.thName}>
                  <span className={styles.thInner}>
                    Moshina nomi <SortIcon />
                  </span>
                </th>
                <th className={styles.thPlate}>Moshina raqami</th>
                <th className={styles.thCapacity}>Sig'imi (suv)</th>
                <th className={styles.thStatus}>Status</th>
                <th className={styles.thActions} aria-hidden="true" />
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((r, idx) => (
                <tr key={r.key} className={styles.tr}>
                  <td className={styles.tdName}>{r.name}</td>
                  <td className={styles.tdMuted}>{r.plate}</td>
                  <td className={styles.tdMuted}>{r.capacity}</td>
                  <td className={styles.tdMuted}>
                    {r.ownerType === "company" ? "Ishxona" : r.ownerName}
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
                          setEditPlate(r.plate ?? "");
                          setEditCapacity(String(r.capacity ?? 0));
                          setEditOwnerType(r.ownerType ?? "company");
                          setEditOwnerName(r.ownerName ?? "");
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
                          setDeleteLabel(`${r.name} (${r.plate})`);
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
            <span className={styles.total}>
              Jami transportlar: {rows.length}
            </span>
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
        title="Transport yaratish"
        onClose={closeCreate}
        className={styles.formModal}
        headerClassName={styles.formHeader}
        bodyClassName={styles.formBody}
      >
        <div className={styles.formGrid}>
          <div className={`${styles.field} ${styles.span2}`}>
            <div className={styles.label}>Moshina nomi</div>
            <Input
              size="small"
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.label}>Moshina raqami</div>
            <Input
              size="small"
              value={createPlate}
              onChange={(e) => setCreatePlate(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.label}>Sig'imi (suv)</div>
            <Input
              size="small"
              value={createCapacity}
              onChange={(e) => setCreateCapacity(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.label}>Status</div>
            <select
              className={styles.select}
              value={createOwnerType}
              onChange={(e) => setCreateOwnerType(e.target.value)}
              aria-label="Status"
            >
              <option value="company">Ishxona</option>
              <option value="courier">Kuryer</option>
            </select>
          </div>

          {createOwnerType === "courier" ? (
            <div className={styles.field}>
              <div className={styles.label}>Kuryer ismi</div>
              <Input
                size="small"
                value={createOwnerName}
                onChange={(e) => setCreateOwnerName(e.target.value)}
              />
            </div>
          ) : null}
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
        title="Transportni tahrirlash"
        onClose={closeEdit}
        className={styles.formModal}
        headerClassName={styles.formHeader}
        bodyClassName={styles.formBody}
      >
        <div className={styles.formGrid}>
          <div className={`${styles.field} ${styles.span2}`}>
            <div className={styles.label}>Moshina nomi</div>
            <Input
              size="small"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.label}>Moshina raqami</div>
            <Input
              size="small"
              value={editPlate}
              onChange={(e) => setEditPlate(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.label}>Sig'imi (suv)</div>
            <Input
              size="small"
              value={editCapacity}
              onChange={(e) => setEditCapacity(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.label}>Status</div>
            <select
              className={styles.select}
              value={editOwnerType}
              onChange={(e) => setEditOwnerType(e.target.value)}
              aria-label="Status"
            >
              <option value="company">Ishxona</option>
              <option value="courier">Kuryer</option>
            </select>
          </div>

          {editOwnerType === "courier" ? (
            <div className={styles.field}>
              <div className={styles.label}>Kuryer ismi</div>
              <Input
                size="small"
                value={editOwnerName}
                onChange={(e) => setEditOwnerName(e.target.value)}
              />
            </div>
          ) : null}
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
        title="Transportni o'chirish"
        showClose={false}
        onClose={() => setDeleteOpen(false)}
      >
        <div className={styles.confirmText}>
          Ushbu transportni o'chirishni xohlaysizmi?
        </div>
        <div className={styles.confirmMeta}>
          <span className={styles.metaLabel}>Transport:</span>{" "}
          <span className={styles.metaValue}>{deleteLabel}</span>
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
