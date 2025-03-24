"use client"
import React, { useState } from 'react'
import TemplateListSection from './_component/TemplateListSection'

function Dashboard() {
  const [userSearchInput, setUserSearchInput] = useState<string>('')
  return (
    <div className='p4'>
      <TemplateListSection userSearchInput={userSearchInput} />
    </div>
  )
}

export default Dashboard
