"use client";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignIn 
        appearance={{
          elements: {
            card: "bg-white shadow-md rounded-lg",
            headerTitle: "text-2xl font-bold",
            footer: "text-center mt-4",
            formButtonPrimary: "bg-blue-500 hover:bg-blue-600 text-white"
          }
        }} 
      />
    </div>
  );
}