'use client'

import { useState } from 'react'
import Link from 'next/link'
import EditableLogo from './EditableLogo'

export default function Header() {
  const [logoColor, setLogoColor] = useState('#3B82F6')

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <EditableLogo color={logoColor} setColor={setLogoColor} />
          <span className="text-xl font-bold text-gray-800">RouteCraft</span>
        </Link>
        <ul className="flex space-x-6">
          <li><Link href="#features" className="text-gray-600 hover:text-blue-600">Features</Link></li>
          <li><Link href="#collaborations" className="text-gray-600 hover:text-blue-600">Partners</Link></li>
          <li><Link href="#testimonials" className="text-gray-600 hover:text-blue-600">Testimonials</Link></li>
          <li><Link href="#" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Get Started</Link></li>
        </ul>
      </nav>
    </header>
  )
}

