import { NextResponse } from 'next/server'

const attractions: { [key: string]: string[] } = {
  'Paris, France': [
    'Eiffel Tower',
    'Louvre Museum',
    'Notre-Dame Cathedral',
    'Arc de Triomphe',
    'Palace of Versailles'
  ],
  'Rome, Italy': [
    'Colosseum',
    'Vatican Museums',
    'Pantheon',
    'Trevi Fountain',
    'Roman Forum'
  ],
  'New York City, USA': [
    'Statue of Liberty',
    'Central Park',
    'Empire State Building',
    'Metropolitan Museum of Art',
    'Broadway'
  ],
  // Add more destinations and attractions as needed
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const destination = searchParams.get('destination')
  const style = searchParams.get('style')

  if (!destination) {
    return NextResponse.json({ error: 'Destination is required' }, { status: 400 })
  }

  const destinationAttractions = attractions[destination] || [
    'Local sightseeing',
    'Visit popular landmarks',
    'Explore local cuisine',
    'Experience local culture',
    'Enjoy nature and parks'
  ]

  return NextResponse.json({ attractions: destinationAttractions })
}

