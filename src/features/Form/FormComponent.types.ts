import type { LucideIcon } from "lucide-react"

export type FieldType = {
  id: string,
  label?: string,
  type?: string,
  options?: any[]
  placeholder: string
  isPassword?: Boolean | undefined
  fieldValidators: import("../../shared/validation-engine/types/rules.type").FieldValidatorType[]
}

export type CompiledField = Omit<FieldType, "fieldValidators"> & { fieldValidators?: import("../../shared/validation-engine/types/rules.type").ValidatorFnType[] }


export type FieldWithIconType = FieldType & { leftIcon?: LucideIcon; rightIcon?: LucideIcon; }
