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

const Map: React.FC<MapProps> = ({ stockedLakesData, loading }) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    initializeMap();
    if (!loading && stockedLakesData && mapRef.current) {
      clearMarkers();
      renderMarkers();
    }

    function initializeMap() {
      if (mapContainerRef.current && !mapRef.current) {
        // Initialize the map only once
        mapRef.current = L.map(mapContainerRef.current).setView(
          [47.3826, -120.4472],
          7
        ); // Default center of WA
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapRef.current);
      }
    }

    function clearMarkers() {
      // Clear existing markers
      mapRef?.current?.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          layer.remove();
        }
      });
    }

    function renderMarkers() {
      // Add new markers
      stockedLakesData?.length &&
        stockedLakesData.forEach((data) => {
          L.marker([data.latitude, data.longitude], { icon: customIcon })
            .addTo(mapRef.current!)
            .bindPopup(
              `<div>
                <h3>${data.lake}</h3>
                <p>Date: ${data.date}</p>
                <p>Species: ${data.species}</p>
                <p>Amount Produced: ${data.stocked_fish}</p>
                <p>Weight: ${data.weight} lbs</p>
                <a href="${data.directions}" target="_blank" rel="noopener noreferrer">Get Directions</a>
              </div>`
            );
        });
    }
  }, [stockedLakesData, loading]);

  return (
    <div
      ref={mapContainerRef}
      style={{ height: "500px", width: "100%", zIndex: "-1" }}
    />
  );
};

export default Map;
