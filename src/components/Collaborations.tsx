import Image from 'next/image'

const partners = [
  { name: 'Luxury Hotels', logo: '/placeholder.svg?height=80&width=200' },
  { name: 'Adventure Tours', logo: '/placeholder.svg?height=80&width=200' },
  { name: 'City Explorers', logo: '/placeholder.svg?height=80&width=200' },
  { name: 'Cruise Lines', logo: '/placeholder.svg?height=80&width=200' },
]

export default function Collaborations() {
  return (
    <section id="collaborations" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">Our Trusted Partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center justify-center">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={200}
                height={80}
                className="max-w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

