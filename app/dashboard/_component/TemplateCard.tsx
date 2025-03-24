import React from 'react'
import { TEMPLATE } from './TemplateListSection'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react';

interface TemplateCardProps {
  template: TEMPLATE;
}

function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Link href={`/dashboard/content/${template.slug}`} className="flex items-center justify-between bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors">
      {template.icon && <Image src={template.icon} alt="icon" width={25} height={25} />}
      <div className="text-white text-sm">{template.name}</div>
      <ArrowRight size={16} className="text-gray-400" />
    </Link>
  );
}
export default TemplateCard
