import { NextResponse } from 'next/server'

function generateMockItinerary(destination: string, startDate: string, endDate: string, travelers: number, budget: number, travelStyle: string) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24))

  const activities = [
    "Visit local landmarks",
    "Explore museums",
    "Try local cuisine",
    "Relax at the beach",
    "Go hiking",
    "Take a guided tour",
    "Shop at local markets",
    "Attend a cultural event",
    "Take a cooking class",
    "Go on a boat trip"
  ]

  const itinerary = {
    days: Array.from({ length: days }, (_, i) => {
      const date = new Date(start)
      date.setDate(date.getDate() + i)
      return {
        date: date.toISOString().split('T')[0],
        activities: Array.from({ length: 3 }, () => activities[Math.floor(Math.random() * activities.length)])
      }
    }),
    totalCost: Math.round(budget * 0.8 * travelers) // Assume 80% of budget is used
  }

  return itinerary
}

export async function POST(req: Request) {
  const body = await req.json()
  const { destination, startDate, endDate, travelers, budget, travelStyle } = body

  try {
    const itinerary = generateMockItinerary(destination, startDate, endDate, travelers, budget, travelStyle)
    return NextResponse.json(itinerary)
  } catch (error) {
    console.error('Error generating itinerary:', error)
    return NextResponse.json({ error: 'Failed to generate itinerary' }, { status: 500 })
  }
}

