'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, DollarSign, Users, Baby } from 'lucide-react'

const destinations = [
  "Mumbai", "Paris", "Tokyo", "New York", "London", "Los Angeles", "Dubai", "Sydney", "Rome", "Berlin",
]

export default function TripPlannerForm() {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    children: 0,
    budget: 1000,
    travelStyle: 'balanced',
  })

  const [suggestions, setSuggestions] = useState<string[]>([])
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number>(-1)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === 'destination') {
      if (value.trim() === '') {
        setSuggestions([])
        return
      }

      const filteredSuggestions = Array.from(new Set(destinations.filter((destination) =>
        destination.toLowerCase().startsWith(value.toLowerCase())
      ))).sort()

      setSuggestions(filteredSuggestions)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setFormData((prev) => ({ ...prev, destination: suggestion }))
    setSuggestions([])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' && selectedSuggestionIndex < suggestions.length - 1) {
      setSelectedSuggestionIndex((prev) => prev + 1)
    } else if (e.key === 'ArrowUp' && selectedSuggestionIndex > 0) {
      setSelectedSuggestionIndex((prev) => prev - 1)
    } else if (e.key === 'Enter' && selectedSuggestionIndex >= 0) {
      handleSuggestionClick(suggestions[selectedSuggestionIndex])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const itineraryData = {
      ...formData,
      detailedPlan: `
        Destination: ${formData.destination}
        Start Date: ${formData.startDate}
        End Date: ${formData.endDate}
        Travelers: ${formData.travelers} adults, ${formData.children} children
        Budget: $${formData.budget} per person
        Suggested Activities:
          - Day 1: City Tour and Welcome Dinner
          - Day 2: Adventure or Cultural Experience
          - Day 3: Leisure and Shopping
      `,
    }

    router.push(`/ItineraryPage?data=${encodeURIComponent(JSON.stringify(itineraryData))}`)
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-black mb-6">Plan Your Dream Trip</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
            Where do you want to go?
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="e.g., Paris, Tokyo, New York"
          />
          {suggestions.length > 0 && (
            <ul className="mt-2 border border-gray-300 rounded-md bg-white shadow-lg max-h-40 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`px-3 py-2 cursor-pointer ${index === selectedSuggestionIndex ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-1">Number of Adults</label>
            <input
              type="number"
              id="travelers"
              name="travelers"
              value={formData.travelers}
              onChange={handleInputChange}
              min="1"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div>
            <label htmlFor="children" className="block text-sm font-medium text-gray-700 mb-1">Number of Children</label>
            <input
              type="number"
              id="children"
              name="children"
              value={formData.children}
              onChange={handleInputChange}
              min="0"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
        </div>
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Budget (per person): ${formData.budget}</label>
          <input
            type="range"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            min="100"
            max="10000"
            step="100"
            className="w-full"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 text-lg font-semibold shadow-md"
        >
          Generate My Itinerary
        </button>
      </form>
    </div>
  )
}
