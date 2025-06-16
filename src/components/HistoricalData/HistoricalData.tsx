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
import { appleData1d, historicalData } from "@/global/constants";
import { historicalDataType } from "@/types/types";
import { InputSection } from "./InputSection";
import CompanyDetails from "../Chart/CompanyDetailsSection";
import HistoricalDataPDFDownload from "./DownloadHistoricalData";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { DownloadCloud } from "lucide-react";
const HistoricalData = () => {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);
  const [data, setData] = React.useState<historicalDataType >(
    historicalData
  );
  const [loading, setLoading] = React.useState(false);
  const [currentUrl, setCurrentUrl] = React.useState("/api/historical-data");

  //   const fetchData = async (url: string) => {
  //     setLoading(true);
  //     try {
  //       const res = await fetch(url);
  //       const data = await res.json();
  //       setHistoricalData(data);
  //     } catch (error) {
  //       console.error("Failed to fetch historical data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchData(currentUrl);
  //   }, [currentUrl]);

  if (!historicalData || loading) {
    return <p className="text-white p-4">Loading historical data...</p>;
  }

  const quote = data?.results[0].indicators.quote[0];
  const adjclose = data?.results[0].indicators.adjclose[0];
  const dates = data?.results[0].dates;
  const prev = data?.previous; // e.g. null or a string URL
  const next = data?.next;
  return (
    <div className="w-full flex flex-row items-start justify-between  px-8">
      <div className="w-9/12 flex flex-col items-center justify-start">
        <div className="w-full flex-col items-start text-white">
          <CompanyDetails />

          <div className="flex flex-row items-center justify-start  ">
            <InputSection />
          </div>
          <div className="flex flex-row items-center w-full justify-end ">
            <Button 
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
                            </Button>
            <Button 
                  variant="graphTab2"
                  // onClick={() => {}}
                  className={`mr-1  text-[var(--variant-4)]   text-[var(--variant-4)] border-l-transparent border-b-transparent border-r-transparent border-t-transparent hover:border-[var(--variant-3)]   `}
                >
            {mounted   && <>
                          
               <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>  
                          <HistoricalDataPDFDownload 
                historicalData={data}
              /> 
                            </TooltipTrigger>
                  <TooltipContent>
                    <p>{`Download Historical Data`}</p>
                  </TooltipContent>
                </Tooltip>
              
              
                            </TooltipProvider>
                       
                         </>}
                         </Button>
          </div>
          <div className="w-full flex flex-col items-center mt-1">
            <div className="flex flex-row items-center justify-end w-full">
              <p className="text-end text-sm my-2 mr-2">Currency in USD</p>
            </div>
            <Table>
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
                {data?.results[0].indicators.quote[0].open.map(
                  (item, index) => (
                    <TableRow>
                      <TableCell className="font-medium text-center">
                        {historicalData.results[0].dates[index]}
                      </TableCell>
                      <TableCell className="text-center">
                        {
                          historicalData.results[0].indicators.quote[0].open[
                            index
                          ]
                        }
                      </TableCell>
                      <TableCell className="text-center">
                        {
                          historicalData.results[0].indicators.quote[0].high[
                            index
                          ]
                        }
                      </TableCell>

                      <TableCell className="text-center">
                        {
                          historicalData.results[0].indicators.quote[0].low[
                            index
                          ]
                        }
                      </TableCell>
                      <TableCell className="text-center">
                        {
                          historicalData.results[0].indicators.quote[0].close[
                            index
                          ]
                        }
                      </TableCell>
                      <TableCell className="text-center">
                        {
                          historicalData.results[0].indicators.adjclose[0]
                            .adjclose[index]
                        }
                      </TableCell>
                      <TableCell className="text-center">
                        {
                          historicalData.results[0].indicators.quote[0].volume[
                            index
                          ]
                        }
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={prev ?? "#"}
                    className={prev ? "" : "pointer-events-none opacity-50"}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href={next ?? "#"}
                    className={next ? "" : "pointer-events-none opacity-50"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
      <div className="w-3/12 flex flex-col items-center p-4 text-white">
        <div className=" pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Previous close</p>
          <p>{appleData1d.chart.result[0].meta.previousClose}</p>
        </div>

        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Open</p>
          <p>{appleData1d.chart.result[0].meta.open}</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Bid</p>
          <p>null</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Ask</p>
          <p>null</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Day's Range</p>
          <p>{appleData1d.chart.result[0].meta.dayRange}</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>52 Week Range</p>
          <p>{appleData1d.chart.result[0].meta.week52Range}</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Volume</p>
          <p>{appleData1d.chart.result[0].meta.volume}</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Avg. Volume</p>
          <p>{appleData1d.chart.result[0].meta.avgVolume}</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Market Cap (intraday)</p>
          <p>{appleData1d.chart.result[0].meta.marketCap}</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Beta (5Y Monthly)</p>
          <p>null</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>PE Ratio (TTM)</p>
          <p>{appleData1d.chart.result[0].meta.peRatio}</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>EPS (TTM)</p>
          <p>{appleData1d.chart.result[0].meta.eps}</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Earnings Date</p>
          <p>{appleData1d.chart.result[0].meta.earningsDate}</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Forward Dividend & Yield</p>
          <p>null</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Ex-Dividend Date</p>
          <p>null</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>1y Target Est</p>
          <p>null</p>
        </div>
      </div>
    </div>
  );
};

export default HistoricalData;
