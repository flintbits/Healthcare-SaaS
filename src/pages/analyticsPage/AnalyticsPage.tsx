import { Activity, DollarSign, FileBarChart2, Users } from "lucide-react";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import {
  getAppointmentStatusStats,
  getMonthlyRevenue,
  getMonthlyVisits,
  getPatientStatusStats,
} from "../../services/analytics.service";
import { showNotification } from "../../services/notification.service";
import { useAppointmentStore } from "../../store/appointment.store";
import { useNotificationStore } from "../../store/notification.store";
import { usePatientStore } from "../../store/patient.store";
import { useVisitStore } from "../../store/visit.store";
import AnalyticsChartCard from "./components/AnalyticsChartCard";
import AnalyticsChartControls from "./components/AnalyticsChartControls";
import AnalyticsHeader from "./components/AnalyticsHeader";
import AnalyticsStatCard from "./components/AnalyticsStatCard";

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
      revenueStats?.values.reduce((sum, item) => sum + item, 0) ?? 0
    );
  }, [revenueStats]);

  const totalVisits = useMemo(() => {
    return (
      visitStats?.values.reduce((sum, item) => sum + item, 0) ?? 0
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
    <div className="space-y-8">
      <AnalyticsHeader
        title="Analytics Dashboard"
        description="Track operational performance, patient activity, visits, and revenue trends across your healthcare network."
        actionLabel="Generate Analytics Report"
        onAction={generateReport}
        actionLoading={loadingReport}
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <AnalyticsStatCard
          title="Patients"
          subtitle="Registered users"
          icon={<Users size={18} className="text-sky-400" />}
          value={patients.length}
        />
        <AnalyticsStatCard
          title="Visits"
          subtitle="Total monthly visits"
          icon={<Activity size={18} className="text-rose-400" />}
          value={totalVisits}
        />
        <AnalyticsStatCard
          title="Appointments"
          subtitle="Scheduled sessions"
          icon={<FileBarChart2 size={18} className="text-amber-400" />}
          value={appointments.length}
        />
        <AnalyticsStatCard
          title="Revenue"
          subtitle="Current cycle"
          icon={<DollarSign size={18} className="text-emerald-400" />}
          value={`$${totalRevenue.toLocaleString()}`}
        />
        <AnalyticsStatCard
          title="Reports"
          subtitle="Auto insights enabled"
          icon={<FileBarChart2 size={18} className="text-violet-400" />}
          value={
            <span className="text-sm text-emerald-300">
              Live Monitoring Active
            </span>
          }
        />
      </section>

      <AnalyticsChartControls
        monthNames={monthNames}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
        onMonthChange={setSelectedMonth}
        onYearChange={setSelectedYear}
      />

      <section className="grid gap-8 xl:grid-cols-2">
        <AnalyticsChartCard
          title="Revenue Growth"
          subtitle="Monthly performance"
          icon={<DollarSign size={18} />}
          noBackground
          className="h-100 border-none bg-transparent"
        >
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center text-sm text-white/40">
                Loading chart...
              </div>
            }
          >
            {revenueStats && <RevenueChart data={revenueStats} />}
          </Suspense>

          <p className="text-sm leading-6 text-white/55">
            See how revenue evolves through the year so you can identify high-performing months and areas to optimize financial growth.
          </p>
        </AnalyticsChartCard>

        <AnalyticsChartCard
          title="Patient Status"
          subtitle="Distribution overview"
          icon={<Users size={18} />}
          noBackground
          className="h-100 border-none bg-transparent"
        >
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center text-sm text-white/40">
                Loading chart...
              </div>
            }
          >
            {patientStats && <PatientsChart data={patientStats} />}
          </Suspense>

          <p className="text-sm leading-6 text-white/55">
            Understand the balance between active, inactive, and new patients to improve engagement and retention.
          </p>
        </AnalyticsChartCard>

        <AnalyticsChartCard
          title="Monthly Visits"
          subtitle="Engagement trend"
          icon={<Activity size={18} />}
          noBackground
          className="h-105 border-none bg-transparent xl:col-span-2"
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

          <p className="text-sm leading-6 text-white/55">
            Track clinic or service usage over time so you can spot appointment volume spikes and staffing needs.
          </p>
        </AnalyticsChartCard>

        <AnalyticsChartCard
          title="Appointment Status"
          subtitle="Scheduled sessions overview"
          icon={<FileBarChart2 size={18} />}
          noBackground
          className="h-105 border-none bg-transparent xl:col-span-2"
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

          <p className="text-sm leading-6 text-white/55">
            View how appointments are distributed by status to monitor booking efficiency and cancellation trends.
          </p>
        </AnalyticsChartCard>
      </section>
    </div>
  );
}
