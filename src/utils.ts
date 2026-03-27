const parseDateValue = (value?: string | number | Date | null) => {
  if (value === null || value === undefined || value === "") return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  if (typeof value === "number") {
    const parsedDate = new Date(value);
    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
  }

  const trimmed = value.trim();
  if (!trimmed) return null;

  if (/^\d+$/.test(trimmed)) {
    const parsedDate = new Date(Number(trimmed));
    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
  }

  const isoMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    const [, year, month, day] = isoMatch;
    const parsedDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );
    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
  }

  const parsedDate = new Date(trimmed);
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
};

export const formatDate = (
  value?: string | number | Date | null,
  options: Intl.DateTimeFormatOptions = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }
): string => {
  const parsedDate = parseDateValue(value);
  if (!parsedDate) return "";

  return new Intl.DateTimeFormat("en-US", options).format(parsedDate);
};

export const calculateDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

// helper to get “2025-05-22” style dates
export const isoFormat = (d: Date | null | undefined) => {
  const formatted = d?.toISOString().split("T")[0];
  return formatted;
};
