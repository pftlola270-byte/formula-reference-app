import { useState } from "react"
const formulas = [
  { id: 1, name: "Newton", category: "Physics", formula: "F = m x g" },
  { id: 2, name: "Circle", category: "Math", formula: "A = pi x r2" },
  { id: 3, name: "Ohm", category: "Physics", formula: "V = I x R" }
]
function App() {
  const [search, setSearch] = useState("")
  const filtered = formulas.filter(f => f.name.includes(search))
  return (
    <div style={{ padding: "20px" }}>
      <h1>Formula Reference App</h1>
      <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: "10px", width: "100%" }} />
      {filtered.map(f => (
        <div key={f.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "15px" }}>
          <h3>{f.name}</h3>
          <p style={{ color: "blue" }}>{f.formula}</p>
        </div>
      ))}
    </div>
  )
}
export default App
