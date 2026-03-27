import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { HatcheryTotal } from "@/hooks/useApiData";
import { useApiDataContext } from "@/contexts/DataContext";
import ChartFrame from "./ChartFrame";
import StatePanel from "./StatePanel";
import {
  buildCartesianOptions,
  chartPalette,
  formatInteger,
  withAlpha,
} from "./chartTheme";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type TotalStockedByHatcheryChartProps = {
  data: HatcheryTotal[];
  loading: boolean;
};

const TotalStockedByHatcheryChart: React.FC<
  TotalStockedByHatcheryChartProps
> = ({ data }) => {
  const { hatcheryTotals } = useApiDataContext();
  const chartSource = (data?.length ? data : hatcheryTotals).slice();

  if (!chartSource.length) {
    return (
      <StatePanel
        compact
        eyebrow="Hatchery Output"
        title="No hatchery output is available for this window."
        description="Try widening the selected range to compare which hatcheries drove statewide production."
      />
    );
  }

  const sortedSource = chartSource.sort((a, b) => b.sum_1 - a.sum_1);
  const hatcheries = sortedSource.map((lake) => lake.hatchery);
  const totalStockedFish = sortedSource.map((lake) => lake.sum_1);

  const chartData = {
    labels: hatcheries,
    datasets: [
      {
        label: "Fish stocked by hatchery",
        data: totalStockedFish,
        backgroundColor: withAlpha(chartPalette.ice, 0.3),
        borderColor: chartPalette.cyan,
        borderWidth: 1.4,
        borderRadius: 10,
      },
    ],
  };

  const chartOptions = buildCartesianOptions({
    xTitle: "Hatchery",
    yTitle: "Fish stocked",
    yTicksCallback: (value) => formatInteger(Number(value)),
    tooltipCallbacks: {
      label: (ctx: any) =>
        `${ctx.label}: ${formatInteger(ctx.parsed.y ?? 0)} fish`,
    },
  });

  return (
    <ChartFrame
      eyebrow="Hatchery Output"
      title="Which hatcheries carried the selected stocking window"
      description="Compare production volume across facilities to see which hatcheries were the primary drivers in the active telemetry span."
    >
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} className="chart-size" />
      </div>
    </ChartFrame>
  );
};

export default TotalStockedByHatcheryChart;
