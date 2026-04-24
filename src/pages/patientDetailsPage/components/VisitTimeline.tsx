import { Activity, CalendarDays, Clock3, Stethoscope } from "lucide-react";
import type { Visit } from "../../../entities/Visit.entity";

export function VisitTimeline({ visits }: { visits: Visit[] }) {
  const formatVisitDate = (visit: Visit) => {
    if (!visit.visitDate) return "Unknown";

    const date = visit.visitDate?.toDate ? visit.visitDate.toDate() : new Date(visit.visitDate);
    return date.toLocaleDateString();
  };

  return (
    <section className="rounded-4xl border border-white/8 bg-white/3 p-6 backdrop-blur-2xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.30em] text-white/35">Medical History</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Visit Timeline</h2>
        </div>
        <div className="text-sm text-white/45">{visits.length} Records</div>
      </div>

      {visits.length === 0 ? (
        <div className="rounded-3xl border border-white/8 bg-white/2 p-10 text-center text-sm text-white/40">
          No visits recorded yet.
        </div>
      ) : (
        <div className="space-y-4">
          {visits.map((visit) => (
            <div
              key={visit.id}
              className="rounded-3xl border border-white/8 bg-white/2 p-5 transition hover:bg-white/3"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-white">
                    <Stethoscope size={16} className="text-emerald-300" />
                    <span className="font-medium">{visit.doctor}</span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-white/45">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays size={14} />
                      {formatVisitDate(visit)}
                    </span>

                    <span className="inline-flex items-center gap-2">
                      <Clock3 size={14} className="text-amber-300" />
                      Consultation
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
                    Fee: ${visit.fee}
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
