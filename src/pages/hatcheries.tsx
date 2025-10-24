"use client";

import React, { useState, useEffect } from "react";
import { useApiDataContext } from "@/contexts/DataContext";

const HatcheriesPage: React.FC = () => {
  const {
    hatcheryNames,
    stockedLakesData,
    selectedDateRange,
    setSelectedDateRange,
    isLoading,
  } = useApiDataContext();
  const [selectedHatchery, setSelectedHatchery] = useState<string | null>(null);
  

  useEffect(() => {
    if (!isLoading && hatcheryNames) setSelectedHatchery(hatcheryNames[0]);
  }, [isLoading, hatcheryNames]);

  const handleHatcheryClick = (name: string) => {
    setSelectedHatchery(name);
  };

  return (
    <div className="container px-4 pb-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Washington State DFW Trout Hatcheries
      </h1>
      <p className="mb-4 text-lg text-gray-600">
        Explore the data on trout hatcheries in Washington State, including
        locations, stocking totals, and trends over time.
      </p>
      <div className="flex flex-wrap gap-2 mb-8">
        {isLoading ? (
          <>
            {Array.from({ length: 65 }).map((_, index) => {
              const width = Math.floor(Math.random() * 60) + 150;
              return (
                <div
                  key={index}
                  className="inline-block h-8 px-3 py-1 text-sm font-semibold text-white bg-gray-300 rounded-full animate-pulse"
                  style={{ width: `${width}px` }}
                ></div>
              );
            })}
          </>
        ) : (
          hatcheryNames &&
          hatcheryNames.map((name, index) => (
            <span
              key={index}
              onClick={() => handleHatcheryClick(name)}
              className={`inline-block cursor-pointer bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full ${
                selectedHatchery === name ? "bg-blue-800" : ""
              }`}
            >
              {name}
            </span>
          ))
        )}
      </div>
      {isLoading ? (
        <div className="p-4 bg-white rounded-lg shadow-md animate-pulse">
          <div className="w-1/3 h-6 mb-4 bg-gray-300 rounded"></div>
          <div className="w-1/2 h-4 mb-2 bg-gray-300 rounded"></div>
          <div className="w-1/2 h-4 mb-2 bg-gray-300 rounded"></div>
          <div className="w-1/2 h-4 mb-2 bg-gray-300 rounded"></div>
        </div>
      ) : (
        selectedHatchery && (
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              {selectedHatchery} Stats
            </h2>
            <p className="text-lg text-gray-600">
              Total Fish Stocked All Time:{" "}
              {stockedLakesData
                .filter((lake) => lake.hatchery === selectedHatchery)
                .reduce((total, lake) => total + lake.stocked_fish, 0)}
            </p>
            {/* Add more stats here if available */}
            {/* most steelhead stocked */}
            {/* most rainbow stocked */}
            {/* most cutthroat stocked */}
            {/* most steelhead stocked */}
          </div>
        )
      )}
    </div>
  );
};

export default HatcheriesPage;
