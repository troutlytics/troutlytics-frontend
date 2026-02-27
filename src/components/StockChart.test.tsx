import React from "react";
import { render, screen } from "@testing-library/react";
import StockChart from "./StockChart";
import { TotalStockedByDate } from "@/hooks/useApiData";

const lineSpy = jest.fn();

jest.mock("react-chartjs-2", () => ({
  Line: (props: any) => {
    lineSpy(props);
    return <div data-testid="line-chart" />;
  },
}));

describe("StockChart", () => {
  beforeEach(() => {
    lineSpy.mockClear();
  });

  it("renders without crashing", () => {
    render(<StockChart data={[]} />);
    expect(
      screen.getByText("Total Stocked Over Time Statewide")
    ).toBeInTheDocument();
    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
  });

  it("renders correctly with data", () => {
    const testData: TotalStockedByDate[] = [
      { date: "2024-01-01", stocked_fish: 100 },
      { date: "2024-01-02", stocked_fish: 150 },
    ];
    render(<StockChart data={testData} />);
    expect(lineSpy).toHaveBeenCalled();
  });

  it("transforms data correctly for the chart", () => {
    const testData: TotalStockedByDate[] = [
      { date: "2024-01-01", stocked_fish: 100 },
      { date: "2024-01-02", stocked_fish: 150 },
    ];
    render(<StockChart data={testData} />);

    const lastCall = lineSpy.mock.calls[lineSpy.mock.calls.length - 1][0];
    expect(lastCall.data.datasets[0].data).toEqual([
      { x: "2024-01-01", y: 100 },
      { x: "2024-01-02", y: 150 },
    ]);
    expect(lastCall.options.scales.x.type).toBe("time");
  });

  it("renders chart shell for single-point data", () => {
    const testData: TotalStockedByDate[] = [
      { date: "2024-01-01", stocked_fish: 100 },
    ];
    render(<StockChart data={testData} />);
    expect(screen.getByText("Total Stocked Over Time Statewide")).toBeInTheDocument();
    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
  });
});
