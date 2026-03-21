import type { Timestamp } from "firebase/firestore";

export type PatientStatus = "Active" | "Inactive" | "Critical";

export interface Patient {
  id?: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  status: PatientStatus
  doctor: string;
  createdAt?: Timestamp;
  lastVisit?: Timestamp;
}
