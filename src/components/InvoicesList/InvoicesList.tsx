import React, { useEffect, useState } from "react";
import "./InvoicesList.css";
import { Invoice } from "../../models/Invoice.ts";

function InvoicesList({
    items,
    onItemClick,
    category,
    reset,
}: {
    items: Invoice[];
    onItemClick?: (invoice: Invoice) => void;
    category?: string;
    reset?: boolean;
}) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        resetSelection();
    }, [reset]);

    const handleSelect = (id: string) => {
        setSelectedId(id);
    };

    const getSelectedStyle = (invoice: Invoice) => {
        return selectedId === invoice.id ? "selected" : "";
    };

    const resetSelection = () => {
        setSelectedId(null);
    };

    const getAmountDisplay = (amount) => {
        return new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
            minimumFractionDigits: 0, // Sin decimales
        })
            .format(amount)
            .toString();
    };

    const getLastColumnDetail = (invoice: Invoice) => {
        return invoice.type === "credit_note"
            ? invoice.reference
            : invoice.type;
    };

    return (
        <div className="invoice-list">
            {items.map((invoice) => (
                <div
                    className={`invoice-item ${getSelectedStyle(invoice)}`}
                    key={invoice.id}
                >
                    <label>
                        <input
                            type="radio"
                            name={category ?? "invoices"}
                            checked={selectedId === invoice.id}
                            onChange={() => {}}
                            onClick={() => {
                                onItemClick && onItemClick(invoice);
                                handleSelect(invoice.id);
                            }}
                        />
                        <span className="invoice-id">{invoice.id}</span>
                        <span>({invoice.organization_id ?? "-"})</span>
                    </label>
                    <span className="amount">
                        {getAmountDisplay(invoice.amount)} {invoice.currency}
                    </span>
                    <span>{getLastColumnDetail(invoice)}</span>
                </div>
            ))}
        </div>
    );
}

export default InvoicesList;
