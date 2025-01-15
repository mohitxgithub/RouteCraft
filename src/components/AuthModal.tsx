'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FcGoogle } from 'react-icons/fc'
import AvatarSelector from './AvatarSelector'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onAuthSuccess: (user: { username: string; email: string; gender: string; avatar: string }) => void
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [gender, setGender] = useState('')
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState('')

  useEffect(() => {
    if (isOpen) {
      setEmail('')
      setPassword('')
      setUsername('')
      setGender('')
      setMessage('')
      setIsSuccess(false)
      setSelectedAvatar('')
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (isSignUp) {
      // Sign up logic
      if (!username) {
        setMessage('Username is required')
        return
      }
      if (!gender) {
        setMessage('Please select your gender')
        return
      }
      if (!selectedAvatar) {
        setMessage('Please select an avatar')
        return
      }
      const newUser = { username, email, gender, avatar: selectedAvatar }
      localStorage.setItem('user', JSON.stringify(newUser))
      setMessage('Account created successfully!')
      setIsSuccess(true)
      setTimeout(() => {
        onAuthSuccess(newUser)
        onClose()
      }, 2000)
    } else {
      // Sign in logic
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
      if (storedUser.email === email || storedUser.username === email) {
        setMessage('Logged in successfully!')
        setIsSuccess(true)
        setTimeout(() => {
          onAuthSuccess(storedUser)
          onClose()
        }, 2000)
      } else {
        setMessage('Invalid credentials')
      }
    }
  }

  const handleGoogleSignIn = () => {
    // Implement Google Sign-In logic here
    console.log('Google Sign-In clicked')
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
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-center text-primary-600 dark:text-primary-400">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <>
                  <input
                    type="text"
                    placeholder="Username (e.g., JohnDoe123)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                  <div className="flex space-x-4">
                    <label className="flex items-center text-gray-800 dark:text-gray-200">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={gender === 'Male'}
                        onChange={(e) => setGender(e.target.value)}
                        className="mr-2"
                      />
                      Male
                    </label>
                    <label className="flex items-center text-gray-800 dark:text-gray-200">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={gender === 'Female'}
                        onChange={(e) => setGender(e.target.value)}
                        className="mr-2"
                      />
                      Female
                    </label>
                  </div>
                  {gender && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select an avatar:</p>
                      <AvatarSelector gender={gender} onSelect={setSelectedAvatar} />
                    </div>
                  )}
                </>
              )}
              <input
                type="email"
                placeholder="Email (e.g., john@example.com)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600"
                required
              />
              <input
                type="password"
                placeholder="Password (min. 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600"
                required
                minLength={8}
              />
              <button
                type="submit"
                className="w-full bg-primary-500 text-white py-2 rounded-md hover:bg-primary-600 transition duration-300"
              >
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </form>
            <button
              onClick={handleGoogleSignIn}
              className="w-full mt-4 bg-white text-gray-700 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-100 transition duration-300 flex items-center justify-center"
            >
              <FcGoogle className="mr-2" size={20} />
              {isSignUp ? 'Sign up with Google' : 'Sign in with Google'}
            </button>
            {message && (
              <p className={`mt-4 text-center ${isSuccess ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {message}
              </p>
            )}
            <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-1 text-primary-500 hover:underline focus:outline-none"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

