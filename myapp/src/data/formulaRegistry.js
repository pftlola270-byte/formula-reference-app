import { formulas } from './formulas.js'

const slugOverrides = {
  11: 'newtons-second-law',
  12: 'kinetic-energy',
  19: 'coulombs-law',
  25: 'ohms-law',
  47: 'law-of-cosines',
  65: 'combinations',
  96: 'binomial-probability',
}

const slugify = (name) => name.toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export const formulaRegistry = formulas.map((formula) => ({
  ...formula,
  slug: slugOverrides[formula.id] || slugify(formula.name),
  relatedFormulaIds: [],
}))

const bySlug = new Map(formulaRegistry.map((formula) => [formula.slug, formula]))
const byId = new Map(formulaRegistry.map((formula) => [formula.id, formula]))

export const getFormulaBySlug = (slug) => bySlug.get(slug)
export const getFormulaById = (id) => byId.get(id)
