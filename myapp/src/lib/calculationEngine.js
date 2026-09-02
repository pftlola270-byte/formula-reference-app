import { ERROR_CODES } from './errors.js'
import { validateInputs } from './validationEngine.js'

const isFiniteResult = (value) => Array.isArray(value) ? value.every((item) => Number.isFinite(item)) : Number.isFinite(value)

export const calculateFormula = (formula, values) => {
  const validationError = validateInputs(formula, values)
  if (validationError) return { success: false, result: null, unit: formula.resultUnit, formattedResult: null, error: validationError, trace: [], metadata: { formulaId: formula.id } }
  let result
  try { result = formula.calculate(values) } catch (error) { return { success: false, result: null, unit: formula.resultUnit, formattedResult: null, error: { code: ERROR_CODES.CALCULATION_ERROR, field: null, params: { message: error.message } }, trace: [], metadata: { formulaId: formula.id } } }
  if (result === null || !isFiniteResult(result)) return { success: false, result: null, unit: formula.resultUnit, formattedResult: null, error: { code: result === null ? ERROR_CODES.OUT_OF_DOMAIN : ERROR_CODES.NON_FINITE_RESULT, field: null, params: {} }, trace: [{ step: 'validate-result', value: result }], metadata: { formulaId: formula.id } }
  const formattedResult = Array.isArray(result) ? result.map((item) => item.toFixed(4)).join(' or ') : Number(result).toLocaleString('en-US', { maximumFractionDigits: 4 })
  return { success: true, result, unit: formula.resultUnit, formattedResult, error: null, trace: [{ step: 'calculate', value: result }], metadata: { formulaId: formula.id } }
}
