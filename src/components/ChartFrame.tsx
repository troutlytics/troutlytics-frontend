import React from "react";

interface ChartFrameProps {
  eyebrow: string;
  title: string;
  description?: string;
  footer?: React.ReactNode;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
}

export default function ChartFrame({
  eyebrow,
  title,
  description,
  footer,
  headerRight,
  children,
}: ChartFrameProps) {
  return (
    <section className="glass-panel-strong rounded-[1.9rem] p-5 sm:p-7">
      <div className="flex flex-col gap-5 border-b border-white/6 pb-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <p className="card-eyebrow">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">{title}</h2>
          {description ? (
            <p className="mt-3 max-w-3xl text-sm leading-7 text-cyan-50/68">
              {description}
            </p>
          ) : null}
        </div>
        {headerRight ? <div className="shrink-0">{headerRight}</div> : null}
      </div>

      <div className="chart-stage">{children}</div>

      {footer ? (
        <div className="mt-5 border-t border-white/6 pt-4 text-sm text-cyan-50/56">
          {footer}
        </div>
      ) : null}
    </section>
  );
}
