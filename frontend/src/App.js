import SignInForm from './pages/SigInForm'
import SignUpForm from './pages/SignUpForm'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Protected from './components/Protected'
import { useEffect } from 'react'
import axios from 'axios'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Timeline from './pages/Timeline/Timeline'
import MemoriesPage from './pages/Memories/MemoriesPage'

function App() {

  useEffect(()=>{
    if(localStorage.getItem('token')){
      axios.defaults.headers.common['Authorization'] = "Bearer " +localStorage.getItem('token')
    }
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={
          <Protected>
            <MemoriesPage />
          </Protected>
        } />
        <Route path="/signup" element={
          <SignUpForm/>
        } />
        <Route path="/signin" element={
          <SignInForm />
        } />
        <Route path="/forgot-password" element={
          <ForgotPassword />
        } />
         <Route path="/reset-password" element={
          <ResetPassword />
        } />
        <Route path='/view-timeline' element={
          <Protected>
            <Timeline />
          </Protected>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
