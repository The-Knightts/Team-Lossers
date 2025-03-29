import React from 'react'
import { TEMPLATE } from './TemplateListSection'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react';

// Helper function to validate URL
const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

interface TemplateCardProps {
  template: TEMPLATE;
}

function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Link 
      href={`/dashboard/content/${template.slug}`} 
      className="group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-900/95"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-900/95 backdrop-blur-[8px] transition-all duration-300 group-hover:backdrop-blur-[10px] border border-gray-700/20 group-hover:border-gray-600/30 group-hover:from-gray-900/98 group-hover:via-gray-900/95 group-hover:to-gray-900/98" />
      <div className="relative flex items-center justify-between gap-4">
        {template.icon && isValidUrl(template.icon) && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-700/50 p-2 transition-all duration-300 group-hover:bg-gray-600/50 group-hover:shadow-lg">
            <Image 
              src={template.icon} 
              alt="icon" 
              width={28} 
              height={28} 
              className="opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110" 
            />
          </div>
        )}
        <div className="flex-grow">
          <div className="text-base font-medium text-gray-100 transition-all duration-300 group-hover:text-white group-hover:translate-y-[-1px]">
            {template.name}
          </div>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700/30 transition-all duration-300 group-hover:bg-gray-600/50 group-hover:translate-x-1">
          <ArrowRight size={16} className="text-gray-400 transition-colors group-hover:text-white" />
        </div>
      </div>
    </Link>
  );
}
export default TemplateCard