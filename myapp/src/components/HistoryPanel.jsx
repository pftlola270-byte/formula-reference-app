export function HistoryPanel({ t, history, showHistory, onClear }) {
  if (!showHistory) return null
  return <section className="history-panel"><div className="section-heading"><div><span className="section-kicker">{t.activity}</span><h2>{t.calculationHistory}</h2></div><button type="button" className="clear-history" onClick={onClear}>{t.clearHistory}</button></div>{history.length ? <div className="history-list">{history.map((item) => <div key={item.id}><span>{item.formula}<small>{item.symbol}</small></span><b>{item.result}</b><time>{item.time}</time></div>)}</div> : <p className="empty-history">{t.emptyHistory}</p>}</section>
}
