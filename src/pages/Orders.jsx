import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import DateRangePicker from "@/components/DateRangePicker/DateRangePicker";
import styles from "./Orders.module.css";
import productImg from "../assets/images/munavaraA product.jpg";

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

function EyeIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.41791 7.77986C10.4538 7.77986 12.1042 6.1362 12.1042 4.10867C12.1042 2.08114 10.4538 0.4375 8.41791 0.4375C6.38208 0.4375 4.73171 2.08114 4.73171 4.10867C4.73171 5.0478 5.16034 5.73084 5.16034 5.73084L0.702573 10.1704C0.502542 10.3696 0.222501 10.8875 0.702573 11.3656L1.21693 11.8779C1.41695 12.0486 1.91986 12.2877 2.33135 11.8779L2.93143 11.2803C3.53152 11.8779 4.21733 11.5364 4.47451 11.1949C4.90314 10.5972 4.38878 9.99962 4.38878 9.99962L4.56023 9.82888C5.38318 10.6485 6.1033 10.1704 6.36049 9.82888C6.78913 9.23125 6.36049 8.63363 6.36049 8.63363C6.18905 8.29208 5.84617 8.29208 6.27474 7.86526L6.78913 7.35297C7.20061 7.69446 8.04644 7.77986 8.41791 7.77986Z"
        stroke="#212B36"
        strokeWidth="0.875"
        strokeLinejoin="round"
      />
      <path
        d="M9.70407 4.10877C9.70407 4.81605 9.12837 5.3894 8.41822 5.3894C7.70802 5.3894 7.13232 4.81605 7.13232 4.10877C7.13232 3.40149 7.70802 2.82812 8.41822 2.82812C9.12837 2.82812 9.70407 3.40149 9.70407 4.10877Z"
        stroke="#212B36"
        strokeWidth="0.875"
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

function PrintIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.77083 9.76066C1.86465 9.73336 1.32416 9.63227 0.950063 9.25818C0.4375 8.7456 0.4375 7.92065 0.4375 6.27075C0.4375 4.62083 0.4375 3.79588 0.950063 3.28332C1.46263 2.77075 2.28758 2.77075 3.9375 2.77075H8.60417C10.2541 2.77075 11.079 2.77075 11.5916 3.28332C12.1042 3.79588 12.1042 4.62083 12.1042 6.27075C12.1042 7.92065 12.1042 8.7456 11.5916 9.25818C11.2175 9.63227 10.677 9.73336 9.77083 9.76066"
        stroke="#212B36"
        strokeWidth="0.875"
      />
      <path
        d="M10.2085 6.27083C10.2085 6.02922 10.0126 5.83333 9.771 5.83333C9.52938 5.83333 9.3335 6.02922 9.3335 6.27083H10.2085ZM3.2085 6.27083C3.2085 6.02922 3.01262 5.83333 2.771 5.83333C2.52937 5.83333 2.3335 6.02922 2.3335 6.27083H3.2085ZM9.3335 8.60417C9.3335 9.44148 9.33256 10.0255 9.27336 10.4661C9.21578 10.8942 9.11055 11.1208 8.94908 11.2823L9.56782 11.901C9.91893 11.5498 10.07 11.1078 10.1405 10.5827C10.2094 10.0702 10.2085 9.41675 10.2085 8.60417H9.3335ZM6.271 12.5417C7.08358 12.5417 7.73703 12.5426 8.24955 12.4737C8.7746 12.4031 9.21665 12.2521 9.56782 11.901L8.94908 11.2823C8.78761 11.4437 8.56099 11.549 8.13294 11.6065C7.69229 11.6657 7.10831 11.6667 6.271 11.6667V12.5417ZM6.271 0.875001C7.10831 0.875001 7.69229 0.875928 8.13294 0.935171C8.56099 0.992717 8.78761 1.09798 8.94908 1.25942L9.56782 0.640705C9.21665 0.289585 8.7746 0.138566 8.24955 0.0679707C7.73703 -0.000926834 7.08358 6.37501e-07 6.271 6.37501e-07V0.875001ZM6.271 6.37501e-07C5.45841 6.37501e-07 4.80495 -0.000926834 4.29248 0.0679707C3.76741 0.138566 3.32532 0.289585 2.9742 0.640705L3.59292 1.25942C3.75436 1.09798 3.98103 0.992717 4.40907 0.935171C4.84969 0.875928 5.43368 0.875001 6.271 0.875001V6.37501e-07ZM2.3335 8.60417C2.3335 9.41675 2.33257 10.0702 2.40147 10.5827C2.47206 11.1078 2.62308 11.5498 2.9742 11.901L3.59292 11.2823C3.43148 11.1208 3.32621 10.8942 3.26867 10.4661C3.20942 10.0255 3.2085 9.44148 3.2085 8.60417H2.3335ZM6.271 11.6667C5.43368 11.6667 4.84969 11.6657 4.40907 11.6065C3.98103 11.549 3.75436 11.4437 3.59292 11.2823L2.9742 11.901C3.32532 12.2521 3.76741 12.4031 4.29248 12.4737C4.80495 12.5426 5.45841 12.5417 6.271 12.5417V11.6667ZM10.1982 2.75766C10.1711 1.85804 10.0765 1.14938 9.56782 0.640705L8.94908 1.25942C9.1886 1.49893 9.2961 1.87128 9.32358 2.78401L10.1982 2.75766ZM3.2184 2.78401C3.24591 1.87128 3.35341 1.49893 3.59292 1.25942L2.9742 0.640705C2.46552 1.14938 2.37091 1.85804 2.3438 2.75766L3.2184 2.78401ZM10.2085 8.60417V6.27083H9.3335V8.60417H10.2085ZM3.2085 8.60417V6.27083H2.3335V8.60417H3.2085Z"
        fill="#212B36"
      />
      <path
        d="M10.646 6.52955C9.69685 6.10337 8.26104 5.68774 6.271 5.68774C4.28098 5.68774 2.84515 6.10337 1.896 6.52955"
        stroke="#212B36"
        strokeWidth="0.875"
        strokeLinecap="round"
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

