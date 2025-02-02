import { UserButton } from '@clerk/nextjs';
import { Search } from 'lucide-react';
import React from 'react';

function Header() {
  return (
    <div className='p-5 shadow-sm border-b-2 flex justify-between'>
      <div className='flex gap-1 items-center p-2 border rounded-md w-full max-w-2xl'>
        <Search />
        <input 
          type='text' 
          placeholder='Search' 
          className='outline-none w-full p-2'  
        />
      </div>

      <div className='flex gap-5 items-center'>
        <h4 className='bg-blue-500 p-2 rounded-full text-xs text-white'>  {/* Use bg-blue-500 or other Tailwind color */}
          Join the membership just for $100/month
        </h4>
        <UserButton />
      </div>
    </div>

    
  );
}

export default Header;
