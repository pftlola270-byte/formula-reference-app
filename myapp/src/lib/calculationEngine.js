const isFiniteResult = (value) => Array.isArray(value) ? value.every((item) => Number.isFinite(item)) : Number.isFinite(value)

export const calculateFormula = (formula, values) => {
  const missing = formula.variables.find(({ key }) => values[key] === undefined || values[key] === '')
  if (missing) return { success: false, result: null, unit: formula.resultUnit, formattedResult: null, error: { code: 'INVALID_INPUT', field: missing.key, params: { reason: 'required' } }, trace: [], metadata: { formulaId: formula.id } }
  const validationError = formula.validate ? formula.validate(values) : null
  if (validationError) return { success: false, result: null, unit: formula.resultUnit, formattedResult: null, error: { code: 'OUT_OF_DOMAIN', field: null, params: { message: validationError } }, trace: [], metadata: { formulaId: formula.id } }
  let result
  try { result = formula.calculate(values) } catch (error) { return { success: false, result: null, unit: formula.resultUnit, formattedResult: null, error: { code: 'CALCULATION_ERROR', field: null, params: { message: error.message } }, trace: [], metadata: { formulaId: formula.id } } }
  if (result === null || !isFiniteResult(result)) return { success: false, result: null, unit: formula.resultUnit, formattedResult: null, error: { code: result === null ? 'OUT_OF_DOMAIN' : 'NON_FINITE_RESULT', field: null, params: {} }, trace: [{ step: 'validate-result', value: result }], metadata: { formulaId: formula.id } }
  const formattedResult = Array.isArray(result) ? result.map((item) => item.toFixed(4)).join(' or ') : Number(result).toLocaleString('en-US', { maximumFractionDigits: 4 })
  return { success: true, result, unit: formula.resultUnit, formattedResult, error: null, trace: [{ step: 'calculate', value: result }], metadata: { formulaId: formula.id } }
}
