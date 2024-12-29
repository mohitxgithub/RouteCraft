import { MapPin, Hotel, Calendar, Compass } from 'lucide-react'

const features = [
  {
    icon: <MapPin className="w-8 h-8 text-blue-600" />,
    title: 'Customized Itineraries',
    description: 'Tailor-made travel plans based on your preferences and interests.',
  },
  {
    icon: <Hotel className="w-8 h-8 text-blue-600" />,
    title: 'Hotel Partnerships',
    description: 'Exclusive deals with top-rated hotels for comfortable stays.',
  },
  {
    icon: <Calendar className="w-8 h-8 text-blue-600" />,
    title: 'Flexible Scheduling',
    description: 'Easily adjust your plans on-the-go with our dynamic scheduling.',
  },
  {
    icon: <Compass className="w-8 h-8 text-blue-600" />,
    title: 'Expert Trip Makers',
    description: 'Collaborate with experienced trip makers for insider knowledge.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">
          Why Choose RouteCraft?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-black">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
