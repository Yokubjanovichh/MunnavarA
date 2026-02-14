import { useLayoutEffect, useRef } from "react";

import Input from "./Input";
import { formatUzPhone } from "./formatUzPhone";

function caretPosFromDigits(formatted, digitsBeforeCaret) {
  if (!formatted) return 0;
  if (!digitsBeforeCaret) return 0;

  let seen = 0;
  for (let i = 0; i < formatted.length; i += 1) {
    const ch = formatted[i];
    if (ch >= "0" && ch <= "9") {
      seen += 1;
      if (seen >= digitsBeforeCaret) return i + 1;
    }
  }
  return formatted.length;
}

export default function PhoneInput({ value, onChange, ...props }) {
  const inputRef = useRef(null);
  const pendingDigitsBeforeCaretRef = useRef(null);

  const clampCaretAfterPrefix = () => {
    const el = inputRef.current;
    if (!el) return;

    const prefixLen = 4; // "+998"
    const start = el.selectionStart ?? prefixLen;
    const end = el.selectionEnd ?? prefixLen;

    if (start < prefixLen || end < prefixLen) {
      try {
        el.setSelectionRange(prefixLen, prefixLen);
      } catch {
        // noop
      }
    }
  };

  const handleChange = (e) => {
    const raw = e.target.value;
    const caret = e.target.selectionStart ?? raw.length;
    const digitsBeforeCaret = raw.slice(0, caret).replace(/\D/g, "").length;
    const formatted = formatUzPhone(raw);

    pendingDigitsBeforeCaretRef.current = digitsBeforeCaret;
    if (typeof onChange === "function") onChange(formatted);
  };

  const formattedValue = formatUzPhone(value);

  useLayoutEffect(() => {
    const digitsBeforeCaret = pendingDigitsBeforeCaretRef.current;
    if (digitsBeforeCaret == null) return;

    const el = inputRef.current;
    if (!el) return;

    const pos = caretPosFromDigits(formattedValue, digitsBeforeCaret);
    try {
      el.setSelectionRange(pos, pos);
    } catch {
      // noop
    }

    pendingDigitsBeforeCaretRef.current = null;
  }, [formattedValue]);

  const handleKeyDown = (e) => {
    const el = inputRef.current;
    const prefixLen = 4;

    if (el && (e.key === "Backspace" || e.key === "Delete")) {
      const start = el.selectionStart ?? 0;
      const end = el.selectionEnd ?? 0;

      // Disallow any operation that would affect the prefix "+998".
      // Note: Backspace at caret==prefixLen would delete the last prefix digit.
      const isTouchingPrefix = start < prefixLen || end < prefixLen;
      const isBackspaceAtBoundary =
        e.key === "Backspace" && start === end && start <= prefixLen;

      if (isTouchingPrefix || isBackspaceAtBoundary) {
        e.preventDefault();
        try {
          el.setSelectionRange(prefixLen, prefixLen);
        } catch {
          // noop
        }
        return;
      }
    }

    if (typeof props.onKeyDown === "function") props.onKeyDown(e);
  };

  const handleFocus = (e) => {
    if (typeof props.onFocus === "function") props.onFocus(e);
    clampCaretAfterPrefix();
  };

  const handleClick = (e) => {
    if (typeof props.onClick === "function") props.onClick(e);
    clampCaretAfterPrefix();
  };

  return (
    <Input
      ref={inputRef}
      inputMode="numeric"
      autoComplete="tel"
      maxLength={17}
      placeholder="+998 90 123 45 67"
      {...props}
      value={formattedValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onClick={handleClick}
    />
  );
}
