import { FormulaDiagram } from './FormulaDiagram'

export function CalculatorPanel({ formula, icon, isFavorite, onToggleFavorite, values, onValueChange, onCalculate, result, error, formattedResult, diagram }) {
  return <aside className="details-card" id="calculator">
    <div className="details-top"><span className={`category-dot large dot-${formula.category}`}>{icon}</span><div><span className="section-kicker">{formula.category}</span><h3>{formula.name}</h3></div><button type="button" className={`favorite ${isFavorite ? 'is-favorite' : ''}`} onClick={() => onToggleFavorite(formula.id)} aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>{isFavorite ? '★' : '☆'}</button></div>
    <div className="formula-display">{formula.symbol}</div><FormulaDiagram type={diagram} /><p className="formula-description">{formula.description}</p>
    <div className="learning-meta">{[['Meaning', formula.meaning], ['Assumptions', formula.assumptions], ['Example', formula.example]].map(([label, text]) => <div key={label}><span>{label}</span><p>{text}</p></div>)}<div><span>Difficulty</span><strong>{formula.difficulty}</strong></div>{formula.relatedFormulas.length > 0 && <div><span>Related formulas</span><p>{formula.relatedFormulas.join(' · ')}</p></div>}<div><span>Source</span><p>{formula.source}</p></div></div>
    {formula.id === 7 && <p className="formula-note">Real roots only. Complex roots are outside this calculator’s scope.</p>}
    <div className="divider" /><h4>Calculate your result</h4><div className="inputs-grid">{formula.variables.map((variable) => <label key={variable.key}><span>{variable.label}</span><div className="input-wrap"><input type="number" min={variable.min} max={variable.max} step={variable.integer ? 1 : 'any'} value={values[variable.key] || ''} onChange={(event) => onValueChange(variable, event.target.value)} placeholder="0" /><small>{variable.unit}</small></div></label>)}</div>
    <button type="button" className="calculate-button" onClick={onCalculate}>Calculate now <span>↗</span></button>{error && <p className="error-message" role="alert" aria-live="assertive">{error}</p>}{result !== null && <div className="result-box" aria-live="polite"><span>{formula.resultLabel}</span><strong>{formattedResult} {formula.resultUnit}</strong></div>}
  </aside>
}
