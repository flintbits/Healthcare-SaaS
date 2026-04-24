import type { LucideIcon } from "lucide-react";
import type { ValidatorFnType } from "../../../shared/validation-engine/types/rules.type";

/* -------------------------------------------------------
   Generic option type for select / dropdown fields
------------------------------------------------------- */
export type FieldOptionType = {
  label: string;
  value: string | number;
};

/* -------------------------------------------------------
   Base Patient Form Field
------------------------------------------------------- */
export type AddPatientFormType = {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: FieldOptionType[];
  isPassword?: boolean;
  disabled?: boolean;
  required?: boolean;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  className?: string;
};


export type AddPatientValidatorType =
  AddPatientFormType & {
    fieldValidators?: ValidatorFnType[];
  };


export type AddPatientSchemaType =
  AddPatientValidatorType[];
