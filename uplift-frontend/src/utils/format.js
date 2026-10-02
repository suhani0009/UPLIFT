const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const inrPrecise = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

export function formatInr(value) {
  if (value == null || Number.isNaN(Number(value))) {
    return "—";
  }
  const amount = Number(value);
  return Number.isInteger(amount) ? inr.format(amount) : inrPrecise.format(amount);
}

export function formatDate(value) {
  if (!value) {
    return "—";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function requestErrorMessage(error) {
  if (error?.response?.status) {
    return `Request failed (${error.response.status}). Check that the backend is running.`;
  }
  if (error?.message) {
    return error.message;
  }
  return "Unable to load data.";
}
