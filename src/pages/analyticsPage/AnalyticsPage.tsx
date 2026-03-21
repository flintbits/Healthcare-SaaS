import { useEffect, useState } from "react";
import PatientsChart from "../../features/charts/PatientsChart";
import RevenueChart from "../../features/charts/RevenueChart";
import VisitsChart from "../../features/charts/VisitsChart";
import { getMonthlyRevenue, getMonthlyVisits, getPatientStatusStats } from "../../services/analytics.service";
import { usePatientStore } from "../../store/patient.store";
import { useVisitStore } from "../../store/visit.store";


type ChartStats = {
  labels: string[];
  values: number[];
};


export default function AnalyticsPage() {
  const { patients, fetchPatients } = usePatientStore();
  const { visits, fetchVisits } = useVisitStore();

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

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">
        Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        <div className="p-3 rounded h-64">
          {patientStats && (
            <PatientsChart data={patientStats} />
          )}
        </div>

        <div className="p-3 rounded h-64">
          {visitStats && (
            <VisitsChart key={visitStats.labels.join("-")} data={visitStats} />
          )}
        </div>

        <div className=" p-3 rounded h-64">
          {revenueStats && (
            <RevenueChart data={revenueStats} />
          )}
        </div>

      </div>

    </div>
  );
}
