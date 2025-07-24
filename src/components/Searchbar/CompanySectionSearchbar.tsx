 
"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { searchStock } from "@/services/search.services";
import RoundLoader from "../Loader/RoundLoader";
import Link from "next/link";
import { CompanyFinancialMetrics, StockItem } from "../ChartSection/SubChartParent";
import { getStockFinancialMetrices } from "@/services/stocksFinancialMetrics.services";

export const mockData = [
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
 type prop ={
  className?:string;
   handleNewData: ( newData: CompanyFinancialMetrics) => void;

  setStocks: React.Dispatch<React.SetStateAction<StockItem[]>>;

 }
 
const CompanySectionSearchbar = ({className,handleNewData,setStocks}:prop) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<typeof mockData>([]);

  const handleSearch = async(event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    setLoading(true)
    const searchedStock = await searchStock(query)
    setFilteredData(searchedStock.data!=null?searchedStock.data:[])
    setLoading(false)
    
    if (!query.trim()) {
      setFilteredData([]);
      return;
    }

    
  };

  return (
    <div className={`relative flex flex-col border border-white items-center w-7/12 bg-[#13131f] p-1 rounded-full ${className}`}>
      <div className="relative w-full   ">
        <Input
          placeholder="Search Company Name"
          value={searchQuery}
          onChange={handleSearch}
          className="pl-10 pr-4  h-8 w-full text-gray-300 bg-[#13131f] rounded-full border-none"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      {searchQuery && !loading  && (filteredData.length>0?
        
        <div className="  top-2/3 absolute w-full bg-white shadow-lg rounded-t-none   rounded-md mt-2 z-50 max-h-[300px] overflow-y-scroll">
          {filteredData.map((item, index) => (
           <button
           onClick={async()=>{
             setSearchQuery("")
 let response2 = await getStockFinancialMetrices(item.symbol); 

            handleNewData(response2.data as CompanyFinancialMetrics)

          setStocks((prev) => {
    const alreadyExists = prev.some((stock) => stock.symbol === item.symbol);
    if (alreadyExists) return prev; 

    const normalizedItem: StockItem = {
      symbol: item.symbol,
      name: item.name,
      currency: item.currency,
      stockExchange: item.exchange, // ✅ Mapping `exchange` to `stockExchange`
      exchangeShortName: item.exchangeShortName,
    };

    return [...prev, normalizedItem];

   
  });
  setSearchQuery("")
           }}
           key={index}   className="flex flex-col w-full items-start hover:bg-gray-50  p-3 ">
            <div
              key={index}
              className="hover:text-[var(--variant-6)] flex flex-row items-center justify-between w-full cursor-pointer  "
            >
              <span className="text-xs">{item.name}</span>
              <span className="text-xs text-gray-400">{item.symbol}</span>
            </div>
             <div
              key={index}
              className="hover:text-[var(--variant-6)] flex flex-row items-center justify-start w-full   cursor-pointer  "
            >
              <span className="text-xs text-gray-400">{item.exchangeShortName}</span>
            </div></button>
          ))}
        </div>
      :  <div className="  top-2/3 absolute w-full bg-gray-400 shadow-lg rounded-t-none   rounded-md mt-2 z-50 ">
       <p className="  p-4">No Such Stock Exist</p>
       </div>
      )} 
     
      {searchQuery && loading && (
 <div className="  top-2/3 absolute w-full bg-white shadow-lg rounded-t-none  h-10  rounded-md mt-2 z-50">
  <RoundLoader/>
        </div>

      )}
    </div>
  );
};
 

export default CompanySectionSearchbar
