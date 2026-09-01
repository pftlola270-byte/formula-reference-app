import test from 'node:test'
import assert from 'node:assert/strict'
import { formulas } from '../data/formulas.js'
import { validateFormulaInputs } from '../lib/validation.js'
import { convertUnits } from '../data/units.js'

const formula = (id) => formulas.find((item) => item.id === id)

test('catalog contains 100 formulas across six disciplines', () => {
  assert.equal(formulas.length, 100)
  assert.deepEqual([...new Set(formulas.map((item) => item.category))], ['Math', 'Physics', 'Engineering', 'Chemistry', 'Statistics', 'Finance'])
})

test('Newton second law calculates force', () => {
  assert.equal(formula(11).calculate({ m: 5, a: 3 }), 15)
})

test('circle area calculates with pi', () => {
  assert.ok(Math.abs(formula(2).calculate({ r: 5 }) - 78.5398163397) < 1e-10)
})

test('temperature conversion handles Celsius to Kelvin', () => {
  assert.equal(convertUnits(0, '°C', 'K'), 273.15)
})

test('division-by-zero formulas return null', () => {
  assert.equal(formula(9).calculate({ x1: 1, y1: 2, x2: 1, y2: 4 }), null)
  assert.equal(formula(15).calculate({ m: 5, v: 0 }), null)
})

test('validation rejects invalid integer and negative constrained inputs', () => {
  assert.match(validateFormulaInputs(formula(10), { n: 2.5, r: 1 }), /integer/)
  assert.match(validateFormulaInputs(formula(2), { r: -1 }), /at least 0/)
})

test('quadratic formula returns real roots and rejects complex roots', () => {
  assert.deepEqual(formula(7).calculate({ a: 1, b: 2, c: 1 }), [-1, -1])
  assert.equal(formula(7).calculate({ a: 1, b: 0, c: 1 }), null)
})

test('every formula has an executable, valid registry entry', () => {
  for (const item of formulas) {
    assert.equal(typeof item.calculate, 'function', `${item.name} must define calculate`)
    assert.ok(Array.isArray(item.variables) && item.variables.length > 0, `${item.name} must define variables`)
    assert.ok(item.meaning && item.assumptions && item.example && item.source && item.difficulty, `${item.name} must define learning metadata`)
    const values = Object.fromEntries(item.variables.map((variable) => {
      const minimum = Number.isFinite(variable.min) ? variable.min : 1
      return [variable.key, String(variable.integer ? Math.max(1, Math.ceil(minimum)) : Math.max(1, minimum))]
    }))
    if (item.id === 7) Object.assign(values, { a: '1', b: '0', c: '-1' })
    if (item.id === 9) Object.assign(values, { x1: '1', x2: '2' })
    if (item.id === 59) Object.assign(values, { x1: '1', x2: '2', x3: '3', y1: '1', y2: '2', y3: '4' })
    if (item.id === 66) Object.assign(values, { x: '10', b: '2' })
    if (item.id === 98) Object.assign(values, { price: '3', variable: '1' })
    const error = validateFormulaInputs(item, values)
    assert.equal(error, '', `${item.name} should accept generated valid inputs: ${error}`)
    const result = item.calculate(values)
    const finite = Array.isArray(result) ? result.every(Number.isFinite) : Number.isFinite(result)
    assert.ok(finite, `${item.name} must return a finite result`)
  }
})
