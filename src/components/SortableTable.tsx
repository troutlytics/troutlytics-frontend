import React, { useState, useEffect } from "react";
import { StockedLake } from "../hooks/useApiData";
import { formatDate } from "@/utils";
interface SortableTableProps {
  data: StockedLake[] | [];
  loading: boolean;
}
const SortableTable: React.FC<SortableTableProps> = ({ data, loading }) => {
  const [sortedData, setSortedData] = useState<StockedLake[] | []>([]);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) {
      setSortedData(data);
    }
  }, [loading, data]);

  const sortData = (field: keyof StockedLake) => {
    const newData = [...sortedData];
    newData.sort((a, b) => {
      if (field === "date") {
        const dateA = new Date(a[field]).getTime();
        const dateB = new Date(b[field]).getTime();
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      } else {
        if (a[field] < b[field]) return sortDirection === "asc" ? -1 : 1;
        if (a[field] > b[field]) return sortDirection === "asc" ? 1 : -1;
        return 0;
      }
    });
    setSortedData(newData);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    setSortedColumn(field);
  };

  const renderSortIcon = (field: string) => {
    return sortedColumn === field
      ? sortDirection === "asc"
        ? " ↓"
        : " ↑"
      : "";
  };

  const thNames = {
    date: "date",
    // lake: "lake",
    water_name_cleaned: "body of water",
    hatchery: "hatchery",
    species: "species",
    stocked_fish: "amount stocked",
    weight: "fish per pound",
    directions: "directions",
  };

  const HeaderRow = () => {
    return (
      <tr>
        {Object.keys(thNames).map((key) => (
          <th
            key={key}
            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-200 uppercase cursor-pointer hover:text-gray-400"
            onClick={() => sortData(key as keyof StockedLake)}
          >
            {/* @ts-ignore */}
            {thNames[key].replaceAll("_", " ")}
            {renderSortIcon(key)}
          </th>
        ))}
      </tr>
    );
  };

  // Skeleton Row for loading state
  const SkeletonRow = () => (
    <tr>
      {/* Adjust the number of cells to match your table's column count */}
      {Object.values(thNames).map((_, index) => (
        <td
          key={index}
          className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap animate-pulse"
        >
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-48 mb-4"></div>
        </td>
      ))}
    </tr>
  );

  const SkeletonBody = () => {
    return (
      <>
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
      </>
    );
  };

  return (
    <div className="w-full overflow-auto chart-container">
      <table className="sticky min-w-full divide-y divide-gray-300 chart-size">
        <thead className="sticky top-0 bg-gray-700">
          <HeaderRow />
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading && <SkeletonBody />}
          {sortedData &&
            sortedData.map((lake, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {formatDate(lake.date)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {lake.water_name_cleaned}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {lake.hatchery}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {lake.species}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {lake.stocked_fish}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {lake.weight}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                  <a
                    href={lake.directions}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Directions
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SortableTable;
