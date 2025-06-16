"use client";
import React from "react";
import { appleData1d, valuationMeasures } from "@/global/constants";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CompanyDetails from "../Chart/CompanyDetailsSection";
const StatisticsSection = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const formatKey = (key: string): string =>
    key
      .replace(/([a-z\d])([A-Z])/g, "$1 $2") // Space before caps that follow lowercase/digits
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2") // Fix acronyms followed by capitalized words
      .replace(/^./, (char) => char.toUpperCase());
  const [currentUrl, setCurrentUrl] = React.useState("/api/historical-data");
  return (
    <div className="w-full flex flex-row items-start justify-between  px-8">
      <div className="w-9/12 flex flex-col items-center justify-start">
        <div className="w-full flex-col items-start text-white">
          <CompanyDetails />

          <div className="w-full flex flex-col items-center mt-2">
            <div className="flex flex-row items-center justify-start w-full">
              <p className="text-start my-2 mr-2 text-xl font-extrabold">
                Valuation Measures
              </p>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Name</TableHead>
                  <TableHead className="text-center">Current</TableHead>
                  <TableHead className="text-center">2024-12-31</TableHead>
                  <TableHead className="text-center">2024-09-30</TableHead>
                  <TableHead className="text-center">2024-12-31</TableHead>
                  <TableHead className="text-center">2024-03-31</TableHead>
                  <TableHead className="text-center">2024-06-30</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {valuationMeasures.financials.map((item, index) => (
                  <TableRow>
                    <TableCell className="font-medium text-left">
                      {item.label}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.current}
                    </TableCell>
                    <TableCell className="text-center">
                      {item["2024-12-31"]}
                    </TableCell>

                    <TableCell className="text-center">
                      {item["2024-09-30"]}
                    </TableCell>
                    <TableCell className="text-center">
                      {item["2024-06-30"]}
                    </TableCell>
                    <TableCell className="text-center">
                      {item["2024-03-31"]}
                    </TableCell>
                    <TableCell className="text-center">
                      {item["2023-12-31"]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className=" mt-10 mb-4 w-full h-[0.5px] bg-gray-400 "></div>
          <div className="grid grid-cols-2 gap-x-[0.5px] w-full bg-gray-400">
            <div className=" flex flex-col items-start bg-[#13131f] py-8 pr-4">
              <h1 className="text-2xl font-bold capitalize mb-4">
                Financial Highlights
              </h1>
              {Object.entries(valuationMeasures.financialHighlights).map(
                ([sectionKey, sectionValue]) => (
                  <div key={sectionKey} className="mb-4 w-full">
                    <h2 className="text-lg font-semibold capitalize mb-2">
                      {sectionKey}
                    </h2>
                    {Object.entries(sectionValue).map(([key, value]) => (
                      <div
                        key={key}
                        className="mt-2 pb-1 w-full flex flex-row items-center justify-between text-sm border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed"
                      >
                        <p>{formatKey(key)}</p>
                        <p>{value}</p>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
            <div className=" flex flex-col items-start bg-[#13131f] py-8 pl-4">
              <h1 className="text-2xl font-bold capitalize mb-4">
                Trading Information
              </h1>
              {Object.entries(valuationMeasures.tradingInformation).map(
                ([sectionKey, sectionValue]) => (
                  <div key={sectionKey} className="mb-4 w-full">
                    <h2 className="text-xl font-semibold capitalize mb-2">
                      {sectionKey}
                    </h2>
                    {Object.entries(sectionValue).map(([key, value]) => (
                      <div
                        key={key}
                        className="mt-2 pb-1 w-full flex flex-row items-center justify-between text-sm border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed"
                      >
                        <p>{formatKey(key)}</p>
                        <p>{value}</p>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
          <div className=" mb-10 mt-4 w-full h-[0.5px] bg-gray-400 "></div>
        </div>
      </div>
      <div className="w-3/12 flex flex-col items-center p-4 text-white">
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
  );
};

export default StatisticsSection;
