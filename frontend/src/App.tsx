import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UploadPage from './pages/Upload'
import ClauseViewer from './components/ClauseViewer'
import Login from './pages/Login'
import Pricing from './pages/Pricing'
import Header from './components/Header'
import RequireAuth from './components/RequireAuth'
import { Clause } from './lib/api'

export default function App() {
  const [clauses, setClauses] = useState<Clause[]>([])

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <UploadPage onComplete={setClauses} />
            </RequireAuth>
          }
        />
        <Route
          path="/view"
          element={
            <RequireAuth>
              <ClauseViewer clauses={clauses} />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
