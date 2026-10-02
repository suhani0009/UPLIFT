import { useState } from "react";
import { createDonor } from "../../services/donorService";

function AddDonorModal({ onClose, onDonorCreated }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        donorType: "Individual",
        address: "",
        city: "",
        state: "",
        pincode: "",
        anonymous: false,
    });

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError("");

        try {
            const newDonor = await createDonor(form);

            onDonorCreated(newDonor);
            onClose();
        } catch (err) {
            console.error(err);
            setError("Failed to create donor.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="modal-overlay" onMouseDown={onClose}>
            <div
                className="modal-card donor-modal"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className="modal-header">
                    <div>
                        <div className="modal-kicker">DONOR MANAGEMENT</div>
                        <h2>Add New Donor</h2>
                        <p>
                            Create a donor record in the UPLIFT system.
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
                    <div className="modal-section">
                        <div className="modal-section-title">
                            Personal Information
                        </div>

                        <div className="modal-form-grid">
                            <div className="modal-field full">
                                <label>Full Name *</label>
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter donor name"
                                    required
                                />
                            </div>

                            <div className="modal-field">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="donor@example.com"
                                />
                            </div>

                            <div className="modal-field">
                                <label>Phone</label>
                                <input
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="10-digit mobile number"
                                />
                            </div>

                            <div className="modal-field">
                                <label>Donor Type</label>
                                <select
                                    name="donorType"
                                    value={form.donorType}
                                    onChange={handleChange}
                                >
                                    <option value="Individual">
                                        Individual
                                    </option>
                                    <option value="Organization">
                                        Organization
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="modal-section">
                        <div className="modal-section-title">
                            Location
                        </div>

                        <div className="modal-form-grid">
                            <div className="modal-field full">
                                <label>Address</label>
                                <input
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    placeholder="Street / area / locality"
                                />
                            </div>

                            <div className="modal-field">
                                <label>City</label>
                                <input
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                />
                            </div>

                            <div className="modal-field">
                                <label>State</label>
                                <input
                                    name="state"
                                    value={form.state}
                                    onChange={handleChange}
                                    placeholder="State"
                                />
                            </div>

                            <div className="modal-field">
                                <label>Pincode</label>
                                <input
                                    name="pincode"
                                    value={form.pincode}
                                    onChange={handleChange}
                                    placeholder="Pincode"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="modal-section donor-preference">
                        <label className="modal-checkbox">
                            <input
                                type="checkbox"
                                name="anonymous"
                                checked={form.anonymous}
                                onChange={handleChange}
                            />

                            <span>
                                <strong>Anonymous donor</strong>
                                <small>
                                    Keep the donor represented anonymously
                                    in donor-facing records.
                                </small>
                            </span>
                        </label>
                    </div>

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
                            {saving ? "Saving..." : "Add Donor"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddDonorModal;