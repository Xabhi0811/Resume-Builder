import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'

const Preview = () => {
  const {resumeId} =useParams()

  const [resumeData , setResumeData] = useState(null)

  const loadResume = async () =>{
    setResumeData(dummyResumeData.find(resume => resume._id === resumeId))
  }
  return (
    <div>
      preview
    </div>
  )
}

export default Preview