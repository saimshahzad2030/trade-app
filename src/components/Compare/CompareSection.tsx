"use client";
import { ChevronDown, ChevronLeft, ChevronUp, Plus, X } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
type SearchedStock = {symbol: string,
  name: string,
  currency: string,
  stockExchange: string,
  exchangeShortName: string, }
import ReactECharts from "echarts-for-react";
const displayNameMap: Record<string, string> = {
  marketValueChart: "Market Value",
  enterpriseValueChart: "Enterprise Value",
  peRatioChart: "P/E Ratio",
  dilutedEPSChart: "EPS (Diluted)",
  dividendYieldChart: "Dividend Yield", 
};
function parseValueWithSuffix(value: string): number {
  if (typeof value !== "string") return Number(value);

  const suffix = value.slice(-1).toUpperCase();
  const number = parseFloat(value.replace(/[^0-9.]/g, ""));

  switch (suffix) {
    case "T":
      return number * 1e12;
    case "B":
      return number * 1e9;
    case "M":
      return number * 1e6;
    default:
      return number;
  }
}

type Company = {
  symbol: string;
  name?: string;
  as_of_today_date?: string;
  companyName?:string;
            // "": "Apple Inc.", 
            // "price": 214.4,
            // "priceChange": 1.92,
            // "changePercentage": 0.9,
            // "marketValueHead": "3.20T",
            // "enterpriseValueHead": "3.27T",
            // "priceToEarnings": 33.04,
            // "priceToBook": 48.13,
            // "priceToSales": 8.0,
            // "earningspersharediluted": 6.08,
            // "dividendYield": 0.0,
            // "sector": "Technology",
            // "industry": "Consumer Electronics",
            // "ceo": "Timothy D. Cook",
  [key: string]: any; // Add this line to allow dynamic keys
};
type CompanyMetricKey =
  | "pricePerformance"
  | "margins"
  | "earnings"
  | "financials"
  | "valuation"
  | "forwardDividendYield";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { comparisionMockApi } from "@/global/constants";
