import React from "react";

interface StatePanelProps {
  eyebrow?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
  variant?: "default" | "error";
  compact?: boolean;
}

export default function StatePanel({
  eyebrow,
  title,
  description,
  action,
  variant = "default",
  compact = false,
}: StatePanelProps) {
  return (
    <div
      data-variant={variant}
      className={`state-panel ${compact ? "rounded-[1.5rem] p-5" : ""}`}
    >
      {eyebrow ? <p className="card-eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-3 text-2xl font-semibold text-white">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-cyan-50/70">
        {description}
      </p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
