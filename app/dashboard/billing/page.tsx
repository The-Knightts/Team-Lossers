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
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl p-6">
        <Link href={"/dashboard"} className="p-8">
          <Button>
            <ArrowLeft /> Back
          </Button>
        </Link>
          <h2 className="text-2xl font-semibold text-center mb-6">
            Upgrade With Monthly Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free Plan */}
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <h3 className="text-lg font-semibold">Free</h3>
              <p className="text-4xl font-bold mt-2">
                0$<span className="text-lg">/month</span>
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>✔ 10,000 Words/Month</li>
                <li>✔ 50+ Content Templates</li>
                <li>✔ Unlimited Download & Copy</li>
                <li>✔ 1 Month of History</li>
              </ul>
              {userSubscription || (
                <button className="mt-4 bg-gray-700 text-white px-4 py-2 rounded-lg cursor-not-allowed">
                  Currently Active Plan
                </button>
              )}
            </div>

            {/* Monthly Plan */}
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <h3 className="text-lg font-semibold">Monthly</h3>
              <p className="text-4xl font-bold mt-2">
                <span className="bg-blue-200 px-2 rounded">9.99$</span>
                <span className="text-lg">/month</span>
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>✔ 100,000 Words/Month</li>
                <li>✔ 50+ Template Access</li>
                <li>✔ Unlimited Download & Copy</li>
                <li>✔ 1 Year of History</li>
              </ul>
              <button
                onClick={CreateSubscription}
                disabled={loading || userSubscription}
                className="mt-4 w-full border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition"
              >
                {loading && <Loader2Icon className="animate-spin" />}
                {userSubscription ? "Currently Active Plan" : "Get Started"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
