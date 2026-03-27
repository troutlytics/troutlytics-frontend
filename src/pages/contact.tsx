import React from "react";

const ContactPage: React.FC = () => {
  const contactChannels = [
    {
      label: "Email",
      value: "bashamtg@gmail.com",
      href: "mailto:bashamtg@gmail.com",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/thomas-basham",
      href: "https://linkedin.com/in/thomas-basham",
    },
    {
      label: "GitHub",
      value: "github.com/thomas-basham",
      href: "https://github.com/thomas-basham",
    },
  ];

  const specialties = [
    "Product dashboards and telemetry surfaces",
    "Data visualizations and map-heavy interfaces",
    "API design, cloud integrations, and backend systems",
    "Design collaboration with a strong implementation bias",
  ];

  return (
    <div className="page-shell space-y-6">
      <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="glass-panel-strong rounded-[2rem] p-6 sm:p-8">
          <div className="telemetry-kicker">Open Channel</div>
          <div className="mt-6 max-w-4xl space-y-4">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.65em] text-cyan-100/55">
              Contact Thomas Basham
            </p>
            <h1 className="page-title text-balance">
              If you need thoughtful data-rich software, reach out directly.
            </h1>
            <p className="page-copy max-w-3xl">
              I build full-stack products, visual dashboards, and polished user
              interfaces with the same attention to system design and final
              detail. If there’s a project, role, or collaboration in motion,
              use the channels below.
            </p>
          </div>
        </div>

        <aside className="glass-panel rounded-[2rem] p-6 sm:p-7">
          <p className="card-eyebrow">Focus Areas</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            Work I’m best suited for
          </h2>
          <ul className="mt-6 space-y-3">
            {specialties.map((item) => (
              <li
                key={item}
                className="rounded-[1.35rem] border border-white/8 bg-white/[0.04] px-4 py-4 text-sm leading-7 text-cyan-50/68"
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="glass-panel-strong rounded-[2rem] p-6 sm:p-7">
        <p className="card-eyebrow">Channels</p>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {contactChannels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              className="rounded-[1.6rem] border border-white/8 bg-white/[0.04] p-5 transition hover:bg-white/[0.06]"
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <p className="card-eyebrow">{channel.label}</p>
              <p className="mt-3 text-xl font-semibold text-white break-all">
                {channel.value}
              </p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
