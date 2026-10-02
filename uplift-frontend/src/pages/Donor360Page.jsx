import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDonor360 } from "../services/donorService";

function Donor360Page() {
    const { id } = useParams();

    const [donor, setDonor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadDonor = async () => {
            try {
                const data = await getDonor360(id);
                setDonor(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load donor details.");
            } finally {
                setLoading(false);
            }
        };

        loadDonor();
    }, [id]);

    if (loading) {
        return <div>Loading donor...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!donor) {
        return <div>Donor not found.</div>;
    }

    return (
        <div>
            <h1>{donor.name}</h1>
            <p>{donor.email}</p>
            <p>{donor.phone}</p>
            <p>{donor.donorType}</p>

            <hr />

            <h2>Donor Summary</h2>

            <p>
                Total Donated: ₹{donor.totalDonated}
            </p>

            <p>
                Total Donations: {donor.totalDonations}
            </p>

            <h2>Donation History</h2>

            {donor.donations.length === 0 ? (
                <p>No donations found.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Reconciliation</th>
                    </tr>
                    </thead>

                    <tbody>
                    {donor.donations.map((donation) => (
                        <tr key={donation.donationId}>
                            <td>₹{donation.amount}</td>
                            <td>{donation.donationCategory}</td>
                            <td>{donation.donationDate}</td>
                            <td>{donation.paymentMethod}</td>
                            <td>{donation.status}</td>
                            <td>{donation.reconciliationStatus}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            <h2>Communications</h2>

            {donor.communications.length === 0 ? (
                <p>No communications found.</p>
            ) : (
                donor.communications.map((communication) => (
                    <div key={communication.communicationId}>
                        <p>{communication.communicationType}</p>
                        <p>{communication.message}</p>
                    </div>
                ))
            )}

            <h2>Engagements</h2>

            {donor.engagements.length === 0 ? (
                <p>No engagements found.</p>
            ) : (
                donor.engagements.map((engagement) => (
                    <div key={engagement.engagementId}>
                        <p>{engagement.activityType}</p>
                        <p>{engagement.campaignName}</p>
                    </div>
                ))
            )}
            <h2>Contribution History</h2>

            {donor.contributions.length === 0 ? (
                <p>No contribution requests found.</p>
            ) : (
                donor.contributions.map((contribution) => (
                    <div key={contribution.requestId}>
                        <p>
                            <strong>{contribution.category}</strong>
                        </p>
                        <p>
                            Quantity: {contribution.quantity ?? "-"}
                        </p>
                        <p>
                            {contribution.description || "-"}
                        </p>
                        <p>
                            Status: {contribution.status}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}

export default Donor360Page;