'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Calendar, MapPin, Briefcase, Globe, Camera, Edit } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from './ThemeProvider'

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
  user: { username: string; email: string; gender: string; avatar: string }
  onSignOut: () => void
}

export default function ProfileModal({ isOpen, onClose, user, onSignOut }: ProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user)
  const { theme } = useTheme()

  const handleSave = () => {
    // Here you would typically send the updated user data to your backend
    // For now, we'll just update the local storage
    localStorage.setItem('user', JSON.stringify(editedUser))
    setIsEditing(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} p-8 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={`text-3xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-primary-400' : 'text-primary-600'}`}>Your Profile</h2>
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="w-40 h-40 relative">
                <Image
                  src={user.avatar || "/placeholder.svg"}
                  alt="Profile Avatar"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
                <button className={`absolute bottom-0 right-0 ${theme === 'dark' ? 'bg-primary-600' : 'bg-primary-500'} text-white p-2 rounded-full`}>
                  <Camera size={20} />
                </button>
              </div>
              <div className="flex-grow space-y-4">
                <div className="flex items-center space-x-4">
                  <User className={`w-6 h-6 ${theme === 'dark' ? 'text-primary-400' : 'text-primary-500'}`} />
                  <div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Username</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser.username}
                        onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                        className={`font-semibold ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} px-2 py-1 rounded`}
                      />
                    ) : (
                      <p className="font-semibold">{user.username}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className={`w-6 h-6 ${theme === 'dark' ? 'text-primary-400' : 'text-primary-500'}`} />
                  <div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Email</p>
                    <p className="font-semibold">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Calendar className={`w-6 h-6 ${theme === 'dark' ? 'text-primary-400' : 'text-primary-500'}`} />
                  <div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Member Since</p>
                    <p className="font-semibold">January 2023</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className={`w-6 h-6 ${theme === 'dark' ? 'text-primary-400' : 'text-primary-500'}`} />
                  <div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Location</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser.location || ''}
                        onChange={(e) => setEditedUser({ ...editedUser, location: e.target.value })}
                        className={`font-semibold ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} px-2 py-1 rounded`}
                        placeholder="Enter your location"
                      />
                    ) : (
                      <p className="font-semibold">{user.location || 'Not specified'}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Briefcase className={`w-6 h-6 ${theme === 'dark' ? 'text-primary-400' : 'text-primary-500'}`} />
                  <div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Occupation</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser.occupation || ''}
                        onChange={(e) => setEditedUser({ ...editedUser, occupation: e.target.value })}
                        className={`font-semibold ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} px-2 py-1 rounded`}
                        placeholder="Enter your occupation"
                      />
                    ) : (
                      <p className="font-semibold">{user.occupation || 'Not specified'}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Globe className={`w-6 h-6 ${theme === 'dark' ? 'text-primary-400' : 'text-primary-500'}`} />
                  <div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Favorite Destination</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser.favoriteDestination || ''}
                        onChange={(e) => setEditedUser({ ...editedUser, favoriteDestination: e.target.value })}
                        className={`font-semibold ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} px-2 py-1 rounded`}
                        placeholder="Enter your favorite destination"
                      />
                    ) : (
                      <p className="font-semibold">{user.favoriteDestination || 'Not specified'}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className={`${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-800'} px-4 py-2 rounded-md hover:bg-opacity-80 transition duration-300`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className={`${theme === 'dark' ? 'bg-primary-600' : 'bg-primary-500'} text-white px-4 py-2 rounded-md hover:bg-opacity-80 transition duration-300`}
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={onClose}
                    className={`${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-800'} px-4 py-2 rounded-md hover:bg-opacity-80 transition duration-300`}
                  >
                    Close
                  </button>
                  <button
                    onClick={() => setIsEditing(true)}
                    className={`${theme === 'dark' ? 'bg-primary-600' : 'bg-primary-500'} text-white px-4 py-2 rounded-md hover:bg-opacity-80 transition duration-300`}
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => {
                      onSignOut()
                      onClose()
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

