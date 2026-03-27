import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { StockedLake } from "@/hooks/useApiData";
import { useApiDataContext } from "@/contexts/DataContext";
import { formatDate } from "@/utils";
import ChartFrame from "./ChartFrame";
import StatePanel from "./StatePanel";
import { buildCartesianOptions, chartPalette, withAlpha } from "./chartTheme";

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

    return sortedDates
      .map((date) => {
        const entry = weightsByDate.get(date)!;
        return {
          x: date,
          y: entry.totalFish > 0 ? entry.totalPounds / entry.totalFish : 0,
        };
      })
      .filter((point) => point.y > 0);
  }, [data]);

  if (!trendData.length) {
    return (
      <StatePanel
        compact
        eyebrow="Weight Trace"
        title="No reported fish-weight telemetry is available."
        description="Average weight is only plotted when the incoming stocking records include fish-per-pound data."
      />
    );
  }

  const chartData = {
    datasets: [
      {
        label: `Average fish weight from ${formatDate(
          selectedDateRange.pastDate
        )} to ${formatDate(selectedDateRange.recentDate)}`,
        data: trendData,
        borderColor: chartPalette.gold,
        backgroundColor: withAlpha(chartPalette.gold, 0.18),
        tension: 0.25,
        pointRadius: 0,
        pointHoverRadius: 4,
        fill: true,
      },
    ],
  };

  const chartOptions = buildCartesianOptions({
    xTitle: "Date",
    yTitle: "Average weight (lbs)",
    timeScale: true,
    tooltipCallbacks: {
      label: (ctx: any) =>
        `${ctx.dataset.label}: ${(ctx.parsed.y ?? 0).toFixed(2)} lbs`,
    },
  });

  return (
    <ChartFrame
      eyebrow="Weight Trace"
      title="Average fish weight over time"
      description="Use the weight trace to monitor how planted fish quality shifts throughout the selected stocking interval."
    >
      <div className="chart-container">
        {/* @ts-ignore */}
        <Line data={chartData} options={chartOptions} className="chart-size" />
      </div>
    </ChartFrame>
  );
};

export default AverageWeightTrendChart;
