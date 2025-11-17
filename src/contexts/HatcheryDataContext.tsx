import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
} from "react";
import useSWR from "swr";
import {
  fetcher,
  route,
  StockedLake,
} from "@/hooks/useApiData";

const swrOptions = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 10 * 60 * 1000,
  keepPreviousData: true,
};

const HATCHERY_DATA_START =
  process.env.NEXT_PUBLIC_HATCHERY_DATA_START ?? "2010-01-01";
const todayIso = new Date().toISOString().split("T")[0];
const hatcheryDateQuery = `?start_date=${HATCHERY_DATA_START}&end_date=${todayIso}`;

interface BreakdownDatum {
  name: string;
  total: number;
}

export interface HatcheryInsight {
  name: string;
  totalFish: number;
  totalWeight: number;
  totalReleases: number;
  uniqueWaters: number;
  averageWeight: number | null;
  topWaters: BreakdownDatum[];
  speciesBreakdown: BreakdownDatum[];
  lastStockDate: string | null;
  firstStockDate: string | null;
  recentReleases: StockedLake[];
}

interface HatcheryDataContextType {
  hatcheryInsights: HatcheryInsight[];
  hatcheryNames: string[];
  hatcheryRecords: StockedLake[];
  isLoading: boolean;
  hasError: boolean;
}

const defaultValue: HatcheryDataContextType = {
  hatcheryInsights: [],
  hatcheryNames: [],
  hatcheryRecords: [],
  isLoading: false,
  hasError: false,
};

const HatcheryDataContext =
  createContext<HatcheryDataContextType>(defaultValue);

export const useHatcheryDataContext = () =>
  useContext(HatcheryDataContext);

const buildBreakdown = (
  map: Record<string, number>,
  limit = 5
): BreakdownDatum[] =>
  Object.entries(map)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([name, total]) => ({ name, total }));

const aggregateHatcheryInsights = (
  records: StockedLake[]
): HatcheryInsight[] => {
  const aggregates: Record<
    string,
    {
      name: string;
      totalFish: number;
      totalWeight: number;
      totalFishWithWeight: number;
      totalReleases: number;
      waters: Record<string, number>;
      species: Record<string, number>;
      lastStockDate: string | null;
      firstStockDate: string | null;
      recentReleases: StockedLake[];
    }
  > = {};

  records.forEach((record) => {
    const hatcheryName = record.hatchery || "Unknown Hatchery";
    if (!aggregates[hatcheryName]) {
      aggregates[hatcheryName] = {
        name: hatcheryName,
        totalFish: 0,
        totalWeight: 0,
        totalFishWithWeight: 0,
        totalReleases: 0,
        waters: {},
        species: {},
        lastStockDate: null,
        firstStockDate: null,
        recentReleases: [],
      };
    }

    const agg = aggregates[hatcheryName];
    const fish = record.stocked_fish || 0;
    const fishPerPound = Number(record.weight) || 0;
    const water = record.water_name_cleaned || "Unknown Water";
    const species = record.species || "Unknown Species";

    agg.totalFish += fish;
    if (fishPerPound > 0 && fish > 0) {
      agg.totalWeight += fish / fishPerPound; // convert fish-per-pound to pounds per fish
      agg.totalFishWithWeight += fish;
    }
    agg.totalReleases += 1;
    agg.waters[water] = (agg.waters[water] || 0) + fish;
    agg.species[species] = (agg.species[species] || 0) + fish;

    const eventDate = record.date ? new Date(record.date) : null;
    if (eventDate) {
      const iso = eventDate.toISOString();
      if (!agg.lastStockDate || eventDate > new Date(agg.lastStockDate)) {
        agg.lastStockDate = iso;
      }
      if (!agg.firstStockDate || eventDate < new Date(agg.firstStockDate)) {
        agg.firstStockDate = iso;
      }
    }

    agg.recentReleases.push(record);
  });

  return Object.values(aggregates)
    .map((agg) => {
      const sortedRecent = agg.recentReleases
        .slice()
        .sort(
          (a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        .slice(0, 5);

      return {
        name: agg.name,
        totalFish: agg.totalFish,
        totalWeight: agg.totalWeight,
        totalReleases: agg.totalReleases,
        uniqueWaters: Object.keys(agg.waters).length,
        averageWeight:
          agg.totalFishWithWeight > 0
            ? agg.totalWeight / agg.totalFishWithWeight
            : null,
        topWaters: buildBreakdown(agg.waters),
        speciesBreakdown: buildBreakdown(agg.species),
        lastStockDate: agg.lastStockDate,
        firstStockDate: agg.firstStockDate,
        recentReleases: sortedRecent,
      };
    })
    .sort((a, b) => b.totalFish - a.totalFish);
};

export const HatcheryDataProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const {
    data: hatcheryRecords,
    error: hatcheryRecordsError,
    isLoading: hatcheryRecordsLoading,
  } = useSWR<StockedLake[]>(
    `${route}/stocked_lakes_data${hatcheryDateQuery}`,
    fetcher,
    swrOptions
  );

  const {
    data: hatcheryNamesResponse,
    error: hatcheryNamesError,
    isLoading: hatcheryNamesLoading,
  } = useSWR<string[]>(`${route}/hatchery_names`, fetcher, swrOptions);

  const hatcheryInsights = useMemo(
    () => aggregateHatcheryInsights(hatcheryRecords ?? []),
    [hatcheryRecords]
  );

  const hatcheryNames =
    hatcheryNamesResponse ??
    hatcheryInsights.map((insight) => insight.name);

  const isLoading = hatcheryRecordsLoading || hatcheryNamesLoading;
  const hasError = Boolean(hatcheryRecordsError || hatcheryNamesError);

  return (
    <HatcheryDataContext.Provider
      value={{
        hatcheryInsights,
        hatcheryNames,
        hatcheryRecords: hatcheryRecords ?? [],
        isLoading,
        hasError,
      }}
    >
      {children}
    </HatcheryDataContext.Provider>
  );
};
