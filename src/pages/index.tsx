import { useApiDataContext } from "@/contexts/DataContext";

import { DateRange } from "@/hooks/useApiData";
import DateRangePicker from "@/components/DateRangePicker";
import SelectedDateRange from "@/components/SelectedDateRange";
import StockChart from "@/components/StockChart";
import TotalStockedByHatcheryChart from "@/components/HatcheryChart";
import SortableTable from "@/components/SortableTable";
import dynamic from "next/dynamic";
import { useState } from "react";
import TopWatersChart from "@/components/TopWatersChart";
import SpeciesPieChart from "@/components/SpeciesPieChart";
const FishingMap = dynamic(() => import("../components/fishMap"), {
  ssr: false,
});

export default function Home() {
  const {
    stockedLakesData,
    hatcheryTotals,
    totalStockedByDate,
    isLoading,
    selectedDateRange,
    setSelectedDateRange,
    today,
  } = useApiDataContext();
  const [activeTab, setActiveTab] = useState("stock");

  const tabStyle = (tab: string) =>
    `px-4 py-2 font-medium border-b-2 transition-all duration-200 ${
      activeTab === tab
        ? "border-troutlytics-primary text-troutlytics-primary"
        : "border-transparent text-gray-500 hover:text-troutlytics-primary"
    }`;

  const handleDateChange = (dateRange: DateRange) => {
    setSelectedDateRange(dateRange);
  };

  return (
    <div className="container mx-auto px-4 pb-8">
      <header className=" mb-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Washington State DFW Trout Stocking Data
        </h1>
        <p className="text-lg text-gray-600 lg:w-3xl">
          Explore the data on trout stocking in Washington State, including
          locations, hatcheries, and trends over time.
        </p>
      </header>
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
          <FishingMap stockedLakesData={stockedLakesData} loading={isLoading} />
        </section>

        <section className="mt-10 col-span-1 lg:col-span-2">
          <div className="flex justify-center space-x-6 border-b [&>button]:cursor-pointer overflow-auto">
            <button
              className={tabStyle("stock")}
              onClick={() => setActiveTab("stock")}
            >
              Total Stocked Over Time
            </button>
            <button
              className={tabStyle("hatchery")}
              onClick={() => setActiveTab("hatchery")}
            >
              Total Stocked by Hatchery
            </button>
            <button
              className={tabStyle("waters")}
              onClick={() => setActiveTab("waters")}
            >
              Top Waters
            </button>
            <button
              className={tabStyle("species")}
              onClick={() => setActiveTab("species")}
            >
              By Species
            </button>
            <button
              className={tabStyle("table")}
              onClick={() => setActiveTab("table")}
            >
              Breakdown
            </button>
          </div>

          <div className="mt-6">
            {activeTab === "stock" && <StockChart data={totalStockedByDate} />}
            {activeTab === "hatchery" && (
              <TotalStockedByHatcheryChart
                data={hatcheryTotals}
                loading={isLoading}
              />
            )}
            {activeTab === "waters" && (
              <TopWatersChart data={stockedLakesData} />
            )}
            {activeTab === "species" && (
              <SpeciesPieChart data={stockedLakesData} />
            )}
            {activeTab === "table" && (
              <SortableTable data={stockedLakesData} loading={isLoading} />
            )}
          </div>
        </section>
        {/* <section id="table-widget" className="col-span-1 lg:col-span-1">
          <TotalStockedByHatcheryChart
            data={hatcheryTotals}
            loading={isLoading}
          />
        </section>
        <section id="stock-chart-widget" className="col-span-1 lg:col-span-1">
          <StockChart data={totalStockedByDate} />
        </section> */}
        {/* <section className="col-span-1 lg:col-span-2">
          <SortableTable data={stockedLakesData} loading={isLoading} />
        </section> */}
      </div>
    </div>
  );
}
