export function required(value: string, fieldName: string): string | null {
  if (value.trim().length === 0) {
    return `${fieldName} is required`
  }

  return null
}
