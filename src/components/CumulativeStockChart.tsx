import React, { useMemo } from "react";
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
      <StatePanel
        compact
        eyebrow="Season Curve"
        title="No cumulative data is available for this range."
        description="The running total only appears when there are daily stocking records inside the selected window."
      />
    );
  }

  const chartData = {
    datasets: [
      {
        label: `Cumulative stocking from ${formatDate(
          selectedDateRange.pastDate
        )} to ${formatDate(selectedDateRange.recentDate)}`,
        data: cumulativeSeries,
        borderColor: chartPalette.indigo,
        backgroundColor: withAlpha(chartPalette.indigo, 0.18),
        borderWidth: 2,
        tension: 0.15,
        pointRadius: 0,
        pointHoverRadius: 4,
        fill: true,
      },
    ],
  };

  const chartOptions = buildCartesianOptions({
    xTitle: "Date",
    yTitle: "Running fish total",
    timeScale: true,
    yTicksCallback: (value) => formatInteger(Number(value)),
    tooltipCallbacks: {
      label: (ctx: any) =>
        `${ctx.dataset.label}: ${formatInteger(ctx.parsed.y ?? 0)} fish`,
    },
  });

  return (
    <ChartFrame
      eyebrow="Season Curve"
      title="Cumulative progress through the selected window"
      description="This curve reveals how quickly statewide stocking volume accumulated over time, making surges and slow periods easy to spot."
    >
      <div className="chart-container">
        {/* @ts-ignore */}
        <Line data={chartData} options={chartOptions} className="chart-size" />
      </div>
    </ChartFrame>
  );
};

export default CumulativeStockChart;
