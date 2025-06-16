"use client";
import { Holdings, Transactions } from "@/types/types";
import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar1Icon,
  ChevronDown,
  ChevronUp,
  Delete,
  DeleteIcon,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import LotTable from "./LotTable";
import { textColor } from "@/utils/functionalUtils";
import TransactionTables from "./TransactionTables";
const holdings: Holdings[] = [
  {
    symbol: "AAPL",
    status: "Active",
    shares: 50,
    lastPrice: 172.34,
    avgCostPerShare: 145.0,
    totalCost: 7250.0,
    marketValue: 8617.0,
    totalDividendIncome: 150.0,
    dayGainPercent: 1.5,
    dayGainAmount: 127.0,
    totalGainPercent: 18.87,
    totalGainAmount: 1367.0,
    realizedGainPercent: 0,
  },
  {
    symbol: "TSLA",
    status: "Active",
    shares: 10,
    lastPrice: 255.12,
    avgCostPerShare: 230.0,
    totalCost: 2300.0,
    marketValue: 2551.2,
    totalDividendIncome: 0.0,
    dayGainPercent: -0.75,
    dayGainAmount: -19.26,
    totalGainPercent: 10.92,
    totalGainAmount: 251.2,
    realizedGainPercent: 0,
  },
  {
    symbol: "MSFT",
    status: "Sold",
    shares: 0,
    lastPrice: 310.5,
    avgCostPerShare: 280.0,
    totalCost: 5600.0,
    marketValue: 0.0,
    totalDividendIncome: 200.0,
    dayGainPercent: 0,
    dayGainAmount: 0,
    totalGainPercent: 15.5,
    totalGainAmount: 868.0,
    realizedGainPercent: 15.5,
  },
  {
    symbol: "AMZN",
    status: "Active",
    shares: 5,
    lastPrice: 140.25,
    avgCostPerShare: 120.0,
    totalCost: 600.0,
    marketValue: 701.25,
    totalDividendIncome: 0.0,
    dayGainPercent: 0.85,
    dayGainAmount: 5.92,
    totalGainPercent: 16.88,
    totalGainAmount: 101.25,
    realizedGainPercent: 0,
  },
];
const ranges = ["lots", "transactions"] as const;
const HoldingsTable = () => {
  const today = new Date();
  const [expandedSymbol, setExpandedSymbol] = React.useState<string | null>(
    null
  );
  const [selectedTab, setSelectedTab] = React.useState<
    "lots" | "transactions" | "dividends"
  >("lots");
  const [lots, setLots] = React.useState<
    {
      shares: number;
      cost: number;
      date: Date;
      highLimit: number;
      lowLimit: number;
    }[]
  >([{ shares: 2, cost: 200, date: new Date(), highLimit: 0, lowLimit: 0 }]);
  const [transactions, setTransactions] = React.useState<Transactions[]>([
    {
      date: new Date(),
      type: "buy",
      shares: 100,
      costPerShare: 50,
      commission: 5,
      totalCost: 5005,
    },
    {
      date: new Date(),
      type: "sell",
      shares: 100,
      costPerShare: 55,
      commission: 5,
      totalCost: 5495,
      realizedGainPercent: 10,
      realizedGainDollar: 490,
    },
    {
      date: new Date(),
      type: "sellshort",
      shares: 50,
      costPerShare: 60,
      commission: 4,
      totalCost: 2996,
    },
    {
      date: new Date(),
      type: "buytocover",
      shares: 50,
      costPerShare: 58,
      commission: 4,
      totalCost: 2904,
      realizedGainPercent: 3.07,
      realizedGainDollar: 92,
    },
  ]);

  const formatKey = (key: string): string =>
    key
      .replace(/([a-z\d])([A-Z])/g, "$1 $2") // Space before caps that follow lowercase/digits
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2") // Fix acronyms followed by capitalized words
      .replace(/^./, (char) => char.toUpperCase());
  const toggleExpand = (symbol: string) => {
    setExpandedSymbol((prev) => (prev === symbol ? null : symbol));
  };

  return (
    <Table className="text-xs">
      <TableHeader>
        <TableRow>
          <TableHead>Symbol</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Shares</TableHead>
          <TableHead>Last Price</TableHead>
          <TableHead>Avg cost/share</TableHead>
          <TableHead>Total Cost</TableHead>
          <TableHead>Market Value</TableHead>
          <TableHead>Total Dividend Income</TableHead>
          <TableHead>Day Gain %</TableHead>
          <TableHead>Day Gain Amount</TableHead>
          <TableHead>Total Gain %</TableHead>
          <TableHead>Total Gain Amount</TableHead>
          <TableHead>Realized Gain Percent</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {holdings.map((stock) => (
          <React.Fragment key={stock.symbol}>
            <TableRow>
              <TableCell>
                <div
                  className="flex items-center gap-2 cursor-pointer font-bold text-md text-[var(--variant-4)]"
                  onClick={() => toggleExpand(stock.symbol)}
                >
                  {expandedSymbol === stock.symbol ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                  {stock.symbol}
                </div>
              </TableCell>
              <TableCell>{stock.status}</TableCell>
              <TableCell>{stock.shares}</TableCell>
              <TableCell>{stock.lastPrice}</TableCell>
              <TableCell>{stock.avgCostPerShare}</TableCell>
              <TableCell>{stock.totalCost}</TableCell>
              <TableCell>{stock.marketValue}</TableCell>
              <TableCell className={textColor(stock.totalDividendIncome)}>
                {stock.totalDividendIncome}
              </TableCell>
              <TableCell className={textColor(stock.dayGainPercent)}>
                {stock.dayGainPercent}
              </TableCell>
              <TableCell className={textColor(stock.dayGainAmount)}>
                {stock.dayGainAmount}
              </TableCell>
              <TableCell className={textColor(stock.totalGainPercent)}>
                {stock.totalGainPercent}
              </TableCell>
              <TableCell className={textColor(stock.totalGainAmount)}>
                {stock.totalGainAmount}
              </TableCell>
              <TableCell className={textColor(stock.realizedGainPercent)}>
                {stock.realizedGainPercent}
              </TableCell>
            </TableRow>

            {expandedSymbol === stock.symbol && (
              <TableRow>
                <TableCell colSpan={13} className="bg-[#13131f] px-4 py-3">
                  {/* 💡 You can customize this content */}
                  <div className="text-sm text-white">
                    {ranges.map((range) => (
                      <Button
                        key={range}
                        variant="graphTab2"
                        onClick={() => {
                          setSelectedTab(range);
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
                    {selectedTab === "lots" && (
                      <LotTable lots={lots} holding={stock} setLots={setLots} />
                    )}
                    {selectedTab === "transactions" && (
                      <TransactionTables
                        transactions={transactions}
                        holding={stock}
                        setTransactions={setTransactions}
                      />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default HoldingsTable;
