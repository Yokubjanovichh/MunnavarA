import { useId, useMemo, useState } from "react";
import styles from "./ProductCreate.module.css";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  useCreateProductMutation,
  useGetCatalogQuery,
} from "@/services/catalogApi";

function ChevronIcon({ open }) {
  return (
    <svg
      className={open ? styles.chevronOpen : styles.chevron}
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 7.66667L8.5 10.1667L6 7.66667M8.5 1C7.51509 1 6.53982 1.19399 5.62987 1.5709C4.71993 1.94781 3.89314 2.50026 3.1967 3.1967C2.50026 3.89314 1.94781 4.71993 1.5709 5.62987C1.19399 6.53982 1 7.51509 1 8.5C1 9.48491 1.19399 10.4602 1.5709 11.3701C1.94781 12.2801 2.50026 13.1069 3.1967 13.8033C3.89314 14.4997 4.71993 15.0522 5.62987 15.4291C6.53982 15.806 7.51509 16 8.5 16C10.4891 16 12.3968 15.2098 13.8033 13.8033C15.2098 12.3968 16 10.4891 16 8.5C16 6.51088 15.2098 4.60322 13.8033 3.1967C12.3968 1.79018 10.4891 1 8.5 1Z"
        stroke="#646B72"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.75 4.75H6.75667M6.08333 6.75H6.75V9.41667H7.41667M0.75 6.75C0.75 7.53793 0.905195 8.31815 1.20672 9.0461C1.50825 9.77405 1.95021 10.4355 2.50736 10.9926C3.06451 11.5498 3.72595 11.9917 4.4539 12.2933C5.18185 12.5948 5.96207 12.75 6.75 12.75C7.53793 12.75 8.31815 12.5948 9.0461 12.2933C9.77405 11.9917 10.4355 11.5498 10.9926 10.9926C11.5498 10.4355 11.9917 9.77405 12.2933 9.0461C12.5948 8.31815 12.75 7.53793 12.75 6.75C12.75 5.1587 12.1179 3.63258 10.9926 2.50736C9.86742 1.38214 8.3413 0.75 6.75 0.75C5.1587 0.75 3.63258 1.38214 2.50736 2.50736C1.38214 3.63258 0.75 5.1587 0.75 6.75Z"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Section({ title, icon, open, onToggle, children, contentId }) {
  return (
    <section className={styles.section}>
      <button
        type="button"
        className={styles.sectionHeader}
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={contentId}
      >
        <div className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>{icon}</span>
          <span className={styles.sectionText}>{title}</span>
        </div>
        <span className={styles.sectionRight}>
          <ChevronIcon open={open} />
        </span>
      </button>

      {open ? (
        <div id={contentId} className={styles.sectionBody}>
          {children}
        </div>
      ) : null}
    </section>
  );
}

function DotsSpinner({ label = "Yuklanmoqda" }) {
  return (
    <span className={styles.dots} role="status" aria-label={label}>
      <span className={styles.dot} aria-hidden="true" />
      <span className={`${styles.dot} ${styles.dot2}`} aria-hidden="true" />
      <span className={`${styles.dot} ${styles.dot3}`} aria-hidden="true" />
    </span>
  );
}

export default function ProductCreate() {
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const [name, setName] = useState("");
  const productTypes = useMemo(
    () => [
      { value: "water", label: "Suv" },
      { value: "container", label: "Tara" },
      { value: "equipment", label: "Uskuna" },
    ],
    [],
  );
  const [type, setType] = useState("water");
  const [price, setPrice] = useState("");

  const {
    data: containerProducts,
    isLoading: isContainersLoading,
    isError: isContainersError,
  } = useGetCatalogQuery(
    { product_type: "container", skip: 0, limit: 100 },
    { skip: type !== "water" },
  );

  const [selectedContainerId, setSelectedContainerId] = useState("");

  const materialOptions = useMemo(
    () => [
      { value: "PC", label: "PC" },
      { value: "PET", label: "PET" },
    ],
    [],
  );

  const [waterVolume, setWaterVolume] = useState("19");
  const [containerVolume, setContainerVolume] = useState("19");
  const [containerMaterial, setContainerMaterial] = useState("PC");

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [infoOpen, setInfoOpen] = useState(true);
  const [extraOpen, setExtraOpen] = useState(true);

  const infoId = useId();
  const extraId = useId();

  const waterNeedsContainer = type === "water";
  const hasContainers =
    Array.isArray(containerProducts) && containerProducts.length > 0;
  const canSubmit = useMemo(() => {
    if (name.trim().length === 0) return false;
    if (!waterNeedsContainer) return true;
    if (isContainersLoading) return false;
    if (!hasContainers) return false;
    if (!selectedContainerId) return false;
    return true;
  }, [
    name,
    waterNeedsContainer,
    isContainersLoading,
    hasContainers,
    selectedContainerId,
  ]);

  const formatMoneySpaces = (raw) => {
    const digits = String(raw ?? "")
      .replace(/\s+/g, "")
      .replace(/\D+/g, "");
    if (!digits) return "";
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const parseMoneyToInt = (raw) => {
    const digits = String(raw ?? "")
      .replace(/\s+/g, "")
      .replace(/\D+/g, "");
    if (!digits) return null;
    const x = Number.parseInt(digits, 10);
    return Number.isFinite(x) ? x : null;
  };

  const parseLiters = (raw) => {
    const s = String(raw ?? "")
      .trim()
      .replace(",", ".");
    if (!s) return null;
    const x = Number.parseFloat(s);
    if (!Number.isFinite(x)) return null;
    if (x < 0) return null;
    return x;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const trimmedName = name.trim();
    if (!trimmedName) return;

    const parsedPrice = parseMoneyToInt(price);
    const finalPrice = parsedPrice === null ? 0 : parsedPrice;

    const waterLiters = type === "water" ? parseLiters(waterVolume) : null;
    const containerLiters =
      type === "container" ? parseLiters(containerVolume) : null;

    if (type === "water" && waterLiters === null) {
      setError("Hajm (litr) noto‘g‘ri kiritildi");
      return;
    }

    const selectedContainer =
      type === "water" && Array.isArray(containerProducts)
        ? containerProducts.find((p) => p?.id === selectedContainerId)
        : null;

    if (type === "water") {
      if (isContainersLoading) {
        setError("Tara ro‘yxati yuklanmoqda");
        return;
      }
      if (!Array.isArray(containerProducts) || containerProducts.length === 0) {
        setError("Avval tara (idish) yarating");
        return;
      }
      if (!selectedContainerId || !selectedContainer) {
        setError("Tara tanlang");
        return;
      }
      const autoMaterial = selectedContainer?.attributes?.material;
      if (!autoMaterial) {
        setError("Tanlangan tarada material topilmadi");
        return;
      }
    }

    if (type === "container" && containerLiters === null) {
      setError("Hajm (litr) noto‘g‘ri kiritildi");
      return;
    }

    try {
      const payload = {
        name: trimmedName,
        type,
        price: finalPrice,
      };

      if (type === "water") {
        const autoMaterial = selectedContainer?.attributes?.material;
        payload.attributes = {
          volume: waterLiters,
          material: autoMaterial,
        };
        payload.returnable_item_id = selectedContainerId;
      } else if (type === "container") {
        payload.attributes = {
          volume: containerLiters,
          material: containerMaterial,
        };
      }

      await createProduct(payload).unwrap();
      setSuccess(true);
    } catch (err) {
      console.warn("createProduct failed", err);
      setError("Saqlashda xatolik yuz berdi");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Mahsulot yaratish</h1>
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
          <span className={styles.crumbActive}>Mahsulot yaratish</span>
        </div>
      </div>

      <form className={styles.form} onSubmit={onSubmit}>
        <Section
          title="Mahsulot axboroti"
          icon={<InfoIcon />}
          open={infoOpen}
          onToggle={() => setInfoOpen((v) => !v)}
          contentId={infoId}
        >
          <div className={styles.grid}>
            <label className={styles.field}>
              <div className={styles.label}>Mahsulot nomi</div>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Mahsulot nomi"
                size="small"
                disabled={isLoading}
              />
            </label>

            <label className={styles.field}>
              <div className={styles.label}>Mahsulot turi</div>
              <select
                className={styles.select}
                value={type}
                disabled={isLoading}
                onChange={(e) => {
                  const next = e.target.value;
                  setType(next);
                  if (next !== "water") setSelectedContainerId("");
                }}
              >
                {productTypes.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>

            {type === "water" ? (
              <label className={styles.field}>
                <div className={styles.label}>Tara (idish)</div>
                <select
                  className={styles.select}
                  value={selectedContainerId}
                  onChange={(e) => setSelectedContainerId(e.target.value)}
                  disabled={isContainersLoading || isLoading}
                >
                  <option value="" disabled>
                    {isContainersLoading
                      ? "Yuklanmoqda..."
                      : hasContainers
                        ? "Tara tanlang"
                        : "Tara topilmadi"}
                  </option>
                  {(Array.isArray(containerProducts)
                    ? containerProducts
                    : []
                  ).map((p) => {
                    const material = p?.attributes?.material;
                    const volume =
                      p?.attributes?.volume ?? p?.attributes?.volume_l ?? null;
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
                ) : !isContainersLoading && !hasContainers ? (
                  <div className={styles.helper}>
                    Suv yaratish uchun avval tara (idish) yaratilgan bo‘lishi
                    kerak
                  </div>
                ) : null}
              </label>
            ) : null}

            <label className={styles.field}>
              <div className={styles.label}>Narx</div>
              <Input
                value={price}
                onChange={(e) => {
                  const next = String(e.target.value ?? "");
                  const digits = next.replace(/\s+/g, "").replace(/\D+/g, "");
                  setPrice(formatMoneySpaces(digits));
                }}
                onBlur={() => setPrice((v) => formatMoneySpaces(v) || "0")}
                placeholder="0"
                inputMode="numeric"
                size="small"
                disabled={isLoading}
              />
            </label>
          </div>
        </Section>

        <Section
          title="Qo‘shimcha ma’lumot"
          icon={<InfoIcon />}
          open={extraOpen}
          onToggle={() => setExtraOpen((v) => !v)}
          contentId={extraId}
        >
          {type === "water" ? (
            <div className={styles.grid}>
              <label className={styles.field}>
                <div className={styles.label}>Hajmi (litr)</div>
                <Input
                  value={waterVolume}
                  onChange={(e) => {
                    const next = String(e.target.value ?? "");
                    const cleaned = next.replace(/[^\d.,]/g, "");
                    setWaterVolume(cleaned);
                  }}
                  placeholder="Masalan: 19"
                  inputMode="decimal"
                  size="small"
                  disabled={isLoading}
                />
              </label>
            </div>
          ) : type === "container" ? (
            <div className={styles.grid}>
              <label className={styles.field}>
                <div className={styles.label}>Hajmi (litr)</div>
                <Input
                  value={containerVolume}
                  onChange={(e) => {
                    const next = String(e.target.value ?? "");
                    const cleaned = next.replace(/[^\d.,]/g, "");
                    setContainerVolume(cleaned);
                  }}
                  placeholder="Masalan: 19"
                  inputMode="decimal"
                  size="small"
                  disabled={isLoading}
                />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>Material</div>
                <select
                  className={styles.select}
                  value={containerMaterial}
                  disabled={isLoading}
                  onChange={(e) => setContainerMaterial(e.target.value)}
                >
                  {materialOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          ) : (
            <div className={styles.helper}>
              Ushbu tur uchun qo‘shimcha ma’lumot talab qilinmaydi.
            </div>
          )}
        </Section>

        {error ? <div className={styles.error}>{error}</div> : null}
        {isLoading ? (
          <div className={styles.helper} aria-live="polite">
            Saqlanmoqda
            <DotsSpinner label="Saqlanmoqda" />
          </div>
        ) : null}
        {success ? (
          <div className={styles.success}>Mahsulot saqlandi</div>
        ) : null}

        <div className={styles.actions}>
          <Button type="submit" disabled={!canSubmit || isLoading}>
            {isLoading ? (
              <>
                Saqlanmoqda
                <DotsSpinner label="Saqlanmoqda" />
              </>
            ) : (
              "Mahsulot kiritish"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
