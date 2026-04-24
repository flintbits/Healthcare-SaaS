import { CalendarDays, Edit3, Plus, Trash2, UserRound } from "lucide-react";
import type { Patient } from "../../../entities/Patient.entity";
import { Button } from "../../../shared/ui/Button/Button";

function getStatusStyles(status?: string) {
  const value = status?.toLowerCase();

  if (value === "critical") {
    return "border-red-400/20 bg-red-400/10 text-red-300";
  }

  if (value === "discharged") {
    return "border-white/10 bg-white/[0.03] text-white/60";
  }

  return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
}

type PatientProfileHeaderProps = {
  selectedPatient: Patient;
  visitsCount: number;
  onEdit: () => void;
  onDelete: () => void;
  onAddVisit: () => void;
  onAddAppointment: () => void;
};

export function PatientProfileHeader({
  selectedPatient,
  visitsCount,
  onEdit,
  onDelete,
  onAddVisit,
  onAddAppointment,
}: PatientProfileHeaderProps) {
  return (
    <section className="rounded-4xl border border-white/8 bg-white/3 p-6 backdrop-blur-2xl">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-sky-400/20 bg-sky-400/10 text-sky-400">
            <UserRound size={24} />
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.30em] text-white/35">
              Patient Profile
            </p>

            <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-white">
              {selectedPatient.name}
            </h1>

            <p className="mt-3 text-sm text-white/55">
              ID: {selectedPatient.id}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex h-10 items-center rounded-full border px-4 text-sm font-medium capitalize ${getStatusStyles(
              selectedPatient.status
            )}`}
          >
            {selectedPatient.status}
          </span>

          <Button onClick={onEdit} variant="outline">
            <Edit3 size={16} className="text-sky-400" />
            <span className="ml-2">Edit Patient</span>
          </Button>

          <Button
            onClick={onDelete}
            variant="ghost"
            className="text-red-300 hover:text-red-200"
          >
            <Trash2 size={16} className="text-red-500" />
            <span className="ml-2 text-red-500">Delete Patient</span>
          </Button>

          <Button onClick={onAddVisit}>
            <Plus size={16} className="text-emerald-300" />
            <span className="ml-2">Add Visit</span>
          </Button>

          <Button onClick={onAddAppointment} variant="outline">
            <CalendarDays size={16} className="text-sky-400" />
            <span className="ml-2">Add Appointment</span>
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/8 bg-white/2 p-4">
          <p className="text-xs text-white/35">Age</p>
          <p className="mt-2 text-2xl font-semibold text-white">{selectedPatient.age}</p>
        </div>

        <div className="rounded-2xl border border-white/8 bg-white/2 p-4">
          <p className="text-xs text-white/35">Assigned Doctor</p>
          <p className="mt-2 text-lg font-medium text-white">{selectedPatient.doctor}</p>
        </div>

        <div className="rounded-2xl border border-white/8 bg-white/2 p-4">
          <p className="text-xs text-white/35">Total Visits</p>
          <p className="mt-2 text-2xl font-semibold text-white">{visitsCount}</p>
        </div>
      </div>
    </section>
  );
}
