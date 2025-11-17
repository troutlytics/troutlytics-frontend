import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { TotalStockedByDate } from "@/hooks/useApiData";
import { useApiDataContext } from "@/contexts/DataContext";
import { formatDate } from "@/utils";

Chart.register();

interface CumulativeStockChartProps {
  data: TotalStockedByDate[];
}

const CumulativeStockChart: React.FC<CumulativeStockChartProps> = ({
  data,
}) => {
  const { selectedDateRange } = useApiDataContext();

  const cumulativeSeries = useMemo(() => {
    if (!data?.length) return [];

    const sorted = [...data].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    let runningTotal = 0;

    return sorted.map((entry) => {
      runningTotal += entry.stocked_fish || 0;
      return {
        x: entry.date,
        y: runningTotal,
      };
    });
  }, [data]);

  if (!cumulativeSeries.length) {
    return (
      <div className="p-6 text-center bg-white rounded-2xl shadow-sm">
        No cumulative data is available for this range.
      </div>
    );
  }

  const chartData = {
    datasets: [
      {
        label: `Cumulative stockings (${formatDate(
          selectedDateRange.pastDate
        )} - ${formatDate(selectedDateRange.recentDate)})`,
        data: cumulativeSeries,
        borderColor: "#805AD5",
        backgroundColor: "rgba(128, 90, 213, 0.15)",
        borderWidth: 2,
        tension: 0.15,
        pointRadius: 0,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        type: "time" as const,
        title: { display: true, text: "Date" },
      },
      y: {
        title: { display: true, text: "Running total of fish stocked" },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <h2 className="mb-4 text-2xl text-center">
        Cumulative progress across the selected range
      </h2>
      {/* @ts-ignore */}
      <Line data={chartData} options={chartOptions} className="chart-size" />
    </div>
  );
};

export default CumulativeStockChart;
