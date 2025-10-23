import { FilePenLineIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import{dummyResumeData} from '../assets/assets'

const Dashboard = () => {
  const colors = ["#9333ea" , "#d97706", "#dc2626", "#0284c7", "#16a34a"]
  const [allResumes , setAllResumes] =useState([])
  const [ShowCreateResume , setShowCreateResume] =useState(false)
  const [ShowUploadResume , setShowUploadResume] =useState(false)
  const [title , setTitle] =useState('')
  const [resume , setResume] =useState(null)
  const [editResumeId , setEditResumeId] =useState('')

  const loadAllResumes = async() =>{
    setAllResumes(dummyResumeData)
  }

  useEffect(()=>{
    loadAllResumes()
  },[])
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
        
        <div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>
           {allResumes.map((resume , index)=>{
             const baseColor = colors[index %colors.length]
             return(
              <button key={index} className='relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center 
              rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer' style=
              {{background:`linear-gradient(135deg, ${baseColor}10),${baseColor}40)
               `,borderColor: baseColor +'40'}}>
                
                <FilePenLineIcon className='size-7 group-hover:scale-105
                transition-all' style={{color: baseColor}}/>
                <p className='text-sm group-hover:scale-105 transition-all
                 px-2 text-center' style={{color: baseColor}}>
                  {resume.title}</p>
                  <p className='absolute bottom-1 text-[11px] text-slate-400
                  group-hover:text-slate-500 transition-all duration-300 px-2
                  text-center'style={{color: baseColor + '90'}}>
                    updated on {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>
                  <div className='absolute top-1 right-1 group-hover:flex items-center
                  hidden'>
                    <TrashIcon className='size-7 p-1.5 hover:bg-white/50 rounded
                    text-slate-700 transition-colors'/>
                    <PencilIcon className='size-7 p-1.5 hover:bg-white/50 rounded
                    text-slate-700 transition-colors'/>
                  </div>
              </button>
             )
           })}
        </div>

        <div>
          {ShowCreateResume &&(
            <form onSubmit={createResume} onClick={()=>setShowCreateResume(false)} className='fixed inset-0
             bg-black/70 backdrop-blur bg-opacity-50 z-10 flex 
             items-center justify-center'>
              <div onClick={e=>e.stopPropagation()} className="relative bg-slate-50 border shadow-md
              rounded-lg w-full max-w-sm p-6">
                <h2 className='text-xl font-bold mb-4'>Create a Resume</h2>
                <input type='text' placeholder='Enter resume title' className='w-full
                px-4 py-2 mb-4 focus:border-green-600' required />
                <button className='w-full py-2 bg-green-600 text-white
                 rounded hover:bg-green-700 transition-colors'>Create Resume</button>
                 <XIcon className='absolute top-4 right-4 text-slate-400
                 hover:text-slate-600 cursor-pointer transition-colors' onClick={()=>
                  {setShowCreateResume(false); setTitle('')}} />

                
              </div>
             </form>
          )
          }

        </div>
      </div>      
    </div>
  )
}

export default Dashboard