'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import EditableLogo from './EditableLogo'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [logoColor, setLogoColor] = useState('#98D8D8')

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <EditableLogo color={logoColor} setColor={setLogoColor} />
            <span className="text-xl font-bold text-gray-800">RouteCraft</span>
          </Link>
          <div className="hidden md:flex space-x-6">
          <div className="flex items-center space-x-4">
    <Link href="#features" className="text-gray-600 hover:text-blue-600 ">Features</Link>
    <Link href="#how-it-works" className="text-gray-600 hover:text-blue-600">How It Works</Link>
    <Link href="#testimonials" className="text-gray-600 hover:text-blue-600">Testimonials</Link>
    <Link href="#" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 flex items-center justify-center">
    Get Started
</Link>

</div>

          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <Link href="#features" className="block py-2 text-gray-600 hover:text-blue-600 text-center">Features</Link>
            <Link href="#how-it-works" className="block py-2 text-gray-600 hover:text-blue-600 text-center">How It Works</Link>
            <Link href="#testimonials" className="block py-2 text-gray-600 hover:text-blue-600 text-center">Testimonials</Link>
            <Link href="#" className="block py-2 bg-blue-600 text-white px-4 rounded-md hover:bg-blue-600 text-center mt-2">Get Started</Link>
          </div>
        )}
      </nav>
    </header>
  )
}