import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDonors } from "../services/donorService";
import AddDonorModal from "../components/donors/AddDonorModal";
import DataTable from "../components/ui/DataTable";

function DonorsPage() {
    const navigate = useNavigate();

    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showAddDonor, setShowAddDonor] = useState(false);

    useEffect(() => {
        const loadDonors = async () => {
            try {
                const data = await getDonors();
                setDonors(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load donors.");
            } finally {
                setLoading(false);
            }
        };

        loadDonors();
    }, []);

    const handleDonorCreated = (newDonor) => {
        setDonors((previous) => [...previous, newDonor]);
    };

    const columns = [
        {
            key: "name",
            label: "Name",
        },
        {
            key: "email",
            label: "Email",
        },
        {
            key: "phone",
            label: "Phone",
        },
        {
            key: "donorType",
            label: "Type",
        },
        {
            key: "city",
            label: "City",
        },
    ];

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1>Donors</h1>
                    <p>Manage and review donor records.</p>
                </div>

                <button onClick={() => setShowAddDonor(true)}>
                    Add Donor
                </button>
            </div>

            <DataTable
                columns={columns}
                rows={donors}
                loading={loading}
                error={error}
                emptyMessage="No donors found."
                onRowClick={(donor) => navigate(`/donors/${donor.donorId}`)}
            />

            {showAddDonor && (
                <AddDonorModal
                    onClose={() => setShowAddDonor(false)}
                    onDonorCreated={handleDonorCreated}
                />
            )}
        </div>
    );
}

export default DonorsPage;
