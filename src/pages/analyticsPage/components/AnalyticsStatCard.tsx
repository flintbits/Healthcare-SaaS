import type { ReactNode } from "react";
import GlassCard from "../../../shared/ui/Card/GlassCard/GlassCard";

type AnalyticsStatCardProps = {
  title: string;
  subtitle?: string;
  icon: ReactNode;
  value: ReactNode;
};

export default function AnalyticsStatCard({
  title,
  subtitle,
  icon,
  value,
}: AnalyticsStatCardProps) {
  return (
    <GlassCard title={title} subtitle={subtitle} icon={icon}>
      <p className="text-3xl font-semibold text-white">{value}</p>
    </GlassCard>
  );
}
