// import Templates from '@/app/(data)/Templates';
// import React, { useEffect, useState } from 'react';
// import TemplateCard from './TemplateCard';

// // Import icons
// import { Palette, Code, FileEdit, Lightbulb } from 'lucide-react';

// // Define the structure of FORM and TEMPLATE interfaces
// export interface FORM {
//   label: string;
//   field: string;
//   name: string;
//   required?: boolean;
// }

// export interface TEMPLATE {
//   name: string;
//   desc: string;
//   icon: string;
//   category: string;
//   slug: string;
//   aiPrompt: string;
//   form?: FORM[];
// }

// interface TemplateListSectionProps {
//   userSearchInput: string;
// }

// const categories = [
//   { 
//     title: 'Creative Assets', 
//     color: 'green-400', 
//     icon: Palette 
//   },
//   { 
//     title: 'Developer Tools', 
//     color: 'blue-400', 
//     icon: Code 
//   },
//   { 
//     title: 'Content Creation', 
//     color: 'pink-400', 
//     icon: FileEdit 
//   },
//   { 
//     title: 'Idea Generation', 
//     color: 'yellow-400', 
//     icon: Lightbulb 
//   }
// ];

// // Sample templates based on the image
// const sampleTemplates = [
//   { name: 'UI wireframe', category: 'Creative Assets', slug: 'ui-wireframe' },
//   { name: 'API Integration', category: 'Developer Tools', slug: 'api-integration' },
//   { name: 'Blog Content', category: 'Content Creation', slug: 'blog-content' },
//   { name: 'Hashtag Ideas', category: 'Idea Generation', slug: 'hashtag-ideas' },
//   { name: 'Brochure design', category: 'Creative Assets', slug: 'brochure-design' },
//   { name: 'Customized Templates', category: 'Developer Tools', slug: 'customized-templates' },
//   { name: 'YouTube Description', category: 'Content Creation', slug: 'youtube-description' },
//   { name: 'Brainstorming', category: 'Idea Generation', slug: 'brainstorming' },
//   { name: 'Social media', category: 'Creative Assets', slug: 'social-media' },
//   { name: 'Stock Images and Videos', category: 'Developer Tools', slug: 'stock-images-videos' },
//   { name: 'Instagram Caption', category: 'Content Creation', slug: 'instagram-caption' },
//   { name: 'Trend analysis', category: 'Idea Generation', slug: 'trend-analysis' },
//   { name: 'Brand guidelines', category: 'Creative Assets', slug: 'brand-guidelines' },
//   { name: 'Code review', category: 'Developer Tools', slug: 'code-review' },
//   { name: 'Paraphraser', category: 'Content Creation', slug: 'paraphraser' },
//   { name: 'Resume Building', category: 'Idea Generation', slug: 'resume-building' },
// ];

// function TemplateListSection({ userSearchInput }: TemplateListSectionProps) {
//   const [templateList, setTemplateList] = useState<TEMPLATE[]>(
//     Array.isArray(Templates) ? Templates : sampleTemplates.map(item => ({
//       ...item,
//       desc: "",
//       icon: "",
//       aiPrompt: ""
//     }))
//   );

//   useEffect(() => {
//     if (userSearchInput) {
//       const filterData = (Array.isArray(Templates) ? Templates : sampleTemplates.map(item => ({
//         ...item,
//         desc: "",
//         icon: "",
//         aiPrompt: ""
//       }))).filter(item =>
//         item.name.toLowerCase().includes(userSearchInput.toLowerCase())
//       );
//       setTemplateList(filterData);
//     } else {
//       setTemplateList(Array.isArray(Templates) ? Templates : sampleTemplates.map(item => ({
//         ...item,
//         desc: "",
//         icon: "",
//         aiPrompt: ""
//       })));
//     }
//   }, [userSearchInput]);

//   return (
//     <div className="flex flex-col h-full">
//       <div className='p-4'>
//       <div className="text-center mb-6">
//         <h1 className="text-3xl font-bold text-white mb-2 p-4">
//           Innovation Starter Pack
//         </h1>
//         <p className="text-gray-400">
//           Kickstart your innovation process with our comprehensive selection of predefined prompts.
//         </p>
//       </div>

//       {/* Categories */}
//       <div className="grid grid-cols-4 gap-4 mb-8">
//         {categories.map((category, index) => {
//           const IconComponent = category.icon;
//           return (
//             <div 
//               key={index} 
//               className="flex flex-col items-center justify-center p-4 rounded-lg" 
//               style={{ backgroundColor: 'rgba(50, 50, 50, 0.5)' }}
//             >
//               <div 
//                 className={`w-10 h-10 flex items-center justify-center rounded-full mb-2 bg-opacity-20`}
//                 style={{ backgroundColor: index === 0 ? 'rgba(74, 222, 128, 0.2)' : 
//                                         index === 1 ? 'rgba(96, 165, 250, 0.2)' : 
//                                         index === 2 ? 'rgba(244, 114, 182, 0.2)' : 
//                                         'rgba(234, 179, 8, 0.2)' }}
//               >
//                 <IconComponent 
//                   size={20} 
//                   className={index === 0 ? 'text-green-400' : 
//                              index === 1 ? 'text-blue-400' : 
//                              index === 2 ? 'text-pink-400' : 
//                              'text-yellow-400'} 
//                 />
//               </div>
//               <div className="text-white text-sm">{category.title}</div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Template List */}
//       <div className="grid grid-cols-4 gap-4">
//         {templateList.map((template, index) => (
//           <TemplateCard key={index} template={template} />
//         ))}
//       </div>
      
//       </div>
//       <div className='p-4'>
//       <div className="mt-auto p-4 flex items-center bg-gray-800 rounded-lg border border-gray-700 mt-8">
//         <p className="text-gray-400">
//           You can ask me anything! I am here to help.
//         </p>
//       </div>
//       </div>
//     </div>
//   );
// }

// export default TemplateListSection;


import Templates from '@/app/(data)/Templates';
import React, { useEffect, useState } from 'react';
import TemplateCard from './TemplateCard';

// Import icons
import { Palette, Code, FileEdit, Lightbulb } from 'lucide-react';

// Define the structure of FORM and TEMPLATE interfaces
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
      Templates.map(item => ({ ...item, desc: "", icon: "", aiPrompt: "" })) 
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
        desc: "",
        icon: "",
        aiPrompt: ""
      })));
    }
  }, [userSearchInput]);

  return (
    <div className="flex flex-col h-full p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white">Innovation Starter Pack</h1>
        <p className="text-gray-400 mt-2">Kickstart your innovation process with our predefined prompts.</p>
      </div>

      {/* Categories */}
      
      <div className="grid grid-cols-4 gap-6 mb-8">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className={`flex flex-col items-center p-6 rounded-lg ${category.bg} transition-transform transform hover:scale-105`}
          >
            <category.icon size={24} className={`${category.color} mb-2`} />
            <span className="text-white font-medium">{category.title}</span>
          </div>
        ))}
      </div>

      {/* Template List */}
      <div className="grid grid-cols-4 gap-6">
        {templateList.map((template, index) => (
          <TemplateCard key={index} template={template} />
        ))}
      </div>

      {/* Footer */}
      <div className="mt-10 bg-gray-800 p-4 rounded-lg border border-gray-700 text-center">
        <p className="text-gray-400">You can ask me anything! I am here to help.</p>
      </div>
    </div>
  );
}

export default TemplateListSection;
