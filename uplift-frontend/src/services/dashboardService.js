import api from "../api";

export function getDashboardSummary() {
  return api.get("/dashboard/summary");
}

export function getDonationCategories() {
  return api.get("/dashboard/categories");
}

export function getRecentDonations() {
  return api.get("/dashboard/recent-donations");
}
