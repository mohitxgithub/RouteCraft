import { NextResponse } from 'next/server'
import axios from 'axios'

const EXCHANGE_RATE_API_KEY = process.env.EXCHANGE_RATE_API_KEY

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const from = searchParams.get('from')
  const to = searchParams.get('to')

  if (!from || !to) {
    return NextResponse.json({ error: 'Both "from" and "to" currencies are required' }, { status: 400 })
  }

  try {
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/latest/${from}`)
    const data = response.data

    if (data.result === 'success') {
      const rate = data.conversion_rates[to]
      return NextResponse.json({ rate })
    } else {
      throw new Error('Failed to fetch exchange rate')
    }
  } catch (error) {
    console.error('Error fetching exchange rate data:', error)
    return NextResponse.json({ error: 'Failed to fetch exchange rate data' }, { status: 500 })
  }
}

