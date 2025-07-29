import LoginForm from '@/components/Authentication/LoginForm'
import SignupForm from '@/components/Authentication/SignupForm'
import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col items-center w-full'>
      <Navbar/>
      <SignupForm/> 
    </div>
  )
}

export default page
