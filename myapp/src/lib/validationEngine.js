import { ERROR_CODES } from './errors.js'

export const validateInputs = (formula, values) => {
  for (const variable of formula.variables) {
    const raw = values[variable.key]
    if (raw === undefined || raw === '') return { code: ERROR_CODES.INPUT_REQUIRED, field: variable.key, params: {} }
    const value = Number(raw)
    if (!Number.isFinite(value)) return { code: ERROR_CODES.INPUT_INVALID, field: variable.key, params: { value: raw } }
    const constraint = formula.constraints?.[variable.key] || variable
    if (constraint.min !== undefined && value < constraint.min) return { code: ERROR_CODES.OUT_OF_DOMAIN, field: variable.key, params: { minimum: constraint.min } }
    if (constraint.max !== undefined && value > constraint.max) return { code: ERROR_CODES.OUT_OF_DOMAIN, field: variable.key, params: { maximum: constraint.max } }
    if (constraint.integer && !Number.isInteger(value)) return { code: ERROR_CODES.OUT_OF_DOMAIN, field: variable.key, params: { expected: 'integer' } }
    if (variable.unit === 'K' && value <= 0) return { code: ERROR_CODES.OUT_OF_DOMAIN, field: variable.key, params: { minimumExclusive: 0, unit: 'K' } }
  }
  if (formula.validation) {
    const customError = formula.validation(values)
    if (customError) return { code: ERROR_CODES.OUT_OF_DOMAIN, field: null, params: { message: customError } }
  }
  return null
}
