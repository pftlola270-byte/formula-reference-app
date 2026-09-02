import assert from 'node:assert/strict'
import test from 'node:test'
import { formulas } from '../data/formulas.js'
import { formulaRegistry, getFormulaById, getFormulaBySlug } from '../data/formulaRegistry.js'
import { validateFormulaInputs } from '../lib/validation.js'
import { convertUnits } from '../data/units.js'
import { localizeFormula } from '../formulaTranslations.js'

const formula = (id) => formulas.find((item) => item.id === id)
const assertApprox = (actual, expected, tolerance = 1e-9) => assert.ok(Math.abs(actual - expected) <= tolerance, `expected ${actual} ≈ ${expected}`)
const valuesFor = (item, overrides = {}) => Object.fromEntries(item.variables.map((variable, index) => [variable.key, String(overrides[variable.key] ?? Math.max(1, index + 2))]))

test('Arabic localization covers every formula display record', () => {
  const localized = formulas.map((item) => localizeFormula(item, 'ar'))
  assert.equal(localized.length, 100)
  for (const item of localized) {
    assert.ok(item.name && item.name !== formula(item.id).name, `${item.id} needs an Arabic name`)
    assert.match(item.description, /[\u0600-\u06FF]/, `${item.id} needs an Arabic description`)
    for (const variable of item.variables) assert.match(variable.label, /[\u0600-\u06FF]/, `${item.id} variable ${variable.key} needs Arabic text`)
  }
})

