export interface TrainInfo {
  number: string;
  name: string;
  from: string;
  to: string;
  duration: string;
}

interface TransportationInfo {
  type: 'flight' | 'train' | 'car';
  description: string;
  details?: TrainInfo[];
}

const indianTrains: { [key: string]: TrainInfo[] } = {
  'Mumbai-Delhi': [
    {
      number: '12952',
      name: 'New Delhi Rajdhani Exp',
      from: 'Mumbai Central or Borivali',
      to: 'New Delhi Junction',
      duration: '15 Hours'
    },
    {
      number: '12953',
      name: 'August Kranti Rajdhani Exp',
      from: 'Mumbai Central or Borivali',
      to: 'Hazrat Nizamuddin station',
      duration: '17 Hours'
    }
  ],
  'Delhi-Mumbai': [
    {
      number: '12951',
      name: 'New Delhi Rajdhani Exp',
      from: 'New Delhi',
      to: 'Mumbai Central or Borivali',
      duration: '15 Hours'
    },
    {
      number: '12954',
      name: 'August Kranti Rajdhani Exp',
      from: 'Hazrat Nizamuddin',
      to: 'Mumbai Central or Borivali',
      duration: '17 Hours'
    }
  ],
  'Mumbai-Srinagar': [
    {
      number: '12471',
      name: 'Bandra Terminus - Jammu Tawi Swaraj Express',
      from: 'Bandra Terminus',
      to: 'Jammu Tawi',
      duration: '32 Hours 35 Minutes'
    }
  ],
  // Add more train routes here
};

const indianFlights: { [key: string]: string } = {
  'Mumbai-Delhi': 'Direct flights available with multiple airlines. Flight duration is approximately 2 hours.',
  'Delhi-Mumbai': 'Direct flights available with multiple airlines. Flight duration is approximately 2 hours.',
  'Mumbai-Srinagar': 'Direct flights available with multiple airlines. Flight duration is approximately 2 hours 30 minutes.',
  // Add more flight routes here
};

export const transportationModes = {
  flight: (source: string, destination: string): TransportationInfo => {
    const key = `${source}-${destination}`;
    const flightInfo = indianFlights[key] || `Flights available from ${source} to ${destination}. Please check with airlines for exact schedules.`;
    return {
      type: 'flight',
      description: flightInfo
    };
  },
  train: (source: string, destination: string): TransportationInfo => {
    const key = `${source}-${destination}`;
    const trains = indianTrains[key];
    if (trains) {
      return {
        type: 'train',
        description: `Train options available from ${source} to ${destination}`,
        details: trains
      };
    }
    return {
      type: 'train',
      description: `No direct trains found from ${source} to ${destination}. Consider breaking your journey or choosing an alternative mode of transport.`
    };
  },
  car: (source: string, destination: string): TransportationInfo => ({
    type: 'car',
    description: `Drive from ${source} to ${destination} by car. Please check road conditions and travel time before embarking on your journey.`
  })
};

