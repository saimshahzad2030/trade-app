"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const mockData = [
  {
    symbol: "PRAA",
    name: "PRA Group, Inc.",
    currency: "USD",
    stockExchange: "NasdaqGS",
    exchangeShortName: "NASDAQ",
  },
  {
    symbol: "PAAS",
    name: "Pan American Silver Corp.",
    currency: "USD",
    stockExchange: "NasdaqGS",
    exchangeShortName: "NASDAQ",
  },
];

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<typeof mockData>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredData([]);
      return;
    }

    const filtered = mockData.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.symbol.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div className="relative flex flex-col items-center w-4/12 bg-white p-1 rounded-md">
      <div className="relative w-full   ">
        <Input
          placeholder="Search stock name or symbol..."
          value={searchQuery}
          onChange={handleSearch}
          className="pl-10 pr-4  h-8 w-full bg-white  "
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      {searchQuery && filteredData.length > 0 && (
        <div className="  top-2/3 absolute w-full bg-white shadow-lg rounded-t-none   rounded-md mt-2 z-50">
          {filteredData.map((item, index) => (
            <div
              key={index}
              className="hover:text-[var(--variant-6)] flex flex-row items-center justify-between w-full p-3 cursor-pointer hover:bg-gray-50 "
            >
              <span className="text-xs">{item.name}</span>
              <span className="text-xs text-gray-400">{item.symbol}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
