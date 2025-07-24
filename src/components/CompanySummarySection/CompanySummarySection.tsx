// import { companyData, MetaDataType } from '@/types/types';
// import React from 'react'
// import RoundLoader from '../Loader/RoundLoader';
// type CompanyDetailsProps = {
//   metaData?: MetaDataType | null;
//   loading:boolean;
// };


// const CompanySummarySection = ({metaData,loading}:CompanyDetailsProps) => {
//   return (
//     <div className="w-3/12 flex flex-col items-center pl-4 py-4 text-white">
//         <div className=" pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
//           <p>Previous close</p>
//           {loading?<RoundLoader/>:
//           <p>{metaData?.meta.previousClose || 'null'}</p>
//           }
//         </div>

//         <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
//           <p>Open</p>
//           {loading?<RoundLoader/>:
//          <p>{metaData?.meta.open  || 'null'}</p>}
//         </div>
//         {/* <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
//           <p>Bid</p>
//           <p>null</p>
//         </div>
//         <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
//           <p>Ask</p>
//           <p>null</p>
//         </div> */}
//         <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
//           <p>Day's Range</p>
//           {loading?<RoundLoader/>:
//           <p>{metaData?.meta.dayRange }</p>}
//         </div>
//         <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
//           <p>52 Week Range</p>
//           {loading?<RoundLoader/>:
//           <p>{metaData?.meta.week52Range}</p>
//           }</div>
//         <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
//           <p>Volume</p>
//          {loading?<RoundLoader/>: <p>{metaData?.meta.volume}</p>
//         }</div>
//         <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
//           <p>Avg. Volume</p>
//          {loading?<RoundLoader/>: <p>{metaData?.meta.avgVolume}</p>
//         }</div>
//         <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
//           <p>Market Cap (intraday)</p>
//           {loading?<RoundLoader/>:<p>{metaData?.meta.marketCap}</p>
//         }</div>
//         <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
//           <p>Price Avg (Last Year)</p>
//          {loading?<RoundLoader/>:<p>{metaData?.meta.priceAvg1Y}</p>
//         }</div>
//         <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
//           <p>PE Ratio (TTM)</p>
//           {loading?<RoundLoader/>:<p>{metaData?.meta.peRatio}</p>
//         }</div>
//         <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
//           <p>EPS (TTM)</p>
//           {loading?<RoundLoader/>:<p>{metaData?.meta.eps}</p>
//         }</div>
//          <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
//           <p>Regular Market Price</p>
//           {loading?<RoundLoader/>:<p>{metaData?.meta.regularMarketPrice}</p>
//         }</div>
//         <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
//           <p>Regular Market Day (low)</p>
//           {loading?<RoundLoader/>:<p>{metaData?.meta.regularMarketDayLow}</p>
//         }</div>
//          <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
//           <p>Regular Market Day (high)</p>
//           {loading?<RoundLoader/>:<p>{metaData?.meta.regularMarketDayHigh}</p>
//         }</div>
//         {/*<div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
//           <p>Ex-Dividend Date</p>
//           {loading?<RoundLoader/>:<p>null</p>
//         }</div>
//         <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
//           <p>1y Target Est</p>
//           {loading?<RoundLoader/>:<p>null</p>
//         }</div> */}
//       </div>
//   )
// }

// export default CompanySummarySection
import React from "react";
import RoundLoader from "../Loader/RoundLoader";
import { MetaDataType } from "@/types/types";

type CompanyDetailsProps = {
  metaData?: MetaDataType | null;
  loading: boolean;
};

// Converts camelCase or PascalCase to spaced and capitalized
const formatLabel = (key: string): string => {
  const spaced = key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
};

const formatValue = (value: any): string => {
  if (value == null || value === "") return "N/A";
  if (typeof value === "number") {
    return value.toLocaleString();
  }
  if (typeof value === "string" && /^\d+(\.\d+)?$/.test(value)) {
    return Number(value).toLocaleString();
  }
  return value;
};

const CompanySummarySection = ({ metaData, loading }: CompanyDetailsProps) => {
  const meta = metaData?.meta;
  const entries = meta
    ? Object.entries(meta).filter(([key]) => key !== "description")
    : [];

  return (
    <div className="w-3/12 flex flex-col items-start pl-4 py-4 text-white overflow-y-auto  ">
      {/* ✅ Company description on top */}
      {/* {loading ? (
        <div className="w-full mb-4">
          <RoundLoader />
        </div>
      ) : (
        meta?.description && (
          <p className="text-sm text-left text-white mb-4 leading-relaxed">
            {meta.description}
          </p>
        )
      )} */}

      {/* ✅ Remaining fields */}
      {entries.map(([key, value], index) => (
        <div
          key={key}
          className="mt-4 first:mt-0 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed"
        >
          <p className="capitalize">{formatLabel(key)}</p>
          {loading ? <RoundLoader /> : <p className="text-right">{formatValue(value)}</p>}
        </div>
      ))}
    </div>
  );
};

export default CompanySummarySection;

