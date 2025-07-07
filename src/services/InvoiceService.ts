export async function getInvoices() {
  const authToken = import.meta.env.VITE_AUTH_TOKEN;
  const response = await fetch("https://recruiting.data.bemmbo.com/invoices", {
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
