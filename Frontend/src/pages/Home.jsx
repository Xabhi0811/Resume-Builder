import React from 'react'
import Banner from '../components/home/Banner'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Testimonial from '../components/home/Testimonial'
import CallToAction from '../components/home/CallToAction'
import Footer from '../components/home/Footer'

const Home = () => {
  return (
    <div className='min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.10),_transparent_24%),linear-gradient(180deg,_#ffffff_0%,_#f8fafc_45%,_#f0fdf4_100%)] text-slate-900'>
     <Banner />
     <main className='relative'>
       <Hero />
       <Features />
       <Testimonial />
       <CallToAction />
     </main>
     <Footer />
    </div>
  )
}

export default Home