import React from 'react'

const Title = ({title , description}) => {
  return (
    <div className='mx-auto mt-6 max-w-3xl text-center text-slate-700'>
      <div className='mx-auto mb-4 h-1.5 w-20 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-cyan-500' />
      <h2 className='text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl'>{title}</h2>
      <p className='mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg'>{description}</p>
    </div>
  )
}

export default Title
