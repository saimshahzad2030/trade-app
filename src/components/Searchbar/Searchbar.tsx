"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { searchStock } from "@/services/search.services";
import RoundLoader from "../Loader/RoundLoader";
import Link from "next/link";

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
 
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<typeof mockData>([]);

  const handleSearch = async(event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    setLoading(true)
    const searchedStock = await searchStock(query)
    setLoading(false)
    setFilteredData(searchedStock.data)
    if (!query.trim()) {
      setFilteredData([]);
      return;
    }

    
  };

  return (
    <div className="relative flex flex-col items-center w-3/12 bg-white p-1 rounded-md">
      <div className="relative w-full   ">
        <Input
          placeholder="Search stock name or symbol..."
          value={searchQuery}
          onChange={handleSearch}
          className="pl-10 pr-4  h-8 w-full bg-white  "
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      {searchQuery && !loading && filteredData.length > 0 && (
        <div className="  top-2/3 absolute w-full bg-white shadow-lg rounded-t-none   rounded-md mt-2 z-50 max-h-[300px] overflow-y-scroll">
          {filteredData.map((item, index) => (
           <Link key={index} href={`/chart/${item.symbol}`} className="flex flex-col w-full items-start hover:bg-gray-50  p-3 ">
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
            </div></Link>
          ))}
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

export default SearchBar;
