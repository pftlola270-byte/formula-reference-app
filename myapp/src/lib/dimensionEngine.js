export const dimensionSignatures = {
  11: { result: { M: 1, L: 1, T: -2 }, terms: [{ signature: { M: 1 }, power: 1 }, { signature: { L: 1, T: -2 }, power: 1 }] },
  12: { result: { M: 1, L: 2, T: -2 }, terms: [{ signature: { M: 1 }, power: 1 }, { signature: { L: 1, T: -1 }, power: 2 }] },
  15: { result: { M: 1, L: -3 }, terms: [{ signature: { M: 1 }, power: 1 }, { signature: { L: 3 }, power: -1 }] },
  16: { result: { M: 1, L: -1, T: -2 }, terms: [{ signature: { M: 1, L: 1, T: -2 }, power: 1 }, { signature: { L: 2 }, power: -1 }] },
  25: { result: { M: 1, L: 2, T: -3, I: -1 }, terms: [{ signature: { I: 1 }, power: 1 }, { signature: { M: 1, L: 2, T: -3, I: -2 }, power: 1 }] },
}

const normalize = (signature) => Object.fromEntries(Object.entries(signature).filter(([, value]) => value !== 0).sort())
const addScaled = (result, signature, power) => Object.entries(signature).reduce((next, [key, value]) => ({ ...next, [key]: (next[key] || 0) + value * power }), result)

export const checkDimensions = (formulaId) => {
  const signature = dimensionSignatures[formulaId]
  if (!signature) return { checked: false, compatible: true }
  const actual = signature.terms.reduce((total, term) => addScaled(total, term.signature, term.power), {})
  return { checked: true, compatible: JSON.stringify(normalize(actual)) === JSON.stringify(normalize(signature.result)), expected: normalize(signature.result), actual: normalize(actual) }
}
