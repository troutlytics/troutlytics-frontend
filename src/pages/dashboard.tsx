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
import StatePanel from "@/components/StatePanel";
import FullScreenLoader from "@/components/FullScreenLoader";
import Link from "next/link";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { formatDate } from "@/utils";
import { formatCompactNumber, formatInteger } from "@/components/chartTheme";

function StatCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="metric-card rounded-[1.5rem] px-4 py-4">
      <p className="card-eyebrow">{label}</p>
      <p className="mt-3 stat-value">{value}</p>
      <p className="mt-2 text-sm text-cyan-50/60">{helper}</p>
    </div>
  );
}

export default function Dashboard() {
  const {
    stockedLakesData,
    hatcheryTotals,
    totalStockedByDate,
    isLoading,
    hasError,
    selectedDateRange,
    setSelectedDateRange,
  } = useApiDataContext();

  const [activeTab, setActiveTab] = useState("stock");

  const handleDateChange = (dateRange: DateRange) => {
    setSelectedDateRange(dateRange);
  };

  const cards = [
    {
      id: "stock",
      label: "Daily sweep",
      description: "Statewide stocking by day",
      accent: "#63d7ff",
    },
    {
      id: "cumulative",
      label: "Season curve",
      description: "Running stocking total",
      accent: "#7ca7ff",
    },
    {
      id: "speciesTrend",
      label: "Species momentum",
      description: "Top species over time",
      accent: "#5de4c4",
    },
    {
      id: "species",
      label: "Species mix",
      description: "Share of the stocking blend",
      accent: "#9ee9ff",
    },
    {
      id: "hatchery",
      label: "Hatchery output",
      description: "Facility production leaders",
      accent: "#58d2ff",
    },
    {
      id: "waters",
      label: "Lake priority",
      description: "Most-targeted destinations",
      accent: "#5de4c4",
    },
    {
      id: "releaseSizes",
      label: "Release size",
      description: "Distribution of drop volume",
      accent: "#ffbf73",
    },
    {
      id: "avgWeight",
      label: "Weight trace",
      description: "Average fish quality",
      accent: "#ff8b95",
    },
    {
      id: "table",
      label: "Detailed log",
      description: "Full event ledger",
      accent: "#c6e6f1",
    },
  ];

  const quickStats = useMemo(() => {
    const releases = Array.isArray(stockedLakesData) ? stockedLakesData : [];
    const totalCount = releases.reduce(
      (sum, item) => sum + (item?.stocked_fish || 0),
      0
    );
    const hatcheryByTotal = hatcheryTotals?.[0]?.hatchery || "Awaiting sync";

    const waterTotals = releases.reduce<Record<string, number>>((acc, item) => {
      if (!item?.water_name_cleaned) return acc;
      acc[item.water_name_cleaned] =
        (acc[item.water_name_cleaned] || 0) + (item.stocked_fish || 0);
      return acc;
    }, {});

    const speciesTotals = releases.reduce<Record<string, number>>((acc, item) => {
      if (!item?.species) return acc;
      acc[item.species] = (acc[item.species] || 0) + (item.stocked_fish || 0);
      return acc;
    }, {});

    const latestDate = releases.reduce((latest, item) => {
      const timestamp = new Date(item?.date || "").getTime();
      return Number.isFinite(timestamp) ? Math.max(latest, timestamp) : latest;
    }, 0);

    const topWater = Object.entries(waterTotals).sort((a, b) => b[1] - a[1])[0];
    const topSpecies = Object.entries(speciesTotals).sort(
      (a, b) => b[1] - a[1]
    )[0];

    return {
      totalCount,
      totalReleases: releases.length,
      totalWaters: Object.keys(waterTotals).length,
      topHatchery: hatcheryByTotal,
      topWater: topWater?.[0] || "Awaiting sync",
      topSpecies: topSpecies?.[0] || "Awaiting sync",
      latestDate: latestDate ? formatDate(new Date(latestDate).toISOString()) : "Syncing",
    };
  }, [stockedLakesData, hatcheryTotals]);

  const activeView = cards.find((card) => card.id === activeTab) ?? cards[0];

  if (isLoading && !stockedLakesData.length && !totalStockedByDate.length) {
    return (
      <div className="page-shell">
        <FullScreenLoader
          title="Rebuilding the statewide trout dashboard"
          description="Pulling fresh stocking totals, resolving hatchery output, and aligning every chart for a new telemetry pass."
          statusItems={[
            "Syncing daily stocking totals",
            "Resolving lake activity",
            "Calibrating chart layers",
          ]}
          footerLabel="Scanning hatcheries • Mapping waters • Rendering charts"
        />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="page-shell">
        <StatePanel
          variant="error"
          eyebrow="Signal Interrupted"
          title="Dashboard telemetry could not be refreshed."
          description="The statewide stocking feed did not finish loading. Check the API connection and rerun the sweep."
          action={
            <Link href="/map" className="secondary-button">
              Open map anyway
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="page-shell space-y-6">
      <section className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="glass-panel-strong rounded-[2rem] p-6 sm:p-8">
          <div className="telemetry-kicker">
            <span className="signal-dot" />
            Live statewide telemetry
          </div>

          <div className="mt-6 max-w-4xl space-y-4">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.65em] text-cyan-100/55">
              Washington Stocking Command Deck
            </p>
            <h1 className="page-title text-balance">
              Scan trout plants like a night-water operations board.
            </h1>
            <p className="page-copy max-w-3xl">
              This dashboard turns Washington stocking records into a sonar-like
              telemetry surface. Sweep the date window, pivot across charts, and
              trace how hatcheries, waters, and species move together.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Fish stocked"
              value={formatCompactNumber(quickStats.totalCount)}
              helper={`${formatInteger(quickStats.totalCount)} fish in window`}
            />
            <StatCard
              label="Active releases"
              value={formatInteger(quickStats.totalReleases)}
              helper={`${quickStats.totalWaters} waters reached`}
            />
            <StatCard
              label="Top hatchery"
              value={quickStats.topHatchery}
              helper="Highest output facility"
            />
            <StatCard
              label="Lead species"
              value={quickStats.topSpecies}
              helper={quickStats.topWater}
            />
          </div>
        </div>

        <aside className="glass-panel rounded-[2rem] p-6 sm:p-7">
          <div className="flex h-full flex-col justify-between gap-6">
            <div className="space-y-4">
              <p className="card-eyebrow">Mission Briefing</p>
              <h2 className="text-2xl font-semibold text-white">
                Keep the signal readable.
              </h2>
              <div className="space-y-3 text-sm leading-7 text-cyan-50/68">
                <p>
                  Use the preset date sweeps for quick trend checks, then lock a
                  custom range when you need historical context.
                </p>
                <p>
                  Jump between daily, cumulative, species, hatchery, and lake
                  views without losing the same shared telemetry window.
                </p>
                <p>
                  When you need precise raw records, drop into the detailed log
                  and sort the feed directly.
                </p>
              </div>
            </div>

            <div className="space-y-3 rounded-[1.5rem] border border-cyan-100/10 bg-white/5 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <p className="card-eyebrow">Active Sweep</p>
              <p className="text-lg font-medium tracking-[-0.02em] text-white">
                {formatDate(selectedDateRange.pastDate)} -{" "}
                {formatDate(selectedDateRange.recentDate)}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-[#03141f]/70 p-4">
                  <p className="compact-label">Top water</p>
                  <p className="mt-2 text-base font-semibold text-white">
                    {quickStats.topWater}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-[#03141f]/70 p-4">
                  <p className="compact-label">Latest drop</p>
                  <p className="mt-2 text-base font-semibold text-white">
                    {quickStats.latestDate}
                  </p>
                </div>
              </div>
              <Link href="/map" className="secondary-button w-full">
                Open spatial sweep
              </Link>
            </div>
          </div>
        </aside>
      </section>

      <section>
        <DateRangePicker
          selectedDateRange={selectedDateRange}
          handleDateChange={handleDateChange}
        />
      </section>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const isActive = activeTab === card.id;

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => setActiveTab(card.id)}
              className={`rounded-[1.6rem] p-5 text-left transition ${
                isActive ? "glass-panel-strong" : "glass-panel-soft"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="card-eyebrow">View</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    {card.label}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-cyan-50/64">
                    {card.description}
                  </p>
                </div>
                <span
                  className="mt-1 h-3 w-3 shrink-0 rounded-full shadow-[0_0_18px_rgba(99,215,255,0.3)]"
                  style={{ backgroundColor: card.accent }}
                />
              </div>
              <div className="mt-5 flex items-center justify-between">
                <span className={`hud-pill px-3 py-1.5 text-[0.66rem] uppercase tracking-[0.26em] ${isActive ? "hud-pill-active" : ""}`}>
                  {isActive ? "Active view" : "Open view"}
                </span>
                <span className="text-sm text-cyan-50/44">Telemetry</span>
              </div>
            </button>
          );
        })}
      </section>

      <section className="rounded-[2rem]">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1">
          <div>
            <p className="card-eyebrow">Current focus</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              {activeView.label}
            </h2>
            <p className="mt-2 text-sm leading-7 text-cyan-50/66">
              {activeView.description}
            </p>
          </div>
          <div className="hud-pill px-4 py-2 text-xs uppercase tracking-[0.26em]">
            Live chart
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: "easeOut" }}
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
      </section>
    </div>
  );
}
