"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./card";

const testimonials = [
  {
    name: "Aayush Sharma",
    avatar: "🧑‍💻",
    title: "Software Engineer",
    description: "This is the best AI tool I've ever used! It has saved me hours of work.",
  },
  {
    name: "Kuber Surve",
    avatar: "👩‍🎨",
    title: "Graphic Designer",
    description: "The AI-generated images are stunning! This tool is a game-changer.",
  },
  {
    name: "Ganesh Lagad",
    avatar: "🎵",
    title: "Music Producer",
    description: "I created an entire track in minutes. The AI music feature is revolutionary!",
  },
  {
    name: "Rishabh Trivedi",
    avatar: "📽",
    title: "Video Editor",
    description: "The AI-assisted video generation is mind-blowing. 10/10 experience!",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-6 md:px-10 pb-20">
      <h2 className="text-center text-4xl md:text-5xl text-white font-extrabold mb-12">
        What Our Users Say
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {testimonials.map((item, index) => (
          <Card key={index} className="bg-[#192339] border-none text-white p-6 rounded-lg shadow-lg">
            <CardHeader className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full text-2xl">
                {item.avatar}
              </div>
              <div>
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-zinc-400 text-sm">{item.title}</p>
              </div>
            </CardHeader>
            <CardContent className="pt-4 text-zinc-300">{item.description}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};