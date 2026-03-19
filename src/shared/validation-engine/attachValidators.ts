import type { BaseField, ValidatorFnType } from "./types/rules.type"
import { validatorRegistery } from "./validatiorRegistery"



export function attachValidators<T extends BaseField>(field: T): Omit<T, "fieldValidators"> & { fieldValidators: ValidatorFnType[] } {
  return {
    ...field,
    fieldValidators: (field.fieldValidators ?? []).map((rule) => {
      const factory = validatorRegistery[rule.type]

      if ("constraints" in rule) {
        return factory(rule.constraints)
      }

      return factory()
    })
  }
}
