import React from "react";

export interface SelectedDateRangeProps {
  selectedDateRange: {
    endDate: string | null;
    startDate: string | null;
  };
  formatDate: (dateStr: string | null) => string | undefined;
  today: Date;
}

const SelectedDateRange: React.FC<SelectedDateRangeProps> = ({
  formatDate,
  selectedDateRange,
  today,
}) => {
  return (
    <>
      {selectedDateRange && (
        <p>
          {formatDate(selectedDateRange.endDate)} -{" "}
          {formatDate(selectedDateRange.startDate) ===
          formatDate(today.toISOString())
            ? "Today"
            : formatDate(selectedDateRange.startDate)}
        </p>
      )}
    </>
  );
};

export default SelectedDateRange;
