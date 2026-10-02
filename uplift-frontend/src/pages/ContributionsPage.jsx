
import { useEffect, useState } from "react";
import { getContributions } from "../services/contributionService";
import DataTable from "../components/ui/DataTable";
import { formatDate } from "../utils/format";

function ContributionsPage() {
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadContributions = async () => {
            try {
                const data = await getContributions();
                setContributions(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load contribution requests.");
            } finally {
                setLoading(false);
            }
        };

        loadContributions();
    }, []);

    const columns = [
        {
            key: "requestId",
            label: "ID",
        },
        {
            key: "donor",
            label: "Donor",
            render: (row) => row.donor?.name || "Unknown",
        },
        {
            key: "category",
            label: "Category",
        },
        {
            key: "quantity",
            label: "Quantity",
            render: (row) => row.quantity ?? "-",
        },
        {
            key: "description",
            label: "Description",
            render: (row) => row.description || "-",
        },
        {
            key: "remarks",
            label: "Remarks",
            render: (row) => row.remarks || "-",
        },
        {
            key: "status",
            label: "Status",
        },
        {
            key: "createdAt",
            label: "Date",
            render: (row) => formatDate(row.createdAt),
        },
    ];

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1>Contribution Requests</h1>
                    <p>
                        Review non-monetary contribution requests received by UPAY.
                    </p>
                </div>
            </div>

            <DataTable
                columns={columns}
                rows={contributions}
                loading={loading}
                error={error}
                emptyMessage="No contribution requests found."
            />
        </div>
    );
}

export default ContributionsPage;

