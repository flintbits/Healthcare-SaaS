import type { ReactNode } from "react";
import GlassCard from "../../../shared/ui/Card/GlassCard/GlassCard";

type AnalyticsChartCardProps = {
  title: string;
  subtitle?: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
  noBackground?: boolean;
};

export default function AnalyticsChartCard({
  title,
  subtitle,
  icon,
  children,
  className = "",
  noBackground = false,
}: AnalyticsChartCardProps) {
  return (
    <GlassCard
      title={title}
      subtitle={subtitle}
      icon={icon}
      className={className}
      noBackground={noBackground}
    >
      <div className="space-y-5">{children}</div>
    </GlassCard>
  );
}
