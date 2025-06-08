import React, { useState } from 'react'
import { uploadPDF, Clause } from '../lib/api'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'

interface Props {
  onComplete: (clauses: Clause[]) => void
}

export default function Upload({ onComplete }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    const clauses = await uploadPDF(file)
    onComplete(clauses)
    setLoading(false)
    navigate('/view')
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  return (
    <div className="p-4 space-y-4">
      <div
        onDragOver={e => e.preventDefault()}
        onDrop={onDrop}
        className="border-dashed border-2 border-gray-400 p-6 text-center"
      >
        Drag PDF here or
        <input
          type="file"
          accept="application/pdf"
          onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
          className="block mx-auto mt-2"
        />
      </div>
      <button
        onClick={handleUpload}
        className="px-4 py-1 bg-blue-500 text-white rounded focus:outline-blue-700"
        disabled={loading}
        aria-label="Upload PDF"
      >
        {loading ? <Loader /> : 'Upload'}
      </button>
    </div>
  )
}
