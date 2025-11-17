import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { StockedLake } from "@/hooks/useApiData";
import { useApiDataContext } from "@/contexts/DataContext";
import { formatDate } from "@/utils";

Chart.register();

interface AverageWeightTrendChartProps {
  data: StockedLake[];
}

const AverageWeightTrendChart: React.FC<AverageWeightTrendChartProps> = ({
  data,
}) => {
  const { selectedDateRange } = useApiDataContext();

  const trendData = useMemo(() => {
    const weightsByDate = new Map<
      string,
      { totalFish: number; totalPounds: number }
    >();

    data.forEach((record) => {
      const fish = record.stocked_fish || 0;
      const fishPerPound = Number(record.weight) || 0;
      if (!fish || !fishPerPound) return;

      const pounds = fish / fishPerPound;
      const dateKey = record.date.split("T")[0];

      if (!weightsByDate.has(dateKey)) {
        weightsByDate.set(dateKey, { totalFish: 0, totalPounds: 0 });
      }

      const entry = weightsByDate.get(dateKey)!;
      entry.totalFish += fish;
      entry.totalPounds += pounds;
    });

    const sortedDates = Array.from(weightsByDate.keys()).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    const points = sortedDates.map((date) => {
      const entry = weightsByDate.get(date)!;
      return {
        x: date,
        y: entry.totalFish > 0 ? entry.totalPounds / entry.totalFish : 0,
      };
    });

    return points.filter((point) => point.y > 0);
  }, [data]);

  if (!trendData.length) {
    return (
      <div className="p-6 text-center bg-white rounded-2xl shadow-sm">
        No weight data is available for this view.
      </div>
    );
  }

  const chartData = {
    datasets: [
      {
        label: `Average fish weight (${formatDate(
          selectedDateRange.pastDate
        )} - ${formatDate(selectedDateRange.recentDate)})`,
        data: trendData,
        borderColor: "#DD6B20",
        backgroundColor: "rgba(221, 107, 32, 0.2)",
        tension: 0.25,
        pointRadius: 2,
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
        title: { display: true, text: "Average weight (lbs)" },
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx: any) =>
            `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)} lbs`,
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <h2 className="mb-4 text-2xl text-center">
        Average weights of stocked fish
      </h2>
      {/* @ts-ignore */}
      <Line data={chartData} options={chartOptions} className="chart-size" />
    </div>
  );
};

export default AverageWeightTrendChart;
