import { Country, Place } from './worldData'
import { activities } from './activities'
import { transportationModes, TrainInfo } from './transportationModes'
import { hotels } from './hotels'
import axios from 'axios';

interface ItineraryRequest {
  travelType: 'domestic' | 'international';
  country: string;
  sourceCountry?: string;
  destinationCountry?: string;
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
  exchangeRate: number;
}

export async function generateItinerary(request: ItineraryRequest): Promise<Itinerary> {
  console.log('Generating itinerary for:', request)

  const { travelType, country, sourceCountry, destinationCountry, sourcePlace, destinationPlace, startDate, endDate, travelers, budget, travelStyle } = request;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));

  let sourceInfo, destinationInfo;

  if (travelType === 'domestic') {
    sourceInfo = await findPlace(country, sourcePlace);
    destinationInfo = await findPlace(country, destinationPlace);
  } else {
    sourceInfo = await findPlace(sourceCountry!, sourcePlace);
    destinationInfo = await findPlace(destinationCountry!, destinationPlace);
  }

  if (!sourceInfo || !destinationInfo) {
    throw new Error('Invalid source or destination');
  }

  const currency = travelType === 'domestic' && country.toLowerCase() === 'india' ? 'INR' : 'USD';
  const dailyCost = calculateDailyCost(destinationInfo, travelStyle, budget / days, currency);

  const transportation = await selectTransportation(travelType, sourcePlace, destinationPlace, budget, travelers, currency);
  const itineraryDays = await generateItineraryDays(start, days, destinationInfo, travelStyle, dailyCost);

  const totalCost = itineraryDays.reduce((sum, day) => sum + day.dailyCost, 0) * travelers;

  let exchangeRate = 1;
  if (travelType === 'international') {
    exchangeRate = await getExchangeRate(currency, currency === 'USD' ? 'INR' : 'USD');
  }

  const itinerary: Itinerary = {
    source: `${sourcePlace}, ${sourceInfo.country}`,
    destination: `${destinationPlace}, ${destinationInfo.country}`,
    startDate,
    endDate,
    travelers,
    budget,
    travelStyle,
    transportation,
    days: itineraryDays,
    totalCost: Math.round(totalCost),
    currency,
    exchangeRate
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
        country: countryData.name.common,
        attractions: await getAttractions(place, countryData.name.common)
      };
    }
  } catch (error) {
    console.error('Error fetching country data:', error);
  }
  // If the country is not found, try searching for the place directly
  try {
    const attractions = await getAttractions(place, '');
    return {
      name: place,
      country: country, // Use the provided country name
      attractions
    };
  } catch (error) {
    console.error('Error fetching place data:', error);
  }
  return null;
}

async function getAttractions(place: string, country: string): Promise<string[]> {
  try {
    let url = `https://api.opentripmap.com/0.1/en/places/geoname?name=${encodeURIComponent(place)}`;
    if (country) {
      url += `&country=${encodeURIComponent(country)}`;
    }
    url += `&apikey=${process.env.OPENTRIPMAP_API_KEY}`;

    const response = await axios.get(url);
    const { lat, lon } = response.data;

    const attractionsResponse = await axios.get(`https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${lon}&lat=${lat}&kinds=interesting_places&format=json&apikey=${process.env.OPENTRIPMAP_API_KEY}`);
    return attractionsResponse.data.slice(0, 5).map((attraction: any) => attraction.name);
  } catch (error) {
    console.error('Error fetching attractions:', error);
    return ['Local sightseeing'];
  }
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

async function selectTransportation(travelType: 'domestic' | 'international', source: string, destination: string, budget: number, travelers: number, currency: string): Promise<string> {
  const budgetPerPerson = budget / travelers;
  
  if (travelType === 'domestic' && source.toLowerCase().includes('india')) {
    const trainInfo = transportationModes.train(source, destination);
    const flightInfo = await getFlightInfo(source, destination, currency);
    
    let transportationSuggestion = '';
    
    if (trainInfo.details && trainInfo.details.length > 0) {
      transportationSuggestion += `Train options:\n${formatTrainSuggestions(trainInfo.details)}\n\n`;
    } else {
      transportationSuggestion += `No direct train routes found from ${source} to ${destination}.\n\n`;
    }
    
    if (flightInfo) {
      transportationSuggestion += `Flight options:\nAverage flight cost: ${formatCurrency(flightInfo.averageCost, currency)}\nFlight duration: ${flightInfo.duration}\n\n`;
    } else {
      transportationSuggestion += `No flight information available for ${source} to ${destination}.\n\n`;
    }
    
    return transportationSuggestion;
  }

  // For international travel
  const flightInfo = await getFlightInfo(source, destination, currency);
  if (flightInfo) {
    return `Flight options:\nAverage flight cost: ${formatCurrency(flightInfo.averageCost, currency)}\nFlight duration: ${flightInfo.duration}`;
  } else {
    return `No flight information available for ${source} to ${destination}. Please check with local airlines for more information.`;
  }
}

async function getFlightInfo(source: string, destination: string, currency: string): Promise<{ averageCost: number, duration: string } | null> {
  // This is a mock function. In a real application, you would call an actual flight API here.
  const mockFlightData: { [key: string]: { averageCost: number, duration: string } } = {
    'Mumbai-Srinagar': { averageCost: 8000, duration: '2h 15m' },
    'Delhi-Mumbai': { averageCost: 5000, duration: '2h 10m' },
    'Bangalore-Kolkata': { averageCost: 6000, duration: '2h 30m' },
    'New York-London': { averageCost: 500, duration: '7h 30m' },
    'Paris-Tokyo': { averageCost: 800, duration: '11h 45m' },
    'London-Paris': { averageCost: 150, duration: '1h 15m' },
    'Tokyo-Seoul': { averageCost: 300, duration: '2h 30m' },
    'Sydney-Melbourne': { averageCost: 200, duration: '1h 25m' },
    'Dubai-Mumbai': { averageCost: 350, duration: '3h 25m' },
    'Singapore-Bangkok': { averageCost: 250, duration: '2h 30m' },
  };

  const key = `${source}-${destination}`;
  const flightInfo = mockFlightData[key];

  if (flightInfo) {
    // Convert the cost to the appropriate currency
    const convertedCost = currency === 'INR' ? flightInfo.averageCost * 75 : flightInfo.averageCost;
    return { ...flightInfo, averageCost: convertedCost };
  }

  return null;
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

function formatCurrency(amount: number, currency: string): string {
  return currency === 'INR' 
    ? `₹${amount.toFixed(2)}`
    : `$${amount.toFixed(2)}`;
}

async function generateItineraryDays(start: Date, totalDays: number, destination: Place, travelStyle: string, dailyCost: number): Promise<ItineraryDay[]> {
  const attractions = await getAttractions(destination.name, destination.country);
  const destinationActivities = [...attractions, ...(activities[travelStyle] || []), ...activities['default']];

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

async function getExchangeRate(fromCurrency: string, toCurrency: string): Promise<number> {
  try {
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    return response.data.rates[toCurrency];
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return fromCurrency === 'USD' ? 75 : 1/75; // Fallback to approximate USD-INR rate
  }
}

