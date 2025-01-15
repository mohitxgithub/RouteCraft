'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { User } from 'lucide-react'

interface UserProfileProps {
  onSignOut: () => void
}

export default function UserProfile({ onSignOut }: UserProfileProps) {
  const [user, setUser] = useState<{ username: string; email: string } | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  if (!user) return null

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white"
      >
        <User className="w-6 h-6" />
        <span>{user.username}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl p-2">
          <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded">
            Profile
          </Link>
          <button
            onClick={() => {
              onSignOut()
              setIsOpen(false)
            }}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  )
}

