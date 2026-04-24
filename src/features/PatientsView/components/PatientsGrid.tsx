import type { Patient } from "../../../entities/Patient.entity";
import { PatientCard } from "./PatientCard";

export const PatientsGrid: React.FC<{
  patients: Patient[];
}> = ({ patients }) => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {patients.map((p) => (
        <PatientCard
          key={p.id}
          patient={p}
        />
      ))}
    </div>
  );
};
