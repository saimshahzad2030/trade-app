"use client";
import { ChevronDown, ChevronLeft, FileIcon, Plus, X } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
const ranges = ["summary", "holdings", "fundamentals"] as const;
type StockOption = {
  symbol: string;
  name: string;
  exchange: string;
  type: "Equity" | "ETF" | "Crypto" | "Futures";
};
const stocks: StockOption[] = [
  { symbol: "AAPL", name: "Apple Inc.", exchange: "NASDAQ", type: "Equity" },
  { symbol: "TSLA", name: "Tesla Inc.", exchange: "NASDAQ", type: "Equity" },
  { symbol: "BTC-USD", name: "Bitcoin", exchange: "CRYPTO", type: "Crypto" },
  { symbol: "ETH-USD", name: "Ethereum", exchange: "CRYPTO", type: "Crypto" },
  {
    symbol: "SPY",
    name: "SPDR S&P 500 ETF",
    exchange: "NYSEARCA",
    type: "ETF",
  },
  {
    symbol: "ES=F",
    name: "E-mini S&P 500 Futures",
    exchange: "CME",
    type: "Futures",
  },
];
const stockFundamentalsMock: StockFundamentals[] = [
  {
    symbol: "AAPL",
    lastPrice: 175.34,
    marketCap: "2.9T",
    avgVolume3M: "58.4M",
    epsEstNextYr: 6.45,
    forwardPE: 27.2,
    divPaymentDate: "2025-05-10",
    exDivDate: "2025-05-03",
    divPerShare: 0.24,
    fwdAnnDivRate: 0.96,
    fwdAnnDivYield: 0.55,
    trlAnnDivRate: 0.92,
    trlAnnDivYield: 0.52,
    priceToBook: 48.1,
  },
  {
    symbol: "MSFT",
    lastPrice: 325.5,
    marketCap: "2.6T",
    avgVolume3M: "31.2M",
    epsEstNextYr: 9.12,
    forwardPE: 35.7,
    divPaymentDate: "2025-06-12",
    exDivDate: "2025-06-05",
    divPerShare: 0.68,
    fwdAnnDivRate: 2.72,
    fwdAnnDivYield: 0.84,
    trlAnnDivRate: 2.65,
    trlAnnDivYield: 0.82,
    priceToBook: 14.2,
  },
  {
    symbol: "TSLA",
    lastPrice: 194.82,
    marketCap: "620B",
    avgVolume3M: "120.5M",
    epsEstNextYr: 3.82,
    forwardPE: 51.0,
    divPaymentDate: "-",
    exDivDate: "-",
    divPerShare: 0,
    fwdAnnDivRate: 0,
    fwdAnnDivYield: 0,
    trlAnnDivRate: 0,
    trlAnnDivYield: 0,
    priceToBook: 9.3,
  },
];

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { PortfolioData, StockFundamentals, WatchList } from "@/types/types";
import WatchlistTableChart from "./WatchlistTableChart";
import { Input } from "../ui/input";
import HoldingsTable from "./HoldingsTable";
import { useRouter } from "next/navigation";
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
const PortfolioSingle = ({ portfolio }: { portfolio: PortfolioData }) => {
  const router = useRouter();
  const [addNewSymbol, setAddNewSymbol] = React.useState(false);
  const stockData: WatchList[] = [
    {
      symbol: "AAPL",
      lastPrice: 145.3,
      changePercent: 1.25,
      change: 1.8,
      currency: "USD",
      marketTime: "2025-04-29T16:00:00Z",
      volume: 74210000,
      avgVolume: 75000000,
      dayRange: "142.50 - 146.00",
      yearRange: "120.00 - 180.00",
      dayChart: "https://example.com/aapl-day-chart.png",
      marketCap: 2.42e12, // 2.42 Trillion USD
    },
    {
      symbol: "GOOGL",
      lastPrice: 2745.6,
      changePercent: -0.58,
      change: -16.0,
      currency: "USD",
      marketTime: "2025-04-29T16:00:00Z",
      volume: 1054500,
      avgVolume: 1200000,
      dayRange: "2700.00 - 2750.00",
      yearRange: "2200.00 - 3000.00",
      dayChart: "https://example.com/googl-day-chart.png",
      marketCap: 1.83e12, // 1.83 Trillion USD
    },
    // More data entries can go here
  ];
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedStocks, setSelectedStocks] = React.useState<StockOption[]>([]);

  const filteredStocks = stocks.filter(
    (stock) =>
      `${stock.symbol} ${stock.name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      !selectedStocks.some((s) => s.symbol === stock.symbol)
  );
  const addStock = (stock: StockOption) => {
    setSelectedStocks((prev) => [...prev, stock]);
    setSearchTerm("");
  };

  const removeStock = (symbol: string) => {
    setSelectedStocks((prev) => prev.filter((s) => s.symbol !== symbol));
  };
  const [selectedTab, setSelectedTab] = React.useState<
    "summary" | "holdings" | "fundamentals"
  >("summary");
  const formatKey = (key: string): string =>
    key
      .replace(/([a-z\d])([A-Z])/g, "$1 $2") // Space before caps that follow lowercase/digits
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2") // Fix acronyms followed by capitalized words
      .replace(/^./, (char) => char.toUpperCase());

  const [file, setFile] = React.useState<File | null>(null); // For file input
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      // Check if the file is an Excel file
      if (
        selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        selectedFile.type === "application/vnd.ms-excel"
      ) {
        setFile(selectedFile);
      } else {
        alert("Please select a valid Excel file.");
      }
    }
  };
  const [tabSelected, setTabSelected] = React.useState<string | null>(null);

  const [portfolioName, setPortfolioName] = React.useState<string>("");

  const [addPortfolio, setAddPortfolio] = React.useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = React.useState(
    topCurrencies[0].code
  );

  return (
    <div className="flex flex-col items-start w-full px-8 pt-40 text-white">
      <div className="flex flex-row items-center justify-between   w-full mt-4">
        <Link
          href={"/portfolio/my-portfolios"}
          className="flex flex-row items-center"
        >
          <ChevronLeft />
          Portfolios
        </Link>
        <button
          onClick={() => {
            setAddPortfolio(true);
          }}
          className="  cursor-pointer text-xs px-2 py-1 text-white border border-white rounded-md flex flex-row items-center"
        >
          <Plus className="mr-1 w-3" />
          Add Portfolio
        </button>
      </div>
      <div className="flex flex-row items-center w-full mt-2 mb-1">
        {ranges.map((range) => (
          <Button
            key={range}
            variant="graphTab2"
            onClick={() => {
              setSelectedTab(range);
              // setIncomeStatements(financialStatement[range]);
            }}
            className={`mr-1  text-[var(--variant-4)] border hover:border-[var(--variant-3)] ${
              selectedTab === range
                ? "  bg-[var(--variant-2)]/50   border-[var(--variant-3)]    "
                : "text-[var(--variant-4)] border-l-transparent border-b-transparent border-r-transparent border-t-transparent hover:border-[var(--variant-3)] "
            }  `}
          >
            {formatKey(range)}
          </Button>
        ))}
      </div>
      <div className="flex flex-row items-center justify-start mb-2 mt-2">
        <button
          onClick={() => setAddNewSymbol(true)}
          className="cursor-pointer text-sm px-2 py-1 text-white border border-white rounded-md flex flex-row items-center"
        >
          <Plus className="mr-1 w-4" />
          Add Symbol
        </button>
      </div>
      {selectedTab === "summary" && (
        <Table className="text-xs">
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Last Price</TableHead>
              <TableHead>Change %</TableHead>
              <TableHead>Change</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead>Market Time</TableHead>
              <TableHead>Volume</TableHead>
              <TableHead>Avg. Vol</TableHead>
              <TableHead>Day Range</TableHead>
              <TableHead>yr. range</TableHead>
              <TableHead>Day Chart</TableHead>
              <TableHead>Market Cap</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockData.map((stock) => (
              <TableRow key={stock.symbol}>
                <TableCell className="text-xs font-bold">
                  {stock.symbol}
                </TableCell>
                <TableCell>{stock.lastPrice}</TableCell>
                <TableCell>{stock.changePercent}%</TableCell>
                <TableCell>{stock.change}</TableCell>
                <TableCell>{stock.currency}</TableCell>
                <TableCell>
                  {new Date(stock.marketTime).toLocaleString()}
                </TableCell>
                <TableCell>{stock.volume}</TableCell>
                <TableCell>{stock.avgVolume}</TableCell>
                <TableCell>{stock.dayRange}</TableCell>
                <TableCell>{stock.yearRange}</TableCell>
                <TableCell>
                  <WatchlistTableChart />
                </TableCell>
                <TableCell>{stock.marketCap.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {selectedTab === "holdings" && <HoldingsTable />}
      {selectedTab === "fundamentals" && (
        <Table className="text-xs">
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Last Price</TableHead>
              <TableHead>Market Cap</TableHead>
              <TableHead>Avg Vol (3M)</TableHead>
              <TableHead>EPS Est. Next Yr</TableHead>
              <TableHead>Forward P/E</TableHead>
              <TableHead>Div Payment Date</TableHead>
              <TableHead>Ex-Div Date</TableHead>
              <TableHead>Div/Share</TableHead>
              <TableHead>Fwd Ann Div Rate</TableHead>
              <TableHead>Fwd Ann Div Yield</TableHead>
              <TableHead>Trl Ann Div Rate</TableHead>
              <TableHead>Trl Ann Div Yield</TableHead>
              <TableHead>Price / Book</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockFundamentalsMock.map((stock) => (
              <TableRow key={stock.symbol}>
                <TableCell className="text-xs font-bold">
                  <Link href={`/stock/${stock.symbol}`}>{stock.symbol}</Link>
                </TableCell>
                <TableCell>{stock.lastPrice}</TableCell>
                <TableCell>{stock.marketCap}</TableCell>
                <TableCell>{stock.avgVolume3M}</TableCell>
                <TableCell>{stock.epsEstNextYr}</TableCell>
                <TableCell>{stock.forwardPE}</TableCell>
                <TableCell>{stock.divPaymentDate}</TableCell>
                <TableCell>{stock.exDivDate}</TableCell>
                <TableCell>{stock.divPerShare}</TableCell>
                <TableCell>{stock.fwdAnnDivRate}</TableCell>
                <TableCell>{stock.fwdAnnDivYield}</TableCell>
                <TableCell>{stock.trlAnnDivRate}</TableCell>
                <TableCell>{stock.trlAnnDivYield}</TableCell>
                <TableCell>{stock.priceToBook}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {addNewSymbol && (
        <div className="fixed inset-0 z-50 bg-black/25 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded-md max-w-lg w-full space-y-4 text-gray-800">
            <h2 className="text-2xl font-semibold text-center mb-1">
              Add New Symbol
            </h2>
            <p className="text-center">Add to watchlist</p>

            <div className="relative">
              <Input
                type="text"
                placeholder="Search Symbol or Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md"
              />
              {searchTerm && filteredStocks.length > 0 && (
                <ul className="  z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-40 overflow-y-auto">
                  {filteredStocks.map((stock) => (
                    <li
                      key={stock.symbol}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => addStock(stock)}
                    >
                      <div className="flex justify-between">
                        <span>
                          {stock.symbol} - {stock.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {stock.exchange} ({stock.type})
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {selectedStocks.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedStocks.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    {stock.symbol}
                    <button
                      onClick={() => removeStock(stock.symbol)}
                      className="ml-2 text-gray-600 hover:text-red-500"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-center gap-4 mt-4">
              <button
                className={`bg-[var(--variant-4)] text-white px-6 py-2 rounded-md ${
                  selectedStocks.length != 0 && "cursor-pointer"
                }`}
                disabled={selectedStocks.length === 0}
                onClick={() => {
                  console.log("Proceed with:", selectedStocks);
                  // Add to portfolio logic here...
                  setAddNewSymbol(false);
                }}
              >
                Proceed
              </button>
              <button
                onClick={() => {
                  setSelectedStocks([]);
                  setAddNewSymbol(false);
                }}
                className="bg-gray-500 text-white px-6 py-2 rounded-md cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {addPortfolio && (
        <div className="fixed inset-0 z-50 bg-black/25 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-[#13131f] p-6 rounded-md max-w-lg flex flex-col items-center w-full space-y-4 text-gray-800">
            <div className="flex flex-row items-center justify-end w-full  ">
              <button
                onClick={() => {
                  setAddPortfolio(false);
                  setTabSelected(null);
                }}
                className="text-gray-500  cursor-pointer"
              >
                <X className="rotate-180" />
              </button>
            </div>
            <h2 className="text-2xl font-semibold text-center text-white">
              Choose an Option Securely
            </h2>
            <p className="text-xs text-center text-gray-500">
              creating a portfolio with Yahoo Finance lets you evaluate your
              holdings all in one place. Fewer tabs to open, more opportunities
              to take your investing to the next level.
            </p>
            {/* {!tabSelected && (
              <>
                <div
                  onClick={() => {
                    setTabSelected("import");
                  }}
                  className="transition-colors duration-500 bg-none text-white border border-white hover:text-gray-800 h-auto hover:bg-white flex flex-col items-start justify-center w-10/12  rounded-md cursor-pointer p-6"
                >
                  <h2 className="font-bold text-sm text-start uppercase">
                    Import a csv
                  </h2>
                  <p className="text-start text-xs mt-1">
                    Have things in a spreadsheet? We can import your portfolio
                    directly from your device.
                  </p>
                </div>
                <div
                  onClick={() => {
                    setTabSelected("create");
                  }}
                  className="transition-colors duration-500 bg-none text-white border border-white hover:text-gray-800 h-auto hover:bg-white flex flex-col items-start justify-center w-10/12  rounded-md cursor-pointer p-6"
                >
                  <h2 className="font-bold text-sm text-start uppercase">
                    Create Manually
                  </h2>
                  <p className="text-start text-xs mt-1">
                    Our enhanced portfolio version with support for Buy, Sell,
                    Short, Buy to Cover Transactions, and much more.
                  </p>
                </div>
              </>
            )} */}
            {/* {tabSelected && ( */}
            <>
              {tabSelected != "import" ? (
                <div className="space-y-2 w-full">
                  <div className="w-full">
                    <Input
                      type="text"
                      placeholder="Enter Portfolio Name"
                      value={portfolioName}
                      onChange={(e) => setPortfolioName(e.target.value)}
                      className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="w-full">
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="dropdownButton2"
                          className="flex flex-row items-center w-full"
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
              ) : (
                <div className="w-full mt-4">
                  <label className="text-gray-700   mb-2 text-sm font-medium flex items-center gap-2">
                    <FileIcon className="w-5 h-5 text-gray-500" />
                    Upload Excel File
                  </label>
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md"
                  />
                  {file && (
                    <p className="text-xs text-green-500 mt-2">
                      File: {file.name} selected
                    </p>
                  )}
                </div>
              )}
            </>
            {/* )} */}
            {/* {tabSelected && ( */}
            <div className="flex justify-center gap-4 mt-4">
              {/* <button
                  onClick={() => {
                    setTabSelected(null);
                  }}
                  className="bg-[var(--variant-4)] text-white px-6 py-2 rounded-md cursor-pointer"
                >
                  Back
                </button> */}
              <button
                onClick={() => {
                  router.push("/portfolio/my-portfolios");
                }}
                className="bg-[var(--variant-4)] text-white px-6 py-2 rounded-md cursor-pointer"
              >
                Proceed
              </button>
              <button
                onClick={() => {
                  setAddPortfolio(false);
                  setTabSelected(null);
                }}
                className="bg-gray-500 text-white px-6 py-2 rounded-md cursor-pointer  "
              >
                Cancel
              </button>
            </div>
            {/* )} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioSingle;
