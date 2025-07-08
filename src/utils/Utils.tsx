export function formatAmount(amount: number, currency: "CLP" | "USD") {
  if (currency === "CLP") {
    return `$${amount.toLocaleString("es-CL", { maximumFractionDigits: 0 })}`;
  } else {
    return `$${amount.toLocaleString("es-CL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
}
