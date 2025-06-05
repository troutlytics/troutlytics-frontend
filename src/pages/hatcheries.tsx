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
    <div className="container mx-auto px-4 pb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Washington State DFW Trout Hatcheries
      </h1>
      <p className="text-gray-600 text-lg mb-4">
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
                  className="inline-block bg-gray-300 text-white text-sm font-semibold px-3 py-1 rounded-full animate-pulse h-8"
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
              className={`inline-block cursor-pointer bg-cyan-600 text-white text-sm font-semibold px-3 py-1 rounded-full ${
                selectedHatchery === name ? "bg-cyan-800" : ""
              }`}
            >
              {name}
            </span>
          ))
        )}
      </div>
      {isLoading ? (
        <div className="bg-white shadow-md rounded-lg p-4 animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        </div>
      ) : (
        selectedHatchery && (
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedHatchery} Stats
            </h2>
            <p className="text-gray-600 text-lg">
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
