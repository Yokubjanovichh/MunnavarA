import { useMemo, useState } from "react";

import styles from "./Couriers.module.css";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import PhoneInput from "@/components/ui/PhoneInput";
import { formatUzPhone } from "@/components/ui/formatUzPhone";
import {
  useBlockCourierMutation,
  useCreateCourierMutation,
  useGetCouriersQuery,
  useLazyGetCourierQuery,
  useUpdateCourierMutation,
} from "@/services/couriersApi";

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

function normalizePhoneE164(value) {
  const s = String(value ?? "").trim();
  if (!s) return "";
  const digits = s.replace(/\D+/g, "");
  if (!digits) return "";
  return `+${digits}`;
}

function getApiErrorMessage(err) {
  const data = err?.data;
  if (typeof data === "string" && data.trim()) return data;
  if (data?.detail) {
    if (typeof data.detail === "string") return data.detail;
    if (Array.isArray(data.detail)) {
      const first = data.detail[0];
      const msg = first?.msg || first?.message;
      if (msg) return String(msg);
    }
  }
  if (err?.error) return String(err.error);
  if (err?.status) return `Request failed (${err.status})`;
  return "Xatolik yuz berdi";
}

function formatMoneyUZS(amount) {
  const num = Number(amount);
  if (!Number.isFinite(num)) return "—";
  return num.toLocaleString("ru-RU");
}

