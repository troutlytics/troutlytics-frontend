import React, { useState } from "react";
import { useApiDataContext } from "@/contexts/DataContext";

import { DateRange } from "@/hooks/useApiData";
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
    <div className="container mx-auto px-4 pb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Trout Raised in Washington State
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section id="date-widget" className="col-span-1 lg:col-span-2">
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
        <section id="map-widget" className="col-span-1 lg:col-span-2">
          <FishingMap
            selectedDateRange={selectedDateRange}
            stockedLakesData={stockedLakesData}
            loading={loading}
          />
        </section>
        <section id="table-widget" className="col-span-1 lg:col-span-1">
          <SortableTable data={stockedLakesData} loading={loading} />
        </section>
        <section id="stock-chart-widget" className="col-span-1 lg:col-span-1">
          <StockChart data={totalStockedByDate} />
        </section>
        <section
          id="hatchery-chart-widget"
          className="col-span-1 lg:col-span-2"
        >
          <TotalStockedByHatcheryChart
            data={hatcheryTotals}
            loading={loading}
          />
        </section>
      </div>
    </div>
  );
}
