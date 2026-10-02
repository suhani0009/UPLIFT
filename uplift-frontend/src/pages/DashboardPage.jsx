import { useEffect, useMemo, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import DataTable from "../components/ui/DataTable";
import StatCard from "../components/ui/StatCard";
import StatusBadge from "../components/ui/StatusBadge";
import {
  getDashboardSummary,
  getDonationCategories,
  getRecentDonations,
} from "../services/dashboardService";
import { formatDate, formatInr, requestErrorMessage } from "../utils/format";

function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [summaryError, setSummaryError] = useState("");

  const [categories, setCategories] = useState(null);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState("");

  const [recent, setRecent] = useState([]);
  const [recentLoading, setRecentLoading] = useState(true);
  const [recentError, setRecentError] = useState("");

  useEffect(() => {
    getDashboardSummary()
      .then((response) => {
        setSummary(response.data);
        setSummaryError("");
      })
      .catch((error) => {
        setSummary(null);
        setSummaryError(requestErrorMessage(error));
      })
      .finally(() => setSummaryLoading(false));

    getDonationCategories()
      .then((response) => {
        setCategories(response.data ?? {});
        setCategoriesError("");
      })
      .catch((error) => {
        setCategories(null);
        setCategoriesError(requestErrorMessage(error));
      })
      .finally(() => setCategoriesLoading(false));

    getRecentDonations()
      .then((response) => {
        setRecent(Array.isArray(response.data) ? response.data : []);
        setRecentError("");
      })
      .catch((error) => {
        setRecent([]);
        setRecentError(requestErrorMessage(error));
      })
      .finally(() => setRecentLoading(false));
  }, []);

  const categoryEntries = useMemo(() => {
    if (!categories || typeof categories !== "object") {
      return [];
    }
    return Object.entries(categories).map(([name, amount]) => ({
      name: name || "Uncategorised",
      amount: Number(amount) || 0,
    }));
  }, [categories]);

  const categoryMax = Math.max(1, ...categoryEntries.map((item) => item.amount));

  const columns = [
    {
      key: "donorName",
      label: "Donor",
      render: (row) => row.donorName || "—",
    },
    {
      key: "amount",
      label: "Amount",
      render: (row) => formatInr(row.amount),
    },
    {
      key: "category",
      label: "Category",
      render: (row) => row.category || "—",
    },
    {
      key: "date",
      label: "Date",
      render: (row) => formatDate(row.date),
    },
    {
      key: "paymentMethod",
      label: "Payment",
      render: (row) => row.paymentMethod || "—",
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of donors, gifts, and payment activity."
      />

      <section className="stat-grid">
        <StatCard
          label="Total donors"
          value={summary?.totalDonors ?? 0}
          loading={summaryLoading}
          error={summaryError}
        />
        <StatCard
          label="Total donations"
          value={summary?.totalDonations ?? 0}
          loading={summaryLoading}
          error={summaryError}
        />
        <StatCard
          label="Total donation amount"
          value={formatInr(summary?.totalDonationAmount)}
          loading={summaryLoading}
          error={summaryError}
        />
        <StatCard
          label="Total transactions"
          value={summary?.totalTransactions ?? 0}
          loading={summaryLoading}
          error={summaryError}
        />
      </section>

      <section className="dashboard-grid">
        <article className="card card-pad">
          <h2 className="card-title">Donation categories</h2>
          {categoriesLoading ? (
            <div className="muted-panel">Loading categories…</div>
          ) : categoriesError ? (
            <div className="error-panel">{categoriesError}</div>
          ) : categoryEntries.length === 0 ? (
            <div className="empty-state">No category totals yet.</div>
          ) : (
            categoryEntries.map((item) => (
              <div className="category-row" key={item.name}>
                <span>{item.name}</span>
                <strong>{formatInr(item.amount)}</strong>
                <div className="category-track">
                  <div
                    className="category-fill"
                    style={{ width: `${(item.amount / categoryMax) * 100}%` }}
                  />
                </div>
              </div>
            ))
          )}
        </article>

        <article className="card card-pad">
          <h2 className="card-title">Recent donations</h2>
          <DataTable
            columns={columns}
            rows={recent}
            loading={recentLoading}
            error={recentError}
            emptyMessage="No recent donations to show."
          />
        </article>
      </section>
    </>
  );
}

export default DashboardPage;
