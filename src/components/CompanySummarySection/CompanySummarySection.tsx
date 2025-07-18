import { companyData } from '@/types/types';
import React from 'react'
import RoundLoader from '../Loader/RoundLoader';
type CompanyDetailsProps = {
  chartData?: companyData | null;
  loading:boolean;
};


const CompanySummarySection = ({chartData,loading}:CompanyDetailsProps) => {
  return (
    <div className="w-3/12 flex flex-col items-center pl-4 py-4 text-white">
        <div className=" pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Previous close</p>
          {loading?<RoundLoader/>:
          <p>{chartData?.chart?.result[0]?.meta?.open || 'null'}</p>
          }
        </div>

        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Open</p>
          {loading?<RoundLoader/>:
          <p>{chartData?.chart?.result[0]?.meta?.open || 'null'}</p>}
        </div>
        {/* <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Bid</p>
          <p>null</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Ask</p>
          <p>null</p>
        </div> */}
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Day's Range</p>
          {loading?<RoundLoader/>:
          <p>{chartData?.chart?.result[0]?.meta?.dayRange}</p>}
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>52 Week Range</p>
          {loading?<RoundLoader/>:
          <p>{chartData?.chart?.result[0]?.meta?.week52Range}</p>
          }</div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Volume</p>
         {loading?<RoundLoader/>: <p>{chartData?.chart?.result[0]?.meta?.volume}</p>
        }</div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Avg. Volume</p>
         {loading?<RoundLoader/>: <p>{chartData?.chart?.result[0]?.meta?.avgVolume}</p>
        }</div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Market Cap (intraday)</p>
          {loading?<RoundLoader/>:<p>{chartData?.chart?.result[0]?.meta?.marketCap}</p>
        }</div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Price Avg (Last Year)</p>
         {loading?<RoundLoader/>:<p>{chartData?.chart?.result[0]?.meta?.priceAvg1Y}</p>
        }</div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>PE Ratio (TTM)</p>
          {loading?<RoundLoader/>:<p>{chartData?.chart?.result[0]?.meta?.peRatio}</p>
        }</div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>EPS (TTM)</p>
          {loading?<RoundLoader/>:<p>{chartData?.chart?.result[0]?.meta?.eps}</p>
        }</div>
         <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Regular Market Price</p>
          {loading?<RoundLoader/>:<p>{chartData?.chart?.result[0]?.meta?.regularMarketPrice}</p>
        }</div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Regular Market Day (low)</p>
          {loading?<RoundLoader/>:<p>{chartData?.chart?.result[0]?.meta?.regularMarketDayLow}</p>
        }</div>
         <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Regular Market Day (high)</p>
          {loading?<RoundLoader/>:<p>{chartData?.chart?.result[0]?.meta?.regularMarketDayHigh}</p>
        }</div>
        {/*<div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Ex-Dividend Date</p>
          {loading?<RoundLoader/>:<p>null</p>
        }</div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>1y Target Est</p>
          {loading?<RoundLoader/>:<p>null</p>
        }</div> */}
      </div>
  )
}

export default CompanySummarySection
