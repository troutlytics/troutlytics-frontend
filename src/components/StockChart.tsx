import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";

interface StockChartProps {
  data: [string, number][];
  loading: boolean;
}

const StockChart: React.FC<StockChartProps> = ({ data }) => {
  Chart.register();
  
  if (data && data.length > 0) {
    const chartData = {
      datasets: [
        {
          label: "Amount Stocked",
          backgroundColor: "#9fd3c7",
          borderColor: "#9fd3c7",
          borderWidth: 1,
          pointRadius: 2,
          data: data.map(([date, totalStocked]) => ({
            x: date,
            y: totalStocked
          })),
        },
      ],
    };

    const chartOptions = {
      scales: {
        x: {
          type: "time",
          time: {
            unit: 'day',
            displayFormats: {
              day: 'MM/dd/yyyy'
            }
          },
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Total Stocked'
          }
        }
      },

    };

    return (
      <div className="w-full">
        <h2 className="lg:text-5xl md:text-4xl sm:text-2xl">
          Total Stocked in Washington by Date
        </h2>
        {/* @ts-ignore */}
        <Line data={chartData} options={chartOptions} />
      </div>
    );
  } else {
    return <div>NO DATA</div>;
  }
};

export default StockChart;
