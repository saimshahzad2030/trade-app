"use client";
import { ChevronDown, ChevronLeft, ChevronUp, Plus, X } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import ReactECharts from "echarts-for-react";
type Company = {
  symbol: string;
  name: string;
  [key: string]: any; // Add this line to allow dynamic keys
};
type CompanyMetricKey =
  | "pricePerformance"
  | "margin"
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
import { useRouter } from "next/navigation";
import RadarCharts from "./RadarCharts";
const excludedKeys = [
  "name",
  "symbol",
  "sector",
  "industry",
  "ceo",
  "marketValue",
  "enterpriseValue",
  "priceToEarnings",
  "dilutedEPS",
  "forwardDividendYield",
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
const CompareSection = () => {
  const router = useRouter();
  const colors = ["#5470C6", "#91CC75", "#EE6666", "#73C0DE"]; // Add more if needed
  const [expandedRow, setExpandedRow] = React.useState<number | null>(null);

  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const generateChartOption = (key: string) => {
    const series = comparisionMockApi.companies
      .map((company, i) => {
        const typedKey = key as CompanyMetricKey;
        const data = company[typedKey]?.chartData;
        if (!data) return null;

        return {
          name: company.name || `Company ${i + 1}`,
          type: "line",
          step: "middle",
          data: data.map(
            (item: {
              date: Date;
              marketCap?: number;
              value?: number;
              ratio?: number;
            }) => [item.date, item?.marketCap || item?.value || item?.ratio]
          ),
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
      .filter(Boolean); // remove nulls

    const dates =
      series.length && series[0] !== null
        ? (series[0].data as [Date, number][]).map((item) => item[0])
        : [];

    return {
      tooltip: {
        trigger: "axis",
      },
      legend: {
        top: 0,
      },
      xAxis: {
        type: "category",
        data: dates,
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value}",
        },
        splitLine: {
          lineStyle: {
            type: "dotted", // Makes it dotted
            color: "#ccc", // Light gray color
            width: 0.4, // Lightweight
          },
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },

      series,
    };
  };
  const [selectedCurrency, setSelectedCurrency] = React.useState(
    topCurrencies[0].code
  );
  const [stockCards, setStockCards] = React.useState([
    { symbol: "AAPL", name: "Apple Inc.", price: "196.14", change: "+1.36%" },
    null,
    null,
    null,
  ]);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = React.useState<
    number | null
  >(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const handleAddStockClick = (index: number) => {
    setSelectedCardIndex(index);
    setOpenModal(true);
  };
  const handleRemoveStock = (index: number) => {
    const updated = [...stockCards];
    updated[index] = null;
    setStockCards(updated);
  };

  const filteredStocks = stockList.filter(
    (s) =>
      s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStockSelect = (stock: any) => {
    const updatedCards = [...stockCards];
    if (selectedCardIndex !== null) {
      updatedCards[selectedCardIndex] = stock;
      setStockCards(updatedCards);
      setOpenModal(false);
      setSearchQuery("");
    }
  };
  const formatKey = (key: string): string =>
    key
      .replace(/([a-z\d])([A-Z])/g, "$1 $2") // Space before caps that follow lowercase/digits
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2") // Fix acronyms followed by capitalized words
      .replace(/^./, (char) => char.toUpperCase());

  return (
    <div className="w-full p-4 px-8 pt-0 bg-[#13131f] flex flex-col items-start text-white">
      <Button variant={"second"} className="mb-4" onClick={() => router.back()}>
        <ChevronLeft />
        Go Back
      </Button>
      <h1 className="font-bold">Compare Stocks</h1>
      <div className="flex flex-row items-center justify-between mt-2 w-full">
        <h2 className="font-extrabold text-3xl">AAPL, SONY, 2498.TW</h2>
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
              className="relative p-4 col-span-1 cursor-pointer border border-gray-600 rounded-2xl h-[100px] w-full bg-[#1a1a2b] transition-shadow duration-300 hover:shadow-lg hover:shadow-gray-700 flex flex-col items-start justify-center"
            >
              {/* X Icon for removing stock, except for the first card */}
              {stock && index !== 0 && (
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
              )}
            </div>
          ))}
        </div>
      </div>
      <Table className="mt-4">
        <TableHeader>
          <TableRow className="bg-none w-full">
            <TableHead className="pl-6 w-1/5 text-start">{`As of ${comparisionMockApi.asOfDate}`}</TableHead>
            <TableHead className=" pr-6 w-1/5 text-center">AAPL</TableHead>
            <TableHead className="pr-6 w-1/5 text-center">XIACY</TableHead>
            <TableHead className="pr-6 w-1/5 text-center">--</TableHead>
            <TableHead className="pr-6 w-1/5 text-center">--</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {excludedKeys.map((key, index) => {
            const hasChartData = comparisionMockApi.companies.some(
              (company: Company) => company[key]?.chartData
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
                      {hasChartData &&
                        (expandedRow === index ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        ))}
                      {formatKey(key)}
                    </div>
                  </TableCell>

                  {comparisionMockApi.companies.map((company: Company, i) => {
                    const data = company[key];
                    let displayValue = "--";

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

                    return (
                      <TableCell key={i} className="pr-6 text-center">
                        {displayValue}
                      </TableCell>
                    );
                  })}

                  {/* Empty columns */}
                  {Array.from({
                    length: 4 - comparisionMockApi.companies.length,
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
                        <ReactECharts
                          option={generateChartOption(key)}
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
      <div className="w-full  py-4">
        <Accordion type="single" collapsible>
          {Object.keys(comparisionMockApi.companies[0]).map((key, index) => {
            const sectionData1: Company[] = comparisionMockApi.companies;
            let sectionData = sectionData1[0][key];
            const isChartSection =
              typeof sectionData === "object" && sectionData?.chartData;
            if (excludedKeys.includes(key) || isChartSection) return null;
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
                          <TableHead className=" pr-6 w-1/5 text-center">
                            AAPL
                          </TableHead>
                          <TableHead className="pr-6 w-1/5 text-center">
                            XIACY
                          </TableHead>
                          <TableHead className="pr-6 w-1/5 text-center">
                            --
                          </TableHead>
                          <TableHead className="pr-6 w-1/5 text-center">
                            --
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.keys(sectionData).map((metricKey) => (
                          <TableRow key={metricKey}>
                            <TableCell className="font-medium text-start pl-6">
                              {metricKey}
                            </TableCell>
                            <TableCell className="pr-6 text-center">
                              {sectionData[metricKey]}
                            </TableCell>
                            <TableCell className="pr-6 text-center">
                              {comparisionMockApi.companies.length == 2
                                ? sectionData1[1][key][metricKey]
                                : "--"}
                            </TableCell>
                            <TableCell className="pr-6 text-center">
                              {comparisionMockApi.companies.length == 3
                                ? sectionData1[2][key][metricKey]
                                : "--"}
                            </TableCell>
                            <TableCell className="pr-6 text-center">
                              {comparisionMockApi.companies.length == 4
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
        <RadarCharts/>
      </div>

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
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 rounded bg-[#2a2a3d] border border-gray-500 text-white"
            />
            <div className="mt-4 max-h-[200px] overflow-y-auto">
              {filteredStocks.map((stock) => (
                <div
                  key={stock.symbol}
                  onClick={() => handleStockSelect(stock)}
                  className="p-2 hover:bg-[#2d2d42] rounded cursor-pointer"
                >
                  <div className="font-bold">{stock.symbol}</div>
                  <div className="text-sm text-gray-400">{stock.name}</div>
                </div>
              ))}
              {filteredStocks.length === 0 && (
                <div className="text-gray-400 text-sm text-center">
                  No results found
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareSection;
