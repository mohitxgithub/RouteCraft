import { NextResponse } from 'next/server'

const mockTravelResponses = [
  "That's a great destination choice! I recommend visiting the local markets and trying the street food.",
  "For your itinerary, consider balancing sightseeing with some relaxation time. It's important to enjoy your vacation!",
  "When packing, don't forget essentials like comfortable walking shoes and a universal power adapter.",
  "I suggest booking your accommodations in advance, especially if you're traveling during peak season.",
  "Remember to check the local weather forecast before your trip and pack accordingly.",
  "Exploring local cuisine is a great way to immerse yourself in the culture. Try asking locals for restaurant recommendations!",
  "Consider purchasing travel insurance for peace of mind during your journey.",
  "Don't forget to inform your bank about your travel plans to avoid any issues with your cards abroad.",
  "Learning a few basic phrases in the local language can greatly enhance your travel experience.",
  "Remember to stay hydrated, especially if you're traveling to a warm climate or planning lots of outdoor activities."
]

export async function POST(req: Request) {
  const { messages } = await req.json()
  const userMessage = messages[messages.length - 1].content

  // Simple keyword matching for more relevant responses
  let response = "I'm sorry, I don't have specific information about that. Is there anything else I can help you with regarding travel planning?"

  if (userMessage.toLowerCase().includes("destination") || userMessage.toLowerCase().includes("where")) {
    response = mockTravelResponses[0]
  } else if (userMessage.toLowerCase().includes("itinerary") || userMessage.toLowerCase().includes("plan")) {
    response = mockTravelResponses[1]
  } else if (userMessage.toLowerCase().includes("pack") || userMessage.toLowerCase().includes("luggage")) {
    response = mockTravelResponses[2]
  } else if (userMessage.toLowerCase().includes("book") || userMessage.toLowerCase().includes("reservation")) {
    response = mockTravelResponses[3]
  } else if (userMessage.toLowerCase().includes("weather") || userMessage.toLowerCase().includes("forecast")) {
    response = mockTravelResponses[4]
  } else if (userMessage.toLowerCase().includes("food") || userMessage.toLowerCase().includes("eat")) {
    response = mockTravelResponses[5]
  } else if (userMessage.toLowerCase().includes("insurance")) {
    response = mockTravelResponses[6]
  } else if (userMessage.toLowerCase().includes("bank") || userMessage.toLowerCase().includes("money")) {
    response = mockTravelResponses[7]
  } else if (userMessage.toLowerCase().includes("language") || userMessage.toLowerCase().includes("speak")) {
    response = mockTravelResponses[8]
  } else if (userMessage.toLowerCase().includes("health") || userMessage.toLowerCase().includes("safety")) {
    response = mockTravelResponses[9]
  }

  // Simulate a delay to mimic API response time
  await new Promise(resolve => setTimeout(resolve, 500))

  return NextResponse.json({ response })
}

