import React, { useState } from 'react'
import { Clause, explainClause, reanalyzeClause, Explanation } from '../lib/api'
import TLDRSidebar, { ClauseSummary } from './TLDRSidebar'
import ExportButton from './ExportButton'
import Loader from './Loader'

export default function ClauseViewer({ clauses }: { clauses: Clause[] }) {
  const [explanations, setExplanations] = useState<Record<number, string>>({})
  const [summaries, setSummaries] = useState<Record<number, ClauseSummary>>({})
  const [tones, setTones] = useState<Record<number, string>>({})
  const [showSidebar, setShowSidebar] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return false
    return true
  })

  const handleExplain = async (cl: Clause) => {
    setExplanations(prev => ({ ...prev, [cl.id]: '__loading__' }))
    const resp = await explainClause(cl.text)
    setExplanations(prev => ({ ...prev, [cl.id]: resp.explanation }))
    setSummaries(prev => ({
      ...prev,
      [cl.id]: {
        id: cl.id,
        briefSummary: resp.briefSummary || '',
        tags: resp.tags || [],
        severity: resp.severity || 1,
      },
    }))
  }

  const handleToneChange = async (cl: Clause, tone: string) => {
    setTones(prev => ({ ...prev, [cl.id]: tone }))
    setExplanations(prev => ({ ...prev, [cl.id]: '__loading__' }))
    const resp = await reanalyzeClause(cl.id, cl.text, tone)
    setExplanations(prev => ({ ...prev, [cl.id]: resp.explanation }))
  }

  return (
    <div className="flex">
      <div className="flex-1 space-y-4 overflow-y-auto max-h-[70vh] p-2">
        <button
          className="md:hidden mb-2 text-sm text-blue-500 focus:outline-blue-700"
          onClick={() => setShowSidebar(!showSidebar)}
          aria-label="Toggle summaries sidebar"
        >
          {showSidebar ? 'Hide Summary' : 'Show Summary'}
        </button>
        {clauses.map(cl => (
          <div key={cl.id} className="border p-2 rounded bg-white">
            <p>{cl.text}</p>
            <div className="mt-2 flex items-center space-x-2">
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded focus:outline-blue-700"
                onClick={() => handleExplain(cl)}
                aria-label={`Explain clause ${cl.id}`}
              >
                Explain
              </button>
              <select
                className="border p-1 rounded focus:outline-blue-700"
                value={tones[cl.id] || 'Plain'}
                onChange={e => handleToneChange(cl, e.target.value)}
                aria-label={`Tone for clause ${cl.id}`}
              >
                <option value="Plain">Plain</option>
                <option value="Friendly">Friendly</option>
                <option value="Formal">Formal</option>
              </select>
            </div>
            {explanations[cl.id] === '__loading__' ? (
              <Loader />
            ) : (
              explanations[cl.id] && (
                <p className="mt-1 text-sm text-gray-600">{explanations[cl.id]}</p>
              )
            )}
          </div>
        ))}
        <ExportButton
          clauses={clauses}
          explanations={explanations}
          summaries={summaries}
          tones={tones}
        />
      </div>
      {showSidebar && <TLDRSidebar summaries={Object.values(summaries)} />}
    </div>
  )
}
