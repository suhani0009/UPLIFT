import { useState } from "react";
import {
    previewImport,
    importDonors,
    importDonorsExcel,
} from "../services/importService";

function ImportPage() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0] || null);
        setPreview(null);
        setResult(null);
        setError("");
    };

    const handlePreview = async () => {
        if (!file) {
            setError("Please select a file first.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const data = await previewImport(file);
            setPreview(data);
        } catch (err) {
            console.error(err);
            setError("Failed to preview the file.");
        } finally {
            setLoading(false);
        }
    };

    const handleImport = async () => {
        if (!file) {
            setError("Please select a file first.");
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const isExcel =
                file.name.toLowerCase().endsWith(".xlsx") ||
                file.name.toLowerCase().endsWith(".xls");

            const data = isExcel
                ? await importDonorsExcel(file)
                : await importDonors(file);

            setResult(data);
        } catch (err) {
            console.error(err);
            setError("Failed to import the file.");
        } finally {
            setLoading(false);
        }
    };



    return (

        <div>
            <div className="page-header">
                <div>
                    <h1>Import</h1>
                    <p>Bring existing UPAY donor data into UPLIFT.</p>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    gap: "12px",
                    marginBottom: "24px",
                    color: "#64748b",
                    fontSize: "14px",
                }}
            >
                <span>1. Upload file</span>
                <span>→</span>
                <span>2. Preview data</span>
                <span>→</span>
                <span>3. Import records</span>
                <span>→</span>
                <span>4. Review result</span>
            </div>

            <div
                style={{
                    background: "white",
                    padding: "24px",
                    borderRadius: "12px",
                    marginBottom: "24px",
                }}
            >
                <h2>Upload Donor Data</h2>

                <p>
                    Upload a CSV or Excel file containing existing donor records.
                </p>

                <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileChange}
                />
                <p
                    style={{
                        fontSize: "13px",
                        color: "#64748b",
                        marginTop: "8px",
                    }}
                >
                    Supported formats: CSV, XLS, XLSX
                </p>

                {file && (
                    <p>
                        Selected file: <strong>{file.name}</strong>
                    </p>
                )}

                <div style={{ marginTop: "16px" }}>
                    <button
                        type="button"
                        onClick={handlePreview}
                        disabled={!file || loading}
                    >
                        {loading ? "Processing..." : "Preview File"}
                    </button>

                    <button
                        type="button"
                        onClick={handleImport}
                        disabled={!file || loading}
                        style={{ marginLeft: "8px" }}
                    >
                        Import Donors
                    </button>
                </div>

                {error && (
                    <p style={{ marginTop: "16px" }}>
                        {error}
                    </p>
                )}
                <p
                    style={{
                        fontSize: "13px",
                        color: "#64748b",
                        marginTop: "16px",
                    }}
                >
                    Duplicate donors are automatically detected using email or phone number.
                </p>
            </div>

            {preview && (
                <div
                    style={{
                        background: "white",
                        padding: "24px",
                        borderRadius: "12px",
                        marginBottom: "24px",
                    }}
                >
                    <h2>File Preview</h2>

                    <p>
                        <strong>File:</strong> {preview.fileName}
                    </p>

                    <p>
                        <strong>Detected columns:</strong> {preview.columns.length}
                    </p>

                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "8px",
                            marginTop: "16px",
                        }}
                    >
                        {preview.columns.map((column) => (
                            <span
                                key={column}
                                style={{
                                    background: "#f1f5f9",
                                    padding: "8px 12px",
                                    borderRadius: "6px",
                                    fontSize: "14px",
                                }}
                            >
                    {column}
                </span>
                        ))}
                    </div>
                </div>
            )}

            {result && (
                <div
                    style={{
                        background: "white",
                        padding: "24px",
                        borderRadius: "12px",
                    }}
                >
                    <h2>Import Complete</h2>

                    <p style={{ marginBottom: "20px" }}>
                        Donor data has been processed successfully.
                    </p>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            gap: "16px",
                        }}
                    >
                        <div>
                            <strong>Total Rows</strong>
                            <div style={{ fontSize: "24px", marginTop: "6px" }}>
                                {result.totalRows}
                            </div>
                        </div>

                        <div>
                            <strong>Imported</strong>
                            <div style={{ fontSize: "24px", marginTop: "6px" }}>
                                {result.imported}
                            </div>
                        </div>

                        <div>
                            <strong>Duplicates</strong>
                            <div style={{ fontSize: "24px", marginTop: "6px" }}>
                                {result.duplicates}
                            </div>
                        </div>

                        <div>
                            <strong>Invalid</strong>
                            <div style={{ fontSize: "24px", marginTop: "6px" }}>
                                {result.invalid}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ImportPage;