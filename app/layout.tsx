import type { Metadata } from 'next'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: 'VitalScore - Know What\'s Coming | AI Health Intelligence',
  description: 'VitalScore predicts your health — not just tracks it. See tomorrow\'s recovery score, catch illness early, and get personalized recommendations that actually work.',
  keywords: ['health app', 'recovery tracking', 'sleep analysis', 'HRV', 'health prediction', 'AI health', 'Apple Watch', 'wellness'],
  authors: [{ name: 'VitalScore' }],
  openGraph: {
    title: 'VitalScore - Know What\'s Coming',
    description: 'AI-powered health intelligence that predicts your health, not just tracks it.',
    type: 'website',
    locale: 'en_US',
    siteName: 'VitalScore',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VitalScore - Know What\'s Coming',
    description: 'AI-powered health intelligence that predicts your health, not just tracks it.',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#7C3AED',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="lenis dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
