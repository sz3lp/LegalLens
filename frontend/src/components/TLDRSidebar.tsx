import React, { useState } from 'react'

export interface ClauseSummary {
  id: number
  briefSummary: string
  tags: string[]
  severity: number
}

export default function TLDRSidebar({ summaries }: { summaries: ClauseSummary[] }) {
  const [expanded, setExpanded] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return new Set<number>()
    }
    return new Set(summaries.map(s => s.id))
  })
  const allExpanded = summaries.every(s => expanded.has(s.id))

  const toggleAll = () => {
    if (allExpanded) {
      setExpanded(new Set())
    } else {
      setExpanded(new Set(summaries.map(s => s.id)))
    }
  }

  const toggle = (id: number) => {
    setExpanded(prev => {
      const n = new Set(prev)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })
  }

  return (
    <div id="sidebar" className="w-64 border-l bg-gray-50 p-4 overflow-y-auto">
      <button
        onClick={toggleAll}
        className="text-sm text-blue-500 mb-4 focus:outline-blue-700"
        aria-label={allExpanded ? 'Collapse all summaries' : 'Expand all summaries'}
      >
        {allExpanded ? 'Collapse All' : 'Expand All'}
      </button>
      {summaries.map(s => (
        <div key={s.id} className="mb-2">
          <button
            className="cursor-pointer font-medium focus:outline-blue-700"
            onClick={() => toggle(s.id)}
            aria-expanded={expanded.has(s.id)}
            aria-controls={`summary-${s.id}`}
          >
            Clause {s.id}
          </button>
          {expanded.has(s.id) && (
            <div className="ml-2 text-sm" id={`summary-${s.id}`}>
              <p>{s.briefSummary}</p>
              <p className="text-xs">Tags: {s.tags.join(', ')}</p>
              <p className="text-xs">Severity: {s.severity}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
