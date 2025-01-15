interface PhraseEntry {
  [key: string]: { [key: string]: string };
}

export const phrasesDatabase: PhraseEntry = {
  'France': {
    'Hello': 'Bonjour',
    'Thank you': 'Merci',
    'Goodbye': 'Au revoir',
    'Please': 'S\'il vous plaît',
    'Yes': 'Oui',
    'No': 'Non'
  },
  'United Kingdom': {
    'Hello': 'Hello',
    'Thank you': 'Thank you',
    'Goodbye': 'Goodbye',
    'Please': 'Please',
    'Yes': 'Yes',
    'No': 'No'
  },
  'India': {
    'Hello': 'Namaste',
    'Thank you': 'Dhanyavaad',
    'Goodbye': 'Alvida',
    'Please': 'Kripya',
    'Yes': 'Haan',
    'No': 'Nahi'
  },
  // Add more countries and phrases as needed
};

export function getPhrasesForCountry(country: string): { [key: string]: string } {
  return phrasesDatabase[country] || {};
}

