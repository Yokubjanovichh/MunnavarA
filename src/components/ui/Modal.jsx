import { useEffect, useRef } from "react";

import styles from "./Modal.module.css";

export default function Modal({
  open,
  title,
  children,
  onClose,
  className,
  headerClassName,
  bodyClassName,
  showClose = true,
}) {
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (!open) return;

    const body = document.body;
    const scrollY = window.scrollY;
    scrollYRef.current = scrollY;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      const restoreY = scrollYRef.current;
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.paddingRight = "";
      window.scrollTo(0, restoreY);
    };
  }, [open]);

  if (!open) return null;

  const modalClassName = className
    ? `${styles.modal} ${className}`
    : styles.modal;

  const mergedHeaderClassName = headerClassName
    ? `${styles.header} ${headerClassName}`
    : styles.header;

  const mergedBodyClassName = bodyClassName
    ? `${styles.body} ${bodyClassName}`
    : styles.body;

  return (
    <div className={styles.backdrop} onMouseDown={onClose}>
      <div className={modalClassName} onMouseDown={(e) => e.stopPropagation()}>
        <div className={mergedHeaderClassName}>
          <div className={styles.title}>{title}</div>
          {showClose ? (
            <button
              className={styles.close}
              onClick={onClose}
              aria-label="Close"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 8L8 24"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 8L24 24"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : null}
        </div>
        <div className={mergedBodyClassName}>{children}</div>
      </div>
    </div>
  );
}
