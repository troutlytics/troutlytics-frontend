"use client";

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  HatcheryDataProvider,
  useHatcheryDataContext,
} from "@/contexts/HatcheryDataContext";
import { formatDate } from "@/utils";

const StatCard = ({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper?: string;
}) => (
  <div className="p-4 transition-shadow bg-white border rounded-2xl shadow-sm hover:shadow-md">
    <p className="text-xs font-semibold tracking-wide text-troutlytics-subtext uppercase">
      {label}
    </p>
    <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
    {helper && (
      <p className="mt-1 text-sm text-troutlytics-subtext">{helper}</p>
    )}
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
  <div className="p-6 bg-white rounded-2xl shadow-sm">
    <h3 className="text-lg font-semibold">{title}</h3>
    {data.length === 0 ? (
      <p className="mt-3 text-sm text-troutlytics-subtext">{emptyLabel}</p>
    ) : (
      <ul className="mt-4 space-y-3">
        {data.map((item) => (
          <li
            key={`${title}-${item.name}`}
            className="flex items-center justify-between text-sm"
          >
            <span className="font-medium">{item.name}</span>
            <span className="text-troutlytics-subtext">
              {item.total.toLocaleString()}
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
    hatcheryInsights,
    isLoading,
    hasError,
  } = useHatcheryDataContext();

  const [search, setSearch] = useState("");
  const [activeHatchery, setActiveHatchery] = useState<string | null>(null);

  const filteredNames = useMemo(() => {
    if (!search) return hatcheryNames;
    return hatcheryNames.filter((name) =>
      name.toLowerCase().includes(search.toLowerCase())
    );
  }, [hatcheryNames, search]);

  useEffect(() => {
    if (filteredNames.length === 0) {
      setActiveHatchery(null);
      return;
    }

    if (!activeHatchery || !filteredNames.includes(activeHatchery)) {
      setActiveHatchery(filteredNames[0]);
    }
  }, [filteredNames, activeHatchery]);

  const selectedInsight = useMemo(
    () =>
      hatcheryInsights.find(
        (insight) => insight.name === activeHatchery
      ) ?? null,
    [hatcheryInsights, activeHatchery]
  );

  return (
    <div className="container px-4 pb-12 mx-auto">
      <header className="max-w-3xl mb-8">
        <p className="text-sm font-semibold tracking-[0.3em] uppercase text-troutlytics-accent">
          Hatchery intelligence
        </p>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">
          Washington State trout hatchery explorer
        </h1>
        <p className="mt-4 text-lg text-troutlytics-subtext">
          Every stocking run ever recorded is rolled into these profiles so
          biologists, hatchery leads, and anglers can understand each facility’s
          unique story.
        </p>
      </header>

      <section className="p-6 mb-8 bg-white rounded-3xl shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="w-full md:w-1/2">
            <label
              htmlFor="hatchery-search"
              className="text-sm font-semibold uppercase text-troutlytics-subtext"
            >
              Search hatcheries
            </label>
            <input
              id="hatchery-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Start typing: 'Goldendale', 'Chelan', 'Naches'…"
              className="w-full px-4 py-2 mt-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-troutlytics-primary"
            />
          </div>
          <p className="text-sm text-troutlytics-subtext">
            Showing {filteredNames.length} hatcheries
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-6">
          {isLoading ? (
            Array.from({ length: 20 }).map((_, index) => (
              <div
                key={index}
                className="h-9 px-6 py-2 rounded-full bg-slate-100 animate-pulse"
              />
            ))
          ) : filteredNames.length === 0 ? (
            <p className="text-sm text-troutlytics-subtext">
              No hatcheries match that search.
            </p>
          ) : (
            filteredNames.map((name) => (
              <button
                key={name}
                onClick={() => setActiveHatchery(name)}
                className={`px-4 py-2 text-sm font-semibold rounded-full border transition ${
                  activeHatchery === name
                    ? "bg-troutlytics-primary text-white border-troutlytics-primary"
                    : "bg-white text-slate-700 border-slate-200 hover:border-troutlytics-primary"
                }`}
              >
                {name}
              </button>
            ))
          )}
        </div>
      </section>

      {hasError && (
        <p className="p-4 mb-6 text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl">
          We couldn’t load hatchery records right now. Please refresh and try
          again.
        </p>
      )}

      {isLoading && !selectedInsight ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-32 bg-slate-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : selectedInsight ? (
        <>
          <section className="mb-8">
            <div className="flex flex-col gap-2 mb-6">
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-troutlytics-accent">
                Spotlight
              </p>
              <h2 className="text-3xl font-bold">{selectedInsight.name}</h2>
              <p className="text-troutlytics-subtext">
                Total coverage based on {selectedInsight.totalReleases.toLocaleString()}{" "}
                stocking events across {selectedInsight.uniqueWaters} waters.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <StatCard
                label="Total fish stocked"
                value={selectedInsight.totalFish.toLocaleString()}
              />
              <StatCard
                label="Stocking events"
                value={selectedInsight.totalReleases.toLocaleString()}
              />
              <StatCard
                label="Unique waters served"
                value={selectedInsight.uniqueWaters.toLocaleString()}
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

          <section className="mt-8">
            <div className="p-6 bg-white rounded-2xl shadow-sm">
              <h3 className="text-lg font-semibold">Recent stocking activity</h3>
              {selectedInsight.recentReleases.length === 0 ? (
                <p className="mt-3 text-sm text-troutlytics-subtext">
                  No recent stocking data available.
                </p>
              ) : (
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left text-troutlytics-subtext">
                        <th className="py-2 pr-4">Date</th>
                        <th className="py-2 pr-4">Water</th>
                        <th className="py-2 pr-4">Species</th>
                        <th className="py-2">Fish stocked</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInsight.recentReleases.map((release) => (
                        <tr key={release.id} className="border-t">
                          <td className="py-3 pr-4">
                            {formatDate(release.date)}
                          </td>
                          <td className="py-3 pr-4">
                            {release.water_name_cleaned}
                          </td>
                          <td className="py-3 pr-4">{release.species}</td>
                          <td className="py-3">
                            {release.stocked_fish.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        </>
      ) : (
        <p className="text-troutlytics-subtext">
          Use the search to choose a hatchery and see its profile.
        </p>
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
