import React from "react";
import { render, screen } from "@testing-library/react";
import StockChart from "./StockChart";
import { TotalStockedByDate } from "@/hooks/useApiData";

describe("StockChart", () => {
  it("renders without crashing", () => {
    render(<StockChart data={[]} />);
    expect(
      screen.getByText("Total Trout Released by Date")
    ).toBeInTheDocument();
  });
  it("renders correctly with data", () => {
    const testData: TotalStockedByDate[] = [
      { date: "2024-01-01", stocked_fish: 100 },
      { date: "2024-01-02", stocked_fish: 150 },
    ];
    render(<StockChart data={testData} />);

    // Assertions to verify if data is passed correctly to the Line component
  });
  it("transforms data correctly for the chart", () => {
    const testData: TotalStockedByDate[] = [
      { date: "2024-01-01", stocked_fish: 100 },
      { date: "2024-01-02", stocked_fish: 150 },
    ];
    render(<StockChart data={testData} />);
    // Assertions to check the structure of transformed data
    // This will likely involve inspecting the props of the Line component
    
  });
  it("matches snapshot", () => {
    const testData: TotalStockedByDate[] = [
      { date: "2024-01-01", stocked_fish: 100 },
    ];
    const { asFragment } = render(<StockChart data={testData} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
