export function FormulaCard({ formula, selectedId, onSelect, icons, t }) {
  return <button type="button" className={`formula-card ${selectedId === formula.id ? 'active-card' : ''}`} onClick={() => onSelect(formula.id)}>
    <span className={`category-dot dot-${formula.category}`}>{icons[formula.category]}</span>
    <span className="card-info"><strong>{formula.name}</strong><small>{t.category(formula.category)}</small></span>
    <span className="card-symbol">{formula.symbol}</span><span className="card-arrow">→</span>
  </button>
}
