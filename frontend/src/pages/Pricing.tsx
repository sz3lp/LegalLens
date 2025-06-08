import React from 'react'

export default function Pricing() {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="border p-4 rounded text-center">
        <h3 className="font-bold">Free</h3>
        <p className="text-2xl">$0</p>
        <p>3 docs/mo</p>
      </div>
      <div className="border p-4 rounded text-center">
        <h3 className="font-bold">Pro</h3>
        <p className="text-2xl">$29/mo</p>
        <p>Unlimited docs</p>
      </div>
      <div className="border p-4 rounded text-center">
        <h3 className="font-bold">Enterprise</h3>
        <p className="text-2xl">$99/mo</p>
        <p>Priority support</p>
      </div>
    </div>
  )
}
