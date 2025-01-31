import { Search } from 'lucide-react'
import React from 'react'

function SearchSection({ onSearchInput }: any) {
  return (
    <div className='p-10 bg-gradient-to-br from-purple-500 bg-purple-700 to-blue-600 flex flex-col justify-center items-center text-white'>
      <h2 className="text-5xl font-extrabold text-white text-center leading-tight tracking-wide p-3 font-dancing">
        Browse ALL Template
      </h2>

      <p className="text-lg font-poppins">What would you like to create today?</p>

      <div className='w-full flex justify-center'>
        <div className='flex gap-2 items-center p-2 border rounded-md bg-white my-5 w-[50%]'>
          <Search className='text-primary' />
          <input
            type='text'
            placeholder='Search'
            className='bg-transparent w-full outline-none text-black font-poppins'
            onChange={(event) => onSearchInput(event.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchSection;
