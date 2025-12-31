'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const chatMessages = [
  {
    type: 'ai',
    content: "Good morning, Alex! Your recovery is at 88% today — your HRV was exceptional last night. Perfect day for that HIIT session you planned.",
    delay: 0,
  },
  {
    type: 'user',
    content: "Why was my recovery low on Monday?",
    delay: 2,
  },
  {
    type: 'ai',
    content: "Your recovery dropped to 52% on Monday because you had a late Sunday night (12:30am bedtime) combined with high strain from your long run. I noticed this pattern happens after your weekend long runs — try sleeping earlier on Sundays.",
    delay: 3,
  },
]

export default function AISection() {
  const sectionRef = useRef<HTMLElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)
  const [visibleMessages, setVisibleMessages] = useState<number[]>([])
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Animate section content
      gsap.from('.ai-header', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.ai-header',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from('.ai-chat-container', {
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.ai-chat-container',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          onEnter: () => {
            // Start chat animation
            startChatAnimation()
          },
        },
      })

      gsap.from('.ai-feature-card', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.ai-features-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const startChatAnimation = () => {
    chatMessages.forEach((_, index) => {
      setTimeout(() => {
        if (chatMessages[index].type === 'ai') {
          setIsTyping(true)
          setTimeout(() => {
            setIsTyping(false)
            setVisibleMessages(prev => [...prev, index])
          }, 1500)
        } else {
          setVisibleMessages(prev => [...prev, index])
        }
      }, chatMessages[index].delay * 1000)
    })
  }

  const aiFeatures = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-violet-400">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Natural Conversation',
      description: 'Ask anything about your health in plain language',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-teal-400">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Pattern Recognition',
      description: 'AI learns your unique patterns over time',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-amber-400">
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Actionable Insights',
      description: 'Get specific recommendations, not generic advice',
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="ai"
      className="section relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-100 to-dark" />

      {/* Decorative orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="ai-header text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
            AI-Powered
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Your AI Health{' '}
            <span className="text-gradient">Companion</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            VitalScore's AI doesn't just report data — it understands YOU.
            Get personalized insights and answers tailored to your patterns.
          </p>
        </div>

        {/* Chat mockup */}
        <div className="ai-chat-container max-w-3xl mx-auto mb-20">
          <div className="glass-card rounded-3xl overflow-hidden">
            {/* Chat header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4"/>
                </svg>
              </div>
              <div>
                <div className="text-white font-medium">VitalScore AI</div>
                <div className="text-xs text-gray-400">Your health companion</div>
              </div>
            </div>

            {/* Chat messages */}
            <div ref={chatRef} className="p-6 space-y-4 min-h-[300px]">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex transition-all duration-500',
                    message.type === 'user' ? 'justify-end' : 'justify-start',
                    visibleMessages.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[80%] rounded-2xl px-4 py-3',
                      message.type === 'user'
                        ? 'bg-violet-600 text-white'
                        : 'bg-white/10 text-gray-200'
                    )}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat input */}
            <div className="px-6 py-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Ask about your health..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-violet-500/50"
                />
                <button className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center hover:bg-violet-500 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Features grid */}
        <div className="ai-features-grid grid md:grid-cols-3 gap-6">
          {aiFeatures.map((feature, index) => (
            <div
              key={index}
              className="ai-feature-card glass-card-hover p-6 rounded-2xl text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
