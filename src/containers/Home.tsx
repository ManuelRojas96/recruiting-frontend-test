import React, { useEffect, useState } from "react";
import { getCreditNotes, getInvoices } from "../services/api";
import { Invoice } from "../models/Invoice.tsx";
import InvoicesList from "../components/InvoicesList/InvoicesList.tsx";

function Home() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [creditNotes, setCreditNotes] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        getInvoices()
            .then((response) => {
                setInvoices(response);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            })
            .finally(() => setLoading(false));
    }, []);

    const onItemClick = async (invoiceId) => {
        getCreditNotes(invoiceId)
            .then((response) => {
                setCreditNotes(response);
            })
            .catch((error) => {
                setError(error);
            });
    };

    if (loading) {
        return <p>Cargando...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Selecciona una factura</h1>
            <InvoicesList
                items={invoices}
                onItemClick={onItemClick}
                category="invoices"
            ></InvoicesList>
            <InvoicesList
                items={creditNotes}
                category="creditNotes"
            ></InvoicesList>
        </div>
    );
}

export default Home;
