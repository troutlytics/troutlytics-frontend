export const formatDate = (dateStr?: string | null): string => {
  if (!dateStr) return "";

  // 1) isolate just the YYYY-MM-DD part
  const [ymd] = dateStr.split("T");
  const [year, month, day] = ymd.split("-");

  return `${month.padStart(2, "0")}/${day.padStart(2, "0")}/${year}`;
};

export const calculateDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

// helper to get “2025-05-22” style dates
export const isoFormat = (d: Date | null | undefined) => {
  const formatted = d?.toISOString().split("T")[0];
  return formatted

}
