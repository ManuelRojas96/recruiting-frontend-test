export async function getInvoices() {
  const endpoint = "https://recruiting.data.bemmbo.com/invoices";
  const authToken = import.meta.env.VITE_AUTH_TOKEN;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${authToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error fetching invoices");
  }
  return await response.json();
}

export async function injectInvoices(invoiceIds: string[]): Promise<void> {
  const endpoint = "https://recruiting.data.bemmbo.com/invoices/inject";
  const authToken = import.meta.env.VITE_AUTH_TOKEN;
  const BATCH_SIZE = 25;
  for (let i = 0; i < invoiceIds.length; i += BATCH_SIZE) {
    const batch = invoiceIds.slice(i, i + BATCH_SIZE);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${authToken}`,
      },
      body: JSON.stringify({ invoiceIds: batch }),
    });
    if (!response.ok) {
      const message = await response.text();
      throw new Error("Error al inyectar facturas: " + message);
    }
  }
}
