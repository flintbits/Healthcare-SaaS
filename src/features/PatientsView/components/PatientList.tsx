import { Link } from "@tanstack/react-router";
import { FileSymlink } from "lucide-react";
import type { Patient } from "../../../entities/Patient.entity";


export const PatientsList: React.FC<{ patients: Patient[] }> = ({ patients }) => {
  return (
    <table className="w-full table-fixed text-sm">

      <thead className="bg-(--color-text-secondary)/30 text-left">
        <tr>
          <th className="p-3 w-1/5">Sl.No</th>
          <th className="p-3 w-1/5">Name</th>
          <th className="p-3 w-1/5">Age</th>
          <th className="p-3 w-1/5">Status</th>
          <th className="p-3 w-1/5">Doctor</th>
          <th className="p-3 w-1/5">View Details</th>
        </tr>
      </thead>

      <tbody>
        {patients.map((p, i) => (
          <tr
            key={p.id}
            className="border-b border-gray-300 hover:bg-gray-50 transition"
          >
            <td className="p-3">{i + 1}</td>

            <td className="p-3">{p.name}</td>

            <td className="p-3">{p.age}</td>

            <td className="p-3">
              <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">
                {p.status}
              </span>
            </td>

            <td className="p-3">{p.doctor}</td>
            <td className="p-3">
              <Link
                to="/patients/$patientId"
                params={{ patientId: p.id as string }}
                className="text-(--color-accent) underline"
              >
                <FileSymlink />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  );
}
