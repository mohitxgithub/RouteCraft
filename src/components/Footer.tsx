import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">RouteCraft</h3>
            <p className="text-gray-400">Crafting unforgettable journeys, one itinerary at a time.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-gray-400 hover:text-white">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-gray-400 hover:text-white">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-gray-400 hover:text-white">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@routecraft.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Travel Street, Journey City, TC 12345</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                Facebook
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                Twitter
              </Link>
              <Link
                href="https://www.instagram.com/routecraft24/"
                target="_blank"
                className="text-gray-400 hover:text-white"
              >
                Instagram
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} RouteCraft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
