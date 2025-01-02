import { Country, Place } from './worldData'
import { activities } from './activities'
import { transportationModes, TrainInfo } from './transportationModes'
import { hotels } from './hotels'

interface ItineraryRequest {
  travelType: 'domestic' | 'international';
  country: string;
  sourcePlace: string;
  destinationPlace: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: number;
  travelStyle: string;
}

interface ItineraryDay {
  date: string;
  activities: string[];
  accommodation: string;
  dailyCost: number;
}

interface Itinerary {
  source: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: number;
  travelStyle: string;
  transportation: string;
  days: ItineraryDay[];
  totalCost: number;
  currency: string;
}

export async function generateItinerary(request: ItineraryRequest): Promise<Itinerary> {
  console.log('Generating itinerary for:', request)

  const { travelType, country, sourcePlace, destinationPlace, startDate, endDate, travelers, budget, travelStyle } = request;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));

  let sourceInfo, destinationInfo;

  if (travelType === 'domestic') {
    sourceInfo = await findPlace(country, sourcePlace);
    destinationInfo = await findPlace(country, destinationPlace);
  } else {
    sourceInfo = await findPlace(sourcePlace, sourcePlace);
    destinationInfo = await findPlace(destinationPlace, destinationPlace);
  }

  if (!sourceInfo || !destinationInfo) {
    throw new Error('Invalid source or destination');
  }

  const currency = travelType === 'domestic' && country.toLowerCase() === 'india' ? 'INR' : 'USD';
  const dailyCost = calculateDailyCost(destinationInfo, travelStyle, budget / days, currency);
  
  const transportation = selectTransportation(travelType, sourcePlace, destinationPlace, budget, travelers);
  const itineraryDays = generateItineraryDays(start, days, destinationInfo, travelStyle, dailyCost);

  const totalCost = itineraryDays.reduce((sum, day) => sum + day.dailyCost, 0) * travelers;

  const itinerary: Itinerary = {
    source: travelType === 'domestic' ? `${sourcePlace}, ${country}` : sourcePlace,
    destination: travelType === 'domestic' ? `${destinationPlace}, ${country}` : destinationPlace,
    startDate,
    endDate,
    travelers,
    budget,
    travelStyle,
    transportation,
    days: itineraryDays,
    totalCost: Math.round(totalCost),
    currency
  };

  console.log('Generated itinerary:', itinerary)
  return itinerary;
}

async function findPlace(country: string, place: string): Promise<Place | null> {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const data = await response.json();
    if (data && data.length > 0) {
      const countryData = data[0];
      return {
        name: place,
        attractions: [`Visit ${countryData.capital}`, `Explore ${countryData.name.common}`, 'Local sightseeing']
      };
    }
  } catch (error) {
    console.error('Error fetching country data:', error);
  }
  return null;
}

function calculateDailyCost(place: Place, travelStyle: string, budgetPerDay: number, currency: string): number {
  const baseCost = currency === 'INR' ? 3000 : 100; // Adjust base cost for INR
  const styleCosts: { [key: string]: number } = {
    'budget': 0.7,
    'balanced': 1,
    'luxury': 1.5,
    'adventure': 1.2,
    'cultural': 1.1
  };
  const calculatedCost = baseCost * (styleCosts[travelStyle] || 1);
  return Math.min(calculatedCost, budgetPerDay);
}

function selectTransportation(travelType: 'domestic' | 'international', source: string, destination: string, budget: number, travelers: number): string {
  const budgetPerPerson = budget / travelers;
  
  if (travelType === 'domestic' && source.toLowerCase() === 'india') {
    const trainInfo = transportationModes.train(source, destination);
    if (trainInfo.details) {
      if (budgetPerPerson < 5000) { // Assuming 5000 INR as a threshold for budget travel
        return formatTrainSuggestions(trainInfo.details);
      } else {
        const flightInfo = transportationModes.flight(source, destination);
        return `${flightInfo.description}\n\nAlternatively, you can take a train:\n\n${formatTrainSuggestions(trainInfo.details)}`;
      }
    }
  }

  // For international travel or if no train information is available
  return transportationModes.flight(source, destination).description;
}

function formatTrainSuggestions(trains: TrainInfo[]): string {
  let trainSuggestions = `Suggested trains:\n`;
  trains.forEach((train, index) => {
    trainSuggestions += `\n${index + 1}) Train No.: ${train.number} ${train.name}\n`;
    trainSuggestions += `   Catch from: ${train.from}\n`;
    trainSuggestions += `   Get down at: ${train.to}\n`;
    trainSuggestions += `   Journey Time: ${train.duration}\n`;
  });
  return trainSuggestions;
}

function generateItineraryDays(start: Date, totalDays: number, destination: Place, travelStyle: string, dailyCost: number): ItineraryDay[] {
  const destinationActivities = [...(activities[travelStyle] || []), ...activities['default']];

  return Array.from({ length: totalDays }, (_, i) => {
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    const dayActivities = selectRandomActivities(destinationActivities, 3, 5);
    const accommodation = selectAccommodation(destination.name, travelStyle);

    return {
      date: date.toISOString().split('T')[0],
      activities: dayActivities,
      accommodation,
      dailyCost
    };
  });
}

function selectRandomActivities(activities: string[], min: number, max: number): string[] {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...activities].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function selectAccommodation(destination: string, travelStyle: string): string {
  const accommodations = hotels[destination] || hotels['default'];
  return accommodations[travelStyle as keyof typeof accommodations] || accommodations['balanced'];
}

