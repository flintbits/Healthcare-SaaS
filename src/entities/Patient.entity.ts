import type { Timestamp } from "firebase/firestore";

export type PatientStatus = "active" | "critical" | "discharged" | "pending";

export interface Patient {
  id?: string;
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  phone: string;
  bloodType: string;
  department: string;
  status: PatientStatus;
  priority: "low" | "medium" | "high" | "emergency";
  doctor: string;
  admissionDate: string;
  notes: string;
  createdAt?: Timestamp;
  lastVisit?: Timestamp;
  updatedAt?: Timestamp;
}
