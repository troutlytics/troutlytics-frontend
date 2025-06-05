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
        label: `Total Stocked Between ${formatDate(
          selectedDateRange.pastDate
        )} - ${formatDate(selectedDateRange.recentDate)}`,
        backgroundColor: "rgba(44, 123, 229, 0.7)", // troutlytics.primary with opacity
        borderColor: "#2C7BE5",
        borderWidth: 1,
        pointRadius: 2,
        data: data?.map((obj) => ({
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
          text: "Total Stocked",
        },
      },
    },
  };

  return (
    <div className="w-full">
      <h2 className="text-center text-2xl">Total Stocked in Over Time Statewide</h2>
      {/* @ts-ignore */}
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default StockChart;
