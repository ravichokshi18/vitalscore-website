import Navbar from '@/components/Navigation/Navbar'
import HeroSection from '@/components/Hero/HeroSection'
import FeaturesSection from '@/components/Sections/FeaturesSection'
import AISection from '@/components/Sections/AISection'
import ComparisonSection from '@/components/Sections/ComparisonSection'
import TestimonialsSection from '@/components/Testimonials/TestimonialsSection'
import CTASection from '@/components/Sections/CTASection'
import Footer from '@/components/Footer/Footer'

export default function Home() {
  return (
    <main className="relative">
      {/* Navigation */}
      <Navbar />

      {/* Hero - "Know What's Coming" */}
      <HeroSection />

      {/* Features - Prediction, Recovery, Sleep, Strain with phone mockup */}
      <FeaturesSection />

      {/* AI Companion - Chat interface demo */}
      <AISection />

      {/* Comparison - VitalScore vs Others */}
      <ComparisonSection />

      {/* Testimonials - Marquee carousel */}
      <TestimonialsSection />

      {/* Final CTA - Download */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  )
}
