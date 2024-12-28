import Image from 'next/image'

const steps = [
  {
    title:<span className="text-black">Create Your Profile</span>,
    description: 'Tell us about your travel preferences, interests, and budget.',
    image: '/placeholder.svg?height=200&width=200'
  },
  {
    title:<span className="text-black">Choose Your Destination</span>,
    description: 'Select where you want to go or get inspired by our suggestions.',
    image: '/placeholder.svg?height=200&width=200'
  },
  {
    title:<span className="text-black">Customize Your Itinerary</span>,
    description: 'Use our AI-powered planner to create your perfect trip.',
    image: '/placeholder.svg?height=200&width=200'
  },
  {
    title:<span className="text-black">Book and go!</span> ,
    description: 'Confirm your plans and enjoy your personalized adventure.',
    image: '/placeholder.svg?height=200&width=200'
  }
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">How RouteCraft Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 relative">
                <Image
                  src={step.image}
                  alt={step.title}
                  width={200}
                  height={200}
                  className="rounded-full"
                />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-white bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}