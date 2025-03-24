// import { UserButton } from '@clerk/nextjs';
// import Link from 'next/link';
// import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ShareButton from "@/components/ui/share-button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

function Header() {
  const teamMembers = [
    { id: 1, name: "User1", image: "https://github.com/shadcn.png" },
    { id: 2, name: "User2", image: "https://github.com/shadcn.png" },
    { id: 3, name: "User3", image: "https://github.com/shadcn.png" },
  ];

  return (
    <div className="p-4 bg-[#0F0F0F] text-white m-3 rounded-lg">
      {/* Top section */}
      <div className="flex justify-between items-center border-b border-gray-700 pb-3">
        
        {/* Project Section */}
        <div>
          <h1 className="text-xl font-bold">Capstone</h1>
          <p className="text-gray-400 text-sm">Creating some unique project idea</p>
        </div>

        {/* Right Section: Share, Team Members, and User */}
        <div className="flex items-center gap-4">
          {/* Team Members */}
          {teamMembers.length > 0 && (
            <div className="flex items-center -space-x-2">
              {teamMembers.slice(0, 3).map((member) => (
                <Avatar key={member.id} className="border-2 border-gray-800">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
              ))}
              {teamMembers.length > 3 && (
                <div className="bg-gray-800 text-white text-xs w-8 h-8 flex items-center justify-center rounded-full">
                  +{teamMembers.length - 3}
                </div>
              )}
            </div>
          )}
          
          {/* Share Button */}
          <ShareButton />

          {/* User Profile */}
          <UserButton />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-6 mt-4 border-b border-gray-700 pb-2">
        <Link href="#" className="text-green-400 font-semibold border-b-2 border-green-400 pb-1">
          Veda AI
        </Link>
        <Link href="#" className="text-gray-400 hover:text-white">Chat</Link>
        <Link href="#" className="text-gray-400 hover:text-white">Library</Link>
      </div>
    </div>
  );
}

export default Header;

// function Header() {
//   return (
//     <div className='p-4 rounded-lg'>
//     <div className='p-5 shadow-sm border-b-2 flex justify-between'>
//       <div className='flex gap-5 items-center'>
//         <div className='bg-blue-500 p-2 rounded-full text-xs text-white'>
//         <Link href='/dashboard/billing' >
//           Join the membership just for ₹399/month
//         </Link>
//       </div>
//         <UserButton />
//       </div>
//     </div>
//     </div>
//   );
// }

// export default Header;
