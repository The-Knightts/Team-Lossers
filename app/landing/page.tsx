"use client"

import { LandingContent } from '@/components/ui/landingcontent'
import { LandingHero } from '@/components/ui/landinghero'
import { LandingNavbar } from '@/components/ui/landingNavbar'
import { Features } from '@/components/ui/features'
import { Statistics } from '@/components/ui/statistics'
import { Pricing } from '@/components/ui/pricing'
import { FAQ } from '@/components/ui/faq'
import { Footer } from '@/components/ui/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link' // ✅ Use next/link for navigation
import React from 'react'

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#111827] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(114,39,175,0.15),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.1),transparent_50%)] pointer-events-none"></div>
      <div className="relative z-10">
        <LandingNavbar/>
        <LandingHero />
        <Features />
        <Statistics />
        <LandingContent/>
        <Pricing />
        <FAQ />
        <Footer />
      </div>
    </div>
   
  )
}

export default LandingPage