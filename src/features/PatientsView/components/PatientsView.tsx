import type { Patient } from "../../../entities/Patient.entity";
import { PatientsList } from "./PatientList";
import { PatientsGrid } from "./PatientsGrid";
import { ViewToggle } from "./ViewToggle";

export const PatientsView: React.FC<{ view: string, setView: (view: string) => void, search: string, setSearch: (search: string) => void, patients: Patient[] }> = ({ view, setView, search, setSearch, patients }) => {
  return (
    <div className="space-y-4">

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Patients</h1>

        <ViewToggle view={view} setView={setView} />
      </div>

      <div className="overflow-hidden">
        {view === "list" ? (
          <PatientsList patients={patients} />
        ) : (
          <PatientsGrid patients={patients} />
        )}
      </div>

    </div>
  );
}
