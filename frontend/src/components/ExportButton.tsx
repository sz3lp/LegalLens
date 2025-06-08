import React from 'react'
import { Clause } from '../lib/api'
import { ClauseSummary } from './TLDRSidebar'
import Loader from './Loader'

interface Props {
  clauses: Clause[]
  explanations: Record<number, string>
  summaries: Record<number, ClauseSummary>
  tones: Record<number, string>
}

export default function ExportButton({ clauses, explanations, summaries, tones }: Props) {
  const [loading, setLoading] = React.useState(false)
  const handleExport = () => {
    setLoading(true)
    const data = clauses.map(cl => ({
      text: cl.text,
      explanation: explanations[cl.id] || '',
      summary: summaries[cl.id]?.briefSummary || '',
      tags: summaries[cl.id]?.tags || [],
      severity: summaries[cl.id]?.severity || 1,
      tone: tones[cl.id] || 'Plain',
    }))
    const blob = new Blob([JSON.stringify({ clauses: data }, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'legallens_export.json'
    a.click()
    URL.revokeObjectURL(url)
    setLoading(false)
  }

  return (
    <button
      onClick={handleExport}
      className="px-3 py-1 bg-green-500 text-white rounded mt-4 focus:outline-blue-700"
      aria-label="Export annotations as JSON"
    >
      {loading ? <Loader /> : 'Export JSON'}
    </button>
  )
}
