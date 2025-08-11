"use client";
import { poppins } from "@/fonts/fonts";
import { Apple, Search, X } from "lucide-react";
import React from "react";
import CountUp from "react-countup";
import { Input } from "@/components/ui/input";
import { searchStock } from "@/services/search.services";
import Link from "next/link";
import { getDisplayData } from "@/services/stocks.services";
import { StockToDisplayType } from "@/types/types";
import SkeletonLoader from "../Loader/SkeletonLoader";
import FullScreenLoader from "../Loader/FullScreenLoader";
import RoundLoader from "../Loader/RoundLoader"; 
import { toast } from "sonner";

 
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
 

const Landing = () => { 
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
    React.useEffect(()=>{
          const fetchChartData = async()=>{
            setChartDataLoading(true)
            let response = await getDisplayData();
            if(response.status ==200){
              setChartData(response.data)
            }
            else{
              setChartData([])
            }
            setChartDataLoading(false)
            
          }
          fetchChartData()
  
        },[])
        
 


   return (
    <>
    {navigateLoading && <FullScreenLoader />}
    <div
      style={{
        backgroundImage: "url('/assets/landing-bg.jpg')", // Replace with your image path
      }}
      className="relative bg-cover bg-center flex flex-col items-center justify-start w-full h-[100vh] bg-[#13131f]   text-white p-4"
    >
      <div className="absolute inset-0 bg-black opacity-80 z-9"></div>

      <div className="z-[48] px-8  flex flex-col items-center justify-start w-full h-[85vh]  ">
        <h1
          className={`mt-[30vh] w-7/12 ${poppins.className} text-[clamp(2rem,3vw,3rem)] leading-[clamp(2rem,3vw,3rem)] font-bold text-center`}
        >
          Unleash the Power of Data-Driven Financial Insights
        </h1>
        <div className="rounded-md relative mt-8  w-6/12 flex flex-col items-center p-2 bg-white">
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
            setFilteredStocks([])
            setNavigateLoading(true)}}
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
      <div className="z-[47] w-full grid grid-cols-5 gap-1  ">
        {chartDataLoading?
         Array.from({ length: 5 }).map((stock, index) => (
          <div
            key={index}
            className=" group   cursor-pointer text-white   p-4 flex flex-col items-center justify-center duration-500 transition-colors"
          >
            <SkeletonLoader className="w-6/12 h-4 bg-gray-700"/>
            <div className="flex flex-row items-center mt-2">
                         <SkeletonLoader className="w-12 h-2 bg-gray-700"/> 

            </div>
          </div>
        )):
        chartData.slice(0, 5).map((stock, index) => (
          <div
            key={index}
            className=" group   cursor-pointer text-white   p-4 flex flex-col items-center justify-center duration-500 transition-colors"
          >
            <h2 className="text-lg font-medium text-center">
              {stock.name}
            </h2>
            <div className="flex flex-row items-center">
              <p className="text-sm text-white mr-1">
                {stock.price}
              </p>
              <p
                className={`text-sm ${
                  stock.changeColor == "red"
                    ? "text-red-600"
                    : "text-green-600"
                } ml-1`}
              >
                {stock.percentChange}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div></>
  );
};

export default Landing;
