import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req) {
    try {
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET_KEY || !process.env.SUBSCRIPTION_PLAN_ID) {
            return NextResponse.json({ error: "Missing Razorpay environment variables" }, { status: 500 });
        }

        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET_KEY,
        });

        const result = await instance.subscriptions.create({
            plan_id: process.env.SUBSCRIPTION_PLAN_ID,
            customer_notify: 1,
            quantity: 1,
            total_count: 1,
            addons: [],
            notes: {
                key1: "Hello",
            },
        });

        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Failed to create subscription", error: error.message }, { status: 500 });
    }
}
