import type { Invoice } from "../models/Invoice";
import InvoiceTable from "./InvoicesTable";
import Modal from "./Modal";

type InjectReviewModalProps = {
  open: boolean;
  invoices: Invoice[];
  onDelete?: (id: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
};

export default function InjectReviewModal({
  open,
  invoices,
  onConfirm,
  onCancel,
  loading,
}: InjectReviewModalProps) {
  return (
    <Modal open={open}>
      <div>
        <h2 className="font-bold text-lg mb-1 text-gray-800">
          Inyección de facturas
        </h2>
        <p className="mb-4 text-gray-600 text-sm">
          Revisa las facturas que se van a inyectar y confirma la operación.
        </p>
        <div className="mb-6 max-h-96 overflow-auto rounded border">
          <InvoiceTable
            invoices={invoices}
            hideCheckboxes
            hideInjectedColumn
            onSelectionChange={() => {}}
            selectedIds={[]}
          />
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <button
            className="border px-4 py-2 rounded text-gray-700 bg-white font-medium hover:bg-gray-100"
            onClick={onCancel}
            disabled={loading}
            type="button"
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 rounded bg-indigo-800 text-white font-bold hover:bg-indigo-700"
            onClick={onConfirm}
            disabled={loading}
            type="button"
          >
            {loading ? "Inyectando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
