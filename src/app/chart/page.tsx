"use client"
import  { MarketMapAll } from '@/components/ChartSection/HeatMap'
 
import SubChartParent from '@/components/ChartSection/SubChartParent'
import HomeCharts from '@/components/HomeCharts/HomeCharts'
import Navbar from '@/components/Navbar/Navbar'
import React from 'react'

const ChartPage = () => {
  return (
   <div className="flex flex-col items-center   w-full">
      <Navbar/>

      <div className="relative flex flex-col    w-full overflow-x-hidden  pt-20 bg-[#13131f]">
        <MarketMapAll/>
      
        <SubChartParent/>
          <HomeCharts/>
      </div>
    </div>
  )
}

export default ChartPage
