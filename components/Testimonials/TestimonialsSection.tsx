'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    id: 1,
    content: "VitalScore predicted I was getting sick 2 days before I felt anything. I took it easy and recovered fast. This app is genuinely incredible.",
    author: "@healthnerd23",
    rating: 5,
    date: "Dec 15, 2024",
  },
  {
    id: 2,
    content: "The Vitality Orb is addictive. I check it first thing every morning. It's like having a health coach in my pocket.",
    author: "@fitnessjunkie",
    rating: 5,
    date: "Dec 10, 2024",
  },
  {
    id: 3,
    content: "Finally an app that tells me WHEN to work out, not just tracks what I did. The prediction feature is a game-changer.",
    author: "@marathonmike",
    rating: 5,
    date: "Dec 8, 2024",
  },
  {
    id: 4,
    content: "I've used Whoop and Oura. VitalScore is better. The AI actually understands my patterns and gives useful advice.",
    author: "@biohacker_sarah",
    rating: 5,
    date: "Dec 5, 2024",
  },
  {
    id: 5,
    content: "The sleep analysis is incredibly accurate. It caught that my 'restless sleep' was linked to late caffeine. Mind blown.",
    author: "@sleepscience",
    rating: 5,
    date: "Dec 3, 2024",
  },
  {
    id: 6,
    content: "Clean design, insanely accurate predictions, and the orb animation is beautiful. Worth every penny.",
    author: "@techreviewsguy",
    rating: 5,
    date: "Nov 28, 2024",
  },
]

// Duplicate for seamless loop
const allTestimonials = [...testimonials, ...testimonials]

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !marqueeRef.current) return

    const ctx = gsap.context(() => {
      // Animate header
      gsap.from('.testimonials-header', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testimonials-header',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      // Pause marquee when not in view
      const marqueeAnimation = gsap.to('.marquee-track', {
        xPercent: -50,
        duration: 40,
        ease: 'none',
        repeat: -1,
      })

      ScrollTrigger.create({
        trigger: marqueeRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => marqueeAnimation.play(),
        onLeave: () => marqueeAnimation.pause(),
        onEnterBack: () => marqueeAnimation.play(),
        onLeaveBack: () => marqueeAnimation.pause(),
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const renderStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => (
      <svg
        key={i}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-amber-400"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))
  }

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="section relative overflow-hidden bg-dark"
    >
      <div className="container">
        {/* Section header */}
        <div className="testimonials-header text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-6">
            Reviews
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Loved by{' '}
            <span className="text-gradient">Thousands</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Join the community of health-conscious individuals who've transformed their wellness journey with VitalScore.
          </p>
        </div>
      </div>

      {/* Marquee */}
      <div
        ref={marqueeRef}
        className="relative overflow-hidden py-8"
        onMouseEnter={() => gsap.to('.marquee-track', { timeScale: 0.3, overwrite: true })}
        onMouseLeave={() => gsap.to('.marquee-track', { timeScale: 1, overwrite: true })}
      >
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />

        {/* Track */}
        <div className="marquee-track flex gap-6">
          {allTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="flex-shrink-0 w-[400px] glass-card p-6 rounded-2xl hover:border-violet-500/30 transition-colors duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Content */}
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <span className="text-white font-medium text-sm">
                  {testimonial.author}
                </span>
                <span className="text-gray-500 text-xs">
                  {testimonial.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* App Store rating */}
      <div className="container mt-16">
        <div className="glass-card max-w-md mx-auto p-6 rounded-2xl text-center">
          <div className="flex justify-center gap-1 mb-3">
            {renderStars(5)}
          </div>
          <div className="text-3xl font-bold text-white mb-1">4.9</div>
          <div className="text-gray-400 text-sm">
            Average rating on the App Store
          </div>
          <div className="text-gray-500 text-xs mt-2">
            Based on 2,400+ reviews
          </div>
        </div>
      </div>
    </section>
  )
}
