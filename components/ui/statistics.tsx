"use client";

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface StatItem {
  title: string;
  value: number;
  suffix?: string;
  icon: string;
}

const stats: StatItem[] = [
  {
    title: "Active Users",
    value: 50000,
    suffix: "+",
    icon: "👥"
  },
  {
    title: "AI Generations",
    value: 1000000,
    suffix: "+",
    icon: "🤖"
  },
  {
    title: "Satisfaction Rate",
    value: 99,
    suffix: "%",
    icon: "⭐"
  },
  {
    title: "Countries Reached",
    value: 150,
    suffix: "+",
    icon: "🌍"
  }
];

const Counter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
        setCount(Math.floor(value * easedProgress));

        if (currentStep >= steps) {
          clearInterval(timer);
          setCount(value);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export const Statistics = () => {
  return (
    <section className="py-20 px-6 md:px-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-gray-800/50 to-gray-900/50 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(114,39,175,0.1),transparent_50%)] pointer-events-none" />
      <div
        className="absolute inset-0 bg-[url('/bg-grid.svg')] opacity-20"
        style={{
          maskImage: "radial-gradient(circle at center, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at center, black, transparent 80%)",
        }}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-xl hover:border-white/20 transition-all duration-500 group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl blur-xl" />
            <div className="relative z-10">
              <span className="text-3xl mb-4 block">{stat.icon}</span>
              <Counter value={stat.value} suffix={stat.suffix} />
              <h3 className="text-lg text-gray-400 mt-2">{stat.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};