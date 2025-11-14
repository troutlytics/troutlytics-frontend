import Link from "next/link";

const values = [
  {
    title: "Transparency",
    description:
      "Turning spreadsheets into stories helps anglers and agencies see the same truth at a glance.",
  },
  {
    title: "Stewardship",
    description:
      "Sustainable stocking protects salmon and steelhead runs while still giving communities access to healthy trout.",
  },
  {
    title: "Craftsmanship",
    description:
      "The interface is designed like a magazine spread—layered typography, cinematic gradients, and meaningful context.",
  },
];

const timeline = [
  {
    year: "2020",
    label: "Idea",
    detail: "Began aggregating WDFW reports manually after every plant.",
  },
  {
    year: "2022",
    label: "Prototype",
    detail: "First public dashboard released to friends and local guides.",
  },
  {
    year: "2024",
    label: "Today",
    detail: "Troutlytics becomes a platform for agencies, anglers, and storytellers.",
  },
];

const AboutPage = () => {
  return (
    <div className="page-gradient py-16">
      <div className="container mx-auto px-4 max-w-6xl space-y-12">
        <header className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr] items-center">
          <div>
            <p className="badge-pill bg-white/60 text-troutlytics-secondary">
              Behind Troutlytics
            </p>
            <h1 className="mt-4 text-4xl font-bold text-slate-900">
              A love letter to Washington fisheries and the data that protects them.
            </h1>
            <p className="mt-4 text-lg text-troutlytics-subtext leading-relaxed">
              Troutlytics started as a side project to help anglers visualize WDFW trout plants.
              Today it blends beautiful software with conservation-minded reporting so we celebrate
              stocked trout while giving native salmon and steelhead a break.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-5 py-3 rounded-full bg-troutlytics-secondary text-white font-semibold shadow-lg hover:-translate-y-0.5 transition"
              >
                Explore dashboard
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-5 py-3 rounded-full border border-troutlytics-secondary text-troutlytics-secondary font-semibold hover:bg-troutlytics-secondary/10 transition"
              >
                Collaborate with us
              </Link>
            </div>
          </div>
          <div className="glass-panel">
            <h2 className="text-xl font-semibold text-slate-900">
              What Troutlytics stands for
            </h2>
            <p className="mt-3 text-sm text-troutlytics-subtext">
              Built by Thomas Basham, a software developer in the greater Seattle area who cares
              deeply about access, design, and thriving ecosystems.
            </p>
            <ul className="mt-6 space-y-4">
              {values.map((value) => (
                <li key={value.title}>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-troutlytics-accent">
                    {value.title}
                  </p>
                  <p className="mt-1 text-troutlytics-subtext">{value.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </header>

        <section className="glass-panel">
          <div className="grid gap-8 md:grid-cols-2">
            <article>
              <h2 className="text-2xl font-bold text-slate-900">Stocking for sustainability</h2>
              <p className="mt-4 text-lg text-troutlytics-subtext leading-relaxed">
                Washington’s trout program is more than sport—it’s a buffer that keeps pressure off
                wild salmon and steelhead runs. By highlighting active hatcheries and recent plants,
                Troutlytics guides anglers toward stocked fisheries so native fish get room to recover.
              </p>
            </article>
            <article>
              <h2 className="text-2xl font-bold text-slate-900">Design meets biology</h2>
              <p className="mt-4 text-lg text-troutlytics-subtext leading-relaxed">
                The interface was crafted for interpretive clarity. Soft gradients, motion, and
                typography reveal data at a glance, while the underlying API stays rigorous enough for
                biologists and hatchery leads to trust.
              </p>
            </article>
          </div>
        </section>

        <section className="glass-panel">
          <p className="badge-pill bg-troutlytics-primary/10 text-troutlytics-primary">
            Our journey
          </p>
          <h2 className="mt-4 text-3xl font-bold text-slate-900">How we got here</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {timeline.map((item) => (
              <div key={item.year} className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm">
                <p className="text-sm font-semibold text-troutlytics-subtext">{item.year}</p>
                <h3 className="text-xl font-bold text-slate-900">{item.label}</h3>
                <p className="mt-2 text-sm text-troutlytics-subtext">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
