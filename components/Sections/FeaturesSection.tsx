'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PhoneMockup, { RecoveryScreen, SleepScreen, StrainScreen, PredictionScreen } from '../UI/PhoneMockup'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    id: 'prediction',
    title: 'See Tomorrow Today',
    description: 'While other apps tell you what happened yesterday, VitalScore tells you what\'s coming tomorrow.',
    highlight: 'Predicted Score: 84%',
    color: 'violet',
  },
  {
    id: 'recovery',
    title: 'Know When to Push',
    description: 'Understand your body\'s recovery in real-time. Know exactly how ready you are for your next challenge.',
    highlight: 'Recovery: 88%',
    color: 'violet',
  },
  {
    id: 'sleep',
    title: 'Sleep Smarter',
    description: 'Go beyond hours. Understand your sleep stages, identify disruptions, and optimize your rest.',
    highlight: 'Sleep Score: 82',
    color: 'teal',
  },
  {
    id: 'strain',
    title: 'Train With Intelligence',
    description: 'Stop guessing if you\'re doing enough — or too much. Balance strain against your recovery.',
    highlight: 'Strain: 65%',
    color: 'amber',
  },
]

const phoneScreens = [
  { id: 'prediction', title: 'Prediction', content: <PredictionScreen /> },
  { id: 'recovery', title: 'Recovery', content: <RecoveryScreen /> },
  { id: 'sleep', title: 'Sleep', content: <SleepScreen /> },
  { id: 'strain', title: 'Strain', content: <StrainScreen /> },
]

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const featuresContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Animate section header
      gsap.from('.features-header', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.features-header',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      // Animate each feature card on scroll
      gsap.utils.toArray('.feature-card').forEach((card, index) => {
        gsap.from(card as HTMLElement, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card as HTMLElement,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })

        // Highlight text animation
        gsap.from((card as HTMLElement).querySelector('.feature-highlight'), {
          scale: 0.9,
          opacity: 0,
          duration: 0.6,
          delay: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: card as HTMLElement,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      // Phone sticky behavior
      ScrollTrigger.create({
        trigger: featuresContainerRef.current,
        start: 'top 20%',
        end: 'bottom 80%',
        pin: '.phone-sticky',
        pinSpacing: false,
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="features"
      className="section relative bg-dark"
    >
      <div className="container">
        {/* Section header */}
        <div className="features-header text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Health Intelligence,{' '}
            <span className="text-gradient">Reimagined</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            VitalScore doesn't just show you data — it understands you,
            predicts your health, and guides you toward your best self.
          </p>
        </div>

        {/* Features with phone */}
        <div
          ref={featuresContainerRef}
          id="features-trigger"
          className="relative"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Phone - sticky on desktop */}
            <div className="hidden lg:block">
              <div className="phone-sticky">
                <div className="flex justify-center">
                  <PhoneMockup
                    screens={phoneScreens}
                    triggerId="features-trigger"
                  />
                </div>
              </div>
            </div>

            {/* Feature cards */}
            <div className="space-y-32">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className="feature-card"
                >
                  {/* Mobile phone */}
                  <div className="lg:hidden mb-8 flex justify-center">
                    <div className="phone-mockup w-64 h-[500px]">
                      <div className="phone-screen p-4 pt-12">
                        {phoneScreens[index].content}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="glass-card-hover p-8 rounded-3xl">
                    <div
                      className={cn(
                        'feature-highlight inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4',
                        {
                          'bg-violet-500/20 text-violet-400': feature.color === 'violet',
                          'bg-teal-500/20 text-teal-400': feature.color === 'teal',
                          'bg-amber-500/20 text-amber-400': feature.color === 'amber',
                        }
                      )}
                    >
                      {feature.highlight}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      {feature.title}
                    </h3>

                    <p className="text-gray-400 text-lg leading-relaxed mb-6">
                      {feature.description}
                    </p>

                    <div className="flex items-center gap-2 text-violet-400 font-medium group cursor-pointer">
                      <span>Learn more</span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="transform group-hover:translate-x-1 transition-transform duration-300"
                      >
                        <path
                          d="M5 12h14M12 5l7 7-7 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
