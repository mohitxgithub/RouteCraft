export interface Place {
    name: string;
    attractions: string[];
  }
  
  export interface Country {
    name: string;
    places: Place[];
  }
  
  export const countriesAndPlaces: Country[] = [
    {
      name: "United States",
      places: [
        {
          name: "New York City",
          attractions: ["Statue of Liberty", "Central Park", "Empire State Building", "Times Square", "Metropolitan Museum of Art"]
        },
        {
          name: "Los Angeles",
          attractions: ["Hollywood Sign", "Universal Studios", "Santa Monica Pier", "Griffith Observatory", "The Getty Center"]
        },
        {
          name: "Chicago",
          attractions: ["Millennium Park", "Art Institute of Chicago", "Willis Tower", "Navy Pier", "Magnificent Mile"]
        }
      ]
    },
    {
      name: "France",
      places: [
        {
          name: "Paris",
          attractions: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral", "Arc de Triomphe", "Champs-Élysées"]
        },
        {
          name: "Nice",
          attractions: ["Promenade des Anglais", "Old Town", "Castle Hill", "Marc Chagall National Museum", "Nice Cathedral"]
        },
        {
          name: "Lyon",
          attractions: ["Basilica of Notre-Dame de Fourvière", "Old Town", "Museum of Fine Arts", "Parc de la Tête d'Or", "Théâtres Romains de Fourvière"]
        }
      ]
    },
    {
      name: "Japan",
      places: [
        {
          name: "Tokyo",
          attractions: ["Tokyo Skytree", "Senso-ji Temple", "Meiji Shrine", "Shibuya Crossing", "Imperial Palace"]
        },
        {
          name: "Kyoto",
          attractions: ["Kinkaku-ji (Golden Pavilion)", "Fushimi Inari Shrine", "Arashiyama Bamboo Grove", "Nijo Castle", "Kiyomizu-dera Temple"]
        },
        {
          name: "Osaka",
          attractions: ["Osaka Castle", "Dotonbori", "Universal Studios Japan", "Shitennoji Temple", "Osaka Aquarium Kaiyukan"]
        }
      ]
    },
    {
      name: "Australia",
      places: [
        {
          name: "Sydney",
          attractions: ["Sydney Opera House", "Sydney Harbour Bridge", "Bondi Beach", "Royal Botanic Garden", "Taronga Zoo"]
        },
        {
          name: "Melbourne",
          attractions: ["Federation Square", "Royal Botanic Gardens", "National Gallery of Victoria", "Melbourne Cricket Ground", "Queen Victoria Market"]
        },
        {
          name: "Brisbane",
          attractions: ["South Bank Parklands", "Lone Pine Koala Sanctuary", "Story Bridge", "Queensland Museum", "Brisbane Botanic Gardens"]
        }
      ]
    },
    {
      name: "Brazil",
      places: [
        {
          name: "Rio de Janeiro",
          attractions: ["Christ the Redeemer", "Copacabana Beach", "Sugarloaf Mountain", "Ipanema Beach", "Tijuca National Park"]
        },
        {
          name: "São Paulo",
          attractions: ["Ibirapuera Park", "São Paulo Museum of Art", "Municipal Theatre", "Paulista Avenue", "Mercado Municipal"]
        },
        {
          name: "Salvador",
          attractions: ["Pelourinho", "Elevador Lacerda", "Farol da Barra", "São Francisco Church and Convent", "Mercado Modelo"]
        }
      ]
    }
  ];
  
  export function getAllCountries(): string[] {
    return countriesAndPlaces.map(country => country.name);
  }
  
  export function getPlacesForCountry(countryName: string): string[] {
    const country = countriesAndPlaces.find(c => c.name.toLowerCase() === countryName.toLowerCase());
    return country ? country.places.map(place => place.name) : [];
  }
  
  