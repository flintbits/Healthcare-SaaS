import type { FieldValidatorType, ValidatorFnType } from "../../../shared/validation-engine/types/rules.type"


//Used for Schema
export type AuthFieldType = {
  id: string,
  label: string,
  type: string,
  options?: any[]
  placeholder: string
  isPassword?: Boolean | undefined
  fieldValidators: FieldValidatorType[]
}

//Used for attaching validator functions
export type AuthFieldValidatorType = Omit<AuthFieldType, "fieldValidators"> & { fieldValidators?: ValidatorFnType[] }


export type AuthState = {
  isAuthenticated: boolean;
  isOnboarded: boolean;
  user: User | null;
  initialized: boolean;
}

export type User = {
  id: number;
  email: string;
  role: 'ORGANIZER' | 'TEAM_ADMIN';
  is_onboarded: boolean;
}
