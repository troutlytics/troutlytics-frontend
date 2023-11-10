// components/DateRangePicker.tsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface DateRangePickerProps {
  onDateChange: (dateRange: DateRange) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const handleRadioChange = (days: number) => {
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + days);

    setStartDate(today);
    onDateChange({ startDate: today, endDate });
  };

  return (
    <div>
      <label>
        <input type="radio" name="dateRange" onChange={() => handleRadioChange(7)} />
        Last 7 Days
      </label>

      <label>
        <input type="radio" name="dateRange" onChange={() => handleRadioChange(30)} />
        Last 30 Days
      </label>

      <label>
        <input type="radio" name="dateRange" onChange={() => handleRadioChange(365)} />
        Last 1 Year
      </label>

      <div>
        <label>Custom Range:</label>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => {
            setStartDate(date);
            onDateChange({ startDate: date, endDate: null });
          }}
          selectsStart
          startDate={startDate}
          endDate={null}
          isClearable
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
