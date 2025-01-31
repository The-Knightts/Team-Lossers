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

      <div>
        <h2 className='bg-blue-500 p-3 rounded-full text-xs text-white'>  {/* Use bg-blue-500 or other Tailwind color */}
          Join the membership just for $100
        </h2>
      </div>
    </div>

    
  );
}

export default Header;
