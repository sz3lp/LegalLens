import React from 'react'

export default function Loader() {
  return (
    <div className="flex items-center space-x-2" role="status" aria-label="Loading">
      <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
      <span>Processing...</span>
    </div>
  )
}
