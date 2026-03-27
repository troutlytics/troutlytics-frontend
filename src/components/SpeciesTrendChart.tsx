import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { StockedLake } from "@/hooks/useApiData";
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

const LINE_COLORS = [
  chartPalette.cyan,
  chartPalette.teal,
  chartPalette.gold,
  chartPalette.indigo,
  chartPalette.salmon,
  chartPalette.mint,
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

    const chartDatasets = sortedSpecies.map((species, index) => {
      const color = LINE_COLORS[index % LINE_COLORS.length];

      return {
        label: species,
        data: sortedDates.map((date) => ({
          x: date,
          y: dateSpeciesMap.get(date)?.get(species) ?? 0,
        })),
        borderColor: color,
        backgroundColor: withAlpha(color, 0.2),
        borderWidth: 2,
        tension: 0.25,
        pointRadius: 0,
        pointHoverRadius: 4,
      };
    });

    return {
      datasets: chartDatasets,
      label: `Top ${sortedSpecies.length} species from ${formatDate(
        selectedDateRange.pastDate
      )} to ${formatDate(selectedDateRange.recentDate)}`,
      hasData: Boolean(sortedSpecies.length),
    };
  }, [data, selectedDateRange, topSpeciesCount]);

  if (!hasData) {
    return (
      <StatePanel
        compact
        eyebrow="Species Momentum"
        title="No species trend data is available for this range."
        description="The multi-line trend needs stocking records inside the active interval before it can plot daily species movement."
      />
    );
  }

  const chartOptions = buildCartesianOptions({
    xTitle: "Date",
    yTitle: "Fish stocked",
    timeScale: true,
    showLegend: true,
    legendPosition: "bottom",
    yTicksCallback: (value) => formatInteger(Number(value)),
    tooltipCallbacks: {
      title: (ctx: any) => formatDate(ctx[0]?.parsed?.x),
      label: (ctx: any) =>
        `${ctx.dataset.label}: ${formatInteger(ctx.parsed.y ?? 0)} fish`,
    },
  });

  return (
    <ChartFrame
      eyebrow="Species Momentum"
      title={label}
      description="Compare the strongest species trajectories over time and see which trout types dominated each daily stocking wave."
    >
      <div className="chart-container">
        {/* @ts-ignore */}
        <Line
          data={{ datasets }}
          options={chartOptions}
          className="chart-size"
        />
      </div>
    </ChartFrame>
  );
};

export default SpeciesTrendChart;
