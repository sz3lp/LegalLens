import axios from 'axios'

export interface Clause {
  id: number
  text: string
}

export interface Explanation {
  id: number
  original: string
  explanation: string
  briefSummary?: string
  tags?: string[]
  severity?: number
}

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export async function uploadPDF(file: File): Promise<Clause[]> {
  const form = new FormData()
  form.append('file', file)
  const { data } = await axios.post(`${BASE_URL}/upload`, form)
  return data.clauses as Clause[]
}

export async function explainClause(text: string): Promise<Explanation> {
  const { data } = await axios.post(`${BASE_URL}/explain`, {
    clauses: [{ id: 1, text }],
  })
  return data.clauses[0] as Explanation
}

export async function reanalyzeClause(
  id: number,
  text: string,
  tone: string
): Promise<Explanation> {
  const { data } = await axios.post(`${BASE_URL}/reanalyze`, {
    id,
    text,
    tone,
  })
  return data as Explanation
}
