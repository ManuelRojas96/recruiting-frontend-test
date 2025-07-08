import { useState } from "react";
import type { Invoice } from "../models/Invoice";
import StatusIcon from "./StatusIcon";
import { formatAmount } from "../utils/Utils";

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
    <table className="min-w-full rounded-xl overflow-hidden">
      <thead className="min-w-full rounded-xl overflow-hidden text-gray-800">
        <tr className="bg-gray-200">
          <th>
            <input
              className="w-5 h-5 mr-4"
              type="checkbox"
              checked={
                invoices.length > 0 &&
                invoices.every((inv) => selected.includes(inv.id))
              }
              onChange={handleCheckAll}
            />
          </th>
          <th className="py-3 pr-100 font-bold text-lg text-left">Emisor</th>
          <th className="py-3 px-4 font-bold text-lg text-right">Monto</th>
          <th className="py-3 px-4 font-bold text-lg text-left">Moneda</th>
          <th className="py-3 px-4 font-bold text-lg text-left">Inyectado</th>
        </tr>
      </thead>
      <tbody className="text-black">
        {invoices.map((inv) => (
          <tr
            key={inv.id}
            className="border-b border-gray-100 hover:bg-gray-50"
          >
            <td className="flex items-center py-4 px-4">
              <input
                type="checkbox"
                checked={selected.includes(inv.id)}
                onChange={() => handleToggle(inv.id)}
                className="w-5 h-5 mr-4"
              />
            </td>
            <td className="font-medium text-gray-800 text-lg">
              {inv.receiverName}
            </td>
            <td className="py-4 px-4 text-right font-medium text-gray-700 text-lg">
              {formatAmount(inv.amount, inv.currency)}
            </td>
            <td className="py-4 px-4 text-gray-500 text-lg">{inv.currency}</td>
            <td className="py-4 px-4 text-center">
              <StatusIcon ok={!!inv.injected} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
