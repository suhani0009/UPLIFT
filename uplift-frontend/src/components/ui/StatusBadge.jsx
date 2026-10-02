const SUCCESS = ["completed", "success", "paid", "verified", "reconciled", "received"];
const WARNING = ["pending", "processing", "unverified", "unreconciled", "in progress"];
const DANGER = ["failed", "cancelled", "rejected", "bounced"];

function toneFor(status) {
  const value = String(status || "").toLowerCase();
  if (SUCCESS.some((item) => value.includes(item))) {
    return "success";
  }
  if (DANGER.some((item) => value.includes(item))) {
    return "danger";
  }
  if (WARNING.some((item) => value.includes(item))) {
    return "warning";
  }
  return "neutral";
}

function StatusBadge({ status }) {
  if (!status) {
    return <span className="badge badge-neutral">—</span>;
  }

  return <span className={`badge badge-${toneFor(status)}`}>{status}</span>;
}

export default StatusBadge;
