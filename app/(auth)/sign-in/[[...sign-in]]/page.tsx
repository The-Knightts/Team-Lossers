"use client";

import { AuthForm } from "@/components/ui/auth-form";

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-3xl">
        <AuthForm mode="signin" />
      </div>
    </div>
  );
}