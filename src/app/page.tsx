"use client"; // This is a client component 👈🏽
import React, { useState } from "react";
import Image from "next/image";
import useApiData from "./hooks/useApiData";
import FishingMap from "./components/fishMap";
import Head from "next/head";
import Header from "./components/Header";
import { DateRange } from "./components/DateRangePicker";
import DateRangePicker from "./components/DateRangePicker";

export default function Home() {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(
    null
  );

  const handleDateChange = (dateRange: DateRange) => {
    setSelectedDateRange(dateRange);
    // Do something with the selected date range, e.g., fetch data based on the date range
  };

  // const {
  //   stockedLakesData,
  //   hatcheryTotals,
  //   derbyLakesData,
  //   totalStockedByDate,
  //   dateDataUpdated,
  //   loading,
  // } = useApiData();
  return (
    <>
      <Head>
        <title>Washington Trout Stats</title>
      </Head>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <DateRangePicker onDateChange={handleDateChange} />
        <div>
          {/* Display selected date range */}
          {selectedDateRange && (
            <p>
              Selected Date Range: {selectedDateRange.startDate?.toDateString()}{" "}
              -{" "}
              {selectedDateRange.endDate
                ? selectedDateRange.endDate.toDateString()
                : "Present"}
            </p>
          )}
        </div>
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          {/* Add other content here */}
          <FishingMap fishingDataList={"null"} />
        </div>
      </main>
    </>
  );
}
