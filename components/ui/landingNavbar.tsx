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
    <nav className="p-4 fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10 flex items-center justify-between w-full transition-all duration-300 hover:bg-black/30">
      {/* Logo Section (Left Corner) */}
      <div className="flex items-center gap-3">
        <Link href="/" className="group flex items-center transition-transform duration-300 hover:scale-105">
          <div className="relative h-12 w-12 transform transition-transform duration-300 group-zoom:rotate-12">
            <Image fill alt="Logo" src="/veda-logo.svg" className="object-contain" />
          </div>
          <h1 className={cn("text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 tracking-wider ml-2", font.className)}>
            Veda AI
          </h1>
        </Link>
      </div>

      {/* CTA Button (Right Corner) */}
      <div className="ml-auto">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            variant="premium"
            className="rounded-full px-8 py-3 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border border-white/20 shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(168,85,247,0.7)] hover:scale-105"
          >
            🚀 Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};
