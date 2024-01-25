import React from "react";
import { formatDate } from "@/utils";
export interface SelectedDateRangeProps {
  selectedDateRange: {
    endDate: string | null;
    startDate: string | null;
  };
  today: Date;
}

const SelectedDateRange: React.FC<SelectedDateRangeProps> = ({
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
