import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import PopularDestinations from '@/components/PopularDestinations'
import Testimonials from '@/components/Testimonials'
import DynamicTravelTipsWrapper from '@/components/DynamicTravelTipsWrapper'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main>
        <Hero />
        <Features />
        <PopularDestinations />
        <Testimonials />
        <DynamicTravelTipsWrapper />
      </main>
      <Footer />
    </div>
  )
}

