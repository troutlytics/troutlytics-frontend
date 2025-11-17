import { useApiDataContext } from "@/contexts/DataContext";
import { DateRange } from "@/hooks/useApiData";
import DateRangePicker from "@/components/DateRangePicker";
import dynamic from "next/dynamic";

const FishingMap = dynamic(() => import("../components/fishMap"), {
  ssr: false,
});

const MapPage = () => {
  const {
    stockedLakesData,
    isLoading,
    selectedDateRange,
    setSelectedDateRange,
  } = useApiDataContext();

  const handleDateChange = (range: DateRange) => {
    setSelectedDateRange(range);
  };

  return (
    <div className="container mx-auto">
      <header className="mb-8 text-center">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-troutlytics-accent">
          Interactive map
        </p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">
          Stocking activity across Washington
        </h1>
        <p className="max-w-3xl mx-auto mt-3 text-lg text-troutlytics-subtext">
          Cluster thousands of historical stocking events, drill into individual
          water bodies, and jump straight into navigation with built-in driving
          directions.
        </p>
      </header>

      <section className="sticky top-0 z-10 py-2 mb-6 bg-troutlytics-background/80 backdrop-blur">
        <DateRangePicker
          selectedDateRange={selectedDateRange}
          handleDateChange={handleDateChange}
        />
      </section>

      <section className="p-4 bg-white border shadow-sm rounded-3xl border-slate-100">
        <FishingMap stockedLakesData={stockedLakesData} loading={isLoading} />
      </section>
    </div>
  );
};

export default MapPage;
