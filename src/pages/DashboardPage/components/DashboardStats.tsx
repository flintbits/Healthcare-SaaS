import { DashboardStatCard } from "./DashboardStatCard";

export function DashboardStats({
  stats,
}: {
  stats: Array<{ label: string; value: string; delta?: string }>;
}) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => (
        <DashboardStatCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          delta={stat.delta}
        />
      ))}
    </section>
  );
}
