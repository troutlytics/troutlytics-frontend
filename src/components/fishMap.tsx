import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet-fullscreen";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import { formatDate } from "@/utils";
import { StockedLake } from "@/hooks/useApiData";
import StatePanel from "./StatePanel";

const markerIcon = L.divIcon({
  className: "",
  html: `
    <div class="sonar-marker">
      <span class="sonar-marker__ring"></span>
      <span class="sonar-marker__pulse"></span>
      <span class="sonar-marker__core"></span>
    </div>
  `,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -16],
});

interface MapProps {
  stockedLakesData: StockedLake[] | null;
  loading: boolean;
}

const buildPopupContent = (groupData: StockedLake[]) => `
  <div class="map-popup-shell">
    <p class="map-popup-subtitle">Stocking target</p>
    <h2 class="map-popup-title">${groupData[0].water_name_cleaned}</h2>
    <a
      href="${groupData[0].directions}"
      target="_blank"
      rel="noopener noreferrer"
      class="map-popup-link"
    >
      Open route
    </a>
    <hr class="map-popup-divider" />
    <div class="map-popup-list">
      ${groupData
        .map(
          (data) => `
            <div class="map-popup-entry">
              <p><strong>Date:</strong> ${formatDate(data.date)}</p>
              <p><strong>Species:</strong> ${data.species}</p>
              <p><strong>Stocked:</strong> ${data.stocked_fish.toLocaleString()}</p>
              <p><strong>Fish / lb:</strong> ${data.weight}</p>
            </div>
          `
        )
        .join("")}
    </div>
  </div>
`;

const Map: React.FC<MapProps> = ({ stockedLakesData, loading }) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markerClusterRef = useRef<any>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = L.map(mapContainerRef.current, {
      center: [47.6062, -122.3321],
      zoom: 7,
      zoomControl: false,
      //@ts-ignore
      fullscreenControl: true,
    });

    L.control.zoom({ position: "topright" }).addTo(mapRef.current);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
      }
    ).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.off();
        mapRef.current.remove();
        mapRef.current = null;
      }
      markerClusterRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    if (markerClusterRef.current) {
      mapRef.current.removeLayer(markerClusterRef.current);
      markerClusterRef.current = null;
    }

    if (!stockedLakesData?.length) return;

    const markersGroupedByCoordinates: Record<string, StockedLake[]> = {};

    stockedLakesData.forEach((data) => {
      const coordinateKey = `${data.latitude},${data.longitude}`;
      if (!markersGroupedByCoordinates[coordinateKey]) {
        markersGroupedByCoordinates[coordinateKey] = [];
      }
      markersGroupedByCoordinates[coordinateKey].push(data);
    });

    //@ts-ignore
    const markerCluster = L.markerClusterGroup({
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: true,
      iconCreateFunction: (cluster: any) =>
        L.divIcon({
          html: `<div class="sonar-cluster">${cluster.getChildCount()}</div>`,
          className: "",
          iconSize: [48, 48],
        }),
    });

    const allLatLngs: L.LatLngExpression[] = [];

    Object.entries(markersGroupedByCoordinates).forEach(([key, groupData]) => {
      const [latitude, longitude] = key.split(",").map(Number);
      allLatLngs.push([latitude, longitude]);

      const marker = L.marker([latitude, longitude], {
        icon: markerIcon,
      });

      marker.bindPopup(buildPopupContent(groupData), {
        maxWidth: 340,
      });

      markerCluster.addLayer(marker);
    });

    markerClusterRef.current = markerCluster;
    mapRef.current.addLayer(markerCluster);

    if (allLatLngs.length > 0) {
      mapRef.current.fitBounds(L.latLngBounds(allLatLngs), {
        padding: [40, 40],
      });
    }
  }, [stockedLakesData]);

  if (!loading && !stockedLakesData?.length) {
    return (
      <StatePanel
        eyebrow="Map Sweep"
        title="No coordinates were returned for this telemetry window."
        description="Try expanding the date range to repopulate the map with stocking targets and route links."
        compact
      />
    );
  }

  return (
    <div
      ref={mapContainerRef}
      id="map"
      className="z-0 h-[28rem] w-full overflow-hidden rounded-[1.5rem] border border-cyan-100/10 sm:h-[38rem] xl:h-[48rem]"
    />
  );
};

export default Map;
