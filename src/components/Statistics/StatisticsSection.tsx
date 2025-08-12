"use client";
import React from "react";
type ValuationMeasuresResponse = {
  valuationMeasures: {
    result: {
      ttm: ValuationMetrics[];
      quarterly: ValuationMetricsQuarterly[];
      annual: ValuationMetricsAnnual[];
    };
    error: null;
  };
};
import { appleData1d, valuationMeasures as ab } from "@/global/constants";
type ValuationMetrics = {
  date: "Current";
  marketCap: string;
  enterpriseValue: string;
  trailingPeTTM: number;
  priceToSalesTTM: number;
  priceToBookTTM: number;
  evToSalesTTM: number;
  evToOperatingCashFlowTTM: number;
  evToFreeCashFlowTTM: number;
  evToEBITDATTM: number;
  netDebtToEBITDATTM: number;
  earningsYieldTTM: number;
  freeCashFlowYieldTTM: number;
  grahamNumberTTM: number;
  returnOnEquityTTM: number;
  returnOnAssetsTTM: number;
  returnOnInvestedCapitalTTM: number;
  returnOnCapitalEmployedTTM: number;
};

type ValuationMetricsQuarterly = {
  date: string; // ISO date format like "2025-03-29"
  marketCap: string;
  enterpriseValue: string;
  trailingPe: number;
  priceToSales: number;
  priceToBook: number;
  evToSales: number;
  evToOperatingCashFlow: number;
  evToFreeCashFlow: number;
  evToEBITDA: number;
  netDebtToEBITDA: number;
  earningsYield: number;
  freeCashFlowYield: number;
  grahamNumber: number;
  returnOnEquity: number;
  returnOnAssets: number;
  returnOnInvestedCapital: number;
  returnOnCapitalEmployed: number;
};

