import type { LucideIcon } from "lucide-react"
import type { ValidatorFnType } from "../../shared/validation-engine/types/rules.type"

export type FieldType = {
  id: string,
  label?: string,
  type?: string,
  options?: any[]
  placeholder: string
  isPassword?: Boolean | undefined
  fieldValidators: FieldValidatorType[]
}

//Used for attaching validator functions
export type FieldValidatorType = Omit<FieldType, "fieldValidators"> & { fieldValidators?: ValidatorFnType[] }


export type FieldWithIconType = FieldType & { leftIcon?: LucideIcon; rightIcon?: LucideIcon; }
