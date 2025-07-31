"use client";
import React from "react";
import CompanyDetails from "../Chart/CompanyDetailsSection";
import { appleData1d } from "@/global/constants";
import ChartComponent from "./ChartComponent";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Calendar1Icon, Check, ChevronDown, X } from "lucide-react";
import { Input } from "../ui/input";
import { poppins } from "@/fonts/fonts";
import { format, subDays, subMonths } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import FinancialRatiosChart from "./FinantialRatios";
import SingleStockRadarChart from "./SingleStockRadarChart";
import SubChart1 from "./SubChart1";
import SubChart2 from "./SubChart2";
import SubChart3 from "./SubChart3";
import SubChart4 from "./SubChart4";
import SubChart5 from "./SubChart5";
import HeatMap1 from "./HeatMap1";
import { getSpecificStockChart, getSpecificStockSummaryData } from "@/services/stock.services";
import { EmaChartPoint, MetaDataType } from "@/types/types";
import RoundLoader from "../Loader/RoundLoader";
import { useParams } from "next/navigation";
import CompanySummarySection from "../CompanySummarySection/CompanySummarySection";
import SkeletonLoader from "../Loader/SkeletonLoader";

const timeFrames = ["1min", "5min", "15min", "30min", "1hour", "4hour", "1day"];
export const technicalIndicators = [
  { name: "Simple Moving Average (SMA)", value: "sma" },
  { name: "Exponential Moving Average (EMA)", value: "ema" }, 
  { name: "Weighted Moving Average (WMA)", value: "wma" },
  { name: "Double Exponential Moving Average", value: "dema" },
  { name: "Triple Exponential Moving", value: "tema" }, 
  { name: "Relative Strength Index", value: "rsi" },
  { name: "Standard Deviation", value: "standarddeviation" },
  { name: "Williams", value: "williams" },
  { name: "Average Directional Index", value: "adx" },
];
const stocks = [
  { name: "Apple Inc.", symbol: "AAPL" },
  { name: "Microsoft Corporation", symbol: "MSFT" },
  { name: "Alphabet Inc.", symbol: "GOOGL" },
  { name: "Amazon.com Inc.", symbol: "AMZN" },
  { name: "Tesla Inc.", symbol: "TSLA" },
  { name: "Meta Platforms Inc.", symbol: "META" },
];
 
