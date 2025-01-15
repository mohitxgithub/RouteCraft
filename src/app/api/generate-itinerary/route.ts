import { NextResponse } from 'next/server'

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

function generateMockItinerary(formData: any): Itinerary {
  const startDate = new Date(formData.startDate);
  const endDate = new Date(formData.endDate);
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  const activities = [
    ["Visit local markets", "City tour", "Museum visit"],
    ["Historical landmarks", "Local cuisine tasting", "Evening entertainment"],
    ["Nature walk", "Shopping", "Cultural show"],
    ["Adventure activities", "Relaxation time", "Local experiences"]
  ];

  const accommodations = [
    "Luxury Hotel",
    "Boutique Resort",
    "City Center Hotel",
    "Beachfront Resort"
  ];

  const itineraryDays: ItineraryDay[] = Array.from({ length: days }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + index);
    
    return {
      date: date.toISOString().split('T')[0],
      activities: activities[index % activities.length],
      accommodation: accommodations[index % accommodations.length],
      dailyCost: Math.floor(formData.budget / days * 0.8) // 80% of daily budget
    };
  });

  const totalCost = itineraryDays.reduce((sum, day) => sum + day.dailyCost, 0);

  return {
    source: formData.sourcePlace,
    destination: formData.destinationPlace,
    startDate: formData.startDate,
    endDate: formData.endDate,
    travelers: formData.travelers,
    budget: formData.budget,
    travelStyle: formData.travelStyle,
    transportation: `Flight ${formData.sourcePlace} to ${formData.destinationPlace}`,
    days: itineraryDays,
    totalCost: totalCost,
    currency: formData.country?.toLowerCase() === 'india' ? 'INR' : 'USD',
    exchangeRate: formData.country?.toLowerCase() === 'india' ? 75 : 1
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Received request body:', JSON.stringify(body, null, 2));

    if (!body.sourcePlace || !body.destinationPlace || !body.startDate || !body.endDate || !body.travelers || !body.budget || !body.travelStyle) {
      console.log('Missing required fields:', { sourcePlace: body.sourcePlace, destinationPlace: body.destinationPlace, startDate: body.startDate, endDate: body.endDate, travelers: body.travelers, budget: body.budget, travelStyle: body.travelStyle });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const itinerary = generateMockItinerary(body);
    console.log('Generated itinerary:', JSON.stringify(itinerary, null, 2));
    return NextResponse.json(itinerary);
  } catch (error) {
    console.error('Error generating itinerary:', error);
    return NextResponse.json(
      { error: 'Failed to generate itinerary', details: error.message },
      { status: 500 }
    );
  }
}