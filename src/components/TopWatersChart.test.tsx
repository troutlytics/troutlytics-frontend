import React from "react";
import { render, screen } from "@testing-library/react";
import TopWatersChart from "./TopWatersChart";
import { StockedLake } from "@/hooks/useApiData";

const barSpy = jest.fn();

jest.mock("react-chartjs-2", () => ({
  Bar: (props: any) => {
    barSpy(props);
    return <div data-testid="bar-chart" />;
  },
}));

const makeLake = (
  overrides: Partial<StockedLake> = {}
): StockedLake => ({
  id: 1,
  water_name_cleaned: "Lake Alpha",
  stocked_fish: 100,
  species: "Rainbow",
  weight: 1,
  hatchery: "Goldendale",
  date: "2024-01-01",
  latitude: 47,
  longitude: -122,
  directions: "https://example.com",
  derby_participant: false,
  ...overrides,
});

describe("TopWatersChart", () => {
  beforeEach(() => {
    barSpy.mockClear();
  });

  it("renders the empty state without data", () => {
    render(<TopWatersChart data={[]} />);

    expect(
      screen.getByText("No targeted waters were returned for this sweep.")
    ).toBeInTheDocument();
    expect(screen.queryByTestId("bar-chart")).not.toBeInTheDocument();
  });

  it("uses a linear x-axis for the horizontal bar chart", () => {
    render(
      <TopWatersChart
        data={[
          makeLake({ id: 1, water_name_cleaned: "Lake Beta", stocked_fish: 300 }),
          makeLake({ id: 2, water_name_cleaned: "Lake Alpha", stocked_fish: 100 }),
          makeLake({ id: 3, water_name_cleaned: "Lake Alpha", stocked_fish: 200 }),
        ]}
      />
    );

    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();

    const lastCall = barSpy.mock.calls[barSpy.mock.calls.length - 1][0];
    expect(lastCall.options.indexAxis).toBe("y");
    expect(lastCall.options.scales.x.type).toBe("linear");
    expect(lastCall.data.labels).toEqual(["Lake Beta", "Lake Alpha"]);
    expect(lastCall.data.datasets[0].data).toEqual([300, 300]);
  });
});
