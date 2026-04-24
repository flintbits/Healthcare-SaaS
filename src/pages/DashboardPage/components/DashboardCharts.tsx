import { Activity, CalendarDays } from "lucide-react";
import { Suspense, lazy } from "react";
import { DashboardCard } from "./DashboardCard";

const VisitsChart = lazy(
  () => import("../../../features/charts/VisitsChart")
);

type StatSeries = {
  labels: string[];
  values: number[];
};

export function DashboardCharts({
  april2026Visits,
  appointmentStats,
}: {
  april2026Visits: StatSeries;
  appointmentStats: StatSeries;
}) {
  return (
    <section className="grid gap-4 xl:grid-cols-[1.55fr_1fr]">
      <DashboardCard
        title="Admissions Flow"
        subtitle="Visits in April 2026"
        icon={<Activity size={18} className="text-sky-400" />}
        className="min-h-90"
      >
        <div className="relative mt-4 h-65 overflow-hidden rounded-3xl border border-white/8 bg-white/2 p-4">
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center text-sm text-white/40">
                Loading chart...
              </div>
            }
          >
            <VisitsChart data={april2026Visits} />
          </Suspense>
        </div>
      </DashboardCard>

      <div className="grid gap-4">
        <DashboardCard
          title="Appointment Status"
          subtitle="Current distribution"
          icon={<CalendarDays size={18} />}
        >
          <div className="space-y-3">
            {appointmentStats.labels.map((label, index) => (
              <div
                key={label}
                className="rounded-2xl border border-white/8 bg-white/3 px-4 py-3 text-sm text-white/70"
              >
                <div className="flex items-center justify-between">
                  <span className="capitalize">{label}</span>
                  <span>{appointmentStats.values[index]}</span>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </section>
  );
}
