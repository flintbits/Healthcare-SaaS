import { useNavigate } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Stethoscope,
  User,
} from "lucide-react";
import type { Patient } from "../../../entities/Patient.entity";

interface PatientCardProps {
  patient: Patient;
}

function getStatusStyles(status?: string) {
  const value = status?.toLowerCase();

  if (value === "critical") {
    return {
      pill: "border-red-400/20 bg-red-400/10 text-red-300",
      dot: "bg-red-400",
      icon: <AlertTriangle size={11} />,
    };
  }

  if (value === "discharged") {
    return {
      pill: "border-white/10 bg-white/[0.03] text-white/55",
      dot: "bg-white/35",
      icon: <Activity size={11} />,
    };
  }

  return {
    pill: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    dot: "bg-emerald-400",
    icon: <Activity size={11} />,
  };
}

export const PatientCard = ({
  patient,
}: PatientCardProps) => {
  const navigate = useNavigate();

  const handlePatientView = () => {
    navigate({
      to: "/patients/$patientId",
      replace: true,
      params: {
        patientId:
          patient.id as string,
      },
    });
  };

  const status = getStatusStyles(
    patient.status
  );

  return (
    <button
      onClick={handlePatientView}
      className="group w-full overflow-hidden rounded-[28px] border border-white/8 bg-white/3 p-5 text-left backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-white/14 hover:bg-white/5"
    >
      {/* top */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/3 text-white/75">
            <User size={18} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-[15px] font-medium text-white">
              {patient.name}
            </p>

            <p className="mt-1 truncate text-xs text-white/32">
              ID: {patient.id}
            </p>
          </div>
        </div>

        <ArrowUpRight
          size={16}
          className="translate-y-1 text-white/30 transition group-hover:translate-y-0 group-hover:text-white/70"
        />
      </div>

      {/* status */}
      <div className="mt-5">
        <span
          className={[
            "inline-flex h-8 items-center gap-2 rounded-full border px-3 text-xs font-medium capitalize",
            status.pill,
          ].join(" ")}
        >
          <span
            className={[
              "h-2 w-2 rounded-full",
              status.dot,
            ].join(" ")}
          />

          {status.icon}

          {patient.status}
        </span>
      </div>

      {/* body */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-3 rounded-2xl border border-white/6 bg-white/2 px-4 py-3">
          <Activity
            size={15}
            className="text-white/45"
          />

          <span className="text-sm text-white/55">
            Age
          </span>

          <span className="ml-auto text-sm text-white">
            {patient.age}
          </span>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-white/6 bg-white/2 px-4 py-3">
          <Stethoscope
            size={15}
            className="text-white/45"
          />

          <span className="text-sm text-white/55">
            Doctor
          </span>

          <span className="ml-auto truncate pl-3 text-sm text-white">
            {patient.doctor}
          </span>
        </div>
      </div>
    </button>
  );
};
