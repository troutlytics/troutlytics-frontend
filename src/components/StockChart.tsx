import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { TotalStockedByDate } from "@/hooks/useApiData";
import { useApiDataContext } from "@/contexts/DataContext";
import { formatDate } from "@/utils";
import ChartFrame from "./ChartFrame";
import StatePanel from "./StatePanel";
import {
  buildCartesianOptions,
  chartPalette,
  formatInteger,
  withAlpha,
} from "./chartTheme";

interface StockChartProps {
  data: TotalStockedByDate[] | [];
}

const StockChart: React.FC<StockChartProps> = ({ data }) => {
  const { selectedDateRange } = useApiDataContext();

  if (!data?.length) {
    return (
      <StatePanel
        compact
        eyebrow="Daily Sweep"
        title="No statewide stocking signals were returned."
        description="Expand the selected time window or choose a different interval to chart daily stocking totals."
      />
    );
  }

  const chartData = {
    datasets: [
      {
        label: `Total stocked between ${formatDate(
          selectedDateRange.pastDate
        )} and ${formatDate(selectedDateRange.recentDate)}`,
        backgroundColor: withAlpha(chartPalette.cyan, 0.14),
        borderColor: chartPalette.cyan,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: chartPalette.ice,
        pointHoverBorderWidth: 0,
        tension: 0.24,
        fill: true,
        data: data.map((obj) => ({
          x: obj.date,
          y: obj.stocked_fish,
        })),
      },
    ],
  };

  const chartOptions = buildCartesianOptions({
    xTitle: "Date",
    yTitle: "Fish stocked",
    timeScale: true,
    yTicksCallback: (value) => formatInteger(Number(value)),
    tooltipCallbacks: {
      label: (ctx: any) =>
        `${ctx.dataset.label}: ${formatInteger(ctx.parsed.y ?? 0)} fish`,
    },
  });

  return (
    <ChartFrame
      eyebrow="Daily Sweep"
      title="Statewide stocking telemetry by day"
      description="Track how planting volume rises and falls across the selected window. The line highlights daily statewide throughput."
    >
      <div className="chart-container">
        {/* @ts-ignore */}
        <Line data={chartData} options={chartOptions} className="chart-size" />
      </div>
    </ChartFrame>
  );
};

export default StockChart;
