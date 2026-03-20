import { Activity, Calendar, Stethoscope, User, type LucideIcon } from "lucide-react";
import type { AuthFieldType } from "../../../features/auth/types/auth.types";

export const PatientFormSchema: (AuthFieldType & { leftIcon?: LucideIcon, rightIcon?: LucideIcon })[] = [
  {
    id: "name",
    label: "Patient Name",
    type: "text",
    placeholder: "Enter patient name",
    leftIcon: User,
    fieldValidators: [
      { type: "required" }
    ]
  },

  {
    id: "age",
    label: "Age",
    type: "number",
    placeholder: "Enter age",
    leftIcon: Calendar,
    fieldValidators: [
      { type: "required" }
    ]
  },

  {
    id: "gender",
    label: "Gender",
    type: "select",
    placeholder: "Select gender",
    leftIcon: User,
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" }
    ],
    fieldValidators: [
      { type: "required" }
    ]
  },

  {
    id: "status",
    label: "Status",
    type: "select",
    placeholder: "Select status",
    leftIcon: Activity,
    options: [
      { label: "Active", value: "active" },
      { label: "Critical", value: "critical" },
      { label: "Discharged", value: "discharged" }
    ],
    fieldValidators: [
      { type: "required" }
    ]
  },

  {
    id: "doctor",
    label: "Doctor",
    type: "text",
    placeholder: "Enter doctor name",
    leftIcon: Stethoscope,
    fieldValidators: [
      { type: "required" }
    ]
  }
];
