export const categories = ['All', 'Math', 'Physics', 'Engineering', 'Chemistry', 'Statistics', 'Finance']

export const icons = { Math: 'π', Physics: 'Φ', Engineering: 'Ω', Chemistry: '⚗', Statistics: 'σ', Finance: '$' }

const unit = (group, dimension, toBase, fromBase) => ({ group, dimension, toBase, fromBase })

export const unitDefinitions = {
  mm: unit('Length', 'length', (v) => v / 1000, (v) => v * 1000), cm: unit('Length', 'length', (v) => v / 100, (v) => v * 100), m: unit('Length', 'length', (v) => v, (v) => v), km: unit('Length', 'length', (v) => v * 1000, (v) => v / 1000), in: unit('Length', 'length', (v) => v * 0.0254, (v) => v / 0.0254), ft: unit('Length', 'length', (v) => v * 0.3048, (v) => v / 0.3048), yd: unit('Length', 'length', (v) => v * 0.9144, (v) => v / 0.9144), mi: unit('Length', 'length', (v) => v * 1609.344, (v) => v / 1609.344),
  mg: unit('Mass', 'mass', (v) => v / 1000000, (v) => v * 1000000), g: unit('Mass', 'mass', (v) => v / 1000, (v) => v * 1000), kg: unit('Mass', 'mass', (v) => v, (v) => v), lb: unit('Mass', 'mass', (v) => v * 0.45359237, (v) => v / 0.45359237),
  ms: unit('Time', 'time', (v) => v / 1000, (v) => v * 1000), s: unit('Time', 'time', (v) => v, (v) => v), min: unit('Time', 'time', (v) => v * 60, (v) => v / 60), h: unit('Time', 'time', (v) => v * 3600, (v) => v / 3600), day: unit('Time', 'time', (v) => v * 86400, (v) => v / 86400),
  '°C': unit('Temperature', 'temperature', (v) => v + 273.15, (v) => v - 273.15), '°F': unit('Temperature', 'temperature', (v) => (v - 32) * 5 / 9 + 273.15, (v) => (v - 273.15) * 9 / 5 + 32), K: unit('Temperature', 'temperature', (v) => v, (v) => v),
  Pa: unit('Pressure', 'pressure', (v) => v, (v) => v), kPa: unit('Pressure', 'pressure', (v) => v * 1000, (v) => v / 1000), bar: unit('Pressure', 'pressure', (v) => v * 100000, (v) => v / 100000), atm: unit('Pressure', 'pressure', (v) => v * 101325, (v) => v / 101325), mmHg: unit('Pressure', 'pressure', (v) => v * 133.322368, (v) => v / 133.322368),
}

export const convertUnitsSafe = (amount, from, to) => {
  const source = unitDefinitions[from]
  const target = unitDefinitions[to]
  if (!source || !target) return { success: false, error: { code: 'UNKNOWN_UNIT', field: 'unit' } }
  if (source.dimension !== target.dimension) return { success: false, error: { code: 'INCOMPATIBLE_UNITS', field: 'unit', params: { from, to } } }
  const value = Number(amount)
  if (!Number.isFinite(value)) return { success: false, error: { code: 'INVALID_INPUT', field: 'amount' } }
  const result = target.fromBase(source.toBase(value))
  if (!Number.isFinite(result)) return { success: false, error: { code: 'OVERFLOW', field: 'amount' } }
  return { success: true, result, dimension: source.dimension }
}

export const convertUnits = (amount, from, to) => {
  const converted = convertUnitsSafe(amount, from, to)
  return converted.success ? converted.result : null
}
