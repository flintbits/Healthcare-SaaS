import type { LengthConstraints, ValidatorFactory } from "./types/rules.type"



export const validatorRegistery: Record<string, ValidatorFactory> = {
  required: () => {
    return (value: string) => {
      if (!value) return "Field is required"
      return null
    }
  },
  minLength: (constraints: LengthConstraints) => {
    return (value: string) => {
      if (value.trim().length < constraints.minLength) {
        return `Must be at least ${constraints.minLength} characters`
      }
      return null
    }
  },
  maxLength: (constraints: LengthConstraints) => {
    return (value: string) => {
      if (value.trim().length > constraints.minLength) {
        return `Must be less than ${constraints.minLength} characters`
      }
      return null
    }
  }
}
