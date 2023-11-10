"use client"; // This is a client component 👈🏽

import Image from "next/image";
import useApiData from "./hooks/useApiData";
import FishingMap from "./components/fishMap";
import Head from "next/head";
import Header from "./components/Header";
export default function Home() {
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
      <Header/>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <FishingMap fishingDataList={"null"} />
          hello
        </div>
      </main>
    </>
  );
}
