import Link from 'next/link'

export default function CallToAction() {
  return (
    <section className="py-20 bg-blue-600 text-white">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-4">Ready to Start Your Adventure?</h2>
    <p className="text-xl mb-8">Create your personalized travel itinerary today and explore the world with confidence.</p>
    <Link
      href="#"
      className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold text-lg hover:bg-gray-100 transition duration-300"
    >
      Get Started for Free
    </Link>
  </div>
</section>

  )
}