import { useEffect, useMemo } from "react";
import {
  getAppointmentStatusStats,
  getMonthlyAppointments
} from "../../services/analytics.service";
import { useAppointmentStore } from "../../store/appointment.store";
import { usePatientStore } from "../../store/patient.store";
import { useVisitStore } from "../../store/visit.store";
import { DashboardCharts } from "./components/DashboardCharts";
import { DashboardHeader } from "./components/DashboardHeader";
import { DashboardStats } from "./components/DashboardStats";
import { DashboardWidgets } from "./components/DashboardWidgets";

type StatSeries = {
  labels: string[];
  values: number[];
};

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

    const dailyVisits: Record<number, number> = {};
    for (let day = 1; day <= 30; day++) {
      dailyVisits[day] = 0;
    }

    aprilVisits.forEach((visit) => {
      let day = 15;

      if (visit.visitDate) {
        const date = visit.visitDate?.toDate
          ? visit.visitDate.toDate()
          : new Date(visit.visitDate);

        if (date.getFullYear() === 2026 && date.getMonth() === 3) {
          day = date.getDate();
        }
      }

      if (day >= 1 && day <= 30) {
        dailyVisits[day] = (dailyVisits[day] || 0) + 1;
      }
    });

    return {
      labels: Object.keys(dailyVisits).map((day) => `${day}`),
      values: Object.values(dailyVisits),
    };
  }, [visits]);

  const stats = useMemo(
    () => [
      {
        label: "Patients",
        value: `${totalPatients}`,
        delta: `${activePatients} Active`,
      },
      {
        label: "Bed Usage",
        value: `${bedUsagePercentage}%`,
        delta:
          totalPatients > 0
            ? `${Math.round((activePatients / totalPatients) * 100)}%`
            : "+0%",
      },
      {
        label: "Monthly Visits",
        value: `${monthlyVisits}`,
        delta: visitDelta,
      },
      {
        label: "Appointments",
        value: `${appointments.length}`,
        delta: `${appointmentStats.values[1] || 0} Confirmed`,
      },
      {
        label: "Revenue",
        value: `$${monthlyRevenue.toLocaleString()}`,
        delta: revenueDelta,
      },
    ],
    [
      totalPatients,
      activePatients,
      bedUsagePercentage,
      monthlyVisits,
      visitDelta,
      appointments.length,
      appointmentStats.values,
      monthlyRevenue,
      revenueDelta,
    ]
  );

  return (
    <div className="space-y-6">
      <DashboardHeader />
      <DashboardStats stats={stats} />
      <DashboardCharts
        april2026Visits={april2026Visits}
        appointmentStats={appointmentStats}
      />
      <DashboardWidgets
        appointments={appointments}
        monthlyAppointmentStats={monthlyAppointmentStats}
      />
    </div>
  );
}
