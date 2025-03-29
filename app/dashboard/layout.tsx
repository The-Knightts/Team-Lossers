"use client"
import React, { useState } from 'react';
import SideNav from './_component/SideNav';
import Header from './_component/Header';

import { TotalUsageContext } from '../(context)/TotalUsageContext';
import { UserSubscriptionContext } from '../(context)/UserSubscriptionContext';
import { UpdateCreditUsageContext } from '../(context)/UpdateCreditUsageContext';

const Layout = ({ children }: { children: React.ReactNode }) => {
  // Initialize state
  const [totalUsage, setTotalUsage] = useState<number>(0);
  const [userSubscription, setUserSubscription] = useState<boolean>(false);
  const [updateCreditUsage, setUpdateCreditUsage] = useState<any>();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    // Wrapping in both context providers
    <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
      <UserSubscriptionContext.Provider value={{ userSubscription, setUserSubscription }}>
        {/* Pass an array for UpdateCreditUsageContext */}
        <UpdateCreditUsageContext.Provider value={[updateCreditUsage, setUpdateCreditUsage]}>
          <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(114,39,175,0.15),transparent_50%)] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.1),transparent_50%)] pointer-events-none"></div>

            {/* Sidebar */}
            <div className="md:w-64 hidden md:block fixed h-full z-20">
              <SideNav isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            </div>

            
            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-20'} mt-16 md:mt-0 relative`}>
              <div className="relative z-10 p-6">
                <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 shadow-2xl transition-all duration-500 hover:border-white/20">
                  <Header />
                  <div className="p-6">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UpdateCreditUsageContext.Provider>
      </UserSubscriptionContext.Provider>
    </TotalUsageContext.Provider>
  );
}

export default Layout;