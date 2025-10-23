import React from 'react'
import Title from './Title'
import { BookUserIcon } from 'lucide-react'

const Testimonial = () => {
  return (
    
      < div id='features' className='flex flex-col items-center my-10 scroll-m-12'>

        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-400/10  rounded-full px-4 py-1.5">
       <BookUserIcon className='size-4.5 stroke-green-600' />
    <span>Simple Process</span>
       </div>
       <Title title='Build your resume' description='Our streamlined process helps you create a professional resume in minutes with intelligent AI-powered tools and features .'/>
      </div>
  
  )
}

export default Testimonial
