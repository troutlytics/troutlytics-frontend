import { useApiDataContext } from "@/contexts/DataContext";
import { DateRange } from "@/hooks/useApiData";
import DateRangePicker from "@/components/DateRangePicker";
import dynamic from "next/dynamic";
import FullScreenLoader from "@/components/FullScreenLoader";
import StatePanel from "@/components/StatePanel";
import { formatDate } from "@/utils";
import { formatInteger } from "@/components/chartTheme";

const FishingMap = dynamic(() => import("../components/fishMap"), {
  ssr: false,
});

const MapPage = () => {
  const {
    stockedLakesData,
    isLoading,
    hasError,
    selectedDateRange,
    setSelectedDateRange,
  } = useApiDataContext();

  const handleDateChange = (range: DateRange) => {
    setSelectedDateRange(range);
  };

  const uniqueWaters = new Set(
    stockedLakesData.map((item) => item.water_name_cleaned).filter(Boolean)
  ).size;
  const uniqueHatcheries = new Set(
    stockedLakesData.map((item) => item.hatchery).filter(Boolean)
  ).size;
  const latestStockDate = stockedLakesData.reduce((latest, item) => {
    const timestamp = new Date(item.date).getTime();
    return Number.isFinite(timestamp) ? Math.max(latest, timestamp) : latest;
  }, 0);

  if (isLoading && !stockedLakesData.length) {
    return (
      <div className="page-shell">
        <FullScreenLoader
          title="Tracing statewide stocking coordinates"
          description="Resolving lake positions, clustering route targets, and preparing the radar map for a fresh sweep."
          statusItems={[
            "Resolving coordinate clusters",
            "Preparing route overlays",
            "Rendering map telemetry",
          ]}
          footerLabel="Syncing coordinates • Clustering markers • Readying routes"
        />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="page-shell">
        <StatePanel
          variant="error"
          eyebrow="Map Signal Lost"
          title="The coordinate sweep could not be completed."
          description="The map feed failed before the stocking targets finished loading. Refresh once the API signal stabilizes."
        />
      </div>
    );
  }

  return (
    <div className="page-shell space-y-6">
      <section className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="glass-panel-strong rounded-[2rem] p-6 sm:p-8">
          <div className="telemetry-kicker">
            <span className="signal-dot" />
            Interactive stocking radar
          </div>

          <div className="mt-6 max-w-4xl space-y-4">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.65em] text-cyan-100/55">
              Spatial Sweep
            </p>
            <h1 className="page-title text-balance">
              Track Washington stocking targets through a dark-water map sweep.
            </h1>
            <p className="page-copy max-w-3xl">
              Cluster historical plants, drill into individual waters, and jump
              straight to route guidance without leaving the telemetry shell.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="metric-card rounded-[1.45rem] px-4 py-4">
              <p className="card-eyebrow">Signals plotted</p>
              <p className="mt-3 stat-value">
                {formatInteger(stockedLakesData.length)}
              </p>
            </div>
            <div className="metric-card rounded-[1.45rem] px-4 py-4">
              <p className="card-eyebrow">Waters scanned</p>
              <p className="mt-3 stat-value">{formatInteger(uniqueWaters)}</p>
            </div>
            <div className="metric-card rounded-[1.45rem] px-4 py-4">
              <p className="card-eyebrow">Hatcheries linked</p>
              <p className="mt-3 stat-value">
                {formatInteger(uniqueHatcheries)}
              </p>
            </div>
          </div>
        </div>

        <aside className="glass-panel rounded-[2rem] p-6 sm:p-7">
          <div className="space-y-4">
            <p className="card-eyebrow">Sweep Notes</p>
            <h2 className="text-2xl font-semibold text-white">
              Read the state spatially.
            </h2>
            <div className="space-y-3 text-sm leading-7 text-cyan-50/68">
              <p>
                Marker clusters condense overlapping targets until you zoom in
                on individual stocking waters.
              </p>
              <p>
                Popups summarize every stocking signal at the same coordinates,
                including date, species, release count, and route access.
              </p>
              <p>
                Use the same date controls as the dashboard so every map sweep
                stays aligned with the rest of the telemetry deck.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-cyan-100/10 bg-white/5 p-4">
            <p className="card-eyebrow">Latest plotted drop</p>
            <p className="mt-3 text-lg font-medium tracking-[-0.02em] text-white">
              {latestStockDate
                ? formatDate(new Date(latestStockDate).toISOString())
                : "Syncing"}
            </p>
            <p className="mt-3 text-sm leading-6 text-cyan-50/60">
              Active sweep window: {formatDate(selectedDateRange.pastDate)} -{" "}
              {formatDate(selectedDateRange.recentDate)}
            </p>
          </div>
        </aside>
      </section>

      <section>
        <DateRangePicker
          selectedDateRange={selectedDateRange}
          handleDateChange={handleDateChange}
        />
      </section>

      <section className="glass-panel-strong rounded-[2rem] p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-2">
          <div>
            <p className="card-eyebrow">Radar Surface</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Clustered stocking targets across Washington
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="hud-pill px-4 py-2 text-xs uppercase tracking-[0.24em]">
              {formatInteger(stockedLakesData.length)} plotted signals
            </span>
            <span className="hud-pill px-4 py-2 text-xs uppercase tracking-[0.24em]">
              {formatInteger(uniqueWaters)} waters
            </span>
          </div>
        </div>
        <FishingMap stockedLakesData={stockedLakesData} loading={isLoading} />
      </section>
    </div>
  );
};

export default MapPage;
