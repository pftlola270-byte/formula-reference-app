import { useState } from 'react'
import { loadStorage, saveStorage } from '../lib/storage'

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => loadStorage('formula-favorites', []))
  const toggleFavorite = (id) => setFavorites((current) => {
    const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    saveStorage('formula-favorites', next)
    return next
  })
  return { favorites, toggleFavorite }
}

export function useHistory() {
  const [history, setHistory] = useState(() => loadStorage('formula-history', []))
  const addHistory = (formula, calculated) => {
    const item = {
      id: Date.now(),
      formula: formula.name,
      symbol: formula.symbol,
      result: Array.isArray(calculated) ? calculated.join(' or ') : Number(calculated).toFixed(3),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    const next = [item, ...history].slice(0, 12)
    setHistory(next)
    saveStorage('formula-history', next)
  }
  const clearHistory = () => {
    setHistory([])
    try { localStorage.removeItem('formula-history') } catch { /* no-op */ }
  }
  return { history, addHistory, clearHistory }
}
