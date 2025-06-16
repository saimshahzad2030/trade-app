"use client";
import { Calendar1Icon, ChevronDown, Plus } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { format, set, subDays, subMonths } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Delete, DeleteIcon, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "../ui/input";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { textColor } from "@/utils/functionalUtils";
import { Holdings, Transactions, TransactionType } from "@/types/types";
type Lot = {
  shares: number;
  cost: number;
  date: Date;
  highLimit: number;
  lowLimit: number;
};

type LotTableProps = {
  transactions: Transactions[];
  holding: Holdings;
  setTransactions: React.Dispatch<React.SetStateAction<Transactions[]>>;
};
const TransactionTables: React.FC<LotTableProps> = ({
  transactions,
  holding,
  setTransactions,
}) => {
  const sharesRef = React.useRef<HTMLInputElement[]>([]);

  const updateDate = (index: number, date: Date | undefined) => {
    if (!date) return;
    setTransactions((prevLots) =>
      prevLots.map((transaction, i) =>
        i === index ? { ...transaction, date } : transaction
      )
    );
    toast("Lot has been updated.");
  };
  const updateLotValue = (
    index: number,
    field: "shares" | "costPerShare" | "commission",
    value: number
  ) => {
    setTransactions((prevLots) =>
      prevLots.map((transaction, i) =>
        i === index ? { ...transaction, [field]: value } : transaction
      )
    );
    if (field === "shares") {
      setTimeout(() => {
        setShowModal(true);
      }, 3000);
    }
    toast("Lot has been updated.");
  };
  const addLot = () => {
    setTransactions((prevTrans) => [
      ...prevTrans,
      {
        date: new Date(), // ISO format recommended, e.g. '2025-04-30'
        type: "buy",
        shares: 0,
        costPerShare: 0,
        commission: 0,
        totalCost: 0,
        realizedGainPercent: 0,
        realizedGainDollar: 0,
      },
    ]);
    toast("Lot has been created.");
  };
  const deleteLot = (index: number) => {
    setTransactions((prevLots) => prevLots.filter((_, i) => i !== index));
    toast("Lot deleted.");
  };
  const [showModal, setShowModal] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const updateTransactionType = (index: number, value: TransactionType) => {
    setTransactions((prev) => {
      const updated = [...prev];
      updated[index].type = value;
      return updated;
    });
  };
  interface Transaction {
    shares: number;
    lastPrice: number;
    avgCostPerShare: number;
  }

  function calculateRealizedGain(transaction: Transaction) {
    const { shares, lastPrice, avgCostPerShare } = transaction;

    const realizedGainDollar = (lastPrice - avgCostPerShare) * shares;
    const realizedGainPercent =
      avgCostPerShare === 0
        ? 0
        : ((lastPrice - avgCostPerShare) / avgCostPerShare) * 100;

    const safe = (val: number, suffix = "") =>
      !isFinite(val) || isNaN(val) || Math.abs(val) > 1e6
        ? "--"
        : `${val.toFixed(2)}${suffix}`;

    return (
      <>
        <TableCell>{safe(realizedGainPercent)}%</TableCell>
        <TableCell className={textColor(realizedGainDollar)}>
          {safe(realizedGainDollar)}
        </TableCell>
      </>
    );
  }

  return (
    <div className="w-full relative flex flex-col items-start">
      <button
        onClick={() => {
          addLot();
        }}
        className=" mt-4 cursor-pointer text-xs px-2 py-1 text-white border border-white rounded-md flex flex-row items-center"
      >
        <Plus className="mr-1 w-3" />
        Add Transaction
      </button>
      {transactions.length > 0 && (
        <Table className="my-4  text-xs ">
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Shares</TableHead>
              <TableHead>Cost/Share ($)</TableHead>
              <TableHead>Commission ($)</TableHead>
              <TableHead>Total Cost ($)</TableHead>
              <TableHead>Realized Gain (%)</TableHead>
              <TableHead>Realized Gain ($)</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline2"}
                        className={cn(
                          "w-[240px] white  cursor-pointer justify-start text-left font-normal",
                          !transaction.date && "text-muted-foreground"
                        )}
                      >
                        <Calendar1Icon />
                        {transaction.date ? (
                          format(transaction.date, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        className="bg-[#13131f] text-red"
                        mode="single"
                        selected={transaction.date}
                        onSelect={(date) => updateDate(index, date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </TableCell>
                <TableCell>
                  {" "}
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="dropdownButton2" className="w-full">
                        {transaction.type}
                        <ChevronDown />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 ml-[50px]">
                      <DropdownMenuLabel>Type</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={transaction.type}
                        onValueChange={(value) =>
                          updateTransactionType(index, value as TransactionType)
                        }
                      >
                        {[
                          { name: "Buy", val: "buy" },
                          { name: "Sell", val: "sell" },
                          { name: "Sell Short", val: "sellshort" },
                          { name: "buy To Cover", val: "buytocover" },
                        ].map((item, index) => (
                          <DropdownMenuRadioItem value={item.val} key={index}>
                            {item.name}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell>
                  <Input
                    ref={(el) => {
                      if (el) sharesRef.current[index] = el;
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setShowModal(true);
                      }
                    }}
                    type="number"
                    className="w-[100px]"
                    value={transaction.shares}
                    onChange={(e) =>
                      updateLotValue(index, "shares", Number(e.target.value))
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={transaction.costPerShare}
                    onChange={(e) =>
                      updateLotValue(
                        index,
                        "costPerShare",
                        Number(e.target.value)
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={transaction.commission}
                    onChange={(e) =>
                      updateLotValue(
                        index,
                        "commission",
                        Number(e.target.value)
                      )
                    }
                  />
                </TableCell>
                <TableCell>{transaction.totalCost}</TableCell>

                {calculateRealizedGain({
                  shares: transaction.shares,
                  lastPrice: holding.lastPrice,
                  avgCostPerShare: transaction.costPerShare,
                })}
                <TableCell>
                  <button
                    className=" cursor-pointer"
                    onClick={() => deleteLot(index)}
                  >
                    <Trash2 className="w-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/25 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-[#09090e] p-6 rounded-md max-w-lg w-full space-y-4 text-white">
            <h2 className="text-xl font-semibold text-center mb-1">
              Is this a new sell transaction?
            </h2>
            <p className="text-center text-gray-600 text-xs">
              We'll automatically generate a sell transaction of 1 shares. Feel
              free to adjust it afterward to ensure accuracy.
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="  text-white px-4 py-2 rounded-md mr-2 text-xs cursor-pointer"
                onClick={() => {
                  setShowModal(false);
                  setIsEditing(false);
                  // Handle cancel action
                }}
              >
                No, This is an edit
              </button>
              <button
                className="bg-white text-[#09090e] px-4 py-2 rounded-md mr-2 text-xs cursor-pointer"
                onClick={() => {
                  setShowModal(false);
                  setIsEditing(true);
                  // Handle cancel action
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTables;
