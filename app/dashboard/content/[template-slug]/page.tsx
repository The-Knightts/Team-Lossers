"use client"

import React, { useState } from 'react'
import FormSection from '../_components/FormSection'
import OutputSection from '../_components/OutputSection'
import Templates from '@/app/(data)/Templates'
import { TEMPLATE } from '../../_component/TemplateListSection';
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ChatSession } from '@google/generative-ai'
import { chatSession } from '@/utils/AiModel'

function CreateNewContent(Props: any) {

    const selectedTemplate:TEMPLATE|undefined=Templates?.find((item)=>item.slug==Props.params['template-slug']);

    const [loading,setLoading]=useState(false);

    const[aiOutput,setAiOutput]=useState<string>("");

    const GenerateAIContent=async(FormData:any)=>{

        setLoading(true);

        const SelectedPropmt=selectedTemplate?.aiPrompt;

        const FinalAIPrompt=JSON.stringify(FormData)+" , "+SelectedPropmt;
           
        const result = await chatSession.sendMessage(FinalAIPrompt)// If ChatSession.generate returns a promise         
          // If result.response is a response object with .text() method

        console.log(result.response.text());
        setAiOutput(result?.response.text());
        setLoading(false);
        
// Check what the result contains


        setLoading(false) 
        
    }
  return (
    <div className='p-10'>
      <Link href={"/dashboard"}>
        <Button ><ArrowLeft/>back</Button>
        </Link>
    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-10'>
 
        <FormSection selectedTemplate={selectedTemplate} userFormInput={(v:any)=>GenerateAIContent(v)}
            loading={loading}/>
         <div className='col-span-2'>
        <OutputSection aiOutput={aiOutput} />
        </div>
    </div>
    </div>

  )
}

export default CreateNewContent