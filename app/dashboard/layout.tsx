import React from 'react'
import SideNav from './_component/SideNav'
import Header from './_component/Header'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="md:w-64 hidden md:block fixed h-full">
        <SideNav />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-64 mt-16 md:mt-0">
        <Header />
        {children}
      </div>
    </div>
  )
}

export default Layout
