import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { logout } from '../app/features/authSlice'



const Navbar = () => {
  const {user} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutUser =()=>{
    navigate('/')
    dispatch(logout())
  }
  return (
    <div className='shadow bg-white'>
      <nav className=' flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
      <Link to='/'>
       <img src='/Gemini_Generated_Image_lkii7rlkii7rlkii.png' alt='' className='h-11 w-auto' />
      </Link>
      <div className='flex items-center gap-4 text-sm'>
        {user ? (
          <>
            <p className='max-sm:hidden font-medium'>Hi, {user?.name}</p>
            <Link to='/app' className='hover:text-green-600 transition-all font-medium px-3 py-1 rounded hover:bg-green-50'>Dashboard</Link>
            <button onClick={logoutUser} className='bg-green-600 hover:bg-green-700 text-white px-6 py-1.5 rounded-full active:scale-95 transition-all font-medium'>Logout</button>
          </>
        ) : (
          <Link to='/?state=login' className='bg-green-600 hover:bg-green-700 text-white px-6 py-1.5 rounded-full active:scale-95 transition-all font-medium'>
            Login
          </Link>
        )}
      </div>
      </nav>
    </div>
  )
}

export default Navbar
