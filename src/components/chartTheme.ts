import { ChartOptions } from "chart.js";

const TICK_COLOR = "rgba(214, 243, 255, 0.7)";
const GRID_COLOR = "rgba(158, 233, 255, 0.08)";
const BORDER_COLOR = "rgba(158, 233, 255, 0.12)";
const TITLE_COLOR = "rgba(190, 227, 240, 0.58)";
const TOOLTIP_BG = "rgba(2, 12, 20, 0.96)";
const TOOLTIP_BORDER = "rgba(158, 233, 255, 0.16)";

export const chartPalette = {
  cyan: "#63d7ff",
  ice: "#9ee9ff",
  blue: "#58d2ff",
  teal: "#5de4c4",
  gold: "#ffbf73",
  salmon: "#ff8b95",
  indigo: "#7ca7ff",
  mint: "#7df2d1",
};

export const withAlpha = (hex: string, alpha: number) => {
  const normalized = hex.replace("#", "");
  const fullHex =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : normalized;
  const value = Number.parseInt(fullHex, 16);

  if (Number.isNaN(value)) return hex;

  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

interface CartesianOptionsConfig {
  xTitle: string;
  yTitle: string;
  showLegend?: boolean;
  legendPosition?: "top" | "bottom" | "left" | "right";
  indexAxis?: "x" | "y";
  timeScale?: boolean;
  stacked?: boolean;
  yTicksCallback?: (value: string | number) => string;
  xTicksCallback?: (value: string | number) => string;
  tooltipCallbacks?: Record<string, (...args: any[]) => string>;
}

export const buildCartesianOptions = ({
  xTitle,
  yTitle,
  showLegend = false,
  legendPosition = "top",
  indexAxis = "x",
  timeScale = false,
  stacked = false,
  yTicksCallback,
  xTicksCallback,
  tooltipCallbacks,
}: CartesianOptionsConfig): ChartOptions<any> => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index",
    intersect: false,
  },
  animation: {
    duration: 620,
  },
  layout: {
    padding: {
      top: 8,
      right: 8,
      left: 0,
      bottom: 0,
    },
  },
  elements: {
    line: {
      capBezierPoints: true,
    },
  },
  indexAxis,
  scales: {
    x: {
      type: timeScale ? "time" : "category",
      grid: {
        color: GRID_COLOR,
        drawTicks: false,
      },
      border: {
        color: BORDER_COLOR,
      },
      ticks: {
        color: TICK_COLOR,
        padding: 10,
        maxRotation: 0,
        callback: xTicksCallback,
      },
      title: {
        display: true,
        text: xTitle,
        color: TITLE_COLOR,
        font: {
          size: 11,
          weight: 600,
        },
      },
      stacked,
    },
    y: {
      beginAtZero: true,
      grid: {
        color: GRID_COLOR,
        drawTicks: false,
      },
      border: {
        color: BORDER_COLOR,
      },
      ticks: {
        color: TICK_COLOR,
        padding: 10,
        callback: yTicksCallback,
      },
      title: {
        display: true,
        text: yTitle,
        color: TITLE_COLOR,
        font: {
          size: 11,
          weight: 600,
        },
      },
      stacked,
    },
  },
  plugins: {
    legend: {
      display: showLegend,
      position: legendPosition,
      labels: {
        color: TICK_COLOR,
        usePointStyle: true,
        pointStyle: "circle",
        boxWidth: 10,
        boxHeight: 10,
        padding: 18,
      },
    },
    tooltip: {
      backgroundColor: TOOLTIP_BG,
      titleColor: "#ffffff",
      bodyColor: "rgba(214, 243, 255, 0.88)",
      borderColor: TOOLTIP_BORDER,
      borderWidth: 1,
      displayColors: true,
      boxPadding: 4,
      padding: 12,
      titleMarginBottom: 8,
      bodySpacing: 6,
      cornerRadius: 16,
      callbacks: tooltipCallbacks,
    },
  },
});

export const buildPieOptions = (
  tooltipCallbacks?: Record<string, (...args: any[]) => string>
): ChartOptions<"pie"> => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 620,
  },
  layout: {
    padding: {
      top: 12,
      right: 12,
      left: 12,
      bottom: 12,
    },
  },
  plugins: {
    legend: {
      position: "right",
      labels: {
        color: TICK_COLOR,
        usePointStyle: true,
        pointStyle: "circle",
        boxWidth: 10,
        boxHeight: 10,
        padding: 18,
      },
    },
    tooltip: {
      backgroundColor: TOOLTIP_BG,
      titleColor: "#ffffff",
      bodyColor: "rgba(214, 243, 255, 0.88)",
      borderColor: TOOLTIP_BORDER,
      borderWidth: 1,
      displayColors: true,
      boxPadding: 4,
      padding: 12,
      titleMarginBottom: 8,
      bodySpacing: 6,
      cornerRadius: 16,
      callbacks: tooltipCallbacks,
    },
  },
});

export const formatCompactNumber = (value: number) =>
  new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: value >= 1000 ? 1 : 0,
  }).format(value);

export const formatInteger = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);
