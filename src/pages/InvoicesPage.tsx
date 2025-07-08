import { useEffect, useState } from "react";
import InvoiceTable from "../components/InvoicesTable";
import type { Invoice } from "../models/Invoice";
import { getInvoices, injectInvoices } from "../services/InvoiceService";
import Paginator from "../components/Paginator";
import type { Currency, InjectionStatus } from "../components/InvoiceFilters";
import InvoiceFilters from "../components/InvoiceFilters";
import InjectReviewModal from "../components/InjectReviewModal";

const PAGE_SIZE = 12;

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(invoices.length / PAGE_SIZE);

  const [nameFilter, setNameFilter] = useState("");
  const [currencies, setCurrencies] = useState<Currency[]>(["CLP", "USD"]);
  const [injectionStatus, setInjectionStatus] =
    useState<InjectionStatus>("all");

  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewSelection, setReviewSelection] = useState<Invoice[]>([]);
  const [injectLoading, setInjectLoading] = useState(false);

  useEffect(() => {
    getInvoices().then((invoices: Invoice[]) => setInvoices(invoices));
  }, []);

  const handleClearFilters = () => {
    setNameFilter("");
    setCurrencies(["CLP", "USD"]);
    setInjectionStatus("all");
  };

  const filteredInvoices = invoices.filter((inv) => {
    if (
      nameFilter &&
      !inv.receiverName.toLowerCase().includes(nameFilter.toLowerCase())
    )
      return false;
    if (!currencies.includes(inv.currency)) return false;
    if (injectionStatus === "injected" && !inv.injected) return false;
    if (injectionStatus === "not-injected" && inv.injected) return false;
    return true;
  });

  const pagedInvoices = filteredInvoices.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  function handleOpenReviewModal() {
    const selection = invoices.filter(
      (inv) => selectedIds.includes(inv.id) && !inv.injected
    );
    setReviewSelection(selection);
    setReviewOpen(true);
  }

  async function handleConfirmInjection() {
    setInjectLoading(true);
    try {
      await injectInvoices(reviewSelection.map((i) => i.id));
      setInvoices((prev) =>
        prev.map((inv) =>
          reviewSelection.some((sel) => sel.id === inv.id)
            ? { ...inv, injected: true }
            : inv
        )
      );
      setSelectedIds([]);
      setReviewOpen(false);
    } finally {
      setInjectLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col gap-4"
      style={{ gap: "16px", flexDirection: "column" }}
    >
      <h1 style={{ color: "black" }}> Facturas pendientes</h1>
      <InvoiceFilters
        nameFilter={nameFilter}
        onNameFilterChange={setNameFilter}
        currencies={currencies}
        onCurrenciesChange={setCurrencies}
        injectionStatus={injectionStatus}
        onInjectionStatusChange={setInjectionStatus}
        onClear={handleClearFilters}
      />
      <button
        style={{ width: "120px" }}
        onClick={handleOpenReviewModal}
        disabled={selectedIds.length === 0}
      >
        Inyectar
      </button>
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
      <InjectReviewModal
        open={reviewOpen}
        invoices={reviewSelection}
        onConfirm={handleConfirmInjection}
        onCancel={() => setReviewOpen(false)}
        loading={injectLoading}
      />
    </div>
  );
};

export default InvoicesPage;
