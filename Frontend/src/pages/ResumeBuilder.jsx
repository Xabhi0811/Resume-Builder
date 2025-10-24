import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import { Link } from 'lucide-react'

const ResumeBuilder = () => {

  const {resumeId} = useParams
  const [resumeData , setResumeData] = useState({
    _id: '',
    title: '',
    personal_info:{},
    professional_summary:"",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#2B82F6",
    public: false,
  })

  const loasExistingResume =async () =>{
    const resume = dummyResumeData.find(resume => resume.id == resumeId)
    if(resume){
      setResumeData(resume)
      document.title = resume.title
    }
  }

  useEffect(()=>{
    loasExistingResume()
  },[])
   
  return (
    <div>
     <div className="">
      <Link />
     </div>
    </div>
  )
}

export default ResumeBuilder