import { NextResponse } from 'next/server'
import { generateItinerary } from '@/utils/mockAIService'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('Received request body:', body)

    const { travelType, country, sourcePlace, destinationPlace, startDate, endDate, travelers, budget, travelStyle } = body

    if (!sourcePlace || !destinationPlace || !startDate || !endDate || !travelers || !budget || !travelStyle) {
      throw new Error('Missing required fields')
    }

    const itinerary = await generateItinerary({ travelType, country, sourcePlace, destinationPlace, startDate, endDate, travelers, budget, travelStyle })
    console.log('Generated itinerary:', itinerary)

    return NextResponse.json(itinerary)
  } catch (error) {
    console.error('Error generating itinerary:', error)
    return NextResponse.json({ error: 'Failed to generate itinerary', details: error.message }, { status: 500 })
  }
}

