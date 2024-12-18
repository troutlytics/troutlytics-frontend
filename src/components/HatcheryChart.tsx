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
import { HatcheryTotal } from "@/hooks/useApiData";
import { formatDate } from "@/utils";
import { useApiDataContext } from "@/contexts/DataContext";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type TotalStockedByHatcheryChartProps = {
  data: HatcheryTotal[];
  loading: boolean;
};

const TotalStockedByHatcheryChart: React.FC<
  TotalStockedByHatcheryChartProps
> = ({ data }) => {
  const { selectedDateRange } = useApiDataContext();
  const hatcheries = data.map((lake) => lake.hatchery);
  const totalStockedFish = data.map((lake) => lake.sum_1);

  const chartData = {
    labels: hatcheries,
    datasets: [
      {
        label: `Total Released ${formatDate(
          selectedDateRange.pastDate
        )} - ${formatDate(selectedDateRange.recentDate)}`,
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
          text: "Total Released",
        },
      },
    },
  };

  return (
    <div className="w-full">
      <Bar data={chartData} options={chartOptions} />
      <p className="text-center text-gray-600 ">
        This chart shows the total number of trout released by each hatchery.
      </p>
    </div>
  );
};

export default TotalStockedByHatcheryChart;
