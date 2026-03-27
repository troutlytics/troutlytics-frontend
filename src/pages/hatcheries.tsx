"use client";

import React, { useMemo, useState } from "react";
import {
  HatcheryDataProvider,
  useHatcheryDataContext,
} from "@/contexts/HatcheryDataContext";
import { formatDate } from "@/utils";
import FullScreenLoader from "@/components/FullScreenLoader";
import StatePanel from "@/components/StatePanel";
import { formatCompactNumber, formatInteger } from "@/components/chartTheme";

const StatCard = ({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper?: string;
}) => (
  <div className="metric-card rounded-[1.5rem] px-4 py-4">
    <p className="card-eyebrow">{label}</p>
    <p className="mt-3 stat-value">{value}</p>
    {helper ? (
      <p className="mt-2 text-sm leading-6 text-cyan-50/60">{helper}</p>
    ) : null}
  </div>
);

const BreakdownList = ({
  title,
  data,
  emptyLabel,
}: {
  title: string;
  data: { name: string; total: number }[];
  emptyLabel: string;
}) => (
  <div className="glass-panel rounded-[1.8rem] p-6">
    <p className="card-eyebrow">{title}</p>
    <h3 className="mt-3 text-2xl font-semibold text-white">{title}</h3>
    {data.length === 0 ? (
      <p className="mt-4 text-sm leading-7 text-cyan-50/62">{emptyLabel}</p>
    ) : (
      <ul className="mt-6 space-y-3">
        {data.map((item) => (
          <li
            key={`${title}-${item.name}`}
            className="flex items-center justify-between gap-4 rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3 text-sm"
          >
            <span className="font-medium text-white">{item.name}</span>
            <span className="text-cyan-50/66">
              {formatInteger(item.total)}
            </span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const HatcheryExplorer = () => {
  const {
    hatcheryNames,
    activeHatchery,
    setActiveHatchery,
    selectedInsight,
    isNamesLoading,
    isInsightLoading,
    hasError,
  } = useHatcheryDataContext();

  const [search, setSearch] = useState("");
  const [isSelectorCollapsed, setIsSelectorCollapsed] = useState(false);

  const filteredNames = useMemo(() => {
    if (!search) return hatcheryNames;
    return hatcheryNames.filter((name) =>
      name.toLowerCase().includes(search.toLowerCase())
    );
  }, [hatcheryNames, search]);

  if (isNamesLoading && !hatcheryNames.length) {
    return (
      <div className="page-shell">
        <FullScreenLoader
          title="Resolving hatchery intelligence"
          description="Loading facility rosters, indexing hatchery names, and preparing profile telemetry for the explorer."
          statusItems={[
            "Indexing hatchery names",
            "Linking profile metrics",
            "Preparing activity ledger",
          ]}
          footerLabel="Scanning hatcheries • Linking waters • Priming profiles"
        />
      </div>
    );
  }

  return (
    <div className="page-shell space-y-6">
      <section className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="glass-panel-strong rounded-[2rem] p-6 sm:p-8">
          <div className="telemetry-kicker">
            <span className="signal-dot" />
            Hatchery intelligence
          </div>

          <div className="mt-6 max-w-4xl space-y-4">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.65em] text-cyan-100/55">
              Facility Profiles
            </p>
            <h1 className="page-title text-balance">
              Compare Washington hatcheries through long-range stocking
              telemetry.
            </h1>
            <p className="page-copy max-w-3xl">
              Every stocking run rolls up into a living hatchery profile so you
              can inspect water coverage, species distribution, timing, and
              production scale from a single command surface.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="metric-card rounded-[1.45rem] px-4 py-4">
              <p className="card-eyebrow">Facilities indexed</p>
              <p className="mt-3 stat-value">
                {formatInteger(hatcheryNames.length)}
              </p>
            </div>
            <div className="metric-card rounded-[1.45rem] px-4 py-4">
              <p className="card-eyebrow">Active profile</p>
              <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                {activeHatchery || "Awaiting selection"}
              </p>
            </div>
            <div className="metric-card rounded-[1.45rem] px-4 py-4">
              <p className="card-eyebrow">Filtered names</p>
              <p className="mt-3 stat-value">
                {formatInteger(filteredNames.length)}
              </p>
            </div>
          </div>
        </div>

        <aside className="glass-panel rounded-[2rem] p-6 sm:p-7">
          <p className="card-eyebrow">How To Read It</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            Profile the statewide network quickly.
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-cyan-50/68">
            <p>
              Search or browse the hatchery roster, then open a profile to load
              its lifetime footprint across waters and species.
            </p>
            <p>
              The spotlight metrics summarize scale, coverage, timing, and fish
              quality before the lists drill into top waters and mix.
            </p>
            <p>
              Recent activity stays visible below so you can jump from summary
              telemetry to individual events without losing context.
            </p>
          </div>
        </aside>
      </section>

      <section className="glass-panel-strong rounded-[2rem] p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="card-eyebrow">Hatchery Selector</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              Load a facility profile
            </h2>
            <p className="mt-2 text-sm leading-7 text-cyan-50/66">
              Choose a hatchery to open its telemetry profile. Search filters
              the roster locally without changing data loading.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsSelectorCollapsed((prev) => !prev)}
            aria-expanded={!isSelectorCollapsed}
            className="ghost-button self-start lg:self-auto"
          >
            {isSelectorCollapsed ? "Show hatchery list" : "Hide hatchery list"}
          </button>
        </div>

        {isSelectorCollapsed ? (
          <p className="mt-5 text-sm leading-7 text-cyan-50/64">
            Selector minimized.{" "}
            {activeHatchery
              ? `Current profile: ${activeHatchery}.`
              : "No hatchery profile selected yet."}
          </p>
        ) : (
          <>
            <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <label
                  htmlFor="hatchery-search"
                  className="compact-label mb-2 block"
                >
                  Search hatcheries
                </label>
                <input
                  id="hatchery-search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Goldendale, Chelan, Naches..."
                  className="custom-input"
                />
              </div>
              <div className="hud-pill px-4 py-3 text-xs uppercase tracking-[0.28em]">
                {formatInteger(filteredNames.length)} visible
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {isNamesLoading ? (
                Array.from({ length: 16 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-10 w-32 animate-pulse rounded-full border border-white/6 bg-white/6"
                  />
                ))
              ) : filteredNames.length === 0 ? (
                <p className="text-sm leading-7 text-cyan-50/62">
                  No hatcheries match that search.
                </p>
              ) : (
                filteredNames.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setActiveHatchery(name)}
                    className={`hud-pill px-4 py-2 text-xs uppercase tracking-[0.24em] ${
                      activeHatchery === name ? "hud-pill-active" : ""
                    }`}
                  >
                    {name}
                  </button>
                ))
              )}
            </div>
          </>
        )}
      </section>

      {hasError ? (
        <StatePanel
          compact
          variant="error"
          eyebrow="Profile Error"
          title="The hatchery profile feed could not be loaded."
          description="The explorer can’t resolve hatchery records right now. Refresh once the upstream API is available again."
        />
      ) : null}

      {isInsightLoading && activeHatchery ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="metric-card h-36 animate-pulse rounded-[1.5rem]"
            />
          ))}
        </section>
      ) : selectedInsight ? (
        <>
          <section className="glass-panel-strong rounded-[2rem] p-6 sm:p-7">
            <div className="flex flex-col gap-3">
              <p className="card-eyebrow">Spotlight</p>
              <h2 className="text-3xl font-semibold text-white">
                {selectedInsight.name}
              </h2>
              <p className="text-sm leading-7 text-cyan-50/66">
                {selectedInsight.totalReleases > 0
                  ? `This profile aggregates ${formatInteger(
                      selectedInsight.totalReleases
                    )} stocking events across ${formatInteger(
                      selectedInsight.uniqueWaters
                    )} waters.`
                  : "No stocking records were returned for this hatchery yet."}
              </p>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              <StatCard
                label="Total fish stocked"
                value={formatCompactNumber(selectedInsight.totalFish)}
                helper={`${formatInteger(selectedInsight.totalFish)} fish total`}
              />
              <StatCard
                label="Stocking events"
                value={formatInteger(selectedInsight.totalReleases)}
              />
              <StatCard
                label="Unique waters served"
                value={formatInteger(selectedInsight.uniqueWaters)}
              />
              <StatCard
                label="Average fish weight"
                value={
                  selectedInsight.averageWeight
                    ? `${selectedInsight.averageWeight.toFixed(2)} lbs`
                    : "—"
                }
                helper="Average of all reported weights"
              />
              <StatCard
                label="First recorded stocking"
                value={
                  selectedInsight.firstStockDate
                    ? formatDate(selectedInsight.firstStockDate)
                    : "—"
                }
              />
              <StatCard
                label="Most recent stocking"
                value={
                  selectedInsight.lastStockDate
                    ? formatDate(selectedInsight.lastStockDate)
                    : "—"
                }
              />
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <BreakdownList
              title="Top waters served"
              data={selectedInsight.topWaters}
              emptyLabel="We have not recorded any water bodies for this hatchery yet."
            />
            <BreakdownList
              title="Species breakdown"
              data={selectedInsight.speciesBreakdown}
              emptyLabel="No species data recorded for this hatchery."
            />
          </section>

          {selectedInsight.extraMetrics.length > 0 ? (
            <section className="glass-panel rounded-[1.8rem] p-6">
              <p className="card-eyebrow">Additional Profile Metrics</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                Supplemental telemetry
              </h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {selectedInsight.extraMetrics.map((metric) => (
                  <div
                    key={`${metric.label}-${metric.value}`}
                    className="rounded-[1.35rem] border border-white/8 bg-white/[0.04] p-4"
                  >
                    <p className="compact-label">{metric.label}</p>
                    <p className="mt-2 text-base font-semibold text-white">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section className="glass-panel-strong rounded-[2rem] p-6">
            <div className="flex flex-col gap-2">
              <p className="card-eyebrow">Recent Activity</p>
              <h3 className="text-2xl font-semibold text-white">
                Latest stocking ledger
              </h3>
            </div>

            {selectedInsight.recentReleases.length === 0 ? (
              <p className="mt-4 text-sm leading-7 text-cyan-50/64">
                No recent stocking data available.
              </p>
            ) : (
              <div className="table-shell trout-scrollbar mt-5 overflow-x-auto rounded-[1.4rem]">
                <table className="min-w-full">
                  <thead className="bg-[#051826]/94">
                    <tr className="text-left">
                      <th className="px-4 py-4 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-cyan-50/58">
                        Date
                      </th>
                      <th className="px-4 py-4 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-cyan-50/58">
                        Water
                      </th>
                      <th className="px-4 py-4 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-cyan-50/58">
                        Species
                      </th>
                      <th className="px-4 py-4 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-cyan-50/58">
                        Fish stocked
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/6">
                    {selectedInsight.recentReleases.map((release) => (
                      <tr
                        key={release.id}
                        className="transition hover:bg-white/[0.035]"
                      >
                        <td className="px-4 py-4 text-sm text-cyan-50/76">
                          {formatDate(release.date)}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-white">
                          {release.water_name_cleaned}
                        </td>
                        <td className="px-4 py-4 text-sm text-cyan-50/72">
                          {release.species}
                        </td>
                        <td className="px-4 py-4 text-sm text-cyan-50/72">
                          {formatInteger(release.stocked_fish)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      ) : (
        <StatePanel
          compact
          eyebrow="Awaiting Profile"
          title="Choose a hatchery to unlock its telemetry profile."
          description="The explorer only loads profile analytics after a hatchery is selected from the roster above."
        />
      )}
    </div>
  );
};

const HatcheriesPage = () => (
  <HatcheryDataProvider>
    <HatcheryExplorer />
  </HatcheryDataProvider>
);

export default HatcheriesPage;
