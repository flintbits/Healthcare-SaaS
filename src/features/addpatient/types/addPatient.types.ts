import type { ValidatorFnType } from "../../../shared/validation-engine/types/rules.type";



export type AddPatientFormType = {
  id: string,
  label: string,
  type: string,
  options?: any[]
  placeholder: string
  isPassword?: Boolean | undefined
  fieldValidators: AddPatientValidatorType[]
};


//attaching validator functions
export type AddPatientValidatorType = Omit<AddPatientFormType, "fieldValidators"> & { fieldValidators?: ValidatorFnType[] }

