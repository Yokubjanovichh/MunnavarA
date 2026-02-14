import { useMemo, useState } from "react";

import styles from "./Clients.module.css";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PhoneInput from "@/components/ui/PhoneInput";
import { formatUzPhone } from "@/components/ui/formatUzPhone";
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

function formatMoneyUZS(amount) {
  const num = Number(amount);
  if (!Number.isFinite(num)) return String(amount ?? "");
  return num.toLocaleString("ru-RU");
}

export default function Clients() {
  const initialRows = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        key: `${123182}-${i}`,
        id: 123182,
        name: "Andy Smith",
        registeredAt: [
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
        bottles: 10,
        phone: "+998 90 123 45 67",
        orders: 120,
        profit: 10_000_000,
        address: "Chilonzor, 12-mavze",
      })),
    [],
  );

  const [rows, setRows] = useState(initialRows);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const [createOpen, setCreateOpen] = useState(false);
  const [createName, setCreateName] = useState("Andy Smith");
  const [createAddress, setCreateAddress] = useState("Chilonzor, 12-mavze");
  const [createPhone, setCreatePhone] = useState("+998");
  const [createBottles, setCreateBottles] = useState("10");

  const [editOpen, setEditOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editBottles, setEditBottles] = useState("0");

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsClient, setDetailsClient] = useState(null);

  const totalPages = 15;
  const pages = [1, 2, 3, 4, "ellipsis", totalPages];

  const startIndex = (page - 1) * perPage;
  const visibleRows = rows.slice(startIndex, startIndex + perPage);

  const closeCreate = () => {
    setCreateOpen(false);
    setCreateName("Andy Smith");
    setCreateAddress("Chilonzor, 12-mavze");
    setCreatePhone("+998");
    setCreateBottles("10");
  };

  const closeEdit = () => {
    setEditOpen(false);
    setEditIndex(null);
    setEditName("");
    setEditAddress("");
    setEditPhone("");
    setEditBottles("0");
  };

  const handleCreate = () => {
    const name = createName.trim();
    if (!name) return;

    const bottles = Math.max(0, Number.parseInt(createBottles, 10) || 0);
    const id = Math.floor(100000 + Math.random() * 900000);

    setRows((prev) => [
      {
        key: `${id}-${Date.now()}`,
        id,
        name,
        registeredAt: "24 Dec 2024",
        bottles,
        phone: createPhone,
        orders: 0,
        profit: 0,
        address: createAddress,
      },
      ...prev,
    ]);

    closeCreate();
  };

  const handleEditSave = () => {
    if (editIndex === null) return;
    const name = editName.trim();
    if (!name) return;

    const bottles = Math.max(0, Number.parseInt(editBottles, 10) || 0);

    setRows((prev) =>
      prev.map((r, idx) =>
        idx === editIndex
          ? {
              ...r,
              name,
              address: editAddress,
              phone: editPhone,
              bottles,
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
    setDeleteId(null);
  };

  const closeDetails = () => {
    setDetailsOpen(false);
    setDetailsClient(null);
  };

  const detailsOrders = useMemo(() => {
    if (!detailsClient) return [];
    return [
      {
        id: "123",
        startedAt: "08.01.2026 - 18:00",
        endedAt: "08.01.2026 - 18:35",
        from: `${detailsClient.address}, Sektor 17`,
        to: detailsClient.address,
        deliverySum: 500_000,
        cash: 35_000,
        status: "Yakunlandi",
      },
      {
        id: "124",
        startedAt: "07.01.2026 - 12:20",
        endedAt: "07.01.2026 - 12:55",
        from: `${detailsClient.address}, Sektor 14`,
        to: detailsClient.address,
        deliverySum: 450_000,
        cash: 0,
        status: "Yakunlandi",
      },
      {
        id: "125",
        startedAt: "06.01.2026 - 09:10",
        endedAt: "06.01.2026 - 09:40",
        from: `${detailsClient.address}, Sektor 12`,
        to: detailsClient.address,
        deliverySum: 520_000,
        cash: 20_000,
        status: "Yakunlandi",
      },
      {
        id: "126",
        startedAt: "05.01.2026 - 18:00",
        endedAt: "05.01.2026 - 18:28",
        from: `${detailsClient.address}, Sektor 11`,
        to: detailsClient.address,
        deliverySum: 480_000,
        cash: 15_000,
        status: "Yakunlandi",
      },
      {
        id: "127",
        startedAt: "04.01.2026 - 14:05",
        endedAt: "04.01.2026 - 14:40",
        from: `${detailsClient.address}, Sektor 10`,
        to: detailsClient.address,
        deliverySum: 610_000,
        cash: 50_000,
        status: "Yakunlandi",
      },
      {
        id: "128",
        startedAt: "03.01.2026 - 11:30",
        endedAt: "03.01.2026 - 12:05",
        from: `${detailsClient.address}, Sektor 9`,
        to: detailsClient.address,
        deliverySum: 390_000,
        cash: 10_000,
        status: "Yakunlandi",
      },
      {
        id: "123",
        startedAt: "08.01.2026 - 18:00",
        endedAt: "08.01.2026 - 18:35",
        from: `${detailsClient.address}, Sektor 17`,
        to: detailsClient.address,
        deliverySum: 500_000,
        cash: 35_000,
        status: "Yakunlandi",
      },
      {
        id: "124",
        startedAt: "07.01.2026 - 12:20",
        endedAt: "07.01.2026 - 12:55",
        from: `${detailsClient.address}, Sektor 14`,
        to: detailsClient.address,
        deliverySum: 450_000,
        cash: 0,
        status: "Yakunlandi",
      },
      {
        id: "125",
        startedAt: "06.01.2026 - 09:10",
        endedAt: "06.01.2026 - 09:40",
        from: `${detailsClient.address}, Sektor 12`,
        to: detailsClient.address,
        deliverySum: 520_000,
        cash: 20_000,
        status: "Yakunlandi",
      },
      {
        id: "126",
        startedAt: "05.01.2026 - 18:00",
        endedAt: "05.01.2026 - 18:28",
        from: `${detailsClient.address}, Sektor 11`,
        to: detailsClient.address,
        deliverySum: 480_000,
        cash: 15_000,
        status: "Yakunlandi",
      },
      {
        id: "127",
        startedAt: "04.01.2026 - 14:05",
        endedAt: "04.01.2026 - 14:40",
        from: `${detailsClient.address}, Sektor 10`,
        to: detailsClient.address,
        deliverySum: 610_000,
        cash: 50_000,
        status: "Yakunlandi",
      },
      {
        id: "128",
        startedAt: "03.01.2026 - 11:30",
        endedAt: "03.01.2026 - 12:05",
        from: `${detailsClient.address}, Sektor 9`,
        to: detailsClient.address,
        deliverySum: 390_000,
        cash: 10_000,
        status: "Yakunlandi",
      },
    ];
  }, [detailsClient]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Mijozlar ro'yxati</h1>
          <div className={styles.breadcrumbs}>
            <span className={styles.crumb}>Boshqaruv paneli</span>
            <span className={styles.sep}>
              <BreadcrumbChevron />
            </span>
            <span className={styles.crumbActive}>Mijozlar ro'yxati</span>
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
                <th className={styles.thId}>
                  <span className={styles.thInner}>
                    Mijoz ID <SortIcon />
                  </span>
                </th>
                <th className={styles.thName}>Mijoz nomi</th>
                <th className={styles.thDate}>Ro'yxatdan o'tgan sana</th>
                <th className={styles.thBottles}>Butilkalar soni</th>
                <th className={styles.thPhone}>Telefon raqam</th>
                <th className={styles.thOrders}>Buyurtmalar soni</th>
                <th className={styles.thProfit}>Foyda keltirdi</th>
                <th className={styles.thActions} aria-hidden="true" />
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((r, idx) => (
                <tr
                  key={r.key}
                  className={`${styles.tr} ${styles.trClickable}`}
                  onClick={() => {
                    setDetailsClient(r);
                    setDetailsOpen(true);
                  }}
                >
                  <td className={styles.tdId}>{r.id}</td>
                  <td className={styles.tdName}>
                    <div className={styles.nameCell}>
                      <div className={styles.nameText}>{r.name}</div>
                    </div>
                  </td>
                  <td className={styles.tdDate}>{r.registeredAt}</td>
                  <td className={styles.tdMuted}>{r.bottles}</td>
                  <td className={styles.tdMuted}>{r.phone}</td>
                  <td className={styles.tdMuted}>{r.orders}</td>
                  <td className={styles.tdProfit}>
                    {formatMoneyUZS(r.profit)}
                  </td>
                  <td className={styles.tdActions}>
                    <div className={styles.actions}>
                      <button
                        type="button"
                        className={styles.iconBtn}
                        aria-label="Edit"
                        data-tooltip="Tahrirlash"
                        onClick={(e) => {
                          e.stopPropagation();
                          const realIndex = startIndex + idx;
                          setEditIndex(realIndex);
                          setEditName(r.name ?? "");
                          setEditAddress(r.address ?? "");
                          setEditPhone(formatUzPhone(r.phone ?? ""));
                          setEditBottles(String(r.bottles ?? 0));
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
                        onClick={(e) => {
                          e.stopPropagation();
                          const realIndex = startIndex + idx;
                          setDeleteIndex(realIndex);
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
            <span className={styles.total}>Jami mijozlar: {rows.length}</span>
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
        title="Mijoz Yaratish"
        onClose={closeCreate}
        className={styles.formModal}
        headerClassName={styles.formHeader}
        bodyClassName={styles.formBody}
      >
        <div className={styles.formGrid}>
          <div className={styles.field}>
            <div className={styles.label}>Mijoz nomi</div>
            <Input
              size="small"
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <div className={styles.label}>Manzil</div>
            <Input
              size="small"
              value={createAddress}
              onChange={(e) => setCreateAddress(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <div className={styles.label}>Telefon</div>
            <PhoneInput
              size="small"
              value={createPhone}
              onChange={setCreatePhone}
            />
          </div>
          <div className={styles.field}>
            <div className={styles.label}>Butilkalar soni</div>
            <Input
              size="small"
              value={createBottles}
              onChange={(e) => setCreateBottles(e.target.value)}
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
        title="Mijozni tahrirlash"
        onClose={closeEdit}
        className={styles.formModal}
        headerClassName={styles.formHeader}
        bodyClassName={styles.formBody}
      >
        <div className={styles.formGrid}>
          <div className={styles.field}>
            <div className={styles.label}>Mijoz nomi</div>
            <Input
              size="small"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <div className={styles.label}>Manzil</div>
            <Input
              size="small"
              value={editAddress}
              onChange={(e) => setEditAddress(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <div className={styles.label}>Telefon</div>
            <PhoneInput
              size="small"
              value={editPhone}
              onChange={setEditPhone}
            />
          </div>
          <div className={styles.field}>
            <div className={styles.label}>Butilkalar soni</div>
            <Input
              size="small"
              value={editBottles}
              onChange={(e) => setEditBottles(e.target.value)}
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
        title="Mijozni o'chirish"
        onClose={() => setDeleteOpen(false)}
      >
        <div className={styles.confirmText}>
          Ushbu mijozni o'chirishni xohlaysizmi?
        </div>
        <div className={styles.confirmMeta}>
          <span className={styles.metaLabel}>Mijoz ID:</span>{" "}
          <span className={styles.metaValue}>{deleteId}</span>
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

      <Modal
        open={detailsOpen}
        title={`${detailsClient?.name ?? ""} haqida ma'lumot`}
        onClose={closeDetails}
        className={styles.detailsModal}
        headerClassName={styles.detailsHeader}
        bodyClassName={styles.detailsBody}
      >
        {detailsClient ? (
          <div className={styles.detailsContent}>
            <div className={styles.detailsTop}>
              <div className={styles.statsCol}>
                <div className={styles.statsRow}>
                  <div className={styles.statCard}>
                    <div className={styles.statHead}>
                      <div className={styles.statLabel}>
                        Jami buyurtmalar soni
                      </div>
                      <div
                        className={`${styles.statBadge} ${styles.badgeGreen}`}
                      >
                        <svg
                          width="15"
                          height="10"
                          viewBox="0 0 15 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.77145 2.39645C2.96336 1.20453 4.83371 0 7.5 0C10.1663 0 12.0366 1.20453 13.2286 2.39645C13.8231 2.99096 14.2518 3.58461 14.5325 4.03047C14.6731 4.25379 14.7773 4.44117 14.8472 4.57464C14.8822 4.64141 14.9086 4.69479 14.9268 4.73255C14.9359 4.75144 14.9429 4.76643 14.9479 4.77725L14.9539 4.79032L14.9558 4.79445L14.9564 4.7959L14.9567 4.79646C14.9567 4.79646 14.9569 4.79693 14.5 5C14.9569 5.20307 14.9567 5.20354 14.9567 5.20354L14.9564 5.2041L14.9558 5.20555L14.9539 5.20968L14.9479 5.22275C14.9429 5.23357 14.9359 5.24856 14.9268 5.26745C14.9086 5.30521 14.8822 5.35859 14.8472 5.42536C14.7773 5.55883 14.6731 5.74621 14.5325 5.96953C14.2518 6.41539 13.8231 7.00904 13.2286 7.60355C12.0366 8.79547 10.1663 10 7.5 10C4.83371 10 2.96336 8.79547 1.77145 7.60355C1.17693 7.00904 0.748236 6.41539 0.467509 5.96953C0.326899 5.74621 0.222698 5.55883 0.152787 5.42536C0.117813 5.35859 0.0913644 5.30521 0.0731808 5.26745C0.0640873 5.24856 0.0570555 5.23357 0.0520531 5.22275L0.0460656 5.20968L0.0442045 5.20555L0.0435557 5.2041L0.0433016 5.20354C0.0433016 5.20354 0.0430942 5.20307 0.5 5C0.0430942 4.79693 0.0433016 4.79646 0.0433016 4.79646L0.0435557 4.7959L0.0442045 4.79445L0.0460656 4.79032L0.0520531 4.77725C0.0570555 4.76643 0.0640873 4.75144 0.0731808 4.73255C0.0913644 4.69479 0.117813 4.64141 0.152787 4.57464C0.222698 4.44117 0.326899 4.25379 0.467509 4.03047C0.748236 3.58461 1.17693 2.99096 1.77145 2.39645ZM0.5 5L0.0430942 4.79693C-0.0143647 4.92621 -0.0143647 5.07379 0.0430942 5.20307L0.5 5ZM1.05906 5C1.11788 5.11018 1.20235 5.25981 1.31374 5.43672C1.56426 5.83461 1.94807 6.36596 2.47855 6.89645C3.53664 7.95453 5.16629 9 7.5 9C9.83371 9 11.4634 7.95453 12.5214 6.89645C13.0519 6.36596 13.4357 5.83461 13.6863 5.43672C13.7976 5.25981 13.8821 5.11018 13.9409 5C13.8821 4.88982 13.7976 4.74019 13.6863 4.56328C13.4357 4.16539 13.0519 3.63404 12.5214 3.10355C11.4634 2.04547 9.83371 1 7.5 1C5.16629 1 3.53664 2.04547 2.47855 3.10355C1.94807 3.63404 1.56426 4.16539 1.31374 4.56328C1.20235 4.74019 1.11788 4.88982 1.05906 5ZM14.5 5L14.9569 5.20307C15.0144 5.07379 15.0144 4.92621 14.9569 4.79693L14.5 5Z"
                            fill="#FDFCFF"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.5 3C6.39543 3 5.5 3.89543 5.5 5C5.5 6.10457 6.39543 7 7.5 7C8.60457 7 9.5 6.10457 9.5 5C9.5 3.89543 8.60457 3 7.5 3ZM4.5 5C4.5 3.34315 5.84315 2 7.5 2C9.15685 2 10.5 3.34315 10.5 5C10.5 6.65685 9.15685 8 7.5 8C5.84315 8 4.5 6.65685 4.5 5Z"
                            fill="#FDFCFF"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className={styles.statValue}>
                      {(detailsClient.orders ?? 0).toLocaleString("ru-RU")}
                    </div>
                  </div>

                  <div className={styles.statCard}>
                    <div className={styles.statHead}>
                      <div className={styles.statLabel}>Butilkalar soni</div>
                      <div
                        className={`${styles.statBadge} ${styles.badgePurple}`}
                      >
                        <svg
                          width="14"
                          height="13"
                          viewBox="0 0 14 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.625 4.0075C13.4842 3.84795 13.3111 3.72019 13.1171 3.63269C12.9231 3.54519 12.7128 3.49996 12.5 3.5H9V2.5C9 1.83696 8.73661 1.20107 8.26777 0.732233C7.79893 0.263392 7.16304 1.28189e-07 6.5 1.28189e-07C6.40711 -6.63752e-05 6.31604 0.0257445 6.237 0.0745385C6.15795 0.123333 6.09407 0.19318 6.0525 0.27625L3.69125 5H1C0.734784 5 0.48043 5.10536 0.292893 5.29289C0.105357 5.48043 0 5.73478 0 6V11.5C0 11.7652 0.105357 12.0196 0.292893 12.2071C0.48043 12.3946 0.734784 12.5 1 12.5H11.75C12.1154 12.5001 12.4684 12.3668 12.7425 12.1252C13.0166 11.8835 13.1931 11.5501 13.2388 11.1875L13.9888 5.1875C14.0153 4.97626 13.9966 4.76179 13.9339 4.55833C13.8712 4.35488 13.7659 4.16711 13.625 4.0075ZM1 6H3.5V11.5H1V6ZM12.9963 5.0625L12.2463 11.0625C12.231 11.1834 12.1722 11.2945 12.0808 11.3751C11.9895 11.4556 11.8718 11.5 11.75 11.5H4.5V5.61812L6.79437 1.02875C7.13443 1.09681 7.4404 1.2806 7.66021 1.54884C7.88002 1.81708 8.0001 2.1532 8 2.5V4C8 4.13261 8.05268 4.25979 8.14645 4.35355C8.24021 4.44732 8.36739 4.5 8.5 4.5H12.5C12.571 4.49998 12.6411 4.51505 12.7058 4.54423C12.7704 4.5734 12.8282 4.61601 12.8751 4.66922C12.9221 4.72242 12.9571 4.78501 12.978 4.85282C12.9989 4.92063 13.0051 4.9921 12.9963 5.0625Z"
                            fill="#2A2B2A"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className={styles.statValue}>
                      {detailsClient.bottles ?? 0}
                    </div>
                  </div>
                </div>

                <div className={styles.statCardWide}>
                  <div className={styles.statHead}>
                    <div className={styles.statLabel}>Foyda keltirdi</div>
                    <div className={`${styles.statBadge} ${styles.badgeBlue}`}>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.00004 1.00004V0.500041C5.00004 0.367433 5.05272 0.240256 5.14649 0.146488C5.24026 0.0527195 5.36743 4.11376e-05 5.50004 4.11376e-05C5.63265 4.11376e-05 5.75983 0.0527195 5.85359 0.146488C5.94736 0.240256 6.00004 0.367433 6.00004 0.500041V1.00004C6.00004 1.13265 5.94736 1.25983 5.85359 1.35359C5.75983 1.44736 5.63265 1.50004 5.50004 1.50004C5.36743 1.50004 5.24026 1.44736 5.14649 1.35359C5.05272 1.25983 5.00004 1.13265 5.00004 1.00004ZM0.500041 6.00004H1.00004C1.13265 6.00004 1.25983 5.94736 1.35359 5.85359C1.44736 5.75983 1.50004 5.63265 1.50004 5.50004C1.50004 5.36743 1.44736 5.24026 1.35359 5.14649C1.25983 5.05272 1.13265 5.00004 1.00004 5.00004H0.500041C0.367433 5.00004 0.240256 5.05272 0.146488 5.14649C0.0527195 5.24026 4.11376e-05 5.36743 4.11376e-05 5.50004C4.11376e-05 5.63265 0.0527195 5.75983 0.146488 5.85359C0.240256 5.94736 0.367433 6.00004 0.500041 6.00004ZM7.27629 1.94754C7.33505 1.97697 7.39903 1.99452 7.46458 1.9992C7.53013 2.00388 7.59596 1.99559 7.6583 1.97481C7.72064 1.95403 7.77827 1.92117 7.82791 1.87809C7.87754 1.83502 7.91819 1.78259 7.94754 1.72379L8.44754 0.723791C8.50688 0.60519 8.51668 0.467872 8.47478 0.342047C8.43288 0.216222 8.34271 0.112196 8.2241 0.0528537C8.1055 -0.00648853 7.96818 -0.0162859 7.84236 0.0256167C7.71653 0.0675194 7.61251 0.15769 7.55317 0.276291L7.05317 1.27629C7.02372 1.33501 7.00613 1.39896 7.00141 1.46448C6.99668 1.53 7.00492 1.59581 7.02564 1.65815C7.04636 1.72049 7.07916 1.77813 7.12217 1.82779C7.16518 1.87744 7.21755 1.91814 7.27629 1.94754ZM1.27629 7.05317L0.276291 7.55317C0.15769 7.61251 0.0675194 7.71653 0.0256167 7.84236C-0.0162859 7.96818 -0.00648853 8.1055 0.0528537 8.2241C0.112196 8.34271 0.216222 8.43288 0.342047 8.47478C0.467872 8.51668 0.60519 8.50688 0.723791 8.44754L1.72379 7.94754C1.78252 7.91816 1.83488 7.8775 1.87789 7.82788C1.9209 7.77826 1.95372 7.72065 1.97447 7.65835C1.99521 7.59605 2.00349 7.53027 1.99881 7.46477C1.99414 7.39927 1.97661 7.33533 1.94723 7.2766C1.91785 7.21788 1.87718 7.16552 1.82756 7.1225C1.77794 7.07949 1.72034 7.04668 1.65804 7.02593C1.59573 7.00518 1.52995 6.99691 1.46445 7.00158C1.39895 7.00625 1.33502 7.02378 1.27629 7.05317ZM13.2069 11C13.2998 11.0929 13.3735 11.2032 13.4237 11.3245C13.474 11.4458 13.4999 11.5759 13.4999 11.7072C13.4999 11.8386 13.474 11.9686 13.4237 12.09C13.3735 12.2113 13.2998 12.3216 13.2069 12.4144L12.4144 13.2069C12.3216 13.2998 12.2113 13.3735 12.09 13.4237C11.9686 13.474 11.8386 13.4999 11.7072 13.4999C11.5759 13.4999 11.4458 13.474 11.3245 13.4237C11.2032 13.3735 11.0929 13.2998 11 13.2069L7.79379 10L6.68754 12.8807C6.68754 12.8869 6.68254 12.8938 6.67942 12.9007C6.60289 13.0791 6.47558 13.231 6.31332 13.3376C6.15107 13.4442 5.96104 13.5007 5.76692 13.5H5.71754C5.51508 13.4915 5.32014 13.4209 5.15907 13.298C4.998 13.175 4.87856 13.0056 4.81692 12.8125L1.55004 2.80754C1.49396 2.63256 1.48717 2.44552 1.53042 2.26694C1.57367 2.08836 1.66529 1.92514 1.79522 1.79522C1.92514 1.66529 2.08836 1.57367 2.26694 1.53042C2.44552 1.48717 2.63256 1.49396 2.80754 1.55004L12.8125 4.81692C13.0038 4.88088 13.1712 5.00116 13.2928 5.16196C13.4145 5.32277 13.4847 5.51659 13.4942 5.718C13.5037 5.91941 13.4521 6.11899 13.3462 6.29056C13.2403 6.46213 13.085 6.59768 12.9007 6.67942L12.8807 6.68754L10 7.79317L13.2069 11ZM12.5 11.7069L9.29317 8.50004C9.17774 8.38482 9.09224 8.24312 9.04413 8.08729C8.99601 7.93146 8.98674 7.76622 9.01713 7.60599C9.04751 7.44575 9.11662 7.29538 9.21844 7.16797C9.32026 7.04057 9.4517 6.94001 9.60129 6.87504L9.62129 6.86629L12.4932 5.76379L2.50004 2.50004L5.76254 12.4913L6.86567 9.61629C6.86567 9.60942 6.87067 9.60254 6.87379 9.59567C6.93878 9.44619 7.03932 9.31486 7.16666 9.21312C7.294 9.11138 7.44428 9.04231 7.60442 9.01192C7.66626 9.00045 7.72902 8.99459 7.79192 8.99442C8.05687 8.9947 8.31088 9.10013 8.49817 9.28754L11.7069 12.5L12.5 11.7069Z"
                          fill="#2A2B2A"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className={styles.statValue}>
                    {formatMoneyUZS(detailsClient.profit)} so'm
                  </div>
                </div>
              </div>

              <div className={styles.infoCol}>
                <div className={styles.infoGrid3}>
                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Manzil-1</div>
                    <div className={styles.infoValue}>
                      {detailsClient.address}
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Manzil-2</div>
                    <div className={styles.infoValue}>
                      {detailsClient.address}
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Manzil-3</div>
                    <div className={styles.infoValue}>
                      {detailsClient.address}
                    </div>
                  </div>
                </div>

                <div className={styles.infoGrid2}>
                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>
                      Ro'yxatdan o'tgan sana
                    </div>
                    <div className={styles.infoValue}>
                      {detailsClient.registeredAt}
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Telefon raqam</div>
                    <div className={styles.infoValue}>
                      {detailsClient.phone}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.historySection}>
              <div className={styles.historyTitle}>Buyurtmalar tarixi</div>
              <div className={styles.historyList}>
                {detailsOrders.map((o, i) => (
                  <div key={`${o.id}-${i}`} className={styles.orderCard}>
                    <div className={styles.orderHead}>
                      <div className={styles.orderNo}>
                        Buyurtma raqami – №{o.id}
                      </div>
                      <div className={styles.orderMeta}>
                        <span className={styles.orderMetaItem}>
                          Boshlanish vaqti: {o.startedAt}
                        </span>
                        <span className={styles.orderMetaItem}>
                          Tugash vaqti: {o.endedAt}
                        </span>
                      </div>
                      <div className={styles.orderStatus}>{o.status}</div>
                    </div>

                    <div className={styles.orderBody}>
                      <div className={styles.orderCell}>
                        <div className={styles.orderValue}>{o.from}</div>
                        <div className={styles.orderLabel}>
                          Suv olish manzili
                        </div>
                      </div>
                      <div className={styles.orderCell}>
                        <div className={styles.orderValue}>{o.to}</div>
                        <div className={styles.orderLabel}>Manzili</div>
                      </div>
                      <div className={styles.orderCell}>
                        <div className={styles.orderValue}>
                          {formatMoneyUZS(o.deliverySum)} so'm
                        </div>
                        <div className={styles.orderLabel}>
                          Yetkazib berish summasi
                        </div>
                      </div>
                      <div className={styles.orderCell}>
                        <div className={styles.orderValue}>
                          {formatMoneyUZS(o.cash)} so'm
                        </div>
                        <div className={styles.orderLabel}>Naqd pul bilan</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
