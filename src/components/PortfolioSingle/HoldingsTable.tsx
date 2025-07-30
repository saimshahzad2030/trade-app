 
"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import LotTable from "./LotTable";
import TransactionTables from "./TransactionTables";
import { textColor } from "@/utils/functionalUtils";
import { HoldingLots, PortfolioDataResponse, Transactions } from "@/types/types";  
import SkeletonLoader from "../Loader/SkeletonLoader";
import { deletePortfolioHolding, FetchLots } from "@/services/portfolio.services";
import ConfirmationModal from "../Modal/ConfirmationModal";
import { toast } from "sonner";

type Props = {
  summaryData: PortfolioDataResponse;
  isLoading?: boolean;
};

const HoldingsTable = ({ summaryData, isLoading }: Props) => {
  const [expandedSymbol, setExpandedSymbol] = React.useState<string | null>(null);
  const [selectedTab, setSelectedTab] = React.useState<"lots" | "transactions">("lots");

  

  const formatKey = (key: string) =>
    key
      .replace(/([a-z\d])([A-Z])/g, "$1 $2")
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
      .replace(/^./, (char) => char.toUpperCase());

  const toggleExpand = (symbol: string) => {
    setExpandedSymbol((prev) => (prev === symbol ? null : symbol));
  };

const [holdings,setHoldings]=React.useState<PortfolioDataResponse>(summaryData);
 
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
          <TableHead>Day Gain %</TableHead>
          <TableHead>Day Gain Amount</TableHead>
          <TableHead>Total Gain %</TableHead>
          <TableHead>Total Gain Amount</TableHead>
          <TableHead>Realized Gain %</TableHead>
          {/* <TableHead>Action</TableHead> */}
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: 13 }).map((_, j) => (
                  <TableCell key={j}>
                    <SkeletonLoader className="h-7 w-16 bg-gray-700" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          : holdings.map((stock) => (
              <React.Fragment key={stock.holdings.symbol}>
                <TableRow>
                  <TableCell>
                    <div
                      className="flex items-center gap-2 cursor-pointer font-bold text-md text-[var(--variant-4)]"
                      onClick={() => toggleExpand(stock.holdings.symbol)}
                    >
                      {expandedSymbol === stock.holdings.symbol ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                      {stock.holdings.symbol}
                    </div>
                  </TableCell>
                  <TableCell>Open</TableCell>
                  <TableCell>{stock.holdings.shares}</TableCell>
                  <TableCell>{stock.holdings.last_price}</TableCell>
                  <TableCell>{stock.holdings.ac_per_share}</TableCell>
                  <TableCell>{stock.holdings.total_cost}</TableCell>
                  <TableCell>{stock.holdings.market_value}</TableCell>
                  
                  <TableCell className={textColor(parseFloat(stock.holdings.day_gain_unrealized_percent.replace('%', '')))}>
                    {stock.holdings.day_gain_unrealized_percent}
                  </TableCell>
                  <TableCell className={textColor(parseFloat(stock.holdings.day_gain_unrealized_value.replace('%', '')))}>
                    {stock.holdings.day_gain_unrealized_value}
                  </TableCell>
                  <TableCell className={textColor(parseFloat(stock.holdings.total_gain_unrealized_percent.replace('%', '')))}>
                    {stock.holdings.total_gain_unrealized_percent}
                  </TableCell>
                  <TableCell className={textColor(parseFloat(stock.holdings.total_gain_unrealized_value.replace('%', '')))}>
                    {stock.holdings.total_gain_unrealized_value}
                  </TableCell>
                  <TableCell className={textColor(parseFloat(stock.holdings.realized_gain_percent.replace('%', '')))}>
                    {stock.holdings.realized_gain_percent}
                  </TableCell>
                </TableRow>

                {expandedSymbol === stock.holdings.symbol && (
                  <TableRow>
                    <TableCell colSpan={13} className="bg-[#13131f] px-4 py-3">
                      <div className="text-sm text-white">
                        {["lots", "transactions"].map((range) => (
                          <Button
                            key={range}
                            variant="graphTab2"
                            onClick={() => setSelectedTab(range as any)}
                            className={`mr-1  text-[var(--variant-4)] border hover:border-[var(--variant-3)] ${
                              selectedTab === range
                                ? "  bg-[var(--variant-2)]/50   border-[var(--variant-3)]"
                                : "text-[var(--variant-4)] border-transparent"
                            }`}
                          >
                            {formatKey(range)}
                          </Button>
                        ))}
                        {selectedTab === "lots" && (
                          <LotTable   holding={stock.holdings}  holdingId={stock.id} />
                        )}
                        {selectedTab === "transactions" && (
                          <TransactionTables 
                            holding={stock.holdings} 
                            holdingId={stock.id}
                          />
                        )}
                      </div>
                    </TableCell>
                    {/* <TableCell>
                      <ConfirmationModal
                                   onConfirm={async()=>{
                                                                         let deleteAPortfolioHoldingData = await deletePortfolioHolding(stock.id);
                                                                       if (deleteAPortfolioHoldingData.status === 204) {
                                     setHoldings(prev => prev.filter(p => p.id !== stock.id));
                                     toast("Portfolio deleted successfully");
                                   } else {
                                     toast.error("Failed to delete portfolio");
                                   }
                                                                       }}
                                  title="This action can't be undone?"
                                  description="You want to delete this Symbol?">
                                    <Button
                                   size="lg"
                            variant="second" 
                                  >
                                    <Trash2 className="w-4" />
                                  </Button>
                                  </ConfirmationModal>
                    </TableCell> */}
                  </TableRow>
                )}
              </React.Fragment>
            ))}
      </TableBody>
    </Table>
  );
};

export default HoldingsTable;
