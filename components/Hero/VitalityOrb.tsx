'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface VitalityOrbProps {
  score?: number
  state?: 'optimal' | 'good' | 'moderate' | 'low'
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  showScore?: boolean
  className?: string
}

export default function VitalityOrb({
  score = 87,
  state = 'optimal',
  size = 'lg',
  animated = true,
  showScore = true,
  className,
}: VitalityOrbProps) {
  const orbRef = useRef<HTMLDivElement>(null)
  const [displayScore, setDisplayScore] = useState(0)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  // Animate score counter
  useEffect(() => {
    if (!showScore) return

    const duration = 2000
    const startTime = Date.now()
    const startValue = 0
    const endValue = score

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayScore(Math.round(startValue + (endValue - startValue) * eased))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    const timer = setTimeout(() => {
      requestAnimationFrame(animate)
    }, 500)

    return () => clearTimeout(timer)
  }, [score, showScore])

  // Generate particles
  useEffect(() => {
    if (!animated) return

    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
    }))
    setParticles(newParticles)
  }, [animated])

  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64 md:w-72 md:h-72',
  }

  const scoreSizes = {
    sm: 'text-3xl',
    md: 'text-4xl',
    lg: 'text-6xl md:text-7xl',
  }

  const labelSizes = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm',
  }

  const stateLabels = {
    optimal: 'OPTIMAL',
    good: 'GOOD',
    moderate: 'MODERATE',
    low: 'REST',
  }

  const stateColors = {
    optimal: {
      gradient: 'from-violet-300 via-violet-500 to-violet-700',
      glow: 'rgba(124, 58, 237, 0.5)',
      ring: 'border-violet-500/30',
    },
    good: {
      gradient: 'from-teal-300 via-teal-500 to-teal-700',
      glow: 'rgba(20, 184, 166, 0.5)',
      ring: 'border-teal-500/30',
    },
    moderate: {
      gradient: 'from-amber-300 via-amber-500 to-amber-700',
      glow: 'rgba(245, 158, 11, 0.5)',
      ring: 'border-amber-500/30',
    },
    low: {
      gradient: 'from-rose-300 via-rose-500 to-rose-700',
      glow: 'rgba(244, 63, 94, 0.5)',
      ring: 'border-rose-500/30',
    },
  }

  const colors = stateColors[state]

  return (
    <div
      ref={orbRef}
      className={cn(
        'relative flex items-center justify-center',
        sizeClasses[size],
        className
      )}
    >
      {/* Outer glow */}
      <div
        className={cn(
          'absolute inset-[-30%] rounded-full blur-3xl opacity-60',
          animated && 'animate-pulse-slow'
        )}
        style={{ backgroundColor: colors.glow }}
      />

      {/* Pulsing ring */}
      <div
        className={cn(
          'absolute inset-[-15%] rounded-full border',
          colors.ring,
          animated && 'animate-pulse-slow'
        )}
      />

      {/* Second ring */}
      <div
        className={cn(
          'absolute inset-[-8%] rounded-full border',
          colors.ring,
          'opacity-50',
          animated && 'animate-pulse-slow'
        )}
        style={{ animationDelay: '0.5s' }}
      />

      {/* Main orb */}
      <div
        className={cn(
          'absolute inset-0 rounded-full bg-gradient-to-br shadow-2xl',
          colors.gradient,
          animated && 'animate-breathe'
        )}
      >
        {/* Inner highlight */}
        <div className="absolute top-[15%] left-[20%] w-[35%] h-[25%] bg-gradient-to-b from-white/40 to-transparent rounded-full blur-md" />

        {/* Edge highlight */}
        <div className="absolute inset-1 rounded-full border border-white/20" />
      </div>

      {/* Floating particles */}
      {animated && particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1.5 h-1.5 bg-white/60 rounded-full animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
          }}
        />
      ))}

      {/* Score display */}
      {showScore && (
        <div className="relative z-10 flex flex-col items-center text-white">
          <span
            className={cn(
              'font-bold font-display tabular-nums',
              scoreSizes[size]
            )}
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
          >
            {displayScore}
          </span>
          <span
            className={cn(
              'font-semibold tracking-[0.2em] uppercase mt-1',
              labelSizes[size]
            )}
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.3)' }}
          >
            {stateLabels[state]}
          </span>
        </div>
      )}
    </div>
  )
}
