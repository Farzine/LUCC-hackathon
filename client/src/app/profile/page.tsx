'use client'
import React from 'react'

function page() {
  return (
<div className="flex">
    <aside className="w-1/4 h-screen bg-gray-200 p-4">
        <ul>
            <li className="mb-2"><a href="#">Link 1</a></li>
            <li className="mb-2"><a href="#">Link 2</a></li>
            <li className="mb-2"><a href="#">Link 3</a></li>
        </ul>
    </aside>
    <main className="w-3/4 h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Main Section</h1>
        <p>This is the main content area.</p>
    </main>
</div>
  )
}

export default page