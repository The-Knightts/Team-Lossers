"use client";

import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useState } from 'react';
import { useFirebase } from '@/lib/hooks/useFirebase';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const { addDocument, loading, error } = useFirebase();

  const handleSubscribe = async () => {
    if (!email) return;
    
    try {
      await addDocument('newsletter', {
        email,
        createdAt: new Date().toISOString()
      });
      setSuccess(true);
      setEmail('');
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      // Error handling is managed by useFirebase hook
      console.error('Newsletter subscription error:', err);
    }
  };

  return (
    <footer className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 transition-all duration-1000 backdrop-blur-[2px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(114,39,175,0.03),transparent_90%)] pointer-events-none opacity-30 transition-opacity duration-1000" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.03),transparent_90%)] pointer-events-none opacity-30 transition-opacity duration-1000" />
      <div className="absolute inset-0 bg-[url('/bg-grid.svg')] opacity-[0.02] transition-opacity duration-1000" style={{
        maskImage: "radial-gradient(circle at center, black, transparent 98%)",
        WebkitMaskImage: "radial-gradient(circle at center, black, transparent 98%)",
      }} />
      <div className="relative z-10 container mx-auto px-4">
        {/* Newsletter Subscription */}
        <div className="mb-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Subscribe to Our Newsletter</h3>
          <p className="text-gray-400 mb-6">Stay updated with our latest features and announcements</p>
          <div className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
            <button 
              onClick={handleSubscribe}
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
          {success && (
            <p className="text-green-500 text-sm mt-2">Successfully subscribed to newsletter!</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Veda AI</h3>
            <p className="text-gray-400 text-sm">
              Empowering creativity through artificial intelligence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-purple-400 transition-all transform hover:translate-x-1 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-purple-400 transition-all transform hover:translate-x-1 inline-block">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-purple-400 transition-all transform hover:translate-x-1 inline-block">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features/ai" className="text-gray-400 hover:text-purple-400 transition-all transform hover:translate-x-1 inline-block">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link href="/features/chat" className="text-gray-400 hover:text-purple-400 transition-all transform hover:translate-x-1 inline-block">
                  Smart Chat
                </Link>
              </li>
              <li>
                <Link href="/features/library" className="text-gray-400 hover:text-purple-400 transition-all transform hover:translate-x-1 inline-block">
                  Knowledge Library
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">support@vedaai.com</li>
              <li className="text-gray-400">+91 822-123-4567</li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4 mt-8">
          <h3 className="text-xl font-bold text-white text-center">Follow Us</h3>
          <div className="flex justify-center space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition">
              <FaGithub size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition">
              <FaTwitter size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition">
              <FaLinkedin size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <Link href="/terms" className="text-gray-400 hover:text-purple-400 transition-all">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-purple-400 transition-all">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-purple-400 transition-all">
              Cookie Policy
            </Link>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Veda AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};