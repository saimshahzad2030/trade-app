"use client";
import { poppins } from "@/fonts/fonts";
import { Apple, Search, X } from "lucide-react";
import React from "react";
import CountUp from "react-countup";
interface Stock {
  symbol: string;
  companyName: string;
  price: number;
  icon: string;
  sector: string;
  marketCap: string;
  changePercentage: string;
}

const stockList = [
  {
    symbol: "AAPL",
    companyName: "Apple Inc.",
    price: 150.0,
    icon: "https://logo.clearbit.com/apple.com",
    sector: "Technology",
    marketCap: "2.48T",
    changePercentage: "+1.25%",
  },
  {
    symbol: "GOOGL",
    companyName: "Alphabet Inc.",
    price: 280.0,
    icon: "https://logo.clearbit.com/abc.xyz",
    sector: "Communication Services",
    marketCap: "1.89T",
    changePercentage: "-1.30%",
  },
  {
    symbol: "MSFT",
    companyName: "Microsoft Corporation",
    price: 300.0,
    icon: "https://logo.clearbit.com/microsoft.com",
    sector: "Technology",
    marketCap: "2.27T",
    changePercentage: "+0.75%",
  },
  {
    symbol: "TSLA",
    companyName: "Tesla Inc.",
    price: 720.0,
    icon: "https://logo.clearbit.com/tesla.com",
    sector: "Consumer Discretionary",
    marketCap: "900B",
    changePercentage: "+3.80%",
  },
  {
    symbol: "AMZN",
    companyName: "Amazon.com Inc.",
    price: 3400.0,
    icon: "https://logo.clearbit.com/amazon.com",
    sector: "Consumer Discretionary",
    marketCap: "1.60T",
    changePercentage: "+0.50%",
  },
  {
    symbol: "META",
    companyName: "Meta Platforms Inc.",
    price: 330.0,
    icon: "https://logo.clearbit.com/meta.com",
    sector: "Communication Services",
    marketCap: "920B",
    changePercentage: "=0.00%",
  },
  {
    symbol: "NVDA",
    companyName: "NVIDIA Corporation",
    price: 780.0,
    icon: "https://logo.clearbit.com/nvidia.com",
    sector: "Technology",
    marketCap: "2.30T",
    changePercentage: "+2.10%",
  },
  {
    symbol: "NFLX",
    companyName: "Netflix Inc.",
    price: 510.0,
    icon: "https://logo.clearbit.com/netflix.com",
    sector: "Communication Services",
    marketCap: "240B",
    changePercentage: "+1.90%",
  },
  {
    symbol: "INTC",
    companyName: "Intel Corporation",
    price: 60.0,
    icon: "https://logo.clearbit.com/intel.com",
    sector: "Technology",
    marketCap: "200B",
    changePercentage: "=0.00%",
  },
  {
    symbol: "ADBE",
    companyName: "Adobe Inc.",
    price: 650.0,
    icon: "https://logo.clearbit.com/adobe.com",
    sector: "Technology",
    marketCap: "320B",
    changePercentage: "+0.85%",
  },
];

const Landing = () => {
  const [query, setQuery] = React.useState("");
  const [filteredStocks, setFilteredStocks] = React.useState<Stock[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setQuery(input);

    if (!input) return setFilteredStocks([]);

    const filtered = stockList.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(input.toLowerCase()) ||
        stock.companyName.toLowerCase().includes(input.toLowerCase()) ||
        stock.sector.toLowerCase().includes(input.toLowerCase())
    );

    setFilteredStocks(filtered);
  };
  return (
    <div
      style={{
        backgroundImage: "url('/assets/landing-bg.jpg')", // Replace with your image path
      }}
      className="relative bg-cover bg-center flex flex-col items-center justify-start w-full h-[100vh] bg-[#13131f]   text-white p-4"
    >
      <div className="absolute inset-0 bg-black opacity-80 z-10"></div>

      <div className="z-50 px-8  flex flex-col items-center justify-start w-full h-[85vh]  ">
        <h1
          className={`mt-[30vh] w-7/12 ${poppins.className} text-[clamp(2rem,3vw,3rem)] leading-[clamp(2rem,3vw,3rem)] font-bold text-center`}
        >
          Unleash the Power of Data-Driven Financial Insights
        </h1>
        <div className="mt-8  w-6/12 flex flex-col items-center ">
          <div className="relative w-full ">
            <input
              type="text"
              placeholder="Search for a stock (e.g. AAPL, GOOGL)"
              value={query}
              onChange={handleInputChange}
              className="rounded-full w-full pl-4 p-3 pr-12 bg-white text-black focus:outline-none shadow-md placeholder:text-gray-500"
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

          {/* Filtered Results */}
          {filteredStocks.length > 0 && (
            <ul className="w-full mt-2 bg-white text-black rounded-lg overflow-hidden shadow-md max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {filteredStocks.map((stock, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b last:border-none"
                >
                  <div className="flex items-center">
                    <img
                      src={stock?.icon}
                      alt={stock?.symbol}
                      className="w-6 h-6 mr-4"
                    />
                    <div>
                      <div className="font-bold text-[var(--variant-4)]">
                        {stock.companyName}
                      </div>
                      <div className="text-sm text-[var(--variant-6)]">
                        {stock.symbol}
                      </div>
                      <div className="text-sm text-[var(--variant-6)]">
                        ${stock.price.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-400">
                        {stock.sector} | {stock.marketCap}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="z-50 w-full grid grid-cols-5 gap-1  ">
        {stockList.slice(0, 5).map((stock, index) => (
          <div
            key={index}
            className=" group   cursor-pointer text-white   p-4 flex flex-col items-center justify-center duration-500 transition-colors"
          >
            <h2 className="text-lg font-medium text-center">
              {stock.companyName}
            </h2>
            <div className="flex flex-row items-center">
              <p className="text-sm text-white mr-1">
                ${<CountUp end={Number(stock.price.toFixed(2))} duration={2} />}
              </p>
              <p
                className={`text-sm ${
                  stock.changePercentage.split("")[0] == "-"
                    ? "text-red-600"
                    : "text-green-600"
                } ml-1`}
              >
                {stock.changePercentage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Landing;
