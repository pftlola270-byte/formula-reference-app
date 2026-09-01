export interface FormulaSource {
  title: string
  organization: string
  url: string
  chapter?: string
  section?: string
  verified: boolean
  rationale: string
}

export interface FormulaVariable {
  key: string
  label: string
  unit: string
  min?: number
  max?: number
  integer?: boolean
}

export interface Formula {
  id: number
  name: string
  symbol: string
  category: 'Math' | 'Physics' | 'Engineering' | 'Chemistry' | 'Statistics' | 'Finance'
  description: string
  variables: FormulaVariable[]
  calculate: (values: Record<string, string | number>) => number | number[] | null
  resultLabel: string
  resultUnit: string
  meaning: string
  assumptions: string
  example: string
  relatedFormulas: string[]
  source: FormulaSource | string
  difficulty: string
}
