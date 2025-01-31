import React from 'react'
import { TEMPLATE } from './TemplateListSection'
import Image from 'next/image'
import Link from 'next/link'

function TemplateCard(item:TEMPLATE) {
  return (
    <div className='p-3 shadow-md rounded-md border bg-white flex flex-col gap-3 cursor-pointer hover:scale-105 transition-all'>
       <Link href={`/dashboard/content/${item.slug}`}>

      <Image src={item.icon} alt='icon' width={50} height={50}/>

      <h2 className='font-medium text-lg'>{item.name}</h2>
      <p className='text-gray-500 line-clamp-3'>{item.desc}</p>
      </Link>
    </div>
   
  )
}

export default TemplateCard