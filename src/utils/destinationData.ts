export interface Attraction {
    name: string;
    description: string;
    suggestedDuration: string;
    category: string[];
  }
  
  export interface Destination {
    name: string;
    country: string;
    attractions: Attraction[];
    cuisines: string[];
    events: {
      name: string;
      date: string;
      description: string;
    }[];
  }
  
  export const destinationData: Destination[] = [
    {
      name: "Paris",
      country: "France",
      attractions: [
        {
          name: "Eiffel Tower",
          description: "Iconic iron lattice tower on the Champ de Mars",
          suggestedDuration: "2-3 hours",
          category: ["Landmark", "Architecture"]
        },
        {
          name: "Louvre Museum",
          description: "World's largest art museum and home to many famous works including the Mona Lisa",
          suggestedDuration: "3-4 hours",
          category: ["Museum", "Art"]
        },
        // Add more attractions
      ],
      cuisines: ["French", "Mediterranean", "International"],
      events: [
        {
          name: "Bastille Day",
          date: "July 14",
          description: "French National Day celebrations with parades and fireworks"
        },
        // Add more events
      ]
    },
    // Add more destinations
  ];
  
  export function getDestinationData(destination: string): Destination | undefined {
    return destinationData.find(d => d.name.toLowerCase() === destination.toLowerCase());
  }
  
  