"use client"

import { LandingContent } from '@/components/ui/landingcontent'
import { LandingHero } from '@/components/ui/landinghero'
import { LandingNavbar } from '@/components/ui/landingNavbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link' // ✅ Use next/link for navigation
import React from 'react'

function LandingPage() {
  return (
    <div className='h-full'>
      <LandingNavbar/>
      <LandingHero />
      <LandingContent/>

    </div>
   
  )
}

export default LandingPage