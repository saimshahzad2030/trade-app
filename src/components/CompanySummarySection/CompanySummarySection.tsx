 
import React from "react";
import RoundLoader from "../Loader/RoundLoader";
import { MetaDataType } from "@/types/types";
import SkeletonLoader from "../Loader/SkeletonLoader";
const optionalFields: { label: string; key: string }[] = [
  { label: "Ticker", key: "symbol" },
  { label: "Exchange", key: "exchangeName" },
  { label: "Previous Close", key: "chartPreviousClose" },
  { label: "Open", key: "open" },
  { label: "Ask Price & Size", key: "askPriceAndSize" }, // You may have to compute this
  { label: "Bid Price & Size", key: "bidPriceAndSize" }, // same
  { label: "Price Change", key: "pricechange" },
  { label: "Change Percent", key: "changePercent" },
  { label: "Day Range", key: "dayRange" },
  { label: "52 Week Range", key: "week52Range" },
  { label: "Volume", key: "volume" },
  { label: "Avg Volume", key: "avgVolume" },
  { label: "Market Cap", key: "marketCap" },
  { label: "Currency", key: "currency" },
  { label: "Regular Market Time", key: "regularMarketTime" },
  { label: "Regular Market Price", key: "regularMarketPrice" },
  { label: "52 Week High", key: "fiftyTwoWeekHigh" },
  { label: "52 Week Low", key: "fiftyTwoWeekLow" },
  { label: "Price Avg 1Y", key: "priceAvg1Y" },
  { label: "Beta", key: "beta" },
  { label: "PE Ratio", key: "peRatio" },
  { label: "EPS", key: "eps" },
  { label: "Earnings Date", key: "earningsDate" },
  { label: "Revenue", key: "revenue" },
  { label: "Gross Profit", key: "grossProfit" },
  { label: "EBITDA", key: "ebitda" },
  { label: "Employees", key: "fullTimeEmployees" },
  { label: "Sector", key: "sector" },
  { label: "Industry", key: "industry" },
  { label: "Website", key: "website" },
];

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
 const entries = loading
  ? Array.from({ length: 5 }, (_, i) => [`key${i}`, 'null']) // show 5 placeholders
  : meta
    ? Object.entries(meta).filter(([key]) => key !== "description")
    : [];


  return (
    <div className="w-3/12 flex flex-col items-start pl-4 py-4 text-white overflow-y-auto  ">
     
      {loading?
      <>{optionalFields.map(({ key, label }) => (

         <div
          key={key}
          className="mt-4 first:mt-0 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed"
        >
    <SkeletonLoader className=" bg-gray-700 h-4 w-16" />
    <SkeletonLoader className=" bg-gray-700 h-4 w-20" />
           
        </div>
         
  ))}</>
      :
      <>{entries.map(([key, value], index) => (
        <div
          key={key}
          className="mt-4 first:mt-0 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed"
        >
          <p className="capitalize">{formatLabel(key)}</p>
           <p className="text-right">{formatValue(value)}</p>
        </div>
      ))}</>}
    </div>
  );
};

export default CompanySummarySection;

