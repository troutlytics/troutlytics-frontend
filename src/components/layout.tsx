import Header from "./Header";
import { useApiDataContext } from "@/contexts/DataContext";
import { formatDate } from "@/utils";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { dateDataUpdated } = useApiDataContext();

  const syncLabel = dateDataUpdated
    ? `Latest telemetry pull: ${formatDate(dateDataUpdated)}`
    : "Telemetry sync is warming up.";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#03111b] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(87,190,255,0.18),_transparent_28%),radial-gradient(circle_at_20%_82%,_rgba(7,95,145,0.24),_transparent_30%),linear-gradient(135deg,_#01060b_6%,_#072238_48%,_#01050a_100%)]" />
        <div className="app-shell-grid absolute inset-0 opacity-30" />
        <div className="app-shell-glow absolute left-[18%] top-[12%] h-[32rem] w-[32rem] rounded-full opacity-85" />
        <div
          className="app-shell-glow absolute left-[82%] top-[68%] h-[24rem] w-[24rem] rounded-full opacity-70"
          style={{ animationDelay: "-2.8s" }}
        />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
      <Header />
      <main className="main flex-1 px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="px-4 pb-6 sm:px-6 lg:px-8">
        <div className="page-shell">
          <div className="glass-panel rounded-[1.65rem] px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="card-eyebrow">Source Stream</p>
                <p className="mt-2 text-sm leading-7 text-cyan-50/70">
                  {syncLabel} Trout stocking records are sourced from the{" "}
                  <a
                    className="font-semibold text-cyan-100 hover:text-white"
                    href="https://wdfw.wa.gov/fishing/reports/stocking/trout-plants/all"
                    target="_blank"
                    rel="noreferrer nofollow"
                  >
                    Washington Department of Fish &amp; Wildlife trout plant
                    reports
                  </a>
                  .
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link href="/dashboard" className="ghost-button">
                  Open dashboard
                </Link>
                <Link href="/map" className="ghost-button">
                  View map
                </Link>
                <Link href="/contact" className="ghost-button">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
