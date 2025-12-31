'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import AnimatedButton from '../UI/AnimatedButton'
import ThemeToggle from '../UI/ThemeToggle'

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  const scrollThreshold = 50

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determine scroll direction and hide/show nav
      if (currentScrollY > scrollThreshold) {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down
          setIsHidden(true)
        } else {
          // Scrolling up
          setIsHidden(false)
        }
        setIsScrolled(true)
      } else {
        setIsHidden(false)
        setIsScrolled(false)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#ai', label: 'AI Companion' },
    { href: '#testimonials', label: 'Reviews' },
  ]

  return (
    <nav
      className={cn(
        'nav',
        isHidden && 'nav-hidden',
        isScrolled && 'nav-scrolled'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow duration-300">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
            >
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
          </div>
          <span className="text-xl font-semibold text-primary">
            VitalScore
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-underline text-secondary hover:text-primary transition-colors duration-300 text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side: Theme Toggle + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <AnimatedButton href="#download" size="sm">
            Download App
          </AnimatedButton>
        </div>

        {/* Mobile: Theme Toggle + Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            className="p-2 text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={cn(
                'transition-transform duration-300',
                isMobileMenuOpen && 'rotate-90'
              )}
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <>
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden absolute top-full left-0 right-0 backdrop-blur-xl transition-all duration-300 overflow-hidden',
          'bg-[var(--vs-bg-nav)] border-b border-[var(--vs-border)]',
          isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="container py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-secondary hover:text-primary transition-colors duration-300 text-lg font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <AnimatedButton href="#download" size="sm" className="mt-2 w-full justify-center">
            Download App
          </AnimatedButton>
        </div>
      </div>
    </nav>
  )
}
