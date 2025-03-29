"use client";

import React, { createContext, useState, useEffect } from 'react';
import { TotalUsageContext } from './TotalUsageContext';
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';

export function TotalUsageProvider({ children }: { children: React.ReactNode }) {
  const [totalUsage, setTotalUsage] = useState<number>(0);
  const { user } = useUser();

  useEffect(() => {
    const fetchTotalUsage = async () => {
      if (!user?.primaryEmailAddress?.emailAddress) return;
      
      try {
        const outputs = await db.select().from(AIOutput).where(
          eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress)
        );
        setTotalUsage(outputs.length);
      } catch (error) {
        console.error('Error fetching total usage:', error);
      }
    };

    fetchTotalUsage();
  }, [user]);

  return (
    <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
      {children}
    </TotalUsageContext.Provider>
  );
}