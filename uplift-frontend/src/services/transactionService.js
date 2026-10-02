import api from "../api";

export const getTransactions = async () => {
    const response = await api.get("/transactions");
    return response.data;
};

export const updateTransactionStatus = async (
    transactionId,
    verificationStatus,
    reconciliationStatus
) => {
    const response = await api.put(
        `/transactions/${transactionId}/status`,
        {
            verificationStatus,
            reconciliationStatus,
        }
    );

    return response.data;
};

export const createTransaction = async (transaction) => {
    const response = await api.post("/transactions", transaction);
    return response.data;
};