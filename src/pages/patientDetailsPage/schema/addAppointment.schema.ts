import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Calendar,
  ClipboardList,
  Clock,
  Stethoscope,
  User
} from "lucide-react";

export const AppointmentFormSchema: (
  {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    leftIcon?: LucideIcon;
    rightIcon?: LucideIcon;
    options?: { label: string; value: string }[];
    fieldValidators: { type: "required" }[];
  }
)[] = [
    {
      id: "patientName",
      label: "Patient Name",
      type: "text",
      placeholder: "Enter patient name",
      leftIcon: User,
      fieldValidators: [{ type: "required" }],
    },
    {
      id: "doctor",
      label: "Doctor",
      type: "text",
      placeholder: "Enter doctor name",
      leftIcon: Stethoscope,
      fieldValidators: [{ type: "required" }],
    },
    {
      id: "appointmentDate",
      label: "Appointment Date",
      type: "date",
      placeholder: "Select appointment date",
      leftIcon: Calendar,
      fieldValidators: [{ type: "required" }],
    },
    {
      id: "appointmentTime",
      label: "Appointment Time",
      type: "time",
      placeholder: "Select appointment time",
      leftIcon: Clock,
      fieldValidators: [{ type: "required" }],
    },
    {
      id: "reason",
      label: "Reason",
      type: "text",
      placeholder: "Enter appointment reason",
      leftIcon: ClipboardList,
      fieldValidators: [{ type: "required" }],
    },
    {
      id: "status",
      label: "Status",
      type: "select",
      placeholder: "Select status",
      leftIcon: Activity,
      options: [
        { label: "Scheduled", value: "scheduled" },
        { label: "Confirmed", value: "confirmed" },
        { label: "Completed", value: "completed" },
        { label: "Cancelled", value: "cancelled" },
      ],
      fieldValidators: [{ type: "required" }],
    },
    {
      id: "notes",
      label: "Notes",
      type: "textarea",
      placeholder: "Add any additional notes",
      leftIcon: ClipboardList,
      fieldValidators: [],
    },
  ];
