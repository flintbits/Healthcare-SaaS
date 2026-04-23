import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Plus
} from "lucide-react";
import { lazy, Suspense, useEffect, useMemo } from "react";
import {
  getAppointmentStatusStats,
  getMonthlyAppointments,
  getMonthlyRevenue,
  getPatientStatusStats
} from "../../services/analytics.service";
import { Button } from "../../shared/ui/Button/Button";
import { useAppointmentStore } from "../../store/appointment.store";
import { usePatientStore } from "../../store/patient.store";
import { useVisitStore } from "../../store/visit.store";

const VisitsChart = lazy(
  () => import("../../features/charts/VisitsChart")
);

function Card({
  title,
  subtitle,
  icon,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-3xl border border-white/8 bg-white/3 p-5 backdrop-blur-2xl ${className}`}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">
            {title}
          </p>

          {subtitle && (
            <p className="mt-2 text-sm text-white/55">
              {subtitle}
            </p>
          )}
        </div>

        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/3 text-white/70">
            {icon}
          </div>
        )}
      </div>

      {children}
    </section>
  );
}

function Stat({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta?: string;
}) {
  return (
    <Card
      title={label}
      icon={<ArrowUpRight size={18} />}
    >
      <div className="flex items-end justify-between gap-3">
        <p className="text-4xl font-semibold tracking-[-0.03em] text-white">
          {value}
        </p>

        {delta && (
          <span className="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
            {delta}
          </span>
        )}
      </div>
    </Card>
  );
}

export default function DashboardPage() {
  const { patients, fetchPatients } = usePatientStore();
  const { visits, fetchVisits } = useVisitStore();
  const { appointments, fetchAppointments } = useAppointmentStore();

  useEffect(() => {
    fetchPatients();
    fetchVisits();
    fetchAppointments();
  }, []);

  const totalPatients = useMemo(() => patients.length, [patients]);
  const activePatients = useMemo(
    () => patients.filter((patient) => patient.status === "active").length,
    [patients]
  );

  const bedUsagePercentage = useMemo(
    () =>
      totalPatients > 0
        ? Math.round((activePatients / totalPatients) * 100)
        : 0,
    [activePatients, totalPatients]
  );

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const previousMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;

  const monthlyVisits = useMemo(
    () =>
      visits.filter(
        (visit) => visit.year === currentYear && visit.month === currentMonth
      ).length,
    [visits, currentMonth, currentYear]
  );

  const previousMonthVisits = useMemo(
    () =>
      visits.filter(
        (visit) =>
          visit.year === previousMonthYear && visit.month === previousMonth
      ).length,
    [visits, previousMonth, previousMonthYear]
  );

  const monthlyRevenue = useMemo(
    () =>
      visits.reduce(
        (total, visit) =>
          visit.year === currentYear && visit.month === currentMonth
            ? total + Number(visit.fee)
            : total,
        0
      ),
    [visits, currentMonth, currentYear]
  );

  const previousMonthRevenue = useMemo(
    () =>
      visits.reduce(
        (total, visit) =>
          visit.year === previousMonthYear && visit.month === previousMonth
            ? total + Number(visit.fee)
            : total,
        0
      ),
    [visits, previousMonth, previousMonthYear]
  );

  const revenueDelta = useMemo(() => {
    if (previousMonthRevenue === 0) {
      return "+0%";
    }

    const diff =
      ((monthlyRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;
    return `${diff >= 0 ? "+" : ""}${Math.round(diff)}%`;
  }, [monthlyRevenue, previousMonthRevenue]);

  const visitDelta = useMemo(() => {
    if (previousMonthVisits === 0) {
      return "+0%";
    }

    const diff =
      ((monthlyVisits - previousMonthVisits) / previousMonthVisits) * 100;
    return `${diff >= 0 ? "+" : ""}${Math.round(diff)}%`;
  }, [monthlyVisits, previousMonthVisits]);

  const patientStats = useMemo(
    () => getPatientStatusStats(patients),
    [patients]
  );

  const monthlyRevenueStats = useMemo(
    () => getMonthlyRevenue(visits),
    [visits]
  );

  const appointmentStats = useMemo(
    () => getAppointmentStatusStats(appointments),
    [appointments]
  );

  const monthlyAppointmentStats = useMemo(
    () => getMonthlyAppointments(appointments),
    [appointments]
  );

  const april2026Visits = useMemo(() => {
    const aprilVisits = visits.filter(
      (visit) => visit.year === 2026 && visit.month === 4
    );

    // Create daily data for April 2026 (1-30 days)
    const dailyVisits: Record<number, number> = {};
    for (let day = 1; day <= 30; day++) {
      dailyVisits[day] = 0;
    }

    // Count visits per day using visitDate if available, otherwise distribute evenly
    aprilVisits.forEach((visit) => {
      let day = 15; // Default to middle of month if no date

      if (visit.visitDate) {
        const date = visit.visitDate?.toDate
          ? visit.visitDate.toDate()
          : new Date(visit.visitDate);
        if (date.getFullYear() === 2026 && date.getMonth() === 3) { // April is month 3 (0-indexed)
          day = date.getDate();
        }
      }

      if (day >= 1 && day <= 30) {
        dailyVisits[day] = (dailyVisits[day] || 0) + 1;
      }
    });

    return {
      labels: Object.keys(dailyVisits).map(day => `${day}`),
      values: Object.values(dailyVisits),
    };
  }, [visits]);

  const latestVisits = useMemo(() => {
    const visitDateToMillis = (visit: any) => {
      if (!visit.visitDate) return 0;
      if (visit.visitDate?.toDate) {
        return visit.visitDate.toDate().getTime();
      }
      return new Date(visit.visitDate).getTime();
    };

    return [...visits]
      .sort(
        (a, b) => visitDateToMillis(b) - visitDateToMillis(a)
      )
      .slice(0, 4);
  }, [visits]);

  const formatVisitDate = (visit: any) => {
    if (!visit.visitDate) return `${visit.month}/${visit.year}`;
    const date = visit.visitDate?.toDate
      ? visit.visitDate.toDate()
      : new Date(visit.visitDate);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* header */}
      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.30em] text-white/35">
            Workspace Overview
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white">
            Operations Dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
            Monitor patients, occupancy, appointments, alerts and overall system health in real time.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button className="px-5">
            <Plus size={16} />
            <span className="ml-2">Add Patient</span>
          </Button>

          <Button variant="ghost" className="px-5">
            Export Summary
          </Button>
        </div>
      </section>

      {/* top stats */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Stat
          label="Patients"
          value={`${totalPatients}`}
          delta={`${activePatients} Active`}
        />

        <Stat
          label="Bed Usage"
          value={`${bedUsagePercentage}%`}
          delta={
            totalPatients > 0
              ? `${Math.round((activePatients / totalPatients) * 100)}%`
              : "+0%"
          }
        />

        <Stat
          label="Monthly Visits"
          value={`${monthlyVisits}`}
          delta={visitDelta}
        />

        <Stat
          label="Appointments"
          value={`${appointments.length}`}
          delta={`${appointmentStats.values[1] || 0} Confirmed`}
        />

        <Stat
          label="Revenue"
          value={`$${monthlyRevenue.toLocaleString()}`}
          delta={revenueDelta}
        />
      </section>

      {/* middle */}
      <section className="grid gap-4 xl:grid-cols-[1.55fr_1fr]">
        {/* chart */}
        <Card
          title="Admissions Flow"
          subtitle="Visits in April 2026"
          icon={<Activity size={18} />}
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
        </Card>

        {/* right stack */}
        <div className="grid gap-4">
          <Card
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
          </Card>
        </div>
      </section>

      {/* bottom */}
      <section className="grid gap-4 xl:grid-cols-3">
        <Card
          title="Upcoming Appointments"
          subtitle="Next scheduled visits"
          icon={<CalendarDays size={18} />}
        >
          <div className="space-y-3">
            {appointments.slice(0, 4).map((appointment) => {
              const date = appointment.appointmentDate
                ? new Date(appointment.appointmentDate)
                : null;

              const formatted =
                date
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
        </Card>

        <Card
          title="Appointment Trends"
          subtitle="Monthly overview"
          icon={<Activity size={18} />}
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
        </Card>

        <Card
          title="Response Time"
          subtitle="Operational efficiency"
          icon={<Clock3 size={18} />}
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
        </Card>
      </section>
    </div>
  );
}
