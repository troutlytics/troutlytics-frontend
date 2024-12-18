import React, { useState } from "react";
import { useApiDataContext } from "@/contexts/DataContext";

import DateRange from "../components/DateRangePicker";
import DateRangePicker from "../components/DateRangePicker";
import SelectedDateRange from "@/components/SelectedDateRange";
import StockChart from "../components/StockChart";
import TotalStockedByHatcheryChart from "../components/HatcheryChart";
import SortableTable from "../components/SortableTable";
import dynamic from "next/dynamic";
const FishingMap = dynamic(() => import("../components/fishMap"), {
  ssr: false,
});
export default function Home() {
  // Use context for API data and date range
  const {
    stockedLakesData,
    hatcheryTotals,
    totalStockedByDate,
    loading,
    selectedDateRange,
    setSelectedDateRange,
    today,
  } = useApiDataContext();

  const handleDateChange = (dateRange: DateRange) => {
    setSelectedDateRange(dateRange);
  };

  return (
    <>
      <section
        id="date-widget"
        className="z-1 lg:max-w-5xl sm:max-w-screen w-full font-mono text-sm mb-10 overflow-auto"
      >
        <h2 className="lg:text-5xl md:text-4xl sm:text-2xl mb-5">
          Trout Raised in Washington State
        </h2>
        <DateRangePicker
          selectedDateRange={selectedDateRange}
          handleDateChange={handleDateChange}
        />
        <div id="selected-date-range" className="text-center w-full mt-5">
          <SelectedDateRange
            selectedDateRange={selectedDateRange}
            today={today}
          />
        </div>
      </section>
      <section
        id="map-widget"
        className="z-0 max-w-screen w-full text-sm mb-10 "
      >
        <FishingMap
          selectedDateRange={selectedDateRange}
          stockedLakesData={stockedLakesData}
          loading={loading}
        />
      </section>
      <section
        id="table-and-charts"
        className="z-0 max-w-screen w-full items-center justify-between font-mono text-sm lg:flex flex-col mb-10 gap-10"
      >
        <SortableTable data={stockedLakesData} loading={loading} />

        <StockChart data={totalStockedByDate} />

        <TotalStockedByHatcheryChart data={hatcheryTotals} loading={loading} />
      </section>
    </>
  );
}
