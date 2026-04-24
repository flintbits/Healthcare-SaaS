import type { Timestamp } from "firebase/firestore";

export type AppointmentStatus = "scheduled" | "confirmed" | "completed" | "cancelled";

export interface Appointment {
  id?: string;
  patientId: string;
  patientName: string;
  doctor: string;
  appointmentDate: string; // ISO date string
  appointmentTime: string; // HH:MM format
  reason: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
