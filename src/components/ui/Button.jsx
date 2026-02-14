import styles from "./Button.module.css";

export default function Button({
  variant = "primary",
  size = "big",
  className,
  ...props
}) {
  const sizeClassName = size === "small" ? styles.small : styles.big;

  const baseClassName =
    variant === "secondary"
      ? `${styles.button} ${styles.secondary} ${sizeClassName}`
      : `${styles.button} ${sizeClassName}`;

  const mergedClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName;

  return <button className={mergedClassName} {...props} />;
}
