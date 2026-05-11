import { FilePenLineIcon, LoaderCircleIcon, LoaderIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import{dummyResumeData} from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import api from '../configs/api'
import pdfToText from 'react-pdftotext'

const Dashboard = () => {
  const {user , token} =useSelector(state =>state.auth)
  const colors = ["#9333ea" , "#d97706", "#dc2626", "#0284c7", "#16a34a"]
  const [allResumes , setAllResumes] =useState([])
  const [ShowCreateResume , setShowCreateResume] =useState(false)
  const [ShowUploadResume , setShowUploadResume] =useState(false)
  const [title , setTitle] =useState('')
  const [resume , setResume] =useState(null)
  const [editResumeId , setEditResumeId] =useState('')
  const [isLoading , setIsLoading] = useState(false)


  const navigate = useNavigate()

  const loadAllResumes = async() =>{
   try {
      const {data} = await api.get('/api/users/resumes/',{headers: {
      Authorization: token}})
      setAllResumes(data.resumes)
   } catch (error) {
       toast.error(error?.response?.data?.message || error.message)
   }
  }

  const createResume =async(event) =>{
   try {
    event.preventDefault()
    const {data} = await api.post('/api/resumes/create',{title}, {headers: {
      Authorization: token}})
      setAllResumes([...allResumes, data.resume])
      setTitle('')
      setShowCreateResume(false)
      navigate(`/app/builder/${data.resume._id}`)
   } catch (error) {
    toast.error(error?.response?.data?.message || error.message)
   }
  }

  const uploadResume =async(event)=>{
     event.preventDefault()
     setIsLoading(true)
     try {
        const resumeText = await pdfToText(resume)
        const {data} = await api.post('/api/ai/upload-resume', {title, resumeText}, {headers: {Authorization: token}})
        setTitle('')
        setResume(null)
        setShowUploadResume(false)
        navigate(`/app/builder/${data.resumeId}`)
     } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
     }
     setIsLoading(false)

  }

   const editTitle =async(event)=>{
    try {
       event.preventDefault()
        const {data} =  await api.put(`/api/resumes/update`,{resumeId: editResumeId, resumeData: {title}}, {headers: {Authorization: token}})
        setAllResumes(allResumes.map(resume => resume._id ===editResumeId? {...resume, title}:resume))
       setTitle('')
       setEditResumeId('')
       toast.success(data.message)
    } catch (error) {
       toast.error(error?.response?.data?.message || error.message)
    }
    
     
   }

   const deleteResume =async(resumeId)=>{
    try {
      const confirm = window.confirm('Are you sure you want to delete this resume?')
      if(confirm){
        const {data} =  await api.delete(`/api/resumes/delete/${resumeId}`, {headers: {Authorization: token}})
        setAllResumes(allResumes.filter(resume => resume._id !==resumeId))
         toast.success(data.message)
      }
      
    } catch (error) {
       toast.error(error?.response?.data?.message || error.message)
    }
     
   }

  useEffect(()=>{
    loadAllResumes()
  },[])

  const stats = [
    { label: 'Saved resumes', value: allResumes.length.toString() },
    { label: 'Logged in as', value: user?.name || 'Guest' },
    { label: 'Quick action', value: 'Create / Upload' },
  ]

  return (
    <div className='min-h-screen bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.08),_transparent_30%),linear-gradient(180deg,_#f8fafc_0%,_#ffffff_45%,_#eff6ff_100%)]'>
      <div className='max-w-7xl mx-auto px-4 py-8 sm:py-10'>
       <div className='flex flex-col gap-6 mb-8'>
        <div className='inline-flex items-center gap-2 self-start rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700 shadow-sm'>
          Welcome back, {user?.name || 'User'}
        </div>

        <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4'>
          <div className='max-w-2xl'>
            <h1 className='text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight'>
              Your resume workspace
            </h1>
            <p className='mt-3 text-slate-600 text-base sm:text-lg'>
              Create a new resume, upload an existing PDF, or jump back into a draft. Everything you need is in one place.
            </p>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:max-w-2xl'>
            {stats.map((item) => (
              <div key={item.label} className='rounded-2xl border border-slate-200 bg-white/80 backdrop-blur px-4 py-3 shadow-sm'>
                <p className='text-xs uppercase tracking-[0.2em] text-slate-500'>{item.label}</p>
                <p className='mt-2 text-sm font-semibold text-slate-900 truncate'>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
       </div>

       <div className='grid gap-6 lg:grid-cols-2'>
        {/* Create Resume Card */}
        <button onClick={()=>setShowCreateResume(true)} className='group w-full rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-100'>
          <div className='flex flex-col items-center gap-4'>
            <div className='grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-200 transition-transform duration-300 group-hover:scale-105'>
              <PlusIcon className='size-8 text-white' />
            </div>
            <p className='text-xl font-semibold text-slate-900 transition-all duration-300 group-hover:text-indigo-700'>Create Resume</p>
            <p className='max-w-sm text-sm text-slate-500 text-center leading-6 group-hover:text-slate-600'>
              Start fresh with our resume builder
            </p>
          </div>
        </button>

        {/* Upload Existing Card */}
        <button onClick={()=> setShowUploadResume(true)} className='group w-full rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-100'>
          <div className='flex flex-col items-center gap-4'>
            <div className='grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 shadow-lg shadow-purple-200 transition-transform duration-300 group-hover:scale-105'>
              <UploadCloudIcon className='size-8 text-white' />
            </div>
            <p className='text-xl font-semibold text-slate-900 transition-all duration-300 group-hover:text-purple-700'>Upload Existing</p>
            <p className='max-w-sm text-sm text-slate-500 text-center leading-6 group-hover:text-slate-600'>
              Upload and edit your existing resume
            </p>
          </div>
        </button>
       </div>

       <div className='mt-10 flex items-center justify-between gap-4'>
        <div>
          <h2 className='text-xl sm:text-2xl font-semibold text-slate-900'>Your resumes</h2>
          <p className='mt-1 text-sm text-slate-500'>Open a draft to continue editing or use the actions menu to manage it.</p>
        </div>
        <div className='hidden sm:block h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent ml-6' />
       </div>

        <div className='mt-6 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4'>
           {allResumes.map((resume , index)=>{
             const baseColor = colors[index %colors.length]
             return(
              <button key={resume._id} onClick={()=> navigate(`/app/builder/${resume._id}`)} className='group relative h-48 overflow-hidden rounded-2xl border border-white/60 bg-white p-4 text-left shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl' style=
              {{background:`linear-gradient(180deg, ${baseColor}14, rgba(255,255,255,0.96))`,
               borderColor: baseColor +'40'}}>
                <div className='absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100' style={{background: `radial-gradient(circle at top right, ${baseColor}1f, transparent 45%)`}} />
                <div className='relative flex h-full flex-col justify-between'>
                  <div className='flex items-center justify-between'>
                    <FilePenLineIcon className='size-7 transition-all group-hover:scale-110' style={{color: baseColor}}/>
                    <span className='rounded-full border border-white/80 bg-white/70 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500'>draft</span>
                  </div>
                
                  <div>
                    <p className='text-base font-semibold text-slate-900 group-hover:text-slate-950 line-clamp-2'>{resume.title}</p>
                    <p className='mt-2 text-xs text-slate-500'>Last updated</p>
                  </div>

                  <p className='text-xs font-medium' style={{color: baseColor + 'cc'}}>
                    updated on {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>
                  <div onClick={e=> e.stopPropagation()} className='absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/75 p-1 opacity-100 backdrop-blur'>
                    <TrashIcon onClick={()=>deleteResume(resume._id)} className='size-7 rounded-full p-1.5 text-slate-700 transition-colors hover:bg-white/80'/>
                    <PencilIcon onClick={()=> {setEditResumeId(resume._id); setTitle(resume.title)

                    }} className='size-7 rounded-full p-1.5 text-slate-700 transition-colors hover:bg-white/80'/>
                  </div>
                </div>
              </button>
             )
           })}
        </div>

        {allResumes.length === 0 && (
          <div className='mt-6 rounded-3xl border border-dashed border-slate-200 bg-white/70 p-8 text-center shadow-sm'>
            <p className='text-lg font-semibold text-slate-900'>No resumes yet</p>
            <p className='mt-2 text-sm text-slate-500'>Create a resume or upload an existing PDF to get started.</p>
          </div>
        )}

        <div>
          {ShowCreateResume &&(
            <form onSubmit={createResume} onClick={()=>setShowCreateResume(false)} className='fixed inset-0 z-20 flex items-center justify-center bg-slate-950/70 backdrop-blur-md px-4'>
              <div onClick={e=>e.stopPropagation()} className="relative w-full max-w-md rounded-3xl border border-white/40 bg-white p-6 shadow-2xl shadow-black/20">
                <h2 className='text-2xl font-semibold mb-2 text-slate-900'>Create a Resume</h2>
                <p className='mb-5 text-sm text-slate-500'>Give your new resume a title so you can find it later.</p>
                <input  onChange={(e)=>setTitle(e.target.value)} value={title} type='text' placeholder='Enter resume title' className='w-full px-4 py-3 mb-4' required />
                <button className='w-full py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors'>Create Resume</button>
                 <XIcon className='absolute right-4 top-4 cursor-pointer text-slate-400 transition-colors hover:text-slate-600' onClick={()=>
                  {setShowCreateResume(false); setTitle('')}} />

                
              </div>
             </form>
          )
          }

          {  
             ShowUploadResume &&(
                 <form onSubmit={uploadResume} onClick={()=>setShowUploadResume(false)} className='fixed inset-0 z-20 flex items-center justify-center bg-slate-950/70 backdrop-blur-md px-4'>
              <div onClick={e=>e.stopPropagation()} className="relative w-full max-w-md rounded-3xl border border-white/40 bg-white p-6 shadow-2xl shadow-black/20">
                <h2 className='text-2xl font-semibold mb-2 text-slate-900'>Upload Resume</h2>
                <p className='mb-5 text-sm text-slate-500'>Upload a PDF and we’ll extract the text for you.</p>
                <input onChange={(e)=>setTitle(e.target.value)} value={title} type='text' placeholder='Enter resume title' className='w-full px-4 py-3 mb-4' required />
                <div>
                  <label htmlFor='resume-input' className='block text-sm text-slate-700'>
                    Select resume file
                    <div className="flex flex-col items-center justify-center gap-2 border border-dashed border-slate-300 rounded-2xl p-4 py-10 my-4 text-slate-400 transition-colors hover:border-green-500 hover:text-green-700">
                      {resume ?(
                        <p className='text-green-700'>{resume.name}</p>
                      ):(
                        <>
                        <UploadCloud className='size-14 stroke-1' />
                        <p>Upload resume</p>
                        </>
                      )}
                    </div>
                  </label>
                  <input type='file' id='resume-input' accept='.pdf' hidden 
                  onChange={(e)=>setResume(e.target.files[0])}  />
                </div>
                <button disabled={isLoading} className='w-full py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2'>
                 {isLoading && <LoaderCircleIcon className='animate-spin size-4 text-white'/>}
                 {isLoading ? 'Uploading...' :  'Upload resume'}
                 
                 </button>
                 <XIcon className='absolute right-4 top-4 cursor-pointer text-slate-400 transition-colors hover:text-slate-600' onClick={()=>
                  {setShowUploadResume(false); setTitle('')}} />

                
              </div>
             </form>

             )

          }
          
          {editResumeId &&(
            <form onSubmit={editTitle} onClick={()=>setEditResumeId('')} className='fixed inset-0 z-20 flex items-center justify-center bg-slate-950/70 backdrop-blur-md px-4'>
              <div onClick={e=>e.stopPropagation()} className="relative w-full max-w-md rounded-3xl border border-white/40 bg-white p-6 shadow-2xl shadow-black/20">
                <h2 className='text-2xl font-semibold mb-2 text-slate-900'>Edit Resume Title</h2>
                <p className='mb-5 text-sm text-slate-500'>Update the title so it matches this version of your resume.</p>
                <input  onChange={(e)=>setTitle(e.target.value)} value={title} type='text' placeholder='Enter resume title' className='w-full px-4 py-3 mb-4' required />
                <button className='w-full py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors'>Update</button>
                 <XIcon className='absolute right-4 top-4 cursor-pointer text-slate-400 transition-colors hover:text-slate-600' onClick={()=>
                  {setEditResumeId(''); setTitle('')}} />

                
              </div>
             </form>
          )}
        </div>      
      </div>      
    </div>
  )
}

export default Dashboard