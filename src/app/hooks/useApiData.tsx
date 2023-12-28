import useSWR, { useSWRConfig } from "swr";
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

export interface StockedLakesDataProps {
  data: StockedLake[];
}

interface HatcheryTotal {
  date: string;
  amount: number;
}

interface DerbyLake {
  // Define the structure of derby lake data here
}

interface TotalStockedByDate {
  // Define the structure of total stocked by date data here
}

interface DateDataUpdated {
  // Define the structure of date data updated here
}

export interface DateRange {
  startDate: string | null;
  endDate: string | null;
}

const useApiData = (dateRange: DateRange) => {
  const { mutate } = useSWRConfig();

  // const route = 'https://washington-trout-stats.vercel.app'
  const route = "http://localhost:5000";
  // const route = "";

  const fetcher = (url: string) =>
    fetch(url).then((res) => {
      // console.log(res.json())
      return res.json();
    });

  const [stockedLakesData, setStockedLakesData] = useState(null);
  const [hatcheryTotals, setHatcheryTotals] = useState(null);
  const [totalStockedByDate, setTotalStockedByDate] = useState(null);
  const [derbyLakesData, setDerbyLakesData] = useState(null);
  const [dateDataUpdated, setDateDataUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dateQuery = `?start_date=${dateRange.startDate}&end_date=${dateRange.endDate}`;

  // Helper function to handle data fetching
  const fetchData = async (url: string, setData: (data: any) => void) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      console.log(data);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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

  const mutateData = (endPoint: string) => {
    // Manually trigger a re-fetch for stocked lakes data
    mutate(route + endPoint + dateQuery);
    console.log("MUTATED");
    console.log(stockedLakesData);
  };

  return {
    stockedLakesData,
    hatcheryTotals,
    derbyLakesData,
    totalStockedByDate,
    dateDataUpdated,
    mutateData,
    loading,
    error,
    // Expose individual fetch functions
    fetchStockedLakesData: () =>
      fetchData(route + "/stocked_lakes_data" + dateQuery, setStockedLakesData),
    fetchHatcheryTotals: () =>
      fetchData(route + "/hatchery_totals" + dateQuery, setHatcheryTotals),
    fetchTotalStockedByDate: () =>
      fetchData(
        route + "/total_stocked_by_date_data" + dateQuery,
        setTotalStockedByDate
      ),
    fetchDerbyLakesData: () =>
      fetchData(route + "/derby_lakes_data", setDerbyLakesData),
    fetchDateDataUpdated: () =>
      fetchData(route + "/date_data_updated", setDateDataUpdated),
  };
};
export default useApiData;
