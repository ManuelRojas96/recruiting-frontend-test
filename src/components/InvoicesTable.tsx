import type { Invoice } from "../models/Invoice";
import StatusIcon from "./StatusIcon";
import { formatAmount } from "../utils/Utils";

interface InvoiceTableProps {
  invoices: Invoice[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  hideCheckboxes?: boolean;
  hideInjectedColumn?: boolean;
}

export default function InvoiceTable({
  invoices,
  selectedIds,
  onSelectionChange,
  hideCheckboxes,
  hideInjectedColumn,
}: InvoiceTableProps) {
  function handleToggle(id: string) {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((item) => item !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  }

  function handleCheckAll(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      onSelectionChange(
        invoices
          .filter((invoice) => !invoice.injected)
          .map((invoice) => invoice.id)
      );
    } else {
      onSelectionChange([]);
    }
  }

  return (
    <table className="min-w-full rounded-xl overflow-hidden">
      <thead className="min-w-full rounded-xl overflow-hidden text-gray-800">
        <tr className="bg-gray-200">
          {!hideCheckboxes && (
            <th>
              <input
                className="w-5 h-5 mr-4"
                type="checkbox"
                checked={
                  invoices.length > 0 &&
                  invoices.every(
                    (inv) => selectedIds.includes(inv.id) || inv.injected
                  )
                }
                onChange={handleCheckAll}
              />
            </th>
          )}
          <th className="py-3 pr-100 font-bold text-lg text-left">Emisor</th>
          <th className="py-3 px-4 font-bold text-lg text-right">Monto</th>
          <th className="py-3 px-4 font-bold text-lg text-left">Moneda</th>
          {!hideInjectedColumn && (
            <th className="py-3 px-4 font-bold text-lg text-left">Inyectado</th>
          )}
        </tr>
      </thead>
      <tbody className="text-black">
        {invoices.map((inv) => (
          <tr
            key={inv.id}
            className="border-b border-gray-100 hover:bg-gray-50"
          >
            {!hideCheckboxes && (
              <td className="flex items-center py-4 px-4">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(inv.id)}
                  onChange={() => handleToggle(inv.id)}
                  className={`
                  w-5 h-5 mr-4 border-gray-300 rounded
                  disabled:bg-gray-200 disabled:cursor-not-allowed
                  disabled:border-gray-300
                `}
                  disabled={inv.injected === true}
                />
              </td>
            )}
            <td className="font-medium text-gray-800 text-lg">
              {inv.receiverName}
            </td>
            <td className="py-4 px-4 text-right font-medium text-gray-700 text-lg">
              {formatAmount(inv.amount, inv.currency)}
            </td>
            <td className="py-4 px-4 text-gray-500 text-lg">{inv.currency}</td>
            {!hideInjectedColumn && (
              <td className="py-4 px-4 text-center">
                <StatusIcon ok={!!inv.injected} />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
