import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const features = [
    {
      title: "Spatial stocking radar",
      description:
        "Sweep the statewide map for active waters, clustered target zones, and direct route access from a single command deck.",
      image: "/rainbow_trout.jpg",
    },
    {
      title: "Telemetry-rich analytics",
      description:
        "Read hatchery output, species movement, release-size distribution, and daily momentum through high-contrast chart surfaces.",
      image: "/steelhead_trout.jpg",
    },
    {
      title: "Profiles with field context",
      description:
        "Open hatchery dossiers and raw event ledgers to move from summary signals into precise stocking records without breaking flow.",
      image: "/cutthroat_trout.jpg",
    },
  ];

  const metrics = [
    { label: "Waters tracked", value: "1,200+" },
    { label: "Historical depth", value: "10 years" },
    { label: "Hatcheries indexed", value: "65+" },
    { label: "Statewide views", value: "Dashboard + map" },
  ];

  return (
    <>
      <Head>
        <title>Troutlytics | Washington Trout Intelligence</title>
        <meta
          name="description"
          content="Troutlytics transforms Washington trout stocking data into a premium night-water telemetry dashboard."
        />
      </Head>

      <div className="page-shell space-y-6 pb-8">
        <section className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="glass-panel-strong rounded-[2rem] p-6 sm:p-8">
            <div className="telemetry-kicker">
              <span className="signal-dot" />
              Washington trout telemetry
            </div>

            <div className="mt-6 max-w-4xl space-y-4">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.65em] text-cyan-100/55">
                Night-Water Command Deck
              </p>
              <h1 className="page-title text-balance">
                Trout stocking data, reimagined as an immersive sonar dashboard.
              </h1>
              <p className="page-copy max-w-3xl">
                Troutlytics translates Washington stocking reports into a
                premium dark-glass interface for anglers, hatchery teams, and
                data-minded planners. Sweep the state, trace the latest plants,
                and read the water with the same visual language across every
                surface.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dashboard" className="primary-button">
                Launch dashboard
              </Link>
              <Link href="/map" className="secondary-button">
                Open map sweep
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="metric-card rounded-[1.45rem] px-4 py-4"
                >
                  <p className="card-eyebrow">{metric.label}</p>
                  <p className="mt-3 stat-value">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="glass-panel rounded-[2rem] p-6 sm:p-7">
            <div className="space-y-4">
              <p className="card-eyebrow">Live Snapshot</p>
              <h2 className="text-2xl font-semibold text-white">
                A calmer way to read the state.
              </h2>
              <p className="text-sm leading-7 text-cyan-50/68">
                The interface blends atmospheric gradients, HUD pills, dark-glass
                panels, and restrained cyan glow so dense fisheries data still
                feels elegant.
              </p>
            </div>

            <div className="relative mt-8 flex h-[18rem] items-center justify-center overflow-hidden rounded-[1.8rem] border border-cyan-100/10 bg-[radial-gradient(circle,_rgba(99,215,255,0.14),_transparent_52%),linear-gradient(180deg,rgba(5,22,35,0.96),rgba(2,12,20,1))]">
              <div className="absolute inset-0 trout-loader-grid opacity-35" />
              <div className="absolute inset-8 rounded-full border border-cyan-100/12" />
              <div className="absolute inset-[22%] rounded-full border border-cyan-100/12" />
              <div className="absolute inset-[35%] rounded-full border border-cyan-100/12" />
              <div className="absolute h-px w-[72%] bg-gradient-to-r from-transparent via-cyan-100/25 to-transparent" />
              <div className="absolute h-[72%] w-px bg-gradient-to-b from-transparent via-cyan-100/25 to-transparent" />
              <div className="trout-loader-sweep absolute inset-0 rounded-full" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-cyan-100/20 bg-[#02111b]/80 shadow-[0_0_35px_rgba(70,190,255,0.16)] backdrop-blur-md">
                <div className="absolute inset-3 rounded-full border border-cyan-100/15" />
                <div className="trout-loader-core h-3.5 w-3.5 rounded-full bg-cyan-100 shadow-[0_0_24px_rgba(133,232,255,0.95)]" />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="hud-pill w-full justify-between px-4 py-3">
                <span>Statewide stocking sweep</span>
                <span className="text-cyan-100/48">Live</span>
              </div>
              <div className="hud-pill w-full justify-between px-4 py-3">
                <span>Map + analytics in sync</span>
                <span className="text-cyan-100/48">Ready</span>
              </div>
            </div>
          </aside>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="glass-panel overflow-hidden rounded-[1.9rem]"
            >
              <div className="relative h-56">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,12,20,0.14),rgba(2,12,20,0.88))]" />
              </div>
              <div className="p-6">
                <p className="card-eyebrow">Capability</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">
                  {feature.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-cyan-50/68">
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-panel rounded-[2rem] p-6 sm:p-7">
            <p className="card-eyebrow">Why It Exists</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Built to make public stocking data feel usable, not buried.
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-cyan-50/68">
              <p>
                Washington publishes the truth in plain view, but spreadsheets
                are not how most people naturally read a statewide fishery.
              </p>
              <p>
                Troutlytics adds hierarchy, atmosphere, and telemetry cues so
                maps, charts, and raw records all reinforce each other instead
                of competing for attention.
              </p>
              <p>
                The goal is not decoration. It is signal clarity, spatial
                intuition, and faster pattern recognition.
              </p>
            </div>
          </div>

          <div className="glass-panel-strong rounded-[2rem] p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="card-eyebrow">Explore The Deck</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  Three ways into the water.
                </h2>
              </div>
              <Link href="/hatcheries" className="ghost-button">
                Open hatchery profiles
              </Link>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Link
                href="/dashboard"
                className="rounded-[1.5rem] border border-white/8 bg-white/[0.04] p-5 transition hover:bg-white/[0.06]"
              >
                <p className="card-eyebrow">Dashboard</p>
                <p className="mt-2 text-xl font-semibold text-white">
                  Chart statewide volume
                </p>
              </Link>
              <Link
                href="/map"
                className="rounded-[1.5rem] border border-white/8 bg-white/[0.04] p-5 transition hover:bg-white/[0.06]"
              >
                <p className="card-eyebrow">Map</p>
                <p className="mt-2 text-xl font-semibold text-white">
                  Sweep the state spatially
                </p>
              </Link>
              <Link
                href="/about"
                className="rounded-[1.5rem] border border-white/8 bg-white/[0.04] p-5 transition hover:bg-white/[0.06]"
              >
                <p className="card-eyebrow">Mission</p>
                <p className="mt-2 text-xl font-semibold text-white">
                  See the conservation lens
                </p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
