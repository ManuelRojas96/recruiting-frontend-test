import { useEffect, useState } from "react";
import InvoiceTable from "../components/InvoicesTable";
import type { Invoice } from "../models/Invoice";
import { getInvoices } from "../services/InvoiceService";

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    getInvoices().then((invoices: Invoice[]) =>
      setInvoices(invoices.slice(0, 10))
    );
  }, []);
  return (
    <div>
      <h1 style={{ color: "black" }}> Facturas pendientes</h1>
      <InvoiceTable invoices={invoices}></InvoiceTable>
    </div>
  );
};

export default InvoicesPage;
