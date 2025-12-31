'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SmoothScrollProps {
  children: React.ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // Add lenis-smooth class to html
    document.documentElement.classList.add('lenis-smooth')

    // Initialize Lenis with optimized settings for buttery smooth scroll
    const lenis = new Lenis({
      lerp: 0.06, // Lower = smoother (0.05-0.1 is the sweet spot)
      wheelMultiplier: 0.7, // Slower scroll speed = smoother feel
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.5,
    })

    // Sync with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Animation frame loop - this is key for smooth performance
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Smooth anchor scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLAnchorElement
      const href = target.getAttribute('href')
      if (href?.startsWith('#')) {
        e.preventDefault()
        const element = document.querySelector(href)
        if (element) {
          lenis.scrollTo(element as HTMLElement, { offset: -80 })
        }
      }
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', handleAnchorClick as EventListener)
    })

    // Cleanup
    return () => {
      document.documentElement.classList.remove('lenis-smooth')
      lenis.destroy()
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener('click', handleAnchorClick as EventListener)
      })
    }
  }, [])

  return <>{children}</>
}
