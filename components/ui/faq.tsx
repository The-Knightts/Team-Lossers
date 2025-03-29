"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

const faqs = [
  {
    question: "What makes Veda AI different from other AI platforms?",
    answer: "Veda AI combines multiple AI capabilities in one platform, offering advanced features like code generation, image creation, and music composition with a user-friendly interface and competitive pricing."
  },
  {
    question: "How accurate is the AI-generated content?",
    answer: "Our AI models are trained on vast datasets and continuously improved, providing high-quality outputs across different content types. We maintain strict quality standards and offer tools for fine-tuning results."
  },
  {
    question: "Can I use the generated content commercially?",
    answer: "Yes! All content generated through our platform grants you full commercial usage rights. You own the rights to any content you create using our AI tools."
  },
  {
    question: "How do you handle data privacy and security?",
    answer: "We prioritize your privacy with enterprise-grade security measures, data encryption, and strict privacy policies. Your data is never shared or used to train our AI models without explicit consent."
  },
  {
    question: "What kind of support do you offer?",
    answer: "We provide comprehensive support including documentation, tutorials, community forums, and direct customer support. Premium plans include priority support and dedicated account managers."
  },
  {
    question: "Can I upgrade or downgrade my plan anytime?",
    answer: "Yes, you can change your subscription plan at any time. Changes take effect at the start of your next billing cycle, and we provide prorated credits when applicable."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 md:px-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-gray-800/50 to-gray-900/50 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(114,39,175,0.1),transparent_50%)] pointer-events-none" />
      
      {/* Section Header */}
      <div className="text-center mb-16 relative">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Frequently Asked Questions
        </h2>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
        <p className="text-zinc-400 text-lg mt-6 max-w-2xl mx-auto">
          Find answers to common questions about Veda AI
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div
              className={`border ${openIndex === index ? 'border-purple-500/50' : 'border-white/10'} 
                rounded-lg bg-black/40 backdrop-blur-xl overflow-hidden transition-all duration-300
                ${openIndex === index ? 'shadow-[0_0_15px_rgba(168,85,247,0.3)]' : ''}`}
            >
              <button
                className="w-full p-6 text-left flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold text-white">{faq.question}</span>
                <span className={`text-2xl transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  ↓
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
              >
                <p className="px-6 pb-6 text-zinc-400">{faq.answer}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};