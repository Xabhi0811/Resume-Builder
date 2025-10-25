import { Sparkles } from 'lucide-react'
import React from 'react'

const ProfessionSummaryForm = ({data , onChange ,setResumeData}) => {
  return (
    <div className='space-y-4'>
      <div className="flex items-center justify-between">
        <div className="">
            <h3 className='flex items-center gap-2 text-lg font-semibold
            text-gray-900'>Professional Summary</h3>
            <p className='text-sm text-gray-500'>Add summary for your resume here</p>
        </div>
        <button className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100
        text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50'>
            <Sparkles className='size-4'/>
            AI Enhance
        </button>
      </div>

      <div className="mt-6">
        <textarea value={data || ""} onChange={(e)=>onChange(e.target.value)} className='w-full p-3 px-4 mt-2 border text-smborder-gray-300
        rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none' 
        rows={7} placeholder='Write a complelling professional summary that highlight your key strengths and career objectives....'/>
        <p className='text-xs text-gray-500 max-w-4/5 mx-auto text-center'> Tip: Keep it concise (3-4 sentence)
        and focus on your most relevent achievements and SKills.</p>
      </div>
    </div>
  )
}

export default ProfessionSummaryForm
