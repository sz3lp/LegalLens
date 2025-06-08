import React from 'react'

export interface Clause {
  text: string
  explanation: string
  tags?: string[]
  severity?: number
}

export default function ClauseCard({ clause }: { clause: Clause }) {
  return (
    <div className="border p-2 rounded bg-white">
      <p className="font-medium">{clause.text}</p>
      <p className="text-sm text-gray-600 mt-1">{clause.explanation}</p>
    </div>
  )
}
