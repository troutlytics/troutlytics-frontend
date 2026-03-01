import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
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

interface BreakdownDatum {
  name: string;
  total: number;
}

interface InsightMetric {
  label: string;
  value: string;
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
  extraMetrics: InsightMetric[];
}

interface HatcheryDataContextType {
  hatcheryNames: string[];
  activeHatchery: string | null;
  setActiveHatchery: Dispatch<SetStateAction<string | null>>;
  selectedInsight: HatcheryInsight | null;
  isNamesLoading: boolean;
  isInsightLoading: boolean;
  hasError: boolean;
}

const defaultValue: HatcheryDataContextType = {
  hatcheryNames: [],
  activeHatchery: null,
  setActiveHatchery: () => {},
  selectedInsight: null,
  isNamesLoading: false,
  isInsightLoading: false,
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

const EXCLUDED_NUMERIC_KEYS = new Set([
  "id",
  "rank",
  "index",
  "year",
  "month",
  "day",
]);

interface HatcheryProfileResponse {
  resolved_hatchery?: string;
  hatchery?: string;
  name?: string;
  summary?: Record<string, unknown>;
  top_waters?: unknown;
  top_waters_served?: unknown;
  species_breakdown?: unknown;
  top_species?: unknown;
  recent_stocking_activity?: unknown;
  recent_releases?: unknown;
  [key: string]: unknown;
}

const toNumber = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value.replaceAll(",", ""));
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
};

const firstNumber = (...values: unknown[]): number | null => {
  for (const value of values) {
    const parsed = toNumber(value);
    if (parsed !== null) return parsed;
  }
  return null;
};

const firstString = (...values: unknown[]): string | null => {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value;
  }
  return null;
};

const toTitleCaseLabel = (key: string) =>
  key
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());

const formatScalarValue = (value: unknown): string => {
  if (typeof value === "number") {
    return Number.isInteger(value)
      ? value.toLocaleString()
      : value.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
};

const isScalarValue = (value: unknown) =>
  typeof value === "number" ||
  typeof value === "string" ||
  typeof value === "boolean";

const firstLikelyNumeric = (record: Record<string, unknown>): number | null => {
  const candidateByName = firstNumber(
    record.total_fish_stocked,
    record.total_stocked,
    record.total_fish,
    record.fish_stocked,
    record.stocked_fish,
    record.fish_count,
    record.total_count,
    record.count,
    record.sum_1,
    record.sum,
    record.value,
    record.amount
  );
  if (candidateByName !== null) return candidateByName;

  for (const [key, value] of Object.entries(record)) {
    if (EXCLUDED_NUMERIC_KEYS.has(key.toLowerCase())) continue;
    const parsed = toNumber(value);
    if (parsed !== null) return parsed;
  }

  return null;
};

const parseBreakdown = (value: unknown): BreakdownDatum[] => {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const asMap = Object.entries(value as Record<string, unknown>)
      .map(([name, total]): BreakdownDatum | null => {
        const parsedTotal = toNumber(total);
        if (parsedTotal === null) return null;
        return { name, total: parsedTotal };
      })
      .filter((item): item is BreakdownDatum => Boolean(item));

    if (asMap.length) {
      return asMap.sort((a, b) => b.total - a.total).slice(0, 5);
    }
  }

  if (!Array.isArray(value)) return [];

  const entries = value
    .map((item): BreakdownDatum | null => {
      if (Array.isArray(item)) {
        const name = firstString(item[0], item[1], item[2]);
        const total = firstNumber(item[0], item[1], item[2]);
        if (!name || total === null) return null;
        return { name, total };
      }

      if (!item || typeof item !== "object") return null;

      const record = item as Record<string, unknown>;
      const name =
        firstString(
          record.name,
          record.label,
          record.hatchery,
          record.species,
          record.water_name_cleaned,
          record.water_name,
          record.water,
          record.lake
        ) ??
        Object.values(record).find((value) => typeof value === "string")?.toString() ??
        "Unknown";
      const total = firstLikelyNumeric(record) ?? 0;

      return { name, total };
    })
    .filter((item): item is BreakdownDatum => Boolean(item))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return entries;
};

const pickBreakdown = (...values: unknown[]): BreakdownDatum[] => {
  for (const value of values) {
    const parsed = parseBreakdown(value);
    if (parsed.length) return parsed;
  }
  return [];
};

