import React from "react";

interface SelectedDateRangeProps {
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
    <div id="selected-date-range" className="text-center w-full mt-5">
      {/* Display selected date range */}
      {selectedDateRange && (
        <p>
          {formatDate(selectedDateRange.endDate)} -{" "}
          {formatDate(selectedDateRange.startDate) ===
          formatDate(today.toISOString())
            ? "Today"
            : formatDate(selectedDateRange.startDate)}
        </p>
      )}
    </div>
  );
};

export default SelectedDateRange;
