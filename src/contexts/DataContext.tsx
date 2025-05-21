import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import useApiData, {
  StockedLake,
  HatcheryTotal,
  TotalStockedByDate,
  DateRange,
} from "@/hooks/useApiData";
import { calculateDate } from "@/utils";

interface ApiDataContextType {
  stockedLakesData: StockedLake[];
  hatcheryTotals: HatcheryTotal[];
  totalStockedByDate: TotalStockedByDate[];
  selectedDateRange: DateRange;
  setSelectedDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
  today: Date;
  dateDataUpdated: string;
  hatcheryNames: string[];

  // Loading states
  isLoading: boolean;

  // Error flags (could expose more granularity if needed)
  hasError: boolean;
}

const defaultState: ApiDataContextType = {
  stockedLakesData: [],
  hatcheryTotals: [],
  totalStockedByDate: [],
  today: new Date(),
  selectedDateRange: {
    recentDate: new Date().toDateString(),
    pastDate: calculateDate(7).toDateString(),
  },
  setSelectedDateRange: () => {},
  dateDataUpdated: "",
  hatcheryNames: [],
  isLoading: false,
  hasError: false,
};

const ApiDataContext = createContext<ApiDataContextType>(defaultState);

export const useApiDataContext = () => useContext(ApiDataContext);

interface ApiDataProviderProps {
  children: ReactNode;
}

export const ApiDataProvider: React.FC<ApiDataProviderProps> = ({
  children,
}) => {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>(
    defaultState.selectedDateRange
  );

  const today = defaultState.today;

  const {
    hatcheryNames,
    stockedLakesData,
    hatcheryTotals,
    totalStockedByDate,
    dateDataUpdated,

    // New from hook
    stockedLakesLoading,
    hatcheryTotalsLoading,
    totalStockedByDateLoading,
    dateDataUpdatedLoading,
    hatcheryNamesLoading,

    stockedLakesError,
    hatcheryTotalsError,
    totalStockedByDateError,
    dateDataUpdatedError,
    hatcheryNamesError,
  } = useApiData(selectedDateRange);

  const isLoading =
    stockedLakesLoading ||
    hatcheryTotalsLoading ||
    totalStockedByDateLoading ||
    dateDataUpdatedLoading ||
    hatcheryNamesLoading;

  const hasError =
    !!stockedLakesError ||
    !!hatcheryTotalsError ||
    !!totalStockedByDateError ||
    !!dateDataUpdatedError ||
    !!hatcheryNamesError;

  useEffect(() => {
    if (hasError) {
      console.error("Error loading API data", {
        stockedLakesError,
        hatcheryTotalsError,
        totalStockedByDateError,
        dateDataUpdatedError,
        hatcheryNamesError,
      });
    }
  }, [hasError]);

  return (
    <ApiDataContext.Provider
      value={{
        stockedLakesData,
        hatcheryTotals,
        totalStockedByDate,
        selectedDateRange,
        setSelectedDateRange,
        today,
        dateDataUpdated,
        hatcheryNames,
        isLoading,
        hasError,
      }}
    >
      {children}
    </ApiDataContext.Provider>
  );
};
