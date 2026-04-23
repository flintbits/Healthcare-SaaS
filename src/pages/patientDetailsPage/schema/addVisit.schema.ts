import {
  Calendar,
  ClipboardList,
  FileText,
  Pill,
  Stethoscope,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import type { AuthFieldType } from "../../../features/auth/types/auth.types";

export const AddVisitSchema: (
  AuthFieldType & {
    leftIcon?: LucideIcon;
    rightIcon?: LucideIcon;
  }
)[] = [
    {
      id: "doctor",
      label: "Doctor Name",
      type: "text",
      placeholder: "Enter doctor name",
      leftIcon: Stethoscope,
      fieldValidators: [{ type: "required" }],
    },

    {
      id: "visitDate",
      label: "Visit Date",
      type: "date",
      placeholder: "Select visit date",
      leftIcon: Calendar,
      fieldValidators: [{ type: "required" }],
    },

    {
      id: "visitType",
      label: "Visit Type",
      type: "select",
      placeholder: "Select visit type",
      leftIcon: ClipboardList,
      options: [
        { label: "Consultation", value: "consultation" },
        { label: "Follow-up", value: "followup" },
        { label: "Emergency", value: "emergency" },
        { label: "Routine Checkup", value: "checkup" },
        { label: "Surgery Review", value: "review" },
      ],
      fieldValidators: [{ type: "required" }],
    },

    {
      id: "fee",
      label: "Fee",
      type: "number",
      placeholder: "Enter fee amount",
      leftIcon: Wallet,
      fieldValidators: [{ type: "required" }],
    },

    {
      id: "diagnosis",
      label: "Diagnosis",
      type: "text",
      placeholder: "Enter diagnosis",
      leftIcon: FileText,
      fieldValidators: [{ type: "required" }],
    },

    {
      id: "prescription",
      label: "Prescription",
      type: "text",
      placeholder: "Enter medication / treatment",
      leftIcon: Pill,
      fieldValidators: [],
    },

    {
      id: "notes",
      label: "Notes",
      type: "text",
      placeholder: "Additional notes",
      leftIcon: FileText,
      fieldValidators: [],
    },
  ];
