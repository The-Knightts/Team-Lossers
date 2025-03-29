"use client";
import React, { useContext, useState } from "react";
import axios from "axios";
import { ArrowLeft, Link, Loader2Icon } from "lucide-react";
import { UserSubscription } from "@/utils/schema";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { Button } from "@/components/ui/button";

// 🔹 Declare Razorpay type globally
declare global {
  interface Window {
    Razorpay: any;
  }
}

function PricingPage() {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);

  const CreateSubscription = () => {
    if (userSubscription) return;

    axios
      .post("/api/create-subscription", {})
      .then((resp) => {
        console.log(resp.data);
        OnPayment(resp.data.id);
      })
      .catch((error) => {
        console.error("Subscription creation failed:", error);
        setLoading(false);
      });
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(window.Razorpay);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(window.Razorpay);
      script.onerror = () => {
        console.error("Failed to load Razorpay script");
        resolve(null);
      };
      document.body.appendChild(script);
    });
  };

  const OnPayment = async (subID: string) => {
    const Razorpay = await loadRazorpay();

    if (!Razorpay) {
      console.error("Razorpay SDK failed to load.");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      subscription_id: subID,
      name: "VedaAI",
      description: "Monthly Subscription",
      handler: async (resp: any) => {
        console.log(resp);
        if (resp) {
          SaveSubscription(resp?.razorpay_payment_id);
        }
        setLoading(false);
      },
    };

    const rzp = new window.Razorpay(options); // ✅ No more TypeScript error
    rzp.open();
  };

  const SaveSubscription = async (paymentId: string) => {
    try {
      const result = await db.insert(UserSubscription).values({
        email: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        active: true,
        paymentId: paymentId,
        joinDate: moment().format("DD/MM/YYYY"),
      });

      console.log(result);
      if (result) {
        setUserSubscription(true);
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to save subscription:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0A0A0A] to-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Button>
          </Link>
        </div>
        
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-12">
          Choose Your Perfect Plan
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-gray-800/50 rounded-2xl transform group-hover:scale-[1.02] transition-transform duration-300"></div>
            <div className="relative backdrop-blur-sm bg-[#0F0F0F]/80 p-8 rounded-2xl border border-gray-700/30 shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
              <div className="absolute top-4 right-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 px-3 py-1 rounded-full text-sm font-medium text-gray-300">
                Free Forever
              </div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">Free Plan</h3>
              <p className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
                ₹0<span className="text-lg font-normal text-gray-400">/month</span>
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <span className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 rounded-full flex items-center justify-center mr-3">✓</span>
                  10,000 Words/Month
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 rounded-full flex items-center justify-center mr-3">✓</span>
                  50+ Content Templates
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 rounded-full flex items-center justify-center mr-3">✓</span>
                  Unlimited Download & Copy
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 rounded-full flex items-center justify-center mr-3">✓</span>
                  1 Month of History
                </li>
              </ul>
              {userSubscription || (
                <button className="w-full py-3 px-4 bg-gray-100 text-gray-500 rounded-xl font-medium cursor-not-allowed">
                  Currently Active Plan
                </button>
              )}
            </div>
          </div>
          
          {/* Premium Plan */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl transform group-hover:scale-[1.02] transition-transform duration-300"></div>
            <div className="relative backdrop-blur-sm bg-[#0F0F0F]/90 p-8 rounded-2xl border border-purple-500/20 shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
              <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full text-sm font-medium text-white">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">Premium Plan</h3>
              <p className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                ₹399<span className="text-lg font-normal text-gray-400">/month</span>
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <span className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 rounded-full flex items-center justify-center mr-3">✓</span>
                  100,000 Words/Month
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 rounded-full flex items-center justify-center mr-3">✓</span>
                  50+ Template Access
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 rounded-full flex items-center justify-center mr-3">✓</span>
                  Unlimited Download & Copy
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 rounded-full flex items-center justify-center mr-3">✓</span>
                  1 Year of History
                </li>
              </ul>
              <button
                onClick={CreateSubscription}
                disabled={loading || userSubscription}
                className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 ${loading || userSubscription ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transform hover:-translate-y-1'}`}
              >
                <div className="flex items-center justify-center gap-2">
                  {loading && <Loader2Icon className="animate-spin h-5 w-5" />}
                  <span>{userSubscription ? "Currently Active Plan" : "Get Started"}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




export default PricingPage;