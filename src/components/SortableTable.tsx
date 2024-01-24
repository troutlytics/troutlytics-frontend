import React, { ReactNode, useState, useEffect } from "react";
import { StockedLake } from "../hooks/useApiData";

interface SortableTableProps {
  data: StockedLake[] | [];
  formatDate: (arg0: string | undefined) => string | undefined;
  loading: boolean;
}
const SortableTable: React.FC<SortableTableProps> = ({
  data,
  formatDate,
  loading,
}) => {
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
        // Parse dates and compare
        const dateA = new Date(a[field]);
        const dateB = new Date(b[field]);
        return sortDirection === "desc"
          ? dateA.getDate() - dateB.getDate()
          : dateB.getDate() - dateA.getDate();
      } else {
        // Existing logic for other fields
        if (a[field] < b[field]) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (a[field] > b[field]) {
          return sortDirection === "asc" ? 1 : -1;
        }
      }
      return 0;
    });

    setSortedData(newData);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    setSortedColumn(field as string);
  };

  const renderSortIcon = (field: string) => {
    return sortedColumn === field
      ? sortDirection === "asc"
        ? " ↑"
        : " ↓"
      : "";
  };

  const thNames = {
    date: "date",
    lake: "lake",
    hatchery: "hatchery",
    species: "species",
    stocked_fish: "amount produced",
    weight: "fish per pound",
    directions: "directions",
  };

  const HeaderRow = () => {
    return (
      <tr>
        {Object.keys(thNames).map((key) => (
          <th
            key={key}
            className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider cursor-pointer hover:text-gray-400"
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
          className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 animate-pulse"
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
    <div className="max-h-96 overflow-auto w-full">
      <table className="min-w-full divide-y divide-gray-300 sticky">
        <thead className="sticky top-0 bg-gray-700">
          <HeaderRow />
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {(loading || data.length == 0) && <SkeletonBody />}
          {sortedData &&
            sortedData.map((lake, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {formatDate(lake.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {lake.lake}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {lake.hatchery}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {lake.species}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {lake.stocked_fish}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {lake.weight}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
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
