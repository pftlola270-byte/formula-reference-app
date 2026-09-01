export const variableConstraints = {
  1: { a: { min: 0 }, b: { min: 0 } },
  2: { r: { min: 0 } }, 3: { r: { min: 0 } }, 4: { b: { min: 0 }, h: { min: 0 } }, 5: { l: { min: 0 }, w: { min: 0 } }, 6: { r: { min: 0 } },
  7: { a: { min: -Infinity }, b: {}, c: {} }, 10: { n: { min: 0, integer: true }, r: { min: 0, integer: true } },
  11: { m: { min: 0 }, a: {} }, 12: { m: { min: 0 }, v: {} }, 13: { m: { min: 0 }, g: { min: 0 }, h: { min: 0 } }, 15: { m: { min: 0 }, v: { min: 0 } }, 16: { f: {}, a: { min: 0 } }, 18: { m1: { min: 0 }, m2: { min: 0 }, r: { min: 0 } }, 19: { r: { min: 0 } }, 21: { k: { min: 0 }, x: { min: 0 } }, 22: { n: { min: 0 }, t: { min: 0 }, v: { min: 0 } },
  33: { n: { min: 0 }, v: { min: 0 } }, 34: { h: { min: 0 } }, 35: { m1: { min: 0 }, v1: { min: 0 }, v2: { min: 0 } }, 36: { solute: { min: 0 }, solution: { min: 0 } },
  37: { sd: { min: 0 } }, 40: { p: { min: 0 }, r: { min: 0 }, n: { min: 1, integer: true }, t: { min: 0 } }, 41: { p: { min: 0 }, r: {}, t: { min: 0 } }, 42: { fv: { min: 0 }, r: { min: 0 }, t: { min: 0 } }, 43: { profit: {}, revenue: { min: 0 } }, 44: { profit: {}, cost: { min: 0 } },
}

const metadata = {
  11: { meaning: 'Net force equals mass multiplied by acceleration.', assumptions: 'The acceleration is caused by the net force acting on the object.', example: 'm = 5 kg and a = 3 m/s² gives F = 15 N.', relatedFormulas: ['Kinetic Energy', 'Momentum', 'Work'], source: 'Newtonian mechanics', difficulty: 'Beginner' },
  12: { meaning: 'Kinetic energy is the energy of motion.', assumptions: 'Mass is measured in kilograms and velocity in metres per second.', example: 'm = 2 kg and v = 4 m/s gives Eₖ = 16 J.', relatedFormulas: ['Newton\'s Second Law', 'Momentum'], source: 'Classical mechanics', difficulty: 'Beginner' },
  34: { meaning: 'pH expresses acidity on a logarithmic scale.', assumptions: 'Hydrogen ion concentration is positive and measured in mol/L.', example: '[H⁺] = 0.001 mol/L gives pH = 3.', relatedFormulas: ['Molarity', 'Dilution Equation'], source: 'General chemistry', difficulty: 'Intermediate' },
  59: { meaning: 'Pearson correlation measures the strength and direction of a linear relationship.', assumptions: 'The paired observations have non-zero variation in both variables.', example: 'Use three paired X and Y observations to estimate r.', relatedFormulas: ['Arithmetic Mean', 'Population Standard Deviation'], source: 'Descriptive statistics', difficulty: 'Intermediate' },
  62: { meaning: 'Return on investment compares profit with the original cost.', assumptions: 'Investment cost is positive and profit uses the same currency.', example: 'Profit = $200 and cost = $1,000 gives ROI = 20%.', relatedFormulas: ['Profit Margin', 'Future Value'], source: 'Introductory finance', difficulty: 'Beginner' },
}

const defaults = (formula) => ({
  meaning: formula.description,
  assumptions: 'Uses idealized inputs in the stated units.',
  example: 'Enter values in every field to calculate an answer.',
  relatedFormulas: [],
  source: 'Standard introductory science relationship',
  difficulty: formula.category === 'Math' ? 'Beginner' : 'Intermediate',
})

export const enrichFormulas = (rawFormulas) => rawFormulas.map((formula) => ({
  ...formula,
  ...defaults(formula),
  ...(metadata[formula.id] || {}),
  variables: formula.variables.map((variable) => ({ ...variable, ...(variableConstraints[formula.id]?.[variable.key] || {}) })),
}))
