export const categories = ['All', 'Math', 'Physics', 'Engineering', 'Chemistry', 'Statistics', 'Finance']

export const icons = { Math: 'π', Physics: 'Φ', Engineering: 'Ω', Chemistry: '⚗', Statistics: 'σ', Finance: '$' }

export const unitDefinitions = {
  mm: { group: 'Length', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  cm: { group: 'Length', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
  m: { group: 'Length', toBase: (v) => v, fromBase: (v) => v },
  km: { group: 'Length', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  in: { group: 'Length', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
  ft: { group: 'Length', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
  yd: { group: 'Length', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
  mi: { group: 'Length', toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
  mg: { group: 'Mass', toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
  g: { group: 'Mass', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  kg: { group: 'Mass', toBase: (v) => v, fromBase: (v) => v },
  lb: { group: 'Mass', toBase: (v) => v * 0.45359237, fromBase: (v) => v / 0.45359237 },
  ms: { group: 'Time', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  s: { group: 'Time', toBase: (v) => v, fromBase: (v) => v },
  min: { group: 'Time', toBase: (v) => v * 60, fromBase: (v) => v / 60 },
  h: { group: 'Time', toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
  day: { group: 'Time', toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
  '°C': { group: 'Temperature', toBase: (v) => v + 273.15, fromBase: (v) => v - 273.15 },
  '°F': { group: 'Temperature', toBase: (v) => (v - 32) * 5 / 9 + 273.15, fromBase: (v) => (v - 273.15) * 9 / 5 + 32 },
  K: { group: 'Temperature', toBase: (v) => v, fromBase: (v) => v },
  Pa: { group: 'Pressure', toBase: (v) => v, fromBase: (v) => v },
  kPa: { group: 'Pressure', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  bar: { group: 'Pressure', toBase: (v) => v * 100000, fromBase: (v) => v / 100000 },
  atm: { group: 'Pressure', toBase: (v) => v * 101325, fromBase: (v) => v / 101325 },
  mmHg: { group: 'Pressure', toBase: (v) => v * 133.322368, fromBase: (v) => v / 133.322368 },
}

export const convertUnits = (amount, from, to) => unitDefinitions[to].fromBase(unitDefinitions[from].toBase(Number(amount)))
