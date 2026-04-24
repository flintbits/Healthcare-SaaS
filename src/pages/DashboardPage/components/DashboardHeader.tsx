import { useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "../../../shared/ui/Button/Button";

export function DashboardHeader() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-[10px] uppercase tracking-[0.30em] text-white/35">
          Workspace Overview
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white">
          Operations Dashboard
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
          Monitor patients, occupancy, appointments, alerts and overall system health in real time.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => navigate({ to: "/addPatient" })}
          className="px-5"
        >
          <Plus size={16} className="text-emerald-300" />
          <span className="ml-2">Add Patient</span>
        </Button>

        <Button variant="ghost" className="px-5">
          Export Summary
        </Button>
      </div>
    </section>
  );
}
