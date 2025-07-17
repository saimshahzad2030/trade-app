"use client"
import SubChart1 from '@/components/ChartSection/SubChart1'
import SubChart2 from '@/components/ChartSection/SubChart2'
import SubChart3 from '@/components/ChartSection/SubChart3'
import SubChart4 from '@/components/ChartSection/SubChart4'
import SubChart5 from '@/components/ChartSection/SubChart5'
import HomeCharts from '@/components/HomeCharts/HomeCharts'
import Navbar from '@/components/Navbar/Navbar'
import React from 'react'

const ChartPage = () => {
  return (
   <div className="flex flex-col items-center   w-full">
      <Navbar/>

      <div className="relative flex flex-col    w-full overflow-x-hidden  pt-20 bg-[#13131f]">
      
         <div className="w-full grid grid-cols-1 gap-4  my-12 px-12">
            <SubChart1 />
            <SubChart2 />
            <SubChart3 />
            <SubChart4 />
            <SubChart5 />
                   
          </div>
          <HomeCharts/>
      </div>
    </div>
  )
}

export default ChartPage
