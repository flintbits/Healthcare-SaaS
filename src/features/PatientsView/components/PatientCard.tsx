import { useNavigate } from "@tanstack/react-router";
import { Activity, Stethoscope, User } from "lucide-react";
import type { Patient } from "../../../entities/Patient.entity";

interface PatientCardProps {
  patient: Patient;
}

export const PatientCard = ({ patient }: PatientCardProps) => {
  const navigate = useNavigate()
  const handlePatientView = () => {
    navigate({ to: "/patients/$patientId", replace: true, params: { patientId: patient.id as string } })
  }
  return (
    <div className="bg-(--color-text-secondary)/10 rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer" onClick={handlePatientView}>

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2 font-medium">
          <User size={16} />
          {patient.name}
        </div>

        {/* <span
          className={`text-xs px-2 py-1 rounded-full
            ${patient.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
            }
          `}
        >
          {patient.status}
        </span> */}

      </div>

      {/* body */}
      <div className="mt-3 space-y-1 text-sm text-gray-600">

        <div className="flex items-center gap-2">
          <Activity size={14} />
          Age: {patient.age}
        </div>

        <div className="flex items-center gap-2">
          <Stethoscope size={14} />
          Doctor: {patient.doctor}
        </div>

      </div>

    </div>
  );
}
