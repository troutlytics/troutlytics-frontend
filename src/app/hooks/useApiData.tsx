import { useState, useEffect } from "react";

interface StockedLake {
  id: number;
  lake: string;
  stocked_fish: number;
  species: string;
  weight: number;
  hatchery: string;
  date: string; // You can specify the appropriate date format
  latitude: number;
  longitude: number;
  directions: string;
  derby_participant: boolean;
}

interface HatcheryTotal {
  // Define the structure of your hatchery total data here
}

interface DerbyLake {
  // Define the structure of your derby lake data here
}

interface TotalStockedByDate {
  // Define the structure of your total stocked by date data here
}

interface DateDataUpdated {
  // Define the structure of your date data updated here
}

// const route = 'https://washington-trout-stats.vercel.app'
// const route = "http://localhost:5000";
const route = "";
const useApiData = () => {
  const [stockedLakesData, setStockedLakesData] = useState<StockedLake[]>([]);
  const [hatcheryTotals, setHatcheryTotals] = useState<HatcheryTotal[]>([]);
  const [derbyLakesData, setDerbyLakesData] = useState<DerbyLake[]>([]);
  const [totalStockedByDate, setTotalStockedByDate] = useState<
    TotalStockedByDate[]
  >([]);
  const [dateDataUpdated, setDateDataUpdated] =
    useState<DateDataUpdated | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stockedLakesResponse = await fetch(route + "/stocked_lakes_data");
        const stockedLakesData: StockedLake[] =
          await stockedLakesResponse.json();
        setStockedLakesData(stockedLakesData);

        const hatcheryTotalsResponse = await fetch(route + "/hatchery_totals");
        const hatcheryTotals: HatcheryTotal[] =
          await hatcheryTotalsResponse.json();
        setHatcheryTotals(hatcheryTotals);

        const derbyLakesResponse = await fetch(route + "/derby_lakes_data");
        const derbyLakesData: DerbyLake[] = await derbyLakesResponse.json();
        setDerbyLakesData(derbyLakesData);

        const totalStockedByDateResponse = await fetch(
          route + "/total_stocked_by_date_data"
        );
        const totalStockedByDate: TotalStockedByDate[] =
          await totalStockedByDateResponse.json();
        setTotalStockedByDate(totalStockedByDate);

        const dateDataUpdatedResponse = await fetch(
          route + "/date_data_updated"
        );
        const dateDataUpdated: DateDataUpdated =
          await dateDataUpdatedResponse.json();
        setDateDataUpdated(dateDataUpdated);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    stockedLakesData,
    hatcheryTotals,
    derbyLakesData,
    totalStockedByDate,
    dateDataUpdated,
    loading,
  };
};

export default useApiData;
