import { DateRange } from "@/hooks/useApiData";
import React, { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isoFormat } from "@/utils";

interface DateRangePickerProps {
  selectedDateRange: DateRange;
  handleDateChange: (dateRange: DateRange) => void;
}

const presets = [
  { label: "Last 7 Days", days: 7 },
  { label: "Last 30 Days", days: 30 },
  { label: "Last 90 Days", days: 90 },
  { label: "Last Year", days: 365 },
  { label: "Last 2 Years", days: 730 },
];

const dayDifference = (
  startValue?: string | null,
  endValue?: string | null
) => {
  if (!startValue || !endValue) return null;

  const start = new Date(startValue);
  const end = new Date(endValue);
  const difference = end.getTime() - start.getTime();

  if (!Number.isFinite(difference)) return null;

  return Math.round(difference / (1000 * 60 * 60 * 24));
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  selectedDateRange,
  handleDateChange,
}) => {
  const [recentDate, setRecentDate] = useState<Date | null | undefined>(null);
  const [pastDate, setPastDate] = useState<Date | null | undefined>(null);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (selectedDateRange.recentDate) {
      setRecentDate(new Date(selectedDateRange.recentDate));
    }
    if (selectedDateRange.pastDate) {
      setPastDate(new Date(selectedDateRange.pastDate));
    }
  }, [selectedDateRange]);

  const activePreset = useMemo(() => {
    const diff = dayDifference(
      selectedDateRange.pastDate,
      selectedDateRange.recentDate
    );

    return presets.find((preset) => preset.days === diff)?.days ?? null;
  }, [selectedDateRange]);

  const handleCustomDateChange = (
    nextPastDate: Date | null | undefined,
    nextRecentDate: Date | null | undefined
  ) => {
    setRecentDate(nextRecentDate);
    setPastDate(nextPastDate);

    if (
      isoFormat(nextRecentDate) !== selectedDateRange.recentDate ||
      isoFormat(nextPastDate) !== selectedDateRange.pastDate
    ) {
      handleDateChange({
        recentDate: nextRecentDate ? isoFormat(nextRecentDate) : null,
        pastDate: nextPastDate ? isoFormat(nextPastDate) : null,
      });
    }
  };

  const handlePresetClick = (days: number) => {
    const today = new Date();
    const nextPastDate = new Date(today);

    nextPastDate.setDate(today.getDate() - days);
    setHighlight(true);
    window.setTimeout(() => setHighlight(false), 160);
    handleCustomDateChange(nextPastDate, today);
  };

  return (
    <div className="glass-panel rounded-[1.7rem] px-4 py-4 sm:px-5">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-2xl">
          <p className="card-eyebrow">Temporal Sweep</p>
          <h2 className="mt-2 text-xl font-semibold text-white">
            Tune the telemetry window
          </h2>
          <p className="mt-2 text-sm leading-7 text-cyan-50/68">
            Lock the scan to a quick recent sweep or bracket a custom date range
            for deeper historical review.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {presets.map((preset) => {
              const isActive = activePreset === preset.days;

              return (
                <button
                  key={preset.days}
                  type="button"
                  onClick={() => handlePresetClick(preset.days)}
                  className={`hud-pill px-4 py-2 text-xs uppercase tracking-[0.24em] ${
                    isActive ? "hud-pill-active" : ""
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className={`grid w-full gap-3 sm:grid-cols-2 xl:max-w-xl ${
            highlight ? "scale-[1.01]" : ""
          }`}
        >
          <div>
            <label
              htmlFor="past-date-picker"
              className="compact-label mb-2 block"
            >
              From
            </label>
            <DatePicker
              id="past-date-picker"
              selected={pastDate}
              onChange={(date) => handleCustomDateChange(date, recentDate)}
              selectsStart
              maxDate={recentDate ?? undefined}
              className="custom-input"
              isClearable
              placeholderText="Start date"
            />
          </div>

          <div>
            <label
              htmlFor="recent-date-picker"
              className="compact-label mb-2 block"
            >
              To
            </label>
            <DatePicker
              id="recent-date-picker"
              selected={recentDate}
              onChange={(date) => handleCustomDateChange(pastDate, date)}
              selectsEnd
              minDate={pastDate ?? undefined}
              maxDate={new Date()}
              className="custom-input"
              isClearable
              placeholderText="End date"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
