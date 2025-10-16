import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import Login from './pages/Login'

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path='/' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='view/:resumeId' element={<Preview />} />

      {/* Protected / App routes */}
      <Route path='app' element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path='builder/:resumeId' element={<ResumeBuilder />} />
      </Route>
    </Routes>
  )
}

export default App
