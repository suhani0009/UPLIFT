function StatCard({ label, value, hint, loading, error }) {
  let display = value;
  if (loading) {
    display = "…";
  } else if (error) {
    display = "—";
  }

  return (
    <article className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{display}</div>
      {error ? (
        <div className="stat-hint">{error}</div>
      ) : hint ? (
        <div className="stat-hint">{hint}</div>
      ) : null}
    </article>
  );
}

export default StatCard;
