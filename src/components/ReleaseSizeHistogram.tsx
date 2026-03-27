import React, { useMemo } from "react";
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

interface ReleaseSizeHistogramProps {
  data: StockedLake[];
  binCount?: number;
}

const ReleaseSizeHistogram: React.FC<ReleaseSizeHistogramProps> = ({
  data,
  binCount = 8,
}) => {
  const histogram = useMemo(() => {
    const releaseSizes = data
      .map((record) => record.stocked_fish || 0)
      .filter((value) => value > 0);

    if (!releaseSizes.length) {
      return null;
    }

    const maxValue = Math.max(...releaseSizes);
    const minValue = Math.min(...releaseSizes);
    const bins = new Array(binCount).fill(0);

    const binSize = Math.max(
      1,
      Math.ceil((maxValue - minValue) / Math.max(1, binCount - 1))
    );

    releaseSizes.forEach((value) => {
      const bucket = Math.min(
        binCount - 1,
        Math.floor((value - minValue) / binSize)
      );
      bins[bucket] += 1;
    });

    const labels = bins.map((_, index) => {
      const rangeStart = minValue + index * binSize;
      const rangeEnd = rangeStart + binSize - 1;
      return `${formatInteger(rangeStart)} - ${formatInteger(rangeEnd)}`;
    });

    return { bins, labels };
  }, [data, binCount]);

  if (!histogram) {
    return (
      <StatePanel
        compact
        eyebrow="Release Size"
        title="No release-size data is available for this sweep."
        description="There were no stocked-fish counts in the active interval, so the histogram has nothing to bucket yet."
      />
    );
  }

  const chartData = {
    labels: histogram.labels,
    datasets: [
      {
        label: "Number of releases",
        data: histogram.bins,
        backgroundColor: withAlpha(chartPalette.teal, 0.28),
        borderColor: chartPalette.teal,
        borderRadius: 10,
      },
    ],
  };

  const chartOptions = buildCartesianOptions({
    xTitle: "Fish per release",
    yTitle: "Number of releases",
    tooltipCallbacks: {
      label: (ctx: any) =>
        `${ctx.label}: ${formatInteger(ctx.parsed.y ?? 0)} releases`,
    },
  });

  return (
    <ChartFrame
      eyebrow="Release Size"
      title="Distribution of stocking event sizes"
      description="Each column shows how many stocking events landed inside the indicated fish-count bucket, helping you spot common release magnitudes."
      footer="Each bar represents the count of stocking events that fall inside the displayed release-size bucket."
    >
      <div className="chart-container">
        {/* @ts-ignore */}
        <Bar data={chartData} options={chartOptions} className="chart-size" />
      </div>
    </ChartFrame>
  );
};

export default ReleaseSizeHistogram;
