import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Collaborations from '@/components/Collaborations'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero />
        <Features />
        <Collaborations />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}

