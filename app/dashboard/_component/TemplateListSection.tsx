import Templates from '@/app/(data)/Templates';
import React, { useEffect, useState } from 'react';
import TemplateCard from './TemplateCard';

// Define the structure of FORM and TEMPLATE interfaces
export interface FORM {
  // id: number;
  label: string;
  field: string;
  name: string;
  required?: boolean; // Make `required` optional
}

export interface TEMPLATE {
  name: string;
  desc: string;
  icon: string;
  category: string;
  slug: string;
  aiPrompt: string;
  form?: FORM[]; // This stays optional
}

interface TemplateListSectionProps {
  userSearchInput: string; // Explicitly define the type for `userSearchInput`
}

function TemplateListSection({ userSearchInput }: TemplateListSectionProps) {
  // Ensure Templates is correctly assigned
  const [templateList, setTemplateList] = useState<TEMPLATE[]>(
    Array.isArray(Templates) ? Templates : [] // Ensure it's an array
  );

  useEffect(() => {
    if (userSearchInput) {
      const filterData = (Array.isArray(Templates) ? Templates : []).filter(item =>
        item.name.toLowerCase().includes(userSearchInput.toLowerCase())
      );
      setTemplateList(filterData);
    } else {
      setTemplateList(Array.isArray(Templates) ? Templates : []);
    }
  }, [userSearchInput]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-10">
      {templateList.map((item: TEMPLATE) => (
        <TemplateCard key={item.slug} {...item} />
      ))}
    </div>
  );
}

export default TemplateListSection;
