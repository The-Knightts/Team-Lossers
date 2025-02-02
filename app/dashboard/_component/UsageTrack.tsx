'use client'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db';
import { AIOutput, UserSubscription } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React, { useContext, useEffect, useState } from 'react'
import { HISTORY } from '../history/page';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext';

function UsageTrack() {
    const { user } = useUser();
    const context = useContext(TotalUsageContext);
    
    if (!context) {
        throw new Error("TotalUsageContext must be used within a TotalUsageProvider");
    }

    const { totalUsage, setTotalUsage } = context;

    // Ensure the context value is properly destructured and falls back to a default value if undefined
    const updateCreditUsageContext = useContext(UpdateCreditUsageContext);

    // Ensure the context is an array with two elements
    if (!updateCreditUsageContext || !Array.isArray(updateCreditUsageContext)) {
        throw new Error("UpdateCreditUsageContext must provide a valid iterable with two elements");
    }

    const [updateCreditUsage, setUpdateCreditUsage] = updateCreditUsageContext;

    useEffect(() => {
        if (user) {
            GetData();
            IsUserSubscribe();
        }
    }, [user]);

    useEffect(() => {
        if (user && updateCreditUsage) {
            GetData();
        }
    }, [updateCreditUsage, user]);

    const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);
    const [maxWords, setMaxWords] = useState(10000);

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

    const IsUserSubscribe = async () => {
        const result = await db
            .select()
            .from(UserSubscription)
            .where(eq(UserSubscription.email, user?.primaryEmailAddress?.emailAddress ?? ""));

        if (result.length > 0) {
            setUserSubscription(true);
            setMaxWords(1000000); // Set the max words for subscribed user
        }
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
        <div className='m-1'>
            <div className="bg-primary text-white p-3 rounded-lg">
                <h2 className="text-lg font-bold">Credits</h2>
                <div className="h-2 bg-white w-full rounded-full mt-3">
                    <div className='h-2 bg-[#9875f2] rounded-full'
                        style={{
                            width: (totalUsage / maxWords) * 100 + "%",
                        }}
                    ></div>
                </div>
                <h2 className='text-sm my-3'>{totalUsage.toLocaleString()}/{maxWords} Credits Used</h2>
            </div>
            <Button variant={'ghost'} className='w-full my-3 text-primary font-bold border-2'>Upgrade</Button>
        </div>
    );
}

export default UsageTrack;
