import { useEffect, useState } from "react";
import InvoiceTable from "../components/InvoicesTable";
import type { Invoice } from "../models/Invoice";
import { getInvoices } from "../services/InvoiceService";
import Paginator from "../components/Paginator";

const PAGE_SIZE = 12;

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(invoices.length / PAGE_SIZE);
  const pagedInvoices = invoices.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  useEffect(() => {
    getInvoices().then((invoices: Invoice[]) => setInvoices(invoices));
  }, []);
  return (
    <div>
      {/* <h1 style={{ color: "black" }}> Facturas pendientes</h1> */}
      <InvoiceTable invoices={pagedInvoices}></InvoiceTable>
      <Paginator
        currentPage={page}
        totalPages={totalPages}
        onChange={setPage}
      />
    </div>
  );
};

export default InvoicesPage;
