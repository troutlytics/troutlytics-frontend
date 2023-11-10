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

const dataList = [
  {
    date: "Wed, 18 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Hood Park Pond Walla Walla County",
    hatchery: "Lyons Ferry Hatchery",
    lake: "Hood Park Pond Walla Walla County",
    latitude: 46.2145152,
    longitude: -119.0131341,
    species: "Rainbow",
    stocked_fish: 2505,
    weight: 3,
  },
  {
    date: "Wed, 18 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Leader Lake Okanogan County",
    hatchery: "Chelan Hatchery",
    lake: "Leader Lake Okanogan County",
    latitude: 48.3612135,
    longitude: -119.6838895,
    species: "Rainbow",
    stocked_fish: 500,
    weight: 2.4,
  },
  {
    date: "Wed, 18 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Twin Lks Ltl Stevens County",
    hatchery: "Ford Hatchery",
    lake: "Twin Lks Ltl Stevens County",
    latitude: 48.4558249,
    longitude: -117.9059909,
    species: "Rainbow",
    stocked_fish: 260,
    weight: 1,
  },
  {
    date: "Wed, 18 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Hatch Lake Stevens County",
    hatchery: "Ford Hatchery",
    lake: "Hatch Lake Stevens County",
    latitude: 48.4974622,
    longitude: -117.8065455,
    species: "Rainbow",
    stocked_fish: 130,
    weight: 1,
  },
  {
    date: "Thu, 19 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Roses Lake Chelan County",
    hatchery: "Chelan Hatchery",
    lake: "Roses Lake Chelan County",
    latitude: 47.9045409,
    longitude: -120.155072,
    species: "Rainbow",
    stocked_fish: 1584,
    weight: 2.64,
  },
  {
    date: "Thu, 19 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Fio Rito Laken Kittitas County",
    hatchery: "Goldendale Hatchery",
    lake: "Fio Rito Laken Kittitas County",
    latitude: 46.9399474,
    longitude: -120.5062846,
    species: "Rainbow",
    stocked_fish: 94,
    weight: 0.2,
  },
  {
    date: "Fri, 20 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Lost Lake Ltl Pend Oreille County",
    hatchery: "Ford Hatchery",
    lake: "Lost Lake Ltl Pend Oreille County",
    latitude: 48.8132869,
    longitude: -117.4421343,
    species: "Rainbow",
    stocked_fish: 111,
    weight: 1,
  },
  {
    date: "Mon, 23 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Jameson Lake Douglas County",
    hatchery: "Chelan Pud Hatchery",
    lake: "Jameson Lake Douglas County",
    latitude: 47.6837211,
    longitude: -119.6224262,
    species: "Rainbow",
    stocked_fish: 4590,
    weight: 2.7,
  },
  {
    date: "Mon, 23 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Lake Chelan Chelan County",
    hatchery: "Chelan Pud Hatchery",
    lake: "Lake Chelan Chelan County",
    latitude: 48.0269741,
    longitude: -120.3377317,
    species: "Rainbow",
    stocked_fish: 1890,
    weight: 2.7,
  },
  {
    date: "Mon, 23 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Wapato Lake Chelan County",
    hatchery: "Chelan Pud Hatchery",
    lake: "Wapato Lake Chelan County",
    latitude: 47.9166719,
    longitude: -120.1600674,
    species: "Rainbow",
    stocked_fish: 5000,
    weight: 2.7,
  },
  {
    date: "Mon, 23 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Gissburg Pond South Snohomish County",
    hatchery: "Whitehorse Pond",
    lake: "Gissburg Pond South Snohomish County",
    latitude: 48.0329979,
    longitude: -121.8339472,
    species: "Rainbow",
    stocked_fish: 945,
    weight: 0.9,
  },
  {
    date: "Mon, 23 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Ballinger Lake Snohomish County",
    hatchery: "Whitehorse Pond",
    lake: "Ballinger Lake Snohomish County",
    latitude: 47.7820803,
    longitude: -122.3276873,
    species: "Rainbow",
    stocked_fish: 1476,
    weight: 0.9,
  },
  {
    date: "Tue, 24 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Green Lake King County",
    hatchery: "Whitehorse Pond",
    lake: "Green Lake King County",
    latitude: 47.6798338,
    longitude: -122.3257826,
    species: "Rainbow",
    stocked_fish: 1375,
    weight: 0.9,
  },
  {
    date: "Tue, 24 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Jameson Lake Douglas County",
    hatchery: "Chelan Pud Hatchery",
    lake: "Jameson Lake Douglas County",
    latitude: 47.6837211,
    longitude: -119.6224262,
    species: "Rainbow",
    stocked_fish: 7590,
    weight: 2.7,
  },
  {
    date: "Tue, 24 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Silver Lake T28Snohomish County",
    hatchery: "Whitehorse Pond",
    lake: "Silver Lake T28Snohomish County",
    latitude: 47.8934651,
    longitude: -122.2153023,
    species: "Rainbow",
    stocked_fish: 1517,
    weight: 0.9,
  },
  {
    date: "Wed, 25 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Green Lake King County",
    hatchery: "Whitehorse Pond",
    lake: "Green Lake King County",
    latitude: 47.6798338,
    longitude: -122.3257826,
    species: "Rainbow",
    stocked_fish: 1539,
    weight: 0.9,
  },
  {
    date: "Thu, 26 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Fio Rito Laken Kittitas County",
    hatchery: "Goldendale Hatchery",
    lake: "Fio Rito Laken Kittitas County",
    latitude: 46.9399474,
    longitude: -120.5062846,
    species: "Rainbow",
    stocked_fish: 33,
    weight: 0.1,
  },
  {
    date: "Thu, 26 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Fio Rito Laken Kittitas County",
    hatchery: "Goldendale Hatchery",
    lake: "Fio Rito Laken Kittitas County",
    latitude: 46.9399474,
    longitude: -120.5062846,
    species: "Rainbow",
    stocked_fish: 23,
    weight: 0.2,
  },
  {
    date: "Fri, 27 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Big Bow Pond Douglas County",
    hatchery: "Chelan Pud Hatchery",
    lake: "Big Bow Pond Douglas County",
    latitude: 47.7790617,
    longitude: -119.7474606,
    species: "Rainbow",
    stocked_fish: 3250,
    weight: 2.5,
  },
  {
    date: "Fri, 27 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Mattoon Lake Kittitas County",
    hatchery: "Goldendale Hatchery",
    lake: "Mattoon Lake Kittitas County",
    latitude: 46.9781076,
    longitude: -120.5530429,
    species: "Rainbow",
    stocked_fish: 33,
    weight: 0.1,
  },
  {
    date: "Fri, 27 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Mattoon Lake Kittitas County",
    hatchery: "Goldendale Hatchery",
    lake: "Mattoon Lake Kittitas County",
    latitude: 46.9781076,
    longitude: -120.5530429,
    species: "Rainbow",
    stocked_fish: 117,
    weight: 0.2,
  },
  {
    date: "Fri, 27 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Pit Lake Douglas County",
    hatchery: "Chelan Pud Hatchery",
    lake: "Pit Lake Douglas County",
    latitude: 47.3762619,
    longitude: -120.1404212,
    species: "Rainbow",
    stocked_fish: 2000,
    weight: 2.5,
  },
  {
    date: "Fri, 27 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Davis Lake Ferry County",
    hatchery: "Ford Hatchery",
    lake: "Davis Lake Ferry County",
    latitude: 48.7208264,
    longitude: -118.2420699,
    species: "Rainbow",
    stocked_fish: 250,
    weight: 0.9,
  },
  {
    date: "Mon, 30 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Big Bow Pond Douglas County",
    hatchery: "Chelan Pud Hatchery",
    lake: "Big Bow Pond Douglas County",
    latitude: 47.7790617,
    longitude: -119.7474606,
    species: "Rainbow",
    stocked_fish: 3750,
    weight: 2.5,
  },
  {
    date: "Mon, 30 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Clear Lake T34Skagit County",
    hatchery: "Marblemount Hatchery",
    lake: "Clear Lake T34Skagit County",
    latitude: 48.4642735,
    longitude: -122.2340447,
    species: "Rainbow",
    stocked_fish: 468,
    weight: 0.6,
  },
  {
    date: "Mon, 30 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Putters Pond Douglas County",
    hatchery: "Chelan Pud Hatchery",
    lake: "Putters Pond Douglas County",
    latitude: 47.7790617,
    longitude: -119.7474606,
    species: "Rainbow",
    stocked_fish: 3250,
    weight: 2.5,
  },
  {
    date: "Mon, 30 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Sylvia Lake Grays Harbor County",
    hatchery: "Lk Aberdeen Hatchery",
    lake: "Sylvia Lake Grays Harbor County",
    latitude: 47.0012413,
    longitude: -123.5899848,
    species: "Rainbow",
    stocked_fish: 1100,
    weight: 1,
  },
  {
    date: "Mon, 30 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Vance Creek Adlt Pond Grays Harbor County",
    hatchery: "Lk Aberdeen Hatchery",
    lake: "Vance Creek Adlt Pond Grays Harbor County",
    latitude: 47.0272912,
    longitude: -123.4205771,
    species: "Rainbow",
    stocked_fish: 800,
    weight: 1,
  },
  {
    date: "Mon, 30 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Clear Lake T34Skagit County",
    hatchery: "Marblemount Hatchery",
    lake: "Clear Lake T34Skagit County",
    latitude: 48.4642735,
    longitude: -122.2340447,
    species: "Rainbow",
    stocked_fish: 204,
    weight: 1.7,
  },
  {
    date: "Tue, 31 Oct 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Putters Pond Douglas County",
    hatchery: "Chelan Pud Hatchery",
    lake: "Putters Pond Douglas County",
    latitude: 47.7790617,
    longitude: -119.7474606,
    species: "Rainbow",
    stocked_fish: 5750,
    weight: 2.5,
  },
  {
    date: "Fri, 03 Nov 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Kress Lake Cowlitz County",
    hatchery: "Kalama Falls Hatchery",
    lake: "Kress Lake Cowlitz County",
    latitude: 46.0465158,
    longitude: -122.8532292,
    species: "Steelhead",
    stocked_fish: 15,
    weight: 0.1,
  },
  {
    date: "Mon, 06 Nov 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Rotary Lake Yakima County",
    hatchery: "Goldendale Hatchery",
    lake: "Rotary Lake Yakima County",
    latitude: 46.6280541,
    longitude: -120.50943,
    species: "Rainbow",
    stocked_fish: 79,
    weight: 0.2,
  },
  {
    date: "Mon, 06 Nov 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Kress Lake Cowlitz County",
    hatchery: "Kalama Falls Hatchery",
    lake: "Kress Lake Cowlitz County",
    latitude: 46.0465158,
    longitude: -122.8532292,
    species: "Steelhead",
    stocked_fish: 9,
    weight: 0.1,
  },
  {
    date: "Mon, 06 Nov 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Lake Kokanee Mason County",
    hatchery: "Eells Springs",
    lake: "Lake Kokanee Mason County",
    latitude: 47.4021276,
    longitude: -123.2045661,
    species: "Rainbow",
    stocked_fish: 20,
    weight: 0.8,
  },
  {
    date: "Mon, 06 Nov 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Beaver Lks T24King County",
    hatchery: "Issaquah Hatchery",
    lake: "Beaver Lks T24King County",
    latitude: 47.5899979,
    longitude: -121.9922229,
    species: "Rainbow",
    stocked_fish: 1856,
    weight: 0.4,
  },
  {
    date: "Mon, 06 Nov 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Rotary Lake Yakima County",
    hatchery: "Goldendale Hatchery",
    lake: "Rotary Lake Yakima County",
    latitude: 46.6280541,
    longitude: -120.50943,
    species: "Rainbow",
    stocked_fish: 56,
    weight: 0.1,
  },
  {
    date: "Mon, 06 Nov 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Kitsap Lake Kitsap County",
    hatchery: "Eells Springs",
    lake: "Kitsap Lake Kitsap County",
    latitude: 47.5828719,
    longitude: -122.7084779,
    species: "Rainbow",
    stocked_fish: 376,
    weight: 0.29,
  },
  {
    date: "Tue, 07 Nov 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Beaver Lks T24King County",
    hatchery: "Issaquah Hatchery",
    lake: "Beaver Lks T24King County",
    latitude: 47.5899979,
    longitude: -121.9922229,
    species: "Rainbow",
    stocked_fish: 342,
    weight: 0.4,
  },
  {
    date: "Tue, 07 Nov 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Roses Lake Chelan County",
    hatchery: "Chelan Pud Hatchery",
    lake: "Roses Lake Chelan County",
    latitude: 47.9045409,
    longitude: -120.155072,
    species: "Rainbow",
    stocked_fish: 20253,
    weight: 2.58,
  },
  {
    date: "Wed, 08 Nov 2023 00:00:00 GMT",
    derby_participant: false,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Kress Lake Cowlitz County",
    hatchery: "Kalama Falls Hatchery",
    lake: "Kress Lake Cowlitz County",
    latitude: 46.0465158,
    longitude: -122.8532292,
    species: "Steelhead",
    stocked_fish: 22,
    weight: 0.1,
  },
];

const Map: React.FC<MapProps> = ({ fishingDataList }) => {
  fishingDataList = dataList;
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
  const averageLatitude = fishingDataList.reduce((sum, data) => sum + data.latitude, 0) / fishingDataList.length;
  const averageLongitude = fishingDataList.reduce((sum, data) => sum + data.longitude, 0) / fishingDataList.length;

  // Set the map center to the average coordinates
  mapRef.current.setView([averageLatitude, averageLongitude], 7);
  }, [fishingDataList]);

  return <div id="map" style={{ height: "500px", width: "100%" }} />;
};

export default Map;
