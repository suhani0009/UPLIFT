import { useEffect, useState } from "react";
import {
    getEngagements,
    createEngagement,
} from "../services/engagementService";
import DataTable from "../components/ui/DataTable";
import { formatDate } from "../utils/format";

function EngagementsPage() {
    const [engagements, setEngagements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [donorId, setDonorId] = useState("");
    const [activityType, setActivityType] = useState("CAMPAIGN");
    const [campaignName, setCampaignName] = useState("");
    const [status, setStatus] = useState("COMPLETED");
    const [notes, setNotes] = useState("");

    const loadEngagements = async () => {
        try {
            const data = await getEngagements();
            setEngagements(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load engagements.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEngagements();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!donorId || !campaignName) {
            setError("Donor ID and campaign name are required.");
            return;
        }

        try {
            setError("");

            await createEngagement({
                donorId: Number(donorId),
                activityType,
                campaignName,
                engagementDate: new Date().toISOString(),
                status,
                notes,
            });

            setDonorId("");
            setCampaignName("");
            setNotes("");

            await loadEngagements();
        } catch (err) {
            console.error(err);
            setError("Failed to create engagement.");
        }
    };

    const columns = [
        {
            key: "engagementId",
            label: "ID",
        },
        {
            key: "donor",
            label: "Donor",
            render: (row) => row.donor?.name || "Unknown",
        },
        {
            key: "activityType",
            label: "Activity",
        },
        {
            key: "campaignName",
            label: "Campaign",
        },
        {
            key: "engagementDate",
            label: "Date",
            render: (row) => formatDate(row.engagementDate),
        },
        {
            key: "status",
            label: "Status",
        },
        {
            key: "notes",
            label: "Notes",
        },
    ];

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1>Engagements</h1>
                    <p>Track donor campaigns and engagement activity.</p>
                </div>
            </div>

            <div
                style={{
                    background: "white",
                    padding: "24px",
                    borderRadius: "12px",
                    marginBottom: "24px",
                }}
            >
                <h2>Log Engagement</h2>

                <form onSubmit={handleSubmit}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "16px",
                            marginTop: "16px",
                        }}
                    >
                        <input
                            type="number"
                            placeholder="Donor ID"
                            value={donorId}
                            onChange={(event) => setDonorId(event.target.value)}
                        />

                        <select
                            value={activityType}
                            onChange={(event) =>
                                setActivityType(event.target.value)
                            }
                        >
                            <option value="CAMPAIGN">CAMPAIGN</option>
                            <option value="EVENT">EVENT</option>
                            <option value="VOLUNTEER">VOLUNTEER</option>
                            <option value="OUTREACH">OUTREACH</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Campaign name"
                            value={campaignName}
                            onChange={(event) =>
                                setCampaignName(event.target.value)
                            }
                        />

                        <select
                            value={status}
                            onChange={(event) => setStatus(event.target.value)}
                        >
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="PLANNED">PLANNED</option>
                            <option value="ACTIVE">ACTIVE</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Notes"
                            value={notes}
                            onChange={(event) => setNotes(event.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{ marginTop: "16px" }}
                    >
                        Log Engagement
                    </button>
                </form>

                {error && (
                    <p style={{ marginTop: "16px" }}>
                        {error}
                    </p>
                )}
            </div>

            <DataTable
                columns={columns}
                rows={engagements}
                loading={loading}
                error={error}
                emptyMessage="No engagements found."
            />
        </div>
    );
}

export default EngagementsPage;