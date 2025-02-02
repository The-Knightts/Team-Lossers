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
  const [updateCreditUsage, setUpdateCreditUsage] = useState<any>()

  return (
    // Wrapping in both context providers
    <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
      <UserSubscriptionContext.Provider value={{ userSubscription, setUserSubscription }}>
        {/* Pass an array for UpdateCreditUsageContext */}
        <UpdateCreditUsageContext.Provider value={[updateCreditUsage, setUpdateCreditUsage]}>
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
        </UpdateCreditUsageContext.Provider>
      </UserSubscriptionContext.Provider>
    </TotalUsageContext.Provider>
  );
}

export default Layout;
