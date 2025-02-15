"use client";
import React from "react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { useAuth } from "@clerk/nextjs";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between w-full">
      {/* Logo Section (Left Corner) */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center hover:opacity-80 transition">
          <div className="relative h-10 w-10">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold text-white tracking-wide", font.className)}>
            Veda AI
          </h1>
        </Link>
      </div>

      {/* CTA Button (Right Corner) */}
      <div className="ml-auto">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            variant="premium"
            className="rounded-full px-6 py-2 text-lg font-semibold shadow-md transition hover:scale-105"
          >
            🚀 Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};
