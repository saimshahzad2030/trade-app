import React from "react";5
import { Stock, StockScreeningResponse } from "@/types/types";
import { stockScreening } from "@/global/constants";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RadarChartSS from "./RadarChartSS";
import LineChartROC from "./LineChartROC";
import LineChartEPSGrowth from "./LineChartEpsGrowth";
import LineChartRevenueGrowth from "./LineChartRevenueGrowth";
import LineChartWACC from "./LineChartWACC";
import LineChartGrossProfit from "./LineChartGrossProfit";
import FullScreenLoader from "../Loader/FullScreenLoader";
type StockScreeningTableProps = {
  data: StockScreeningResponse | null;
};

const StockScreeningTable: React.FC<StockScreeningTableProps > = ({ data })=> {
  const [navigateLoading,setNavigateLoading] =React.useState(false)
  const stocks: Stock[] | undefined = data?.filtered_data.result

  return (
    
   <>
   {navigateLoading && <FullScreenLoader/>}
    <>{stocks &&  <>
    {stocks?.length>0?
      <div className="overflow-x-auto w-full px-4 text-white">
         <div className="max-h-[80vh] overflow-y-auto w-full">
    <Table className="table-auto w-full">
      <TableHeader>
        <TableRow>
          {[
            "Symbol", "Company", "Sector", "Industry", "Market Cap", "Price",
            "Dividend", "Volume", "Beta", "Exchange", "Country",
            "Gross Profit Margin", "Net Profit Margin", "ROE", "D/E Ratio", "Interest Expense"
          ].map((header) => (
            <TableHead
              key={header}
              className="sticky top-0 z-10 p-2 text-left"
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {stocks.map((stock) => (
          <TableRow key={stock.symbol}>
            <TableCell>
              <Link
                onClick={() => setNavigateLoading(true)}
                className="underline"
                href={`/summary/${stock.symbol}`}
              >
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
  </div>
      <div className="flex flex-col items-center w-full">
        <h1 className="text-white font-bold text-4xl mt-12"> Visual Comparison</h1>
        <p className="text-sm text-gray-400">Below is the comparison of the ratios of top 5 stock u searched</p>
      </div>
      <div className="flex grid grid-cols-2 w-full gap-4  pt-8 pb-20">

      <RadarChartSS stocks={stocks.slice(0,20)}/> 
      <LineChartRevenueGrowth stocks={stocks.slice(0,20)}/>
        <LineChartROC  stocks={stocks.slice(0,20)}/> 
      <LineChartEPSGrowth stocks={stocks.slice(0,20)}/>
      <LineChartWACC stocks={stocks.slice(0,20)}/>
      <LineChartGrossProfit stocks={stocks.slice(0,20)}/>
      </div>
    </div>:
    <p className="text-gray-600 my-4">No Data to show</p>
    }</>}</></>
    
  );
};

export default StockScreeningTable;
