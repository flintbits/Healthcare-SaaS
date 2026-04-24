import type { ReactNode } from "react";
import { Button } from "../../../shared/ui/Button/Button";

type AnalyticsHeaderProps = {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  actionLoading: boolean;
  helpText?: string;
  icon?: ReactNode;
};

export default function AnalyticsHeader({
  title,
  description,
  actionLabel,
  onAction,
  actionLoading,
  helpText,
}: AnalyticsHeaderProps) {
  return (
    <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-[10px] uppercase tracking-[0.30em] text-white/35">
          Insights Center
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white">
          {title}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
          {description}
        </p>

        {helpText ? (
          <p className="mt-2 text-sm text-white/40">{helpText}</p>
        ) : null}
      </div>

      <Button onClick={onAction} disabled={actionLoading} className="px-6">
        {actionLoading ? "Generating Report..." : actionLabel}
      </Button>
    </section>
  );
}
