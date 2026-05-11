import React from 'react'
import { Zap } from 'lucide-react'
import Title from './Title'

const Features = () => {
    const [isHover, setIsHover] = React.useState(false)

    return (
        <section id='features' className='scroll-m-16 px-4 py-20 sm:py-24'>
            <div className='mx-auto max-w-7xl rounded-[2rem] border border-white/70 bg-white/75 px-4 py-8 shadow-[0_20px_80px_rgba(15,23,42,0.07)] backdrop-blur-sm sm:px-8 lg:px-10 lg:py-12'>
                <div className='flex flex-col items-center'>
                    <div className='flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-1.5 text-sm text-green-700'>
                        <Zap width={14} />
                        <span>Simple Process</span>
                    </div>

                    <Title title='Build your resume' description='Our streamlined process helps you create a professional resume in minutes with intelligent AI-powered tools and features.' />
                </div>

                <div className='mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center'>
                    <div className='relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 p-4 shadow-lg shadow-emerald-100/50 sm:p-6'>
                        <img className='w-full rounded-[1.5rem] object-cover' src='https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png' alt='Feature preview' />
                    </div>

                    <div className='space-y-4' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                        <div className='flex items-start gap-4 rounded-2xl border border-violet-200 bg-violet-50 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md'>
                            <div className='rounded-2xl bg-white p-3 shadow-sm'>
                                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='size-6 stroke-violet-600'><path d='M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z' /><circle cx='16.5' cy='7.5' r='.5' fill='currentColor' /></svg>
                            </div>
                            <div className='space-y-2'>
                                <h3 className='text-base font-semibold text-slate-900'>Real-Time Analytics</h3>
                                <p className='text-sm leading-6 text-slate-600 max-w-md'>Get instant insights into your resume progress with live section updates and a polished preview.</p>
                            </div>
                        </div>

                        <div className={`flex items-start gap-4 rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${!isHover ? 'border-green-200 bg-green-50' : 'border-green-200 bg-white'}`}>
                            <div className='rounded-2xl bg-white p-3 shadow-sm'>
                                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='size-6 stroke-green-600'><path d='M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' /><path d='M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z' /></svg>
                            </div>
                            <div className='space-y-2'>
                                <h3 className='text-base font-semibold text-slate-900'>Bank-Grade Security</h3>
                                <p className='text-sm leading-6 text-slate-600 max-w-md'>End-to-end encryption, secure sessions, and protected resume data across your account.</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-4 rounded-2xl border border-orange-200 bg-orange-50 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md'>
                            <div className='rounded-2xl bg-white p-3 shadow-sm'>
                                <svg className='size-6 stroke-orange-600' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M12 15V3' /><path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' /><path d='m7 10 5 5 5-5' /></svg>
                            </div>
                            <div className='space-y-2'>
                                <h3 className='text-base font-semibold text-slate-900'>Customizable Reports</h3>
                                <p className='text-sm leading-6 text-slate-600 max-w-md'>Export clean, professional resumes that are ready to share or download instantly.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features
