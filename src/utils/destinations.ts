export const destinations: { [key: string]: any } = {
    "Mumbai": {
      name: "Mumbai",
      activities: [
        "Visit the Gateway of India",
        "Take a stroll along Marine Drive",
        "Explore the Elephanta Caves",
        "Visit Chhatrapati Shivaji Terminus",
        "Shop at Colaba Causeway",
        "Take a tour of Dharavi",
        "Visit Haji Ali Dargah",
        "Explore Sanjay Gandhi National Park",
        "Watch a Bollywood movie at a local cinema",
        "Visit Siddhivinayak Temple",
      ],
      averageDailyCost: {
        budget: 30,
        balanced: 80,
        luxury: 200,
      },
    },
    "Delhi": {
      name: "Delhi",
      activities: [
        "Visit the Red Fort",
        "Explore Chandni Chowk",
        "Visit Qutub Minar",
        "Explore Humayun's Tomb",
        "Visit India Gate",
        "Explore Lodhi Gardens",
        "Visit Akshardham Temple",
        "Shop at Connaught Place",
        "Visit Jama Masjid",
        "Explore Hauz Khas Complex",
      ],
      averageDailyCost: {
        budget: 25,
        balanced: 70,
        luxury: 180,
      },
    },
    // Add more destinations here...
    "default": {
      name: "Unknown Destination",
      activities: [
        "Explore local attractions",
        "Try local cuisine",
        "Visit museums and galleries",
        "Take a city tour",
        "Relax in parks and green spaces",
      ],
      averageDailyCost: {
        budget: 50,
        balanced: 100,
        luxury: 250,
      },
    }
  };
  
  