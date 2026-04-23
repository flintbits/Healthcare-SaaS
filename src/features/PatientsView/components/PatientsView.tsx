import type { Patient } from "../../../entities/Patient.entity";
import { PatientsList } from "./PatientList";
import { PatientsGrid } from "./PatientsGrid";

export const PatientsView: React.FC<{ view: string, setView: (view: string) => void, patients: Patient[] }> = ({ view, setView: _setView, patients }) => {
  return (
    <div className="space-y-4">

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
