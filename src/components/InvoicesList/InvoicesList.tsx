import React from "react";
import "./InvoicesList.css";
import { Invoice } from "../../models/Invoice.ts";

function InvoicesList({
    items,
    onItemClick,
    category,
}: {
    items: Invoice[];
    onItemClick?: (id: string) => void;
    category?: string;
}) {
    return (
        <div className="invoice-list">
            {items.map((invoice) => (
                <div className="invoice-item" key={invoice.id}>
                    <label>
                        <input
                            type="radio"
                            name={category ?? "invoices"}
                            onClick={() =>
                                onItemClick && onItemClick(invoice.id)
                            }
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
