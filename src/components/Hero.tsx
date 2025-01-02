'use client'

import { useState } from 'react'
import Image from 'next/image'
import TripPlannerForm from './TripPlannerForm'
import ItineraryDisplay from './ItineraryDisplay'

export default function Hero() {
  const [showModal, setShowModal] = useState(false)
  const [itinerary, setItinerary] = useState(null)

  const handleFormSubmit = (generatedItinerary: any) => {
    setItinerary(generatedItinerary)
  }

  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Craft Your Perfect Journey with RouteCraft</h1>
          <p className="text-xl mb-6">Personalized travel itineraries tailored to your preferences, with seamless hotel bookings and expert trip planning.</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition duration-300"
          >
            Start Planning Now
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <Image
            src="/image/freepik__candid-image-photography-natural-textures-highly-r__2824.jpeg"
            alt="Travel Planning"
            width={400}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4">
              <button
                onClick={() => {
                  setShowModal(false)
                  setItinerary(null)
                }}
                className="float-right text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
              {itinerary ? (
                <ItineraryDisplay itinerary={itinerary} onClose={() => {
                  setShowModal(false)
                  setItinerary(null)
                }} />
              ) : (
                <TripPlannerForm onSubmit={handleFormSubmit} />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

