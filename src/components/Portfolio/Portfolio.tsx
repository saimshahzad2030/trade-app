"use client";
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
  Briefcase,
  CheckCircle2,
  ChevronDown,
  FileIcon,
  GalleryHorizontalEnd,
  Sheet,
} from "lucide-react";
import React from "react";
import Portfolios from "./Portfolios";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectTrigger } from "@radix-ui/react-select";
import { Button } from "../ui/button";
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
const Portfolio = () => {
  const router = useRouter();
  const [tabSelected, setTabSelected] = React.useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = React.useState(
    topCurrencies[0].code
  );
  const [portfolioName, setPortfolioName] = React.useState<string>("");
  const [currency, setCurrency] = React.useState<string>("USD");
  const [file, setFile] = React.useState<File | null>(null); // For file input
  const benefits = [
    "Real-Time Performance Tracking",
    "Diversification Insights",
    "Smart Alerts & Notifications",
    "Better Decision-Making with Analytics",
    "Centralized Management of Assets",
    "Interactive Visual Reports & Charts",
    "Detailed Transaction History",
    "Access Anywhere with Cloud Sync",
  ];

  const closeModal = () => {
    setTabSelected(null);
  };
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
  return (
    <div className="flex flex-col text-white items-start w-full p-8">
      {!tabSelected && (
        <div className="grid grid-cols-2 w-full gap-8">
          <div className="flex flex-col items-center w-full col-span-1 border border-gray-400 p-4 rounded-md">
            <h1 className="font-bold text-3xl  text-center">
              Create a Portfolio With Holdings
            </h1>
            <p className="mt-2 w-full  text-sm text-center">
              Easily track and manage your investments with our simplified
              portfolio tool. Get a clear, detailed breakdown of all your assets
              in one place. Start building your portfolio in just two simple
              ways.
            </p>
            {/* <div className="flex flex-row items-center justify-between w-full mt-8">
              <div
                onClick={() => {
                  setTabSelected("import");
                }}
                className="transition-colors duration-500 bg-none text-white border border-white hover:text-gray-800 h-[160px] hover:bg-white flex flex-col items-center justify-center w-[48%] p-2 rounded-md cursor-pointer "
              >
                <Briefcase className="w-8 h-8" />
                <h2 className="font-bold text-xl text-center">Import a CSV</h2>
                <p className="text-center text-xs mt-2">
                  Already have your portfolio in a spreadsheet? Simply import it
                  directly from your device for a seamless start.
                </p>
              </div>
              <div className=" bg-gray-400 flex flex-col items-start w-[1px] h-[90%] "></div> */}
            <div
              onClick={() => {
                setTabSelected("create");
              }}
              className="mt-8 transition-colors duration-500 bg-none text-white border border-white hover:text-gray-800 h-[160px] hover:bg-white flex flex-col items-center justify-center w-[48%] p-2 rounded-md cursor-pointer "
            >
              <Sheet className="w-8 h-8" />
              <h2 className="font-bold text-xl text-center">Create Manually</h2>
              <p className="text-center text-xs mt-2">
                Experience our enhanced portfolio tool—now with full support for
                Buy, Sell, Short, and Buy to Cover transactions, plus much more.
              </p>
            </div>
            {/* </div> */}
          </div>
          <div className="flex flex-col items-center w-full col-span-1 border border-gray-400 p-4 rounded-md">
            <h1 className="font-bold text-3xl  text-center">
              View your created portfolios
            </h1>
            <p className="mt-2 w-full  text-sm text-center">
              Effortlessly manage and view all your created portfolios. Our
              intuitive portfolio tool allows you to track, analyze, and
              optimize your investments with ease. Get a comprehensive overview
              of your assets in one place.
            </p>
            <div className="flex flex-row items-center justify-center w-full mt-8">
              <div
                onClick={() => {
                  router.push("/portfolio/my-portfolios");
                }}
                className="transition-colors duration-500 bg-none text-white border border-white hover:text-gray-800 h-[160px] hover:bg-white flex flex-col items-center justify-center w-[48%] p-2 rounded-md cursor-pointer "
              >
                <GalleryHorizontalEnd className="w-8 h-8" />
                <h2 className="font-bold text-xl text-center">
                  Preview Porfolios
                </h2>
                <p className="text-center text-xs mt-2">
                  Experience our enhanced portfolio tool—now with full support
                  for Buy, Sell, Short, and Buy to Cover transactions, plus much
                  more.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className=" text-white py-10 px-4 sm:px-6 lg:px-8 mt-8">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Why Keep a Portfolio on Our Platform?
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <CheckCircle2 className="text-green-500  mr-3" size={20} />
              <p className="text-gray-700 text-sm">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
      {(tabSelected == "import" || tabSelected == "create") && (
        <div className="fixed inset-0 z-50 bg-black/25 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded-md max-w-lg w-full space-y-4 text-gray-800">
            <h2 className="text-2xl font-semibold text-center">
              {tabSelected === "import"
                ? "Select a CSV to Import"
                : "Setup Your Portfolio"}
            </h2>
            {tabSelected != "import" ? (
              <div className="space-y-4">
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
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={closeModal}
                className="bg-[var(--variant-4)] text-white px-6 py-2 rounded-md cursor-pointer"
              >
                Proceed
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-6 py-2 rounded-md cursor-pointer  "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
