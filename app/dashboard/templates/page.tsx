"use client";
import React, { useState, useEffect } from 'react';
import Templates from '@/app/(data)/Templates';
import TemplateCard from '../_component/TemplateCard';
import { Palette, Code, FileEdit, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export interface FORM {
  label: string;
  field: string;
  name: string;
  required?: boolean;
}

export interface TEMPLATE {
  name: string;
  desc: string;
  icon: string;
  category: string;
  slug: string;
  aiPrompt: string;
  form?: FORM[];
}

function TemplatesPage() {
  const [templateList, setTemplateList] = useState<TEMPLATE[]>(
    Array.isArray(Templates) ? 
      Templates.map(item => ({ ...item, desc: "A powerful template for your needs", icon: "✨", aiPrompt: "Generate amazing content" })) 
      : []
  );
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (searchInput) {
      const filterData = templateList.filter(item =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setTemplateList(filterData);
    } else {
      setTemplateList(Templates.map(item => ({
        ...item,
        desc: "A powerful template for your needs",
        icon: "✨",
        aiPrompt: "Generate amazing content"
      })));
    }
  }, [searchInput]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Link href="/dashboard">
          <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-700">
            Back to Dashboard
          </Button>
        </Link>
        <input
          type="text"
          placeholder="Search templates..."
          className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-pink-500"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <div className="flex flex-col h-full relative z-10 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-purple-900/30 rounded-xl p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent">
            All Templates
          </h1>
          <p className="text-gray-300 text-base">
            Explore our complete collection of AI-powered templates
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {templateList.map((template, index) => (
            <TemplateCard key={index} template={template} className="p-3 text-xs" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TemplatesPage;