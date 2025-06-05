// components/TopWatersChart.tsx
import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { StockedLake } from "@/hooks/useApiData";
import { useApiDataContext } from "@/contexts/DataContext";
import { formatDate } from "@/utils";

interface TopWatersChartProps {
  data: StockedLake[];
  topN?: number; // how many waters to display (default: 10)
}

const TopWatersChart: React.FC<TopWatersChartProps> = ({ data, topN = 10 }) => {
  const { selectedDateRange } = useApiDataContext();

  // 1) Aggregate total stocked fish by water_name_cleaned
  const totalsByWater: Record<string, number> = {};
  data.forEach((entry) => {
    const water = entry.water_name_cleaned;
    totalsByWater[water] = (totalsByWater[water] || 0) + entry.stocked_fish;
  });

  // 2) Sort waters by descending total, then take top N
  const sortedWaters = Object.entries(totalsByWater)
    .sort(([, aCount], [, bCount]) => bCount - aCount)
    .slice(0, topN);

  const labels = sortedWaters.map(([water]) => water);
  const counts = sortedWaters.map(([, count]) => count);

  // 3) Build chart.js data object
  const chartData = {
    labels,
    datasets: [
      {
        // label: `Top ${topN} Waters (${formatLabelRange(selectedDateRange)})`,
        label: `Total Stocked Between ${formatDate(
          selectedDateRange.pastDate
        )} - ${formatDate(selectedDateRange.recentDate)}`,
        data: counts,
        backgroundColor: "rgba(44, 123, 229, 0.7)", // troutlytics.primary with opacity
        borderColor: "#2C7BE5",
        borderWidth: 1,
      },
    ],
  };

  // 4) Chart options
  const chartOptions = {
    indexAxis: "y" as const, // horizontal bar
    scales: {
      x: {
        title: {
          display: true,
          text: "Total Fish Stocked",
        },
        beginAtZero: true,
      },
      y: {
        title: {
          display: true,
          text: "Water Name",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-full">
      <h2 className="text-center text-2xl mb-4">
        Top {topN} Waters stocked between{"  "}
        {formatDate(selectedDateRange.pastDate)} -
        {formatDate(selectedDateRange.recentDate)}
      </h2>
      {/* @ts-ignore */}
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default TopWatersChart;
