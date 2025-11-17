import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { StockedLake } from "@/hooks/useApiData";
import { useApiDataContext } from "@/contexts/DataContext";
import { formatDate } from "@/utils";

Chart.register();

const LINE_COLORS = [
  "#2C7BE5",
  "#38B2AC",
  "#F6AD55",
  "#805AD5",
  "#E53E3E",
  "#4FD1C5",
  "#DD6B20",
];

interface SpeciesTrendChartProps {
  data: StockedLake[];
  topSpeciesCount?: number;
}

const SpeciesTrendChart: React.FC<SpeciesTrendChartProps> = ({
  data,
  topSpeciesCount = 5,
}) => {
  const { selectedDateRange } = useApiDataContext();

  const { datasets, label, hasData } = useMemo(() => {
    if (!data.length) {
      return { datasets: [], label: "", hasData: false };
    }

    const dateSpeciesMap = new Map<string, Map<string, number>>();
    const speciesTotals = new Map<string, number>();

    data.forEach((record) => {
      const dateKey = record.date.split("T")[0];
      if (!dateSpeciesMap.has(dateKey)) {
        dateSpeciesMap.set(dateKey, new Map());
      }

      const species = record.species || "Unknown";
      const fishCount = record.stocked_fish || 0;
      const speciesMapForDate = dateSpeciesMap.get(dateKey)!;
      speciesMapForDate.set(
        species,
        (speciesMapForDate.get(species) || 0) + fishCount
      );
      speciesTotals.set(species, (speciesTotals.get(species) || 0) + fishCount);
    });

    const sortedSpecies = Array.from(speciesTotals.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, topSpeciesCount)
      .map(([species]) => species);

    const sortedDates = Array.from(dateSpeciesMap.keys()).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    const chartDatasets = sortedSpecies.map((species, index) => ({
      label: species,
      data: sortedDates.map((date) => ({
        x: date,
        y: dateSpeciesMap.get(date)?.get(species) ?? 0,
      })),
      borderColor: LINE_COLORS[index % LINE_COLORS.length],
      backgroundColor: `${LINE_COLORS[index % LINE_COLORS.length]}33`,
      borderWidth: 2,
      tension: 0.25,
      pointRadius: 2,
    }));

    return {
      datasets: chartDatasets,
      label: `Top ${sortedSpecies.length} species stocked between ${formatDate(
        selectedDateRange.pastDate
      )} - ${formatDate(selectedDateRange.recentDate)}`,
      hasData: Boolean(sortedSpecies.length),
    };
  }, [data, selectedDateRange, topSpeciesCount]);

  if (!hasData) {
    return (
      <div className="p-6 text-center bg-white rounded-2xl shadow-sm">
        No species data available for this range.
      </div>
    );
  }

  const chartData = {
    datasets,
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        type: "time" as const,
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Fish stocked",
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      tooltip: {
        callbacks: {
          title: (ctx: any) => formatDate(ctx[0]?.parsed?.x),
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <h2 className="mb-4 text-2xl text-center">{label}</h2>
      {/* @ts-ignore */}
      <Line data={chartData} options={chartOptions} className="chart-size" />
    </div>
  );
};

export default SpeciesTrendChart;
