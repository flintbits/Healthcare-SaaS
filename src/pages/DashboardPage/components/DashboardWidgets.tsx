import { Activity, CalendarDays, Clock3 } from "lucide-react";
import type { Appointment } from "../../../entities/Appointment.entity";
import { DashboardCard } from "./DashboardCard";

type StatSeries = {
  labels: string[];
  values: number[];
};

export function DashboardWidgets({
  appointments,
  monthlyAppointmentStats,
}: {
  appointments: Appointment[];
  monthlyAppointmentStats: StatSeries;
}) {
  return (
    <section className="grid gap-4 xl:grid-cols-3">
      <DashboardCard
        title="Upcoming Appointments"
        subtitle="Next scheduled visits"
        icon={<CalendarDays size={18} className="text-sky-400" />}
      >
        <div className="space-y-3">
          {appointments.slice(0, 4).map((appointment) => {
            const date = appointment.appointmentDate
              ? new Date(appointment.appointmentDate)
              : null;

            const formatted = date
              ? date.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })
              : "Unknown";

            return (
              <div
                key={appointment.id}
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/3 px-4 py-3"
              >
                <span className="text-sm text-white">{appointment.patientName}</span>
                <span className="text-xs text-white/45">
                  {formatted} {appointment.appointmentTime}
                </span>
              </div>
            );
          })}

          {appointments.length === 0 && (
            <p className="text-sm text-white/60">No appointments scheduled yet.</p>
          )}
        </div>
      </DashboardCard>

      <DashboardCard
        title="Appointment Trends"
        subtitle="Monthly overview"
        icon={<Activity size={18} className="text-emerald-400" />}
      >
        <div className="space-y-3">
          {monthlyAppointmentStats.labels.slice(-3).map((label, index) => {
            const values = monthlyAppointmentStats.values.slice(-3);
            return (
              <div
                key={label}
                className="rounded-2xl border border-white/8 bg-white/3 px-4 py-3 text-sm text-white/70"
              >
                <div className="flex items-center justify-between">
                  <span>{label}</span>
                  <span>{values[index]} appointments</span>
                </div>
              </div>
            );
          })}

          {monthlyAppointmentStats.labels.length === 0 && (
            <p className="text-sm text-white/60">No appointment data available.</p>
          )}
        </div>
      </DashboardCard>

      <DashboardCard
        title="Response Time"
        subtitle="Operational efficiency"
        icon={<Clock3 size={18} className="text-violet-400" />}
      >
        <div className="space-y-4">
          {[
            ["Emergency", "4 min"],
            ["Check-in", "7 min"],
            ["Discharge", "11 min"],
          ].map(([label, time]) => (
            <div key={label}>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-white/60">{label}</span>
                <span className="text-white">{time}</span>
              </div>

              <div className="h-2 rounded-full bg-white/5">
                <div
                  className="h-2 rounded-full bg-white/80"
                  style={{ width: "72%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>
    </section>
  );
}
