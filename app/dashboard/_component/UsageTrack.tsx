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
import { useRouter } from 'next/navigation';

function UsageTrack() {
    const { user } = useUser();
    const router = useRouter();

    const context = useContext(TotalUsageContext);
    if (!context) throw new Error("TotalUsageContext must be used within a TotalUsageProvider");

    const { totalUsage, setTotalUsage } = context;
    const updateCreditUsageContext = useContext(UpdateCreditUsageContext);

    if (!updateCreditUsageContext || !Array.isArray(updateCreditUsageContext)) {
        throw new Error("UpdateCreditUsageContext must provide a valid iterable with two elements");
    }

    const [updateCreditUsage, setUpdateCreditUsage] = updateCreditUsageContext;
    const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);
    const [maxWords, setMaxWords] = useState(100);
    const [showPopup, setShowPopup] = useState(false);

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

    useEffect(() => {
        if (totalUsage >= maxWords && !userSubscription) {
            setShowPopup(true);
        }
    }, [totalUsage, maxWords, userSubscription]);

    const GetData = async () => {
        const result = await db
            .select()
            .from(AIOutput)
            .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress ?? ""));

        const formattedResult: HISTORY[] = result.map((item) => ({
            formData: item.formData,
            id: item.id,
            aiResponse: item.aiResponse ? String(item.aiResponse) : null,
            templateSlug: item.templateSlug,
            createdBy: item.createdBy,
            createdAt: item.createdAt ? String(item.createdAt) : null,
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
            setMaxWords(10000);
        }
    };

    // Calculate Total Words Used
    const GetTotalUsage = (result: HISTORY[]) => {
        let totalWords = result.reduce((sum, item) => sum + (item.aiResponse ? item.aiResponse.split(/\s+/).length : 0), 0);

        setTotalUsage(totalWords);
        console.log("Total Words Used:", totalWords);
    };

    // Upgrade Button Click
    const handleUpgrade = () => {
        setShowPopup(false);
        router.push('/dashboard/billing');
    };

    return (
        <div className='m-1'>
            <div className="bg-primary text-white p-3 rounded-lg">
                <h2 className="text-lg font-bold">Credits</h2>
                
                {/* Progress Bar with Max Cap */}
                <div className="h-2 bg-white w-full rounded-full mt-3">
                    <div className='h-2 bg-[#9875f2] rounded-full'
                        style={{
                            width: `${Math.min((totalUsage / maxWords) * 100, 100)}%`,
                        }}
                    ></div>
                </div>

                <h2 className='text-sm my-3'>{totalUsage.toLocaleString()}/{maxWords} Credits Used</h2>
            </div>

            {/* Upgrade Button */}
            <Button variant={'ghost'} className='w-full my-3 text-primary font-bold border-2 bg-white' onClick={handleUpgrade}>
                Upgrade
            </Button>

            {/* Show Popup When Limit is Reached and User is Not Subscribed */}
            {showPopup && !userSubscription && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-bold text-black">Limit Reached!</h2>
                        <p className="text-black mt-2">You have used all your available credits. Upgrade to continue.</p>
                        <Button variant="default" className="mt-4 text-white px-4 py-2 rounded" onClick={handleUpgrade}>
                            Upgrade Now
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UsageTrack;