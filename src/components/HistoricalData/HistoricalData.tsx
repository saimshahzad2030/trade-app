"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { appleData1d } from "@/global/constants";
import { historicalDataType, MetaDataType } from "@/types/types";
import { InputSection } from "./InputSection";
import CompanyDetails from "../Chart/CompanyDetailsSection";
import HistoricalDataPDFDownload from "./DownloadHistoricalData";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { DownloadCloud } from "lucide-react";
import { getSpecificStockHistoricalData, getSpecificStockSummaryData } from "@/services/stock.services";
import { useParams } from "next/navigation";
import RoundLoader from "../Loader/RoundLoader";
import CompanySummarySection from "../CompanySummarySection/CompanySummarySection";
import SkeletonLoader from "../Loader/SkeletonLoader";
function formatLargeNumber(value: number): string {
  if (value >= 1_000_000_000_000) {
    return (value / 1_000_000_000_000).toFixed(2) + "T";
  } else if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(2) + "B";
  } else if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(2) + "M";
  } else {
    return value.toLocaleString(); // For smaller numbers
  }
}
const HistoricalData = () => {
  

  const params = useParams<{ symbol: string}>()
    let symbol = params.symbol
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);
  const [data, setData] = React.useState<historicalDataType|null >(
    null
  );
  const [loading, setLoading] = React.useState(true); 
 
  const [range, setRange] = React.useState("Daily");
  const [historicalPrice, setHistoryPrice] = React.useState("Historical Price");

  const [fromDate, setFromDate] = React.useState<Date | undefined>(new Date(new Date().setDate(new Date().getDate() - 30)));
  const [toDate, setToDate] = React.useState<Date | undefined>(new Date(new Date().setDate(new Date().getDate() - 1)));
 
   const [metaData,setMetaData] = React.useState<MetaDataType | null>(null)
 
        React.useEffect(()=>{
          const fetchChartData = async()=>{
            setLoading(true)
        
    const formatDate = (date: Date | undefined) => {
      if (!date || isNaN(date.getTime())) return "";
      return date.toISOString().split("T")[0]; // Returns 'YYYY-MM-DD'
    };

    const formattedFromDate = formatDate(fromDate);
    const formattedToDate = formatDate(toDate);

    if (!formattedFromDate || !formattedToDate) {
      console.error("Invalid date(s) provided.");
      setLoading(false);
      return;
    }

    const endpoint = `historical-data/${symbol}/${formattedFromDate}/${formattedToDate}?interval=${range.toLowerCase()}`;

            let response = await getSpecificStockHistoricalData( symbol,fromDate,toDate,range,endpoint);
            let response2 = await getSpecificStockSummaryData(symbol);
                      setMetaData(response2.data)
                        
            
            setData(response.data)
            setLoading(false)
      
          }
          fetchChartData()
  
        },[range,toDate,fromDate])
 
 
  return (
    <div className="w-full flex flex-row items-start justify-between  px-8">
      <div className="w-9/12 flex flex-col items-center justify-start">
        <div className="w-full flex-col items-start text-white">
          <CompanyDetails loading={loading} metaData={metaData}/>

              {loading ? (
  <div className="flex flex-row item-center justify-start w-full mt-4 h-[35px] w-7/12">
    <SkeletonLoader className=" bg-gray-700 h-full w-2/12" />
  <SkeletonLoader className="ml-4 bg-gray-700 h-full w-1/12" />
  <SkeletonLoader className="ml-4 bg-gray-700 h-full w-3/12" />
  </div>
) :  
          <div className="flex flex-row items-center justify-start  ">
            <InputSection toDate={toDate}
            setToDate={setToDate}
            fromDate={fromDate}
            setFromDate={setFromDate}
            range={range}
            setRange={setRange}
            setHistoryPrice={setHistoryPrice} 
            historicalPrice={historicalPrice}/>
          </div>}
          <div className="flex flex-row items-center w-full justify-end ">
            {loading?
  <SkeletonLoader className=" mr-2 bg-gray-700 h-2 w-4"  />
            :<Button 
                              variant="graphTab2"
                              onClick={() => {}}
                              className={`cursor-pointer   text-[var(--variant-4)]   text-[var(--variant-4)] border-l-transparent border-b-transparent border-r-transparent border-t-transparent hover:border-[var(--variant-3)]   `}
                            >
                       
                            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="cursor-pointer">  
                  <DownloadCloud className="cursor-pointer"/>
                          </TooltipTrigger>
                <TooltipContent>
                  <p>{`Download Historical Data with ratios`}</p>
                </TooltipContent>
              </Tooltip>
            
            
                          </TooltipProvider> 
                            </Button>}
            
            <Button 
                  variant="graphTab2"
                   // onClick={() => {}}
                  className={`mr-1  text-[var(--variant-4)]   text-[var(--variant-4)] border-l-transparent border-b-transparent border-r-transparent border-t-transparent hover:border-[var(--variant-3)]   `}
                >
            {mounted   && <>
                          
             {data &&  <>  <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>  
                          {/* <HistoricalDataPDFDownload 
                historicalData={data }
              />  */}
                            </TooltipTrigger>
                  <TooltipContent>
                    <p>{`Download Historical Data`}</p>
                  </TooltipContent>
                </Tooltip>
              
              
                            </TooltipProvider></>}
                       
                         </>}
                         </Button>
          </div>
          <div className="w-full flex flex-col items-center mt-1">
            <div className="flex flex-row items-center justify-end w-full">
              <p className="text-end text-sm my-2 mr-2">Currency in USD</p>
            </div>
             
             
              {loading?
             
  <div className="flex flex-col items-center w-full border border-[var(--variant-4)] rounded-md ">
    <SkeletonLoader className={` bg-[var(--variant-4)]/20 h-8 w-full`}  /> 
    <SkeletonLoader className={` bg-gray-800 h-8 w-full border border-b-0 border-l-0 border-r-0 border-white`}  /> 
    <SkeletonLoader className={` bg-gray-800 h-8 w-full border border-b-0 border-l-0 border-r-0 border-white`}  /> 
    <SkeletonLoader className={` bg-gray-800 h-8 w-full border border-b-0 border-l-0 border-r-0 border-white`}  /> 
    <SkeletonLoader className={` bg-gray-800 h-8 w-full border border-b-0 border-l-0 border-r-0 border-white`}  /> 
    <SkeletonLoader className={` bg-gray-800 h-8 w-full border border-b-0 border-l-0 border-r-0 border-white`}  /> 
    <SkeletonLoader className={` bg-gray-800 h-8 w-full border border-b-0 border-l-0 border-r-0 border-white`}  /> 
    <SkeletonLoader className={` bg-gray-800 h-8 w-full border border-b-0 border-l-0 border-r-0 border-white`}  /> 
    <SkeletonLoader className={` bg-gray-800 h-8 w-full border border-b-0 border-l-0 border-r-0 border-white`}  /> 

  </div>
: <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead className="text-center">Open</TableHead>
                  <TableHead className="text-center">High</TableHead>
                  <TableHead className="text-center">Low</TableHead>
                  <TableHead className="text-center">Close</TableHead>
                  <TableHead className="text-center">Adj Close</TableHead>
                  <TableHead className="text-center">Volume</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data && <>
                {data.results.map(
                  ( item,index) => (
                    <TableRow>
                      <TableCell className="font-medium text-center">
                        {item.date}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.open}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.high}
                      </TableCell>

                      <TableCell className="text-center">
                       {item.low}
                      </TableCell>
                      <TableCell className="text-center">
                      {item.close}
                      </TableCell>
                      <TableCell className="text-center">
                       {item.adjClose}
                      </TableCell>
                      <TableCell className="text-center">
                        {formatLargeNumber(item.volume)}
                      </TableCell>
                    </TableRow>
                  )
                )}</>}
              </TableBody>
            </Table>
  }
          
              
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                       onClick={async()=>{ 
            setLoading(true)
            let response = await getSpecificStockHistoricalData(symbol,fromDate,toDate,range,data?.previous || "");
                        setLoading(false)

            setData(response.data)
          
             
                  }}
           
                    className={data?.previous ? "cursor-pointer button" : "pointer-events-none opacity-50"}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">{Number(data?.next?.split('')[data?.next?.split('').length-1])-1 || 1}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                  
                  onClick={async()=>{ 
            setLoading(true)
            let response = await getSpecificStockHistoricalData(symbol,fromDate,toDate,range,data?.next || "");
                        setLoading(false)

            setData(response.data)
          
             
                  }}
                    // href={next ?? "#"}
                    className={data?.next ? "cursor-pointer button" : "pointer-events-none opacity-50"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div> 
        </div>
      </div>
      <CompanySummarySection metaData={metaData} loading={loading}/>
    </div>
  );
};

export default HistoricalData;
