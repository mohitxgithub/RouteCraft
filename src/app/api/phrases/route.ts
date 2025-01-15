import { NextResponse } from 'next/server'

const phrases: { [key: string]: { [key: string]: string } } = {
  'France': {
    'Hello': 'Bonjour',
    'Thank you': 'Merci',
    'Goodbye': 'Au revoir',
    'Please': 'S\'il vous plaît',
    'Yes': 'Oui',
    'No': 'Non',
    'Excuse me': 'Excusez-moi',
    'How are you?': 'Comment allez-vous?'
  },
  'Spain': {
    'Hello': 'Hola',
    'Thank you': 'Gracias',
    'Goodbye': 'Adiós',
    'Please': 'Por favor',
    'Yes': 'Sí',
    'No': 'No',
    'Excuse me': 'Disculpe',
    'How are you?': '¿Cómo estás?'
  },
  'Germany': {
    'Hello': 'Hallo',
    'Thank you': 'Danke',
    'Goodbye': 'Auf Wiedersehen',
    'Please': 'Bitte',
    'Yes': 'Ja',
    'No': 'Nein',
    'Excuse me': 'Entschuldigung',
    'How are you?': 'Wie geht es Ihnen?'
  },
  'Italy': {
    'Hello': 'Ciao',
    'Thank you': 'Grazie',
    'Goodbye': 'Arrivederci',
    'Please': 'Per favore',
    'Yes': 'Sì',
    'No': 'No',
    'Excuse me': 'Scusi',
    'How are you?': 'Come sta?'
  },
  'Japan': {
    'Hello': 'こんにちは (Konnichiwa)',
    'Thank you': 'ありがとう (Arigatou)',
    'Goodbye': 'さようなら (Sayounara)',
    'Please': 'お願いします (Onegaishimasu)',
    'Yes': 'はい (Hai)',
    'No': 'いいえ (Iie)',
    'Excuse me': 'すみません (Sumimasen)',
    'How are you?': 'お元気ですか？ (Ogenki desu ka?)'
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const destination = searchParams.get('destination')

  if (!destination) {
    return NextResponse.json({ error: 'Destination is required' }, { status: 400 })
  }

  const country = destination.split(', ')[1] || destination
  const countryPhrases = phrases[country] || {}

  return NextResponse.json({ phrases: countryPhrases })
}

