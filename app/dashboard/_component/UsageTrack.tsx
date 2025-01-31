'use client'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React, { useContext, useEffect, useState } from 'react'
import { HISTORY } from '../history/page';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';

function UsageTrack() {
    const { user } = useUser();
    const context = useContext(TotalUsageContext);
    
    if (!context) {
        throw new Error("TotalUsageContext must be used within a TotalUsageProvider");
    }

    const { totalUsage, setTotalUsage } = context;
    useEffect(() => {
        if (user) {
            GetData();
        }
    }, [user]);

    const GetData = async () => {
        const result = await db
            .select()
            .from(AIOutput)
            .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress ?? ""));

        const formattedResult: HISTORY[] = result.map((item) => ({
            formData: item.formData,
            id: item.id,
            aiResponse: item.aiResponse ? String(item.aiResponse) : null, // Ensure aiResponse is a string or null
            templateSlug: item.templateSlug,
            createdBy: item.createdBy,
            createdAt: item.createdAt ? String(item.createdAt) : null, // Ensure createdAt is a string or null
        }));

        GetTotalUsage(formattedResult);
    };

    const GetTotalUsage = (result: HISTORY[]) => {
        let totalWords = 0;

        result.forEach((element) => {
            const wordCount = element.aiResponse ? element.aiResponse.split(/\s+/).length : 0; // Count words safely
            totalWords += wordCount;
        });

        setTotalUsage(totalWords);
        console.log("Total Words Used:", totalWords);
    };

    return (
        <div className='m-5'>
            <div className="bg-primary text-white p-3 rounded-lg">
                <h2 className="text-lg font-bold">Credits</h2>
                <div className="h-2 bg-white w-full rounded-full mt-3">
                    <div className='h-2 bg-[#9875f2] rounded-full'
                        style={{
                            width: (totalUsage / 10000) * 100 + "%",
                        }}
                    ></div>
                </div>
                <h2 className='text-sm my-3'>{totalUsage.toLocaleString()}/10,000 Words Used</h2>
            </div>
            <Button variant={'ghost'} className='w-full my-3 text-primary font-bold border-2'>Upgrade</Button>
        </div>
    );
}

export default UsageTrack;
