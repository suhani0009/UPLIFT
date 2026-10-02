import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PublicDonationPage.css";
import { createDonor } from "../services/donorService";
import { createDonation } from "../services/donationService";
import { createTransaction } from "../services/transactionService";
import { createContribution } from "../services/contributionService";

const contributionTypes = [
    { value: "MONEY", label: "Money", icon: "💰", description: "Make a financial contribution" },
    { value: "BOOKS", label: "Books", icon: "📚", description: "Donate books for children" },
    { value: "CLOTHES", label: "Clothes", icon: "👕", description: "Donate usable clothes" },
    { value: "STATIONERY", label: "Stationery", icon: "✏️", description: "Support learning materials" },
    { value: "PADS", label: "Pads", icon: "🌸", description: "Support menstrual hygiene" },
    { value: "OTHER", label: "Other", icon: "📦", description: "Something else" },
];

const departments = [
    "Child Education",
    "Women Empowerment",
    "Health & Nutrition",
    "Skill Development",
    "General",
];

const amounts = [
    {
        amount: 2000,
        title: "Sanitary pads",
        description: "Support sanitary pads for 10 girls",
    },
    {
        amount: 5000,
        title: "Health camp",
        description: "Support a health check-up camp",
    },
    {
        amount: 7200,
        title: "Child support",
        description: "Support after-school meals",
    },
    {
        amount: 15000,
        title: "Education",
        description: "Support education for one child",
    },
];

