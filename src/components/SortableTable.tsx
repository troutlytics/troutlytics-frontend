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
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
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
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
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

  return (
    <div className="max-h-96 overflow-auto w-full">
      <table className="min-w-full divide-y divide-gray-300 sticky">
        <thead className="sticky top-0 bg-gray-700">
          <tr>
            {[
              "date",
              "hatchery",
              "lake",
              "species",
              "stocked_fish",
              "weight",
            ].map((field) => (
              <th
                key={field}
                className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider cursor-pointer hover:text-gray-400"
                onClick={() => sortData(field as keyof StockedLake)}
              >
                {field === 'weight' ? "Fish Per Pound" : field.replaceAll("_", " ")}
                {renderSortIcon(field)}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
              Directions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData &&
            sortedData.map((lake, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {formatDate(lake.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {lake.hatchery}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {lake.lake}
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
