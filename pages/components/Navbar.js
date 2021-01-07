import React from 'react'

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4">
      <p className="text-2xl font-bold text-grey-800">My ToDo App</p>
      <div className="flex">
        <a
          href="/api/login"
          className="rounded text-white py-2 px-4 bg-green-500 hover:bg-green-600"
        >
          Login
        </a>
        <a
          href="/api/logout"
          className="rounded text-white py-2 px-4 bg-green-500 hover:bg-green-600"
        >
          Logout
        </a>
      </div>
    </nav>
  )
}
