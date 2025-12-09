import { useApiDataContext } from "@/contexts/DataContext";
import { DateRange } from "@/hooks/useApiData";
import DateRangePicker from "@/components/DateRangePicker";
import StockChart from "@/components/StockChart";
import TotalStockedByHatcheryChart from "@/components/HatcheryChart";
import SortableTable from "@/components/SortableTable";
import TopWatersChart from "@/components/TopWatersChart";
import SpeciesPieChart from "@/components/SpeciesPieChart";
import SpeciesTrendChart from "@/components/SpeciesTrendChart";
import ReleaseSizeHistogram from "@/components/ReleaseSizeHistogram";
import AverageWeightTrendChart from "@/components/AverageWeightTrendChart";
import CumulativeStockChart from "@/components/CumulativeStockChart";
import Link from "next/link";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

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
    {
      id: "stock",
      label: "Stocked over time",
      description: "Daily statewide totals",
      accent: "from-blue-500/90 to-blue-600",
    },
    {
      id: "cumulative",
      label: "Cumulative progress",
      description: "Season-to-date trajectory",
      accent: "from-purple-500/90 to-purple-600",
    },
    {
      id: "speciesTrend",
      label: "Species trends",
      description: "Momentum for the top 5 species",
      accent: "from-emerald-500/90 to-teal-500",
    },
    {
      id: "species",
      label: "Species share",
      description: "Proportion of stocking mix",
      accent: "from-sky-500/90 to-sky-600",
    },
    {
      id: "hatchery",
      label: "By hatchery",
      description: "Which facilities led production",
      accent: "from-orange-500/90 to-amber-500",
    },
    {
      id: "waters",
      label: "Top waters",
      description: "Most-targeted destinations",
      accent: "from-lime-500/90 to-lime-600",
    },
    {
      id: "releaseSizes",
      label: "Release sizes",
      description: "Distribution of drop volume",
      accent: "from-rose-500/90 to-rose-600",
    },
    {
      id: "avgWeight",
      label: "Avg weight",
      description: "Quality of fish over time",
      accent: "from-fuchsia-500/90 to-pink-500",
    },
    {
      id: "table",
      label: "Data table",
      description: "Full detailed log",
      accent: "from-slate-600/90 to-slate-700",
    },
  ];

  const quickStats = useMemo(() => {
    const releases = Array.isArray(stockedLakesData) ? stockedLakesData : [];
    const totalCount = releases.reduce(
      (sum, item) => sum + (item?.stocked_fish || 0),
      0
    );
    const topHatchery = hatcheryTotals?.[0]?.hatchery || "-";
    const topWater = releases[0]?.water_name_cleaned || "-";
    const topSpecies = releases.reduce<Record<string, number>>((acc, item) => {
      if (!item?.species) return acc;
      acc[item.species] = (acc[item.species] || 0) + (item.stocked_fish || 0);
      return acc;
    }, {});
    
    const speciesSorted = Object.entries(topSpecies).sort(
      (a, b) => (b[1] ?? 0) - (a[1] ?? 0)
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
      <div className="grid grid-cols-2 gap-4 my-6 sm:grid-cols-4">
        <StatCard label="Total Stocked" value={quickStats.totalCount} />
        <StatCard label="Top Hatchery" value={quickStats.topHatchery} />
        <StatCard label="Top Water" value={quickStats.topWater} />
        <StatCard label="Top Species" value={quickStats.topSpecies} />
      </div>

      <div className="mb-8 bg-white border shadow-sm rounded-3xl border-slate-100">
        <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-troutlytics-accent">
              Interactive map
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              Explore stocking runs spatially
            </h2>
            <p className="mt-1 text-troutlytics-subtext">
              Dive into the statewide map to see individual drop locations,
              cluster density, and route planning links.
            </p>
          </div>
          <Link
            href="/map"
            className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white transition rounded-full bg-troutlytics-primary hover:bg-troutlytics-primary/90"
          >
            Open the map
            <span className="ml-2 text-lg" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </div>
      <section className="sticky top-0 z-10 py-2">
        <DateRangePicker
          selectedDateRange={selectedDateRange}
          handleDateChange={handleDateChange}
        />
      </section>
      <div className="grid grid-cols-1 gap-3 mb-6 md:grid-cols-3 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => setActiveTab(card.id)}
            className={`relative cursor-pointer rounded-2xl border shadow-sm transition-all duration-500 ${
              activeTab === card.id
                ? `bg-gradient-to-br ${card.accent} text-white shadow-lg`
                : "bg-white text-gray-700 border-slate-200 hover:border-troutlytics-primary/40"
            }`}
          >
            <div className="flex flex-col p-5">
              <span
                className={`text-xs font-semibold tracking-[0.2em] uppercase ${
                  activeTab === card.id
                    ? "text-white/80"
                    : "text-troutlytics-subtext"
                }`}
              >
                View
              </span>
              <h3 className="mt-2 text-lg font-semibold">{card.label}</h3>
              <p
                className={`mt-1 text-sm ${
                  activeTab === card.id
                    ? "text-white/80"
                    : "text-troutlytics-subtext"
                }`}
              >
                {card.description}
              </p>
            </div>
            {activeTab === card.id && (
              <span className="absolute inset-x-5 bottom-4 h-0.5 rounded-full bg-white/60" />
            )}
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
          {activeTab === "cumulative" && (
            <CumulativeStockChart data={totalStockedByDate} />
          )}
          {activeTab === "hatchery" && (
            <TotalStockedByHatcheryChart
              data={hatcheryTotals}
              loading={isLoading}
            />
          )}
          {activeTab === "speciesTrend" && (
            <SpeciesTrendChart data={stockedLakesData} />
          )}
          {activeTab === "waters" && <TopWatersChart data={stockedLakesData} />}
          {activeTab === "species" && (
            <SpeciesPieChart data={stockedLakesData} />
          )}
          {activeTab === "releaseSizes" && (
            <ReleaseSizeHistogram data={stockedLakesData} />
          )}
          {activeTab === "avgWeight" && (
            <AverageWeightTrendChart data={stockedLakesData} />
          )}
          {activeTab === "table" && (
            <SortableTable data={stockedLakesData} loading={isLoading} />
          )}
        </motion.div>
      </div>
    </div>
  );
}
