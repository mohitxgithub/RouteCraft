'use client'

import { useState } from 'react'
import { Calendar, DollarSign, Users } from 'lucide-react'

const destinations = [
  "Mumbai", "Paris", "Tokyo", "New York", "London", "Los Angeles", "Dubai", "Sydney", "Rome", "Berlin",
  "Madrid", "Melbourne", "Milan", "Moscow", "Munich", "Mexico City", "Miami", "Montreal", "Manchester", "Paris", 
  "New York City", "Tokyo", "London", "Dubai", "Sydney", "Rome", "Machu Picchu", "Grand Canyon", "Christ the Redeemer", 
  "Great Wall of China", "Mount Fuji", "Santorini", "Venice", "Barcelona", "Mumbai", "Amsterdam", "Istanbul", "Reykjavik", 
  "Banff National Park", "Cape Town", "Athens", "Seoul", "Bangkok", "Los Angeles", "Berlin", "Edinburgh", "Vancouver", 
  "Rio de Janeiro", "Cairo", "Zanzibar", "Shanghai", "Kyoto", "Phuket", "Lima", "Bali", "Toronto", "Dubai Marina", 
  "Kuala Lumpur", "Mumbai", "Buenos Aires", "Petra", "Auckland", "Wellington", "Queenstown", "Milan", "Zurich", "Oslo", 
  "Montreal", "Copenhagen", "Helsinki", "St. Petersburg", "Stockholm", "Madrid", "Vienna", "Marrakech", "Cairo", 
  "Casablanca", "Sapporo", "Singapore", "Cairo", "Cape Verde", "Luxor", "Masai Mara", "Serengeti", "Zanzibar", "Hawaii", 
  "Aruba", "Tulum", "Porto", "Lisbon", "Hvar", "Lake Como", "Mont Saint-Michel", "Giza Pyramids", "Maldives", "Kyiv", 
  "Belgrade", "Lagos", "Kathmandu", "Bucharest", "Warsaw", "New Orleans", "Cape Cod", "Maui", "Amalfi Coast", "Swiss Alps", 
  "Galapagos Islands", "Antarctica Peninsula", "Dubai Desert", "Punta Cana", "Santorini", "Nairobi", "Marrakech", "Lake Baikal", 
  "Blue Lagoon (Iceland)", "Sequoia National Park", "Cappadocia", "Cochabamba", "Teotihuacan", "Nara", "Bora Bora", 
  "Kruger National Park", "Taj Mahal", "Colosseum", "Mount Everest", "Golden Temple (Amritsar)", "Uluru", "Northern Lights (Iceland)", 
  "Louvre Museum", "Sagrada Familia", "Eiffel Tower", "St. Mark's Basilica", "Mount Kilimanjaro", "Ganges River", "Victoria Falls", 
  "Neuschwanstein Castle", "Acropolis", "Mount Rushmore", "Pangong Lake", "Great Barrier Reef", "Tate Modern", "Lake Tahoe", 
  "Chichen Itza", "Galápagos Islands", "Petra", "Galway", "Brussels", "Krakow", "Granada", "Madeira", "Tbilisi", "Valencia", 
  "Lagos", "Lake Titicaca", "Hoi An", "Hoi An Ancient Town", "Sunshine Coast", "Quito", "Puebla", "Cartagena", "Yogyakarta", 
  "Córdoba", "Corcovado", "Château de Chambord", "Palawan", "Vientiane", "Riga"
]

export default function TripPlannerForm() {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: 1000,
    travelStyle: 'balanced',
  })

  const [suggestions, setSuggestions] = useState<string[]>([])
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number>(-1)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === 'destination') {
      if (value.trim() === '') {
        // Clear suggestions when the input is empty
        setSuggestions([])
        return
      }

      // Filter destinations based on user input and ensure no duplicates
      const filteredSuggestions = Array.from(new Set(destinations.filter((destination) =>
        destination.toLowerCase().startsWith(value.toLowerCase()) // Match only the start of the destination
      ))).sort(); // Remove duplicates and sort alphabetically

      setSuggestions(filteredSuggestions)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send the data to your backend or perform further actions
  }

  const handleSuggestionClick = (suggestion: string) => {
    setFormData((prev) => ({ ...prev, destination: suggestion }))
    setSuggestions([]) // Clear suggestions
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
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <Calendar className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <Calendar className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-1">
            Number of Travelers
          </label>
          <div className="relative">
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
            <Users className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
            Budget (per person): ${formData.budget}
          </label>
          <div className="relative">
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
            <DollarSign className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label htmlFor="travelStyle" className="block text-sm font-medium text-gray-700 mb-1">
            Travel Style
          </label>
          <select
            id="travelStyle"
            name="travelStyle"
            value={formData.travelStyle}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
            <option value="budget">Budget-friendly</option>
            <option value="balanced">Balanced</option>
            <option value="luxury">Luxury</option>
            <option value="adventure">Adventure</option>
            <option value="cultural">Cultural</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Create My Itinerary
        </button>
      </form>
    </div>
  )
}
