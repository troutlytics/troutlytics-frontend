import { DateRange } from "@/hooks/useApiData";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isoFormat } from "@/utils";
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
  const [highlight, setHighlight] = useState(false);

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
    if (
      isoFormat(recentDate) !== selectedDateRange.recentDate ||
      isoFormat(pastDate) !== selectedDateRange.pastDate
    ) {
      handleDateChange({
        recentDate: recentDate ? isoFormat(recentDate) : null,
        pastDate: pastDate ? isoFormat(pastDate) : null,
      });
    }
  };

  const handlePresetClick = (days: number) => {
    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - days);

    // trigger a single-run ping animation
    setHighlight(true);
    setTimeout(() => setHighlight(false), 100);

    handleCustomDateChange(pastDate, today);
  };

  return (
    <div className="container px-0">
      <div className="flex flex-col justify-between w-full p-1 bg-blue-300 opacity-75 md:flex-row rounded-xl">
        <div>
          <h2 className="z-10 hidden mx-auto mb-1 text-xs font-bold text-gray-900 md:flex">
            Select a fixed date range or pick a custom range
          </h2>
          <div className="flex flex-wrap justify-between gap-6">
            <div className="flex space-x-2 mb-1 [&>button]:cursor-pointer text-xs ">
              <button
                onClick={() => handlePresetClick(7)}
                className="troutlytics-btn"
              >
                Last 7 Days
              </button>
              <button
                onClick={() => handlePresetClick(30)}
                className="troutlytics-btn"
              >
                Last 30 Days
              </button>
              <button
                onClick={() => handlePresetClick(90)}
                className="troutlytics-btn"
              >
                Last 90 Days
              </button>
              <button
                onClick={() => handlePresetClick(365)}
                className="troutlytics-btn"
              >
                Last Year
              </button>
              <button
                onClick={() => handlePresetClick(730)}
                className="troutlytics-btn"
              >
                Last 2 Years
              </button>
            </div>
          </div>
        </div>
        <div
          className={
            `text-xs flex gap-3 mx-auto text-center align-baseline md:flex-row sm:mx-0 transition-transform ` +
            (highlight ? "animate-ping" : "")
          }
          style={highlight ? { animationIterationCount: 1 } : undefined}
        >
          <div className="flex flex-col w-1/2 text-left">
            <label htmlFor="past-date-picker">From</label>
            <DatePicker
              id="past-date-picker"
              selected={pastDate}
              onChange={(date) => handleCustomDateChange(date, recentDate)}
              selectsStart
              maxDate={recentDate ?? undefined}
              className="date-picker"
              isClearable
            />
          </div>
          <div className="flex flex-col w-1/2 text-left">
            <label htmlFor="recent-date-picker">To</label>
            <DatePicker
              id="recent-date-picker"
              selected={recentDate}
              onChange={(date) => handleCustomDateChange(pastDate, date)}
              selectsEnd
              minDate={pastDate ?? undefined}
              maxDate={new Date()}
              className="date-picker"
              isClearable
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
