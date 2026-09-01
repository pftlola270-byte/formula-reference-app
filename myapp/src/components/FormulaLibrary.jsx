import { FormulaCard } from './FormulaCard'

export function FormulaLibrary({ formulas, selectedId, onSelect, icons }) {
  return <div className="formula-list">{formulas.length ? formulas.map((formula) => <FormulaCard key={formula.id} formula={formula} selectedId={selectedId} onSelect={onSelect} icons={icons} />) : <div className="empty-state">No formulas found. Try another search.</div>}</div>
}
