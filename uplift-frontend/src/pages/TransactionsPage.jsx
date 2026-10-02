import { useEffect, useState } from "react";
import {
    getTransactions,
    updateTransactionStatus,
} from "../services/transactionService";
import DataTable from "../components/ui/DataTable";
import { formatDate, formatInr } from "../utils/format";
import StatusBadge from "../components/ui/StatusBadge";

function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                const data = await getTransactions();
                setTransactions(
                    [...data].sort((a, b) => a.transactionId - b.transactionId)
                );
            } catch (err) {
                console.error(err);
                setError("Failed to load transactions.");
            } finally {
                setLoading(false);
            }
        };

        loadTransactions();
    }, []);

    const handleStatusChange = async (
        transaction,
        verificationStatus,
        reconciliationStatus
    ) => {
        setUpdatingId(transaction.transactionId);
        setError("");

        try {
            const updatedTransaction = await updateTransactionStatus(
                transaction.transactionId,
                verificationStatus,
                reconciliationStatus
            );

            setTransactions((previous) =>
                previous.map((item) =>
                    item.transactionId === transaction.transactionId
                        ? {
                            ...item,
                            ...updatedTransaction,
                        }
                        : item
                )
            );
        } catch (err) {
            console.error(err);
            setError("Failed to update transaction status.");
        } finally {
            setUpdatingId(null);
        }
    };

    const columns = [
        {
            key: "transactionId",
            label: "ID",
        },
        {
            key: "donor",
            label: "Donor",
            render: (row) => row.donation?.donor?.name || "Unknown",
        },
        {
            key: "gatewayReference",
            label: "Gateway Reference",
        },
        {
            key: "amount",
            label: "Amount",
            render: (row) => formatInr(row.amount),
        },
        {
            key: "transactionDate",
            label: "Date",
            render: (row) => formatDate(row.transactionDate),
        },
        {
            key: "paymentStatus",
            label: "Payment",
            render: (row) => <StatusBadge status={row.paymentStatus} />,
        },
        {
            key: "verificationStatus",
            label: "Verification",
            render: (row) => (
                <select
                    value={row.verificationStatus || "PENDING"}
                    disabled={updatingId === row.transactionId}
                    onChange={(event) =>
                        handleStatusChange(
                            row,
                            event.target.value,
                            row.reconciliationStatus || "PENDING"
                        )
                    }
                >
                    <option value="PENDING">PENDING</option>
                    <option value="VERIFIED">VERIFIED</option>
                </select>
            ),
        },
        {
            key: "reconciliationStatus",
            label: "Reconciliation",
            render: (row) => (
                <select
                    value={row.reconciliationStatus || "PENDING"}
                    disabled={updatingId === row.transactionId}
                    onChange={(event) =>
                        handleStatusChange(
                            row,
                            row.verificationStatus || "PENDING",
                            event.target.value
                        )
                    }
                >
                    <option value="PENDING">PENDING</option>
                    <option value="RECONCILED">RECONCILED</option>
                </select>
            ),
        },
    ];

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1>Transactions</h1>
                    <p>Verify payments and track donation reconciliation.</p>
                </div>
            </div>

            <DataTable
                columns={columns}
                rows={transactions}
                loading={loading}
                error={error}
                emptyMessage="No transactions found."
            />
        </div>
    );
}

export default TransactionsPage;