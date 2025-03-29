"use client";

import { motion } from 'framer-motion';
import { Card } from './card';
import { Button } from './button';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "Perfect for trying out our AI tools",
    features: [
      "5 AI Generations per day",
      "Basic chat support",
      "Standard response time",
      "Community access"
    ],
    highlight: false
  },
  {
    name: "Pro",
    price: "₹399",
    description: "Ideal for individuals and creators",
    features: [
      "100 AI Generations per day",
      "Priority chat support",
      "Faster response time",
      "Advanced AI models",
      "Custom AI training"
    ],
    highlight: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For businesses with specific needs",
    features: [
      "Unlimited AI Generations",
      "24/7 Premium support",
      "Instant response time",
      "Custom AI solutions",
      "API access",
      "Dedicated account manager"
    ],
    highlight: false
  }
];

export const Pricing = () => {
  const { isSignedIn } = useAuth();

  return (
    <section className="py-20 px-6 md:px-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 to-purple-500/10 pointer-events-none" />
      
      {/* Section Header */}
      <div className="text-center mb-16 relative">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Choose Your Plan
        </h2>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
        <p className="text-zinc-400 text-lg mt-6 max-w-2xl mx-auto">
          Select the perfect plan for your AI journey
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card 
              className={`p-8 border ${plan.highlight ? 'border-purple-500/50' : 'border-white/10'} 
                bg-black/40 backdrop-blur-xl hover:bg-black/50 transition-all duration-300 
                hover:scale-105 group relative overflow-hidden
                ${plan.highlight ? 'shadow-[0_0_25px_rgba(168,85,247,0.3)]' : ''}`}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm px-4 py-1 transform translate-x-8 translate-y-4 rotate-45">
                  Popular
                </div>
              )}
              <div className="text-2xl font-bold text-white mb-2">{plan.name}</div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-zinc-400">/month</span>}
              </div>
              <p className="text-zinc-400 mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-zinc-300">
                    <span className="mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href={isSignedIn ? "/dashboard" : "/sign-up"} className="block">
                <Button
                  variant={plan.highlight ? "premium" : "outline"}
                  className={`w-full py-4 text-lg font-semibold ${plan.highlight ? 'shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.7)]' : ''}`}
                >
                  Get Started
                </Button>
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};