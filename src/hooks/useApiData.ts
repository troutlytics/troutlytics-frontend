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
  startDate: string | null;
  endDate: string | null;
}

const useApiData = (dateRange: DateRange) => {
  const [stockedLakesData, setStockedLakesData] = useState([]);
  const [hatcheryTotals, setHatcheryTotals] = useState([]);
  const [totalStockedByDate, setTotalStockedByDate] = useState([]);
  const [derbyLakesData, setDerbyLakesData] = useState([]);
  const [dateDataUpdated, setDateDataUpdated] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;
  const route =
    ENVIRONMENT === "dev"
      ? "http://localhost:5000"
      : "https://trout-tracker-wa-backend.vercel.app";

  // Helper function to handle data fetching
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const dateQuery =
    dateRange &&
    `?start_date=${dateRange.startDate}&end_date=${dateRange.endDate}`;

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

  useEffect(() => {
    // Update state when data is fetched
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

    if (!dateDataUpdatedLoading && dateDataUpdatedFromApi) {
      setDateDataUpdated(dateDataUpdatedFromApi);
    }

    // Update loading state
    setLoading(
      stockedLakesLoading ||
        hatcheryTotalsLoading ||
        totalStockedByDateLoading ||
        derbyLakesLoading ||
        dateDataUpdatedLoading
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
    dateDataUpdatedLoading,
    dateDataUpdatedFromApi,
  ]);

  return {
    stockedLakesData,
    hatcheryTotals,
    derbyLakesData,
    totalStockedByDate,
    dateDataUpdated,
    loading,
    error,
  };
};
export default useApiData;
