import { lazy, Suspense, useEffect, useState } from "react";
import { getMonthlyRevenue, getMonthlyVisits, getPatientStatusStats } from "../../services/analytics.service";
import { showNotification } from "../../services/notification.service";
import { Button } from "../../shared/ui/Button/Button";
import { useNotificationStore } from "../../store/notification.store";
import { usePatientStore } from "../../store/patient.store";
import { useVisitStore } from "../../store/visit.store";
const PatientsChart = lazy(() => import("../../features/charts/PatientsChart"));
const RevenueChart = lazy(() => import("../../features/charts/RevenueChart"));
const VisitsChart = lazy(() => import("../../features/charts/VisitsChart"));


type ChartStats = {
  labels: string[];
  values: number[];
};


export default function AnalyticsPage() {
  const { patients, fetchPatients } = usePatientStore();
  const { visits, fetchVisits } = useVisitStore();
  const add = useNotificationStore((s) => s.add);

  const [patientStats, setPatientStats] = useState<ChartStats | null>(null);
  const [visitStats, setVisitStats] = useState<ChartStats | null>(null);
  const [revenueStats, setRevenueStats] = useState<ChartStats | null>(null);

  useEffect(() => {
    fetchPatients();
    fetchVisits();
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

  const generateReport = () => {
    setTimeout(() => {
      showNotification("ReportReady", "Monthly analytics generated");

      add({
        id: String(Math.random()),
        title: "Report Ready",
        read: false,
      })
    }, 3000)
  }

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">
        Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        <div className="p-3 rounded h-64">
          <Suspense fallback={<div>Loading chart...</div>}>
            {patientStats && (
              <PatientsChart data={patientStats} />
            )}
          </Suspense>
        </div>

        <div className="p-3 rounded h-64">
          <Suspense fallback={<div>Loading chart...</div>}>
            {visitStats && (
              <VisitsChart key={visitStats.labels.join("-")} data={visitStats} />
            )}
          </Suspense>
        </div>

        <div className=" p-3 rounded h-64">
          <Suspense fallback={<div>Loading chart...</div>}>
            {revenueStats && (
              <RevenueChart data={revenueStats} />
            )}
          </Suspense>
        </div>

      </div>

      <Button onClick={generateReport}>Generate Analytics Report</Button>

    </div>
  );
}
