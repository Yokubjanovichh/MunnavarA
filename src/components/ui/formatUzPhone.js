export function formatUzPhone(value) {
  const rawDigits = String(value ?? "").replace(/\D/g, "");

  // Ensure it starts with country code 998.
  let digits = rawDigits;
  if (digits.startsWith("998")) {
    digits = digits.slice(3);
  }

  // Keep only 9 national digits after +998.
  digits = digits.slice(0, 9);

  const p1 = digits.slice(0, 2);
  const p2 = digits.slice(2, 5);
  const p3 = digits.slice(5, 7);
  const p4 = digits.slice(7, 9);

  let out = "+998";
  if (p1) out += ` ${p1}`;
  if (p2) out += ` ${p2}`;
  if (p3) out += ` ${p3}`;
  if (p4) out += ` ${p4}`;
  return out;
}