const ChartSection = () => {
  const params = useParams<{ symbol: string}>()
  let symbol = params.symbol
  const [technicalIndicator, setTechnicalIndicator] = React.useState(
    technicalIndicators[0].value
  );
  const [chartData,setChartData] = React.useState<EmaChartPoint[]>([])
  const [timeFrame, setTimeFrame] = React.useState(timeFrames[timeFrames.length-1]);

  const [selectedStocks, setSelectedStocks] = React.useState([
    stocks[0], // Apple selected by default
  ]);
  const [search, setSearch] = React.useState("");
  const [periodLength, setPeriodLength] = React.useState(0);

  const toggleStock = (stock: { name: string; symbol: string }) => {
    const alreadySelected = selectedStocks.find(
      (s) => s.symbol === stock.symbol
    );
    if (alreadySelected) {
    } else {
      setSelectedStocks([...selectedStocks, stock]);
    }
  };

  const filteredStocks = stocks.filter((stock) =>
    `${stock.name} ${stock.symbol}`.toLowerCase().includes(search.toLowerCase())
  );
  const [chartDataLoading,setChartDataLoading] = React.useState<boolean>(true)
const [toDate, setToDate] = React.useState<Date | undefined>(subDays(new Date(), 1));

// Set fromDate as one month before today
const [fromDate, setFromDate] = React.useState<Date | undefined>(
  subMonths(new Date(), 1)
);
  const predefinedRanges = [
    { label: "1 year", value: 1, type: "day" },
    { label: "6 months", value: 5, type: "day" },
    { label: "3 months", value: 3, type: "month" },
    { label: "1 month", value: 6, type: "month" },
    { label: "14 days", value: "ytd", type: "custom" },
    { label: "7 days", value: 12, type: "month" },
    { label: "1 day", value: 60, type: "month" },
  ];
  const handleQuickRange = async(
    label: string,
    value: number | string,
    type: string
  ) => {
    const now = new Date();
    let startDate: Date;

  switch (label) {
    case "1 year":
      startDate = subDays(now, 365);
      break;
    case "6 months":
      startDate = subMonths(now, 6);
      break;
    case "3 months":
      startDate = subMonths(now, 3);
      break;
    case "1 month":
      startDate = subMonths(now, 1);
      break;
    case "14 days":
      startDate = subDays(now, 14);
      break;
    case "7 days":
      startDate = subDays(now, 7);
      break;
    case "1 day":
      startDate = subDays(now, 1);
      break;
    default:
      startDate = new Date(2000, 0, 1); // fallback
      break;
  }
                      
                        setChartDataLoading(true)
                        let response = await getSpecificStockChart(symbol,timeFrame,technicalIndicator || 'sma',startDate,now);
                        setChartDataLoading(false)
                        setChartData(response.data['chart-data'].result)
           
    setFromDate(startDate);
    setToDate(now);
  };

  const formattedRange =
    fromDate && toDate
      ? `${format(fromDate, "MMM-dd-yyyy")} to ${format(toDate, "MMM-dd-yyyy")}`
      : "Select Range";
       const [metaData,setMetaData] = React.useState<MetaDataType | null>(null)
     
      React.useEffect(()=>{
        const fetchChartData = async()=>{
          setChartDataLoading(true)
          let response = await getSpecificStockChart(symbol,timeFrame || '1day',technicalIndicator,fromDate,toDate);
          let response2 = await getSpecificStockSummaryData(symbol);
          setMetaData(response2.data)
          setChartData(response.data['chart-data'].result)
          setChartDataLoading(false)
          
        }
        fetchChartData()

      },[fromDate,toDate])
  return (
    <div
      className={`w-full flex flex-row items-start justify-between  px-8 ${poppins.className}`}
    >
      <div className="w-9/12 flex flex-col items-center justify-start">
        <div className="w-full flex-col items-start text-white">
          <CompanyDetails loading={chartDataLoading} metaData={metaData}/>
          {chartDataLoading ?  (
<>  <div className="flex flex-row item-center justify-start w-full mt-4 h-[35px] w-7/12">
    <SkeletonLoader className=" bg-gray-700 h-full w-2/12" />
  <SkeletonLoader className="ml-4 bg-gray-700 h-full w-1/12" />
  <SkeletonLoader className="ml-4 bg-gray-700 h-full w-3/12" />
  <SkeletonLoader className="ml-4 bg-gray-700 h-full w-2/12" />
  </div>
   <div className="flex flex-col item-start justify-start w-full mt-1 h-auto w-7/12">
    <SkeletonLoader className=" bg-gray-700 h-4 w-2/12 mt-1" /> 
    <SkeletonLoader className=" bg-gray-700 h-[40px] w-2/12 mt-2" /> 
  </div></>
):  
          <>
          
          <div className="flex flex-row items-center w-full my-2">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="dropdownButton"
                  className="flex items-center gap-2"
                >
                  {"Select Stocks"}
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="overflow-y-auto max-h-72 w-80 z-50 bg-white text-black p-3 rounded-lg shadow-lg"
                sideOffset={5}
              >
                <Input
                  placeholder="Search stocks..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="mb-2"
                />
                {selectedStocks.length > 0 && (
                  <div className=" text-sm text-black my-2">
                    <h2 className="mb-2">Selected Stocks:</h2>{" "}
                    <div className="grid grid-cols-2 gap-2">
                      {selectedStocks.map((s) => (
                        <button
                          key={s.symbol}
                          onClick={() => {
                            if (selectedStocks.length != 1) {
                              setSelectedStocks(
                                selectedStocks.filter(
                                  (st) => st.symbol !== s.symbol
                                )
                              );
                            }
                          }}
                          className="cursor-pointer text-xs text-white flex flex-row items-center justify-between p-2 rounded-md bg-[var(--variant-2)] texxt-white"
                        >
                          {s.symbol}
                          <X className="ml-1 h-4 w-4" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              
                <div className="space-y-1 max-h-48 ">
                  {filteredStocks.length === 0 ? (
                    <p className="text-sm text-gray-500 px-2">
                      No results found
                    </p>
                  ) : (
                    filteredStocks.map((stock) => {
                      const isSelected = selectedStocks.some(
                        (s) => s.symbol === stock.symbol
                      );

                      return (
                        <div
                          key={stock.symbol}
                          onClick={() => toggleStock(stock)}
                          className={`px-3 py-2 text-sm flex justify-between items-center rounded-lg cursor-pointer transition-colors ${"hover:bg-gray-100"}`}
                        >
                          {stock.name} ({stock.symbol})
                          {isSelected && (
                            <Check className="h-4 w-4 text-white ml-2" />
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
        
            <div className="ml-2">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="dropdownButton">
                    {technicalIndicator}
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="overflow-y-scroll max-h-64 w-80 z-50 bg-white text-black p-4 rounded-lg shadow-lg">
                  <DropdownMenuLabel className="mb-1">
                    Technical Indicators
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="  border-gray-600   border-[1px] mb-1 " />
                  <DropdownMenuRadioGroup
                    className=" "
                    value={
                      technicalIndicators.find(
                        (ti) => ti.value === technicalIndicator
                      )?.value ?? ""
                    }
                    onValueChange={async(val) => {
                      const selected = technicalIndicators.find(
                        (ti) => ti.value === val
                      );
                      if (selected) {
                        setTechnicalIndicator(selected.value)};
                        console.log(selected,"selected")
                        setChartDataLoading(true)
                        let response = await getSpecificStockChart('AAPL','1day',selected?.value || 'sma',fromDate,toDate);
                        setChartDataLoading(false)
                        setChartData(response.data['chart-data'].result)
           
                    }}
                  >
                    {technicalIndicators.map((tI, index) => (
                      <DropdownMenuRadioItem
                        className={`${technicalIndicator == tI.name
                            ? "bg-[var(--variant-4)] text-white"
                            : " text-gray-600   hover:border-[var(--variant-4)]"
                          } cursor-pointer p-2 ring-0 hover:ring-0 rounded-lg transition-colors duration-500`}
                        key={index}
                        value={tI.value}
                      >
                        {tI.name}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="ml-2">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="dropdownButton">
                    {timeFrame}
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="overflow-y-scroll max-h-64 w-80 z-50 bg-white text-black p-4 rounded-lg shadow-lg">
                  <DropdownMenuLabel className="mb-1">
                    Time Ranges
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="  border-gray-600   border-[1px] mb-1 " />
                  <DropdownMenuRadioGroup
                    className=" "
                    value={timeFrames.find((tf) => tf === timeFrame) ?? ""}
                    onValueChange={async(val) => {
                      const selected = timeFrames.find((tf) => tf === val);
                      if (selected) setTimeFrame(selected);
                      
                        console.log(selected,"selected")
                        setChartDataLoading(true)
                        let response = await getSpecificStockChart(symbol,selected || "1day",technicalIndicator || 'sma',fromDate,toDate);
                        setChartDataLoading(false)
                        setChartData(response.data['chart-data'].result)
           
                    }}
                  >
                    {timeFrames.map((tF, index) => (
                      <DropdownMenuRadioItem
                        className={`list-none ${timeFrame == tF
                            ? "bg-[var(--variant-4)] text-white"
                            : "  text-gray-600  hover:border-[var(--variant-4)]"
                          } cursor-pointer p-2 ring-0 hover:ring-0 rounded-lg transition-colors duration-500`}
                        key={index}
                        value={tF}
                      >
                        {tF}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="ml-2">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="dropdownButton">
                    {formattedRange}
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  style={{ backgroundColor: "white" }}
                  className="w-[270px] p-4 "
                >
                  <DropdownMenuLabel className="mb-2">
                    Quick Ranges
                  </DropdownMenuLabel>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {predefinedRanges.map((r) => (
                      <Button
                        key={r.label}
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() =>
                          handleQuickRange(r.label, r.value, r.type)
                        }
                      >
                        {r.label}
                      </Button>
                    ))}
                  </div>
                  <DropdownMenuSeparator />
                  <div className="  flex flex-col items-center justify-between mt-4  ">
                    <div className="w-full">
                      <p className="text-sm font-medium mb-1">From</p>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] justify-start text-left font-normal",
                              !fromDate && "text-muted-foreground"
                            )}
                          >
                            <Calendar1Icon />
                            {fromDate ? (
                              format(fromDate, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            className="bg-white"
                            mode="single"
                            selected={fromDate}
                            onSelect={setFromDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="w-full">
                      <p className="text-sm font-medium mb-1">To</p>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] justify-start text-left font-normal",
                              !toDate && "text-muted-foreground"
                            )}
                          >
                            <Calendar1Icon />
                            {toDate ? (
                              format(toDate, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="center">
                          <Calendar
                            className="bg-white w-full "
                            mode="single"
                            selected={toDate}
                            onSelect={setToDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex flex-row items-center w-full mt-2">
            <div className="flex flex-col items-start w-3/12">
              <p>Period Length</p>
              <Input
                style={{
                  borderColor: "#99a1af",
                  borderRadius: "10px",
                  marginTop: "4px",
                }}
                className=" rounded-full w-full  "
                placeholder="Specify Period Length"
                value={periodLength}
                onChange={(e) => setPeriodLength(Number(e.target.value))}
              />
            </div>
          </div></>}
            {chartDataLoading? 
    <SkeletonLoader className=" bg-gray-700 h-[75vh] w-full mt-1" />:
              <>
              {chartData.length>0 ? <ChartComponent technicalIndicator={technicalIndicator} data={chartData}/> :<div className="w-full flex flex-col items-center justify-center bg-[#13131f] h-[75vh]"><p className="text-red-400">Error Showing Chart Data</p></div>}
              </>
              }
        {chartDataLoading? 
    <SkeletonLoader className=" bg-gray-900 h-[400px] w-full mt-8 rounded-md" />:
          <SingleStockRadarChart symbol={symbol}/>
    
          }
         <FinancialRatiosChart symbol={symbol}/> 
        </div>
      </div>
      <CompanySummarySection metaData={metaData} loading={chartDataLoading}/>
    </div>
  );
};

export default ChartSection;
