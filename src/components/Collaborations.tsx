import Image from 'next/image'

const partners = [
  { name: 'Luxury Hotels', logo: '/luxury-hotels-logo.png' },
  { name: 'Adventure Tours', logo: '/adventure-tours-logo.png' },
  { name: 'City Explorers', logo: '/city-explorers-logo.png' },
  { name: 'Cruise Lines', logo: '/cruise-lines-logo.png' },
]

export default function Collaborations() {
  return (
    <section id="collaborations" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-500">Our Trusted Partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center justify-center">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={200}
                height={80}
                className="max-w-full h-auto grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

