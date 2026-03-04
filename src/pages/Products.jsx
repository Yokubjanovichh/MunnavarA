import { useMemo, useState } from "react";

import styles from "./Products.module.css";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import {
  useArchiveProductMutation,
  useGetCatalogQuery,
  useUpdateProductMutation,
} from "@/services/catalogApi";

function ChevronLeft() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 15L7.5 10L12.5 5"
        stroke="#111827"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 5L12.5 10L7.5 15"
        stroke="#111827"
        strokeWidth="1.8"
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

function formatMoneySpaces(value) {
  const digits = String(value ?? "").replace(/\D+/g, "");
  if (!digits) return "0";
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function parseMoneyToInt(raw) {
  const digits = String(raw ?? "")
    .replace(/\s+/g, "")
    .replace(/\D+/g, "");
  if (!digits) return 0;
  const x = Number.parseInt(digits, 10);
  return Number.isFinite(x) ? x : 0;
}

function parseLiters(raw) {
  const s = String(raw ?? "")
    .trim()
    .replace(",", ".");
  if (!s) return null;
  const x = Number.parseFloat(s);
  if (!Number.isFinite(x)) return null;
  if (x < 0) return null;
  return x;
}

function sameNumber(a, b) {
  if (a === null && b === null) return true;
  if (typeof a !== "number" || typeof b !== "number") return false;
  return Math.abs(a - b) < 1e-9;
}

function typeLabel(type) {
  if (type === "water") return "Suv";
  if (type === "container") return "Tara";
  if (type === "equipment") return "Uskuna";
  return type || "—";
}

function getVolume(attributes) {
  const v = attributes?.volume ?? attributes?.volume_l ?? null;
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

function formatVolume(attributes) {
  const v = getVolume(attributes);
  return v === null ? "—" : `${v} L`;
}

export default function Products() {
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const skip = (page - 1) * perPage;
  const skeletonCount = Math.min(perPage, 10);

  const {
    data: products,
    isLoading,
    isError,
  } = useGetCatalogQuery({ skip, limit: perPage });

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [archiveProduct, { isLoading: isArchiving }] =
    useArchiveProductMutation();

  const rows = Array.isArray(products) ? products : [];

  const hasNextPage = !isLoading && !isError && rows.length === perPage;
  const pages = useMemo(() => {
    const result = [];
    if (page > 1) result.push(page - 1);
    result.push(page);
    if (hasNextPage) result.push(page + 1);
    return result;
  }, [page, hasNextPage]);

  const productTypes = useMemo(
    () => [
      { value: "water", label: "Suv" },
      { value: "container", label: "Tara" },
      { value: "equipment", label: "Uskuna" },
    ],
    [],
  );

  const materialOptions = useMemo(
    () => [
      { value: "PC", label: "PC" },
      { value: "PET", label: "PET" },
    ],
    [],
  );

  const [editOpen, setEditOpen] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("water");
  const [editPrice, setEditPrice] = useState("0");
  const [editVolume, setEditVolume] = useState("");
  const [editMaterial, setEditMaterial] = useState("PC");
  const [editContainerId, setEditContainerId] = useState("");
  const [editError, setEditError] = useState(null);
  const [editInitial, setEditInitial] = useState(null);

  const closeEdit = () => {
    setEditOpen(false);
    setEditProductId(null);
    setEditName("");
    setEditType("water");
    setEditPrice("0");
    setEditVolume("");
    setEditMaterial("PC");
    setEditContainerId("");
    setEditError(null);
    setEditInitial(null);
  };

  const {
    data: containerProducts,
    isLoading: isContainersLoading,
    isError: isContainersError,
  } = useGetCatalogQuery(
    { product_type: "container", skip: 0, limit: 100 },
    { skip: !(editOpen && editType === "water") },
  );

  const selectedContainer =
    editType === "water" && Array.isArray(containerProducts)
      ? containerProducts.find((p) => p?.id === editContainerId)
      : null;

  const openEdit = (product) => {
    setEditError(null);
    const initialProductId = product?.id ?? null;
    const initialName = product?.name ?? "";
    const initialType = product?.type ?? "water";
    const initialPriceInt = Number(product?.price ?? 0) || 0;
    const initialVolume = getVolume(product?.attributes);
    const initialMaterial = product?.attributes?.material ?? "PC";
    const initialContainerId = product?.returnable_item_id ?? "";

    setEditProductId(initialProductId);
    setEditName(initialName);
    setEditType(initialType);
    setEditPrice(formatMoneySpaces(initialPriceInt));
    setEditVolume(initialVolume === null ? "" : String(initialVolume));
    setEditMaterial(initialMaterial);
    setEditContainerId(initialContainerId);
    setEditInitial({
      productId: initialProductId,
      name: String(initialName),
      type: String(initialType),
      priceInt: initialPriceInt,
      volume: initialVolume,
      material: String(initialMaterial),
      containerId: String(initialContainerId),
    });
    setEditOpen(true);
  };

  const hasEditChanges = useMemo(() => {
    if (!editOpen) return false;
    if (!editInitial) return false;
    if (!editProductId) return false;

    const currentName = editName;
    const currentType = editType;
    const currentPriceInt = parseMoneyToInt(editPrice);
    const currentVolume = parseLiters(editVolume);
    const currentMaterial = editMaterial;
    const currentContainerId = editContainerId;

    if (String(currentName) !== String(editInitial.name)) return true;
    if (String(currentType) !== String(editInitial.type)) return true;
    if (currentPriceInt !== editInitial.priceInt) return true;

    if (currentType === "water") {
      if (String(currentContainerId) !== String(editInitial.containerId))
        return true;
      if (!sameNumber(currentVolume, editInitial.volume)) return true;
      return false;
    }

    if (currentType === "container") {
      if (!sameNumber(currentVolume, editInitial.volume)) return true;
      if (String(currentMaterial) !== String(editInitial.material)) return true;
      return false;
    }

    // equipment
    return false;
  }, [
    editOpen,
    editInitial,
    editProductId,
    editName,
    editType,
    editPrice,
    editVolume,
    editMaterial,
    editContainerId,
  ]);

  const onSaveEdit = async () => {
    setEditError(null);

    const trimmedName = editName.trim();
    if (!editProductId) return;
    if (!trimmedName) {
      setEditError("Mahsulot nomini kiriting");
      return;
    }

    const nextPrice = parseMoneyToInt(editPrice);

    const body = {
      name: trimmedName,
      type: editType,
      price: nextPrice,
    };

    if (editType === "water") {
      if (isContainersLoading) {
        setEditError("Tara ro‘yxati yuklanmoqda");
        return;
      }
      if (!Array.isArray(containerProducts) || containerProducts.length === 0) {
        setEditError("Avval tara (idish) yarating");
        return;
      }
      if (!editContainerId || !selectedContainer) {
        setEditError("Tara tanlang");
        return;
      }
      const liters = parseLiters(editVolume);
      if (liters === null) {
        setEditError("Hajm (litr) noto‘g‘ri kiritildi");
        return;
      }
      const autoMaterial = selectedContainer?.attributes?.material;
      if (!autoMaterial) {
        setEditError("Tanlangan tarada material topilmadi");
        return;
      }
      body.attributes = { volume: liters, material: autoMaterial };
      body.returnable_item_id = editContainerId;
    }

    if (editType === "container") {
      const liters = parseLiters(editVolume);
      if (liters === null) {
        setEditError("Hajm (litr) noto‘g‘ri kiritildi");
        return;
      }
      body.attributes = { volume: liters, material: editMaterial };
    }

    try {
      await updateProduct({ product_id: editProductId, body }).unwrap();
      closeEdit();
    } catch (e) {
      console.warn("updateProduct failed", e);
      setEditError("Saqlashda xatolik yuz berdi");
    }
  };

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  const closeDelete = () => {
    setDeleteOpen(false);
    setDeleteProductId(null);
  };

  const onConfirmDelete = async () => {
    if (!deleteProductId) return;
    try {
      await archiveProduct(deleteProductId).unwrap();
      closeDelete();
    } catch (e) {
      console.warn("archiveProduct failed", e);
      closeDelete();
    }
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
                <th className={styles.thName}>Mahsulot nomi</th>
                <th className={styles.thType}>
                  <span className={styles.thInner}>
                    Turi <SortIcon />
                  </span>
                </th>
                <th className={styles.thVolume}>Hajmi</th>
                <th className={styles.thPrice}>Narxi</th>
                <th className={styles.thActions} aria-hidden="true" />
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: skeletonCount }).map((_, i) => (
                  <tr key={`sk-${i}`} className={styles.tr}>
                    <td className={styles.tdName}>
                      <div
                        className={`${styles.skeletonBar} ${styles.skeletonName}`}
                      />
                    </td>
                    <td className={styles.tdType}>
                      <div
                        className={`${styles.skeletonBar} ${styles.skeletonType}`}
                      />
                    </td>
                    <td className={styles.tdVolume}>
                      <div
                        className={`${styles.skeletonBar} ${styles.skeletonVolume}`}
                      />
                    </td>
                    <td className={styles.tdPrice}>
                      <div
                        className={`${styles.skeletonBar} ${styles.skeletonPrice}`}
                      />
                    </td>
                    <td className={styles.tdActions}>
                      <div className={styles.skeletonActions}>
                        <div className={styles.skeletonIcon} />
                        <div className={styles.skeletonIcon} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : isError ? (
                <tr className={styles.tr}>
                  <td className={styles.state} colSpan={5}>
                    Xatolik yuz berdi (login/scopes yoki CORS bo‘lishi mumkin)
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr className={styles.tr}>
                  <td className={styles.state} colSpan={5}>
                    Hozircha mahsulot yo‘q
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r?.id} className={styles.tr}>
                    <td className={styles.tdName}>{r?.name || "—"}</td>
                    <td className={styles.tdType}>{typeLabel(r?.type)}</td>
                    <td className={styles.tdVolume}>
                      {formatVolume(r?.attributes)}
                    </td>
                    <td className={styles.tdPrice}>
                      {formatMoneySpaces(r?.price)}
                    </td>
                    <td className={styles.tdActions}>
                      <div className={styles.actions}>
                        <button
                          type="button"
                          className={styles.iconBtn}
                          aria-label="Edit"
                          data-tooltip="Tahrirlash"
                          onClick={() => openEdit(r)}
                        >
                          <EditIcon />
                        </button>
                        <button
                          type="button"
                          className={styles.iconBtn}
                          aria-label="Delete"
                          data-tooltip="O'chirish"
                          onClick={() => {
                            setDeleteProductId(r?.id);
                            setDeleteOpen(true);
                          }}
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
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
                setPerPage(next);
                setPage(1);
              }}
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
              disabled={isLoading || page <= 1}
              aria-label="Previous page"
            >
              <ChevronLeft />
            </button>

            {pages.map((p) => (
              <button
                key={p}
                type="button"
                className={
                  p === page
                    ? `${styles.pageBtn} ${styles.pageBtnActive}`
                    : styles.pageBtn
                }
                onClick={() => setPage(p)}
                disabled={isLoading || p === page}
              >
                {p}
              </button>
            ))}

            <button
              type="button"
              className={styles.navBtn}
              onClick={() => setPage((p) => p + 1)}
              disabled={isLoading || !hasNextPage}
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
        <div className={styles.fields}>
          <label className={styles.field}>
            <span className={styles.label}>Mahsulot nomi</span>
            <Input
              size="small"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              disabled={isUpdating}
            />
          </label>

          <div className={styles.row2}>
            <label className={styles.field}>
              <span className={styles.label}>Turi</span>
              <select
                className={styles.select}
                value={editType}
                disabled={isUpdating}
                onChange={(e) => {
                  const next = e.target.value;
                  setEditType(next);
                  setEditError(null);
                  if (next !== "water") setEditContainerId("");
                }}
              >
                {productTypes.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Narx</span>
              <Input
                size="small"
                value={editPrice}
                onChange={(e) => {
                  const next = String(e.target.value ?? "");
                  const digits = next.replace(/\s+/g, "").replace(/\D+/g, "");
                  setEditPrice(formatMoneySpaces(digits));
                }}
                onBlur={() => setEditPrice((v) => formatMoneySpaces(v) || "0")}
                inputMode="numeric"
                disabled={isUpdating}
              />
            </label>
          </div>

          {editType === "water" ? (
            <>
              <div className={styles.row2}>
                <label className={styles.field}>
                  <span className={styles.label}>Tara (idish)</span>
                  <select
                    className={styles.select}
                    value={editContainerId}
                    disabled={isUpdating || isContainersLoading}
                    onChange={(e) => setEditContainerId(e.target.value)}
                  >
                    <option value="" disabled>
                      {isContainersLoading
                        ? "Yuklanmoqda..."
                        : Array.isArray(containerProducts) &&
                            containerProducts.length > 0
                          ? "Tara tanlang"
                          : "Tara topilmadi"}
                    </option>

                    {editContainerId &&
                    Array.isArray(containerProducts) &&
                    !containerProducts.some(
                      (p) => p?.id === editContainerId,
                    ) ? (
                      <option value={editContainerId}>
                        Hozirgi tara (topilmadi)
                      </option>
                    ) : null}

                    {(Array.isArray(containerProducts)
                      ? containerProducts
                      : []
                    ).map((p) => {
                      const material = p?.attributes?.material;
                      const volume =
                        p?.attributes?.volume ??
                        p?.attributes?.volume_l ??
                        null;
                      const suffix =
                        volume || material
                          ? ` (${[volume ? `${volume}L` : null, material]
                              .filter(Boolean)
                              .join(" ")})`
                          : "";
                      return (
                        <option key={p?.id} value={p?.id}>
                          {p?.name || p?.id}
                          {suffix}
                        </option>
                      );
                    })}
                  </select>
                  {isContainersError ? (
                    <div className={styles.helper}>
                      Tara ro‘yxatini olishda xatolik yuz berdi
                    </div>
                  ) : null}
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>Hajmi (litr)</span>
                  <Input
                    size="small"
                    value={editVolume}
                    onChange={(e) => {
                      const next = String(e.target.value ?? "");
                      const cleaned = next.replace(/[^\d.,]/g, "");
                      setEditVolume(cleaned);
                    }}
                    inputMode="decimal"
                    disabled={isUpdating}
                  />
                </label>
              </div>

              <div className={styles.helper}>
                Material avtomatik:{" "}
                {selectedContainer?.attributes?.material || "—"}
              </div>
            </>
          ) : editType === "container" ? (
            <div className={styles.row2}>
              <label className={styles.field}>
                <span className={styles.label}>Hajmi (litr)</span>
                <Input
                  size="small"
                  value={editVolume}
                  onChange={(e) => {
                    const next = String(e.target.value ?? "");
                    const cleaned = next.replace(/[^\d.,]/g, "");
                    setEditVolume(cleaned);
                  }}
                  inputMode="decimal"
                  disabled={isUpdating}
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Material</span>
                <select
                  className={styles.select}
                  value={editMaterial}
                  disabled={isUpdating}
                  onChange={(e) => setEditMaterial(e.target.value)}
                >
                  {materialOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          ) : null}

          {editError ? (
            <div className={styles.confirmText}>{editError}</div>
          ) : null}

          <div className={styles.editFooter}>
            <Button
              type="button"
              variant="secondary"
              size="small"
              className={`${styles.editBtn} ${styles.editCancel}`}
              onClick={closeEdit}
              disabled={isUpdating}
            >
              Bekor qilish
            </Button>

            <Button
              type="button"
              size="small"
              className={`${styles.editBtn} ${styles.editSubmit}`}
              onClick={onSaveEdit}
              disabled={
                !editName.trim() ||
                !editProductId ||
                isUpdating ||
                !hasEditChanges
              }
            >
              {isUpdating ? "Saqlanmoqda..." : "Saqlash"}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={deleteOpen}
        title="Mahsulotni o'chirish"
        showClose={false}
        onClose={closeDelete}
        className={styles.confirmModal}
      >
        <div className={styles.confirmText}>
          Siz ushbu mahsulotni o'chirmoqchimisiz?
        </div>

        <div className={styles.confirmFooter}>
          <Button
            type="button"
            variant="secondary"
            size="small"
            className={styles.confirmBtn}
            onClick={closeDelete}
            disabled={isArchiving}
          >
            Bekor qilish
          </Button>

          <Button
            type="button"
            size="small"
            className={styles.confirmBtn}
            onClick={onConfirmDelete}
            disabled={!deleteProductId || isArchiving}
          >
            {isArchiving ? "O'chirilmoqda..." : "O'chirish"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
