import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";
import { TotalStockedByDate } from "@/hooks/useApiData";
import { useApiDataContext } from "@/contexts/DataContext";
import { formatDate } from "@/utils";

interface StockChartProps {
  data: TotalStockedByDate[] | [];
}

const StockChart: React.FC<StockChartProps> = ({ data }) => {
  const { selectedDateRange } = useApiDataContext();

  Chart.register();

  const chartData = {
    datasets: [
      {
        label: `Total Released ${formatDate(
          selectedDateRange.pastDate
        )} - ${formatDate(selectedDateRange.recentDate)}`,
        backgroundColor: "#9fd3c7",
        borderColor: "#9fd3c7",
        borderWidth: 1,
        pointRadius: 2,
        data: data.map((obj) => ({
          x: obj.date,
          y: obj.stocked_fish,
        })),
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          displayFormats: {
            day: "MM/dd/yyyy",
          },
        },
        title: {
          display: true,
          text: "Date",
        },
      },
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
      {/* @ts-ignore */}
      <Line data={chartData} options={chartOptions} />
      <p className="text-center text-gray-600">
        This chart shows the accumulative number of trout released by each
        hatchery over time.
      </p>
    </div>
  );
};

export default StockChart;
