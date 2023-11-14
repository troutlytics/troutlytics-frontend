import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS

// Create a custom icon
const customIcon = L.icon({
  iconUrl: "point-icon.png", // URL to your custom icon image
  iconSize: [32, 32], // Icon size in pixels [width, height]
  iconAnchor: [16, 32], // The point of the icon that corresponds to the marker's location
  popupAnchor: [0, -32], // The point from which the popup should open relative to the icon
});

interface FishingData {
  latitude: number;
  longitude: number;
  date: string;
  directions: string;
  hatchery: string;
  lake: string;
  species: string;
  stocked_fish: number;
  weight: number;
}

interface MapProps {
  fishingDataList: FishingData[];
}

const Map: React.FC<MapProps> = ({ fishingDataList }) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map
      mapRef.current = L.map("map").setView(
        [fishingDataList[0].latitude, fishingDataList[0].longitude],
        6
      );

      // Add a tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }

    // Add markers for fishing data
    fishingDataList.forEach((data) => {
      const marker = L.marker([data.latitude, data.longitude], {
        icon: customIcon, // Set the custom icon
      })
        .addTo(mapRef.current)
        .bindPopup(
          `<div>
            <h3>${data.lake}</h3>
            <p>Date: ${data.date}</p>
            <p>Species: ${data.species}</p>
            <p>Stocked Fish: ${data.stocked_fish}</p>
            <p>Weight: ${data.weight} lbs</p>
            <a href="${data.directions}" target="_blank" rel="noopener noreferrer">Get Directions</a>
          </div>`
        );
    });
    // Calculate the average coordinates
    const averageLatitude =
      fishingDataList.reduce((sum, data) => sum + data.latitude, 0) /
      fishingDataList.length;
    const averageLongitude =
      fishingDataList.reduce((sum, data) => sum + data.longitude, 0) /
      fishingDataList.length;

    // Set the map center to the average coordinates
    mapRef.current.setView([averageLatitude, averageLongitude], 7);
  }, [fishingDataList]);

  return <div id="map" style={{ height: "500px", width: "100%" }} />;
};

export default Map;
