'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Calendar, Users, DollarSign, Compass, MapPin } from 'lucide-react'
import Link from 'next/link'

interface ItineraryDay {
  date: string;
  activities: string[];
}

interface Itinerary {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: number;
  travelStyle: string;
  days: ItineraryDay[];
  totalCost: number;
}

export default function ItineraryPage() {
  const searchParams = useSearchParams();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);

  useEffect(() => {
    const itineraryData = searchParams.get('data');
    if (itineraryData) {
      setItinerary(JSON.parse(decodeURIComponent(itineraryData)));
    }
  }, [searchParams]);

  if (!itinerary) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Loading your itinerary...</h2>
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="relative h-96">
            <Image
              src={`https://source.unsplash.com/1600x900/?${itinerary.destination}`}
              alt={itinerary.destination}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="text-5xl font-bold text-white mb-2">{itinerary.destination}</h1>
              <p className="text-xl text-white">Your personalized {itinerary.days.length}-day adventure</p>
            </div>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
              <InfoCard icon={<Calendar className="w-6 h-6 text-blue-600" />} title="Start Date" value={itinerary.startDate} />
              <InfoCard icon={<Calendar className="w-6 h-6 text-blue-600" />} title="End Date" value={itinerary.endDate} />
              <InfoCard icon={<Users className="w-6 h-6 text-blue-600" />} title="Travelers" value={itinerary.travelers.toString()} />
              <InfoCard icon={<DollarSign className="w-6 h-6 text-blue-600" />} title="Budget" value={`$${itinerary.budget.toLocaleString()}`} />
              <InfoCard icon={<Compass className="w-6 h-6 text-blue-600" />} title="Travel Style" value={itinerary.travelStyle} />
            </div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Your Itinerary</h2>
            <div className="space-y-8">
              {itinerary.days.map((day, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold text-blue-600 mb-4">Day {index + 1} - {day.date}</h3>
                  <ul className="space-y-3">
                    {day.activities.map((activity, actIndex) => (
                      <li key={actIndex} className="flex items-start">
                        <MapPin className="w-5 h-5 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-12 text-right">
              <p className="text-2xl font-semibold text-gray-800">Total Estimated Cost: <span className="text-blue-600">${itinerary.totalCost.toLocaleString()}</span></p>
            </div>
            <div className="mt-12 text-center">
              <Link href="/" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition duration-300">
                Plan Another Trip
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoCard({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) {
  return (
    <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow">
      {icon}
      <div className="ml-4">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  )
}

