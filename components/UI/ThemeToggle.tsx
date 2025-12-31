'use client'

import { useTheme } from '../ThemeProvider'
import { cn } from '@/lib/utils'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative w-14 h-8 rounded-full p-1 transition-all duration-500 ease-out',
        'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-transparent',
        theme === 'dark'
          ? 'bg-gray-700 hover:bg-gray-600'
          : 'bg-violet-100 hover:bg-violet-200'
      )}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Track icons */}
      <span className="absolute inset-0 flex items-center justify-between px-1.5">
        {/* Sun icon */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          className={cn(
            'transition-opacity duration-300',
            theme === 'light' ? 'opacity-100 text-amber-500' : 'opacity-30 text-gray-400'
          )}
        >
          <circle cx="12" cy="12" r="5" fill="currentColor" />
          <path
            d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {/* Moon icon */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          className={cn(
            'transition-opacity duration-300',
            theme === 'dark' ? 'opacity-100 text-violet-300' : 'opacity-30 text-gray-400'
          )}
        >
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            fill="currentColor"
          />
        </svg>
      </span>

      {/* Sliding thumb */}
      <span
        className={cn(
          'block w-6 h-6 rounded-full shadow-lg transition-all duration-500 ease-out transform',
          theme === 'dark'
            ? 'translate-x-6 bg-gray-900'
            : 'translate-x-0 bg-white'
        )}
      >
        {/* Inner icon on thumb */}
        <span className="absolute inset-0 flex items-center justify-center">
          {theme === 'dark' ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-violet-400">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-amber-500">
              <circle cx="12" cy="12" r="5" fill="currentColor" />
            </svg>
          )}
        </span>
      </span>
    </button>
  )
}
