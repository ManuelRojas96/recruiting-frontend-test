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

export function getDisplayPages(current: number, total: number) {
  const pages: (string | number)[] = [];
  pages.push(1);
  if (current > 3) {
    pages.push("...");
  }

  for (
    let i = Math.max(2, current - 1);
    i <= Math.min(total - 1, current + 1);
    i++
  ) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push("...");
  }

  if (total > 1) {
    pages.push(total);
  }

  return pages;
}
