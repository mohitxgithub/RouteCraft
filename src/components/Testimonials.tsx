'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Shubham Lande',
    role: 'Adventure Enthusiast',
    image: '/image/image-400x400 (1).jpg',
    quote: "RouteCraft made planning my backpacking trip across Europe a breeze. The customized itinerary was perfect!",
  },
  {
    name: 'Mohit Kattungal',
    role: 'Business Traveler',
    image: '/image/image-400x400.jpg',
    quote: 'As a frequent business traveler, RouteCraft has saved me countless hours of planning. Highly recommended!',
  },
  {
    name: 'Swara Patil',
    role: 'Family Vacationer',
    image: '/placeholder.svg?height=100&width=100',
    quote: 'Our family vacation was stress-free thanks to RouteCraft. The hotel recommendations were spot-on!',
  },
  {
    name: 'Adarsh Singh',
    role: 'Irritating Traveler from Palghar',
    image: '/image/image-400x400 (2).jpg',
    quote: "RouteCraft helped me discover hidden places in Palghar I never would have found on my own. I enjoyed my holiday with my friend Prem only because of RouteCraft.",
  },
  {
    name: 'Amaan Shaikh',
    role: 'Luxury Traveler',
    image: '/image/images (01).jpeg',
    quote: "The attention to detail in RouteCraft's luxury itineraries is unparalleled. Every trip feels tailor-made and exclusive.",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
      setTimeout(() => setIsAnimating(false), 600)
    }
  }

  const prevTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
      setTimeout(() => setIsAnimating(false), 600)
    }
  }

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000) // Auto-slide every 5 seconds
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="testimonials" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-black mb-12">What Our Users Say</h2>
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div
                    className={`bg-white p-6 rounded-lg shadow-lg transition-transform duration-500 ${
                      index === currentIndex ? 'scale-105 shadow-xl' : 'scale-100'
                    }`}
                  >
                    <div className="flex items-center mb-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full mr-4"
                      />
                      <div>
                        <h3 className="font-semibold text-black">{testimonial.name}</h3>
                        <p className="text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic text-lg">"{testimonial.quote}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  )
}
