import { useEffect, useState } from "react";
import { PatientsView } from "../../features/PatientsView/components/PatientsView";
import { usePatientStore } from "../../store/patient.store";

export default function ViewPatients() {
  const [view, setView] = useState("list");
  const [search, setSearch] = useState("");

  const { patients, fetchPatients, loading } = usePatientStore();

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="h-full">

      <PatientsView
        view={view}
        setView={setView}
        search={search}
        setSearch={setSearch}
        patients={patients}
      />

    </div>

  );
}
