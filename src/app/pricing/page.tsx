import Navbar from '@/components/Navbar/Navbar'
import PremiumContent from '@/components/PremiumComponent/PremiumContent'
import React from 'react'

const Pricing = () => {
  return (
    <div className="flex flex-col items-center  w-full">
      <Navbar />
       <div className='flex flex-col items-center justify-center w-full pt-12 h-[100vh]'>
        <PremiumContent/>
       </div>
    </div>
  )
}

export default Pricing
