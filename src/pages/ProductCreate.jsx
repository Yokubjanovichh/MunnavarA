import { useId, useMemo, useRef, useState } from "react";
import styles from "./ProductCreate.module.css";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useProductStore } from "@/store/productStore";

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

function PhotoIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.75 4.08333H8.75667M0.75 9.41666L4.08333 6.08333C4.702 5.488 5.46467 5.488 6.08333 6.08333L9.41667 9.41666M8.08333 8.08333L8.75 7.41666C9.36867 6.82133 10.1313 6.82133 10.75 7.41666L12.75 9.41666M0.75 2.75C0.75 2.21957 0.960714 1.71086 1.33579 1.33579C1.71086 0.960714 2.21957 0.75 2.75 0.75H10.75C11.2804 0.75 11.7891 0.960714 12.1642 1.33579C12.5393 1.71086 12.75 2.21957 12.75 2.75V10.75C12.75 11.2804 12.5393 11.7891 12.1642 12.1642C11.7891 12.5393 11.2804 12.75 10.75 12.75H2.75C2.21957 12.75 1.71086 12.5393 1.33579 12.1642C0.960714 11.7891 0.75 11.2804 0.75 10.75V2.75Z"
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

export default function ProductCreate() {
  const createProduct = useProductStore((s) => s.createProduct);
  const isLoading = useProductStore((s) => s.isLoading);

  const [productName, setProductName] = useState("Suv 25 litr");
  const [productId, setProductId] = useState("1231823123");
  const sizeOptions = useMemo(() => ["5-L", "10-L", "19-L", "25-L"], []);
  const [size, setSize] = useState("25-L");
  const [qty, setQty] = useState("100-Dona");

  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [infoOpen, setInfoOpen] = useState(true);
  const [photoOpen, setPhotoOpen] = useState(true);

  const infoId = useId();
  const photoId = useId();

  const onPickFile = () => fileInputRef.current?.click();

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setSuccess(false);
    setError(null);

    const nextUrl = URL.createObjectURL(file);
    setImageUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return nextUrl;
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const fd = new FormData();
      fd.append("name", productName.trim());
      fd.append("productId", String(productId).trim());
      fd.append("size", size);
      fd.append("qty", qty.trim());
      if (imageFile) fd.append("image", imageFile);

      await createProduct(fd);
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
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Mahsulot nomi"
                size="small"
              />
            </label>

            <label className={styles.field}>
              <div className={styles.label}>Hajmi litrda</div>
              <select
                className={styles.select}
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                {sizeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.field}>
              <div className={styles.label}>Mahsulot ID</div>
              <Input
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="Mahsulot ID"
                inputMode="numeric"
                size="small"
              />
            </label>

            <label className={styles.field}>
              <div className={styles.label}>Miqdor</div>
              <Input
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                placeholder="Masalan: 100-Dona"
                size="small"
              />
            </label>
          </div>
        </Section>

        <Section
          title="Photo Card"
          icon={<PhotoIcon />}
          open={photoOpen}
          onToggle={() => setPhotoOpen((v) => !v)}
          contentId={photoId}
        >
          <div className={styles.photoWrap}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className={styles.fileInput}
              onChange={onFileChange}
            />

            <button
              type="button"
              className={styles.dropzone}
              onClick={onPickFile}
              data-tooltip="Rasm yuklash"
            >
              {imageUrl ? (
                <img className={styles.preview} src={imageUrl} alt="Selected" />
              ) : (
                <div className={styles.dropInner}>
                  <div className={styles.plus} aria-hidden="true">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 5.75H7.5M5.75 4V7.5M0.5 5.75C0.5 6.43944 0.635795 7.12213 0.899632 7.75909C1.16347 8.39605 1.55018 8.9748 2.03769 9.46231C2.5252 9.94982 3.10395 10.3365 3.74091 10.6004C4.37787 10.8642 5.06056 11 5.75 11C6.43944 11 7.12213 10.8642 7.75909 10.6004C8.39605 10.3365 8.9748 9.94982 9.46231 9.46231C9.94982 8.9748 10.3365 8.39605 10.6004 7.75909C10.8642 7.12213 11 6.43944 11 5.75C11 5.06056 10.8642 4.37787 10.6004 3.74091C10.3365 3.10395 9.94982 2.5252 9.46231 2.03769C8.9748 1.55018 8.39605 1.16347 7.75909 0.899633C7.12213 0.635795 6.43944 0.5 5.75 0.5C5.06056 0.5 4.37787 0.635795 3.74091 0.899633C3.10395 1.16347 2.5252 1.55018 2.03769 2.03769C1.55018 2.5252 1.16347 3.10395 0.899632 3.74091C0.635795 4.37787 0.5 5.06056 0.5 5.75Z"
                        stroke="#A6AAAF"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className={styles.dropText}>Rasm kiritish</div>
                </div>
              )}
            </button>
          </div>
        </Section>

        {error ? <div className={styles.error}>{error}</div> : null}
        {success ? (
          <div className={styles.success}>Mahsulot saqlandi</div>
        ) : null}

        <div className={styles.actions}>
          <Button type="submit" disabled={isLoading}>
            Mahsulot kiritish
          </Button>
        </div>
      </form>
    </div>
  );
}
