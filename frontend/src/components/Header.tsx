import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { Link } from 'react-router-dom'

export default function Header() {
  const handleLogout = async () => {
    await signOut(auth)
  }

  return (
    <div className="flex items-center justify-between p-4 border-b mb-4">
      <Link to="/" className="font-bold text-xl">LegalLens</Link>
      <div className="space-x-4">
        <Link to="/pricing">Pricing</Link>
        <button onClick={handleLogout} className="text-sm text-red-500">Logout</button>
      </div>
    </div>
  )
}
