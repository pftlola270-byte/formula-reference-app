import { formulaRegistry as formulas } from './data/formulaRegistry'
import { categories, convertUnits, icons, unitDefinitions } from './data/units'
import { validateFormulaInputs } from './lib/validation'
import { calculateFormula } from './lib/calculationEngine'
import { CalculatorPanel } from './components/CalculatorPanel'
import { FormulaLibrary } from './components/FormulaLibrary'
import { ToolsPanel } from './components/Tools'
import { HistoryPanel } from './components/HistoryPanel'
import { useMemo, useState } from 'react'
import { useLanguage } from './i18n'
import { localizeFormula } from './formulaTranslations'
import { useFavorites, useHistory } from './hooks/usePersistedLists'

const diagramFor = (formula) => formula.id === 2 || formula.id === 3 ? 'circle' : formula.id === 4 ? 'triangle' : formula.id === 11 ? 'force' : null

function App() {
  const { language, setLanguage, t } = useLanguage()
  const localizedFormulas = useMemo(() => formulas.map((formula) => localizeFormula(formula, language)), [language])
  const nextLanguage = language === 'en' ? 'ar' : language === 'ar' ? 'fr' : 'en'
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

  const filteredFormulas = useMemo(() => localizedFormulas.filter((formula) => {
    const searchable = `${formula.name} ${formula.description} ${formula.symbol} ${formula.category}`.toLowerCase()
    return (category === 'All' || formula.category === category) && searchable.includes(query.toLowerCase())
  }), [category, query, localizedFormulas])
  const selectedFormula = localizedFormulas.find((formula) => formula.id === selectedId) || localizedFormulas[0]
  const isFavorite = favorites.includes(selectedFormula.id)

  const selectFormula = (id) => { setSelectedId(id); setResult(null); setError(''); setValues({}) }
  const handleValueChange = (variable, value) => { const next = { ...values, [variable.key]: value }; setValues(next); setError(''); setResult(null); if (selectedFormula.variables.every(({ key }) => next[key] !== undefined && next[key] !== '')) { const validationError = validateFormulaInputs(selectedFormula, next); if (!validationError) { const live = selectedFormula.calculate(next); if (live !== null && !Number.isNaN(live)) setResult(live) } } }
  const calculate = () => {
    setError('')
    const calculation = calculateFormula({ ...selectedFormula, validate: (input) => validateFormulaInputs(selectedFormula, input) }, values)
    if (!calculation.success) { setError(calculation.error.code === 'INVALID_INPUT' ? t.fillFields : t.invalidResult); setResult(null); return }
    setResult(calculation.result)
    addHistory(selectedFormula, calculation.result)
  }
  const formattedResult = Array.isArray(result) ? result.map((item) => item.toFixed(3)).join('  or  ') : Number(result).toLocaleString('en-US', { maximumFractionDigits: 4 })
  const diagram = diagramFor(selectedFormula)
  const convertValue = converter.amount === '' ? '' : convertUnits(converter.amount, converter.from, converter.to)
  const startQuiz = () => { const candidates = localizedFormulas.filter((item) => item.id !== 7); const item = candidates[Math.floor(Math.random() * candidates.length)]; const quizValues = Object.fromEntries(item.variables.map((variable, index) => [variable.key, String(index + 2)])); setQuiz({ formula: item, answer: item.calculate(quizValues), values: quizValues }); setQuizAnswer(''); setQuizMessage('') }

  return (
    <div className={isDark ? 'app dark' : 'app'}>
      <header className="topbar"><a className="brand" href="#top"><span className="brand-mark">∑</span><span><strong>Formula</strong><em>Hub</em></span></a><nav className="nav-links"><a className="active" href="#library">{t.library}</a><a href="#calculator">{t.calculator}</a><a href="#tools">{t.tools}</a><a href="#about">{t.about}</a></nav><div className="top-actions"><button className="history-button" onClick={() => setShowHistory((current) => !current)}>↺ <span>{t.history}</span></button><button className="language-button" type="button" onClick={() => setLanguage(nextLanguage)} aria-label={`${t.language}: ${nextLanguage === 'en' ? t.english : nextLanguage === 'ar' ? t.arabic : 'Français'}`}>{nextLanguage === 'en' ? 'EN' : nextLanguage === 'ar' ? 'عربي' : 'FR'}</button><button className="theme-button" onClick={() => setIsDark((current) => !current)} aria-label={t.toggleTheme}>{isDark ? '☀' : '◐'}</button></div></header>
      <main id="top">
        <section className="hero"><div className="hero-copy"><span className="eyebrow">{t.heroEyebrow}</span><h1>{t.heroTitle}<br /><span>{t.heroTitleAccent}</span></h1><p>{t.heroDescription}</p><div className="hero-stats"><span><b>{String(formulas.length).padStart(2, '0')}</b> {t.formulas}</span><span><b>06</b> {t.disciplines}</span><span><b>∞</b> {t.waysToLearn}</span></div></div><div className="hero-art" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="formula-orb">π<br /><small>F = ma</small></div><span className="floating-chip chip-one">∫ f(x) dx</span><span className="floating-chip chip-two">Δ = b² − 4ac</span></div></section>
        <section className="workspace" id="library"><div className="section-heading"><div><span className="section-kicker">{t.explore}</span><h2>{t.formulaLibrary}</h2></div><span className="count-badge">{filteredFormulas.length} {t.formulas}</span></div><div className="toolbar"><label className="search-box"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} aria-label={t.searchLabel} />{query && <button onClick={() => setQuery('')} aria-label={t.clearSearch}>×</button>}</label><div className="category-tabs">{categories.map((item) => <button key={item} className={category === item ? 'selected' : ''} onClick={() => setCategory(item)}>{t.category(item)}</button>)}</div></div>
          <div className="content-grid"><FormulaLibrary formulas={filteredFormulas} t={t} selectedId={selectedFormula.id} onSelect={selectFormula} icons={icons} /><CalculatorPanel formula={selectedFormula} t={t} icon={icons[selectedFormula.category]} isFavorite={isFavorite} onToggleFavorite={toggleFavorite} values={values} onValueChange={handleValueChange} onCalculate={calculate} result={result} error={error} formattedResult={formattedResult} diagram={diagram} /></div></section>
        <ToolsPanel t={t} quiz={quiz} quizAnswer={quizAnswer} setQuizAnswer={setQuizAnswer} quizMessage={quizMessage} setQuizMessage={setQuizMessage} startQuiz={startQuiz} converter={converter} setConverter={setConverter} unitDefinitions={unitDefinitions} convertValue={convertValue} />
        <HistoryPanel t={t} history={history} showHistory={showHistory} onClear={clearHistory} />
        <section className="about-section" id="about"><span className="section-kicker">{t.builtFor}</span><h2>{t.understand}</h2><p>{t.aboutText}</p></section>
      </main><footer><span>FormulaHub © 2026</span><span>{t.madeFor}</span></footer>
    </div>
  )
}

export default App
