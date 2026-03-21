import { Calendar, Stethoscope, type LucideIcon } from "lucide-react";
import type { AuthFieldType } from "../../../features/auth/types/auth.types";

export const AddVisitSchema: (AuthFieldType & { leftIcon?: LucideIcon, rightIcon?: LucideIcon })[] = [
  {
    id: "doctor",
    label: "Doctor Name",
    type: "text",
    placeholder: "Enter Doctor name",
    leftIcon: Stethoscope,
    fieldValidators: [
      { type: "required" }
    ]
  },

  {
    id: "fee",
    label: "Fee",
    type: "number",
    placeholder: "Enter Fee",
    leftIcon: Calendar,
    fieldValidators: [
      { type: "required" }
    ]
  },
];