export default function Couriers() {
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const skeletonCount = Math.min(perPage, 10);

  const { data, isLoading, isFetching, isError, error } = useGetCouriersQuery({
    page,
    size: perPage,
  });

  const showSkeleton = isLoading || (isFetching && !data);

  const couriers = Array.isArray(data?.couriers) ? data.couriers : [];
  const totalCount =
    typeof data?.total_count === "number" ? data.total_count : 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / perPage));

  const sortedCouriers = useMemo(() => {
    // Keep inactive couriers at the bottom (within current page).
    return [...couriers].sort((a, b) => {
      const aKey = a?.is_active ? 0 : 1;
      const bKey = b?.is_active ? 0 : 1;
      if (aKey !== bKey) return aKey - bKey;
      return String(a?.username ?? "").localeCompare(String(b?.username ?? ""));
    });
  }, [couriers]);

  const [createOpen, setCreateOpen] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createPhone, setCreatePhone] = useState("+998");
  const [createPassword, setCreatePassword] = useState("");
  const [createError, setCreateError] = useState(null);

  const [editOpen, setEditOpen] = useState(false);
  const [editCourierId, setEditCourierId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("+998");
  const [editPassword, setEditPassword] = useState("");
  const [editPasswordConfirm, setEditPasswordConfirm] = useState("");
  const [editInitial, setEditInitial] = useState(null);
  const [editError, setEditError] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteCourierId, setDeleteCourierId] = useState(null);
  const [deleteName, setDeleteName] = useState("");

  const pages = useMemo(() => {
    const result = [];
    if (page > 1) result.push(page - 1);
    result.push(page);
    if (page < totalPages) result.push(page + 1);
    return result;
  }, [page, totalPages]);

  const [createCourier, { isLoading: isCreating }] = useCreateCourierMutation();
  const [fetchCourier, { isFetching: isFetchingCourier }] =
    useLazyGetCourierQuery();
  const [updateCourier, { isLoading: isUpdating }] = useUpdateCourierMutation();
  const [blockCourier, { isLoading: isBlocking }] = useBlockCourierMutation();

  const closeCreate = () => {
    setCreateOpen(false);
    setCreateName("");
    setCreatePhone("+998");
    setCreatePassword("");
    setCreateError(null);
  };

  const closeEdit = () => {
    setEditOpen(false);
    setEditCourierId(null);
    setEditName("");
    setEditPhone("+998");
    setEditPassword("");
    setEditPasswordConfirm("");
    setEditInitial(null);
    setEditError(null);
  };

  const handleCreate = async () => {
    const username = createName.trim();
    const phone = normalizePhoneE164(createPhone);
    const password = String(createPassword ?? "").trim();
    if (!username || !phone || !password) return;

    setCreateError(null);
    try {
      await createCourier({
        role: "courier",
        username,
        phone,
        password,
      }).unwrap();
      closeCreate();
      setPage(1);
    } catch (e) {
      setCreateError(getApiErrorMessage(e));
    }
  };

  const handleEditSave = async () => {
    if (!editCourierId) return;
    const username = editName.trim();
    if (!username) return;

    const phone = normalizePhoneE164(editPhone);
    const password = String(editPassword ?? "").trim();
    const passwordConfirm = String(editPasswordConfirm ?? "").trim();
    if (password && password !== passwordConfirm) return;

    setEditError(null);
    try {
      const body = {
        role: "courier",
        username,
        ...(phone ? { phone } : {}),
        ...(password ? { password } : {}),
      };

      await updateCourier({ courierId: editCourierId, body }).unwrap();
      closeEdit();
    } catch (e) {
      setEditError(getApiErrorMessage(e));
    }
  };

  const handleDelete = async () => {
    if (!deleteCourierId) return;
    const shouldGoPrevPage = couriers.length === 1 && page > 1;
    try {
      await blockCourier(deleteCourierId).unwrap();
      setDeleteOpen(false);
      setDeleteCourierId(null);
      setDeleteName("");
      if (shouldGoPrevPage) setPage((p) => Math.max(1, p - 1));
    } catch {
      // Keep modal open; user can retry.
    }
  };

  const editDirty = useMemo(() => {
    if (!editInitial) return false;
    const username = editName.trim();
    const phone = normalizePhoneE164(editPhone);
    const password = String(editPassword ?? "").trim();
    return (
      username !== String(editInitial.username ?? "") ||
      phone !== String(editInitial.phone ?? "") ||
      Boolean(password)
    );
  }, [editInitial, editName, editPhone, editPassword]);

  const editPasswordMismatch = useMemo(() => {
    const password = String(editPassword ?? "").trim();
    const passwordConfirm = String(editPasswordConfirm ?? "").trim();
    if (!password) return false;
    return password !== passwordConfirm;
  }, [editPassword, editPasswordConfirm]);

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
                <th className={styles.thName}>Kuryer FIO</th>
                <th className={styles.thInventory}>Mashina</th>
                <th className={styles.thBalance}>Balans</th>
                <th className={styles.thPhone}>Telefon raqam</th>
                <th className={styles.thActive}></th>
                <th className={styles.thActions} aria-hidden="true" />
              </tr>
            </thead>
            <tbody>
              {showSkeleton ? (
                Array.from({ length: skeletonCount }).map((_, i) => (
                  <tr key={`sk-${i}`} className={styles.tr}>
                    <td className={styles.tdName}>
                      <div
                        className={`${styles.skeletonBar} ${styles.skeletonName}`}
                        aria-hidden="true"
                      />
                    </td>
                    <td className={`${styles.tdMuted} ${styles.tdInventory}`}>
                      <div
                        className={`${styles.skeletonBar} ${styles.skeletonInventory}`}
                        aria-hidden="true"
                      />
                    </td>
                    <td className={`${styles.tdMuted} ${styles.tdBalance}`}>
                      <div
                        className={`${styles.skeletonBar} ${styles.skeletonBalance}`}
                        aria-hidden="true"
                      />
                    </td>
                    <td className={`${styles.tdMuted} ${styles.tdPhone}`}>
                      <div
                        className={`${styles.skeletonBar} ${styles.skeletonPhone}`}
                        aria-hidden="true"
                      />
                    </td>
                    <td className={styles.tdActive}>
                      <span className={styles.skeletonDot} aria-hidden="true" />
                    </td>
                    <td className={styles.tdActions}>
                      <div
                        className={styles.skeletonActions}
                        aria-hidden="true"
                      >
                        <div className={styles.skeletonIcon} />
                        <div className={styles.skeletonIcon} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : isError ? (
                <tr className={styles.tr}>
                  <td className={styles.tdMuted} colSpan={6}>
                    Xatolik: {getApiErrorMessage(error)}
                  </td>
                </tr>
              ) : sortedCouriers.length === 0 ? (
                <tr className={styles.tr}>
                  <td className={styles.tdMuted} colSpan={6}>
                    Hozircha kuryerlar yo‘q
                  </td>
                </tr>
              ) : (
                sortedCouriers.map((c) => (
                  <tr key={c.id} className={styles.tr}>
                    <td className={styles.tdName}>{c.username ?? "—"}</td>
                    <td className={`${styles.tdMuted} ${styles.tdInventory}`}>
                      {c.inventory?.name ?? "—"}
                    </td>
                    <td className={`${styles.tdMuted} ${styles.tdBalance}`}>
                      {formatMoneyUZS(c.account?.balance)}
                    </td>
                    <td className={`${styles.tdMuted} ${styles.tdPhone}`}>
                      {c.phone ? formatUzPhone(c.phone) : "—"}
                    </td>
                    <td className={styles.tdActive}>
                      <span
                        className={
                          c.is_active
                            ? `${styles.statusDot} ${styles.statusGreen}`
                            : `${styles.statusDot} ${styles.statusRed}`
                        }
                        aria-label={c.is_active ? "active" : "inactive"}
                        title={c.is_active ? "Faol" : "Faol emas"}
                      />
                    </td>
                    <td className={styles.tdActions}>
                      <div className={styles.actions}>
                        <button
                          type="button"
                          className={styles.iconBtn}
                          aria-label="Edit"
                          data-tooltip="Tahrirlash"
                          onClick={() => {
                            const rowUsername = String(c.username ?? "");
                            const rowPhone = String(c.phone ?? "");

                            setEditCourierId(c.id);
                            setEditName(rowUsername);
                            setEditPhone(
                              rowPhone ? formatUzPhone(rowPhone) : "+998",
                            );
                            setEditPassword("");
                            setEditPasswordConfirm("");
                            setEditInitial({
                              username: rowUsername,
                              phone: normalizePhoneE164(rowPhone),
                            });
                            setEditOpen(true);

                            fetchCourier(c.id, true)
                              .unwrap()
                              .then((details) => {
                                // OpenAPI says UserResponse, but backend may return more.
                                const nextUsername =
                                  details?.username ??
                                  details?.full_name ??
                                  null;
                                const nextPhone = details?.phone ?? null;

                                if (typeof nextUsername === "string") {
                                  setEditName(nextUsername);
                                }
                                if (typeof nextPhone === "string") {
                                  setEditPhone(formatUzPhone(nextPhone));
                                }

                                setEditInitial((prev) => ({
                                  username:
                                    typeof nextUsername === "string"
                                      ? nextUsername
                                      : prev?.username,
                                  phone:
                                    typeof nextPhone === "string"
                                      ? normalizePhoneE164(nextPhone)
                                      : prev?.phone,
                                }));
                              })
                              .catch((e) => {
                                setEditError(getApiErrorMessage(e));
                              });
                          }}
                        >
                          <EditIcon />
                        </button>

                        <button
                          type="button"
                          className={styles.iconBtn}
                          aria-label="Delete"
                          data-tooltip="Bloklash"
                          onClick={() => {
                            setDeleteCourierId(c.id);
                            setDeleteName(c.username ?? "");
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
            <span className={styles.total}>Jami kuryerlar: {totalCount}</span>
          </div>

          <div className={styles.pagination}>
            <button
              type="button"
              className={styles.navBtn}
              aria-label="Previous"
              disabled={page <= 1 || isLoading || isFetching}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
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
                disabled={isLoading || isFetching}
              >
                {p}
              </button>
            ))}

            <button
              type="button"
              className={styles.navBtn}
              aria-label="Next"
              disabled={page >= totalPages || isLoading || isFetching}
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
            <div className={styles.label}>Kuryer FIO</div>
            <Input
              size="small"
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
              placeholder="Kuryer FIO"
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
              type="password"
            />
          </div>
        </div>

        {createError ? (
          <div className={styles.apiNote}>Xatolik: {createError}</div>
        ) : null}

        <div className={styles.formFooter}>
          <Button
            type="button"
            size="small"
            className={styles.formSubmit}
            onClick={handleCreate}
            disabled={
              isCreating ||
              !createName.trim() ||
              !normalizePhoneE164(createPhone) ||
              !String(createPassword ?? "").trim()
            }
          >
            {isCreating ? "Yaratilmoqda…" : "Yaratish"}
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
          <div className={styles.field}>
            <div className={styles.label}>Kuryer FIO</div>
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
            <div className={styles.label}>Yangi parol</div>
            <Input
              size="small"
              value={editPassword}
              onChange={(e) => setEditPassword(e.target.value)}
              type="password"
              placeholder="Parolni o'zgartirish uchun kiriting"
            />
          </div>

          <div className={styles.field}>
            <div className={styles.label}>Yangi parolni tasdiqlash</div>
            <Input
              size="small"
              value={editPasswordConfirm}
              onChange={(e) => setEditPasswordConfirm(e.target.value)}
              type="password"
              placeholder="Parolni qayta kiriting"
            />
          </div>
        </div>

        {editError ? (
          <div className={styles.apiNote}>Xatolik: {editError}</div>
        ) : null}

        {isFetchingCourier ? (
          <div className={styles.apiNote}>Ma'lumotlar yuklanmoqda…</div>
        ) : null}

        {editPasswordMismatch ? (
          <div className={styles.apiNote}>Xatolik: parollar mos emas</div>
        ) : null}

        <div className={styles.formFooter}>
          <Button
            type="button"
            size="small"
            className={styles.formSubmit}
            onClick={handleEditSave}
            disabled={
              isUpdating ||
              isFetchingCourier ||
              !editCourierId ||
              !editName.trim() ||
              !editDirty ||
              editPasswordMismatch
            }
          >
            {isUpdating ? "Saqlanmoqda…" : "Saqlash"}
          </Button>
        </div>
      </Modal>

      <Modal
        open={deleteOpen}
        title="Kuryerni bloklash"
        onClose={() => setDeleteOpen(false)}
      >
        <div className={styles.confirmText}>
          Ushbu kuryerni bloklashni xohlaysizmi?
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
            disabled={isBlocking || !deleteCourierId}
          >
            {isBlocking ? "Bloklanmoqda…" : "Bloklash"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
