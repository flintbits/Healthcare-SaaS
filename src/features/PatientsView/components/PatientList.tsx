import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  FileSymlink,
  UserRound,
} from "lucide-react";
import type { Patient } from "../../../entities/Patient.entity";

function getStatusStyles(status?: string) {
  const value = status?.toLowerCase();

  if (value === "critical") {
    return {
      dot: "bg-red-400",
      pill: "border-red-400/20 bg-red-400/10 text-red-300",
      icon: <AlertTriangle size={11} />,
    };
  }

  if (value === "discharged") {
    return {
      dot: "bg-white/35",
      pill: "border-white/10 bg-white/[0.03] text-white/60",
      icon: <Activity size={11} />,
    };
  }

  return {
    dot: "bg-emerald-400",
    pill: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    icon: <Activity size={11} />,
  };
}

export const PatientsList: React.FC<{
  patients: Patient[];
}> = ({ patients }) => {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/8 bg-white/2 backdrop-blur-2xl">
      <div className="overflow-x-auto">
        <table className="w-full min-w-270 table-fixed text-sm text-white">
          {/* HEADER */}
          <thead className="border-b border-white/8 bg-white/3">
            <tr className="text-left">
              <th className="w-17.5 px-6 py-5 text-[10px] font-medium uppercase tracking-[0.32em] text-white/28">
                #
              </th>

              <th className="w-105 px-6 py-5 text-[10px] font-medium uppercase tracking-[0.32em] text-white/28">
                Patient
              </th>

              <th className="w-30 px-6 py-5 text-[10px] font-medium uppercase tracking-[0.32em] text-white/28">
                Age
              </th>

              <th className="w-55 px-6 py-5 text-[10px] font-medium uppercase tracking-[0.32em] text-white/28">
                Status
              </th>

              <th className="w-60 px-6 py-5 text-[10px] font-medium uppercase tracking-[0.32em] text-white/28">
                Doctor
              </th>

              <th className="w-30 px-6 py-5 text-center text-[10px] font-medium uppercase tracking-[0.32em] text-white/28">
                Actions
              </th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {patients.map((p, i) => {
              const status = getStatusStyles(
                p.status
              );

              return (
                <tr
                  key={p.id}
                  className="border-b border-white/6 align-middle transition hover:bg-white/2.5"
                >
                  {/* index */}
                  <td className="px-6 py-4 text-sm text-white/45">
                    {String(i + 1).padStart(
                      2,
                      "0"
                    )}
                  </td>

                  {/* patient */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/3 text-white/70">
                        <UserRound size={16} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-[15px] font-medium text-white">
                          {p.name}
                        </p>

                        <p className="mt-1 truncate text-xs text-white/32">
                          ID: {p.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* age */}
                  <td className="px-6 py-4 text-[15px] text-white/72">
                    {p.age}
                  </td>

                  {/* status */}
                  <td className="px-6 py-4">
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

                      {p.status}
                    </span>
                  </td>

                  {/* doctor */}
                  <td className="px-6 py-4 text-[15px] text-white/72">
                    {p.doctor}
                  </td>

                  {/* action */}
                  <td className="px-6 py-4 text-center">
                    <Link
                      to="/patients/$patientId"
                      params={{
                        patientId:
                          p.id as string,
                      }}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/3 text-white/60 transition hover:bg-white hover:text-black"
                    >
                      <FileSymlink size={16} />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
