"use client";

import { motion } from 'framer-motion';
import { Card } from './card';

const features = [
  {
    title: "Advanced AI Chat",
    description: "Engage in natural conversations with our state-of-the-art AI chatbot for assistance, brainstorming, and problem-solving.",
    icon: "💬"
  },
  {
    title: "Image Generation",
    description: "Create stunning visuals, artwork, and designs with our AI-powered image generation technology.",
    icon: "🎨"
  },
  {
    title: "Code Assistant",
    description: "Get help with coding, debugging, and development across multiple programming languages.",
    icon: "💻"
  },
  {
    title: "Music Creation",
    description: "Compose original music, generate melodies, and create unique soundtracks with AI assistance.",
    icon: "🎵"
  },
  {
    title: "Video Generation",
    description: "Create and edit videos with AI-powered tools for stunning visual content.",
    icon: "🎥"
  },
  {
    title: "Voice to Text",
    description: "Convert text to natural-sounding speech in multiple languages and voices.",
    icon: "🎤"
  }
];

export const Features = () => {
  return (
    <section className="py-20 px-6 md:px-10 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-gray-800/50 to-gray-900/50 pointer-events-none" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(114,39,175,0.1),transparent_50%)] pointer-events-none" />
    <div
      className="absolute inset-0 bg-[url('/bg-grid.svg')] opacity-20"
      style={{
        maskImage: "radial-gradient(circle at center, black, transparent 80%)",
        WebkitMaskImage:
          "radial-gradient(circle at center, black, transparent 80%)",
      }}
    />
      
      {/* Section Header */}
      <div className="text-center mb-16 relative">
        <motion.h2
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4 relative"
        >
          Revolutionary AI Solutions
          <motion.span
            className="absolute -inset-x-6 -inset-y-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl rounded-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          />
        </motion.h2>
        <motion.div 
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "8rem", opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-zinc-500 text-lg mt-2 max-w-2xl mx-auto relative"
        >
          Experience the future of technology with our cutting-edge AI suite
        </motion.p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="relative p-6 border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-xl hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 group overflow-hidden transform perspective-1000 hover:rotate-y-3 hover:-rotate-x-3">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl blur-xl group-hover:blur-2xl" />
              <div className="relative z-10 transform-gpu transition-transform duration-500 group-hover:translate-z-10">
                <div className="text-4xl mb-4 transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-6 hover:animate-pulse">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-3 transform transition-all duration-500 group-hover:scale-105">{feature.title}</h3>
                <p className="text-zinc-400 group-hover:text-zinc-200 transition-all duration-500 group-hover:translate-x-1">{feature.description}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};