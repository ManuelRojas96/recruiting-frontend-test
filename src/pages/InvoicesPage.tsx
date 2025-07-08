import { useEffect, useState } from "react";
import InvoiceTable from "../components/InvoicesTable";
import type { Invoice } from "../models/Invoice";
import { getInvoices, injectInvoices } from "../services/InvoiceService";
import Paginator from "../components/Paginator";

const PAGE_SIZE = 12;

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(invoices.length / PAGE_SIZE);
  const pagedInvoices = invoices.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getInvoices().then((invoices: Invoice[]) => setInvoices(invoices));
  }, []);

  async function handleInject() {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const notInjectedIds = invoices
      .filter((inv) => selectedIds.includes(inv.id) && !inv.injected)
      .map((inv) => inv.id);

    if (notInjectedIds.length === 0) {
      setLoading(false);
      setError("No hay facturas pendientes de inyección.");
      return;
    }

    try {
      await injectInvoices(notInjectedIds);
      setInvoices((prev) =>
        prev.map((inv) =>
          notInjectedIds.includes(inv.id) ? { ...inv, injected: true } : inv
        )
      );
      setSelectedIds([]);
      setSuccess(true);
    } catch (e) {
      setError("Error al inyectar facturas. Intenta nuevamente.");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(false), 2000);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col gap-4"
      style={{ gap: "16px", flexDirection: "column" }}
    >
      <h1 style={{ color: "black" }}> Facturas pendientes</h1>
      <div className="mb-4">
        <button
          className="px-4 py-2 rounded bg-indigo-500 text-white disabled:bg-gray-400"
          onClick={handleInject}
          disabled={selectedIds.length === 0 || loading}
        >
          {loading
            ? "Inyectando..."
            : success
            ? "¡Facturas inyectadas!"
            : "Inyectar"}
        </button>
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </div>
      <InvoiceTable
        invoices={pagedInvoices}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
      ></InvoiceTable>
      <Paginator
        currentPage={page}
        totalPages={totalPages}
        onChange={setPage}
      />
    </div>
  );
};

export default InvoicesPage;
