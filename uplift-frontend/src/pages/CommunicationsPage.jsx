import { useEffect, useState } from "react";
import {
    getCommunications,
    createCommunication,
} from "../services/communicationService";
import DataTable from "../components/ui/DataTable";
import { formatDate } from "../utils/format";

function CommunicationsPage() {
    const [communications, setCommunications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [donorId, setDonorId] = useState("");
    const [communicationType, setCommunicationType] = useState("EMAIL");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("SENT");

    const loadCommunications = async () => {
        try {
            const data = await getCommunications();
            setCommunications(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load communications.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCommunications();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!donorId || !message) {
            setError("Donor ID and message are required.");
            return;
        }

        try {
            setError("");

            await createCommunication({
                donorId: Number(donorId),
                communicationType,
                message,
                communicationDate: new Date().toISOString(),
                status,
            });

            setDonorId("");
            setMessage("");

            await loadCommunications();
        } catch (err) {
            console.error(err);
            setError("Failed to create communication.");
        }
    };

    const columns = [
        {
            key: "communicationId",
            label: "ID",
        },
        {
            key: "donor",
            label: "Donor",
            render: (row) => row.donor?.name || "Unknown",
        },
        {
            key: "communicationType",
            label: "Type",
        },
        {
            key: "message",
            label: "Message",
        },
        {
            key: "communicationDate",
            label: "Date",
            render: (row) => formatDate(row.communicationDate),
        },
        {
            key: "status",
            label: "Status",
        },
    ];

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1>Communications</h1>
                    <p>Log outreach and communication with donors.</p>
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
                <h2>Log Communication</h2>

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
                            value={communicationType}
                            onChange={(event) =>
                                setCommunicationType(event.target.value)
                            }
                        >
                            <option value="EMAIL">EMAIL</option>
                            <option value="SMS">SMS</option>
                            <option value="CALL">CALL</option>
                            <option value="WHATSAPP">WHATSAPP</option>
                        </select>

                        <select
                            value={status}
                            onChange={(event) => setStatus(event.target.value)}
                        >
                            <option value="SENT">SENT</option>
                            <option value="PENDING">PENDING</option>
                            <option value="FAILED">FAILED</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Message"
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{ marginTop: "16px" }}
                    >
                        Log Communication
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
                rows={communications}
                loading={loading}
                error={error}
                emptyMessage="No communications found."
            />
        </div>
    );
}

export default CommunicationsPage;