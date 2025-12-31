'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Smooth easing
export const easeSmooth = 'power3.out'
export const easeBounce = 'back.out(1.7)'
export const easeElastic = 'elastic.out(1, 0.5)'

// Fade in up animation
export function fadeInUp(
  element: HTMLElement | string,
  options: {
    duration?: number
    delay?: number
    y?: number
    scrollTrigger?: boolean
    triggerStart?: string
  } = {}
) {
  const { duration = 0.8, delay = 0, y = 40, scrollTrigger = false, triggerStart = 'top 85%' } = options

  const animation = {
    y: 0,
    opacity: 1,
    duration,
    delay,
    ease: easeSmooth,
  }

  if (scrollTrigger) {
    gsap.from(element, {
      y,
      opacity: 0,
      scrollTrigger: {
        trigger: element,
        start: triggerStart,
        toggleActions: 'play none none reverse',
      },
      ...animation,
    })
  } else {
    gsap.from(element, {
      y,
      opacity: 0,
      ...animation,
    })
  }
}

// Stagger animation for multiple elements
export function staggerReveal(
  elements: HTMLElement[] | string,
  options: {
    duration?: number
    stagger?: number
    y?: number
    scrollTrigger?: boolean
    triggerElement?: HTMLElement | string
  } = {}
) {
  const {
    duration = 0.6,
    stagger = 0.1,
    y = 30,
    scrollTrigger = false,
    triggerElement,
  } = options

  const animation = {
    y: 0,
    opacity: 1,
    duration,
    stagger,
    ease: easeSmooth,
  }

  if (scrollTrigger && triggerElement) {
    gsap.from(elements, {
      y,
      opacity: 0,
      scrollTrigger: {
        trigger: triggerElement,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      ...animation,
    })
  } else {
    gsap.from(elements, {
      y,
      opacity: 0,
      ...animation,
    })
  }
}

// Parallax effect
export function parallax(
  element: HTMLElement | string,
  options: {
    speed?: number
    direction?: 'vertical' | 'horizontal'
  } = {}
) {
  const { speed = 0.5, direction = 'vertical' } = options
  const prop = direction === 'vertical' ? 'yPercent' : 'xPercent'

  gsap.to(element, {
    [prop]: speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

// Phone screen scroll animation
export function phoneScreenScroll(
  screenContainer: HTMLElement | string,
  triggerElement: HTMLElement | string,
  totalScreens: number
) {
  const screens = gsap.utils.toArray(`${screenContainer} > *`) as HTMLElement[]

  screens.forEach((screen, index) => {
    if (index === 0) return // First screen is visible by default

    gsap.set(screen, { yPercent: 100, opacity: 0 })

    ScrollTrigger.create({
      trigger: triggerElement,
      start: `${(index / totalScreens) * 100}% center`,
      end: `${((index + 1) / totalScreens) * 100}% center`,
      onEnter: () => {
        gsap.to(screen, {
          yPercent: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power2.out',
        })
        if (screens[index - 1]) {
          gsap.to(screens[index - 1], {
            yPercent: -25,
            opacity: 0,
            duration: 0.75,
            ease: 'power2.out',
          })
        }
      },
      onLeaveBack: () => {
        gsap.to(screen, {
          yPercent: 100,
          opacity: 0,
          duration: 0.75,
          ease: 'power2.out',
        })
        if (screens[index - 1]) {
          gsap.to(screens[index - 1], {
            yPercent: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power2.out',
          })
        }
      },
    })
  })
}

// Orb breathing animation
export function orbBreathing(element: HTMLElement | string) {
  const tl = gsap.timeline({ repeat: -1, yoyo: true })

  tl.to(element, {
    scale: 1.05,
    duration: 2,
    ease: 'sine.inOut',
  })

  return tl
}

// Orb glow animation
export function orbGlow(element: HTMLElement | string) {
  const tl = gsap.timeline({ repeat: -1, yoyo: true })

  tl.to(element, {
    opacity: 1,
    scale: 1.1,
    duration: 2.5,
    ease: 'sine.inOut',
  })

  return tl
}

// Character stagger for buttons
export function charStagger(
  button: HTMLElement,
  chars: HTMLElement[]
) {
  button.addEventListener('mouseenter', () => {
    chars.forEach((char, index) => {
      gsap.to(char, {
        y: -8,
        duration: 0.3,
        delay: index * 0.02,
        ease: easeBounce,
      })
    })
  })

  button.addEventListener('mouseleave', () => {
    chars.forEach((char, index) => {
      gsap.to(char, {
        y: 0,
        duration: 0.3,
        delay: index * 0.02,
        ease: easeSmooth,
      })
    })
  })
}

// Scroll-triggered counter animation
export function countUp(
  element: HTMLElement | string,
  endValue: number,
  options: {
    duration?: number
    suffix?: string
  } = {}
) {
  const { duration = 2, suffix = '' } = options

  gsap.from(element, {
    textContent: 0,
    duration,
    ease: 'power2.out',
    snap: { textContent: 1 },
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    onUpdate: function () {
      const el = typeof element === 'string' ? document.querySelector(element) : element
      if (el) {
        el.textContent = Math.round(parseFloat(el.textContent || '0')) + suffix
      }
    },
  })
}

// Reveal on scroll
export function revealOnScroll(element: HTMLElement | string) {
  gsap.from(element, {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: easeSmooth,
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  })
}

// Initialize all scroll animations
export function initScrollAnimations() {
  // Reveal elements
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    revealOnScroll(el as HTMLElement)
  })

  // Parallax elements
  gsap.utils.toArray('[data-parallax]').forEach((el) => {
    const speed = parseFloat((el as HTMLElement).dataset.parallaxSpeed || '0.2')
    parallax(el as HTMLElement, { speed })
  })
}

// Kill all scroll triggers (cleanup)
export function killScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
}
