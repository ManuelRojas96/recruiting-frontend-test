import { useState } from "react";
import type { Invoice } from "../models/Invoice";
import StatusIcon from "./StatusIcon";

interface InvoiceTableProps {
  invoices: Invoice[];
}

export default function InvoiceTable({ invoices }: InvoiceTableProps) {
  const [selected, setSelected] = useState<string[]>([]);

  function handleToggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function handleCheckAll(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setSelected(invoices.map((invoice) => invoice.id));
    } else {
      setSelected([]);
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>
            <input
              className="bg-white"
              type="checkbox"
              checked={
                invoices.length > 0 &&
                invoices.every((inv) => selected.includes(inv.id))
              }
              onChange={handleCheckAll}
            />
          </th>
          <th>Emisor</th>
          <th>Monto</th>
          <th>Moneda</th>
          <th>Inyectado</th>
        </tr>
      </thead>
      <tbody className="text-black">
        {invoices.map((inv) => (
          <tr key={inv.id} className="text-black">
            <td>
              <input
                type="checkbox"
                checked={selected.includes(inv.id)}
                onChange={() => handleToggle(inv.id)}
                className="accent-black"
              />
            </td>
            <td>{inv.receiverName}</td>
            <td>{inv.amount}</td>
            <td>{inv.currency}</td>
            <StatusIcon ok={!!inv.injected} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}
