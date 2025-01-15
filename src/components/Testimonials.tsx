'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    name: 'Swara Patil',
    role: 'Adventure Enthusiast',
    image: '/testimonial-1.jpg',
    quote: 'RouteCraft made planning my backpacking trip across Europe a breeze. The customized itinerary was perfect!'
  },
  {
    name: 'Mohit Kattungal',
    role: 'Business Traveler',
    image: '/image/image-400x400.jpg',
    quote: 'As a frequent business traveler, RouteCraft has saved me countless hours of planning. Highly recommended!'
  },
  {
    name: 'Adarsh Singh',
    role: 'Couple Traveler',
    image: '/image/image-400x400 (2).jpg',
    quote: 'Routecraft made my itinerary in best way , because of routecraft I was able to spend my Honeymoon with my only friend Prem Kakade in best way ,Thanks Routecraft!!!'
  },
  {
    name: 'Alex Patel',
    role: 'Solo Traveler',
    image: '/testimonial-4.jpg',
    quote: 'RouteCraft helped me discover hidden gems I never would have found on my own. It made my solo trip unforgettable!'
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary-600 dark:text-primary-400">
          What Our Travelers Say
        </h2>
        <div className="relative h-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg flex items-center">
                <Image
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  width={100}
                  height={100}
                  className="rounded-full mr-6"
                />
                <div>
                  <p className="text-lg italic mb-4 text-gray-700 dark:text-gray-300">
                    "{testimonials[currentIndex].quote}"
                  </p>
                  <p className="font-semibold text-primary-600 dark:text-primary-400">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

