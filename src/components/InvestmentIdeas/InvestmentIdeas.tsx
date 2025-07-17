"use client";
import { poppins } from "@/fonts/fonts";
import { topGainers, topLosers, topTradedStocks } from "@/global/constants";
import { getStocksGainLoss } from "@/services/stocks.services";
import { TopGainersResponse, TopLosersResponse, TopTradedStockResponse } from "@/types/types";
import React from "react";
import CountUp from "react-countup";
import RoundLoader from "../Loader/RoundLoader";

const InvestmentIdeas = () => {
    const [topGainersData,setTopGainersData] = React.useState<TopGainersResponse|null>(null)
    const [topLosersData,setTopLosersData] = React.useState<TopLosersResponse|null>(null)
    const [topTradeedStockData,setTopTradeedStockData] = React.useState<TopTradedStockResponse|null>(null)
    const [loading,setLoading] = React.useState(false)
        React.useEffect(()=>{
          const fetchChartData = async()=>{
            setLoading(true)
            let response:
  | {
      status: number;
      data: {
        gainerResponse: TopGainersResponse;
        loserResponse: TopLosersResponse;
        tradingResponse: TopTradedStockResponse;
      };
    }
  | {
      status: number;
      data: string;
    } = await getStocksGainLoss();
setLoading(false)
           if (typeof response.data !== "string") {
      setTopGainersData(response.data.gainerResponse);
      setTopLosersData(response.data.loserResponse);
      setTopTradeedStockData(response.data.tradingResponse);
    } else {
      // Optional: handle error case (like showing a toast or fallback state)
      console.error("Failed to fetch stock data:", response.data);
    }
          }
          fetchChartData()
  
        },[])
  return (
    <div className=" px-8  flex flex-col items-center justify-center w-full h-[100vh] bg-[#13131f]  text-white p-4">
      <div className="grid grid-cols-3 w-full gap-4 mt-8">
        <div className="min-h-[460px] flex flex-col items-start bg-none bg-[#0d0d14] w-full p-8 rounded-3xl text-[var(--variant-4)] ">
          <h1 className={`${poppins.className} font-extrabold text-2xl`}>
            Top Daily Gainers
          </h1>
          <p className={`${poppins.className} mt-1   text-sm text-gray-200`}>
            Discover equities with the greatest gains during the trading day
          </p>
         
          {loading?
          <div className="flex flex-col items-center w-full"><RoundLoader/></div>:
          
          <>
           <div className="mt-4  flex flex-row items-center justify-between w-full  text-gray-300">
            <p className="text-xs font-bold">Company</p>
            <p className="text-end text-xs font-bold">Last Price</p>
          </div>
          {topGainersData?.top_gainers.result.map((stock, index) => (
            <div className="w-full" key={index}>
              <div className="flex flex-row items-center justify-between w-full mt-2 text-[var(--variant-4)] ">
                <div className="flex flex-col items-start w-6/12">
                  <p className="text-sm font-bold text-[var(--variant-3)]">
                    {stock.symbol}
                  </p>
                  <p className="text-sm text-gray-300  line-clamp-1">
                    {stock.name}
                  </p>
                </div>
                <div className="flex flex-col items-end w-6/12">
                  <p className="text-end text-sm text-gray-300">
                   {stock.price}
                  </p>
                  <p className="text-end text-xs text-green-600 font-bold">
                    + {stock.changesPercentage}
                  </p>
                </div>
              </div>
              <div className="w-full h-[1px] bg-white mt-2" />
            </div>
          ))}</>}
        </div>
        <div className="min-h-[460px] flex flex-col items-start bg-none bg-[#0d0d14] w-full p-8 rounded-3xl text-[var(--variant-4)] ">
          <h1 className={`${poppins.className} font-extrabold text-2xl`}>
            Top Daily Losers
          </h1>
          <p className={`${poppins.className} mt-1   text-sm text-gray-200 `}>
            See equities with the greatest losses during the trading day
          </p>
         
          {loading?
          <div className="flex flex-col items-center w-full"><RoundLoader/></div>:<>
           <div className="mt-4  flex flex-row items-center justify-between w-full  text-gray-300 ">
            <p className="text-xs font-bold   ">Company</p>
            <p className="text-end text-xs font-bold">Last Price</p>
          </div>
          {topLosersData?.top_losers.result.map((stock, index) => (
            <div className="w-full" key={index}>
              <div className="flex flex-row items-center justify-between w-full mt-2 text-[var(--variant-4)] ">
                <div className="flex flex-col items-start w-6/12">
                  <p className="text-sm font-bold text-[var(--variant-3)]">
                    {stock.symbol}
                  </p>
                  <p className="text-sm text-gray-300 line-clamp-1">
                    {stock.name}
                  </p>
                </div>
                <div className="flex flex-col items-end w-6/12">
                  <p className="text-end text-sm text-gray-300 ">
                    {stock.price}
                  </p>
                  <p className="text-end text-xs text-red-600 font-bold">
                    {stock.changesPercentage}
                  </p>
                </div>
              </div>
              <div className="w-full h-[1px] bg-white mt-2" />
            </div>
          ))}</>}
        </div>
        <div className="min-h-[460px] flex flex-col items-start bg-[#0d0d14] w-full p-8 rounded-3xl text-[var(--variant-4)] ">
          <h1 className={`${poppins.className} font-extrabold text-2xl`}>
            Most Active Stocks
          </h1>
          <p className={`${poppins.className} mt-1   text-sm text-gray-200 `}>
            Look at equities with the highest trading volume during the trading
            day
          </p>
        
          {loading?
          <div className="flex flex-col items-center w-full"><RoundLoader/></div>:<>
            <div className="mt-4  flex flex-row items-center justify-between w-full  text-gray-300 ">
            <p className="text-xs font-bold   ">Company</p>
            <p className="text-end text-xs font-bold">Last Price</p>
          </div>
          {topTradeedStockData?.top_traded_stocks.result.map((stock, index) => (
            <div className="w-full" key={index}>
              <div className="flex flex-row items-center justify-between w-full mt-2 text-[var(--variant-4)] ">
                <div className="flex flex-col items-start w-6/12">
                  <p className="text-sm font-bold text-[var(--variant-3)]">
                    {stock.symbol}
                  </p>
                  <p className="text-sm text-gray-300 line-clamp-1">
                    {stock.name}
                  </p>
                </div>
                <div className="flex flex-col items-end w-6/12">
                  <p className="text-end text-sm text-gray-300 ">
                    {stock.price}
                  </p>
                  <p
                    className={`text-end text-xs ${
                      stock.changesPercentage.split("")[0] == "-"
                        ? "text-red-600"
                        : "text-green-600"
                    } font-bold`}
                  >
                    {stock.changesPercentage}
                  </p>
                </div>
              </div>
              <div className="w-full h-[1px] bg-white mt-2" />
            </div>
          ))}</>}
        </div>
      </div>
    </div>
  );
};

export default InvestmentIdeas;
