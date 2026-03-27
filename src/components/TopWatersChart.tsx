import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { StockedLake } from "@/hooks/useApiData";
import ChartFrame from "./ChartFrame";
import StatePanel from "./StatePanel";
import {
  buildCartesianOptions,
  chartPalette,
  formatInteger,
  withAlpha,
} from "./chartTheme";

interface TopWatersChartProps {
  data: StockedLake[];
  topN?: number;
}

const TopWatersChart: React.FC<TopWatersChartProps> = ({ data, topN = 10 }) => {
  const totalsByWater: Record<string, number> = {};

  data.forEach((entry) => {
    const water = entry.water_name_cleaned;
    totalsByWater[water] = (totalsByWater[water] || 0) + entry.stocked_fish;
  });

  const sortedWaters = Object.entries(totalsByWater)
    .sort(([, aCount], [, bCount]) => bCount - aCount)
    .slice(0, topN);

  if (!sortedWaters.length) {
    return (
      <StatePanel
        compact
        eyebrow="Lake Priority"
        title="No targeted waters were returned for this sweep."
        description="There were no stocked-water records in the current selection. Expand the date range to surface the busiest lakes."
      />
    );
  }

  const labels = sortedWaters.map(([water]) => water);
  const counts = sortedWaters.map(([, count]) => count);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Fish stocked",
        data: counts,
        backgroundColor: withAlpha(chartPalette.teal, 0.26),
        borderColor: chartPalette.teal,
        borderWidth: 1.2,
        borderRadius: 10,
      },
    ],
  };

  const chartOptions = buildCartesianOptions({
    indexAxis: "y",
    xTitle: "Fish stocked",
    yTitle: "Water body",
    yTicksCallback: undefined,
    xTicksCallback: (value) => formatInteger(Number(value)),
    tooltipCallbacks: {
      label: (ctx: any) =>
        `${ctx.label}: ${formatInteger(ctx.parsed.x ?? 0)} fish`,
    },
  });

  return (
    <ChartFrame
      eyebrow="Lake Priority"
      title={`Top ${topN} waters by stocking volume`}
      description="This horizontal ranking shows which water bodies absorbed the highest share of fish during the current telemetry interval."
    >
      <div className="chart-container">
        {/* @ts-ignore */}
        <Bar data={chartData} options={chartOptions} className="chart-size" />
      </div>
    </ChartFrame>
  );
};

export default TopWatersChart;
