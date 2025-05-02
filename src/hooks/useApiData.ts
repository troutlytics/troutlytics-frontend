import useSWR from "swr";
import { useState, useEffect } from "react";

export interface StockedLake {
  id: number;
  lake: string;
  stocked_fish: number;
  species: string;
  weight: number;
  hatchery: string;
  date: string;
  latitude: number;
  longitude: number;
  directions: string;
  derby_participant: boolean;
}

export interface DateRange {
  recentDate: string | null;
  pastDate: string | null;
}

export interface HatcheryTotal {
  hatchery: string;
  sum_1: number;
}

export interface DerbyLake {
  lake: string;
}

export interface TotalStockedByDate {
  date: string;
  stocked_fish: number;
}
const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;

export const route =
  ENVIRONMENT === "dev"
    ? "http://localhost:5050"
    : "https://trout-tracker-wa-backend.vercel.app";

// Helper function to handle data fetching
export const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useApiData = (dateRange: DateRange) => {
  const [stockedLakesData, setStockedLakesData] = useState([]);
  const [hatcheryTotals, setHatcheryTotals] = useState([]);
  const [totalStockedByDate, setTotalStockedByDate] = useState([]);
  const [derbyLakesData, setDerbyLakesData] = useState([]);
  const [hatcheryNames, setHatcheryNames] = useState([]);
  const [dateDataUpdated, setDateDataUpdated] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const dateQuery =
    dateRange &&
    `?start_date=${dateRange.pastDate}&end_date=${dateRange.recentDate}`;

  // Use useSWR for automatic caching and re-fetching
  const { data: stockedLakesDataFromApi, isValidating: stockedLakesLoading } =
    useSWR(route + "/stocked_lakes_data" + dateQuery, fetcher);

  const { data: hatcheryTotalsFromApi, isValidating: hatcheryTotalsLoading } =
    useSWR(route + "/hatchery_totals" + dateQuery, fetcher);

  const {
    data: totalStockedByDateFromApi,
    isValidating: totalStockedByDateLoading,
  } = useSWR(route + "/total_stocked_by_date_data" + dateQuery, fetcher);

  const { data: derbyLakesDataFromApi, isValidating: derbyLakesLoading } =
    useSWR(route + "/derby_lakes_data", fetcher);

  const { data: dateDataUpdatedFromApi, isValidating: dateDataUpdatedLoading } =
    useSWR(route + "/date_data_updated", fetcher);

  const { data: hatcheryNamesFromApi, isValidating: hatcheryNamesLoading } =
    useSWR(route + "/hatchery_names", fetcher);

  // Update loading state when data is fetched
  useEffect(() => {
    if (!stockedLakesLoading && stockedLakesDataFromApi) {
      setStockedLakesData(stockedLakesDataFromApi);
    }

    if (!hatcheryTotalsLoading && hatcheryTotalsFromApi) {
      setHatcheryTotals(hatcheryTotalsFromApi);
    }

    if (!totalStockedByDateLoading && totalStockedByDateFromApi) {
      setTotalStockedByDate(totalStockedByDateFromApi);
    }

    if (!derbyLakesLoading && derbyLakesDataFromApi) {
      setDerbyLakesData(derbyLakesDataFromApi);
    }

    if (!hatcheryNamesLoading && hatcheryNamesFromApi) {
      setHatcheryNames(hatcheryNamesFromApi);
    }

    if (!dateDataUpdatedLoading && dateDataUpdatedFromApi) {
      setDateDataUpdated(dateDataUpdatedFromApi);
    }

    // Update loading state
    setLoading(
      stockedLakesLoading ||
        hatcheryTotalsLoading ||
        totalStockedByDateLoading ||
        derbyLakesLoading ||
        dateDataUpdatedLoading ||
        hatcheryNamesLoading
    );
  }, [
    stockedLakesLoading,
    stockedLakesDataFromApi,
    hatcheryTotalsLoading,
    hatcheryTotalsFromApi,
    totalStockedByDateLoading,
    totalStockedByDateFromApi,
    derbyLakesLoading,
    derbyLakesDataFromApi,
    hatcheryNamesLoading,
    hatcheryNamesFromApi,
    dateDataUpdatedLoading,
    dateDataUpdatedFromApi,
  ]);

  return {
    stockedLakesData,
    hatcheryNames,
    hatcheryTotals,
    derbyLakesData,
    totalStockedByDate,
    dateDataUpdated,
    loading,
    error,
  };
};

export default useApiData;
