import type { LucideIcon } from "lucide-react";
import {
  Activity,
  AlertTriangle,
  Building2,
  Calendar,
  ClipboardList,
  Droplets,
  Phone,
  Stethoscope,
  User,
  VenusAndMars
} from "lucide-react";
import type { AuthFieldType } from "../../../features/auth/types/auth.types";

export const PatientFormSchema: (
  AuthFieldType & {
    leftIcon?: LucideIcon;
    rightIcon?: LucideIcon;
  }
)[] = [

    {
      id: "name",
      label: "Patient Name",
      type: "text",
      placeholder: "Enter full patient name",
      leftIcon: User,
      fieldValidators: [{ type: "required" }],
    },

    {
      id: "age",
      label: "Age",
      type: "number",
      placeholder: "Enter patient age",
      leftIcon: Calendar,
      fieldValidators: [{ type: "required" }],
    },

    {
      id: "gender",
      label: "Gender",
      type: "select",
      placeholder: "Select gender",
      leftIcon: VenusAndMars,
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
      ],
      fieldValidators: [{ type: "required" }],
    },

    {
      id: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "Enter contact number",
      leftIcon: Phone,
      fieldValidators: [{ type: "required" }],
    },

    {
      id: "bloodType",
      label: "Blood Type",
      type: "select",
      placeholder: "Select blood type",
      leftIcon: Droplets,
      options: [
        { label: "A+", value: "A+" },
        { label: "A-", value: "A-" },
        { label: "B+", value: "B+" },
        { label: "B-", value: "B-" },
        { label: "AB+", value: "AB+" },
        { label: "AB-", value: "AB-" },
        { label: "O+", value: "O+" },
        { label: "O-", value: "O-" },
      ],
      fieldValidators: [{ type: "required" }],
    },

    {
      id: "department",
      label: "Department",
      type: "select",
      placeholder: "Select department",
      leftIcon: Building2,
      options: [
        { label: "Emergency", value: "emergency" },
        { label: "ICU", value: "icu" },
        { label: "Cardiology", value: "cardiology" },
        { label: "Pediatrics", value: "pediatrics" },
        { label: "Dental", value: "dental" },
        { label: "General", value: "general" },
      ],
      fieldValidators: [{ type: "required" }],
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
        { label: "Discharged", value: "discharged" },
        { label: "Pending", value: "pending" },
      ],
      fieldValidators: [{ type: "required" }],
    },

    {
      id: "priority",
      label: "Priority",
      type: "select",
      placeholder: "Select priority level",
      leftIcon: AlertTriangle,
      options: [
        { label: "Low", value: "low" },
        { label: "Medium", value: "medium" },
        { label: "High", value: "high" },
        { label: "Emergency", value: "emergency" },
      ],
      fieldValidators: [{ type: "required" }],
    },

    {
      id: "doctor",
      label: "Assigned Doctor",
      type: "text",
      placeholder: "Enter doctor name",
      leftIcon: Stethoscope,
      fieldValidators: [{ type: "required" }],
    },

    {
      id: "admissionDate",
      label: "Admission Date",
      type: "date",
      placeholder: "Select admission date",
      leftIcon: Calendar,
      fieldValidators: [{ type: "required" }],
    },

    {
      id: "notes",
      label: "Clinical Notes",
      type: "text",
      placeholder: "Add notes, allergies, observations...",
      leftIcon: ClipboardList,
      fieldValidators: [{ type: "required" }],
    },
  ];
