export type ValidatorFnType = (value: string, fieldName: string) => string | null


export type FieldValidatorType =
  | { type: "required" }
  | { type: "minLength", constraints: { minLength: number } }
  | { type: "maxLength", constraints: { minLength: number } }


export type BaseField = {
  id: string
  fieldValidators?: FieldValidatorType[]
}


export type ValidatorFactory = (constraints?: any) => ValidatorFnType

export type LengthConstraints = {
  minLength: number
}
