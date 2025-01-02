import axios from 'axios';

export interface Place {
  name: string;
  code: string;
}

export interface Country {
  name: string;
  code: string;
  places: Place[];
}

let worldData: Country[] = [];

async function fetchCountriesAndCities(): Promise<Country[]> {
  try {
    const response = await axios.get('https://countriesnow.space/api/v0.1/countries');
    const { data } = response.data;
    
    return data.map((country: any) => ({
      name: country.country,
      code: country.iso2,
      places: country.cities.map((city: string) => ({
        name: city,
        code: city.toLowerCase().replace(/\s+/g, '-')
      }))
    }));
  } catch (error) {
    console.error('Error fetching countries and cities:', error);
    return [];
  }
}

export async function getAllCountries(): Promise<Country[]> {
  if (worldData.length === 0) {
    worldData = await fetchCountriesAndCities();
  }
  return worldData;
}

export async function getPlacesForCountry(countryName: string): Promise<Place[]> {
  if (worldData.length === 0) {
    worldData = await fetchCountriesAndCities();
  }
  const country = worldData.find(c => c.name.toLowerCase() === countryName.toLowerCase());
  return country ? country.places : [];
}

