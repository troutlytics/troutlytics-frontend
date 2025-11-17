import { useApiDataContext } from "@/contexts/DataContext";
import { DateRange } from "@/hooks/useApiData";
import DateRangePicker from "@/components/DateRangePicker";
import SelectedDateRange from "@/components/SelectedDateRange";
import StockChart from "@/components/StockChart";
import TotalStockedByHatcheryChart from "@/components/HatcheryChart";
import SortableTable from "@/components/SortableTable";
import TopWatersChart from "@/components/TopWatersChart";
import SpeciesPieChart from "@/components/SpeciesPieChart";
import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

const FishingMap = dynamic(() => import("../components/fishMap"), {
  ssr: false,
});

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="p-1 text-center shadow rounded-xl bg-troutlytics-card">
      <div className="text-xs font-medium text-troutlytics-subtext">
        {label}
      </div>
      <div className="font-bold text-md text-troutlytics-text">{value}</div>
    </div>
  );
}

export default function Dashboard() {
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

  const handleDateChange = (dateRange: DateRange) => {
    setSelectedDateRange(dateRange);
  };

  const cards = [
    { id: "stock", label: "Stocked Over Time", icon: "📈" },
    { id: "hatchery", label: "By Hatchery", icon: "🏭" },
    { id: "waters", label: "Top Waters", icon: "🌊" },
    { id: "species", label: "By Species", icon: "🐟" },
    { id: "table", label: "Data Table", icon: "📋" },
  ];

  const quickStats = useMemo(() => {
    const totalCount = stockedLakesData.reduce(
      (sum, item) => sum + (item.stocked_fish || 0),
      0
    );
    const topHatchery = hatcheryTotals?.[0]?.hatchery || "-";
    const topWater = stockedLakesData[0]?.water_name_cleaned || "-";
    const topSpecies = stockedLakesData.reduce<Record<string, number>>(
      (acc, item) => {
        acc[item.species] = (acc[item.species] || 0) + item.stocked_fish;
        return acc;
      },
      {}
    );
    const speciesSorted = Object.entries(topSpecies).sort(
      (a, b) => (b[1] as number) - (a[1] as number)
    );
    return {
      totalCount,
      topHatchery,
      topWater,
      topSpecies: speciesSorted[0]?.[0] || "-",
    };
  }, [stockedLakesData, hatcheryTotals]);

  return (
    <div className="container mx-auto">
      <section className="sticky top-0 z-10 py-2">
        <DateRangePicker
          selectedDateRange={selectedDateRange}
          handleDateChange={handleDateChange}
        />
        {/* <div className="mt-2 text-center">
          <SelectedDateRange
            selectedDateRange={selectedDateRange}
            today={today}
          />
        </div> */}
      </section>

      <div className="grid grid-cols-2 gap-4 my-6 sm:grid-cols-4">
        <StatCard label="Total Stocked" value={quickStats.totalCount} />
        <StatCard label="Top Hatchery" value={quickStats.topHatchery} />
        <StatCard label="Top Water" value={quickStats.topWater} />
        <StatCard label="Top Species" value={quickStats.topSpecies} />
      </div>

      <section className="mb-6">
        <FishingMap stockedLakesData={stockedLakesData} loading={isLoading} />
      </section>

      <div className="grid grid-cols-2 gap-3 mb-6 md:grid-cols-5">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => setActiveTab(card.id)}
            className={`cursor-pointer p-4 rounded-xl border shadow-sm text-center transition-all duration-700 ${
              activeTab === card.id
                ? "bg-troutlytics-primary text-white"
                : "bg-white text-gray-700 hover:bg-troutlytics-primary/10"
            }`}
          >
            <div className="text-lg">{card.icon}</div>
            <div className="text-sm font-medium">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {activeTab === "stock" && <StockChart data={totalStockedByDate} />}
          {activeTab === "hatchery" && (
            <TotalStockedByHatcheryChart
              data={hatcheryTotals}
              loading={isLoading}
            />
          )}
          {activeTab === "waters" && <TopWatersChart data={stockedLakesData} />}
          {activeTab === "species" && (
            <SpeciesPieChart data={stockedLakesData} />
          )}
          {activeTab === "table" && (
            <SortableTable data={stockedLakesData} loading={isLoading} />
          )}
        </motion.div>
      </div>
    </div>
  );
}
