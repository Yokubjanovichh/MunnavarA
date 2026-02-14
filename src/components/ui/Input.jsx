import { forwardRef } from "react";

import styles from "./Input.module.css";

const Input = forwardRef(function Input(
  { size = "big", className, ...props },
  ref,
) {
  const sizeClassName = size === "small" ? styles.small : styles.big;

  const mergedClassName = className
    ? `${styles.input} ${sizeClassName} ${className}`
    : `${styles.input} ${sizeClassName}`;

  return <input ref={ref} className={mergedClassName} {...props} />;
});

Input.displayName = "Input";

export default Input;
