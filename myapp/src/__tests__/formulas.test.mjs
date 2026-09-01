import test from 'node:test'
import assert from 'node:assert/strict'
import { formulas } from '../data/formulas.js'
import { validateFormulaInputs } from '../lib/validation.js'
import { convertUnits } from '../data/units.js'

const formula = (id) => formulas.find((item) => item.id === id)

test('catalog contains 62 formulas across six disciplines', () => {
  assert.equal(formulas.length, 62)
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
