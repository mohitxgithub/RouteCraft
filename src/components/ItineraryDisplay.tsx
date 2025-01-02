import React from 'react'
import { MapPin, Users, Calendar, DollarSign, Plane, Train, Car } from 'lucide-react'

interface Itinerary {
  source: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: number;
  travelStyle: string;
  transportation: string;
  days: {
    date: string;
    activities: string[];
    accommodation: string;
    dailyCost: number;
  }[];
  totalCost: number;
  currency: string;
}

interface ItineraryDisplayProps {
  itinerary: Itinerary;
  onClose: () => void;
}

export default function ItineraryDisplay({ itinerary, onClose }: ItineraryDisplayProps) {
  const getTransportationIcon = (transportation: string) => {
    if (transportation.toLowerCase().includes('flight')) return <Plane className="w-6 h-6 mr-2 text-blue-600" />;
    if (transportation.toLowerCase().includes('train')) return <Train className="w-6 h-6 mr-2 text-blue-600" />;
    if (transportation.toLowerCase().includes('car')) return <Car className="w-6 h-6 mr-2 text-blue-600" />;
    return null;
  };

  const formatCurrency = (amount: number) => {
    return itinerary.currency === 'INR'
      ? `₹${amount.toLocaleString('en-IN')}`
      : `$${amount.toLocaleString('en-US')}`;
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto text-gray-800">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Your Personalized Itinerary</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center">
          <MapPin className="w-6 h-6 mr-2 text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">From</p>
            <p className="font-semibold">{itinerary.source}</p>
          </div>
        </div>
        <div className="flex items-center">
          <MapPin className="w-6 h-6 mr-2 text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">To</p>
            <p className="font-semibold">{itinerary.destination}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Calendar className="w-6 h-6 mr-2 text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Dates</p>
            <p className="font-semibold">{itinerary.startDate} to {itinerary.endDate}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Users className="w-6 h-6 mr-2 text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Travelers</p>
            <p className="font-semibold">{itinerary.travelers}</p>
          </div>
        </div>
        <div className="flex items-center">
          <DollarSign className="w-6 h-6 mr-2 text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Travel Style</p>
            <p className="font-semibold capitalize">{itinerary.travelStyle}</p>
          </div>
        </div>
        <div className="flex items-center">
          <DollarSign className="w-6 h-6 mr-2 text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Budget</p>
            <p className="font-semibold">{formatCurrency(itinerary.budget)}</p>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-blue-600 flex items-center">
          {getTransportationIcon(itinerary.transportation)}
          Transportation
        </h3>
        <p className="whitespace-pre-line">{itinerary.transportation}</p>
      </div>
      <div className="space-y-8">
        {itinerary.days.map((day, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">Day {index + 1} - {day.date}</h3>
            <ul className="space-y-2 mb-4">
              {day.activities.map((activity, actIndex) => (
                <li key={actIndex} className="flex items-start">
                  <span className="inline-block w-4 h-4 bg-blue-600 rounded-full mr-2 mt-1"></span>
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
            <p className="font-semibold">Accommodation: {day.accommodation}</p>
            <p className="font-semibold mt-2">Daily Cost: {formatCurrency(day.dailyCost)}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-right">
        <p className="text-2xl font-semibold text-blue-600">Total Estimated Cost: {formatCurrency(itinerary.totalCost)}</p>
        {itinerary.totalCost > itinerary.budget && (
          <p className="text-red-600 mt-2">
            Note: The estimated cost exceeds your budget by {formatCurrency(itinerary.totalCost - itinerary.budget)}.
            Consider adjusting your travel style or duration to reduce costs.
          </p>
        )}
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

