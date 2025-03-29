"use client";
import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const Settings = () => {
  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-4rem)] p-4 bg-gray-100'>
      <UserProfile
        path="/dashboard/settings"
        routing="path"
        appearance={{
          elements: {
            card: "bg-white shadow-md rounded-lg p-6 w-full max-w-3xl h-[calc(100vh-12rem)] overflow-y-auto",
          }
        }}></UserProfile>
    </div>
  )
}

export default Settings