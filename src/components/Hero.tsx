'use client'

import { useState, useEffect } from 'react'
import TripPlannerForm from './TripPlannerForm'
import ItineraryDisplay from './ItineraryDisplay'
import { motion } from 'framer-motion'

export default function Hero() {
  const [showModal, setShowModal] = useState(false)
  const [itinerary, setItinerary] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  //const [currentImageIndex, setCurrentImageIndex] = useState(0)

  //const images = [
  //  '/hero-image-1.jpg',
  //  '/hero-image-2.jpg',
  //  '/hero-image-3.jpg',
  //]

  //useEffect(() => {
  //  const interval = setInterval(() => {
  //    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  //  }, 5000)

  //  return () => clearInterval(interval)
  //}, [])

  const handleFormSubmit = async (formData: any) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (!response.ok) {
        throw new Error('Failed to generate itinerary')
      }
      const data = await response.json()
      setItinerary(data)
    } catch (error) {
      console.error('Error generating itinerary:', error)
      alert('Failed to generate itinerary. Please try again.')
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
      >
        <source src="/image/13132-245530642_small.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/*{images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={`Hero background ${index + 1}`}
          layout="fill"
          objectFit="cover"
          className={`transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}*/}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
      <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Craft Your Perfect Journey
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover the world with personalized travel itineraries tailored to your dreams and preferences
        </motion.p>
        <motion.button
          onClick={() => setShowModal(true)}
          className="bg-secondary-500 text-primary-800 px-8 py-4 rounded-full text-lg font-semibold hover:bg-secondary-400 transition duration-300 shadow-lg transform hover:scale-105"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Start Planning Your Adventure
        </motion.button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6">
              <button
                onClick={() => {
                  setShowModal(false)
                  setItinerary(null)
                }}
                className="float-right text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                &times;
              </button>
              {itinerary ? (
                <ItineraryDisplay itinerary={itinerary} onClose={() => {
                  setShowModal(false)
                  setItinerary(null)
                }} isLoading={isLoading} />
              ) : (
                <TripPlannerForm onSubmit={handleFormSubmit} />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}

