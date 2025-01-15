'use client'

import { MapPin, Hotel, Calendar, Compass, Globe, Camera } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: <MapPin className="w-12 h-12 text-secondary-500" />,
    title: 'Customized Itineraries',
    description: 'Tailor-made travel plans based on your preferences and interests.'
  },
  {
    icon: <Hotel className="w-12 h-12 text-secondary-500" />,
    title: 'Exclusive Accommodations',
    description: 'Hand-picked hotels and unique stays for unforgettable experiences.'
  },
  {
    icon: <Calendar className="w-12 h-12 text-secondary-500" />,
    title: 'Flexible Scheduling',
    description: 'Easily adjust your plans on-the-go with our dynamic scheduling.'
  },
  {
    icon: <Compass className="w-12 h-12 text-secondary-500" />,
    title: 'Expert Local Guides',
    description: 'Connect with knowledgeable guides for insider experiences.'
  },
  {
    icon: <Globe className="w-12 h-12 text-secondary-500" />,
    title: 'Global Destinations',
    description: 'Explore a wide range of carefully curated destinations worldwide.'
  },
  {
    icon: <Camera className="w-12 h-12 text-secondary-500" />,
    title: 'Memorable Experiences',
    description: 'Create lasting memories with unique and authentic activities.'
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary-600 dark:text-primary-400"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Why Choose RouteCraft?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-center text-primary-600 dark:text-primary-400">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

