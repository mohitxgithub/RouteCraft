import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Collaborations from '@/components/Collaborations'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'
import TripPlannerForm from '@/components/TripPlannerForm'
import Link from 'next/link'  // Import Link from Next.js

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero />
        <Features />
        <TripPlannerForm />
        {/* Add the Link to Itinerary Page */}
        <div className="text-center mt-6">
          <Link href="/itinerary-page" className="text-blue-600 hover:text-blue-800">
            Go to Your Itinerary
          </Link>
        </div>
        <Collaborations />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
