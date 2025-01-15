import { NextResponse } from 'next/server'
import axios from 'axios'

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const destination = searchParams.get('destination')

  if (!destination) {
    return NextResponse.json({ error: 'Destination is required' }, { status: 400 })
  }

  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${OPENWEATHER_API_KEY}&units=metric`)
    const data = response.data

    const weather = {
      forecast: `${data.weather[0].description} with a temperature of ${data.main.temp}°C (${(data.main.temp * 9/5 + 32).toFixed(1)}°F)`,
      condition: data.weather[0].main,
      suggestion: getSuggestion(data.weather[0].main, data.main.temp)
    }

    return NextResponse.json(weather)
  } catch (error) {
    console.error('Error fetching weather data:', error)
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 })
  }
}

function getSuggestion(condition: string, temperature: number): string {
  if (condition === 'Clear' && temperature > 25) {
    return "Great weather for sightseeing! Don't forget sunscreen."
  } else if (condition === 'Rain') {
    return "Bring an umbrella and consider indoor activities."
  } else if (temperature < 10) {
    return "It's cold, pack warm clothes and plan for indoor activities."
  } else {
    return "The weather seems fine for travel. Enjoy your trip!"
  }
}

