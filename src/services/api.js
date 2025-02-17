import axios from "axios";

const API_BASE_URL = "https://recruiting.api.bemmbo.com";

export const fetchData = async (endpoint) => {
    try {
        const response = await axios.get(`${API_BASE_URL}${endpoint}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const getInvoices = async () => {
    try {
        const invoices = await fetchData(`/invoices/pending`);
        return invoices.filter((item) => item.type === "received");
    } catch (error) {
        throw error;
    }
};

export const getCreditNotes = async (referenceId) => {
    try {
        const invoices = await fetchData(`/invoices/pending`);
        const filteredInvoices = invoices.filter(
            (item) =>
                item.type === "credit_note" && item.reference === referenceId,
        );
        return filteredInvoices;
    } catch (error) {
        throw error;
    }
};
