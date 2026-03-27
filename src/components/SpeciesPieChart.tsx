import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { StockedLake } from "@/hooks/useApiData";
import ChartFrame from "./ChartFrame";
import StatePanel from "./StatePanel";
import {
  buildPieOptions,
  chartPalette,
  formatInteger,
  withAlpha,
} from "./chartTheme";

interface SpeciesPieChartProps {
  data: StockedLake[];
}

const SPECIES_COLORS: Record<string, string> = {
  Rainbow: chartPalette.cyan,
  Cutthroat: chartPalette.teal,
  Brook: chartPalette.ice,
  Brown: chartPalette.gold,
  Steelhead: chartPalette.indigo,
};

const fallbackColors = [
  chartPalette.cyan,
  chartPalette.teal,
  chartPalette.gold,
  chartPalette.indigo,
  chartPalette.salmon,
  chartPalette.mint,
];

const SpeciesPieChart: React.FC<SpeciesPieChartProps> = ({ data }) => {
  const totalsBySpecies: Record<string, number> = {};

  data.forEach((entry) => {
    const species = entry.species;
    totalsBySpecies[species] = (totalsBySpecies[species] || 0) + entry.stocked_fish;
  });

  const speciesLabels = Object.keys(totalsBySpecies);

  if (!speciesLabels.length) {
    return (
      <StatePanel
        compact
        eyebrow="Species Mix"
        title="No species mix was returned for this scan."
        description="There are no stocked-fish species records in the active date window."
      />
    );
  }

  const speciesCounts = speciesLabels.map((species) => totalsBySpecies[species]);
  const backgroundColors = speciesLabels.map(
    (species, index) =>
      SPECIES_COLORS[species] ??
      withAlpha(fallbackColors[index % fallbackColors.length], 0.9)
  );

  const chartData = {
    labels: speciesLabels,
    datasets: [
      {
        label: "Species mix",
        data: speciesCounts,
        backgroundColor: backgroundColors,
        borderColor: "rgba(2, 12, 20, 0.96)",
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const chartOptions = buildPieOptions({
    label: (ctx: any) =>
      `${ctx.label}: ${formatInteger(ctx.raw ?? 0)} fish`,
  });

  return (
    <ChartFrame
      eyebrow="Species Mix"
      title="How the selected stocking mix is distributed"
      description="Use this share view to understand which trout species dominated the chosen interval and where the blend shifted."
    >
      <div className="chart-container">
        {/* @ts-ignore */}
        <Pie data={chartData} options={chartOptions} className="chart-size" />
      </div>
    </ChartFrame>
  );
};

export default SpeciesPieChart;
