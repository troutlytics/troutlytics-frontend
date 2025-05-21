import React from "react";
import { formatDate } from "@/utils";
export interface SelectedDateRangeProps {
  selectedDateRange: {
    pastDate: string | null;
    recentDate: string | null;
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
          {formatDate(selectedDateRange.pastDate)} -{" "}
          {formatDate(selectedDateRange.recentDate) ===
          formatDate(today.toDateString())
            ? "Today"
            : formatDate(selectedDateRange.recentDate)}
        </p>
      )}
    </>
  );
};

export default SelectedDateRange;
