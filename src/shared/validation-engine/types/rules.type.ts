export type ValidatorFnType = (value: string, fieldName: string) => string | null


export type FieldValidatorType =
  | { type: "required" }
  | { type: "minLength", constraints: { minLength: number } }
  | { type: "maxLength", constraints: { maxLength: number } }
  | { type: "email", constraints: { pattern: RegExp | string; } }


export type BaseField = {
  id: string
  fieldValidators?: FieldValidatorType[]
}

export type ValidatorFactory = (constraints?: any) => ValidatorFnType

export type MinLengthConstraints = {
  minLength: number
}

export type MaxLengthConstraints = {
  maxLength: number
}

export type EmailConstraints = {
  pattern: RegExp | string;
}

