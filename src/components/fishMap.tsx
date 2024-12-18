import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { DateRange } from "@/hooks/useApiData";
import { StockedLake } from "../hooks/useApiData";
import { formatDate } from "@/utils";

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
        mapRef.current = L.map(mapContainerRef.current).setView(
          [47.3826, -120.4472],
          7
        );
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapRef.current);
      }
    }

    function clearMarkers() {
      mapRef?.current?.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          layer.remove();
        }
      });
    }

    function renderMarkers() {
      if (!stockedLakesData) return;

      type CoordinateKey = string;
      interface GroupedData {
        [key: CoordinateKey]: StockedLake[];
      }

      const markersGroupedByCoordinates: GroupedData = {};

      stockedLakesData.forEach((data) => {
        const coordinateKey: CoordinateKey = `${data.latitude},${data.longitude}`;
        if (!markersGroupedByCoordinates[coordinateKey]) {
          markersGroupedByCoordinates[coordinateKey] = [];
        }
        markersGroupedByCoordinates[coordinateKey].push(data);
      });

      Object.entries(markersGroupedByCoordinates).forEach(
        ([key, groupData]) => {
          const [latitude, longitude] = key.split(",").map(Number);
          const popupContent = `
          <div class="scrollable-popup">
          <strong><h2>${groupData[0].lake}</h2></strong>
            <a href="${
              groupData[0].directions
            }" target="_blank" rel="noopener noreferrer">Get Directions</a>
            <hr>
            ${groupData
              .map(
                (data) => `
              <div>
                <p>Release Date: ${formatDate(data.date)}</p>
                <p>Species: ${data.species}</p>
                <p>Amount Produced: ${data.stocked_fish}</p>
                <p>Fish Per Pound: ${data.weight}</p>
              </div>
            `
              )
              .join("<hr>")}
          </div>`;

          L.marker([latitude, longitude], { icon: customIcon })
            .addTo(mapRef.current!)
            .bindPopup(popupContent);
        }
      );
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
