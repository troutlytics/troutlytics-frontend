import { DateRange } from "@/hooks/useApiData";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRangePickerProps {
  selectedDateRange: DateRange;
  handleDateChange: (dateRange: DateRange) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  selectedDateRange,
  handleDateChange,
}) => {
  const [recentDate, setrecentDate] = useState<Date | null | undefined>(null);
  const [pastDate, setpastDate] = useState<Date | null | undefined>(null);

  useEffect(() => {
    if (selectedDateRange.recentDate) {
      setrecentDate(new Date(selectedDateRange.recentDate));
    }
    if (selectedDateRange.pastDate) {
      setpastDate(new Date(selectedDateRange.pastDate));
    }
  }, [selectedDateRange]);

  const handleCustomDateChange = (
    pastDate: Date | null | undefined,
    recentDate: Date | null | undefined
  ) => {
    setrecentDate(recentDate);
    setpastDate(pastDate);
    handleDateChange({
      recentDate: recentDate ? recentDate.toDateString() : null,
      pastDate: pastDate ? pastDate.toDateString() : null,
    });
  };

  const handlePresetClick = (days: number) => {
    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - days);
    handleCustomDateChange(pastDate, today);
  };

  return (
    <div className="container mx-auto  px-0 md:px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Select Date Range
      </h2>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => handlePresetClick(7)}
          className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition duration-200 text-xs md:text-sm"
        >
          Last 7 Days
        </button>
        <button
          onClick={() => handlePresetClick(30)}
          className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition duration-200  text-xs md:text-sm"
        >
          Last 30 Days
        </button>
        <button
          onClick={() => handlePresetClick(90)}
          className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition duration-200  text-xs md:text-sm"
        >
          Last 90 Days
        </button>
        <button
          onClick={() => handlePresetClick(365)}
          className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition duration-200  text-xs md:text-sm"
        >
          Last Year
        </button>
        <button
          onClick={() => handlePresetClick(730)}
          className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition duration-200  text-xs md:text-sm"
        >
          Last 2 Years
        </button>
      </div>
      <div className="flex space-x-0 md:space-x-4">
        <DatePicker
          selected={pastDate}
          onChange={(date) => handleCustomDateChange(date, recentDate)}
          selectsStart
          maxDate={recentDate ?? undefined}
          className="form-input rounded-md"
          isClearable
        />
        <span className="text-sm text-gray-700">to</span>
        <DatePicker
          selected={recentDate}
          onChange={(date) => handleCustomDateChange(pastDate, date)}
          selectsEnd
          maxDate={new Date()}
          className="form-input rounded-md"
          isClearable
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
