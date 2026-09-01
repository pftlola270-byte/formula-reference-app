export function FormulaDiagram({ type }) {
  if (!type) return null
  return <div className={`formula-diagram ${type}`} aria-hidden="true">
    {type === 'circle' && <><span className="diagram-radius">r</span><div className="diagram-circle" /></>}
    {type === 'triangle' && <><span className="diagram-base">b</span><span className="diagram-height">h</span><div className="diagram-triangle" /></>}
    {type === 'force' && <><span className="force-arrow">F →</span><div className="diagram-block">m</div></>}
  </div>
}
