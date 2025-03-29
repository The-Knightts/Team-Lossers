import Templates from '@/app/(data)/Templates';
import React, { useEffect, useState } from 'react';
import TemplateCard from './TemplateCard';
import { Palette, Code, FileEdit, Lightbulb } from 'lucide-react';
import Link from 'next/link';

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

interface TemplateListSectionProps {
  userSearchInput: string;
  
}

const categories = [
  { title: 'Creative Assets', color: 'text-green-400', bg: 'bg-green-500/10', icon: Palette },
  { title: 'Developer Tools', color: 'text-blue-400', bg: 'bg-blue-500/10', icon: Code },
  { title: 'Content Creation', color: 'text-pink-400', bg: 'bg-pink-500/10', icon: FileEdit },
  { title: 'Idea Generation', color: 'text-yellow-400', bg: 'bg-yellow-500/10', icon: Lightbulb }
];

function TemplateListSection({ userSearchInput }: TemplateListSectionProps) {
  const [templateList, setTemplateList] = useState<TEMPLATE[]>(
    Array.isArray(Templates) ? 
      Templates.map(item => ({ ...item, desc: "A powerful template for your needs", icon: "✨", aiPrompt: "Generate amazing content" })) 
      : []
  );
  
  useEffect(() => {
    if (userSearchInput) {
      const filterData = templateList.filter(item =>
        item.name.toLowerCase().includes(userSearchInput.toLowerCase())
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
  }, [userSearchInput]);

  return (
    <div className="flex flex-col h-full p-7 md:p-6 relative z-10 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-purple-900/30 rounded-xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent">
          Innovation Starter Pack
        </h1>
        <p className="text-gray-300 text-base">
          Kickstart your innovation process with predefined prompts.
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
        {categories.map((category, index) => (
          <div key={index} className="group hover:scale-[1.03] transition-all duration-300">
            <div className="relative bg-gradient-to-br from-purple-900/50 via-pink-900/30 to-purple-900/50 rounded-lg p-5 border border-white/10 backdrop-blur-lg shadow-md hover:shadow-pink-500/20 transition-all duration-300 hover:border-pink-500/30">
              <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg ${category.bg}`} />
              <div className="relative z-10 flex flex-col items-center">
                <category.icon size={24} className={`${category.color} mb-3 group-hover:scale-110 transition-transform duration-300`} />
                <span className="text-white font-medium text-base group-hover:text-pink-300 transition-colors duration-300">
                  {category.title}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Templates */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-6">
        {templateList.slice(0, 16).map((template, index) => (
          <TemplateCard key={index} template={template} className="p-3 text-xs" />
        ))}
      </div>
    </div>

  );
}

export default TemplateListSection;