"use client";
import React from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import {
  ChevronDown,
  ChevronLeft,
  FileIcon,
  Plus,
  Tickets,
  X,
} from "lucide-react";
import { Portfolio } from "@/types/types";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
type TabKey = string | null; // or e.g. 'overview' | 'holdings' | 'analytics'
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
const Portfolios = () => {
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
  const [portfolios, setPortfolios] = React.useState<Portfolio[]>([
    {
      portfolioName: "Tech Growth Fund",
      symbols: 5,
      costBasis: "$10,500",
      marketValue: "$12,300",
      dayChange: "+$300",
      unrealizedGainLoss: "+$1,800",
      realizedGainLoss: "+$1,200",
    },
    {
      portfolioName: "Dividend Portfolio",
      symbols: 10,
      costBasis: "$15,000",
      marketValue: "$16,200",
      dayChange: "+$200",
      unrealizedGainLoss: "+$1,200",
      realizedGainLoss: "+$800",
    },
    {
      portfolioName: "Global Stocks",
      symbols: 8,
      costBasis: "$25,000",
      marketValue: "$24,500",
      dayChange: "-$500",
      unrealizedGainLoss: "-$500",
      realizedGainLoss: "+$500",
    },
    {
      portfolioName: "Crypto Investments",
      symbols: 3,
      costBasis: "$5,000",
      marketValue: "$5,200",
      dayChange: "+$200",
      unrealizedGainLoss: "+$200",
      realizedGainLoss: "$0",
    },
    {
      portfolioName: "Real Estate Fund",
      symbols: 2,
      costBasis: "$30,000",
      marketValue: "$31,000",
      dayChange: "+$500",
      unrealizedGainLoss: "+$1,000",
      realizedGainLoss: "+$500",
    },
  ]);

  return (
    <div className="overflow-x-auto w-full mt-8 flex flex-col items-start pt-20 px-8">
      <Link
        href={"/portfolio"}
        className="p-2 cursor-pointer flex flex-row items-center bg-white text-[var(--variant-2)] mb-2 rounded-lg"
      >
        <ChevronLeft />
        Go Back
      </Link>
      <div className="flex flex-row items-center justify-between w-full  mb-4">
        <h1 className="font-bold text-3xl text-white">Portfolios</h1>
        <button
          onClick={() => {
            setAddPortfolio(true);
          }}
          className=" mt-4 cursor-pointer text-xs px-2 py-1 text-white border border-white rounded-md flex flex-row items-center"
        >
          <Plus className="mr-1 w-3" />
          Add Portfolio
        </button>
      </div>
      <Table className="text-white">
        <TableHeader>
          <TableRow>
            <TableCell>Portfolio Name</TableCell>
            <TableCell>Symbols</TableCell>
            <TableCell>Cost Basis (Including Cash)</TableCell>
            <TableCell>Market Value (Including Cash)</TableCell>
            <TableCell>Day Change</TableCell>
            <TableCell>Unrealized Gain/Loss</TableCell>
            <TableCell>Realized Gain/Loss</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {portfolios.map((portfolio, index) => (
            <TableRow key={index}>
              <TableCell className="flex flex-row items-center">
                <Tickets className="mr-2" />
                <Link href={`/portfolio/${index}`}>
                  {portfolio.portfolioName}
                </Link>
              </TableCell>
              <TableCell>{portfolio.symbols}</TableCell>
              <TableCell>{portfolio.costBasis}</TableCell>
              <TableCell>{portfolio.marketValue}</TableCell>
              <TableCell>{portfolio.dayChange}</TableCell>
              <TableCell>{portfolio.unrealizedGainLoss}</TableCell>
              <TableCell>{portfolio.realizedGainLoss}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
            {/* {tabSelected && (*/}
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
                  setPortfolios((prevPortfolio) => [
                    ...prevPortfolio,
                    {
                      portfolioName,
                      symbols: 2,
                      costBasis: "$30,000",
                      marketValue: "$31,000",
                      dayChange: "+$500",
                      unrealizedGainLoss: "+$1,000",
                      realizedGainLoss: "+$500",
                    },
                  ]);
                  setAddPortfolio(false);
                  setPortfolioName("");
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

export default Portfolios;
