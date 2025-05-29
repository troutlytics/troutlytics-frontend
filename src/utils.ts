// Helper Function to format a date in a readable way
export const formatDate = (dateStr: string | undefined | null) => {
  if (dateStr) {
    // Create a date object in UTC
    const date = new Date(dateStr);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // months are 0-indexed
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `${month}/${day}/${year}`;
  } else return "";
};

export const calculateDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

// helper to get “2025-05-22” style dates
export const isoFormat = (d: Date | null | undefined) => d?.toISOString().split("T")[0];
