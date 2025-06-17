import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet-fullscreen";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import { formatDate } from "@/utils";
import { StockedLake } from "@/hooks/useApiData";

const customIcon = L.icon({
  iconUrl: "point-icon.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface MapProps {
  stockedLakesData: StockedLake[] | null;
  loading: boolean;
}

const Map: React.FC<MapProps> = ({ stockedLakesData, loading }) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      !mapContainerRef.current ||
      !stockedLakesData ||
      stockedLakesData.length === 0
    )
      return;
    console.log("Rendering FishMap", stockedLakesData.length, Date.now());

    requestAnimationFrame(() => {
      if (!mapRef.current) {
        mapRef.current = L.map(mapContainerRef.current!, {
          center: [47.6062, -122.3321],
          zoom: 8,
          //@ts-ignore
          fullscreenControl: true,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; <a href='https://carto.com/'>CARTO</a>",
        }).addTo(mapRef.current);
      }

      if (mapRef.current) {
        const markersGroupedByCoordinates: { [key: string]: StockedLake[] } =
          {};
        stockedLakesData.forEach((data) => {
          const coordinateKey = `${data.latitude},${data.longitude}`;
          if (!markersGroupedByCoordinates[coordinateKey]) {
            markersGroupedByCoordinates[coordinateKey] = [];
          }
          markersGroupedByCoordinates[coordinateKey].push(data);
        });

        //@ts-ignore
        const markerCluster = L.markerClusterGroup();
        const allLatLngs: L.LatLngExpression[] = [];

        Object.entries(markersGroupedByCoordinates).forEach(
          ([key, groupData]) => {
            const [latitude, longitude] = key.split(",").map(Number);
            allLatLngs.push([latitude, longitude]);

            const popupContent = `
              <div class="scrollable-popup overflow-y-auto max-h-[200px] text-sm">
                <strong><h2 class="font-bold text-base mb-1">${
                  groupData[0].water_name_cleaned
                }</h2></strong>
                <a href="${
                  groupData[0].directions
                }" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">Get Directions</a>
                <hr class="mb-2" />
                ${groupData
                  .map(
                    (data, index) => `
                    <div class="[&>p]:m-0">
                      <p className="m-0"><strong>Date:</strong> ${formatDate(data.date)}</p>
                      <p><strong>Species:</strong> ${data.species}</p>
                      <p><strong>Stocked:</strong> ${data.stocked_fish}</p>
                      <p><strong>Fish/lb:</strong> ${data.weight}</p>
                      ${
                        index !== groupData.length - 1
                          ? "<hr class='mb-2' />"
                          : ""
                      }
                    </div>
                  `
                  )
                  .join("")}
              </div>
            `;

            const marker = L.marker([latitude, longitude], {
              icon: customIcon,
            });
            marker.bindPopup(popupContent);
            marker.on("click", () => marker.openPopup());
            // marker.on("mouseout", () => marker.closePopup());
            markerCluster.addLayer(marker);
          }
        );

        mapRef.current.addLayer(markerCluster);

        if (allLatLngs.length > 0) {
          mapRef.current.fitBounds(L.latLngBounds(allLatLngs), {
            padding: [50, 50],
          });
        }
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.off();
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [stockedLakesData]);

  return (
    <div
      ref={mapContainerRef}
      id="map"
      className="z-0 w-full h-[300px] sm:h-[500px] rounded-md border border-gray-300"
    />
  );
};

export default Map;