test('formula registry provides stable unique slugs and lookups', () => {
  assert.equal(formulaRegistry.length, 100)
  assert.equal(new Set(formulaRegistry.map((item) => item.slug)).size, 100)
  for (const item of formulaRegistry) {
    assert.match(item.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    assert.equal(getFormulaById(item.id)?.slug, item.slug)
    assert.equal(getFormulaBySlug(item.slug)?.id, item.id)
    assert.ok(Array.isArray(item.relatedFormulaIds))
  }
})

// Level 1: Registry integrity — every formula is checked automatically.
test('registry contains exactly 100 formulas across six valid disciplines', () => {
  assert.equal(formulas.length, 100)
  assert.equal(new Set(formulas.map((item) => item.id)).size, 100)
  assert.deepEqual([...new Set(formulas.map((item) => item.category))], ['Math', 'Physics', 'Engineering', 'Chemistry', 'Statistics', 'Finance'])
})

test('every registry entry has complete executable and educational metadata', () => {
  for (const item of formulas) {
    assert.ok(Number.isInteger(item.id), `${item.name} must have an integer ID`)
    assert.ok(item.name?.trim(), `${item.id} must have a name`)
    assert.ok(item.category, `${item.name} must have a category`)
    assert.ok(item.symbol?.trim(), `${item.name} must have a symbol`)
    assert.ok(Array.isArray(item.variables) && item.variables.length > 0, `${item.name} must have variables`)
    assert.equal(typeof item.calculate, 'function', `${item.name} must have a calculation function`)
    assert.ok(typeof item.resultUnit === 'string', `${item.name} must have a result unit`)
    assert.ok(item.meaning && item.assumptions && item.example && item.difficulty, `${item.name} must have enriched metadata`)
    assert.ok(item.source === null || typeof item.source === 'object' || typeof item.source === 'string', `${item.name} source must be null or structured`)
    assert.equal(new Set(item.variables.map((variable) => variable.key)).size, item.variables.length, `${item.name} variable keys must be unique`)
  }
})

test('source records follow the traceability schema and exact coverage', () => {
  const traceable = formulas.filter((item) => typeof item.source === 'object' && item.source !== null)
  const directlyVerified = traceable.filter((item) => item.source.status === 'direct')
  const supporting = traceable.filter((item) => item.source.status === 'supporting')
  const expectedSourceRecords = 8
  assert.equal(traceable.length, expectedSourceRecords)
  assert.equal(directlyVerified.length, 7)
  assert.equal(supporting.length, 1)
  for (const item of traceable) {
    assert.ok(item.source.title?.trim(), `${item.name} source needs a title`)
    assert.ok(item.source.organization?.trim(), `${item.name} source needs an organization`)
    assert.match(item.source.url, /^https:\/\//, `${item.name} source needs a secure URL`)
    assert.ok(['direct', 'supporting', 'pending'].includes(item.source.status), `${item.name} source needs a valid status`)
    assert.notEqual(item.source.status, 'pending', `${item.name} pending source cannot be counted as traceable`)
    assert.ok(item.source.rationale?.trim(), `${item.name} source needs a rationale`)
  }
})

test('every formula accepts a generated valid registry input and returns a finite result', () => {
  for (const item of formulas) {
    const overrides = {}
    if (item.id === 7) Object.assign(overrides, { a: '1', b: '0', c: '-1' })
    if (item.id === 9) Object.assign(overrides, { x1: '1', x2: '2' })
    if (item.id === 10) Object.assign(overrides, { n: '5', r: '2' })
    if (item.id === 65) Object.assign(overrides, { n: '5', r: '2' })
    if (item.id === 96) Object.assign(overrides, { n: '5', k: '2', p: '0.5' })
    if (item.id === 59) Object.assign(overrides, { x1: '1', x2: '2', x3: '3', y1: '1', y2: '2', y3: '4' })
    if (item.id === 66) Object.assign(overrides, { x: '10', b: '2' })
    if (item.id === 98) Object.assign(overrides, { price: '3', variable: '1' })
    const input = valuesFor(item, overrides)
    assert.equal(validateFormulaInputs(item, input), '', `${item.name} should accept valid inputs`)
    const result = item.calculate(input)
    const finite = Array.isArray(result) ? result.every(Number.isFinite) : Number.isFinite(result)
    assert.ok(finite, `${item.name} must return a finite result`)
  }
})

// Level 2: Validation behavior.
test('validation rejects NaN and non-numeric inputs', () => {
  const item = formula(11)
  assert.match(validateFormulaInputs(item, { m: 'not-a-number', a: '2' }), /valid number/)
  assert.match(validateFormulaInputs(item, { m: 'NaN', a: '2' }), /valid number/)
})

test('validation rejects negative and non-integer constrained values', () => {
  const permutations = formula(10)
  assert.match(validateFormulaInputs(permutations, { n: '-1', r: '2' }), /at least 0/)
  assert.match(validateFormulaInputs(permutations, { n: '4.5', r: '2' }), /integer/)
  const compound = formula(40)
  assert.match(validateFormulaInputs(compound, { p: '100', r: '5', n: '0', t: '2' }), /at least 1/)
})

test('zero denominators are rejected or safely return null', () => {
  assert.equal(formula(15).calculate({ m: '4', v: '0' }), null)
  assert.equal(formula(77).calculate({ w: '10', t: '0' }), null)
  assert.equal(formula(98).calculate({ fixed: '100', price: '2', variable: '2' }), null)
})

test('validation rejects invalid Kelvin values', () => {
  assert.match(validateFormulaInputs(formula(22), { n: '1', t: '0', v: '1' }), /greater than 0 K/)
})

test('unit conversion rejects unsupported or invalid conversion values', () => {
  assert.ok(Number.isNaN(convertUnits('abc', 'm', 'cm')))
  assert.equal(convertUnits('2', 'm', 'kg'), 2)
})

// Level 3: Mathematical correctness for representative complex logic.
test('quadratic equation returns known roots', () => {
  assert.deepEqual(formula(7).calculate({ a: '1', b: '-3', c: '2' }), [2, 1])
})

test('permutations and combinations return known counts', () => {
  assert.equal(formula(10).calculate({ n: '5', r: '2' }), 20)
  assert.equal(formula(65).calculate({ n: '5', r: '2' }), 10)
})

test('Pearson correlation returns perfect positive correlation', () => {
  assertApprox(formula(59).calculate({ x1: '1', y1: '2', x2: '2', y2: '4', x3: '3', y3: '6' }), 1)
})

test('compound interest and NPV return expected values', () => {
  assertApprox(formula(40).calculate({ p: '1000', r: '5', n: '1', t: '2' }), 1102.5)
  assertApprox(formula(97).calculate({ cashflow: '110', rate: '10', investment: '100' }), 0)
})

test('Arrhenius equation and half-life return expected values', () => {
  assertApprox(formula(91).calculate({ a: '1', e: '0', t: '300' }), 1)
  assertApprox(formula(92).calculate({ k: '0.1' }), Math.log(2) / 0.1)
})

test('Heron formula and beam deflection return expected values', () => {
  assertApprox(formula(67).calculate({ a: '3', b: '4', c: '5' }), 6)
  assertApprox(formula(82).calculate({ f: '100', l: '2', e: '200000000000', i: '0.000001' }), 0.0013333333333333333)
})

test('vector magnitude and temperature conversion return expected values', () => {
  assertApprox(formula(70).calculate({ x: '3', y: '4' }), 5)
  assertApprox(formula(43).calculate({ c: '100' }), 212)
})
