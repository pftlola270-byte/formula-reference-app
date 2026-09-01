export function HistoryPanel({ history, showHistory, onClear }) {
  if (!showHistory) return null
  return <section className="history-panel"><div className="section-heading"><div><span className="section-kicker">Your activity</span><h2>Calculation history</h2></div><button type="button" className="clear-history" onClick={onClear}>Clear history</button></div>{history.length ? <div className="history-list">{history.map((item) => <div key={item.id}><span>{item.formula}<small>{item.symbol}</small></span><b>{item.result}</b><time>{item.time}</time></div>)}</div> : <p className="empty-history">Your recent calculations will appear here.</p>}</section>
}
