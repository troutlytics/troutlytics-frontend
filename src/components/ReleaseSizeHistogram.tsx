import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { StockedLake } from "@/hooks/useApiData";
import { useApiDataContext } from "@/contexts/DataContext";
import { formatDate } from "@/utils";

Chart.register();

interface ReleaseSizeHistogramProps {
  data: StockedLake[];
  binCount?: number;
}

const ReleaseSizeHistogram: React.FC<ReleaseSizeHistogramProps> = ({
  data,
  binCount = 8,
}) => {
  const { selectedDateRange } = useApiDataContext();

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
      return `${rangeStart.toLocaleString()} - ${rangeEnd.toLocaleString()}`;
    });

    return { bins, labels };
  }, [data, binCount]);

  if (!histogram) {
    return (
      <div className="p-6 text-center bg-white rounded-2xl shadow-sm">
        No release size data available for this range.
      </div>
    );
  }

  const chartData = {
    labels: histogram.labels,
    datasets: [
      {
        label: `Release size distribution (${formatDate(
          selectedDateRange.pastDate
        )} - ${formatDate(selectedDateRange.recentDate)})`,
        data: histogram.bins,
        backgroundColor: "rgba(56, 178, 172, 0.7)",
        borderColor: "#38B2AC",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Fish per release",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of releases",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="chart-container">
      <h2 className="mb-4 text-2xl text-center">
        Release size distribution
      </h2>
      {/* @ts-ignore */}
      <Bar data={chartData} options={chartOptions} className="chart-size" />
      <p className="mt-2 text-sm text-center text-troutlytics-subtext">
        Each bar shows how many stocking events fall within the indicated
        release-size bucket.
      </p>
    </div>
  );
};

export default ReleaseSizeHistogram;
