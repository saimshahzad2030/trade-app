"use client";
import React from "react";
import { poppins } from "@/fonts/fonts";
import { getStocksGainLoss } from "@/services/stocks.services";
import { TopGainersResponse, TopLosersResponse, TopTradedStockResponse } from "@/types/types";
import SkeletonLoader from "../Loader/SkeletonLoader";

const InvestmentIdeas = () => {
  const [topGainersData, setTopGainersData] = React.useState<TopGainersResponse | null>(null);
  const [topLosersData, setTopLosersData] = React.useState<TopLosersResponse | null>(null);
  const [topTradeedStockData, setTopTradeedStockData] = React.useState<TopTradedStockResponse | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      const response = await getStocksGainLoss();
      setLoading(false);
      if (typeof response.data !== "string") {
        setTopGainersData(response.data.gainerResponse);
        setTopLosersData(response.data.loserResponse);
        setTopTradeedStockData(response.data.tradingResponse);
      } else {
        console.error("Failed to fetch stock data:", response.data);
      }
    };
    fetchChartData();
  }, []);

  const renderSkeleton = () => (
    <div className="flex flex-col gap-4 w-full mt-4">
      {[...Array(5)].map((_, idx) => (
        <div key={idx} className="flex flex-col gap-2 w-full">
          <SkeletonLoader className="h-3 w-24 bg-gray-700" />
          <SkeletonLoader className="h-3 w-32 bg-gray-700" />
          <SkeletonLoader className="h-[1px] w-full bg-white" />
        </div>
      ))}
    </div>
  );

  const renderSection = (
    title: string,
    description: string,
    data: any[] | undefined,
    gainOrLoss: "gain" | "loss" | "mixed"
  ) => (
    <div className="min-h-[460px] flex flex-col items-start bg-[#0d0d14] w-full p-8 rounded-3xl text-[var(--variant-4)]">
      <h1 className={`${poppins.className} font-extrabold text-2xl`}>{title}</h1>
      <p className={`${poppins.className} mt-1 text-sm text-gray-200`}>{description}</p>

      {loading ? (
         <>
         <div className="mt-4 flex flex-row items-center justify-between w-full text-gray-300">
            <p className="text-xs font-bold">Company</p>
            <p className="text-end text-xs font-bold">Last Price</p>
          </div>
       { renderSkeleton()}</>
      ) : (
        <>
          <div className="mt-4 flex flex-row items-center justify-between w-full text-gray-300">
            <p className="text-xs font-bold">Company</p>
            <p className="text-end text-xs font-bold">Last Price</p>
          </div>
          {data?.map((stock, index) => (
            <div className="w-full" key={index}>
              <div className="flex flex-row items-center justify-between w-full mt-2">
                <div className="flex flex-col items-start w-6/12">
                  <p className="text-sm font-bold text-[var(--variant-3)]">{stock.symbol}</p>
                  <p className="text-sm text-gray-300 line-clamp-1">{stock.name}</p>
                </div>
                <div className="flex flex-col items-end w-6/12">
                  <p className="text-end text-sm text-gray-300">{stock.price}</p>
                  <p
                    className={`text-end text-xs font-bold ${
                      gainOrLoss === "gain"
                        ? "text-green-600"
                        : gainOrLoss === "loss"
                        ? "text-red-600"
                        : stock.changesPercentage.startsWith("-")
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {gainOrLoss !== "gain" && gainOrLoss !== "loss" && !stock.changesPercentage.startsWith("+")
                      ? stock.changesPercentage
                      : `+ ${stock.changesPercentage}`}
                  </p>
                </div>
              </div>
              <div className="w-full h-[1px] bg-white mt-2" />
            </div>
          ))}
        </>
      )}
    </div>
  );

  return (
    <div className="px-8 flex flex-col items-center justify-center w-full h-[100vh] bg-[#13131f] text-white p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4 mt-8">
        {renderSection(
          "Top Daily Gainers",
          "Discover equities with the greatest gains during the trading day",
          topGainersData?.top_gainers.result,
          "gain"
        )}
        {renderSection(
          "Top Daily Losers",
          "See equities with the greatest losses during the trading day",
          topLosersData?.top_losers.result,
          "loss"
        )}
        
        {renderSection(
          "Most Active Stocks",
          "Look at equities with the highest trading volume during the trading day",
          topTradeedStockData?.top_traded_stocks.result,
          "mixed"
        )}
      </div>
    </div>
  );
};

export default InvestmentIdeas;
