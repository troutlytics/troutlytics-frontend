import React from "react";

const signalDots = Array.from({ length: 10 }, (_, index) => ({
  angle: index * 36,
  delay: `${index * 0.18}s`,
  size: index % 3 === 0 ? "h-3.5 w-3.5" : "h-2.5 w-2.5",
}));

interface FullScreenLoaderProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  statusItems?: string[];
  footerLabel?: string;
}

export default function FullScreenLoader({
  eyebrow = "Troutlytics Telemetry",
  title = "Sweeping the latest stocking signals",
  description = "Refreshing statewide plants, charting hatchery output, and priming the dashboard for a clean sonar pass.",
  statusItems = [
    "Syncing stocking history",
    "Plotting lake coordinates",
    "Calibrating hatchery telemetry",
  ],
  footerLabel = "Reading hatcheries • Tracking waters • Rendering telemetry",
}: FullScreenLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading Troutlytics data"
      className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden rounded-[2rem] border border-cyan-100/10 bg-[#03111b] px-6 py-10 text-white shadow-[0_30px_80px_rgba(0,0,0,0.28)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(87,190,255,0.22),_transparent_34%),radial-gradient(circle_at_bottom_left,_rgba(7,95,145,0.4),_transparent_36%),linear-gradient(135deg,_#02070d_5%,_#062135_45%,_#01050a_100%)]" />
      <div className="trout-loader-grid absolute inset-0 opacity-45" />
      <div className="trout-loader-glow absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full" />

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center gap-10">
        <div className="space-y-4 text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.65em] text-cyan-100/70">
            {eyebrow}
          </p>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              {title}
            </h1>
            <p className="mx-auto max-w-2xl text-sm leading-6 text-cyan-50/75 sm:text-base">
              {description}
            </p>
          </div>
        </div>

        <div className="relative flex h-[22rem] w-[22rem] items-center justify-center sm:h-[27rem] sm:w-[27rem]">
          <div className="absolute inset-0 rounded-full border border-white/10 bg-white/5 shadow-[0_0_70px_rgba(54,172,255,0.15)] backdrop-blur-[3px]" />
          <div className="absolute inset-[9%] rounded-full border border-cyan-200/10" />
          <div className="absolute inset-[21%] rounded-full border border-cyan-100/10" />
          <div className="absolute inset-[33%] rounded-full border border-cyan-100/10" />
          <div className="absolute inset-0 trout-loader-ring rounded-full border border-cyan-200/20" />
          <div className="absolute inset-[14%] trout-loader-ring rounded-full border border-cyan-200/15 [animation-delay:0.8s]" />
          <div className="absolute inset-[28%] trout-loader-ring rounded-full border border-cyan-200/10 [animation-delay:1.6s]" />
          <div className="trout-loader-sweep absolute inset-0 rounded-full" />
          <div className="absolute inset-0 rounded-full border border-white/5" />
          <div className="absolute h-px w-[78%] bg-gradient-to-r from-transparent via-cyan-100/25 to-transparent" />
          <div className="absolute h-[78%] w-px bg-gradient-to-b from-transparent via-cyan-100/25 to-transparent" />

          <div className="trout-loader-orbit absolute inset-0">
            {signalDots.map((dot) => (
              <div
                key={dot.angle}
                className="absolute left-1/2 top-1/2"
                style={{ transform: `rotate(${dot.angle}deg)` }}
              >
                <div className="-translate-y-[10.6rem] sm:-translate-y-[13rem]">
                  <div
                    className={`trout-loader-dot ${dot.size} rounded-full bg-cyan-100 shadow-[0_0_18px_rgba(147,230,255,0.9)]`}
                    style={{ animationDelay: dot.delay }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="trout-loader-orbit-reverse absolute inset-[14%]">
            {signalDots.slice(0, 6).map((dot) => (
              <div
                key={`inner-${dot.angle}`}
                className="absolute left-1/2 top-1/2"
                style={{ transform: `rotate(${dot.angle + 24}deg)` }}
              >
                <div className="-translate-y-[7.4rem] sm:-translate-y-[8.8rem]">
                  <div
                    className="trout-loader-dot h-2 w-2 rounded-full bg-sky-300 shadow-[0_0_14px_rgba(98,212,255,0.8)]"
                    style={{
                      animationDelay: `${Number.parseFloat(dot.delay) + 0.4}s`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-cyan-100/20 bg-[#02111b]/80 shadow-[0_0_35px_rgba(70,190,255,0.16)] backdrop-blur-md sm:h-32 sm:w-32">
            <div className="absolute inset-3 rounded-full border border-cyan-100/15" />
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(113,223,255,0.22),_transparent_60%)]" />
            <div className="trout-loader-core relative h-3.5 w-3.5 rounded-full bg-cyan-100 shadow-[0_0_24px_rgba(133,232,255,0.95)]" />
            <div className="absolute bottom-6 text-[0.6rem] font-medium uppercase tracking-[0.5em] text-cyan-100/70">
              scanning
            </div>
          </div>
        </div>

        <div className="grid w-full max-w-4xl gap-3 md:grid-cols-3">
          {statusItems.map((item, index) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-md"
            >
              <div className="mb-3 flex items-center gap-3">
                <div
                  className="trout-loader-dot h-2.5 w-2.5 rounded-full bg-cyan-100 shadow-[0_0_16px_rgba(126,229,255,0.9)]"
                  style={{ animationDelay: `${index * 0.35}s` }}
                />
                <p className="text-sm font-medium tracking-[0.01em] text-white/90">
                  {item}
                </p>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="trout-loader-progress h-full rounded-full bg-gradient-to-r from-cyan-200/70 via-sky-300 to-cyan-100"
                  style={{ animationDelay: `${index * 0.5}s` }}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs uppercase tracking-[0.45em] text-cyan-100/45">
          {footerLabel}
        </p>

        <span className="sr-only">Loading Troutlytics data.</span>
      </div>
    </div>
  );
}