const parseRecentReleases = (value: unknown): StockedLake[] => {
  if (!Array.isArray(value)) return [];

  return value
    .map((item, index): StockedLake | null => {
      if (!item || typeof item !== "object") return null;
      const record = item as Record<string, unknown>;

      const id =
        firstNumber(record.id, record.row_id, record.release_id) ?? index + 1;
      const stockedFish =
        firstNumber(record.stocked_fish, record.fish_stocked, record.total_fish) ?? 0;
      const weight =
        firstNumber(record.weight, record.fish_per_pound, record.fish_per_lb) ?? 0;
      const latitude = firstNumber(record.latitude, record.lat) ?? 0;
      const longitude = firstNumber(record.longitude, record.lng, record.lon) ?? 0;

      return {
        id,
        water_name_cleaned:
          firstString(
            record.water_name_cleaned,
            record.water_name,
            record.water,
            record.lake
          ) ?? "Unknown Water",
        stocked_fish: stockedFish,
        species:
          firstString(record.species, record.species_name) ?? "Unknown Species",
        weight,
        hatchery:
          firstString(record.hatchery, record.resolved_hatchery) ??
          "Unknown Hatchery",
        date:
          firstString(
            record.date,
            record.stock_date,
            record.stocking_date,
            record.stocked_at
          ) ?? "",
        latitude,
        longitude,
        directions: firstString(record.directions, record.map_link) ?? "",
        derby_participant: Boolean(record.derby_participant),
      };
    })
    .filter((item): item is StockedLake => Boolean(item))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
};

const createEmptyInsight = (hatcheryName: string): HatcheryInsight => ({
  name: hatcheryName,
  totalFish: 0,
  totalWeight: 0,
  totalReleases: 0,
  uniqueWaters: 0,
  averageWeight: null,
  topWaters: [],
  speciesBreakdown: [],
  lastStockDate: null,
  firstStockDate: null,
  recentReleases: [],
  extraMetrics: [],
});

const aggregateHatcheryInsightFromRecords = (
  records: StockedLake[]
) => {
  const waters: Record<string, number> = {};
  const species: Record<string, number> = {};
  let totalFish = 0;
  let totalWeight = 0;
  let totalFishWithWeight = 0;
  let lastStockDate: string | null = null;
  let firstStockDate: string | null = null;

  records.forEach((record) => {
    const fish = record.stocked_fish || 0;
    const fishPerPound = Number(record.weight) || 0;
    const waterName = record.water_name_cleaned || "Unknown Water";
    const speciesName = record.species || "Unknown Species";

    totalFish += fish;
    if (fishPerPound > 0 && fish > 0) {
      totalWeight += fish / fishPerPound;
      totalFishWithWeight += fish;
    }

    waters[waterName] = (waters[waterName] || 0) + fish;
    species[speciesName] = (species[speciesName] || 0) + fish;

    if (record.date) {
      const eventDate = new Date(record.date);
      const iso = eventDate.toISOString();
      if (!lastStockDate || eventDate > new Date(lastStockDate)) {
        lastStockDate = iso;
      }
      if (!firstStockDate || eventDate < new Date(firstStockDate)) {
        firstStockDate = iso;
      }
    }
  });

  const recentReleases = records
    .slice()
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, 5);

  return {
    totalFish,
    totalWeight,
    totalReleases: records.length,
    uniqueWaters: Object.keys(waters).length,
    averageWeight:
      totalFishWithWeight > 0 ? totalWeight / totalFishWithWeight : null,
    topWaters: buildBreakdown(waters),
    speciesBreakdown: buildBreakdown(species),
    lastStockDate,
    firstStockDate,
    recentReleases,
  };
};

