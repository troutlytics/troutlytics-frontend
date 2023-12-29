import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { DateRange } from "./DateRangePicker";
import { StockedLake } from "../hooks/useApiData";

const customIcon = L.icon({
  iconUrl: "point-icon.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface MapProps {
  selectedDateRange: DateRange;
  stockedLakesData: StockedLake[] | null;
  loading: boolean;
}

const Map: React.FC<MapProps> = ({
  selectedDateRange,
  stockedLakesData,
  loading,
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      // Initialize the map only once
      mapRef.current = L.map(mapContainerRef.current).setView([47.7511, -120.7401], 6); // Default center of WA
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }

    if (!loading && stockedLakesData && stockedLakesData.length && mapRef.current) {
      // Clear existing markers
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          layer.remove();
        }
      });

      // Add new markers
      stockedLakesData.forEach((data) => {
        L.marker([data.latitude, data.longitude], { icon: customIcon })
          .addTo(mapRef.current!)
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

      // Set the map center to the first marker
      mapRef.current.setView([stockedLakesData[0].latitude, stockedLakesData[0].longitude], 7);
    }
  }, [stockedLakesData, loading]);

  return <div ref={mapContainerRef} style={{ height: "500px", width: "100%" }} />;
};

export default Map;
