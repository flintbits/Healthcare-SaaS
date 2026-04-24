import { Bed, CalendarDays, CheckCircle2, DollarSign, Users } from "lucide-react";
import { DashboardCard } from "./DashboardCard";

const getStatIcon = (label: string) => {
  switch (label) {
    case "Patients":
      return <Users size={18} className="text-sky-400" />;
    case "Bed Usage":
      return <Bed size={18} className="text-indigo-400" />;
    case "Monthly Visits":
      return <CalendarDays size={18} className="text-cyan-400" />;
    case "Appointments":
      return <CheckCircle2 size={18} className="text-emerald-400" />;
    case "Revenue":
      return <DollarSign size={18} className="text-amber-400" />;
    default:
      return <Users size={18} className="text-sky-400" />;
  }
};

export function DashboardStatCard({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta?: string;
}) {
  return (
    <DashboardCard
      title={label}
      icon={getStatIcon(label)}
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
    </DashboardCard>
  );
}
