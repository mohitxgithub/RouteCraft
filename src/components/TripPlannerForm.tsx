'use client'

import { useState, useEffect } from 'react'
import { Calendar, DollarSign, Users, Globe, MapPin } from 'lucide-react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { getAllCountries, getPlacesForCountry, Country, Place } from '../utils/worldData'
import { motion } from 'framer-motion'

interface TripPlannerFormProps {
  onSubmit: (formData: any) => void;
}

export default function TripPlannerForm({ onSubmit }: TripPlannerFormProps) {
  const [formData, setFormData] = useState({
    travelType: 'domestic',
    country: '',
    sourceCountry: '',
    destinationCountry: '',
    sourcePlace: '',
    destinationPlace: '',
    startDate: null as Date | null,
    endDate: null as Date | null,
    travelers: 1,
    budget: 1000,
    travelStyle: 'balanced',
  })

  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [filteredSourceCountries, setFilteredSourceCountries] = useState<Country[]>([]);
  const [filteredDestinationCountries, setFilteredDestinationCountries] = useState<Country[]>([]);
  const [sourcePlaces, setSourcePlaces] = useState<Place[]>([]);
  const [destinationPlaces, setDestinationPlaces] = useState<Place[]>([]);
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
        setSourcePlaces(fetchedPlaces);
        setDestinationPlaces(fetchedPlaces);
      } else if (formData.travelType === 'international') {
        if (formData.sourceCountry) {
          const sourcePlaces = await getPlacesForCountry(formData.sourceCountry);
          setSourcePlaces(sourcePlaces);
        }
        if (formData.destinationCountry) {
          const destPlaces = await getPlacesForCountry(formData.destinationCountry);
          setDestinationPlaces(destPlaces);
        }
      }
    }
    fetchPlaces();
  }, [formData.country, formData.travelType, formData.sourceCountry, formData.destinationCountry]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => {
      if (name === 'travelType') {
        return { ...prev, [name]: value, country: '', sourceCountry: '', destinationCountry: '', sourcePlace: '', destinationPlace: '' }
      }
      if (name === 'country' && value.toLowerCase() === 'india' && prev.travelType === 'domestic') {
        return { ...prev, [name]: value, budget: prev.budget * 75 }
      }
      return { ...prev, [name]: value }
    })

    if (formData.travelType === 'domestic') {
      if (name === 'country') {
        const filtered = allCountries.filter(country => 
          country.name.toLowerCase().startsWith(value.toLowerCase())
        );
        setFilteredSourceCountries(filtered);
        setFilteredDestinationCountries(filtered);
      } else if (name === 'sourcePlace') {
        setFilteredSourcePlaces(sourcePlaces.filter(place => 
          place.name.toLowerCase().startsWith(value.toLowerCase())
        ));
      } else if (name === 'destinationPlace') {
        setFilteredDestinationPlaces(destinationPlaces.filter(place => 
          place.name.toLowerCase().startsWith(value.toLowerCase())
        ));
      }
    } else if (formData.travelType === 'international') {
      if (name === 'sourceCountry') {
        setFilteredSourceCountries(allCountries.filter(country => 
          country.name.toLowerCase().startsWith(value.toLowerCase())
        ));
      } else if (name === 'destinationCountry') {
        setFilteredDestinationCountries(allCountries.filter(country => 
          country.name.toLowerCase().startsWith(value.toLowerCase())
        ));
      } else if (name === 'sourcePlace') {
        setFilteredSourcePlaces(sourcePlaces.filter(place => 
          place.name.toLowerCase().startsWith(value.toLowerCase())
        ));
      } else if (name === 'destinationPlace') {
        setFilteredDestinationPlaces(destinationPlaces.filter(place => 
          place.name.toLowerCase().startsWith(value.toLowerCase())
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
      onSubmit(formData);
    } catch (error) {
      console.error('Error generating itinerary:', error);
      setError('Failed to generate itinerary. Please try again.');
    }
  }

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl max-w-2xl mx-auto border border-primary-200 dark:border-primary-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-primary-600 dark:text-primary-400">Plan Your Dream Trip</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="travelType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Travel Type</label>
            <div className="relative">
              <select
                id="travelType"
                name="travelType"
                value={formData.travelType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-primary-300 dark:border-primary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700"
              >
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
              </select>
              <Globe className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          {formData.travelType === 'domestic' && (
            <div className="relative">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-primary-300 dark:border-primary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700"
                placeholder="Type to search..."
              />
              <MapPin className="absolute right-3 top-9 h-5 w-5 text-gray-400" />
              {filteredSourceCountries.length > 0 && (
                <ul className="absolute z-10 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md mt-1 max-h-60 overflow-auto">
                  {filteredSourceCountries.map((country, index) => (
                    <li
                      key={index}
                      className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-gray-800 dark:text-gray-200"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, country: country.name }));
                        setFilteredSourceCountries([]);
                      }}
                    >
                      {country.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label htmlFor={formData.travelType === 'domestic' ? "sourcePlace" : "sourceCountry"} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              From {formData.travelType === 'domestic' ? 'Place' : 'Country'}
            </label>
            <input
              type="text"
              id={formData.travelType === 'domestic' ? "sourcePlace" : "sourceCountry"}
              name={formData.travelType === 'domestic' ? "sourcePlace" : "sourceCountry"}
              value={formData.travelType === 'domestic' ? formData.sourcePlace : formData.sourceCountry}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-primary-300 dark:border-primary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700"
              placeholder="Type to search..."
            />
            <MapPin className="absolute right-3 top-9 h-5 w-5 text-gray-400" />
            {formData.travelType === 'domestic' && filteredSourcePlaces.length > 0 && (
              <ul className="absolute z-10 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md mt-1 max-h-60 overflow-auto">
                {filteredSourcePlaces.map((place, index) => (
                  <li
                    key={index}
                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-gray-800 dark:text-gray-200"
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
            {formData.travelType === 'international' && filteredSourceCountries.length > 0 && (
              <ul className="absolute z-10 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md mt-1 max-h-60 overflow-auto">
                {filteredSourceCountries.map((country, index) => (
                  <li
                    key={index}
                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-gray-800 dark:text-gray-200"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, sourceCountry: country.name }));
                      setFilteredSourceCountries([]);
                    }}
                  >
                    {country.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="relative">
            <label htmlFor={formData.travelType === 'domestic' ? "destinationPlace" : "destinationCountry"} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              To {formData.travelType === 'domestic' ? 'Place' : 'Country'}
            </label>
            <input
              type="text"
              id={formData.travelType === 'domestic' ? "destinationPlace" : "destinationCountry"}
              name={formData.travelType === 'domestic' ? "destinationPlace" : "destinationCountry"}
              value={formData.travelType === 'domestic' ? formData.destinationPlace : formData.destinationCountry}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-primary-300 dark:border-primary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700"
              placeholder="Type to search..."
            />
            <MapPin className="absolute right-3 top-9 h-5 w-5 text-gray-400" />
            {formData.travelType === 'domestic' && filteredDestinationPlaces.length > 0 && (
              <ul className="absolute z-10 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md mt-1 max-h-60 overflow-auto">
                {filteredDestinationPlaces.map((place, index) => (
                  <li
                    key={index}
                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-gray-800 dark:text-gray-200"
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
            {formData.travelType === 'international' && filteredDestinationCountries.length > 0 && (
              <ul className="absolute z-10 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md mt-1 max-h-60 overflow-auto">
                {filteredDestinationCountries.map((country, index) => (
                  <li
                    key={index}
                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-gray-800 dark:text-gray-200"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, destinationCountry: country.name }));
                      setFilteredDestinationCountries([]);
                    }}
                  >
                    {country.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {formData.travelType === 'international' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label htmlFor="sourcePlace" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From Place</label>
              <input
                type="text"
                id="sourcePlace"
                name="sourcePlace"
                value={formData.sourcePlace}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-primary-300 dark:border-primary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700"
                placeholder="Type to search..."
              />
              <MapPin className="absolute right-3 top-9 h-5 w-5 text-gray-400" />
              {filteredSourcePlaces.length > 0 && (
                <ul className="absolute z-10 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md mt-1 max-h-60 overflow-auto">
                  {filteredSourcePlaces.map((place, index) => (
                    <li
                      key={index}
                      className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-gray-800 dark:text-gray-200"
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
            </div>
            <div className="relative">
              <label htmlFor="destinationPlace" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To Place</label>
              <input
                type="text"
                id="destinationPlace"
                name="destinationPlace"
                value={formData.destinationPlace}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-primary-300 dark:border-primary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700"
                placeholder="Type to search..."
              />
              <MapPin className="absolute right-3 top-9 h-5 w-5 text-gray-400" />
              {filteredDestinationPlaces.length > 0 && (
                <ul className="absolute z-10 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md mt-1 max-h-60 overflow-auto">
                  {filteredDestinationPlaces.map((place, index) => (
                    <li
                      key={index}
                      className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-gray-800 dark:text-gray-200"
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
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
            <div className="relative">
              <DatePicker
                selected={formData.startDate}
                onChange={(date) => handleDateChange(date, 'startDate')}
                selectsStart
                startDate={formData.startDate}
                endDate={formData.endDate}
                minDate={new Date()}
                className="w-full px-3 py-2 border border-primary-300 dark:border-primary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700"
                placeholderText="Select start date"
              />
              <Calendar className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
            <div className="relative">
              <DatePicker
                selected={formData.endDate}
                onChange={(date) => handleDateChange(date, 'endDate')}
                selectsEnd
                startDate={formData.startDate}
                endDate={formData.endDate}
                minDate={formData.startDate || new Date()}
                className="w-full px-3 py-2 border border-primary-300 dark:border-primary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700"
                placeholderText="Select end date"
              />
              <Calendar className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Travelers</label>
            <div className="relative">
              <input
                type="number"
                id="travelers"
                name="travelers"
                value={formData.travelers}
                onChange={handleInputChange}
                min="1"
                required
                className="w-full px-3 py-2 border border-primary-300 dark:border-primary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700"
                placeholder="1"
              />
              <Users className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
        </div>

        <div>
          <label htmlFor="travelStyle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Travel Style</label>
          <select
            id="travelStyle"
            name="travelStyle"
            value={formData.travelStyle}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-primary-300 dark:border-primary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700"
          >
            <option value="budget">Budget-friendly</option>
            <option value="balanced">Balanced</option>
            <option value="luxury">Luxury</option>
            <option value="adventure">Adventure</option>
            <option value="cultural">Cultural</option>
          </select>
        </div>

        <motion.button
          type="submit"
          className="w-full bg-secondary-500 text-primary-800 py-3 px-4 rounded-md hover:bg-secondary-400 transition duration-300 text-lg font-semibold shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Generate My Itinerary
        </motion.button>
      </form>
    </motion.div>
  )
}

