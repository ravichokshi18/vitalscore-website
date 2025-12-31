'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface AnimatedButtonProps {
  children: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  icon?: React.ReactNode
}

export default function AnimatedButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  icon,
}: AnimatedButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const chars = children.split('')

  const baseStyles = cn(
    'relative inline-flex items-center justify-center font-semibold rounded-full overflow-hidden transition-all duration-400 group',
    {
      // Sizes
      'px-5 py-2.5 text-sm gap-2': size === 'sm',
      'px-8 py-4 text-base gap-2': size === 'md',
      'px-10 py-5 text-lg gap-3': size === 'lg',
      // Variants
      'bg-gradient-to-r from-violet-600 to-violet-700 text-white hover:shadow-[0_20px_40px_rgba(124,58,237,0.4)] hover:-translate-y-0.5':
        variant === 'primary',
      'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 hover:border-white/30':
        variant === 'secondary',
      'bg-transparent text-white border-2 border-violet-500 hover:bg-violet-500/10':
        variant === 'outline',
    },
    className
  )

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  const content = (
    <>
      {/* Gradient overlay for hover */}
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      )}

      {/* Character stagger text */}
      <span className="relative z-10 flex items-center gap-2">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span className="flex overflow-hidden">
          {chars.map((char, index) => (
            <span
              key={index}
              className="inline-block transition-transform duration-300"
              style={{
                transform: isHovered ? 'translateY(-100%)' : 'translateY(0)',
                transitionDelay: `${index * 0.02}s`,
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      </span>

      {/* Duplicate text for animation */}
      <span className="absolute z-10 flex items-center gap-2" aria-hidden>
        {icon && <span className="flex-shrink-0 opacity-0">{icon}</span>}
        <span className="flex overflow-hidden">
          {chars.map((char, index) => (
            <span
              key={index}
              className="inline-block transition-transform duration-300"
              style={{
                transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
                transitionDelay: `${index * 0.02}s`,
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      </span>
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className={baseStyles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={baseStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {content}
    </button>
  )
}
