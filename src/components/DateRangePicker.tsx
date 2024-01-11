// components/DateRangePicker.tsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export interface DateRange {
  startDate: string | null;
  endDate: string | null;
}

interface DateRangePickerProps {
  onDateChange: (dateRange: DateRange) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateChange }) => {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);
  const [startDate, setStartDate] = useState<Date | null>(today);
  const [endDate, setEndDate] = useState<Date | null>(sevenDaysAgo);

  const handleRadioChange = (days: number) => {
    const end = new Date();
    const start = new Date();
    end.setDate(today.getDate() - days);
    setStartDate(start);
    setEndDate(end);

    onDateChange({
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    });
  };

  const handleCustomDateChange = () => {
    if (startDate && endDate) {
      onDateChange({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });
    }
  };

  return (
    <div className="w-full z-1  h-fit">
      <label>
        <input
        className="z-1"
          type="radio"
          name="dateRange"
          onChange={() => handleRadioChange(7)}
        />
        Last 7 Days
      </label>

      <label>
        <input
          type="radio"
          name="dateRange"
          onChange={() => handleRadioChange(30)}
        />
        Last 30 Days
      </label>

      <label>
        <input
          type="radio"
          name="dateRange"
          onChange={() => handleRadioChange(365)}
        />
        Last 1 Year
      </label>

      <div className="z-3">
        <label>Custom Range:</label>
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          // minDate={startDate}
          maxDate={today}
          isClearable
        />
        to
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          isClearable
        />
        <button onClick={handleCustomDateChange}>Apply</button>
      </div>
    </div>
  );
};

export default DateRangePicker;
