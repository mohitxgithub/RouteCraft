import React, { useState } from 'react'
import { MapPin, Users, Calendar, DollarSign, Plane, Train, Car } from 'lucide-react'
import TravelTools from './TravelTools'
import { formatCurrency } from '../utils/currencyUtils'
import jsPDF from 'jspdf'

const ItineraryPDF = null; // Removing dynamic import

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
  exchangeRate: number;
}

interface ItineraryDisplayProps {
  itinerary: Itinerary;
  onClose: () => void;
  isLoading: boolean;
}


const ItineraryDisplay = ({ itinerary, onClose, isLoading }: ItineraryDisplayProps) => {
  const [isPDFReady, setIsPDFReady] = useState(false) //This line remains

  const getTransportationIcon = (transportation: string) => {
    if (transportation.toLowerCase().includes('flight')) return <Plane className="w-6 h-6 mr-2 text-blue-600" />;
    if (transportation.toLowerCase().includes('train')) return <Train className="w-6 h-6 mr-2 text-blue-600" />;
    if (transportation.toLowerCase().includes('car')) return <Car className="w-6 h-6 mr-2 text-blue-600" />;
    return null;
  };

  const isDomestic = itinerary.source.split(', ')[1] === itinerary.destination.split(', ')[1];

  const generatePDF = () => {
    const doc = new jsPDF();
    let yOffset = 20;

    doc.setFontSize(20);
    doc.text('Your Travel Itinerary', 105, yOffset, { align: 'center' });
    yOffset += 15;

    doc.setFontSize(12);
    doc.text(`From: ${itinerary.source}`, 20, yOffset);
    yOffset += 10;
    doc.text(`To: ${itinerary.destination}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Dates: ${itinerary.startDate} to ${itinerary.endDate}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Travelers: ${itinerary.travelers}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Travel Style: ${itinerary.travelStyle}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Budget: ${formatCurrency(itinerary.budget, itinerary.currency)}`, 20, yOffset);
    yOffset += 15;

    doc.setFontSize(14);
    doc.text('Itinerary Details:', 20, yOffset);
    yOffset += 10;

    itinerary.days.forEach((day, index) => {
      doc.setFontSize(12);
      doc.text(`Day ${index + 1} - ${day.date}`, 20, yOffset);
      yOffset += 10;

      day.activities.forEach(activity => {
        doc.text(`• ${activity}`, 30, yOffset);
        yOffset += 5;
      });

      doc.text(`Accommodation: ${day.accommodation}`, 30, yOffset);
      yOffset += 5;
      doc.text(`Daily Cost: ${formatCurrency(day.dailyCost, itinerary.currency)}`, 30, yOffset);
      yOffset += 10;

      if (yOffset > 270) {
        doc.addPage();
        yOffset = 20;
      }
    });

    doc.setFontSize(14);
    doc.text(`Total Estimated Cost: ${formatCurrency(itinerary.totalCost, itinerary.currency)}`, 20, yOffset);

    doc.save('travel_itinerary.pdf');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-4xl mx-auto text-gray-800 dark:text-gray-200">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400">Your Personalized Itinerary</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center">
          <MapPin className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">From</p>
            <p className="font-semibold text-gray-800 dark:text-gray-200">{itinerary.source}</p>
          </div>
        </div>
        <div className="flex items-center">
          <MapPin className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">To</p>
            <p className="font-semibold text-gray-800 dark:text-gray-200">{itinerary.destination}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Calendar className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Dates</p>
            <p className="font-semibold text-gray-800 dark:text-gray-200">{itinerary.startDate} to {itinerary.endDate}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Users className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Travelers</p>
            <p className="font-semibold text-gray-800 dark:text-gray-200">{itinerary.travelers}</p>
          </div>
        </div>
        <div className="flex items-center">
          <DollarSign className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Travel Style</p>
            <p className="font-semibold capitalize text-gray-800 dark:text-gray-200">{itinerary.travelStyle}</p>
          </div>
        </div>
        <div className="flex items-center">
          <DollarSign className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Budget</p>
            <p className="font-semibold text-gray-800 dark:text-gray-200">{formatCurrency(itinerary.budget, itinerary.currency)}</p>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400 flex items-center">
          {getTransportationIcon(itinerary.transportation)}
          Transportation
        </h3>
        <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">{itinerary.transportation}</p>
      </div>
      <div className="space-y-8">
        {itinerary.days.map((day, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Day {index + 1} - {day.date}</h3>
            <ul className="space-y-2 mb-4">
              {day.activities.map((activity, actIndex) => (
                <li key={actIndex} className="flex items-start text-gray-700 dark:text-gray-300">
                  <span className="inline-block w-4 h-4 bg-blue-600 rounded-full mr-2 mt-1"></span>
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
            <p className="font-semibold text-gray-700 dark:text-gray-300">Accommodation: {day.accommodation}</p>
            <p className="font-semibold mt-2 text-gray-700 dark:text-gray-300">Daily Cost: {formatCurrency(day.dailyCost, itinerary.currency)}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-right">
        <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
          Total Estimated Cost: {formatCurrency(itinerary.totalCost, itinerary.currency)}
        </p>
        {itinerary.exchangeRate !== 1 && (
          <p className="text-lg mt-2 text-gray-700 dark:text-gray-300">
            ({formatCurrency(itinerary.totalCost * itinerary.exchangeRate, itinerary.currency === 'INR' ? 'USD' : 'INR')} in {itinerary.currency === 'INR' ? 'USD' : 'INR'})
          </p>
        )}
        {itinerary.totalCost > itinerary.budget && (
          <p className="text-red-600 dark:text-red-400 mt-2">
            Note: The estimated cost exceeds your budget by {formatCurrency(itinerary.totalCost - itinerary.budget, itinerary.currency)}.
            Consider adjusting your travel style or duration to reduce costs.
          </p>
        )}
      </div>
      <div className="mt-8">
        <TravelTools 
          destination={itinerary.destination} 
          travelStyle={itinerary.travelStyle} 
          isDomestic={isDomestic}
          sourceCurrency={itinerary.currency}
          destinationCurrency={isDomestic ? itinerary.currency : (itinerary.currency === 'USD' ? 'INR' : 'USD')}
        />
      </div>
      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={generatePDF}
          className="bg-accent-500 text-white px-6 py-2 rounded-md hover:bg-accent-600 transition duration-300"
        >
          Download Itinerary PDF
        </button>
        <button
          onClick={onClose}
          className="bg-primary-500 text-white px-6 py-2 rounded-md hover:bg-primary-600 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default ItineraryDisplay;

