'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Sun, Moon, User } from 'lucide-react'
import EditableLogo from './EditableLogo'
import { useTheme } from './ThemeProvider'
import AuthModal from './AuthModal'
import ProfileModal from './ProfileModal'

export default function Header() {
  const [logoColor, setLogoColor] = useState('#3B82F6')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [user, setUser] = useState<{ username: string; email: string; gender: string; avatar: string } | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  const handleAuthSuccess = (user: { username: string; email: string; gender: string; avatar: string }) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white dark:bg-gray-900 shadow-md' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <EditableLogo color={logoColor} setColor={setLogoColor} />
          <span className={`text-2xl font-bold ${isScrolled ? 'text-primary-600 dark:text-primary-400' : 'text-white'}`}>RouteCraft</span>
        </Link>
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="#features" className={`${isScrolled ? 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400' : 'text-white hover:text-secondary-300'} transition duration-300`}>Features</Link>
          <Link href="#destinations" className={`${isScrolled ? 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400' : 'text-white hover:text-secondary-300'} transition duration-300`}>Destinations</Link>
          <Link href="#testimonials" className={`${isScrolled ? 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400' : 'text-white hover:text-secondary-300'} transition duration-300`}>Testimonials</Link>
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className={`flex items-center space-x-2 ${isScrolled ? 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400' : 'text-white hover:text-secondary-300'} transition duration-300`}
              >
                <User className="w-5 h-5" />
                <span>{user.username}</span>
              </button>
              <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                user={user}
                onSignOut={handleSignOut}
              />
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className={`${isScrolled ? 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400' : 'text-white hover:text-secondary-300'} transition duration-300`}
            >
              Sign In / Sign Up
            </button>
          )}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${isScrolled ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white bg-opacity-20'} transition duration-300`}
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-800" />}
          </button>
          <Link href="#" className="bg-secondary-500 text-primary-800 px-6 py-2 rounded-full hover:bg-secondary-400 transition duration-300 transform hover:scale-105">
            Plan Your Trip
          </Link>
        </div>
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${isScrolled ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white bg-opacity-20'} transition duration-300`}
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-800" />}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`${isScrolled ? 'text-gray-800 dark:text-white' : 'text-white'}`}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link href="#features" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Features</Link>
            <Link href="#destinations" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Destinations</Link>
            <Link href="#testimonials" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Testimonials</Link>
            {user ? (
              <>
                <button
                  onClick={() => {
                    setIsProfileModalOpen(true)
                    setIsMenuOpen(false)
                  }}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    handleSignOut()
                    setIsMenuOpen(false)
                  }}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Log out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsAuthModalOpen(true)
                  setIsMenuOpen(false)
                }}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                Sign In / Sign Up
              </button>
            )}
            <Link href="#" className="bg-secondary-500 text-primary-800 px-4 py-2 rounded-full hover:bg-secondary-400 transition duration-300 text-center">
              Plan Your Trip
            </Link>
          </div>
        </div>
      )}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onAuthSuccess={handleAuthSuccess}
      />
    </header>
  )
}

