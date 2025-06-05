// components/SpeciesPieChart.tsx
import React from "react";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { StockedLake } from "@/hooks/useApiData";
import { useApiDataContext } from "@/contexts/DataContext";
import { formatDate } from "@/utils";
interface SpeciesPieChartProps {
  data: StockedLake[];
}

const SPECIES_COLORS: Record<string, string> = {
  Rainbow: "#2C7BE5", // sky blue
  Cutthroat: "#38B2AC", // teal
  Brook: "#9fd3c7", // light teal
  Brown: "#2A4365", // deep blue
  // …add other species as needed
};

const SpeciesPieChart: React.FC<SpeciesPieChartProps> = ({ data }) => {
  const { selectedDateRange } = useApiDataContext();

  // 1) Sum stocked_fish by species
  const totalsBySpecies: Record<string, number> = {};
  data.forEach((entry) => {
    const sp = entry.species;
    totalsBySpecies[sp] = (totalsBySpecies[sp] || 0) + entry.stocked_fish;
  });

  const speciesLabels = Object.keys(totalsBySpecies);
  const speciesCounts = speciesLabels.map((sp) => totalsBySpecies[sp]);
  const backgroundColors = speciesLabels.map(
    (sp) => SPECIES_COLORS[sp] || "#E2E8F0" // fallback gray if not in map
  );

  // 2) Build chart.js data
  const chartData = {
    labels: speciesLabels,
    datasets: [
      {
        label: `Total Stocked Between ${formatDate(
          selectedDateRange.pastDate
        )} - ${formatDate(selectedDateRange.recentDate)}`,
        data: speciesCounts,
        backgroundColor: backgroundColors,
        borderColor: "#FFFFFF",
        borderWidth: 1,
      },
    ],
  };

  // 3) Chart options
  const chartOptions = {
    plugins: {
      legend: {
        position: "right" as const,
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const label = ctx.label || "";
            const value = ctx.raw;
            return `${label}: ${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full">
      <h2 className="text-center text-2xl mb-4">
        Species Stocked Between {"  "}
        {formatDate(selectedDateRange.pastDate)} -
        {formatDate(selectedDateRange.recentDate)}
      </h2>
      {/* @ts-ignore */}
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default SpeciesPieChart;
