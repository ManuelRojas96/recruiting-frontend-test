import React, { use, useEffect, useState } from "react";
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
                            onClick={() => {
                                onItemClick && onItemClick(invoice);
                                handleSelect(invoice.id);
                            }}
                        />
                        <span>
                            {invoice.id} ({invoice.organization_id ?? "-"})
                        </span>
                    </label>
                    <span>
                        {invoice.amount.toString()} {invoice.currency}
                    </span>
                    <span>{invoice.type}</span>
                </div>
            ))}
        </div>
    );
}

export default InvoicesList;
