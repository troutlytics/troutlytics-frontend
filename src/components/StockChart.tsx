import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";
import { TotalStockedByDate } from "@/hooks/useApiData";

interface StockChartProps {
  data: TotalStockedByDate[] | [];
}

const StockChart: React.FC<StockChartProps> = ({ data }) => {
  Chart.register();
  console.log(data);
  const chartData = {
    datasets: [
      {
        label: "Trout Produced",
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
          text: "Total Produced",
        },
      },
    },
  };

  return (
    <div className="w-full">
      <h2 className="lg:text-5xl md:text-4xl sm:text-2xl">
        Total Trout Raised by Date
      </h2>
      {/* @ts-ignore */}
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default StockChart;
