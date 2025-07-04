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

const timeFrames = ["1min", "5min", "15min", "30min", "1hour", "4hour", "1day"];
export const technicalIndicators = [
  { name: "Simple Moving Average (SMA)", value: "sma" },
  { name: "Exponential Moving Average (EMA)", value: "ema" },
  { name: "Average", value: "average" },
  { name: "Weighted Moving Average (WMA)", value: "wma" },
  { name: "Double Exponential", value: "double_exponential" },
  { name: "Moving Average", value: "moving_average" },
  { name: "Triple Exponential Moving", value: "triple_exponential_moving" },
  { name: "Average", value: "average_2" },
  { name: "Relative Strength Index", value: "rsi" },
  { name: "Standard Deviation", value: "standard_deviation" },
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
  const [technicalIndicator, setTechnicalIndicator] = React.useState(
    technicalIndicators[0].name
  );
  const [timeFrame, setTimeFrame] = React.useState(timeFrames[0]);
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

  const [fromDate, setFromDate] = React.useState<Date | undefined>(new Date());
  const [toDate, setToDate] = React.useState<Date | undefined>(new Date());

  const predefinedRanges = [
    { label: "1d", value: 1, type: "day" },
    { label: "5d", value: 5, type: "day" },
    { label: "3m", value: 3, type: "month" },
    { label: "6m", value: 6, type: "month" },
    { label: "YTD", value: "ytd", type: "custom" },
    { label: "1y", value: 12, type: "month" },
    { label: "5y", value: 60, type: "month" },
    { label: "All", value: "all", type: "custom" },
  ];
  const handleQuickRange = (
    label: string,
    value: number | string,
    type: string
  ) => {
    const now = new Date();
    let startDate: Date;

    if (type === "day") {
      startDate = subDays(now, Number(value));
    } else if (type === "month") {
      startDate = subMonths(now, Number(value));
    } else if (label === "YTD") {
      startDate = new Date(now.getFullYear(), 0, 1);
    } else {
      startDate = new Date(2000, 0, 1); // "All" or fallback
    }

    setFromDate(startDate);
    setToDate(now);
  };

  const formattedRange =
    fromDate && toDate
      ? `${format(fromDate, "MMM-dd-yyyy")} to ${format(toDate, "MMM-dd-yyyy")}`
      : "Select Range";
  return (
    <div
      className={`w-full flex flex-row items-start justify-between  px-8 ${poppins.className}`}
    >
      <div className="w-9/12 flex flex-col items-center justify-start">
        <div className="w-full flex-col items-start text-white">
          <CompanyDetails />
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
                      )?.name ?? ""
                    }
                    onValueChange={(val) => {
                      const selected = technicalIndicators.find(
                        (ti) => ti.value === val
                      );
                      if (selected) setTechnicalIndicator(selected.name);
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
                    onValueChange={(val) => {
                      const selected = timeFrames.find((tf) => tf === val);
                      if (selected) setTimeFrame(selected);
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
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {predefinedRanges.map((r) => (
                      <Button
                        key={r.label}
                        variant="outline"
                        size="sm"
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
          </div>
          <ChartComponent />
          <div className="w-full grid grid-cols-1 gap-4  my-12">
            <SubChart1 />
            <SubChart2 />
            <SubChart3 />
            <SubChart4 />
            <SubChart5 />
                  <HeatMap1/>
          </div>
          <SingleStockRadarChart />
          <FinancialRatiosChart />
        </div>
      </div>
      <div className="w-3/12 flex flex-col items-center p-4 text-white">   
      <div className="w-full flex flex-col items-center p-4 text-white">
        <div className=" pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Previous close</p>
          <p>{appleData1d.chart.result[0].meta.previousClose}</p>
        </div>

        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Open</p>
          <p>{appleData1d.chart.result[0].meta.open}</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Bid</p>
          <p>null</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Ask</p>
          <p>null</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Day's Range</p>
          <p>{appleData1d.chart.result[0].meta.dayRange}</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>52 Week Range</p>
          <p>{appleData1d.chart.result[0].meta.week52Range}</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Volume</p>
          <p>{appleData1d.chart.result[0].meta.volume}</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Avg. Volume</p>
          <p>{appleData1d.chart.result[0].meta.avgVolume}</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Market Cap (intraday)</p>
          <p>{appleData1d.chart.result[0].meta.marketCap}</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Beta (5Y Monthly)</p>
          <p>null</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>PE Ratio (TTM)</p>
          <p>{appleData1d.chart.result[0].meta.peRatio}</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>EPS (TTM)</p>
          <p>{appleData1d.chart.result[0].meta.eps}</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Earnings Date</p>
          <p>{appleData1d.chart.result[0].meta.earningsDate}</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Forward Dividend & Yield</p>
          <p>null</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Ex-Dividend Date</p>
          <p>null</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>1y Target Est</p>
          <p>null</p>
        </div>
      </div>

      </div>
    </div>
  );
};

export default ChartSection;
