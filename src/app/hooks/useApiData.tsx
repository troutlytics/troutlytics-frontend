import useSWR from "swr";
import { useState, useEffect } from "react";

interface StockedLake {
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
  startDate: Date | null;
  endDate: Date | null;
}

// const route = 'https://washington-trout-stats.vercel.app'
const route = "http://localhost:5000";
// const route = "";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useApiData = (dateRange: DateRange) => {
  const dateQuery = `?start_date=${dateRange.startDate}&end_date=${dateRange.endDate}`;

  const { data: stockedLakesData, error: stockedLakesError } = useSWR(
    route + "/stocked_lakes_data" + dateQuery,
    fetcher
  );

  const { data: hatcheryTotals, error: hatcheryTotalsError } = useSWR(
    route + "/hatchery_totals" + dateQuery,
    fetcher
  );

  const { data: totalStockedByDate, error: totalStockedByDateError } = useSWR(
    route + "/total_stocked_by_date_data" + dateQuery,
    fetcher
  );

  const { data: derbyLakesData, error: derbyLakesError } = useSWR(
    route + "/derby_lakes_data",
    fetcher
  );

  const { data: dateDataUpdated, error: dateDataUpdatedError } = useSWR(
    route + "/date_data_updated",
    fetcher
  );

  const loading =
    !stockedLakesData ||
    !hatcheryTotals ||
    !totalStockedByDate ||
    !derbyLakesData ||
    !dateDataUpdated;

  return {
    stockedLakesData,
    hatcheryTotals,
    derbyLakesData,
    totalStockedByDate,
    dateDataUpdated,
    loading,
    error: stockedLakesError || hatcheryTotalsError || totalStockedByDateError || derbyLakesError || dateDataUpdatedError,
  };
};


export default useApiData;




// import { useState, useEffect } from "react";

// interface StockedLake {
//   id: number;
//   lake: string;
//   stocked_fish: number;
//   species: string;
//   weight: number;
//   hatchery: string;
//   date: string;
//   latitude: number;
//   longitude: number;
//   directions: string;
//   derby_participant: boolean;
// }

// interface HatcheryTotal {
//   date: string;
//   amount: number;
// }

// interface DerbyLake {
//   // Define the structure of derby lake data here
// }

// interface TotalStockedByDate {
//   // Define the structure of total stocked by date data here
// }

// interface DateDataUpdated {
//   // Define the structure of date data updated here
// }

// export interface DateRange {
//   startDate: Date | null;
//   endDate: Date | null;
// }

// // const route = 'https://washington-trout-stats.vercel.app'
// const route = "http://localhost:5000";
// // const route = "";
// const useApiData = (dateRange: DateRange) => {
//   const [stockedLakesData, setStockedLakesData] = useState<StockedLake[]>([]);
//   const [hatcheryTotals, setHatcheryTotals] = useState<HatcheryTotal[]>([]);
//   const [derbyLakesData, setDerbyLakesData] = useState<DerbyLake[]>([]);
//   const [totalStockedByDate, setTotalStockedByDate] = useState<
//     TotalStockedByDate[]
//   >([]);
//   const [dateDataUpdated, setDateDataUpdated] =
//     useState<DateDataUpdated | null>(null);
//   const [loading, setLoading] = useState(true);

//   const dateQuery = `?start_date=${dateRange.startDate}&end_date=${dateRange.endDate}`;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const stockedLakesResponse = await fetch(
//           route + "/stocked_lakes_data" + dateQuery
//         );
//         const stockedLakesData: StockedLake[] =
//           await stockedLakesResponse.json();
//         setStockedLakesData(stockedLakesData);

//         const hatcheryTotalsResponse = await fetch(
//           route + "/hatchery_totals" + dateQuery
//         );
//         const hatcheryTotals: HatcheryTotal[] =
//           await hatcheryTotalsResponse.json();
//         setHatcheryTotals(hatcheryTotals);

//         const totalStockedByDateResponse = await fetch(
//           route + "/total_stocked_by_date_data" + dateQuery
//         );
//         const totalStockedByDate: TotalStockedByDate[] =
//           await totalStockedByDateResponse.json();
//         console.log(totalStockedByDate);
//         setTotalStockedByDate(totalStockedByDate);

//         const derbyLakesResponse = await fetch(route + "/derby_lakes_data");
//         const derbyLakesData: DerbyLake[] = await derbyLakesResponse.json();
//         setDerbyLakesData(derbyLakesData);

//         const dateDataUpdatedResponse = await fetch(
//           route + "/date_data_updated"
//         );
//         const dateDataUpdated: DateDataUpdated =
//           await dateDataUpdatedResponse.json();
//         setDateDataUpdated(dateDataUpdated);

//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return {
//     stockedLakesData,
//     hatcheryTotals,
//     derbyLakesData,
//     totalStockedByDate,
//     dateDataUpdated,
//     loading,
//   };
// };

// export default useApiData;
