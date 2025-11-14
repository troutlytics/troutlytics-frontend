import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "Live Stocking Intelligence",
      description:
        "Stay up to date on exactly when and where trout are being released with map layers, filters, and curated alerts.",
      icon: "📍",
    },
    {
      title: "Beautiful Visual Analytics",
      description:
        "Dive into species trends, hatchery performance, and historical patterns with cinematic charts and motion.",
      icon: "📊",
    },
    {
      title: "Made for Anglers & Agencies",
      description:
        "The interface is tuned for biologists, hatchery managers, and weekend anglers alike—clarity without compromise.",
      icon: "🎣",
    },
  ];

  const metrics = [
    { label: "Waters tracked", value: "1,200+" },
    { label: "Historical records parsed", value: "10 years" },
    { label: "Hatcheries analyzed", value: "65+" },
  ];

  const testimonials = [
    {
      quote:
        "Troutlytics turned boring stocking spreadsheets into a fun app that gets us out on the water.",
      name: "Sarah J.",
      title: "Washington state angler",
    },
    {
      quote:
        "The dashboard saves us time from combing over data that we don't need. We have everything in one place, which is great.",
      name: "Colin R.",
      title: "Colleague, angler",
    },
  ];

  return (
    <>
      <Head>
        <title>Troutlytics | Washington Trout Intelligence</title>
        <meta
          name="description"
          content="Troutlytics, showcasing live trout stocking insights for Washington State."
        />
      </Head>
      <main className="min-h-screen text-slate-900 bg-troutlytics-background">
        <section className="relative overflow-hidden text-white hero-gradient">
          <div className="absolute inset-0 opacity-40 mix-blend-overlay">
            <div className="absolute w-64 h-64 bg-white rounded-full blur-3xl -top-20 -right-10" />
            <div className="absolute bottom-0 rounded-full w-72 h-72 bg-troutlytics-accent blur-3xl -left-16" />
          </div>
          <div className="relative max-w-6xl px-6 py-24 mx-auto">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="inline-flex px-4 py-1 mb-6 text-sm font-semibold rounded-full bg-white/10 backdrop-blur">
                  Built for the Washington trout community
                </p>
                <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
                  A beautifully immersive home for Washington trout stocking
                  data.
                </h1>
                <p className="mb-10 text-lg text-white/80">
                  Troutlytics elevates public stocking records into an
                  interactive experience. Maps, curated insights, and stories
                  that help anglers plan unforgettable days on the water.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-slate-900 bg-white rounded-full shadow-lg hover:-translate-y-0.5 transition-transform"
                  >
                    Launch the dashboard
                    <span className="ml-2 text-xl" aria-hidden="true">
                      →
                    </span>
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold transition border rounded-full border-white/40 hover:bg-white/10"
                  >
                    Meet the mission
                  </Link>
                </div>
              </div>
              <div className="relative p-6 glass-panel">
                <div className="absolute h-10 rounded-full inset-x-8 top-8 bg-white/20 blur-2xl" />
                <div className="relative p-6 space-y-6 shadow-2xl rounded-2xl snapshot-card">
                  <div>
                    <p className="text-sm tracking-widest uppercase text-white/70">
                      Live Snapshot
                    </p>
                    <p className="text-3xl font-semibold text-white">
                      Yakima Region
                    </p>
                  </div>
                  <ul className="space-y-3 text-white/90">
                    <li className="flex items-center justify-between">
                      <span>Stocked this week</span>
                      <strong>28,450 fish</strong>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Most active hatchery</span>
                      <strong>Goldendale</strong>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Top destination</span>
                      <strong>Wenas Lake</strong>
                    </li>
                  </ul>
                  <p className="text-sm text-white/70">
                    Data refreshes every few minutes. Dive deeper inside the
                    dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-6xl px-6 mx-auto">
            <p className="text-sm font-semibold tracking-widest text-troutlytics-accent">
              Why Troutlytics
            </p>
            <h2 className="mt-2 text-3xl font-bold text-troutlytics-secondary">
              Trout stocking data that makes sense.
            </h2>
            <p className="max-w-3xl mt-3 text-lg text-troutlytics-subtext">
              The WDFW is fair and transparent with how they deliver public
              trout stocking data, however, if you are looking for a more
              visually interactive experience, Troutlytics is the solution.
            </p>
            <div className="grid gap-6 mt-12 md:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="h-full p-6 transition-shadow bg-white border shadow-sm rounded-2xl hover:shadow-xl border-slate-100"
                >
                  <div className="flex items-center justify-center w-12 h-12 mb-4 text-2xl rounded-full bg-troutlytics-primary/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-troutlytics-subtext">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-5xl px-6 mx-auto glass-panel">
            <div className="grid gap-8 md:grid-cols-3">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="p-6 text-center rounded-2xl metric-card"
                >
                  <p className="text-3xl font-semibold text-troutlytics-primary">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm font-semibold tracking-wide uppercase text-troutlytics-subtext">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-6xl px-6 mx-auto">
            <div className="grid gap-8 lg:grid-cols-2">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="p-8 shadow-xl rounded-3xl testimonial-card"
                >
                  <p className="text-lg italic text-troutlytics-secondary">
                    “{testimonial.quote}”
                  </p>
                  <div className="mt-6">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-troutlytics-subtext">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="max-w-4xl px-8 py-16 mx-auto text-center text-white gradient-panel">
            <p className="text-sm font-semibold tracking-[0.2em] text-white/70 uppercase">
              Ready when you are
            </p>
            <h3 className="mt-4 text-3xl font-bold">
              Bring beauty and clarity to trout stocking data.
            </h3>
            <p className="mt-3 text-lg text-white/80">
              Your dashboard is a click away. Step inside to see stocking
              timelines, hatchery stories, and map layers that feel alive.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-6 py-3 font-semibold bg-white rounded-full shadow-lg text-troutlytics-secondary"
              >
                Explore the dashboard
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 font-semibold transition border rounded-full border-white/50 hover:bg-white/10"
              >
                Request a walkthrough
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
