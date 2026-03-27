import Link from "next/link";

const values = [
  {
    title: "Transparency",
    description:
      "Stocking data should be readable by anglers, agencies, and conservation-minded readers without needing a spreadsheet decoder ring.",
  },
  {
    title: "Stewardship",
    description:
      "Healthy trout access can reduce pressure on wild salmon and steelhead systems when anglers have clearer visibility into stocked opportunities.",
  },
  {
    title: "Craftsmanship",
    description:
      "Dense public data deserves software with hierarchy, restraint, and atmosphere rather than generic dashboards and bright default cards.",
  },
];

const timeline = [
  {
    year: "2020",
    label: "Idea",
    detail: "Manual tracking of WDFW reports begins as a practical way to find stocked opportunities.",
  },
  {
    year: "2022",
    label: "Prototype",
    detail: "The first internal dashboard proves the data can feel spatial, curated, and much easier to interpret.",
  },
  {
    year: "2026",
    label: "Now",
    detail: "Troutlytics evolves into a cinematic telemetry layer for maps, hatcheries, and statewide stocking trends.",
  },
];

const AboutPage = () => {
  return (
    <div className="page-shell space-y-6">
      <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="glass-panel-strong rounded-[2rem] p-6 sm:p-8">
          <div className="telemetry-kicker">Behind Troutlytics</div>
          <div className="mt-6 max-w-4xl space-y-4">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.65em] text-cyan-100/55">
              Mission Log
            </p>
            <h1 className="page-title text-balance">
              A design-forward read on Washington fisheries data.
            </h1>
            <p className="page-copy max-w-3xl">
              Troutlytics started as a personal tool for making WDFW trout plant
              data easier to interpret. It grew into a broader thesis: public
              natural-resource data becomes more useful when it is readable,
              spatial, and emotionally legible.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/dashboard" className="primary-button">
              Explore the dashboard
            </Link>
            <Link href="/contact" className="secondary-button">
              Open a conversation
            </Link>
          </div>
        </div>

        <aside className="glass-panel rounded-[2rem] p-6 sm:p-7">
          <p className="card-eyebrow">Core Values</p>
          <div className="mt-5 space-y-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-[1.45rem] border border-white/8 bg-white/[0.04] p-5"
              >
                <h2 className="text-xl font-semibold text-white">
                  {value.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-cyan-50/66">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="glass-panel rounded-[1.9rem] p-6 sm:p-7">
          <p className="card-eyebrow">Conservation Lens</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            Stocking as pressure relief.
          </h2>
          <p className="mt-4 text-sm leading-7 text-cyan-50/68">
            Washington’s trout program is more than sport. Highlighting stocked
            waters helps anglers focus effort on managed opportunities, which
            can reduce incidental pressure on more sensitive native systems.
          </p>
        </article>

        <article className="glass-panel rounded-[1.9rem] p-6 sm:p-7">
          <p className="card-eyebrow">Product Lens</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            Interface as interpretation.
          </h2>
          <p className="mt-4 text-sm leading-7 text-cyan-50/68">
            The gradients, typography, map styling, and HUD cues are not there
            to dramatize the data. They are there to organize attention and make
            public records feel easier to read at speed.
          </p>
        </article>
      </section>

      <section className="glass-panel-strong rounded-[2rem] p-6 sm:p-7">
        <p className="card-eyebrow">Timeline</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">
          How the project evolved
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {timeline.map((item) => (
            <div
              key={item.year}
              className="rounded-[1.5rem] border border-white/8 bg-white/[0.04] p-5"
            >
              <p className="card-eyebrow">{item.year}</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                {item.label}
              </h3>
              <p className="mt-3 text-sm leading-7 text-cyan-50/66">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
