import { useEffect, useState } from "react";
import { createDonation } from "../../services/donationService";
import { getDonors } from "../../services/donorService";

function AddDonationModal({ onClose, onDonationCreated }) {
    const [donors, setDonors] = useState([]);

    const [form, setForm] = useState({
        donorId: "",
        centreId: "",
        amount: "",
        donationDate: "",
        donationCategory: "Education",
        itemDescription: "",
        donationType: "Money",
        paymentMethod: "UPI",
        status: "SUCCESS",
        source: "Website",
    });

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadDonors = async () => {
            try {
                const data = await getDonors();
                setDonors(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load donors.");
            }
        };

        loadDonors();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setSaving(true);
        setError("");

        try {
            const payload = {
                ...form,
                donorId: Number(form.donorId),
                centreId: form.centreId
                    ? Number(form.centreId)
                    : null,
                amount: Number(form.amount),
                donationDate: form.donationDate
                    ? `${form.donationDate}:00`
                    : null,
            };

            const createdDonation = await createDonation(payload);

            onDonationCreated(createdDonation);
            onClose();
        } catch (err) {
            console.error(err);
            setError("Failed to create donation.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div
            className="modal-overlay"
            onMouseDown={onClose}
        >
            <div
                className="modal-card donation-modal"
                onMouseDown={(event) => event.stopPropagation()}
            >
                {/* HEADER */}
                <div className="modal-header">
                    <div>
                        <div className="modal-kicker">
                            DONATION MANAGEMENT
                        </div>

                        <h2>Add New Donation</h2>

                        <p>
                            Record a donation received by UPAY.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="modal-close"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>

                {error && (
                    <div className="modal-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    {/* DONOR */}
                    <div className="modal-section">
                        <div className="modal-section-title">
                            Donor Information
                        </div>

                        <div className="modal-form-grid">
                            <div className="modal-field full">
                                <label>Donor *</label>

                                <select
                                    name="donorId"
                                    value={form.donorId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">
                                        Select donor
                                    </option>

                                    {donors.map((donor) => (
                                        <option
                                            key={donor.donorId}
                                            value={donor.donorId}
                                        >
                                            {donor.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* DONATION DETAILS */}
                    <div className="modal-section">
                        <div className="modal-section-title">
                            Donation Details
                        </div>

                        <div className="modal-form-grid">
                            <div className="modal-field">
                                <label>Amount *</label>

                                <input
                                    name="amount"
                                    type="number"
                                    min="1"
                                    value={form.amount}
                                    onChange={handleChange}
                                    placeholder="₹ Enter amount"
                                    required
                                />
                            </div>

                            <div className="modal-field">
                                <label>Donation Type</label>

                                <select
                                    name="donationType"
                                    value={form.donationType}
                                    onChange={handleChange}
                                >
                                    <option value="Money">
                                        Money
                                    </option>

                                    <option value="Item">
                                        Item
                                    </option>
                                </select>
                            </div>

                            <div className="modal-field">
                                <label>Category</label>

                                <select
                                    name="donationCategory"
                                    value={form.donationCategory}
                                    onChange={handleChange}
                                >
                                    <option value="Education">
                                        Education
                                    </option>
                                    <option value="Healthcare">
                                        Healthcare
                                    </option>
                                    <option value="Food">
                                        Food
                                    </option>
                                    <option value="Livelihood">
                                        Livelihood
                                    </option>
                                    <option value="General">
                                        General
                                    </option>
                                </select>
                            </div>

                            <div className="modal-field">
                                <label>Donation Date *</label>

                                <input
                                    name="donationDate"
                                    type="datetime-local"
                                    value={form.donationDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* PAYMENT */}
                    <div className="modal-section">
                        <div className="modal-section-title">
                            Payment & Status
                        </div>

                        <div className="modal-form-grid">
                            <div className="modal-field">
                                <label>Payment Method</label>

                                <select
                                    name="paymentMethod"
                                    value={form.paymentMethod}
                                    onChange={handleChange}
                                >
                                    <option value="UPI">UPI</option>
                                    <option value="Card">Card</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Bank Transfer">
                                        Bank Transfer
                                    </option>
                                    <option value="Other">
                                        Other
                                    </option>
                                </select>
                            </div>

                            <div className="modal-field">
                                <label>Status</label>

                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                >
                                    <option value="SUCCESS">
                                        SUCCESS
                                    </option>
                                    <option value="PENDING">
                                        PENDING
                                    </option>
                                    <option value="FAILED">
                                        FAILED
                                    </option>
                                    <option value="IMPORTED">
                                        IMPORTED
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* SOURCE */}
                    <div className="modal-section">
                        <div className="modal-section-title">
                            Source & Description
                        </div>

                        <div className="modal-form-grid">
                            <div className="modal-field full">
                                <label>Source</label>

                                <select
                                    name="source"
                                    value={form.source}
                                    onChange={handleChange}
                                >
                                    <option value="Website">
                                        Website
                                    </option>
                                    <option value="CSV">
                                        CSV
                                    </option>
                                    <option value="Bank">
                                        Bank
                                    </option>
                                    <option value="Manual">
                                        Manual
                                    </option>
                                </select>
                            </div>

                            <div className="modal-field full">
                                <label>Item Description</label>

                                <textarea
                                    name="itemDescription"
                                    value={form.itemDescription}
                                    onChange={handleChange}
                                    placeholder="Add any relevant details about this donation..."
                                    rows="3"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="modal-actions">
                        <button
                            type="button"
                            className="modal-cancel-btn"
                            onClick={onClose}
                            disabled={saving}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="modal-primary-btn"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : "Add Donation"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default AddDonationModal;