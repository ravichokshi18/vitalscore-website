'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const comparisons = [
  {
    feature: 'Scores',
    others: 'Show yesterday',
    vitalscore: 'Predict tomorrow',
    highlight: true,
  },
  {
    feature: 'AI',
    others: 'Premium add-on',
    vitalscore: 'Core experience',
    highlight: false,
  },
  {
    feature: 'Alerts',
    others: 'After symptoms',
    vitalscore: 'Before symptoms',
    highlight: true,
  },
  {
    feature: 'Visualization',
    others: 'Progress bars',
    vitalscore: 'Living Vitality Orb',
    highlight: false,
  },
  {
    feature: 'Personalization',
    others: 'Generic baselines',
    vitalscore: 'Your unique baseline',
    highlight: false,
  },
]

export default function ComparisonSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.comparison-header', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.comparison-header',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from('.comparison-table', {
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.comparison-table',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from('.comparison-row', {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.comparison-table',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="comparison"
      className="section relative bg-dark-100"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark to-dark-100" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="comparison-header text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-6">
            Why VitalScore
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Not Just Another{' '}
            <span className="text-gradient">Health App</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            See how VitalScore redefines what a health app can do.
          </p>
        </div>

        {/* Comparison table */}
        <div className="comparison-table max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-3 bg-white/5 border-b border-white/10">
              <div className="p-6 text-gray-400 font-medium">Feature</div>
              <div className="p-6 text-gray-400 font-medium text-center">Others</div>
              <div className="p-6 font-medium text-center">
                <span className="text-gradient">VitalScore</span>
              </div>
            </div>

            {/* Table rows */}
            {comparisons.map((row, index) => (
              <div
                key={index}
                className={cn(
                  'comparison-row grid grid-cols-3 border-b border-white/5 last:border-0',
                  row.highlight && 'bg-violet-500/5'
                )}
              >
                <div className="p-6 text-white font-medium flex items-center">
                  {row.feature}
                </div>
                <div className="p-6 text-center flex items-center justify-center">
                  <span className="text-gray-500 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-600">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    {row.others}
                  </span>
                </div>
                <div className="p-6 text-center flex items-center justify-center">
                  <span className="text-teal-400 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-teal-400">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {row.vitalscore}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
