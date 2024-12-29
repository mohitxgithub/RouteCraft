// src/app/ItineraryPage.tsx
'use client'

import { useSearchParams } from 'next/navigation'

export default function ItineraryPage() {
  const searchParams = useSearchParams();
  const itineraryData = JSON.parse(searchParams.get('itinerary') || '{}');

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-white p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">Your Custom Itinerary</h1>
        <div className="space-y-4">
          <p><strong>Destination:</strong> {itineraryData.destination}</p>
          <p><strong>Start Date:</strong> {itineraryData.startDate}</p>
          <p><strong>End Date:</strong> {itineraryData.endDate}</p>
          <p><strong>Travelers:</strong> {itineraryData.travelers}</p>
          <p><strong>Budget:</strong> ${itineraryData.budget}</p>
          <p><strong>Travel Style:</strong> {itineraryData.travelStyle}</p>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">Detailed Itinerary:</h2>
          <div className="mt-4 bg-gray-100 p-4 rounded-lg">
            {itineraryData.detailedPlan || 'AI-generated itinerary details will appear here.'}
          </div>
        </div>
      </div>
    </div>
  )
}
