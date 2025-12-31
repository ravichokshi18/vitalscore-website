'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

interface PhoneScreen {
  id: string
  title: string
  content: React.ReactNode
}

interface PhoneMockupProps {
  screens: PhoneScreen[]
  triggerId: string
  className?: string
}

gsap.registerPlugin(ScrollTrigger)

export default function PhoneMockup({ screens, triggerId, className }: PhoneMockupProps) {
  const phoneRef = useRef<HTMLDivElement>(null)
  const screenContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!phoneRef.current || !screenContainerRef.current) return

    const trigger = document.getElementById(triggerId)
    if (!trigger) return

    const ctx = gsap.context(() => {
      const screenElements = screenContainerRef.current!.children

      // Set initial states - all screens stacked, only first visible
      gsap.set(Array.from(screenElements).slice(1), {
        yPercent: 100,
        opacity: 0,
      })

      // Create scroll triggers for each screen transition
      screens.forEach((_, index) => {
        if (index === 0) return // Skip first screen

        const progress = index / screens.length

        ScrollTrigger.create({
          trigger: trigger,
          start: `${progress * 100}% center`,
          end: `${((index + 1) / screens.length) * 100}% center`,
          onEnter: () => {
            // Hide previous screen
            gsap.to(screenElements[index - 1], {
              yPercent: -25,
              opacity: 0,
              duration: 0.6,
              ease: 'power2.out',
            })
            // Show current screen
            gsap.to(screenElements[index], {
              yPercent: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
            })
          },
          onLeaveBack: () => {
            // Show previous screen
            gsap.to(screenElements[index - 1], {
              yPercent: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
            })
            // Hide current screen
            gsap.to(screenElements[index], {
              yPercent: 100,
              opacity: 0,
              duration: 0.6,
              ease: 'power2.out',
            })
          },
        })
      })
    }, phoneRef)

    return () => ctx.revert()
  }, [screens, triggerId])

  return (
    <div
      ref={phoneRef}
      className={cn('phone-mockup', className)}
    >
      {/* Notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-20" />

      {/* Screen container */}
      <div className="phone-screen relative">
        <div
          ref={screenContainerRef}
          className="absolute inset-0 overflow-hidden"
        >
          {screens.map((screen) => (
            <div
              key={screen.id}
              className="absolute inset-0 p-4 pt-12"
            >
              {screen.content}
            </div>
          ))}
        </div>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-gray-600 rounded-full" />
    </div>
  )
}

// Phone screen content components
export function RecoveryScreen() {
  return (
    <div className="h-full flex flex-col">
      <div className="text-xs text-gray-400 mb-2">Today</div>
      <div className="text-lg font-semibold text-white mb-4">Recovery</div>

      {/* Score circle */}
      <div className="flex justify-center mb-6">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">88%</div>
            <div className="text-xs text-white/80">Optimal</div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-3">
        <div className="glass-card p-3 flex justify-between items-center">
          <span className="text-sm text-gray-300">HRV</span>
          <span className="text-sm font-semibold text-teal-400">62ms <span className="text-xs">↑</span></span>
        </div>
        <div className="glass-card p-3 flex justify-between items-center">
          <span className="text-sm text-gray-300">Resting HR</span>
          <span className="text-sm font-semibold text-teal-400">52 bpm <span className="text-xs">↓</span></span>
        </div>
        <div className="glass-card p-3 flex justify-between items-center">
          <span className="text-sm text-gray-300">Sleep</span>
          <span className="text-sm font-semibold text-white">7h 32m</span>
        </div>
      </div>
    </div>
  )
}

export function SleepScreen() {
  return (
    <div className="h-full flex flex-col">
      <div className="text-xs text-gray-400 mb-2">Last Night</div>
      <div className="text-lg font-semibold text-white mb-4">Sleep Analysis</div>

      {/* Score */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
          <span className="text-xl font-bold text-white">82</span>
        </div>
        <div>
          <div className="text-sm text-white font-medium">Good Sleep</div>
          <div className="text-xs text-gray-400">7h 32m total</div>
        </div>
      </div>

      {/* Sleep stages */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 bg-violet-500 rounded-full" />
          <span className="text-xs text-gray-400">Deep: 1h 45m</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-20 h-2 bg-teal-500 rounded-full" />
          <span className="text-xs text-gray-400">REM: 2h 10m</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 bg-gray-500 rounded-full" />
          <span className="text-xs text-gray-400">Light: 3h 37m</span>
        </div>
      </div>

      {/* Efficiency */}
      <div className="glass-card p-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-300">Sleep Efficiency</span>
          <span className="text-sm font-semibold text-teal-400">91%</span>
        </div>
      </div>
    </div>
  )
}

export function StrainScreen() {
  return (
    <div className="h-full flex flex-col">
      <div className="text-xs text-gray-400 mb-2">Today</div>
      <div className="text-lg font-semibold text-white mb-4">Strain</div>

      {/* Score */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
          <span className="text-xl font-bold text-white">65%</span>
        </div>
        <div>
          <div className="text-sm text-white font-medium">Moderate Strain</div>
          <div className="text-xs text-gray-400">654 active cal</div>
        </div>
      </div>

      {/* HR Zones */}
      <div className="space-y-2">
        <div className="text-xs text-gray-400 mb-2">Heart Rate Zones</div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-2 bg-rose-500 rounded-full" />
          <span className="text-xs text-gray-400">Zone 5: 8m</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-12 h-2 bg-orange-500 rounded-full" />
          <span className="text-xs text-gray-400">Zone 4: 15m</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-20 h-2 bg-amber-500 rounded-full" />
          <span className="text-xs text-gray-400">Zone 3: 32m</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 bg-teal-500 rounded-full" />
          <span className="text-xs text-gray-400">Zone 2: 25m</span>
        </div>
      </div>
    </div>
  )
}

export function PredictionScreen() {
  return (
    <div className="h-full flex flex-col">
      <div className="text-xs text-gray-400 mb-2">Tomorrow</div>
      <div className="text-lg font-semibold text-white mb-4">Prediction</div>

      {/* Predicted score */}
      <div className="glass-card p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-300">Predicted Score</span>
          <span className="text-xs text-gray-500">±5%</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-4xl font-bold text-violet-400">84%</div>
          <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full w-[84%] bg-gradient-to-r from-violet-500 to-violet-400 rounded-full" />
          </div>
        </div>
      </div>

      {/* Suggestion */}
      <div className="glass-card p-4 border-l-2 border-violet-500">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-violet-400">
              <path d="M12 2v10l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div>
            <div className="text-sm text-white font-medium mb-1">Sleep by 10:30pm</div>
            <div className="text-xs text-gray-400">to reach 89% tomorrow</div>
          </div>
        </div>
      </div>
    </div>
  )
}
