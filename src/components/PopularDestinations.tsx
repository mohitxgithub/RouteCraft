'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const destinations = [
  { name: 'Paris', image: '/image/paris.jpg', description: 'The City of Light' },
  { name: 'Tokyo', image: '/image/tokyo.jpg', description: 'Where tradition meets future' },
  { name: 'New York', image: '/image/newyork.jpg', description: 'The Big Apple' },
  { name: 'Bali', image: '/image/bali.webp', description: 'Island of the Gods' },
  { name: 'Rome', image: '/image/rome.jpg', description: 'The Eternal City' },
  { name: 'Santorini', image: '/image/santorini.jpg', description: 'Greek island paradise' },
]

export default function PopularDestinations() {
  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary-600 dark:text-primary-400"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Popular Destinations
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <motion.div 
              key={index} 
              className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={destination.image}
                alt={destination.name}
                width={600}
                height={400}
                className="w-full h-64 object-cover transition duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <h3 className="text-white text-2xl font-bold mb-2">{destination.name}</h3>
                <p className="text-white text-lg">{destination.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

