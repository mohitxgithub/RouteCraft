import React from 'react'

interface Itinerary {
  days: {
    date: string;
    activities: string[];
  }[];
  totalCost: number;
}

interface ItineraryDisplayProps {
  itinerary: Itinerary;
  onClose: () => void;
}

export default function ItineraryDisplay({ itinerary, onClose }: ItineraryDisplayProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Your Personalized Itinerary</h2>
      <div className="space-y-8">
        {itinerary.days.map((day, index) => (
          <div key={index} className="border-b pb-6 last:border-b-0">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Day {index + 1} - {day.date}</h3>
            <ul className="list-disc list-inside space-y-2">
              {day.activities.map((activity, actIndex) => (
                <li key={actIndex} className="text-gray-700">{activity}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-8 text-right">
        <p className="text-xl font-semibold text-gray-800">Total Estimated Cost: ${itinerary.totalCost.toLocaleString()}</p>
      </div>
      <div className="mt-8 flex justify-center">
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  )
}

