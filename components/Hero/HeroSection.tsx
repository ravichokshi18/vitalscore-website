'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import VitalityOrb from './VitalityOrb'
import AnimatedButton from '../UI/AnimatedButton'
import { cn } from '@/lib/utils'

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const orbContainerRef = useRef<HTMLDivElement>(null)
  const badgesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set('.hero-title-word', { y: 100, opacity: 0 })
      gsap.set('.hero-subtitle', { y: 30, opacity: 0 })
      gsap.set('.hero-cta', { y: 30, opacity: 0 })
      gsap.set('.hero-badge', { y: 20, opacity: 0, scale: 0.9 })
      gsap.set('.hero-orb', { scale: 0.8, opacity: 0 })
      gsap.set('.hero-scroll-indicator', { y: 20, opacity: 0 })

      // Timeline
      const tl = gsap.timeline({ delay: 0.3 })

      // Animate title words
      tl.to('.hero-title-word', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
      })

      // Animate orb
      tl.to('.hero-orb', {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=0.6')

      // Animate subtitle
      tl.to('.hero-subtitle', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.8')

      // Animate CTA
      tl.to('.hero-cta', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.6')

      // Animate badges
      tl.to('.hero-badge', {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      }, '-=0.4')

      // Animate scroll indicator
      tl.to('.hero-scroll-indicator', {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.2')

      // Parallax on scroll
      gsap.to('.hero-orb', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to('.hero-content', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Grid background */}
      <div className="grid-bg" />

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-[10%] w-2 h-2 bg-violet-400/40 rounded-full animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-1/3 right-[15%] w-3 h-3 bg-violet-400/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/3 left-[20%] w-2 h-2 bg-violet-400/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-2/3 right-[25%] w-1.5 h-1.5 bg-violet-400/40 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />

      {/* Main content */}
      <div className="container relative z-10">
        <div className="hero-content flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 overflow-hidden">
            <span className="hero-title-word inline-block text-gradient-hero">Know</span>{' '}
            <span className="hero-title-word inline-block text-gradient-hero">What's</span>{' '}
            <span className="hero-title-word inline-block text-gradient">Coming</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-lg md:text-xl text-gray-400 max-w-xl mb-8">
            Predict tomorrow's recovery. Catch illness early. Get recommendations that work.
          </p>

          {/* CTA */}
          <div className="hero-cta mb-10">
            <AnimatedButton
              href="#download"
              size="lg"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              }
            >
              Download on App Store
            </AnimatedButton>
          </div>

          {/* Badges */}
          <div ref={badgesRef} className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <div className="hero-badge glass-card px-4 py-2 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-violet-400">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm font-medium text-gray-300">Apple Watch</span>
            </div>
            <div className="hero-badge glass-card px-4 py-2 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber-400">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm font-medium text-gray-300">Featured App</span>
            </div>
            <div className="hero-badge glass-card px-4 py-2 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-teal-400">
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="text-sm font-medium text-gray-300">AI-Powered</span>
            </div>
          </div>

          {/* Orb */}
          <div ref={orbContainerRef} className="hero-orb relative">
            <VitalityOrb
              score={87}
              state="optimal"
              size="lg"
              animated={true}
              showScore={true}
            />
          </div>

          {/* Scroll indicator */}
          <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
            <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex justify-center pt-2">
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
