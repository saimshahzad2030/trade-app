"use client"
import React from "react"
import SearchBar from "../Searchbar/Searchbar"
import { poppins } from "@/fonts/fonts";
import { Input } from "../ui/input";
import { Search, X } from "lucide-react";
import RoundLoader from "../Loader/RoundLoader";
import Link from "next/link";
import { searchStock } from "@/services/search.services";
import { StockToDisplayType } from "@/types/types";
import FullScreenLoader from "../Loader/FullScreenLoader";
 
const mockData = [
  {
    symbol: "PRAA",
    name: "PRA Group, Inc.",
    currency: "USD",
   exchangeShortName: "NasdaqGS",
    exchange: "NASDAQ",
  },
  {
    symbol: "PAAS",
    name: "Pan American Silver Corp.",
    currency: "USD",
    exchangeShortName: "NasdaqGS",
    exchange: "NASDAQ",
  },
];
const Custom404 = ()=>{
    const [query, setQuery] = React.useState<string>("");
      const [loading, setLoading] = React.useState<boolean>(false);
      const [navigateLoading, setNavigateLoading] = React.useState<boolean>(false);
      const [chartDataLoading, setChartDataLoading] = React.useState<boolean>(true);
      const [chartData, setChartData] = React.useState<StockToDisplayType[] | []>([]);
      const [filteredStocks, setFilteredStocks] = React.useState<typeof mockData>([]);
    
      const handleInputChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
        const q = event.target.value;
        setQuery(q);
        setLoading(true)
        const searchedStock = await searchStock(q)
        setFilteredStocks(searchedStock.data)
        if (!q.trim()) {
          setFilteredStocks([]);
          return;
        }
        setLoading(false)
    
        
      };
    return(
    <>
    
     {navigateLoading && <FullScreenLoader />}
   
    <div className="flex flex-col items-center w-full justify-center h-[70vh] ">
         
                <div className="z-[48] px-8  flex flex-col items-center justify-start w-7/12 h-[70vh]  ">
           <div className="flex   flex-row items-start justify-center w-full   w-full">
                
                <div className="flex flex-col items-end justify-center w-full">
            <h1 
                   className={`text-white w-full ${poppins.className} text-[clamp(1rem,2vw,2rem)] leading-[clamp(2rem,3vw,3rem)] font-bold text-end`}
      
                >404</h1>
         <p
          className={`text-gray-400    w-full ${poppins.className} text-sm  text-end`}
        >
          No Suck Stock Found.
        </p>
        </div>
               
                <div className="h-[10vh] w-[2px]   mx-8 bg-[var(--variant-2)]"></div>
        
        <div className="flex flex-col items-start justify-center w-full">
            <h1
           className={`text-white w-full ${poppins.className} text-[clamp(1rem,1vw,2rem)]  mt-1 font-bold text-start`}
          >
          No need to worry.
        </h1>
         <p
          className={`text-gray-400    w-full ${poppins.className} text-sm  text-start`}
        >
           You can search any other stock using the search menu
        </p>
        </div>
        </div>
        <div className="rounded-md relative mt-8  w-full flex flex-col items-center p-2 bg-white">
          <div className="relative w-full ">
             <Input
          placeholder="Search stock name or symbol..."
          value={query}
          onChange={handleInputChange}
          className=" w-full pl-4 p-3 pr-12 bg-white text-black focus:outline-none shadow-md placeholder:text-gray-500"
        />
            
            {query && (
              <X
                className="cursor-pointer absolute right-10 top-1/2 transform -translate-y-1/2 text-[var(--variant-3)]"
                onClick={() => {
                  setQuery("");
                }}
              />
            )}
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[var(--variant-3)]" />
          </div>

          {query && <>
          {loading?
          <div className="py-2 w-full flex flex-row items-center justify-center">
            <RoundLoader  />
          </div>:
          <>{
            filteredStocks.length>0 ?
            <div className="z-[48]  top-2/3 absolute w-full bg-white shadow-lg rounded-t-none   rounded-md mt-2 z-50 max-h-[200px] overflow-y-scroll">
          {filteredStocks.map((item, index) => (
           <Link  key={index}
           onClick={()=>{
               setNavigateLoading(true)
               setFilteredStocks([])}
        }
           href={`/summary/${item.symbol}`} className="flex flex-col w-full items-start hover:bg-gray-50  p-3 ">
            <div
              key={index}
              className="hover:text-[var(--variant-6)] flex flex-row items-center justify-between w-full cursor-pointer  "
            >
              <span className="text-xs text-gray-700">{item.name}</span>
              <span className="text-xs text-gray-400">{item.symbol}</span>
            </div>
             <div
              key={index}
              className="hover:text-[var(--variant-6)] flex flex-row items-center justify-start w-full   cursor-pointer  "
            >
              <span className="text-xs text-gray-400">{item.exchangeShortName}</span>
            </div></Link>
          ))}
        </div>:
        <div className="w-full flex flex-col items-center text-gray-900 p-4"><p>No Such Stock Found</p></div>
          }</>}</>}
        </div>
      </div> 
    </div>
     </>
   )
}
export default Custom404