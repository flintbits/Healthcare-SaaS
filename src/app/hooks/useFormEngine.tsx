
import { useState } from "react"
import type { BaseField, ValidatorFnType } from "../../shared/validation-engine/types/rules.type"
import { attachValidators } from "../../shared/validation-engine/attachValidators"


type CompiledField<T extends BaseField> =
  Omit<T, "fieldValidators"> & { fieldValidators: ValidatorFnType[] }

export default function useFormEngine<T extends BaseField>(formSchema: T[]) {
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  //returns a new schema witht the field level validators attached
  const compiledSchema = formSchema.map(attachValidators)

  const getFieldSchema = (fieldId: string) => {
    return compiledSchema.find((field) => field.id === fieldId)
  }

  const validateField = (value: string, fieldSchema: CompiledField<T>) => {
    let error = "";

    for (let validator of fieldSchema.fieldValidators!) {
      const result = validator(value, fieldSchema.id)

      if (result) {
        error = result
        break
      }
    }
    return error
  }

  const onChange = (val: string, fieldId: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: val }));

    const fieldSchema = getFieldSchema(fieldId);

    if (!fieldSchema) return

    const error = validateField(val, fieldSchema);

    setErrors((prev) => ({ ...prev, [fieldId]: error }))
  }

  const checkAllFields = (): Record<string, string> => {
    let newErrors: Record<string, string> = {}
    for (let field of compiledSchema) {
      const fieldId = field.id
      const error = validateField(formData[fieldId], field)

      if (error) {
        newErrors[fieldId] = error
      }
    }

    setErrors(newErrors)

    return newErrors
  }


  return { formData, onChange, checkAllFields, errors }
}
