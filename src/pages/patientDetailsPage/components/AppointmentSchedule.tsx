import { Activity, CalendarDays, Clock3, Stethoscope } from "lucide-react";
import type { Appointment } from "../../../entities/Appointment.entity";

function getAppointmentStatusClass(status: string) {
  if (status === "confirmed") {
    return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
  }

  if (status === "scheduled") {
    return "border-blue-400/20 bg-blue-400/10 text-blue-300";
  }

  return "border-gray-400/20 bg-gray-400/10 text-gray-300";
}

export function AppointmentSchedule({ appointments }: { appointments: Appointment[] }) {
  const formatAppointmentDate = (appointment: Appointment) => {
    if (!appointment.appointmentDate) return "Unknown";

    const date = new Date(appointment.appointmentDate);
    return date.toLocaleDateString();
  };

  return (
    <section className="rounded-4xl border border-white/8 bg-white/3 p-6 backdrop-blur-2xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.30em] text-white/35">Appointments</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Scheduled Appointments</h2>
        </div>
        <div className="text-sm text-white/45">{appointments.length} Records</div>
      </div>

      {appointments.length === 0 ? (
        <div className="rounded-3xl border border-white/8 bg-white/2 p-10 text-center text-sm text-white/40">
          No appointments scheduled yet.
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="rounded-3xl border border-white/8 bg-white/2 p-5 transition hover:bg-white/3"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-white">
                    <Stethoscope size={16} className="text-emerald-300" />
                    <span className="font-medium">{appointment.doctor}</span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-white/45">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays size={14} />
                      {formatAppointmentDate(appointment)}
                    </span>

                    <span className="inline-flex items-center gap-2">
                      <Clock3 size={14} className="text-amber-300" />
                      {appointment.appointmentTime}
                    </span>
                  </div>

                  <div className="mt-2 text-sm text-white/60">Reason: {appointment.reason}</div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`inline-flex h-8 items-center rounded-full border px-3 text-xs font-medium capitalize ${getAppointmentStatusClass(
                    appointment.status
                  )}`}>
                    {appointment.status}
                  </span>

                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/3 text-white/65">
                    <Activity size={16} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
