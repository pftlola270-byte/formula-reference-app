import { FormulaCard } from './FormulaCard'

export function FormulaLibrary({ formulas, selectedId, onSelect, icons, t }) {
  return <div className="formula-list">{formulas.length ? formulas.map((formula) => <FormulaCard key={formula.id} formula={formula} t={t} selectedId={selectedId} onSelect={onSelect} icons={icons} />) : <div className="empty-state">{t.noResults}</div>}</div>
}
