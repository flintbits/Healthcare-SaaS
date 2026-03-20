import type { MaxLengthConstraints, MinLengthConstraints, ValidatorFactory } from "./types/rules.type"



export const validatorRegistery: Record<string, ValidatorFactory> = {
  required: () => {
    return (value: string) => {
      if (value === undefined || value === null) return "Field is required"
      if (typeof value === "string" && value.trim().length === 0) return "Field is required"
      return null
    }
  },
  minLength: (constraints: MinLengthConstraints) => {
    return (value: string) => {
      if (value.trim().length < constraints.minLength) {
        return `Must be at least ${constraints.minLength} characters`
      }
      return null
    }
  },
  maxLength: (constraints: MaxLengthConstraints) => {
    return (value: string) => {
      if (value.trim().length > constraints.maxLength) {
        return `Must be less than ${constraints.maxLength} characters`
      }
      return null
    }
  }
}