const normalizeProfileToInsight = (
  profile: HatcheryProfileResponse | undefined,
  requestedHatcheryName: string
): HatcheryInsight => {
  if (!profile) return createEmptyInsight(requestedHatcheryName);

  const summary = (profile.summary ?? {}) as Record<string, unknown>;
  const topWaters = pickBreakdown(
    profile.top_waters,
    profile.top_waters_served
  );
  const speciesBreakdown = pickBreakdown(
    profile.species_breakdown,
    profile.top_species
  );
  const recentReleases = parseRecentReleases(
    profile.recent_stocking_activity ?? profile.recent_releases
  );

  const aggregateFromRecent = aggregateHatcheryInsightFromRecords(recentReleases);
  const fallbackWaters = aggregateFromRecent.topWaters;
  const fallbackSpecies = aggregateFromRecent.speciesBreakdown;

  const totalFish =
    firstNumber(
      summary.total_fish_stocked,
      summary.total_fish,
      summary.total_stocked,
      profile.total_fish_stocked,
      profile.total_fish,
      profile.total_stocked
    ) ?? aggregateFromRecent.totalFish;
  const totalReleases =
    firstNumber(
      summary.total_stocking_events,
      summary.total_releases,
      profile.total_stocking_events,
      profile.total_releases
    ) ?? aggregateFromRecent.totalReleases;
  const uniqueWaters =
    firstNumber(
      summary.unique_waters,
      summary.unique_waters_served,
      profile.unique_waters,
      profile.unique_waters_served
    ) ?? aggregateFromRecent.uniqueWaters;
  const averageWeight =
    firstNumber(
      summary.average_fish_weight_lbs,
      summary.average_fish_weight,
      summary.average_weight,
      profile.average_fish_weight_lbs,
      profile.average_fish_weight,
      profile.average_weight
    ) ?? aggregateFromRecent.averageWeight;
  const totalWeight =
    firstNumber(
      summary.total_weight_lbs,
      summary.total_weight,
      profile.total_weight_lbs,
      profile.total_weight
    ) ?? aggregateFromRecent.totalWeight;
  const firstStockDate =
    firstString(
      summary.first_stock_date,
      summary.first_stocking_date,
      profile.first_stock_date,
      profile.first_stocking_date
    ) ?? aggregateFromRecent.firstStockDate;
  const lastStockDate =
    firstString(
      summary.last_stock_date,
      summary.last_stocking_date,
      profile.last_stock_date,
      profile.last_stocking_date
    ) ?? aggregateFromRecent.lastStockDate;

  const consumedSummaryKeys = new Set([
    "total_fish_stocked",
    "total_fish",
    "total_stocked",
    "total_stocking_events",
    "total_releases",
    "unique_waters",
    "unique_waters_served",
    "average_fish_weight_lbs",
    "average_fish_weight",
    "average_weight",
    "total_weight_lbs",
    "total_weight",
    "first_stock_date",
    "first_stocking_date",
    "last_stock_date",
    "last_stocking_date",
  ]);

  const extraMetrics: InsightMetric[] = [];

  Object.entries(summary).forEach(([key, value]) => {
    if (consumedSummaryKeys.has(key)) return;
    if (!isScalarValue(value)) return;
    const textValue = formatScalarValue(value);
    if (!textValue) return;
    extraMetrics.push({
      label: toTitleCaseLabel(key),
      value: textValue,
    });
  });

  const profileLevelCandidates: Array<[string, unknown]> = [
    ["Matched Hatchery", profile.resolved_hatchery],
    ["Match Score", profile.match_score],
    ["Match Type", profile.match_type],
  ];

  profileLevelCandidates.forEach(([label, value]) => {
    if (!isScalarValue(value)) return;
    const textValue = formatScalarValue(value);
    if (!textValue) return;
    if (
      label === "Matched Hatchery" &&
      typeof value === "string" &&
      value.trim().toLowerCase() === requestedHatcheryName.trim().toLowerCase()
    ) {
      return;
    }
    extraMetrics.push({ label, value: textValue });
  });

  return {
    name:
      firstString(
        profile.resolved_hatchery,
        profile.hatchery,
        profile.name
      ) ?? requestedHatcheryName,
    totalFish,
    totalWeight,
    totalReleases,
    uniqueWaters,
    averageWeight,
    topWaters: topWaters.length ? topWaters : fallbackWaters,
    speciesBreakdown: speciesBreakdown.length ? speciesBreakdown : fallbackSpecies,
    lastStockDate,
    firstStockDate,
    recentReleases,
    extraMetrics: extraMetrics.slice(0, 6),
  };
};

const getHatcheryProfileUrl = (hatcheryName: string) => {
  const queryParams = new URLSearchParams({
    name: hatcheryName,
    recent_limit: "10",
  });

  return `${route}/hatchery_profile?${queryParams.toString()}`;
};

export const HatcheryDataProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [activeHatchery, setActiveHatchery] =
    useState<string | null>(null);

  const {
    data: hatcheryProfileResponse,
    error: hatcheryProfileError,
    isLoading: hatcheryProfileLoading,
  } = useSWR<HatcheryProfileResponse>(
    activeHatchery ? getHatcheryProfileUrl(activeHatchery) : null,
    fetcher,
    swrOptions
  );

  const {
    data: hatcheryNamesResponse,
    error: hatcheryNamesError,
    isLoading: hatcheryNamesLoading,
  } = useSWR<string[]>(`${route}/hatchery_names`, fetcher, swrOptions);

  const selectedInsight = useMemo(() => {
    if (!activeHatchery) return null;
    return normalizeProfileToInsight(
      hatcheryProfileResponse,
      activeHatchery
    );
  }, [hatcheryProfileResponse, activeHatchery]);

  const hatcheryNames = hatcheryNamesResponse ?? [];

  const hasError = Boolean(hatcheryProfileError || hatcheryNamesError);

  return (
    <HatcheryDataContext.Provider
      value={{
        hatcheryNames,
        activeHatchery,
        setActiveHatchery,
        selectedInsight,
        isNamesLoading: hatcheryNamesLoading,
        isInsightLoading: hatcheryProfileLoading,
        hasError,
      }}
    >
      {children}
    </HatcheryDataContext.Provider>
  );
};
