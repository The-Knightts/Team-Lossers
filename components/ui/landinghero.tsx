"use client";

import { useAuth } from "@clerk/clerk-react";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./button";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  console.log("isSignedIn:", isSignedIn); // Debugging log

  return (
    <div className="text-white font-bold py-24 md:py-36 text-center space-y-6">
      {/* Headline */}
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-6 font-extrabold leading-tight">
        <h1>The Best AI Tool for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <TypewriterComponent
            options={{
              strings: [
                "Chatbots.",
                "Photo Generation.",
                "Music Creation.",
                "Code Writing.",
                "Video Editing.",
              ],
              autoStart: true,
              loop: true,
              delay: 75,
              deleteSpeed: 50,
            }}
          />
        </div>
      </div>

      {/* Subtext */}
      <p className="text-sm md:text-xl font-light text-zinc-400 max-w-2xl mx-auto">
        Generate content effortlessly with AI - 10x faster.
      </p>

      {/* Call to Action Button */}
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-in"} replace>
          <Button
            variant="premium"
            className="md:text-lg px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-lg shadow-lg transition hover:scale-105"
          >
            🚀 Start Generating for Free
          </Button>
        </Link>
      </div>
    </div>
  );
};
