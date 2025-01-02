'use client'

import { useState, useEffect } from 'react'
import { Calendar, DollarSign, Users } from 'lucide-react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { getAllCountries, getPlacesForCountry, Country, Place } from '../utils/worldData'

interface TripPlannerFormProps {
  onSubmit: (formData: any) => void;
}

export default function TripPlannerForm({ onSubmit }: TripPlannerFormProps) {
  const [formData, setFormData] = useState({
    travelType: 'domestic',
    country: '',
    sourcePlace: '',
    destinationPlace: '',
    startDate: null as Date | null,
    endDate: null as Date | null,
    travelers: 1,
    budget: 1000,
    travelStyle: 'balanced',
  })

  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [filteredSourcePlaces, setFilteredSourcePlaces] = useState<Place[]>([]);
  const [filteredDestinationPlaces, setFilteredDestinationPlaces] = useState<Place[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const countries = await getAllCountries();
      setAllCountries(countries);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchPlaces() {
      if (formData.travelType === 'domestic' && formData.country) {
        const fetchedPlaces = await getPlacesForCountry(formData.country);
        setPlaces(fetchedPlaces);
      } else if (formData.travelType === 'international') {
        if (formData.sourcePlace) {
          const sourcePlaces = await getPlacesForCountry(formData.sourcePlace);
          setFilteredSourcePlaces(sourcePlaces);
        }
        if (formData.destinationPlace) {
          const destPlaces = await getPlacesForCountry(formData.destinationPlace);
          setFilteredDestinationPlaces(destPlaces);
        }
      }
    }
    fetchPlaces();
  }, [formData.country, formData.travelType, formData.sourcePlace, formData.destinationPlace]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => {
      if (name === 'travelType') {
        return { ...prev, [name]: value, country: '', sourcePlace: '', destinationPlace: '' }
      }
      if (name === 'country' && value.toLowerCase() === 'india' && prev.travelType === 'domestic') {
        return { ...prev, [name]: value, budget: prev.budget * 75 }
      }
      return { ...prev, [name]: value }
    })

    if (formData.travelType === 'domestic') {
      if (name === 'country') {
        setFilteredCountries(allCountries.filter(country => 
          country.name.toLowerCase().startsWith(value.toLowerCase())
        ));
      } else if (name === 'sourcePlace') {
        setFilteredSourcePlaces(places.filter(place => 
          place.name.toLowerCase().startsWith(value.toLowerCase())
        ));
      } else if (name === 'destinationPlace') {
        setFilteredDestinationPlaces(places.filter(place => 
          place.name.toLowerCase().startsWith(value.toLowerCase())
        ));
      }
    } else if (formData.travelType === 'international') {
      if (name === 'sourcePlace' || name === 'destinationPlace') {
        setFilteredCountries(allCountries.filter(country => 
          country.name.toLowerCase().startsWith(value.toLowerCase())
        ));
      }
    }
  }

  const handleDateChange = (date: Date | null, name: 'startDate' | 'endDate') => {
    setFormData(prev => ({ ...prev, [name]: date }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      setError("Start date cannot be after end date.")
      return
    }
    try {
      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          startDate: formData.startDate?.toISOString().split('T')[0],
          endDate: formData.endDate?.toISOString().split('T')[0],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate itinerary');
      }

      const itinerary = await response.json();
      onSubmit(itinerary);
    } catch (error) {
      console.error('Error generating itinerary:', error);
      setError(error.message || 'Failed to generate itinerary. Please try again.');
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Plan Your Dream Trip</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="travelType" className="block text-sm font-medium text-gray-700 mb-1">Travel Type</label>
          <select
            id="travelType"
            name="travelType"
            value={formData.travelType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          >
            <option value="domestic">Domestic</option>
            <option value="international">International</option>
          </select>
        </div>

        {formData.travelType === 'domestic' ? (
          <div className="grid grid-cols-1 gap-4">
            <div className="relative">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                placeholder="Type to search..."
              />
              {filteredCountries.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
                  {filteredCountries.map((country, index) => (
                    <li
                      key={index}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, country: country.name }));
                        setFilteredCountries([]);
                      }}
                    >
                      {country.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : null}


        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label htmlFor="sourcePlace" className="block text-sm font-medium text-gray-700 mb-1">
              {formData.travelType === 'domestic' ? 'From Place' : 'From Country'}
            </label>
            <input
              type="text"
              id="sourcePlace"
              name="sourcePlace"
              value={formData.sourcePlace}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              placeholder="Type to search..."
            />
            {formData.travelType === 'domestic' && filteredSourcePlaces.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
                {filteredSourcePlaces.map((place, index) => (
                  <li
                    key={index}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, sourcePlace: place.name }));
                      setFilteredSourcePlaces([]);
                    }}
                  >
                    {place.name}
                  </li>
                ))}
              </ul>
            )}
            {formData.travelType === 'international' && filteredCountries.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
                {filteredCountries.map((country, index) => (
                  <li
                    key={index}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, sourcePlace: country.name }));
                      setFilteredCountries([]);
                    }}
                  >
                    {country.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="relative">
            <label htmlFor="destinationPlace" className="block text-sm font-medium text-gray-700 mb-1">
              {formData.travelType === 'domestic' ? 'To Place' : 'To Country'}
            </label>
            <input
              type="text"
              id="destinationPlace"
              name="destinationPlace"
              value={formData.destinationPlace}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              placeholder="Type to search..."
            />
            {formData.travelType === 'domestic' && filteredDestinationPlaces.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
                {filteredDestinationPlaces.map((place, index) => (
                  <li
                    key={index}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, destinationPlace: place.name }));
                      setFilteredDestinationPlaces([]);
                    }}
                  >
                    {place.name}
                  </li>
                ))}
              </ul>
            )}
            {formData.travelType === 'international' && filteredCountries.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
                {filteredCountries.map((country, index) => (
                  <li
                    key={index}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, destinationPlace: country.name }));
                      setFilteredCountries([]);
                    }}
                  >
                    {country.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <DatePicker
              selected={formData.startDate}
              onChange={(date) => handleDateChange(date, 'startDate')}
              selectsStart
              startDate={formData.startDate}
              endDate={formData.endDate}
              minDate={new Date()}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              placeholderText="Select start date"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <DatePicker
              selected={formData.endDate}
              onChange={(date) => handleDateChange(date, 'endDate')}
              selectsEnd
              startDate={formData.startDate}
              endDate={formData.endDate}
              minDate={formData.startDate || new Date()}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              placeholderText="Select end date"
            />
          </div>
        </div>

        <div>
          <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-1">Number of Travelers</label>
          <div className="relative">
            <input
              type="number"
              id="travelers"
              name="travelers"
              value={formData.travelers}
              onChange={handleInputChange}
              min="1"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              placeholder="1"
            />
            <Users className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
            Budget (per person): {formData.country.toLowerCase() === 'india' && formData.travelType === 'domestic' ? '₹' : '$'}{formData.budget}
          </label>
          <div className="relative">
            <input
              type="range"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              min={formData.country.toLowerCase() === 'india' && formData.travelType === 'domestic' ? "7500" : "100"}
              max={formData.country.toLowerCase() === 'india' && formData.travelType === 'domestic' ? "750000" : "10000"}
              step={formData.country.toLowerCase() === 'india' && formData.travelType === 'domestic' ? "7500" : "100"}
              className="w-full"
            />
            <DollarSign className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label htmlFor="travelStyle" className="block text-sm font-medium text-gray-700 mb-1">Travel Style</label>
          <select
            id="travelStyle"
            name="travelStyle"
            value={formData.travelStyle}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
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
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 text-lg font-semibold shadow-md"
        >
          Generate My Itinerary
        </button>
      </form>
    </div>
  )
}