export default function Orders() {
  const [range, setRange] = useState(null);
  const [courier, setCourier] = useState("Andy Smith");
  const [assignOpen, setAssignOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState(null);

  const [createOpen, setCreateOpen] = useState(false);
  const [createVolume, setCreateVolume] = useState("25L");
  const [createQty, setCreateQty] = useState(10);
  const [createClient, setCreateClient] = useState("Andy Smith");
  const [createAddress, setCreateAddress] = useState("Chilonzor, 12-mavze");
  const [createPaid, setCreatePaid] = useState("100,000 Som");
  const [createRemaining, setCreateRemaining] = useState("150,000 Som");
  const [createOrderType, setCreateOrderType] = useState("Butilka bilan");
  const [createRemainingPayType, setCreateRemainingPayType] = useState("Naqd");

  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const printOrder = (order) => {
    const createdAt = escapeHtml(order?.createdAt);
    const orderId = escapeHtml(order?.productId);
    const productName = escapeHtml(order?.productName);
    const client = escapeHtml(order?.client);
    const phone = escapeHtml(order?.phone);
    const address = escapeHtml(order?.address);
    const courierName = escapeHtml(order?.courier);
    const size = escapeHtml(order?.size);
    const qty = escapeHtml(order?.qty);
    const orderType = escapeHtml(order?.orderType);
    const payment = escapeHtml(order?.payment);
    const orderSum = escapeHtml(order?.orderSum);
    const clientPays = escapeHtml(order?.clientPays);
    const shortage = escapeHtml(order?.shortage);
    const shortageReason = escapeHtml(order?.shortageReason);

    const iframe = document.createElement("iframe");
    iframe.setAttribute("title", "print");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);

    const w = iframe.contentWindow;
    if (!w) {
      document.body.removeChild(iframe);
      return;
    }

    const cleanup = () => {
      try {
        document.body.removeChild(iframe);
      } catch {
        // ignore
      }
    };

    const html = `<!doctype html>
<html lang="uz">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Buyurtma cheki</title>
    <style>
      @page { size: A4; margin: 0; }
      html, body { width: 210mm; height: 297mm; margin: 0; padding: 0; }
      body { font-family: Arial, Helvetica, sans-serif; color: #111827; }

      .page {
        width: 210mm;
        height: 297mm;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
      }

      .slot {
        width: calc(210mm / 2);
        height: calc(297mm / 2);
        box-sizing: border-box;
        padding: 8mm;
      }

      .receipt {
        height: 100%;
        border: 1px solid #111827;
        border-radius: 6px;
        padding: 8mm;
        box-sizing: border-box;
        display: grid;
        grid-template-rows: auto auto 1fr auto;
        gap: 8px;
      }

      .title {
        font-size: 16px;
        font-weight: 700;
        text-align: center;
        margin: 0;
      }

      .sub {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        font-size: 11px;
      }

      .grid {
        display: grid;
        gap: 6px;
        font-size: 12px;
      }

      .row {
        display: grid;
        grid-template-columns: 110px 1fr;
        gap: 8px;
      }

      .label { color: #6b7280; }
      .value { font-weight: 600; }

      .footer {
        border-top: 1px dashed #9ca3af;
        padding-top: 8px;
        font-size: 10px;
        color: #6b7280;
        display: flex;
        justify-content: space-between;
        gap: 8px;
      }

      /* screen preview */
      @media screen {
        body { background: #f3f4f6; }
        .page { margin: 12px auto; box-shadow: 0 0 0 1px #e5e7eb; background: #fff; }
      }
    </style>
  </head>
  <body>
    <div class="page">
      <div class="slot">
        <div class="receipt">
          <h1 class="title">Buyurtma cheki</h1>
          <div class="sub">
            <div><span class="label">ID:</span> <span class="value">${orderId}</span></div>
            <div><span class="label">Sana:</span> <span class="value">${createdAt}</span></div>
          </div>

          <div class="grid">
            <div class="row"><div class="label">Mahsulot</div><div class="value">${productName}</div></div>
            <div class="row"><div class="label">Mijoz</div><div class="value">${client}</div></div>
            <div class="row"><div class="label">Telefon</div><div class="value">${phone}</div></div>
            <div class="row"><div class="label">Manzil</div><div class="value">${address}</div></div>
            <div class="row"><div class="label">Kuryer</div><div class="value">${courierName}</div></div>
            <div class="row"><div class="label">Hajm</div><div class="value">${size}</div></div>
            <div class="row"><div class="label">Miqdor</div><div class="value">${qty}</div></div>
            <div class="row"><div class="label">Turi</div><div class="value">${orderType}</div></div>
            <div class="row"><div class="label">To'lov</div><div class="value">${payment}</div></div>
            <div class="row"><div class="label">Summa</div><div class="value">${orderSum}</div></div>
            <div class="row"><div class="label">Mijoz to'laydi</div><div class="value">${clientPays}</div></div>
            <div class="row"><div class="label">Yetishmovchilik</div><div class="value">${shortage}</div></div>
            <div class="row"><div class="label">Sabab</div><div class="value">${shortageReason}</div></div>
          </div>

          <div class="footer">
            <div>Admin panel</div>
            <div>Chop etildi</div>
          </div>
        </div>
      </div>
      <div class="slot"></div>
      <div class="slot"></div>
      <div class="slot"></div>
    </div>
  </body>
</html>`;

    const doc = w.document;
    doc.open();
    doc.write(html);
    doc.close();

    const afterPrintHandler = () => {
      w.removeEventListener("afterprint", afterPrintHandler);
      cleanup();
    };

    w.addEventListener("afterprint", afterPrintHandler);

    // Give the iframe a moment to layout before printing.
    w.requestAnimationFrame(() => {
      w.focus();
      w.print();
    });
  };

  const orderSums = useMemo(
    () => [
      "100,000 som",
      "100,000 som",
      "700,000 som",
      "100,000 som",
      "100,000 som",
      "100,000 som",
      "100,000 som",
      "100,000 som",
      "100,000 som",
      "100,000 som",
    ],
    [],
  );

  const createdDates = useMemo(
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
      Array.from({ length: 50 }).map((_, i) => ({
        productId: 123182 + i,
        productName: "Suv 25 litr",
        client: "Andy Smith",
        phone: "+998 (00) 000-00-00",
        address: "Chilonzor, 12-mavze",
        courier: "Andy Smith",
        orderSum: orderSums[i % orderSums.length],
        createdAt: createdDates[i % createdDates.length],
        size: "25-L",
        qty: ["3-Dona", "4-Dona", "5-Dona", "3-Dona"][i % 4],
        orderType: ["Suvni o'zi", "Butilka bilan"][i % 2],
        payment: ["Naqd", "Karta"][i % 2],
        clientPays: ["100,000 som", "150,000 som"][i % 2],
        shortage: i === 0 ? "100,000 som" : "Yoq",
        shortageReason: "Mijoz summani ertaga berishga va’da berdi.",
      })),
    [createdDates, orderSums],
  );

  const [rows, setRows] = useState(initialRows);

  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(4);
  const totalPages = 15;
  const pages = [1, 2, 3, 4, "ellipsis", totalPages];

  const activeOrder = rows[0];
  const couriers = useMemo(
    () => [
      { name: "Andy Smith", rating: 4.5 },
      { name: "John Doe", rating: 4.2 },
      { name: "Jane Doe", rating: 4.7 },
      { name: "Sam Wilson", rating: 4.1 },
      { name: "Mary Johnson", rating: 4.6 },
      { name: "Alex Brown", rating: 4.0 },
    ],
    [],
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Buyurtma</h1>
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
            <span className={styles.crumbActive}>Buyurtma</span>
          </div>
        </div>

        <Button
          type="button"
          className={styles.createBtn}
          onClick={() => setCreateOpen(true)}
          size="small"
        >
          Yaratish
        </Button>
      </div>

      <div className={styles.toolbar}>
        <DateRangePicker onChange={setRange} align="left" />
        <select
          className={styles.filterSelect}
          value={courier}
          onChange={(e) => setCourier(e.target.value)}
          aria-label="Courier"
        >
          <option>Andy Smith</option>
          <option>John Doe</option>
          <option>Jane Doe</option>
        </select>
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
                <th className={styles.thAddr}>Manzil</th>
                <th className={styles.thCourier}>Kuryer</th>
                <th className={styles.thSum}>Buyurtma summasi</th>
                <th className={styles.thCreated}>Buyurtma yaratildi</th>
                <th className={styles.thSize}>Hajmi litrda</th>
                <th className={styles.thQty}>Miqdor</th>
                <th className={styles.thType}>Buyurtma turi</th>
                <th className={styles.thPay}>Payment</th>
                <th className={styles.thPays}>Mijoz to'ladı</th>
                <th className={styles.thShort}>Yetishmovchilik</th>
                <th className={styles.thReason}>Nima uchun yetarli emas</th>
                <th className={styles.thActions} aria-hidden="true" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.productId} className={styles.tr}>
                  <td className={styles.tdId}>{r.productId}</td>
                  <td className={styles.tdName}>
                    <div className={styles.nameCell}>
                      <ProductThumb />
                      <span className={styles.nameText}>{r.productName}</span>
                    </div>
                  </td>
                  <td className={styles.tdMuted}>{r.client}</td>
                  <td className={styles.tdMuted}>{r.phone}</td>
                  <td className={styles.tdMuted}>{r.address}</td>
                  <td className={styles.tdMuted}>{r.courier}</td>
                  <td className={styles.tdMuted}>{r.orderSum}</td>
                  <td className={styles.tdMuted}>{r.createdAt}</td>
                  <td className={styles.tdMuted}>{r.size}</td>
                  <td className={styles.tdMuted}>{r.qty}</td>
                  <td className={styles.tdMuted}>{r.orderType}</td>
                  <td className={styles.tdMuted}>{r.payment}</td>
                  <td className={styles.tdMuted}>{r.clientPays}</td>
                  <td
                    className={
                      r.shortage === "Yoq" ? styles.tdMuted : styles.tdDanger
                    }
                  >
                    {r.shortage}
                  </td>
                  <td className={styles.tdReason}>{r.shortageReason}</td>
                  <td className={styles.tdActions}>
                    <div className={styles.actions}>
                      <button
                        type="button"
                        className={styles.iconBtn}
                        data-tooltip="Kuryer biriktirish"
                        aria-label="View"
                        onClick={() => {
                          console.log("create order", { range, courier });
                          setAssignOpen(true);
                        }}
                      >
                        <EyeIcon />
                      </button>
                      <button
                        type="button"
                        className={styles.iconBtn}
                        data-tooltip="Buyurtmani o'chirish"
                        aria-label="Delete"
                        onClick={() => {
                          setDeleteOrderId(r.productId);
                          setDeleteOpen(true);
                        }}
                      >
                        <TrashIcon />
                      </button>
                      <button
                        type="button"
                        className={styles.iconBtn}
                        data-tooltip="Buyurtma malumotlarni chop etish"
                        aria-label="Print"
                        onClick={() => {
                          printOrder(r);
                        }}
                      >
                        <PrintIcon />
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
        title="Buyurtmani yaratish"
        onClose={() => setCreateOpen(false)}
        className={styles.createOrderModal}
        headerClassName={styles.createOrderHeader}
        bodyClassName={styles.createOrderBody}
      >
        <div className={styles.createOrderContent}>
          <div className={styles.createProductPanel}>
            <div className={styles.createProductCard}>
              <div className={styles.createProductBadges}>
                <button
                  type="button"
                  className={
                    createVolume === "10L"
                      ? `${styles.createBadge} ${styles.createBadgeActive}`
                      : styles.createBadge
                  }
                  onClick={() => setCreateVolume("10L")}
                >
                  10L
                </button>
                <button
                  type="button"
                  className={
                    createVolume === "25L"
                      ? `${styles.createBadge} ${styles.createBadgeActive}`
                      : styles.createBadge
                  }
                  onClick={() => setCreateVolume("25L")}
                >
                  25L
                </button>
              </div>

              <div className={styles.createPrice}>450,000 so’m</div>

              <div className={styles.createStepper}>
                <button
                  type="button"
                  className={styles.stepBtn}
                  aria-label="Minus"
                  onClick={() => setCreateQty((q) => (q > 1 ? q - 1 : q))}
                >
                  −
                </button>
                <div className={styles.stepValue}>{createQty}</div>
                <button
                  type="button"
                  className={styles.stepBtn}
                  aria-label="Plus"
                  onClick={() => setCreateQty((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className={styles.createFormPanel}>
            <div className={styles.createFormGrid}>
              <div className={styles.createField}>
                <div className={styles.createLabel}>Mijoz</div>
                <select
                  className={`${styles.createFieldControl} ${styles.createSelect}`}
                  value={createClient}
                  onChange={(e) => setCreateClient(e.target.value)}
                  aria-label="Mijoz"
                >
                  <option>Andy Smith</option>
                  <option>John Doe</option>
                  <option>Jane Doe</option>
                </select>
              </div>

              <div className={styles.createField}>
                <div className={styles.createLabel}>Manzil</div>
                <Input
                  size="small"
                  className={styles.createFieldControl}
                  value={createAddress}
                  onChange={(e) => setCreateAddress(e.target.value)}
                  aria-label="Manzil"
                />
              </div>

              <div className={styles.createField}>
                <div className={styles.createLabel}>Mijoz tolabergan summa</div>
                <Input
                  size="small"
                  className={styles.createFieldControl}
                  value={createPaid}
                  onChange={(e) => setCreatePaid(e.target.value)}
                  aria-label="Mijoz tolabergan summa"
                />
              </div>

              <div className={styles.createField}>
                <div className={styles.createLabel}>Qolgan summa</div>
                <Input
                  size="small"
                  className={styles.createFieldControl}
                  value={createRemaining}
                  onChange={(e) => setCreateRemaining(e.target.value)}
                  aria-label="Qolgan summa"
                />
              </div>

              <div className={styles.createField}>
                <div className={styles.createLabel}>Buyurtma turi</div>
                <select
                  className={`${styles.createFieldControl} ${styles.createSelect}`}
                  value={createOrderType}
                  onChange={(e) => setCreateOrderType(e.target.value)}
                  aria-label="Buyurtma turi"
                >
                  <option>Suvni o'zi</option>
                  <option>Butilka bilan</option>
                </select>
              </div>

              <div className={styles.createField}>
                <div className={styles.createLabel}>
                  Qolgan summani to'lash turi
                </div>
                <select
                  className={`${styles.createFieldControl} ${styles.createSelect}`}
                  value={createRemainingPayType}
                  onChange={(e) => setCreateRemainingPayType(e.target.value)}
                  aria-label="Qolgan summani to'lash turi"
                >
                  <option>Naqd</option>
                  <option>Karta</option>
                </select>
              </div>
            </div>

            <div className={styles.createFormFooter}>
              <Button
                type="button"
                size="small"
                className={styles.createSubmitBtn}
                onClick={() => {
                  console.log("create order", {
                    volume: createVolume,
                    qty: createQty,
                    client: createClient,
                    address: createAddress,
                    paid: createPaid,
                    remaining: createRemaining,
                    orderType: createOrderType,
                    remainingPayType: createRemainingPayType,
                  });
                  setCreateOpen(false);
                }}
              >
                Yaratish
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        open={assignOpen}
        title="Kuryerni tayinlash"
        onClose={() => setAssignOpen(false)}
        className={styles.assignModal}
        headerClassName={styles.assignHeader}
        bodyClassName={styles.assignBody}
      >
        <div className={styles.assignSection}>
          <div className={styles.assignSectionTitle}>Buyurtma axboroti</div>
          <div className={styles.orderInfoGrid}>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Manzil</div>
              <div className={styles.infoValue}>{activeOrder?.address}</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Telefon raqam</div>
              <div className={styles.infoValue}>{activeOrder?.phone}</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Mijoz</div>
              <div className={styles.infoValue}>{activeOrder?.client}</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Mahsulot nomi</div>
              <div className={styles.infoValue}>{activeOrder?.productName}</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Buyurtma yaratildi</div>
              <div className={styles.infoValue}>{activeOrder?.createdAt}</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Hajmi litrda</div>
              <div className={styles.infoValue}>{activeOrder?.size}</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Miqdor</div>
              <div className={styles.infoValue}>{activeOrder?.qty}</div>
            </div>
          </div>
        </div>

        <div className={styles.assignSection}>
          <div className={styles.assignSectionTitle}>Kuryerlar</div>
          <div className={styles.courierGrid}>
            {couriers.map((c) => (
              <div key={c.name} className={styles.courierCard}>
                <div className={styles.courierMeta}>
                  <div className={styles.courierName}>{c.name}</div>
                  <div className={styles.courierRating}>
                    <span className={styles.courierScore}>
                      {Number(c.rating).toFixed(1)}
                    </span>
                    <span className={styles.star} aria-hidden="true">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.15316 3.40838C8.4198 1.13613 9.0531 0 10 0C10.9469 0 11.5802 1.13612 12.8468 3.40837L13.1745 3.99623C13.5345 4.64193 13.7144 4.96479 13.9951 5.17781C14.2757 5.39083 14.6251 5.4699 15.3241 5.62805L15.9605 5.77203C18.4201 6.32856 19.65 6.60682 19.9426 7.54773C20.2352 8.4886 19.3968 9.4691 17.7199 11.4299L17.2861 11.9372C16.8096 12.4944 16.5713 12.773 16.4641 13.1177C16.357 13.4624 16.393 13.8341 16.465 14.5776L16.5306 15.2544C16.7841 17.8706 16.9109 19.1787 16.1449 19.7602C15.3788 20.3417 14.2273 19.8115 11.9243 18.7512L11.3285 18.4768C10.6741 18.1755 10.3469 18.0248 10 18.0248C9.6531 18.0248 9.3259 18.1755 8.6715 18.4768L8.0757 18.7512C5.77268 19.8115 4.62118 20.3417 3.85515 19.7602C3.08912 19.1787 3.21588 17.8706 3.4694 15.2544L3.53498 14.5776C3.60703 13.8341 3.64305 13.4624 3.53586 13.1177C3.42868 12.773 3.19043 12.4944 2.71392 11.9372L2.2801 11.4299C0.603252 9.4691 -0.235178 8.4886 0.0574219 7.54773C0.350022 6.60682 1.57986 6.32856 4.03954 5.77203L4.67589 5.62805C5.37485 5.4699 5.72433 5.39083 6.00494 5.17781C6.28555 4.96479 6.46553 4.64194 6.82547 3.99623L7.15316 3.40838Z"
                          fill="#FFE100"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <div className={styles.courierArt} aria-hidden="true">
                  <svg
                    width="155"
                    height="153"
                    viewBox="0 0 155 153"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M99.3109 131.2L60.3319 129.605L71.1235 104.322L96.236 105.804L102.955 116.793L99.3109 131.2Z"
                      fill="url(#paint0_linear_44_14581)"
                    />
                    <path
                      d="M135.877 91.0093C136.137 91.0093 136.393 91.027 136.649 91.0526L140.699 91.0093L140.675 92.5969C144.599 95.3291 147.323 101.304 147.323 108.24C147.323 115.45 144.38 121.622 140.205 124.193L140.186 125.471H135.877C129.556 125.471 124.431 117.757 124.431 108.24C124.431 98.7238 129.556 91.0093 135.877 91.0093Z"
                      fill="url(#paint1_linear_44_14581)"
                    />
                    <path
                      d="M140.699 125.471C134.378 125.471 129.253 117.757 129.253 108.24C129.253 98.7241 134.378 91.0095 140.699 91.0095C147.02 91.0095 152.145 98.7241 152.145 108.24C152.145 117.757 147.02 125.471 140.699 125.471Z"
                      fill="url(#paint2_linear_44_14581)"
                    />
                    <path
                      d="M24.0317 104.094C24.3497 104.094 24.6641 104.114 24.9767 104.143L29.9387 104.094L29.9097 105.873C34.7172 108.934 38.054 115.628 38.054 123.398C38.054 131.476 34.449 138.391 29.3341 141.27L29.3108 142.702H24.0316C16.2875 142.702 10.0092 134.06 10.0092 123.398C10.0093 112.737 16.2876 104.094 24.0317 104.094Z"
                      fill="url(#paint3_linear_44_14581)"
                    />
                    <path
                      d="M29.9394 142.702C22.1951 142.702 15.9171 134.06 15.9171 123.398C15.9171 112.737 22.1951 104.094 29.9394 104.094C37.6837 104.094 43.9617 112.737 43.9617 123.398C43.9617 134.06 37.6837 142.702 29.9394 142.702Z"
                      fill="url(#paint4_linear_44_14581)"
                    />
                    <path
                      d="M77.3546 113.058C77.6677 113.058 77.9771 113.078 78.2849 113.107L83.1698 113.058L83.1413 114.881C87.874 118.019 91.1589 124.881 91.1589 132.848C91.1589 141.129 87.61 148.218 82.5747 151.17L82.5517 152.638H77.3546C69.7309 152.638 63.5501 143.778 63.5501 132.848C63.5501 121.918 69.7309 113.058 77.3546 113.058Z"
                      fill="url(#paint5_linear_44_14581)"
                    />
                    <path
                      d="M83.1695 152.638C75.5456 152.638 69.3652 143.778 69.3652 132.848C69.3652 121.918 75.5456 113.058 83.1695 113.058C90.7935 113.058 96.9739 121.918 96.9739 132.848C96.9739 143.778 90.7935 152.638 83.1695 152.638Z"
                      fill="url(#paint6_linear_44_14581)"
                    />
                    <path
                      d="M85.1101 143.966C80.8269 143.966 77.3546 138.988 77.3546 132.848C77.3546 126.707 80.8269 121.729 85.1101 121.729C89.3933 121.729 92.8655 126.707 92.8655 132.848C92.8655 138.988 89.3933 143.966 85.1101 143.966Z"
                      fill="#D8DEE8"
                    />
                    <path
                      d="M83.9364 143.17C80.3013 143.17 77.3545 138.549 77.3545 132.848C77.3545 127.147 80.3013 122.526 83.9364 122.526C87.5715 122.526 90.5183 127.147 90.5183 132.848C90.5183 138.549 87.5715 143.17 83.9364 143.17Z"
                      fill="url(#paint7_linear_44_14581)"
                    />
                    <path
                      d="M215.022 91.0093V111.609C215.022 116.987 210.315 121.151 204.977 120.496L154.889 114.344V91.0094L215.022 91.0093Z"
                      fill="url(#paint8_linear_44_14581)"
                    />
                    <path
                      d="M192.472 88.1497L178.72 109.521C176.754 112.576 173.529 114.595 169.922 115.028L124.431 120.494L120.95 97.4885L192.472 88.1497Z"
                      fill="url(#paint9_linear_44_14581)"
                    />
                    <path
                      d="M139.627 104.322L233.067 91.3811C234.604 91.1681 235.749 89.8536 235.749 88.3013V5.97593C235.749 4.29614 234.415 2.91999 232.736 2.86833L139.627 0V104.322H139.627Z"
                      fill="url(#paint10_linear_44_14581)"
                    />
                    <path
                      d="M66.283 98.5598L139.627 104.322V0L69.9258 3.67984C67.8836 3.78766 66.283 5.47496 66.283 7.52006V98.5598Z"
                      fill="url(#paint11_linear_44_14581)"
                    />
                    <path
                      opacity="0.3"
                      d="M173.339 39.9412C186.921 22.8213 213.92 35.4542 227.55 16.2522C230.622 11.9239 232.76 7.50934 234.245 3.32764C235.144 3.87385 235.749 4.85145 235.749 5.97592V88.3013C235.749 89.8538 234.604 91.168 233.067 91.3809L148.508 103.092C153.847 97.2584 159.208 89.8031 163.089 80.4854C171.61 60.0268 164.47 51.1194 173.339 39.9412Z"
                      fill="url(#paint12_linear_44_14581)"
                    />
                    <path
                      d="M125.451 43.1672C127.981 54.526 133.884 87.2903 127.297 122.502C126.806 125.123 124.703 127.145 122.07 127.566L99.311 131.199C99.311 131.199 99.0833 109.653 88.15 108.24C77.2168 106.827 66.9667 117.077 66.2835 134.844C66.2835 134.844 42.5947 138.033 6.83363 129.833C6.83363 129.833 2.05034 128.808 0.000335693 123.398L1.61536 98.6172C1.74791 96.5835 2.69086 94.6881 4.2329 93.3557L25.2836 75.1663C25.2836 75.1663 44.4168 48.0608 50.7946 42.822C50.7946 42.822 54.2113 37.3553 81.7723 36.672C100.753 36.2013 113.823 37.4594 120.121 38.2882C122.75 38.6342 124.874 40.5795 125.451 43.1672Z"
                      fill="url(#paint13_linear_44_14581)"
                    />
                    <path
                      opacity="0.6"
                      d="M2.82618 94.9777L3.87257 96.1218C3.41676 108.877 0.65274 113.386 24.0318 115.791C47.4105 118.195 46.6945 98.5598 46.6945 98.5598L77.3543 85.1885L102.955 44.872C108.037 40.7787 116.916 39.6602 122.937 39.4006C124.184 40.2841 125.103 41.6048 125.451 43.1674C127.981 54.5261 133.884 87.2902 127.297 122.502C126.806 125.123 124.703 127.145 122.07 127.566L99.3109 131.2C99.3109 131.2 99.083 109.653 88.1497 108.24C77.2165 106.827 66.9665 117.077 66.2831 134.844C66.2831 134.844 42.5945 138.033 6.8334 129.833C6.8334 129.833 2.05 128.808 9.15527e-05 123.398L1.61531 98.6172C1.70082 97.3083 2.12589 96.0587 2.82618 94.9777Z"
                      fill="url(#paint14_linear_44_14581)"
                    />
                    <path
                      d="M77.6683 79.307C76.839 80.6688 75.2892 81.4191 73.7064 81.2251L25.159 75.274L25.2838 75.1663C25.2838 75.1663 41.1619 52.6725 48.8103 44.708L93.5766 47.4008C95.1182 47.4935 96.0072 49.1934 95.2039 50.5124L77.6683 79.307Z"
                      fill="url(#paint15_linear_44_14581)"
                    />
                    <path
                      opacity="0.3"
                      d="M48.7606 64.1896C61.979 58.9928 72.9627 65.1519 82.0532 57.8848C85.5504 55.0891 87.634 51.2073 88.8639 47.1177L93.5764 47.401C95.1182 47.4937 96.0072 49.1937 95.204 50.513L77.6683 79.3073C76.8389 80.6689 75.289 81.4194 73.7064 81.2255L33.4214 76.2873C38.7124 69.412 44.1581 65.999 48.7606 64.1896Z"
                      fill="white"
                    />
                    <path
                      d="M5.85586 98.2638C5.90591 97.8217 6.27665 97.4877 6.72175 97.4917C18.8189 97.5979 34.031 100.143 39.0671 101.046C40.0157 101.216 40.6413 102.143 40.4215 103.082C39.4369 107.285 37.8036 110.127 36.6011 111.776C35.7837 112.898 34.526 113.605 33.1421 113.714C29.3357 114.013 20.8925 114.521 16.7989 113.547C13.1577 112.68 9.67297 110.952 7.80016 109.926C6.71013 109.329 5.93966 108.269 5.74915 107.04C5.28903 104.071 5.66474 99.9571 5.85586 98.2638Z"
                      fill="url(#paint16_linear_44_14581)"
                    />
                    <path
                      d="M65.0507 99.4312C65.391 98.7409 65.064 97.9094 64.3422 97.6423C63.2738 97.2469 61.809 96.7907 60.9589 96.8907C59.8436 97.0219 50.4127 99.4714 46.0991 100.6C44.7673 100.949 43.8476 102.185 43.9375 103.558C44.1298 106.495 45.2392 111.146 50.2819 111.668C57.2821 112.392 61.7053 106.219 65.0507 99.4312Z"
                      fill="url(#paint17_linear_44_14581)"
                    />
                    <path
                      d="M19.703 116.793C38.0542 119.355 41.7771 113.058 41.7771 113.058C46.1203 113.704 52.2935 112.853 55.7911 112.244C57.1246 112.011 58.4178 112.645 59.1641 113.774C59.7222 114.618 60.737 115.473 62.582 115.791C65.5936 116.31 70.7215 115.164 73.2336 114.518C69.5782 119.535 67.0193 126.039 66.6816 134.817C66.6816 134.817 42.5946 138.033 6.83341 129.833C6.83341 129.833 2.05002 128.808 0.000106812 123.398L1.05349 107.238C2.9277 110.106 7.82913 115.135 19.703 116.793Z"
                      fill="url(#paint18_linear_44_14581)"
                    />
                    <path
                      opacity="0.6"
                      d="M49.5492 119.98C51.5798 119.783 53.3118 121.41 53.2668 123.449C53.1707 127.809 53.6162 132.371 54.0095 135.452C43.619 135.476 27.1861 134.5 6.83332 129.833C6.83332 129.833 2.04992 128.808 1.52588e-05 123.398L0.613914 113.979C15.2759 122.293 39.9586 120.91 49.5492 119.98Z"
                      fill="url(#paint19_linear_44_14581)"
                    />
                    <path
                      d="M117.623 49.7549L111.029 51.3505C108.874 51.8721 106.988 53.1725 105.734 55.0016L89.4118 78.8101C88.2977 80.4351 89.7365 82.5879 91.6641 82.1802L119.946 76.1975C121.085 75.9566 121.917 74.9801 121.968 73.8168C122.145 69.7367 122.334 60.0666 120.735 51.7728C120.458 50.334 119.047 49.4102 117.623 49.7549Z"
                      fill="url(#paint20_linear_44_14581)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_44_14581"
                        x1="102.955"
                        y1="117.761"
                        x2="60.3318"
                        y2="117.761"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#C3C3C3" />
                        <stop offset="0.9964" stop-color="#5173A5" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_44_14581"
                        x1="147.323"
                        y1="108.24"
                        x2="124.431"
                        y2="108.24"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#799BCD" />
                        <stop offset="1" stop-color="#799BCD" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_44_14581"
                        x1="152.145"
                        y1="108.24"
                        x2="129.253"
                        y2="108.24"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#799BCD" />
                        <stop offset="1" stop-color="#D9EAFF" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_44_14581"
                        x1="38.054"
                        y1="123.398"
                        x2="10.0092"
                        y2="123.398"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#799BCD" />
                        <stop offset="1" stop-color="#D9EAFF" />
                      </linearGradient>
                      <linearGradient
                        id="paint4_linear_44_14581"
                        x1="43.9617"
                        y1="123.398"
                        x2="15.917"
                        y2="123.398"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#799BCD" />
                        <stop offset="1" stop-color="#D9EAFF" />
                      </linearGradient>
                      <linearGradient
                        id="paint5_linear_44_14581"
                        x1="91.159"
                        y1="132.848"
                        x2="63.5502"
                        y2="132.848"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#799BCD" />
                        <stop offset="1" stop-color="#D9EAFF" />
                      </linearGradient>
                      <linearGradient
                        id="paint6_linear_44_14581"
                        x1="96.9738"
                        y1="132.848"
                        x2="69.3652"
                        y2="132.848"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#799BCD" />
                        <stop offset="1" stop-color="#D9EAFF" />
                      </linearGradient>
                      <linearGradient
                        id="paint7_linear_44_14581"
                        x1="74.5537"
                        y1="131.834"
                        x2="87.1953"
                        y2="133.2"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0.0054" stop-color="#D8DEE8" />
                        <stop offset="1" stop-color="#F4F7FA" />
                      </linearGradient>
                      <linearGradient
                        id="paint8_linear_44_14581"
                        x1="215.022"
                        y1="105.786"
                        x2="154.889"
                        y2="105.786"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#444B8C" />
                        <stop offset="0.9964" stop-color="#26264F" />
                      </linearGradient>
                      <linearGradient
                        id="paint9_linear_44_14581"
                        x1="192.472"
                        y1="104.322"
                        x2="120.95"
                        y2="104.322"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#444B8C" />
                        <stop offset="0.9964" stop-color="#26264F" />
                      </linearGradient>
                      <linearGradient
                        id="paint10_linear_44_14581"
                        x1="235.749"
                        y1="52.161"
                        x2="139.627"
                        y2="52.161"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#CDCDCD" />
                        <stop offset="0.9964" stop-color="#5173A5" />
                      </linearGradient>
                      <linearGradient
                        id="paint11_linear_44_14581"
                        x1="139.627"
                        y1="52.1609"
                        x2="66.2831"
                        y2="52.1609"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#CDCDCD" />
                        <stop offset="0.9964" stop-color="#5173A5" />
                      </linearGradient>
                      <linearGradient
                        id="paint12_linear_44_14581"
                        x1="235.749"
                        y1="53.2098"
                        x2="148.508"
                        y2="53.2098"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#EBEBEB" />
                        <stop offset="0.9964" stop-color="#8DAFE1" />
                      </linearGradient>
                      <linearGradient
                        id="paint13_linear_44_14581"
                        x1="130.308"
                        y1="86.0119"
                        x2="0.000292493"
                        y2="86.0119"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0.0054" stop-color="#D8DEE8" />
                        <stop offset="1" stop-color="#F4F7FA" />
                      </linearGradient>
                      <linearGradient
                        id="paint14_linear_44_14581"
                        x1="65.9987"
                        y1="88.3411"
                        x2="126.131"
                        y2="183.552"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0.0054" stop-color="#D8DEE8" />
                        <stop offset="1" stop-color="#F4F7FA" />
                      </linearGradient>
                      <linearGradient
                        id="paint15_linear_44_14581"
                        x1="95.5056"
                        y1="62.9818"
                        x2="25.159"
                        y2="62.9818"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#444B8C" />
                        <stop offset="0.9964" stop-color="#26264F" />
                      </linearGradient>
                      <linearGradient
                        id="paint16_linear_44_14581"
                        x1="22.8296"
                        y1="93.4628"
                        x2="23.5129"
                        y2="133.551"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#444B8C" />
                        <stop offset="0.9964" stop-color="#26264F" />
                      </linearGradient>
                      <linearGradient
                        id="paint17_linear_44_14581"
                        x1="59.9509"
                        y1="91.4996"
                        x2="39.6787"
                        y2="127.261"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FCB148" />
                        <stop offset="0.0521" stop-color="#FDBA46" />
                        <stop offset="0.1424" stop-color="#FFC244" />
                        <stop offset="0.3183" stop-color="#FFC444" />
                        <stop offset="0.4849" stop-color="#FDB946" />
                        <stop offset="0.7754" stop-color="#F99C4D" />
                        <stop offset="0.8658" stop-color="#F8924F" />
                        <stop offset="1" stop-color="#F8924F" />
                      </linearGradient>
                      <linearGradient
                        id="paint18_linear_44_14581"
                        x1="73.2336"
                        y1="121.338"
                        x2="0.000149181"
                        y2="121.338"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#444B8C" />
                        <stop offset="0.9964" stop-color="#26264F" />
                      </linearGradient>
                      <linearGradient
                        id="paint19_linear_44_14581"
                        x1="54.0096"
                        y1="124.716"
                        x2="5.56575e-05"
                        y2="124.716"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#444B8C" />
                        <stop offset="0.9964" stop-color="#26264F" />
                      </linearGradient>
                      <linearGradient
                        id="paint20_linear_44_14581"
                        x1="122.082"
                        y1="65.9567"
                        x2="89.0223"
                        y2="65.9567"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#444B8C" />
                        <stop offset="0.9964" stop-color="#26264F" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <Button
                  type="button"
                  size="small"
                  className={styles.pickBtn}
                  onClick={() => {
                    setCourier(c.name);
                    setAssignOpen(false);
                  }}
                >
                  Tanlash
                </Button>
              </div>
            ))}
          </div>

          <div className={styles.assignFooter}>
            <Button
              type="button"
              size="small"
              className={styles.applyAllBtn}
              onClick={() => {
                console.log("apply courier for all", { courier });
                setAssignOpen(false);
              }}
            >
              Hamma uchun
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={deleteOpen}
        title="Buyurtmani o'chirish"
        showClose={false}
        onClose={() => {
          setDeleteOpen(false);
          setDeleteOrderId(null);
        }}
        className={styles.confirmModal}
      >
        <div className={styles.confirmText}>
          Siz {deleteOrderId} ushu zakazni o'chirmoqchisiz
        </div>

        <div className={styles.confirmFooter}>
          <Button
            type="button"
            variant="secondary"
            size="small"
            onClick={() => {
              setDeleteOpen(false);
              setDeleteOrderId(null);
            }}
          >
            Bekor qilish
          </Button>

          <Button
            type="button"
            size="small"
            onClick={() => {
              setRows((prev) =>
                prev.filter((x) => x.productId !== deleteOrderId),
              );
              setDeleteOpen(false);
              setDeleteOrderId(null);
            }}
          >
            O'chirish
          </Button>
        </div>
      </Modal>
    </div>
  );
}
