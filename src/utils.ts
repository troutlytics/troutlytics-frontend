// Helper Function to format a date in a readable way
export const formatDate = (dateStr?: string | null) => {
  if (!dateStr) return "";

  // 1) isolate the YYYY-MM-DD part (drop any “T…” suffix)
  const [ymd] = dateStr.split("T");
  // 2) build a Date in local (browser) time at midnight
  const [year, month, day] = ymd.split("-").map((x) => parseInt(x, 10));
  const localMidnight = new Date(year, month - 1, day);

  // 3) format it as Pacific Time
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year:   "numeric",
    month:  "2-digit",
    day:    "2-digit",
  }).format(localMidnight);
};

export const calculateDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

// helper to get “2025-05-22” style dates
export const isoFormat = (d: Date | null | undefined) =>
  d?.toLocaleDateString().replaceAll("/", "-");
