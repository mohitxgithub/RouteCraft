'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function Footer() {
  const { theme } = useTheme()

  return (
    <footer className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} py-12`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-primary-400' : 'text-primary-600'}`}>RouteCraft</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Crafting unforgettable journeys, one itinerary at a time.</p>
          </div>
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-primary-400' : 'text-primary-600'}`}>Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="#" className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'} transition duration-300`}>Home</Link></li>
              <li><Link href="#features" className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'} transition duration-300`}>Features</Link></li>
              <li><Link href="#destinations" className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'} transition duration-300`}>Destinations</Link></li>
              <li><Link href="#testimonials" className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'} transition duration-300`}>Testimonials</Link></li>
            </ul>
          </div>
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-primary-400' : 'text-primary-600'}`}>Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className={`w-5 h-5 mr-2 ${theme === 'dark' ? 'text-primary-400' : 'text-primary-600'}`} />
                <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>info@routecraft.com</span>
              </li>
              <li className="flex items-center">
                <Phone className={`w-5 h-5 mr-2 ${theme === 'dark' ? 'text-primary-400' : 'text-primary-600'}`} />
                <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <MapPin className={`w-5 h-5 mr-2 ${theme === 'dark' ? 'text-primary-400' : 'text-primary-600'}`} />
                <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>123 Travel Street, Journey City, TC 12345</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-primary-400' : 'text-primary-600'}`}>Follow Us</h4>
            <div className="flex space-x-4">
              <Link href="#" className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'} transition duration-300`}>
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="#" className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'} transition duration-300`}>
                <Twitter className="w-6 h-6" />
              </Link>
              <Link href="#" className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'} transition duration-300`}>
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="#" className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'} transition duration-300`}>
                <Linkedin className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className={`mt-8 pt-8 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>&copy; {new Date().getFullYear()} RouteCraft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

