import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import { DateRange } from "./DateRangePicker";
import { StockedLake } from "../hooks/useApiData";
// Create a custom icon
const customIcon = L.icon({
  iconUrl: "point-icon.png", // URL to your custom icon image
  iconSize: [32, 32], // Icon size in pixels [width, height]
  iconAnchor: [16, 32], // The point of the icon that corresponds to the marker's location
  popupAnchor: [0, -32], // The point from which the popup should open relative to the icon
});

interface MapProps {
  selectedDateRange: DateRange;
  stockedLakesData: StockedLake[];
  loading: boolean;
}

const Map: React.FC<MapProps> = ({
  selectedDateRange,
  stockedLakesData,
  loading,
}) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!loading && stockedLakesData && stockedLakesData.length) {
      if (!mapRef.current) {
        // Initialize the map
        mapRef.current = L.map("map").setView(
          [stockedLakesData[0].latitude, stockedLakesData[0].longitude],
          6
        );
      }
      mapRef.current.eachLayer((layer) => {
        layer.remove();
      });
      // Add a tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      // Add markers for fishing data
      stockedLakesData.forEach((data) => {
        const marker = L.marker([data.latitude, data.longitude], {
          icon: customIcon, // Set the custom icon
        })
          .addTo(mapRef.current)
          .bindPopup(
            `<div>
            <h3>${data.lake}</h3>
            <p>Date: ${data.date}</p>
            <p>Species: ${data.species}</p>
            <p>Amount Stocked: ${data.stocked_fish}</p>
            <p>Weight: ${data.weight} lbs</p>
            <a href="${data.directions}" target="_blank" rel="noopener noreferrer">Get Directions</a>
          </div>`
          );
      });
      // Calculate the average coordinates
      const averageLatitude =
        stockedLakesData.reduce((sum, data) => sum + data.latitude, 0) /
        stockedLakesData.length;
      const averageLongitude =
        stockedLakesData.reduce((sum, data) => sum + data.longitude, 0) /
        stockedLakesData.length;

      // Set the map center to the average coordinates
      mapRef.current.setView([averageLatitude, averageLongitude], 7);
    }
  }, [stockedLakesData, loading, selectedDateRange]);

  return <div id="map" style={{ height: "500px", width: "100%" }} />;
};

export default Map;
