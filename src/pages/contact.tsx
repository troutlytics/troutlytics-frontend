import React from "react";
import Link from "next/link";

const ContactPage: React.FC = () => {
  const contactChannels = [
    { label: "Email", value: "bashamtg@gmail.com", href: "mailto:bashamtg@gmail.com" },
    { label: "LinkedIn", value: "linkedin.com/in/bashamtg", href: "https://www.linkedin.com/in/bashamtg" },
    { label: "GitHub", value: "github.com/bashamtg", href: "https://github.com/bashamtg" },
  ];

  const specialties = [
    "Full-stack web applications",
    "Data visualizations & dashboards",
    "API design & cloud deployments",
    "Creative UX/UI collaboration",
  ];

  return (
    <div className="min-h-screen py-12 page-gradient">
      <div className="container max-w-5xl px-4 mx-auto">
        <div className="grid gap-10 lg:grid-cols-[1.3fr,1fr] items-start">
          <section className="p-8 bg-white border shadow-xl rounded-3xl border-slate-100">
            <p className="text-sm font-semibold tracking-[0.4em] uppercase text-troutlytics-accent">
              Let&apos;s build something
            </p>
            <h1 className="mt-3 text-4xl font-bold text-slate-900">
              Contact Thomas Basham
            </h1>
            <p className="mt-4 text-lg text-troutlytics-subtext">
              Software engineer in the Greater Seattle Area. I craft thoughtful interfaces,
              data-rich products, and backend services that power them. If you have a project,
              collaboration, or role in mind, let&apos;s talk.
            </p>
            <div className="mt-8 space-y-6">
              {contactChannels.map((channel) => (
                <div key={channel.label} className="flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-troutlytics-subtext">
                    {channel.label}
                  </span>
                  <Link
                    href={channel.href}
                    className="mt-1 text-xl font-semibold break-all text-troutlytics-primary hover:underline"
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {channel.value}
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="p-8 gradient-panel">
            <p className="text-sm font-semibold tracking-[0.4em] uppercase text-white/70">
              Areas of focus
            </p>
            <h2 className="mt-3 text-3xl font-bold">What I can tackle</h2>
            <p className="mt-4 text-white/80">
              From dashboards to integrations, I help teams ship polished experiences quickly.
            </p>
            <ul className="mt-6 space-y-4">
              {specialties.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-xl">✦</span>
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                href="mailto:bashamtg@gmail.com"
                className="inline-flex items-center px-6 py-3 font-semibold text-troutlytics-text bg-white rounded-full shadow-lg hover:-translate-y-0.5 transition transform"
              >
                Start the conversation
                <span className="ml-2 text-xl">→</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