function PublicDonationPage() {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [form, setForm] = useState({
        contributionType: "",
        name: "",
        email: "",
        phone: "",
        donorType: "Individual",
        anonymous: false,
        department: "",
        centre: "",
        requires80G: "No",
        pan: "",
        amount: "",
        description: "",
        quantity: "",
        remarks: "",
    });

    const updateField = (field, value) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const selectContribution = (type) => {
        updateField("contributionType", type);
    };

    const nextStep = () => {
        if (step < 4) {
            setStep(step + 1);
        }
    };

    const previousStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // 1. Create donor
            const donor = {
                name: form.name,
                email: form.email,
                phone: form.phone,
                donorType: form.donorType,
                city: form.centre,
                anonymous: form.anonymous,
            };
// 2. Create donation
            const createdDonor = await createDonor(donor);
            console.log("Donor created:", createdDonor);

            if (form.contributionType === "MONEY") {

                const donation = {
                    donorId: createdDonor.donorId,
                    amount: Number(form.amount),
                    donationDate: new Date().toISOString().slice(0, 19),
                    donationCategory: form.department,
                    itemDescription: form.description,
                    donationType: form.contributionType,
                    paymentMethod: "Online",
                    status: "PENDING",
                    source: "Public Form",
                };

                const createdDonation = await createDonation(donation);

                console.log("Donation created:", createdDonation);

                const transaction = {
                    donationId: createdDonation.donationId,
                    gatewayReference: "PUBLIC-FORM-" + createdDonation.donationId,
                    amount: Number(form.amount),
                    transactionDate: new Date().toISOString().slice(0, 19),
                    paymentStatus: "PENDING",
                    verificationStatus: "PENDING",
                    reconciliationStatus: "PENDING",
                    source: "Public Form",
                };

                const createdTransaction = await createTransaction(transaction);

                console.log("Transaction created:", createdTransaction);

            } else {

                const contribution = {
                    donorId: createdDonor.donorId,
                    category: form.contributionType,
                    quantity: form.quantity
                        ? Number(form.quantity)
                        : null,
                    description: form.description,
                    remarks: form.remarks,
                    status: "PENDING",
                };

                const createdContribution =
                    await createContribution(contribution);

                console.log(
                    "Contribution request created:",
                    createdContribution
                );
            }

            alert(
                form.contributionType === "MONEY"
                    ? "Your donation details have been submitted."
                    : "Your contribution request has been submitted."
            );

        } catch (error) {
            console.error("Error submitting form:", error);

            alert(
                "Something went wrong while submitting your details. Please try again."
            );
        }
    };

    return (
        <div className="public-donation-page">

            {/* HEADER */}
            <header className="public-header">
                <div className="public-logo">
                    <span className="logo-mark">U</span>

                    <div>
                        <strong>UPAY</strong>
                        <small>
                            Under Privileged's Advancement by Youth
                        </small>
                    </div>
                </div>

                <button
                    className="admin-login-btn"
                    onClick={() => navigate("/")}
                >
                    Admin Login
                </button>
            </header>

            {/* HERO */}
            <section className="donation-hero compact-hero">

                <div className="hero-content">

                    <div className="hero-badge">
                        Make a contribution
                    </div>

                    <h1>
                        Your contribution can
                        <span> create an impact.</span>
                    </h1>

                    <p>
                        Support UPAY's work in education, health,
                        women empowerment and community development.
                    </p>

                </div>

                <div className="hero-image-wrapper">

                    <div className="image-decoration"></div>

                    <img
                        src="https://upayngo.org/wp-content/uploads/2024/01/children.jpg"
                        alt="Children supported through UPAY initiatives"
                        className="hero-image"
                        onError={(event) => {
                            event.currentTarget.style.display = "none";
                            event.currentTarget.parentElement.classList.add(
                                "image-fallback"
                            );
                        }}
                    />

                </div>

            </section>

            {/* FORM SECTION */}
            <main className="form-section">

                <div className="form-heading">
                    <span>UPAY CONTRIBUTION FORM</span>

                    <h2>
                        Make a contribution
                    </h2>

                    <p>
                        Tell us how you would like to support UPAY.
                    </p>
                </div>

                {/* STEP INDICATOR */}
                <div className="step-indicator">

                    {[1, 2, 3, 4].map((number) => (
                        <div
                            key={number}
                            className={
                                step === number
                                    ? "step active"
                                    : step > number
                                        ? "step completed"
                                        : "step"
                            }
                        >
                            <span>{step > number ? "✓" : number}</span>

                            <small>
                                {number === 1 && "Contribution"}
                                {number === 2 && "Your Details"}
                                {number === 3 && "Contribution Details"}
                                {number === 4 && "Review"}
                            </small>
                        </div>
                    ))}

                </div>

                <form
                    className="donation-form-card"
                    onSubmit={handleSubmit}
                >

                    {/* STEP 1 */}
                    {step === 1 && (
                        <div className="form-step">

                            <h3>
                                What would you like to contribute?
                            </h3>

                            <p className="step-description">
                                Select the type of contribution you would
                                like to make.
                            </p>

                            <div className="contribution-grid">

                                {contributionTypes.map((type) => (
                                    <button
                                        type="button"
                                        key={type.value}
                                        className={
                                            form.contributionType === type.value
                                                ? "contribution-option selected"
                                                : "contribution-option"
                                        }
                                        onClick={() =>
                                            selectContribution(type.value)
                                        }
                                    >
                                        <span className="option-icon">
                                            {type.icon}
                                        </span>

                                        <strong>
                                            {type.label}
                                        </strong>

                                        <small>
                                            {type.description}
                                        </small>
                                    </button>
                                ))}

                            </div>

                            <div className="form-actions">

                                <button
                                    type="button"
                                    className="continue-btn"
                                    disabled={!form.contributionType}
                                    onClick={nextStep}
                                >
                                    Continue →
                                </button>

                            </div>

                        </div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <div className="form-step">

                            <h3>
                                Tell us about yourself
                            </h3>

                            <p className="step-description">
                                These details help us maintain a unified
                                donor record.
                            </p>

                            <div className="form-grid">

                                <div className="form-field full">
                                    <label>
                                        Full Name *
                                    </label>

                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) =>
                                            updateField(
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>

                                <div className="form-field">
                                    <label>Email *</label>

                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) =>
                                            updateField(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>

                                <div className="form-field">
                                    <label>Phone *</label>

                                    <input
                                        type="tel"
                                        value={form.phone}
                                        onChange={(e) =>
                                            updateField(
                                                "phone",
                                                e.target.value
                                            )
                                        }
                                        placeholder="10-digit mobile number"
                                        required
                                    />
                                </div>

                                <div className="form-field">
                                    <label>Donor Type *</label>

                                    <select
                                        value={form.donorType}
                                        onChange={(e) =>
                                            updateField(
                                                "donorType",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option>
                                            Individual
                                        </option>

                                        <option>
                                            Community / Organization
                                        </option>
                                    </select>
                                </div>

                                <div className="form-field full">
                                    <label>Donation Preference</label>

                                    <label className="checkbox-option">
                                        <input
                                            type="checkbox"
                                            checked={form.anonymous}
                                            onChange={(e) =>
                                                updateField("anonymous", e.target.checked)
                                            }
                                        />

                                           Donate anonymously
                                    </label>

                                    <small>
                                        Your details will still be securely recorded for
                                        transaction and receipt purposes, but you will be
                                        represented as an anonymous donor.
                                    </small>
                                </div>

                                <div className="form-field">
                                    <label>Department *</label>

                                    <select
                                        value={form.department}
                                        onChange={(e) =>
                                            updateField(
                                                "department",
                                                e.target.value
                                            )
                                        }
                                        required
                                    >
                                        <option value="">
                                            Select department
                                        </option>

                                        {departments.map((department) => (
                                            <option
                                                key={department}
                                                value={department}
                                            >
                                                {department}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>

                            <div className="form-actions">

                                <button
                                    type="button"
                                    className="back-btn"
                                    onClick={previousStep}
                                >
                                    ← Back
                                </button>

                                <button
                                    type="button"
                                    className="continue-btn"
                                    onClick={nextStep}
                                >
                                    Continue →
                                </button>

                            </div>

                        </div>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                        <div className="form-step">

                            <h3>
                                Contribution details
                            </h3>

                            <p className="step-description">
                                Provide the details needed to process
                                your contribution.
                            </p>

                            <div className="form-grid">

                                <div className="form-field">
                                    <label>Centre *</label>

                                    <select
                                        value={form.centre}
                                        onChange={(e) =>
                                            updateField(
                                                "centre",
                                                e.target.value
                                            )
                                        }
                                        required
                                    >
                                        <option value="">
                                            Select centre
                                        </option>

                                        <option>Nagpur</option>
                                        <option>Pune</option>
                                        <option>Wardha</option>
                                        <option>Mouda</option>
                                    </select>
                                </div>

                                {form.contributionType === "MONEY" && (
                                    <div className="form-field">
                                        <label>Donation Amount *</label>

                                        <input
                                            type="number"
                                            min="1"
                                            value={form.amount}
                                            onChange={(e) =>
                                                updateField(
                                                    "amount",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter amount"
                                            required
                                        />
                                    </div>
                                )}

                            </div>

                            {form.contributionType === "MONEY" && (
                                <div className="cause-amount-section">

                                    <label>
                                        Or choose a suggested contribution
                                    </label>

                                    <div className="cause-grid">

                                        {amounts.map((item) => (
                                            <button
                                                type="button"
                                                key={item.amount}
                                                className={
                                                    Number(form.amount) ===
                                                    item.amount
                                                        ? "cause-card selected"
                                                        : "cause-card"
                                                }
                                                onClick={() =>
                                                    updateField(
                                                        "amount",
                                                        item.amount
                                                    )
                                                }
                                            >
                                                <strong>
                                                    ₹{item.amount.toLocaleString(
                                                    "en-IN"
                                                )}
                                                </strong>

                                                <span>
                                                    {item.title}
                                                </span>

                                                <small>
                                                    {item.description}
                                                </small>
                                            </button>
                                        ))}

                                    </div>

                                </div>
                            )}

                            {form.contributionType !== "MONEY" && (
                                <div className="form-grid">

                                    <div className="form-field">
                                        <label>
                                            Quantity
                                        </label>

                                        <input
                                            type="number"
                                            min="1"
                                            value={form.quantity}
                                            onChange={(e) =>
                                                updateField(
                                                    "quantity",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="e.g. 20"
                                        />
                                    </div>

                                    <div className="form-field">
                                        <label>
                                            Description
                                        </label>

                                        <input
                                            type="text"
                                            value={form.description}
                                            onChange={(e) =>
                                                updateField(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Describe your contribution"
                                        />
                                    </div>

                                </div>
                            )}

                            <div className="form-field">

                                <label>
                                    Do you require an 80G receipt?
                                </label>

                                <div className="radio-group">

                                    <label className="radio-option">
                                        <input
                                            type="radio"
                                            name="80g"
                                            value="Yes"
                                            checked={
                                                form.requires80G === "Yes"
                                            }
                                            onChange={(e) =>
                                                updateField(
                                                    "requires80G",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        Yes
                                    </label>

                                    <label className="radio-option">
                                        <input
                                            type="radio"
                                            name="80g"
                                            value="No"
                                            checked={
                                                form.requires80G === "No"
                                            }
                                            onChange={(e) =>
                                                updateField(
                                                    "requires80G",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        No
                                    </label>

                                </div>

                            </div>

                            {form.requires80G === "Yes" && (
                                <div className="form-field">

                                    <label>
                                        PAN / 80G details *
                                    </label>

                                    <input
                                        type="text"
                                        value={form.pan}
                                        onChange={(e) =>
                                            updateField(
                                                "pan",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter PAN"
                                        required
                                    />

                                </div>
                            )}

                            <div className="form-field">

                                <label>
                                    Additional remarks
                                </label>

                                <textarea
                                    rows="4"
                                    value={form.remarks}
                                    onChange={(e) =>
                                        updateField(
                                            "remarks",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Anything else you would like us to know?"
                                />

                            </div>

                            <div className="form-actions">

                                <button
                                    type="button"
                                    className="back-btn"
                                    onClick={previousStep}
                                >
                                    ← Back
                                </button>

                                <button
                                    type="button"
                                    className="continue-btn"
                                    onClick={nextStep}
                                >
                                    Review →
                                </button>

                            </div>

                        </div>
                    )}

                    {/* STEP 4 */}
                    {step === 4 && (
                        <div className="form-step">

                            <h3>
                                Review your contribution
                            </h3>

                            <p className="step-description">
                                Please check your details before submitting.
                            </p>

                            <div className="review-box">

                                <div className="review-row">
                                    <span>Contribution</span>
                                    <strong>
                                        {form.contributionType}
                                    </strong>
                                </div>

                                <div className="review-row">
                                    <span>Name</span>
                                    <strong>{form.name}</strong>
                                </div>

                                <div className="review-row">
                                    <span>Email</span>
                                    <strong>{form.email}</strong>
                                </div>

                                <div className="review-row">
                                    <span>Phone</span>
                                    <strong>{form.phone}</strong>
                                </div>

                                <div className="review-row">
                                    <span>Donor Type</span>
                                    <strong>{form.donorType}</strong>
                                </div>

                                <div className="review-row">
                                    <span>Anonymous</span>
                                    <strong>
                                        {form.anonymous ? "Yes" : "No"}
                                    </strong>
                                </div>

                                <div className="review-row">
                                    <span>Department</span>
                                    <strong>{form.department}</strong>
                                </div>

                                <div className="review-row">
                                    <span>Centre</span>
                                    <strong>{form.centre}</strong>
                                </div>

                                {form.contributionType === "MONEY" && (
                                    <div className="review-row highlight">
                                        <span>Amount</span>
                                        <strong>
                                            ₹{Number(form.amount || 0).toLocaleString(
                                            "en-IN"
                                        )}
                                        </strong>
                                    </div>
                                )}

                                <div className="review-row">
                                    <span>80G Required</span>
                                    <strong>
                                        {form.requires80G}
                                    </strong>
                                </div>

                            </div>

                            <div className="review-note">

                                <span>🔒</span>

                                <p>
                                    Your information will be recorded
                                    securely in the UPLIFT donor system.
                                </p>

                            </div>

                            <div className="form-actions">

                                <button
                                    type="button"
                                    className="back-btn"
                                    onClick={previousStep}
                                >
                                    ← Back
                                </button>

                                <button
                                    type="submit"
                                    className="continue-btn"
                                >
                                    {form.contributionType === "MONEY"
                                        ? "Continue to Payment →"
                                        : "Submit Contribution →"}
                                </button>

                            </div>

                        </div>
                    )}

                </form>

            </main>

            {/* FOOTER */}
            <footer className="public-footer">

                <div>
                    <strong>UPAY NGO</strong>

                    <p>
                        Enabling, Educating and Empowering communities.
                    </p>
                </div>

                <div className="footer-right">
                    <span>© 2026 UPAY NGO</span>
                    <span>Powered by UPLIFT</span>
                </div>

            </footer>

        </div>
    );
}

export default PublicDonationPage;