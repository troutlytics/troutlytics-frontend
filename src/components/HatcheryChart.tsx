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
  const hatcheries = data?.map((lake) => lake.hatchery);
  const totalStockedFish = data?.map((lake) => lake.sum_1);

  const chartData = {
    labels: hatcheries,
    datasets: [
      {
        label: `Total Stocked Between ${formatDate(
          selectedDateRange.pastDate
        )} - ${formatDate(selectedDateRange.recentDate)}`,
        data: totalStockedFish,
        backgroundColor: "rgba(44, 123, 229, 0.7)", // troutlytics.primary with opacity
        borderColor: "#2C7BE5",
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
          text: "Total Stocked",
        },
      },
      x: {
        title: {
          display: true,
          text: "Hatchery",
        },
      },
    },
  };

  return (
    <div className="w-full">
      <h2 className="text-center text-2xl">Total Stocked by Hatchery Statewide</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default TotalStockedByHatcheryChart;
