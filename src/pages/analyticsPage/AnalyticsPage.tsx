import {
  Activity,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  FileBarChart2,
  Users,
} from "lucide-react";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import {
  getAppointmentStatusStats,
  getMonthlyRevenue,
  getMonthlyVisits,
  getPatientStatusStats
} from "../../services/analytics.service";
import { showNotification } from "../../services/notification.service";
import { Button } from "../../shared/ui/Button/Button";
import GlassCard from "../../shared/ui/Card/GlassCard/GlassCard";
import { useAppointmentStore } from "../../store/appointment.store";
import { useNotificationStore } from "../../store/notification.store";
import { usePatientStore } from "../../store/patient.store";
import { useVisitStore } from "../../store/visit.store";

const AppointmentsChart = lazy(
  () => import("../../features/charts/AppointmentsChart")
);
const PatientsChart = lazy(
  () => import("../../features/charts/PatientsChart")
);
const RevenueChart = lazy(
  () => import("../../features/charts/RevenueChart")
);
const VisitsChart = lazy(
  () => import("../../features/charts/VisitsChart")
);

type ChartStats = {
  labels: string[];
  values: number[];
};

export default function AnalyticsPage() {
  const { patients, fetchPatients } = usePatientStore();
  const { visits, fetchVisits } = useVisitStore();
  const { appointments, fetchAppointments } = useAppointmentStore();
  const add = useNotificationStore((s) => s.add);

  const [patientStats, setPatientStats] =
    useState<ChartStats | null>(null);

  const [visitStats, setVisitStats] =
    useState<ChartStats | null>(null);

  const [revenueStats, setRevenueStats] =
    useState<ChartStats | null>(null);

  const [appointmentStats, setAppointmentStats] =
    useState<ChartStats | null>(null);

  const [loadingReport, setLoadingReport] =
    useState(false);

  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().getMonth() + 1
  );

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    fetchPatients();
    fetchVisits();
    fetchAppointments();
  }, []);

  useEffect(() => {
    if (!patients.length) return;
    setPatientStats(getPatientStatusStats(patients));
  }, [patients]);

  useEffect(() => {
    if (!visits.length) return;

    setVisitStats(getMonthlyVisits(visits));
    setRevenueStats(getMonthlyRevenue(visits));
  }, [visits]);

  useEffect(() => {
    if (!appointments.length) return;
    setAppointmentStats(getAppointmentStatusStats(appointments));
  }, [appointments]);

  const totalRevenue = useMemo(() => {
    return (
      revenueStats?.values.reduce(
        (sum, item) => sum + item,
        0
      ) ?? 0
    );
  }, [revenueStats]);

  const totalVisits = useMemo(() => {
    return (
      visitStats?.values.reduce(
        (sum, item) => sum + item,
        0
      ) ?? 0
    );
  }, [visitStats]);

  const handlePreviousMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const generateReport = () => {
    setLoadingReport(true);

    setTimeout(() => {
      setLoadingReport(false);

      showNotification(
        "Report Ready",
        "Monthly analytics generated successfully."
      );

      add({
        id: String(Math.random()),
        title: "Analytics Report Ready",
        read: false,
      });
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* header */}
      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.30em] text-white/35">
            Insights Center
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white">
            Analytics Dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
            Track operational performance, patient activity,
            visits, and revenue trends across your healthcare
            network.
          </p>
        </div>

        <Button
          onClick={generateReport}
          disabled={loadingReport}
          className="px-6"
        >
          {loadingReport
            ? "Generating Report..."
            : "Generate Analytics Report"}
        </Button>
      </section>

      {/* stats */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <GlassCard
          title="Patients"
          subtitle="Registered users"
          icon={<Users size={18} />}
        >
          <p className="text-3xl font-semibold text-white">
            {patients.length}
          </p>
        </GlassCard>

        <GlassCard
          title="Visits"
          subtitle="Total monthly visits"
          icon={<Activity size={18} />}
        >
          <p className="text-3xl font-semibold text-white">
            {totalVisits}
          </p>
        </GlassCard>

        <GlassCard
          title="Appointments"
          subtitle="Scheduled sessions"
          icon={<FileBarChart2 size={18} />}
        >
          <p className="text-3xl font-semibold text-white">
            {appointments.length}
          </p>
        </GlassCard>

        <GlassCard
          title="Revenue"
          subtitle="Current cycle"
          icon={<DollarSign size={18} />}
        >
          <p className="text-3xl font-semibold text-white">
            ${totalRevenue.toLocaleString()}
          </p>
        </GlassCard>

        <GlassCard
          title="Reports"
          subtitle="Auto insights enabled"
          icon={<FileBarChart2 size={18} />}
        >
          <p className="text-sm text-emerald-300">
            Live Monitoring Active
          </p>
        </GlassCard>
      </section>

      {/* chart controls */}
      <section className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={handlePreviousMonth}
            className="rounded-lg p-2 hover:bg-white/10 transition-colors"
            title="Previous month"
          >
            <ChevronLeft size={20} className="text-white/60" />
          </button>

          <div className="flex items-center gap-3">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white text-sm hover:bg-white/10 transition-colors cursor-pointer"
            >
              {monthNames.map((month, idx) => (
                <option key={month} value={idx + 1} className="bg-slate-900">
                  {month}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white text-sm hover:bg-white/10 transition-colors cursor-pointer"
            >
              {[selectedYear - 2, selectedYear - 1, selectedYear, selectedYear + 1].map(
                (year) => (
                  <option key={year} value={year} className="bg-slate-900">
                    {year}
                  </option>
                )
              )}
            </select>
          </div>

          <button
            onClick={handleNextMonth}
            className="rounded-lg p-2 hover:bg-white/10 transition-colors"
            title="Next month"
          >
            <ChevronRight size={20} className="text-white/60" />
          </button>
        </div>

        <span className="text-sm text-white/40">
          {monthNames[selectedMonth - 1]} {selectedYear}
        </span>
      </section>

      {/* charts */}
      <section className="grid gap-4 xl:grid-cols-2">
        <GlassCard
          title="Revenue Growth"
          subtitle="Monthly performance"
          icon={<DollarSign size={18} />}
          className="h-90"
        >
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center text-sm text-white/40">
                Loading chart...
              </div>
            }
          >
            {revenueStats && (
              <RevenueChart data={revenueStats} />
            )}
          </Suspense>
        </GlassCard>

        <GlassCard
          title="Patient Status"
          subtitle="Distribution overview"
          icon={<Users size={18} />}
          className="h-90"
        >
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center text-sm text-white/40">
                Loading chart...
              </div>
            }
          >
            {patientStats && (
              <PatientsChart data={patientStats} />
            )}
          </Suspense>
        </GlassCard>

        <GlassCard
          title="Monthly Visits"
          subtitle="Engagement trend"
          icon={<Activity size={18} />}
          className="h-90 xl:col-span-2"
        >
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center text-sm text-white/40">
                Loading chart...
              </div>
            }
          >
            {visitStats && (
              <VisitsChart
                key={visitStats.labels.join("-")}
                data={visitStats}
              />
            )}
          </Suspense>
        </GlassCard>

        <GlassCard
          title="Appointment Status"
          subtitle="Scheduled sessions overview"
          icon={<FileBarChart2 size={18} />}
          className="h-90 xl:col-span-2"
        >
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center text-sm text-white/40">
                Loading chart...
              </div>
            }
          >
            {appointmentStats && (
              <AppointmentsChart
                key={appointmentStats.labels.join("-")}
                data={appointmentStats}
              />
            )}
          </Suspense>
        </GlassCard>
      </section>
    </div>
  );
}
