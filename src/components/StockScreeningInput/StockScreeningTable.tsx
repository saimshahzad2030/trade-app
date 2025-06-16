import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Stock, StockScreeningResponse } from "@/types/types";
import { stockScreening } from "@/global/constants";
import Link from "next/link";
import RadarChartSS from "./RadarChartSS";
import LineChartROC from "./LineChartROC";
import LineChartEPSGrowth from "./LineChartEpsGrowth";
import LineChartRevenueGrowth from "./LineChartRevenueGrowth";
import LineChartWACC from "./LineChartWACC";
import LineChartGrossProfit from "./LineChartGrossProfit";

const StockScreeningTable = () => {
  const stocks: Stock[] = stockScreening.filtered_data.result;

  return (
    <div className="overflow-x-auto w-full px-8 text-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Sector</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Market Cap</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Dividend</TableHead>
            <TableHead>Volume</TableHead>
            <TableHead>Beta</TableHead>
            <TableHead>Exchange</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Gross Profit Margin</TableHead>
            <TableHead>Net Profit Margin</TableHead>
            <TableHead>ROE</TableHead>
            <TableHead>D/e Ratio</TableHead>
            <TableHead>Interest Expense</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.slice(0,10).map((stock) => (
            <TableRow key={stock.symbol}>
              <TableCell>
                <Link className="underline" href={"/"}>
                  {stock.symbol}
                </Link>
              </TableCell>
              <TableCell>{stock.companyName}</TableCell>
              <TableCell>{stock.sector || "N/A"}</TableCell>
              <TableCell>{stock.industry || "N/A"}</TableCell>
              <TableCell>{(stock.marketCap / 1e9).toFixed(2)} B</TableCell>
              <TableCell>${stock.price.toFixed(2)}</TableCell>
              <TableCell>{stock.lastAnnualDividend}</TableCell>
              <TableCell>{stock.volume.toLocaleString()}</TableCell>
              <TableCell>{stock.beta}</TableCell>
              <TableCell>{stock.exchangeShortName}</TableCell>
              <TableCell>{stock.country}</TableCell>
                <TableCell>{stock.grossProfitMargin}</TableCell>
            <TableCell>{stock.netProfitMargin}</TableCell>
            <TableCell>{stock.ROE}</TableCell>
            <TableCell>{stock.deRatio}</TableCell>
            <TableCell>{stock.interestExpense}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-col items-center w-full">
        <h1 className="text-white font-bold text-4xl mt-12"> Visual Comparison</h1>
        <p className="text-sm text-gray-400">Below is the comparison of the ratios of top 5 stock u searched</p>
      </div>
      <div className="flex grid grid-cols-2 w-full gap-4  pt-8 pb-20">

      <RadarChartSS/> 
        <LineChartROC/> 
      <LineChartEPSGrowth/>
      <LineChartRevenueGrowth/>
      <LineChartWACC/>
      <LineChartGrossProfit/>
      </div>
    </div>
  );
};

export default StockScreeningTable;
