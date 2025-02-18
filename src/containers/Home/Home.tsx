import React, { useEffect, useState } from "react";
import { getCreditNotes, getInvoices } from "../../services/api.js";
import { Invoice } from "../../models/Invoice.ts";
import InvoicesList from "../../components/InvoicesList/InvoicesList.tsx";
import "./Home.css";
import Modal from "../../components/Modal/Modal.tsx";

function Home() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [creditNotes, setCreditNotes] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [selectedCreditNote, setSelectedCreditNote] = useState(null);
    const [isModalVisible, setModalVisibility] = useState(false);
    const [invoiceResetValue, reset] = useState(false);

    useEffect(() => {
        setLoading(true);
        getInvoices()
            .then((newInvoices) => {
                setInvoices(newInvoices);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            })
            .finally(() => setLoading(false));
    }, []);

    const onInvoiceClick = async (invoice) => {
        getCreditNotes(invoice.id)
            .then((newCreditNotes) => {
                setCreditNotes(newCreditNotes);
            })
            .catch((error) => {
                setError(error);
            });
    };

    const onCreditNoteClick = (invoice) => {
        setSelectedCreditNote(invoice);
    };

    const onAssign = () => {
        setModalVisibility(true);
    };

    const onModalClose = () => {
        setModalVisibility(false);
        setSelectedCreditNote(null);
        setCreditNotes([]);
        reset(!invoiceResetValue);
    };

    if (loading) {
        return <p>Cargando...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="main">
            <h1>Selecciona una factura</h1>
            <InvoicesList
                items={invoices}
                onItemClick={onInvoiceClick}
                category="invoices"
                reset={invoiceResetValue}
            ></InvoicesList>

            {creditNotes.length > 0 && (
                <div>
                    <h1>Selecciona una nota de crédito</h1>
                    <InvoicesList
                        items={creditNotes}
                        onItemClick={onCreditNoteClick}
                        category="creditNotes"
                    ></InvoicesList>
                </div>
            )}
            {selectedCreditNote && (
                <button className="assign-button" onClick={onAssign}>
                    Asignar
                </button>
            )}

            <Modal isVisible={isModalVisible} onClose={onModalClose} />
        </div>
    );
}

export default Home;
