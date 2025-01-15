'use client'

import React from 'react'
import { Lightbulb, DollarSign, Camera, Utensils, Compass, Globe } from 'lucide-react'
import { motion } from 'framer-motion'

const tips = [
  { 
    icon: <Lightbulb className="w-12 h-12 text-yellow-500" />, 
    tip: 'Research local customs and etiquette',
    description: 'Understanding local customs helps you respect the culture and avoid unintentional offenses.'
  },
  { 
    icon: <DollarSign className="w-12 h-12 text-green-500" />, 
    tip: 'Set a realistic budget and track expenses',
    description: 'A well-planned budget ensures you can enjoy your trip without financial stress.'
  },
  { 
    icon: <Camera className="w-12 h-12 text-blue-500" />, 
    tip: 'Capture memories, but don\'t forget to live in the moment',
    description: 'While photos are great, make sure to fully experience your surroundings.'
  },
  { 
    icon: <Utensils className="w-12 h-12 text-red-500" />, 
    tip: 'Try local cuisine for an authentic experience',
    description: 'Food is a gateway to culture. Don\'t be afraid to try new dishes!'
  },
  { 
    icon: <Compass className="w-12 h-12 text-purple-500" />, 
    tip: 'Be open to unexpected adventures',
    description: 'Some of the best travel experiences are unplanned. Stay flexible and embrace spontaneity.'
  },
  { 
    icon: <Globe className="w-12 h-12 text-indigo-500" />, 
    tip: 'Learn a few phrases in the local language',
    description: 'Even basic greetings can go a long way in connecting with locals and showing respect.'
  },
]

const TravelTips: React.FC = () => {
  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary-600 dark:text-primary-400"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Travel Tips for Your Journey
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <motion.div 
              key={index} 
              className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-4">{tip.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-primary-600 dark:text-primary-400">{tip.tip}</h3>
              <p className="text-gray-600 dark:text-gray-300">{tip.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TravelTips

