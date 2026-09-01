import { formulas } from './data/formulas'
import { categories, convertUnits, icons, unitDefinitions } from './data/units'
import { validateFormulaInputs } from './lib/validation'
import { CalculatorPanel } from './components/CalculatorPanel'
import { FormulaLibrary } from './components/FormulaLibrary'
import { ToolsPanel } from './components/Tools'
import { HistoryPanel } from './components/HistoryPanel'
import { useMemo, useState } from 'react'
import { useFavorites, useHistory } from './hooks/usePersistedLists'

const diagramFor = (formula) => formula.id === 2 || formula.id === 3 ? 'circle' : formula.id === 4 ? 'triangle' : formula.id === 11 ? 'force' : null

function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [selectedId, setSelectedId] = useState(11)
  const { favorites, toggleFavorite } = useFavorites()
  const [values, setValues] = useState({})
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [isDark, setIsDark] = useState(false)
  const { history, addHistory, clearHistory } = useHistory()
  const [showHistory, setShowHistory] = useState(false)
  const [quiz, setQuiz] = useState(null)
  const [quizAnswer, setQuizAnswer] = useState('')
  const [quizMessage, setQuizMessage] = useState('')
  const [converter, setConverter] = useState({ amount: '', from: 'm', to: 'cm' })

  const filteredFormulas = useMemo(() => formulas.filter((formula) => {
    const searchable = `${formula.name} ${formula.description} ${formula.symbol} ${formula.category}`.toLowerCase()
    return (category === 'All' || formula.category === category) && searchable.includes(query.toLowerCase())
  }), [category, query])
  const selectedFormula = formulas.find((formula) => formula.id === selectedId) || formulas[0]
  const isFavorite = favorites.includes(selectedFormula.id)

  const selectFormula = (id) => { setSelectedId(id); setResult(null); setError(''); setValues({}) }
  const handleValueChange = (variable, value) => { const next = { ...values, [variable.key]: value }; setValues(next); setError(''); setResult(null); if (selectedFormula.variables.every(({ key }) => next[key] !== undefined && next[key] !== '')) { const validationError = validateFormulaInputs(selectedFormula, next); if (!validationError) { const live = selectedFormula.calculate(next); if (live !== null && !Number.isNaN(live)) setResult(live) } } }
  const calculate = () => {
    setError('')
    if (!selectedFormula.variables.every(({ key }) => values[key] !== undefined && values[key] !== '')) { setError('Please fill in every field.'); return }
    const validationError = validateFormulaInputs(selectedFormula, values)
    if (validationError) { setError(validationError); setResult(null); return }
    const calculated = selectedFormula.calculate(values)
    if (calculated === null || Number.isNaN(calculated)) { setError('These values cannot produce a valid result.'); setResult(null); return }
    setResult(calculated)
    addHistory(selectedFormula, calculated)
  }
  const formattedResult = Array.isArray(result) ? result.map((item) => item.toFixed(3)).join('  or  ') : Number(result).toLocaleString('en-US', { maximumFractionDigits: 4 })
  const diagram = diagramFor(selectedFormula)
  const convertValue = converter.amount === '' ? '' : convertUnits(converter.amount, converter.from, converter.to)
  const startQuiz = () => { const candidates = formulas.filter((item) => item.id !== 7); const item = candidates[Math.floor(Math.random() * candidates.length)]; const quizValues = Object.fromEntries(item.variables.map((variable, index) => [variable.key, String(index + 2)])); setQuiz({ formula: item, answer: item.calculate(quizValues), values: quizValues }); setQuizAnswer(''); setQuizMessage('') }

  return (
    <div className={isDark ? 'app dark' : 'app'}>
      <header className="topbar"><a className="brand" href="#top"><span className="brand-mark">∑</span><span><strong>Formula</strong><em>Hub</em></span></a><nav className="nav-links"><a className="active" href="#library">Library</a><a href="#calculator">Calculator</a><a href="#tools">Tools</a><a href="#about">About</a></nav><div className="top-actions"><button className="history-button" onClick={() => setShowHistory((current) => !current)}>↺ <span>History</span></button><button className="theme-button" onClick={() => setIsDark((current) => !current)} aria-label="Toggle theme">{isDark ? '☀' : '◐'}</button></div></header>
      <main id="top">
        <section className="hero"><div className="hero-copy"><span className="eyebrow">Your intelligent science reference</span><h1>Every formula you need.<br /><span>One place.</span></h1><p>Explore essential formulas in mathematics, physics, engineering, chemistry, statistics, and finance. Understand them, then calculate your answer instantly.</p><div className="hero-stats"><span><b>{String(formulas.length).padStart(2, '0')}</b> formulas</span><span><b>06</b> disciplines</span><span><b>∞</b> ways to learn</span></div></div><div className="hero-art" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="formula-orb">π<br /><small>F = ma</small></div><span className="floating-chip chip-one">∫ f(x) dx</span><span className="floating-chip chip-two">Δ = b² − 4ac</span></div></section>
        <section className="workspace" id="library"><div className="section-heading"><div><span className="section-kicker">Explore and learn</span><h2>Formula library</h2></div><span className="count-badge">{filteredFormulas.length} formulas</span></div><div className="toolbar"><label className="search-box"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a formula, concept, or symbol..." aria-label="Search formulas" />{query && <button onClick={() => setQuery('')} aria-label="Clear search">×</button>}</label><div className="category-tabs">{categories.map((item) => <button key={item} className={category === item ? 'selected' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div></div>
          <div className="content-grid"><FormulaLibrary formulas={filteredFormulas} selectedId={selectedFormula.id} onSelect={selectFormula} icons={icons} /><CalculatorPanel formula={selectedFormula} icon={icons[selectedFormula.category]} isFavorite={isFavorite} onToggleFavorite={toggleFavorite} values={values} onValueChange={handleValueChange} onCalculate={calculate} result={result} error={error} formattedResult={formattedResult} diagram={diagram} /></div></section>
        <ToolsPanel quiz={quiz} quizAnswer={quizAnswer} setQuizAnswer={setQuizAnswer} quizMessage={quizMessage} setQuizMessage={setQuizMessage} startQuiz={startQuiz} converter={converter} setConverter={setConverter} unitDefinitions={unitDefinitions} convertValue={convertValue} />
        <HistoryPanel history={history} showHistory={showHistory} onClear={clearHistory} />
        <section className="about-section" id="about"><span className="section-kicker">Built for curious minds</span><h2>Understand the formula, not just the answer.</h2><p>FormulaHub helps you move from theory to practice with a clear reference and a simple calculator for every formula.</p></section>
      </main><footer><span>FormulaHub © 2026</span><span>Made for learning and discovery</span></footer>
    </div>
  )
}

export default App