import { useParams, useRouter } from "next/navigation";
import RadarCharts from "./RadarCharts";
import { getcomparisonData } from "@/services/compareStocks.services";
import { ComparisonDataTypes, ComparisonStockData } from "@/types/types";
import RoundLoader from "../Loader/RoundLoader";
import StockAccordion from "./StockAccordion";
import { searchStock } from "@/services/search.services";
import { toast } from "sonner";
import SkeletonLoader from "../Loader/SkeletonLoader";
const excludedKeys = [
  "companyName",
  "symbol",
  "price",
  "as_of_today_date",
  "priceChange",
  "marketValueChart",
  "enterpriseValueChart",
  "peRatioChart",
  "dilutedEPSChart",
  "dividendYieldChart",
  "changePercentage", 
  "roc",
  "earningsPerShareDiluted",
  "grossProfitMarginIndicator",
  "dcf",
  "debtToEquityRatioIndicator",
  "peRatioIndicator",
  "epsIndicator",
  "beta",
  "wacc",
  "fcff",
  // "marketValueHead",
  // "enterpriseValueHead",
  // "priceToEarnings",
  "priceToBook","priceToSales", 
  // "earningspersharediluted", "dividendYield",
  "sector", "industry","ceo"
];
const topCurrencies = [
  { name: "United States Dollar", code: "USD", symbol: "$" },
  { name: "Euro", code: "EUR", symbol: "€" },
  { name: "British Pound Sterling", code: "GBP", symbol: "£" },
  { name: "Japanese Yen", code: "JPY", symbol: "¥" },
  { name: "Swiss Franc", code: "CHF", symbol: "CHF" },
  { name: "Canadian Dollar", code: "CAD", symbol: "C$" },
  { name: "Australian Dollar", code: "AUD", symbol: "A$" },
  { name: "Chinese Yuan", code: "CNY", symbol: "¥" },
  { name: "Indian Rupee", code: "INR", symbol: "₹" },
  { name: "Singapore Dollar", code: "SGD", symbol: "S$" },
];
const stockList = [
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: "412.56",
    change: "+0.85%",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: "143.18",
    change: "-0.22%",
  },
  { symbol: "TSLA", name: "Tesla Inc.", price: "264.90", change: "+1.45%" },
];
type StockCard = {
  symbol: string;
  name: string;
  price: string;
  change: string;
};
const CompareSection = () => {
  const chartKeys: (keyof ComparisonStockData)[] = [
  "marketValueChart",
  "enterpriseValueChart",
  "peRatioChart",
  "dilutedEPSChart",
  "dividendYieldChart",
];
    const params = useParams<{ symbol: string}>()
    let symbol =     params.symbol !== "undefined"?params.symbol:'AAPL'
  const router = useRouter();
  const colors = ["#5470C6", "#91CC75", "#EE6666", "#73C0DE"]; // Add more if needed
  const [expandedRow, setExpandedRow] = React.useState<number | null>(null);
  const [stocks,setStocks] = React.useState<ComparisonDataTypes>([])

  const [selectedCurrency, setSelectedCurrency] = React.useState(
    topCurrencies[0].code
  );


const [stockCards, setStockCards] = React.useState<(StockCard | null)[]>([
  null,
  null,
  null,
  null,
]);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = React.useState<
    number | null
  >(null);
  const [filterLoading,setFilterLoading] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState("");
const [filteredStocks,setFilteredStocks] = React.useState<SearchedStock[]>([])

  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  


  const handleAddStockClick = (index: number) => {
    setSelectedCardIndex(index);
    setOpenModal(true);
    
  };
  const handleRemoveStock = (index: number) => {
    // const updated = [...stockCards];
    setStocks(prevStocks => prevStocks.filter(stock => stock.symbol !== stockCards[index]?.symbol));
    // updated[index] = null;

    // setStockCards(updated); 
 setStockCards((prevCards) => {
    const newCards = [...prevCards];
    newCards.splice(index, 1); // Remove the item at the index
    while (newCards.length < 4) {
      newCards.push(null); // Fill to length 4
    }
    return newCards;
  });
  };
   // const filteredStocks = stockList.filter(
  //   (s) =>
  //     s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     s.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const handleStockSelect = async(stock: SearchedStock) => 
    {
       setLoading((prev) =>
  prev.map((val, index) => (index === selectedCardIndex ? true : val))
);
          let response = await getcomparisonData(stock?.symbol);
        if(response.data.comparison_data.error == null){
            let s = [...stocks] 
          s.push(response.data['comparison_data'].result)
          setStocks(s)
          setStockCards((prev) => {
  const updated = [...prev];
  const stock = response.data['comparison_data'].result;
  updated[selectedCardIndex || 0] = {
    symbol: stock.symbol,
    name: stock.companyName,
    price: stock.price.toString(),
    change: `${stock.priceChange > 0 ? "+" : ""}${stock.priceChange.toFixed(2)}%`,
  };
  return updated;
});
        }
        else{
          toast("No Comparison Data Exist for This Stock")
        }
         setLoading((prev) =>
  prev.map((val, index) => (index === selectedCardIndex ? false : val))
);
setOpenModal(false);
 setSearchQuery("");
    
  };
  const formatKey = (key: string): string =>
    key
      .replace(/([a-z\d])([A-Z])/g, "$1 $2")  
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")  
      .replace(/^./, (char) => char.toUpperCase());
      const [loading,setLoading] = React.useState([true,false,false,false])
React.useEffect(()=>{
        const fetchChartData = async()=>{
      setLoading((prev) =>
  prev.map((val, index) => (index === 0 ? true : val))
);
          let response = await getcomparisonData(symbol);
          
          setStocks([response.data['comparison_data'].result])
          setStockCards((prev) => {
  const updated = [...prev];
  const stock = response.data['comparison_data'].result;
  updated[0] = {
    symbol: stock.symbol,
    name: stock.companyName,
    price: stock.price.toString(),
    change: `${stock.priceChange > 0 ? "+" : ""}${stock.priceChange.toFixed(2)}%`,
  };
  return updated;
});
         setLoading((prev) =>
  prev.map((val, index) => (index === 0 ? false : val))
);
          
        }
        fetchChartData()

      },[])
  return (
    <div className="w-full p-4 px-8 pt-0 bg-[#13131f] flex flex-col items-start text-white">
      <Button variant={"second"} className="mb-4" onClick={() => router.back()}>
        <ChevronLeft />
        Go Back
      </Button>
      <h1 className="font-bold">Compare Stocks</h1>
      <div className="flex flex-row items-center justify-between mt-2 w-full">
        {loading[0]==true ||  loading[1] == true ||  loading[2] == true ||  loading[3] == true ?
         
                          <SkeletonLoader className="h-8 w-20 bg-gray-800 rounded" />
         
         :
        <h2 className="font-extrabold text-3xl">
          
          {stockCards
    .filter((card) => card !== null) // remove nulls
    .map((card) => card!.symbol)     // get symbols
    .join(", ")} {" "}
        </h2> }
        <div className="">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="dropdownButton"
                className="flex flex-row items-center"
              >
                {`Currency in ${selectedCurrency}`} <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="overflow-y-scroll max-h-64 w-80 z-50 bg-white text-black p-4 rounded-lg shadow-lg">
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={selectedCurrency}
                onValueChange={setSelectedCurrency}
              >
                {topCurrencies.map((currency) => (
                  <DropdownMenuRadioItem
                    className={`${
                      selectedCurrency == currency.code
                        ? "bg-[var(--variant-4)] text-white"
                        : "   hover:border-[var(--variant-4)]"
                    } cursor-pointer text-gray-600 p-2 ring-0 hover:ring-0 rounded-lg transition-colors duration-500`}
                    key={currency.code}
                    value={currency.code}
                  >
                    {currency.name} ({currency.symbol})
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="w-full bg-gray-500 h-[0.5px] rounded-full my-4"></div>
      <div className="flex flex-row items-center justify-between w-full">
        <p className="text-sm w-[18%]">
          Compare up to three stocks to (AAPL) by adding the symbol or company
          name.
        </p>
        <div className="grid grid-cols-4 w-[80%] gap-x-4">
          {stockCards.map((stock, index) => (
            <div
              key={index}
              onClick={() => !stock && handleAddStockClick(index)}
              className={`relative ${loading[index]==true?'':'p-4'} col-span-1 cursor-pointer border border-gray-600 rounded-2xl h-[100px] w-full bg-[#1a1a2b] transition-shadow duration-300 hover:shadow-lg hover:shadow-gray-700 flex flex-col items-start justify-center`}
            >
              {/* X Icon for removing stock, except for the first card */}
              {loading[index]==true ?
                          <SkeletonLoader className="h-full w-full bg-gray-800 rounded" />
:
              <>{stock && index !== 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent opening modal
                    handleRemoveStock(index);
                  }}
                  className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-700"
                >
                  <X size={16} className="text-white" />
                </button>
              )}

              {stock ? (
                <div className="flex flex-col items-start w-full">
                  <h1 className="text-[var(--variant-4)] text-xl font-bold">
                    {stock.symbol}
                  </h1>
                  <h2>{stock.name}</h2>
                  <div className="flex flex-row items-center w-7/12 justify-between">
                    <p>{stock.price}</p>
                    <p
                      className={
                        stock.change.startsWith("+")
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {stock.change}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row items-center justify-center w-full">
                  <Plus className="text-white w-4 mr-2" />
                  <p className="font-bold">Add Stock</p>
                </div>
              )}</>}
            </div>
          ))}
        </div>
      </div>
      <Table className="mt-4">
        <TableHeader>
          <TableRow className="bg-none w-full">
            <TableHead className="pl-6 w-1/5 text-start">{`As of ${comparisionMockApi.asOfDate}`}</TableHead>
            {stockCards.map((s,index)=>(
              <TableHead className=" pr-6 w-1/5 text-center">
                {loading[index]==true?
                          <div className="flex flex-row item-center w-full justify-center">
                            <SkeletonLoader className="h-5 w-12 bg-gray-700 rounded" />
                          </div>
                :<>{s?s?.symbol:'--'}</>}
                </TableHead>
             
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {excludedKeys.map((key, index) => {
        
const hasChartData =
  chartKeys.includes(key as keyof ComparisonStockData) &&
  stocks.some(
    (company) =>
      Array.isArray(company[key as keyof ComparisonStockData])
  );
            return (
              <React.Fragment key={index}>
                {/* Main Row */}
                <TableRow>
                  <TableCell
                    className="font-medium text-start pl-6 cursor-pointer"
                    onClick={() => hasChartData && toggleRow(index)}
                  >
                    <div className="flex items-center gap-2">
                      
                      {displayNameMap[key] || formatKey(key)}
                      {hasChartData &&
                        (expandedRow === index ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        ))}
                    </div>
                  </TableCell>

                  {stocks.map((company: Company, i) => {
                    const data = company[key];
                    let displayValue = "--";
if (hasChartData) {
  // If the key matches a chart, show the corresponding "head" value
  const chartHeadMap: Record<string, keyof Company> = {
    marketValueChart: "marketValueHead",
    enterpriseValueChart: "enterpriseValueHead",
    peRatioChart: "priceToEarnings",
    dilutedEPSChart: "earningspersharediluted",
    dividendYieldChart: "dividendYield",
  };

  const headKey = chartHeadMap[key];
  if (headKey && headKey in company) {
    displayValue = String(company[headKey]);
  } else {
    displayValue = "--";
  }
} else {
  // Fallback to the existing logic
  if (typeof data === "string" || typeof data === "number") {
    displayValue = String(data);
  } else if (data && typeof data === "object") {
    if ("value" in data) {
      displayValue = String(data.value);
    } else if ("ratio" in data) {
      displayValue = String(data.ratio);
    } else if ("marketCap" in data) {
      displayValue = String(data.marketCap);
    }
  }
}
                    return (
                      <TableCell key={i} className="pr-6 text-center">
                                        {loading[i]==true?
                          <div className="flex flex-row item-center w-full justify-center">
                            <SkeletonLoader className="h-5 w-12 bg-gray-700 rounded" />
                          </div>:
                        displayValue}
                      </TableCell>
                    );
                  })}

                  {/* Empty columns */}
                  {Array.from({
                    length: 4 - stocks.length,
                  }).map((_, i) => (
                    <TableCell key={`empty-${i}`} className="pr-6 text-center">
                      --
                    </TableCell>
                  ))}
                </TableRow>

                {/* Expanded Chart Row */}
                {expandedRow === index && hasChartData && (
                  <TableRow className="pl-6 pr-6 pt-2 pb-4 hover:bg-none">
                    <TableCell
                      colSpan={5}
                      className="pl-6 pr-6 pt-2 pb-4 hover:bg-none"
                    >
                      <div className="w-full  p-4 shadow-sm">
                        {/* <ReactECharts
                          option={generateChartOption(key)}
                          style={{ height: 300 }}
                        /> */
                        }
                         
                      </div>
                      <div className="w-full p-4 shadow-sm">
  <ReactECharts
    option={{
      tooltip: { trigger: "axis" },
      legend: {
        top: 0,
        data: stocks.map((company) => company.symbol),
      },
      xAxis: {
        type: "category",
        data: (() => {
          // Extract x-axis dates from the first valid company data
          for (const company of stocks) {
            const chartData = company[key as keyof ComparisonStockData];
            if (Array.isArray(chartData)) {
              return chartData.map((item: any) => item.date);
            }
          }
          return [];
        })(),
        axisLabel: {
          formatter: (value: string) =>
            new Date(value).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
        },
      },
      yAxis: {
        type: "value",
        splitLine: { show: false },
        axisLabel: {
          formatter: (value: number) => {
            if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
            if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
            if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
            return value;
          },
        },
      },
      grid: {
        left: "0%",
        right: "0%",
        bottom: "3%",
        containLabel: true,
      },
      series: stocks
        .map((company, i) => {
          const chartData = company[key as keyof ComparisonStockData] as
            | { date: string; [k: string]: any }[]
            | undefined;

          if (!Array.isArray(chartData)) return null;

          const dataPoints = chartData.map((item: any) => {
           const raw = (() => {
  switch (key) {
    case "marketValueChart":
      return item.marketCap;
    case "enterpriseValueChart":
      return item.enterpriseValue;
    case "peRatioChart":
      return item.priceToEarnings;
    case "dilutedEPSChart":
      return item.dilutedepsDilutedEPS;
    case "dividendYieldChart":
      return item.forwardDividendYield;
    default:
      return "0";
  }
})();

            return [item.date, parseValueWithSuffix(raw)];
          });

          return {
            name: company.symbol,
            type: "line",
            data: dataPoints,
            lineStyle: {
              width: 2,
              color: colors[i % colors.length],
            },
            itemStyle: {
              color: colors[i % colors.length],
            },
            showSymbol: false,
          };
        })
        .filter(Boolean),
    }}
    style={{ height: 300 }}
  />
</div>


                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
          {/* {stocks.length>0 && <StockAccordion stocks={stocks}/>} */}
     {stocks.length>0 && <div className="w-full  py-4">
        <Accordion type="single" collapsible>
          {Object.keys(stocks[0]).map((key, index) => {
            const sectionData1: Company[] = stocks;
            let sectionData = sectionData1[0][key];
            // const isChartSection =
            //   typeof sectionData === "object" && sectionData?.chartData;
            if ((key== 'enterpriseValueHead' || key== 'marketValueHead' || key== 'dividendYield'|| key== 'priceToEarnings'|| key== 'earningspersharediluted')|| excludedKeys.includes(key) ||key.includes('Chart')  ) return null;
            const isObject = typeof sectionData === "object"; // Check if the data is an object (e.g., pricePerformance)
            return (
              <AccordionItem key={index} value={key} className="mt-4">
                <AccordionTrigger className="group cursor-pointer flex items-center justify-between  w-4/12 gap-2">
                  <span className="group-hover:text-[var(--variant-4)] font-bold text-2xl duration-300 transition-all">
                    {formatKey(key.replace(/([A-Z])/g, " $1").trim())}
                  </span>
                  
                  <ChevronDown className="group-hover:text-[var(--variant-4)] h-6 w-6 transition-transform duration-500 data-[state=open]:rotate-180" />
                </AccordionTrigger>
                <AccordionContent className="w-full overflow-hidden transition-all duration-500 ease-in-out">
                  {isObject ? (
                    <Table className="mt-4">
                      <TableHeader>
                        <TableRow className="bg-none w-full">
                          <TableHead className="pl-6 w-1/5 text-start">{`As of ${comparisionMockApi.asOfDate}`}</TableHead>
                           {stockCards.map((s,index)=>(
              <TableHead key={index} className=" pr-6 w-1/5 text-center">
                            {s?s.symbol:'--'}
                          </TableHead>
            ))}
                        
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.keys(sectionData).map((metricKey,index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium text-start pl-6">
                              {formatKey(metricKey)} 
                            </TableCell>
                            <TableCell className="pr-6 text-center">
                              {sectionData[metricKey]}
                            </TableCell>
                             <TableCell className="pr-6 text-center">
                              {stocks.length == 2
                                ? sectionData1[1][key][metricKey]
                                : "--"}
                            </TableCell>
                             <TableCell className="pr-6 text-center">
                              {stocks.length == 3
                                ? sectionData1[2][key][metricKey]
                                : "--"}
                            </TableCell>
                            <TableCell className="pr-6 text-center">
                              {stocks.length == 4
                                ? sectionData1[3][key][metricKey]
                                : "--"}
                            </TableCell> 
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="mt-4">{sectionData}</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
        <RadarCharts stocks={stocks.map(stock => {
  return Object.fromEntries(
    Object.entries(stock).filter(([key]) => ["roc",
            "grossProfitMarginIndicator",
            "dcf",
            "debtToEquityRatioIndicator",
            "peRatioIndicator",
            "epsIndicator",
            "beta",
            "wacc",
            "fcff",'symbol'].includes(key))
  ) 
})}/>
      </div>}
 
      {openModal && (
        <div className="fixed inset-0   bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1a1a2b] p-6 rounded-lg w-[400px]">
            <div className="w-full flex flex-row items-center justify-end">
              <button
                onClick={() => setOpenModal(false)}
                className="cursor-pointer p-2"
              >
                <X />
              </button>
            </div>
            <input
              type="text"
              placeholder="Search stocks..."
              value={searchQuery}
              onChange={async(e) => {
                
                setSearchQuery(e.target.value)
                setFilterLoading(true)
                    const searchedStock = await searchStock(e.target.value)
                    setFilterLoading(false)
                      setFilteredStocks(searchedStock.data!=null?searchedStock.data:[])
                    if (!e.target.value.trim()) {
                      setFilteredStocks([]);
                      return;
                    }
              }}
              className="w-full p-2 rounded bg-[#2a2a3d] border border-gray-500 text-white"
            />
            <div className="mt-4 max-h-[200px] overflow-y-auto">
              {filterLoading?
              <div className="flex flex-col items-center w-full py-4">
                <RoundLoader/>
              </div>:
              <>{filteredStocks.map((stock) => (
                <div
                  key={stock?.symbol}
                  onClick={() => handleStockSelect(stock)}
                  className="p-2 hover:bg-[#2d2d42] rounded cursor-pointer"
                >
                  <div className="font-bold">{stock.symbol}</div>
                  <div className="text-sm text-gray-400">{stock.name}</div>
                </div>
              ))}
              { filteredStocks.length === 0 && (
                <div className="text-gray-400 text-sm text-center">
                  No results found
                </div>
              )}</>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareSection;
