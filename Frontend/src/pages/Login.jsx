import { User2Icon, Mail, Lock } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/authSlice'
import toast from 'react-hot-toast'
import api from '../configs/api'

const Login = () => {
    
  const dispatch = useDispatch()
  const query = new URLSearchParams(window.location.search)
  const urlState =query.get('state')
  const [state, setState] = React.useState( urlState || "login")

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
       const {data} = await api.post(`/api/users/${state}`, formData)
       dispatch(login(data))
       localStorage.setItem('token', data.token)
       toast.success(data.message)
      } catch (error) {
        toast(error?.response?.data?.message ||error.message)
      
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <form onSubmit={handleSubmit} className="sm:w-[400px] w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          {state === "login" ? "Login" : "Sign up"}
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Please {state === "login" ? "sign in" : "sign up"} to continue
        </p>
        
        {state !== "login" && (
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <User2Icon size={18} className="text-gray-500 mr-2" />
              <input 
                type="text" 
                name="name" 
                placeholder="Name" 
                className="w-full outline-none bg-transparent"
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
        )}
        
        <div className="mb-4">
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <Mail size={18} className="text-gray-500 mr-2" />
            <input 
              type="email" 
              name="email" 
              placeholder="Email id" 
              className="w-full outline-none bg-transparent"
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <Lock size={18} className="text-gray-500 mr-2" />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              className="w-full outline-none bg-transparent"
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>
        
        <div className="mb-4">
          <button type="button" className="text-green-600 text-sm hover:underline">
            Forget password?
          </button>
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors mb-4"
        >
          {state === "login" ? "Login" : "Sign up"}
        </button>
        
        <p className="text-center text-gray-600 text-sm">
          {state === "login" ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            type="button"
            onClick={() => setState(prev => prev === "login" ? "register" : "login")}
            className="text-green-600 hover:underline"
          >
            click here
          </button>
        </p>
      </form>
    </div>
  )
}

export default Login