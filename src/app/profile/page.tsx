'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, MapPin, Calendar, Settings } from 'lucide-react'

export default function ProfilePage() {
  const [user, setUser] = useState<{ username: string; email: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push('/')
    }
  }, [router])

  const handleSignOut = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-primary-500 rounded-full p-3">
              <User className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{user.username}</h1>
              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary-500" />
                Favorite Destinations
              </h2>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                <li>Paris, France</li>
                <li>Tokyo, Japan</li>
                <li>New York City, USA</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary-500" />
                Upcoming Trips
              </h2>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                <li>Bali, Indonesia - June 2023</li>
                <li>Rome, Italy - September 2023</li>
              </ul>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-primary-500" />
              Account Settings
            </h2>
            <button className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition duration-300 mr-4">
              Edit Profile
            </button>
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

