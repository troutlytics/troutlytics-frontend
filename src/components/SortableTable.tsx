import React, { useEffect, useMemo, useState } from "react";
import { StockedLake } from "../hooks/useApiData";
import { formatDate } from "@/utils";
import ChartFrame from "./ChartFrame";
import StatePanel from "./StatePanel";
import { formatInteger } from "./chartTheme";

interface SortableTableProps {
  data: StockedLake[] | [];
  loading: boolean;
}

const thNames: Record<keyof Pick<
  StockedLake,
  | "date"
  | "water_name_cleaned"
  | "hatchery"
  | "species"
  | "stocked_fish"
  | "weight"
  | "directions"
>, string> = {
  date: "Date",
  water_name_cleaned: "Body of water",
  hatchery: "Hatchery",
  species: "Species",
  stocked_fish: "Amount stocked",
  weight: "Fish per pound",
  directions: "Route",
};

const SortableTable: React.FC<SortableTableProps> = ({ data, loading }) => {
  const [sortedData, setSortedData] = useState<StockedLake[] | []>([]);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [sortedColumn, setSortedColumn] =
    useState<keyof typeof thNames | null>("date");

  useEffect(() => {
    if (!loading) {
      setSortedData(data);
    }
  }, [loading, data]);

  const totalRows = useMemo(
    () => (Array.isArray(sortedData) ? sortedData.length : 0),
    [sortedData]
  );

  const sortData = (field: keyof typeof thNames) => {
    const newData = [...sortedData];
    const nextDirection =
      sortedColumn === field && sortDirection === "desc" ? "asc" : "desc";

    newData.sort((a, b) => {
      if (field === "date") {
        const dateA = new Date(a[field]).getTime();
        const dateB = new Date(b[field]).getTime();
        return nextDirection === "asc" ? dateA - dateB : dateB - dateA;
      }

      if (a[field] < b[field]) return nextDirection === "asc" ? -1 : 1;
      if (a[field] > b[field]) return nextDirection === "asc" ? 1 : -1;
      return 0;
    });

    setSortedData(newData);
    setSortDirection(nextDirection);
    setSortedColumn(field);
  };

  const renderSortIcon = (field: keyof typeof thNames) => {
    if (sortedColumn !== field) return "↕";
    return sortDirection === "asc" ? "↑" : "↓";
  };

  const SkeletonRow = () => (
    <tr className="border-b border-white/6">
      {Object.values(thNames).map((header) => (
        <td key={header} className="px-4 py-4">
          <div className="h-2.5 w-full animate-pulse rounded-full bg-white/10" />
        </td>
      ))}
    </tr>
  );

  if (!loading && !sortedData.length) {
    return (
      <StatePanel
        compact
        eyebrow="Detailed Log"
        title="No stocking events are available for this range."
        description="Widen the active telemetry window to inspect the detailed event ledger."
      />
    );
  }

  return (
    <ChartFrame
      eyebrow="Detailed Log"
      title="Stocking event ledger"
      description="Sort the raw stocking feed by date, water, hatchery, or release count to inspect the full signal behind the dashboard."
      headerRight={
        <div className="hud-pill px-4 py-2 text-xs uppercase tracking-[0.24em]">
          {loading ? "Syncing log" : `${formatInteger(totalRows)} records`}
        </div>
      }
    >
      <div className="table-shell trout-scrollbar overflow-auto rounded-[1.4rem]">
        <table className="min-w-full divide-y divide-white/8">
          <thead className="sticky top-0 z-10 bg-[#051826]/94 backdrop-blur-xl">
            <tr>
              {Object.entries(thNames).map(([key, label]) => (
                <th
                  key={key}
                  className="px-4 py-4 text-left text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-cyan-50/58"
                >
                  <button
                    type="button"
                    onClick={() => sortData(key as keyof typeof thNames)}
                    className="flex items-center gap-2 transition hover:text-white"
                  >
                    <span>{label}</span>
                    <span className="text-[0.7rem] text-cyan-50/44">
                      {renderSortIcon(key as keyof typeof thNames)}
                    </span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/6">
            {loading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <SkeletonRow key={index} />
                ))
              : sortedData.map((lake) => (
                  <tr
                    key={lake.id}
                    className="transition hover:bg-white/[0.035]"
                  >
                    <td className="px-4 py-4 text-sm text-cyan-50/76 whitespace-nowrap">
                      {formatDate(lake.date)}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-white whitespace-nowrap">
                      {lake.water_name_cleaned}
                    </td>
                    <td className="px-4 py-4 text-sm text-cyan-50/72 whitespace-nowrap">
                      {lake.hatchery}
                    </td>
                    <td className="px-4 py-4 text-sm text-cyan-50/72 whitespace-nowrap">
                      {lake.species}
                    </td>
                    <td className="px-4 py-4 text-sm text-cyan-50/72 whitespace-nowrap">
                      {formatInteger(lake.stocked_fish)}
                    </td>
                    <td className="px-4 py-4 text-sm text-cyan-50/72 whitespace-nowrap">
                      {lake.weight}
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      <a
                        href={lake.directions}
                        target="_blank"
                        rel="noreferrer"
                        className="ghost-button px-3 py-1.5 text-[0.66rem] uppercase tracking-[0.24em]"
                      >
                        Directions
                      </a>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </ChartFrame>
  );
};

export default SortableTable;
