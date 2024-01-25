import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { calculateDate } from "@/utils";

export interface DateRange {
  startDate: string | null;
  endDate: string | null;
}

interface DateRangePickerProps {
  selectedDateRange: DateRange;
  handleDateChange: (dateRange: DateRange) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  selectedDateRange,
  handleDateChange,
}) => {
  const handleRadioChange = (days: number) => {
    const startDate = new Date();
    const endDate = calculateDate(days);
    handleDateChange({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
  };

  const handleCustomDateChange = (
    startDate: Date | null,
    endDate: Date | null
  ) => {
    if (startDate && endDate) {
      handleDateChange({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });
    }
  };

  const parsedStartDate = selectedDateRange.startDate
    ? new Date(selectedDateRange.startDate)
    : null;
  const parsedEndDate = selectedDateRange.endDate
    ? new Date(selectedDateRange.endDate)
    : null;

  return (
    <div className="w-full h-fit p-4 bg-white shadow rounded-md">
      <div className="flex flex-wrap gap-4 justify-center mb-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="dateRange"
            className="form-radio text-cyan-600"
            defaultChecked
            onChange={() => handleRadioChange(7)}
          />
          <span className="text-sm text-gray-700">Last 7 Days</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="dateRange"
            className="form-radio text-cyan-600"
            onChange={() => handleRadioChange(30)}
          />
          <span className="text-sm text-gray-700"> Last 30 Days</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="dateRange"
            className="form-radio text-cyan-600"
            onChange={() => handleRadioChange(365)}
          />
          <span className="text-sm text-gray-700"> Last 1 Year</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="dateRange"
            className="form-radio text-cyan-600"
            onChange={() => handleRadioChange(730)}
          />
          <span className="text-sm text-gray-700"> Last 2 Years</span>
        </label>
      </div>

      <div className="flex flex-col items-center gap-2 z-3">
        <label className="text-sm text-gray-700">Custom Range:</label>
        <div className="flex items-center gap-2">
          <DatePicker
            selected={parsedEndDate}
            onChange={(date) => handleCustomDateChange(parsedStartDate, date)}
            selectsEnd
            startDate={parsedStartDate}
            endDate={parsedEndDate}
            maxDate={new Date()}
            className="form-input rounded-md"
            isClearable
          />
          <span className="text-sm text-gray-700">to</span>
          <DatePicker
            selected={parsedStartDate}
            onChange={(date) => handleCustomDateChange(date, parsedEndDate)}
            selectsStart
            startDate={parsedStartDate}
            endDate={parsedEndDate}
            className="form-input rounded-md"
            isClearable
          />
          {/* <button
            onClick={() =>
              handleCustomDateChange(parsedStartDate, parsedEndDate)
            }
            className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition duration-200"
          >
            Apply
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
