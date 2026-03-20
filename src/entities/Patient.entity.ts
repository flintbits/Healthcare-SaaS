import type { Timestamp } from "firebase/firestore";

export interface Patient {
  id?: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  status: "Active" | "Inactive" | "Critical";
  doctor: string;
  createdAt?: Timestamp;
  lastVisit?: Timestamp;
}
