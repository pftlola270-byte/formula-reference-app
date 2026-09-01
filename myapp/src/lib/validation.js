export const validateFormulaInputs = (formula, inputValues) => {
  for (const variable of formula.variables) {
    const value = Number(inputValues[variable.key])
    if (!Number.isFinite(value)) return `Enter a valid number for ${variable.label}.`
    if (variable.min !== undefined && value < variable.min) return `${variable.label} must be at least ${variable.min}.`
    if (variable.max !== undefined && value > variable.max) return `${variable.label} must be at most ${variable.max}.`
    if (variable.integer && !Number.isInteger(value)) return `${variable.label} must be an integer.`
    if (variable.unit === 'K' && value <= 0) return `${variable.label} must be greater than 0 K.`
  }
  if (formula.validation) return formula.validation(inputValues)
  return ''
}
