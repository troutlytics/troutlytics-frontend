// Import necessary modules
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { SelectedDateRangeProps } from "./SelectedDateRange";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Define a TypeScript type for props
type TotalStockedByHatcheryChartProps = {
  data: Array<{ hatchery: string; sum_1: number }>;
  loading: boolean;
};

const TotalStockedByHatcheryChart: React.FC<
  TotalStockedByHatcheryChartProps
> = ({ data }) => {
  // Check if lakes array is not empty

  const hatcheries = data.map((lake) => lake.hatchery);
  const totalStockedFish = data.map((lake) => lake.sum_1);

  const chartData = {
    labels: hatcheries,
    datasets: [
      {
        label: "Trout Produced",
        data: totalStockedFish,
        borderColor: "#9fd3c7",
        backgroundColor: "#9fd3c7",
        borderWidth: 1,
        pointRadius: 3,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        title: {
          display: true,
          text: "Total Produced",
        },
      },
    },
  };

  return (
    <div className="w-full">
      <h2 className="lg:text-5xl md:text-4xl sm:text-2xl">
        Total Trout Raised by Hatchery
      </h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default TotalStockedByHatcheryChart;
