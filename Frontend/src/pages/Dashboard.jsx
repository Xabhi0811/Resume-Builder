import { PlusIcon, UploadCloudIcon } from 'lucide-react'
import React, { useState } from 'react'
import{dummyResumeData} from '../assets/assets'

const Dashboard = () => {
  const [allResumes , setAllResumes] =useState([])

  const loadAllResumes = async() =>{
    setAllResumes(dummyResumeData)
  }
  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-8'>
       <p className='text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden'> Welcome, Abhishek</p>
       
       <div className='flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center'>
        {/* Create Resume Card */}
        <button className='w-full max-w-80 bg-white h-64 flex flex-col items-center justify-center rounded-xl gap-4 text-slate-700 border-2 border-dashed border-slate-200 group hover:border-indigo-500 hover:shadow-xl transition-all duration-300 cursor-pointer hover:bg-indigo-50/30'>
          <div className='flex flex-col items-center gap-4'>
            <div className='p-4 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full group-hover:scale-110 transition-all duration-300 shadow-lg'>
              <PlusIcon className='size-8 text-white'/>
            </div>
            <p className='text-lg font-medium group-hover:text-indigo-700 transition-all duration-300'>Create Resume</p>
            <p className='text-sm text-slate-500 text-center px-4 group-hover:text-slate-600'>
              Start fresh with our resume builder
            </p>
          </div>
        </button>

        {/* Upload Existing Card */}
        <button className='w-full max-w-80 bg-white h-64 flex flex-col items-center justify-center rounded-xl gap-4 text-slate-700 border-2 border-dashed border-slate-200 group hover:border-purple-500 hover:shadow-xl transition-all duration-300 cursor-pointer hover:bg-purple-50/30'>
          <div className='flex flex-col items-center gap-4'>
            <div className='p-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full group-hover:scale-110 transition-all duration-300 shadow-lg'>
              <UploadCloudIcon className='size-8 text-white'/>
            </div>
            <p className='text-lg font-medium group-hover:text-purple-700 transition-all duration-300'>Upload Existing</p>
            <p className='text-sm text-slate-500 text-center px-4 group-hover:text-slate-600'>
              Upload and edit your existing resume
            </p>
          </div>
        </button>
       </div>
       
       <hr className='border-slate-300 my-6 sm:w-[305px]'/>

      </div>      
    </div>
  )
}

export default Dashboard