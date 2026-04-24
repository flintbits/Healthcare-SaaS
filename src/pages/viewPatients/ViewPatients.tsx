import {
  Activity,
  Grid2X2,
  LayoutList,
  Search,
  UserPlus,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PatientsView } from "../../features/PatientsView/components/PatientsView";
import { Button } from "../../shared/ui/Button/Button";
import { usePatientStore } from "../../store/patient.store";

export default function ViewPatients() {
  const [view, setView] = useState("list");
  const [search, setSearch] = useState("");

  const {
    patients,
    fetchPatients,
    loading,
  } = usePatientStore();

  useEffect(() => {
    fetchPatients();
  }, []);

  const filteredPatients = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    if (!query) return patients;

    return patients.filter((p: any) =>
      [
        p.name,
        p.doctor,
        p.status,
        p.department,
      ]
        .filter(Boolean)
        .some((item) =>
          String(item)
            .toLowerCase()
            .includes(query)
        )
    );
  }, [patients, search]);

  const activePatients =
    patients.filter(
      (p: any) => p.status === "active"
    ).length;

  const criticalPatients =
    patients.filter(
      (p: any) => p.status === "critical"
    ).length;

  return (
    <div className="space-y-6">
      {/* header */}
      <section className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.30em] text-white/35">
            Patient Management
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white">
            Patients Directory
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
            Search, monitor and manage all registered
            patients across departments and care units.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button className="px-5">
            <UserPlus size={16} className="text-emerald-300" />
            <span className="ml-2">
              Add Patient
            </span>
          </Button>
        </div>
      </section>

      {/* stat cards */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-white/8 bg-white/3 p-5 backdrop-blur-2xl">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">
              Total Patients
            </p>

            <Users
              size={18}
              className="text-sky-400"
            />
          </div>

          <p className="mt-4 text-4xl font-semibold text-white">
            {patients.length}
          </p>
        </div>

        <div className="rounded-3xl border border-white/8 bg-white/3 p-5 backdrop-blur-2xl">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">
              Active
            </p>

            <Activity
              size={18}
              className="text-emerald-300"
            />
          </div>

          <p className="mt-4 text-4xl font-semibold text-white">
            {activePatients}
          </p>
        </div>

        <div className="rounded-3xl border border-white/8 bg-white/3 p-5 backdrop-blur-2xl">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">
              Critical
            </p>

            <Activity
              size={18}
              className="text-red-300"
            />
          </div>

          <p className="mt-4 text-4xl font-semibold text-white">
            {criticalPatients}
          </p>
        </div>
      </section>

      {/* controls */}
      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* search */}
        <div className="relative w-full max-w-xl">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search by patient, doctor, status..."
            className="h-14 w-full rounded-2xl border border-white/10 bg-white/4 pl-11 pr-4 text-sm text-white outline-none backdrop-blur-2xl transition placeholder:text-white/30 hover:bg-white/6 focus:border-white/20 focus:bg-white/[0.07]"
          />
        </div>

        {/* view toggle */}
        <div className="flex items-center gap-2 rounded-2xl border border-white/8 bg-white/3 p-1 backdrop-blur-xl">
          <button
            onClick={() =>
              setView("list")
            }
            className={[
              "flex h-11 items-center gap-2 rounded-xl px-4 text-sm transition",
              view === "list"
                ? "bg-white text-black"
                : "text-white/60 hover:text-white",
            ].join(" ")}
          >
            <LayoutList
              size={16}
              className={view === "list" ? "text-black" : "text-white/60"}
            />
            List
          </button>

          <button
            onClick={() =>
              setView("grid")
            }
            className={[
              "flex h-11 items-center gap-2 rounded-xl px-4 text-sm transition",
              view === "grid"
                ? "bg-white text-black"
                : "text-white/60 hover:text-white",
            ].join(" ")}
          >
            <Grid2X2
              size={16}
              className={view === "grid" ? "text-black" : "text-white/60"}
            />
            Grid
          </button>
        </div>
      </section>

      {/* content shell */}
      <section className="rounded-3xl p-4 backdrop-blur-2xl">
        {loading ? (
          <div className="flex h-72 items-center justify-center text-sm text-white/40">
            Loading patients...
          </div>
        ) : filteredPatients.length ===
          0 ? (
          <div className="flex h-72 items-center justify-center text-sm text-white/40">
            No patients found.
          </div>
        ) : (
          <PatientsView
            view={view}
            setView={setView}
            patients={filteredPatients}
          />
        )}
      </section>
    </div>
  );
}