type ValuationMetricsAnnual = ValuationMetricsQuarterly;
const valuationMetricKeys: (keyof ValuationMetrics)[] = [
  "marketCap",
  "enterpriseValue",
  "trailingPeTTM",
  "priceToSalesTTM",
  "priceToBookTTM",
  "evToSalesTTM",
  "evToOperatingCashFlowTTM",
  "evToFreeCashFlowTTM",
  "evToEBITDATTM",
  "netDebtToEBITDATTM",
  "earningsYieldTTM",
  "freeCashFlowYieldTTM",
  "grahamNumberTTM",
  "returnOnEquityTTM",
  "returnOnAssetsTTM",
  "returnOnInvestedCapitalTTM",
  "returnOnCapitalEmployedTTM",
];

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CompanyDetails from "../Chart/CompanyDetailsSection";
import { useParams } from "next/navigation";
import { getSpecificStockStatistics, getSpecificStockSummaryData, getSpecificStockValuationMetrics } from "@/services/stock.services";
import { FinancialDataType, MetaDataType } from "@/types/types";
import RoundLoader from "../Loader/RoundLoader";
import CompanySummarySection from "../CompanySummarySection/CompanySummarySection";
import { Button } from "../ui/button";
import SkeletonLoader from "../Loader/SkeletonLoader";
import Link from "next/link";
const StatisticsSection = () => {
const [view, setView] = React.useState<"annual" | "quarterly">("annual");
   const [valuationMeasures,setValuationMeasures] = React.useState<ValuationMeasuresResponse | null>(null)
  
const getValuationData = () => {
  if (!valuationMeasures) return [];

  switch (view) {
    
    case "annual":
      return valuationMeasures.valuationMeasures.result.annual;
    case "quarterly":
      return valuationMeasures.valuationMeasures.result.quarterly;
    default:
      return [];
  }
};

const formatKey = (key: string): string =>
  key

    .replace(/([a-z\d])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
     .replace("TTM", "")
    .replace(/^./, (char) => char.toUpperCase());

   const params = useParams<{ symbol: string}>()
    let symbol =     params.symbol !== "undefined"?params.symbol:'AAPL'
  const [data, setData] = React.useState<FinancialDataType | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  // const formatKey = (key: string): string =>
  //   key
  //     .replace(/([a-z\d])([A-Z])/g, "$1 $2") // Space before caps that follow lowercase/digits
  //     .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2") // Fix acronyms followed by capitalized words
  //     .replace(/^./, (char) => char.toUpperCase());
  const [currentUrl, setCurrentUrl] = React.useState("/api/historical-data");
   const [metaData,setMetaData] = React.useState<MetaDataType | null>(null)
const getData = () => {
  if (!valuationMeasures) return [];
  return valuationMeasures.valuationMeasures.result[view] || [];
};

const ttmData = valuationMeasures?.valuationMeasures.result.ttm?.[0];
    
        React.useEffect(()=>{
          const fetchChartData = async()=>{
            setLoading(true)
            let response2 = await getSpecificStockSummaryData(symbol);
            setMetaData(response2.data)
            if(!response2.data.meta.isEtf){
              let response = await getSpecificStockStatistics(symbol);
            let response3 = await getSpecificStockValuationMetrics(symbol);
            setValuationMeasures(response3.data)
                                  setData(response.data)
            }
                        setLoading(false)

            
          }
          fetchChartData()
  
        },[])
  return (
    <div className="w-full flex flex-row items-start justify-between  px-8">
      <div className="w-9/12 flex flex-col items-center justify-start">
        <div className="w-full flex-col items-start text-white">
                    <CompanyDetails loading={loading} metaData={metaData}/>


         {metaData?.meta.isEtf ?
         <div className="flex flex-col items-center py-12 bg-[#09090f] rounded-md w-full my-12">
          <p className="text-gray-500">{`Statistics Data not found for Ticker named: ${symbol}`}</p>
          <div className="flex flex-row items-center justify-center w-full mt-4">
             
            <Link href={`/`} className="p-2 rounded-md bg-[var(--variant-2)] text-white border-none rounded-md mx-2 text-sm">Proceed to Home</Link>
            <Link href={`/summary/${symbol}`} className="p-2 rounded-md bg-[var(--variant-2)] text-white border-none rounded-md mx-2 text-sm">Proceed to Summary</Link>
            </div>
         </div>
         :<> <div className="w-full flex flex-col items-center mt-2">
            <div className="flex flex-row items-center justify-start w-full">
              <p className="text-start my-2 mr-2 text-xl font-extrabold">
                Valuation Measures
              </p>
            </div>
            {loading?
           <div className="flex flex-col w-full gap-4">
    {/* Skeleton tabs */}
    <div className="flex flex-row items-center justify-center w-full gap-4 mb-4">
      <SkeletonLoader className="h-8 w-24 bg-gray-700 rounded-md m-2 " />
      <SkeletonLoader className="h-8 w-24 bg-gray-700 rounded-md m-2 " />
    </div>

    {/* Skeleton Table */}
    <div className="border border-gray-700 rounded-md overflow-hidden">
      <div className="grid grid-cols-[200px_repeat(4,1fr)] bg-gray-800">
        <SkeletonLoader className="h-10 bg-[var(--variant-4)]/20 col-span-1" />
        <SkeletonLoader className="h-10 bg-[var(--variant-4)]/20 col-span-1" />
        <SkeletonLoader className="h-10 bg-[var(--variant-4)]/20 col-span-1" />
        <SkeletonLoader className="h-10 bg-[var(--variant-4)]/20 col-span-1" />
        <SkeletonLoader className="h-10 bg-[var(--variant-4)]/20 col-span-1" />
      </div>

      {[...Array(10)].map((_, rowIdx) => (
        <div key={rowIdx} className="grid grid-cols-[200px_repeat(4,1fr)]">
          {[...Array(5)].map((_, colIdx) => (
            <SkeletonLoader
              key={colIdx}
              className={`h-8 bg-gray-900 ${
                colIdx === 0 ? "pl-4 text-left" : "text-center"
              }`}
            >
              &nbsp;
            </SkeletonLoader>
          ))}
        </div>
      ))}
    </div>
  </div>:
            <>
            <div className="flex gap-4 mb-4">
  
  <Button onClick={() => setView("annual")}   variant="graphTab2"
     className={`mr-1  text-[var(--variant-4)] border hover:border-[var(--variant-3)] ${
                    view === 'annual'
                      ? "  bg-[var(--variant-2)]/50   border-[var(--variant-3)]    "
                      : "text-[var(--variant-4)] border-l-transparent border-b-transparent border-r-transparent border-t-transparent hover:border-[var(--variant-3)] "
                  }  `}>
    Annual
  </Button>
  <Button onClick={() => setView("quarterly")}   variant="graphTab2"
     className={`mr-1  text-[var(--variant-4)] border hover:border-[var(--variant-3)] ${
                    view === "quarterly"
                      ? "  bg-[var(--variant-2)]/50   border-[var(--variant-3)]    "
                      : "text-[var(--variant-4)] border-l-transparent border-b-transparent border-r-transparent border-t-transparent hover:border-[var(--variant-3)] "
                  }  `}>
    Quarterly
  </Button>
</div>

<Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[200px]">Metric</TableHead>
      <TableHead className="text-center">TTM</TableHead>
      {getData().map((entry, idx) => (
        <TableHead key={idx} className="text-center">
          {entry.date === "Current"
            ? "Current"
            : new Date(entry.date).toLocaleDateString("en-GB")}
        </TableHead>
      ))}
    </TableRow>
  </TableHeader>

<TableBody>
  {valuationMetricKeys.map((key) => (
    <TableRow key={key}>
      <TableCell className="font-medium text-left">
        {formatKey(key)}
      </TableCell>

      <TableCell className="text-center">
        {ttmData?.[key]?.toLocaleString?.() ?? "-"}
      </TableCell>

      {getData().map((entry, i) => (
        <TableCell key={i} className="text-center">
          {
            (entry as any)?.[key.replace("TTM", "")]?.toLocaleString?.() ?? "-"
          }
        </TableCell>
      ))}
    </TableRow>
  ))}
</TableBody>

</Table></>}
          </div>
          <div className=" mt-10 mb-4 w-full h-[0.5px] bg-gray-400 "></div>
          <div className="grid grid-cols-2 gap-x-[0.5px] w-full bg-gray-400">
            <div className=" flex flex-col items-start bg-[#13131f] py-8 pr-4">
              <h1 className="text-2xl font-bold capitalize mb-4">
                Financial Highlights
              </h1>
                   {loading? <div className="flex flex-col gap-6 w-full">
    {[...Array(4)].map((_, sectionIdx) => (
      <div key={sectionIdx} className="w-full">
        {/* Section title skeleton */}
        <SkeletonLoader className="h-5 w-48 bg-gray-700 mb-3 rounded" />

        {/* Placeholder rows */}
        {[...Array(7)].map((_, rowIdx) => (
          <div
            key={rowIdx}
            className="mt-2 pb-1 w-full flex flex-row items-center justify-between text-sm border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed"
          >
            <SkeletonLoader className="h-6 w-1/3 bg-gray-800 rounded" />
            <SkeletonLoader className="h-6 w-1/4 bg-gray-800 rounded" />
          </div>
        ))}
      </div>
    ))}
  </div>
  :<>
              {data?.financial_highlights && <>
              {Object.entries(data?.financial_highlights).map(
                ([sectionKey, sectionValue]) => (
                  <div key={sectionKey} className="mb-4 w-full">
                    <h2 className="text-lg font-semibold capitalize mb-2">
                      {sectionKey}
                    </h2>
                    {Object.entries(sectionValue).map(([key, value]) => (
                      <div
                        key={key}
                        className="mt-2 pb-1 w-full flex flex-row items-center justify-between text-sm border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed"
                      >
                        <p>{formatKey(key)}</p>
                        <p>{value}</p>
                      </div>
                    ))}
                  </div>
                )
              )}</>}</>}
            </div>
            <div className=" flex flex-col items-start bg-[#13131f] py-8 pl-4">
              <h1 className="text-2xl font-bold capitalize mb-4">
                Trading Information
              </h1>
                {loading? <div className="flex flex-col gap-6 w-full">
    {[...Array(4)].map((_, sectionIdx) => (
      <div key={sectionIdx} className="w-full">
        {/* Section title skeleton */}
        <SkeletonLoader className="h-5 w-48 bg-gray-700 mb-3 rounded" />

        {/* Placeholder rows */}
        {[...Array(7)].map((_, rowIdx) => (
          <div
            key={rowIdx}
            className="mt-2 pb-1 w-full flex flex-row items-center justify-between text-sm border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed"
          >
            <SkeletonLoader className="h-6 w-1/3 bg-gray-800 rounded" />
            <SkeletonLoader className="h-6 w-1/4 bg-gray-800 rounded" />
          </div>
        ))}
      </div>
    ))}
  </div>:<>
             {data?.trading_info && <> {Object.entries(data.trading_info).map(
                ([sectionKey, sectionValue]) => (
                  <div key={sectionKey} className="mb-4 w-full">
                    <h2 className="text-xl font-semibold capitalize mb-2">
                      {sectionKey}
                    </h2>
                    {Object.entries(sectionValue).map(([key, value]) => (
                      <div
                        key={key}
                        className="mt-2 pb-1 w-full flex flex-row items-center justify-between text-sm border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed"
                      >
                        <p>{formatKey(key)}</p>
                        <p>{value}</p>
                      </div>
                    ))}
                  </div>
                )
              )}</>}</>}
            </div>
          </div>
         <div className=" mb-10 mt-4 w-full h-[0.5px] bg-gray-400 "></div>
         </>}
          
        </div>
      </div>
           <CompanySummarySection metaData={metaData} loading={loading}/>

    </div>
  );
};

export default StatisticsSection;
