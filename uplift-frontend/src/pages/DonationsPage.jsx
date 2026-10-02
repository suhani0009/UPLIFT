import { useEffect, useState } from "react";
import { getDonations } from "../services/donationService";
import DataTable from "../components/ui/DataTable";
import { formatDate, formatInr } from "../utils/format";
import AddDonationModal from "../components/donations/AddDonationModal";

function DonationsPage() {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showAddDonation, setShowAddDonation] = useState(false);

    const handleDonationCreated = (newDonation) => {
        setDonations((previous) => [...previous, newDonation]);
    };

    useEffect(() => {
        const loadDonations = async () => {
            try {
                const data = await getDonations();
                setDonations(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load donations.");
            } finally {
                setLoading(false);
            }
        };

        loadDonations();
    }, []);

    const columns = [
        {
            key: "donor",
            label: "Donor",
            render: (row) => row.donor?.name || "Unknown",
        },
        {
            key: "amount",
            label: "Amount",
            render: (row) => formatInr(row.amount),
        },
        {
            key: "donationCategory",
            label: "Category",
        },
        {
            key: "donationDate",
            label: "Date",
            render: (row) => formatDate(row.donationDate),
        },
        {
            key: "paymentMethod",
            label: "Payment",
        },
        {
            key: "status",
            label: "Status",
        },
        {
            key: "source",
            label: "Source",
        },
    ];

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1>Donations</h1>
                    <p>Review donations received by UPAY.</p>
                </div>

                <button onClick={() => setShowAddDonation(true)}>
                    Add Donation
                </button>
            </div>

            <DataTable
                columns={columns}
                rows={donations}
                loading={loading}
                error={error}
                emptyMessage="No donations found."
            />

            {showAddDonation && (
                <AddDonationModal
                    onClose={() => setShowAddDonation(false)}
                    onDonationCreated={handleDonationCreated}
                />
            )}
        </div>
    );
}

export default DonationsPage;