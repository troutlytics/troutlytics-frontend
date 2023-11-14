// components/DateRangePicker.tsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface DateRangePickerProps {
  onDateChange: (dateRange: DateRange) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const today = new Date();

  const handleRadioChange = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(today.getDate() - days);

    setStartDate(start);
    setEndDate(end);

    onDateChange({ startDate: start, endDate: end });
  };

  const handleCustomDateChange = () => {
    if (startDate && endDate) {
      onDateChange({ startDate, endDate });
    }
  };

  return (
    <div className="w-full z-10  h-fit">
      <label>
        <input
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

      <div>
        <label>Custom Range:</label>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          isClearable
        />
        to
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={today}
          isClearable
        />
        <button onClick={handleCustomDateChange}>Apply</button>
      </div>
    </div>
  );
};

export default DateRangePicker;
