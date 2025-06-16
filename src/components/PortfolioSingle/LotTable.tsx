"use client";
import { Calendar1Icon, Plus } from "lucide-react";
import React from "react";

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
import { Holdings } from "@/types/types";
type Lot = {
  shares: number;
  cost: number;
  date: Date;
  highLimit: number;
  lowLimit: number;
};

type LotTableProps = {
  lots: Lot[];
  holding: Holdings;
  setLots: React.Dispatch<React.SetStateAction<Lot[]>>;
};
const LotTable: React.FC<LotTableProps> = ({ lots, holding, setLots }) => {
  const calculateLotMetrics = (
    lot: {
      shares: number;
      cost: number;
      date: Date;
      highLimit: number;
      lowLimit: number;
    },
    holding: Holdings
  ) => {
    const today = new Date();
    const daysHeld = Math.max(
      1,
      Math.floor(
        (today.getTime() - new Date(lot.date).getTime()) / (1000 * 60 * 60 * 24)
      )
    );

    const marketValue = lot.shares * holding.lastPrice;
    const totalCost = lot.shares * lot.cost;

    const dayGainPercent = holding.dayGainPercent;
    const dayGainAmount = marketValue * (dayGainPercent / 100);

    const totalGainAmount = marketValue - totalCost;
    const totalGainPercent = (totalGainAmount / totalCost) * 100;

    let annGainPercent = 0;
    if (totalCost > 0 && isFinite(totalGainAmount / totalCost)) {
      const base = 1 + totalGainAmount / totalCost;
      const exponent = 365 / daysHeld;

      // Prevent overflow due to extreme exponentiation
      if (base > 0 && base < 100) {
        annGainPercent = (Math.pow(base, exponent) - 1) * 100;
      }
    }
    const annGainAmount = (annGainPercent / 100) * totalCost;
    const safe = (val: number, suffix = "") =>
      !isFinite(val) || isNaN(val) || Math.abs(val) > 1e6
        ? "--"
        : `${val.toFixed(2)}${suffix}`;

    return (
      <>
        <TableCell>{safe(totalCost)}</TableCell>
        <TableCell>{safe(marketValue)}</TableCell>
        <TableCell className={textColor(dayGainPercent)}>
          {safe(dayGainPercent, "%")}
        </TableCell>
        <TableCell className={textColor(dayGainAmount)}>
          {safe(dayGainAmount)}
        </TableCell>
        <TableCell className={textColor(totalGainPercent)}>
          {safe(totalGainPercent, "%")}
        </TableCell>
        <TableCell className={textColor(totalGainAmount)}>
          {safe(totalGainAmount)}
        </TableCell>
        <TableCell className={textColor(annGainPercent)}>
          {safe(annGainPercent, "%")}
        </TableCell>
        <TableCell className={textColor(annGainAmount)}>
          {safe(annGainAmount)}
        </TableCell>
      </>
    );
  };
  const sharesRef = React.useRef<HTMLInputElement[]>([]);

  const updateDate = (index: number, date: Date | undefined) => {
    if (!date) return;
    setLots((prevLots) =>
      prevLots.map((lot, i) => (i === index ? { ...lot, date } : lot))
    );
    toast("Lot has been updated.");
  };
  const updateLotValue = (
    index: number,
    field: "shares" | "cost" | "lowLimit" | "highLimit",
    value: number
  ) => {
    setLots((prevLots) =>
      prevLots.map((lot, i) => (i === index ? { ...lot, [field]: value } : lot))
    );
    if (field === "shares") {
      setTimeout(() => {
        setShowModal(true);
      }, 3000);
    }
    toast("Lot has been updated.");
  };
  const addLot = () => {
    setLots((prevLots) => [
      ...prevLots,
      { shares: 0, cost: 0, date: new Date(), highLimit: 0, lowLimit: 0 },
    ]);
    toast("Lot has been created.");
  };
  const deleteLot = (index: number) => {
    setLots((prevLots) => prevLots.filter((_, i) => i !== index));
    toast("Lot deleted.");
  };
  const [showModal, setShowModal] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  //   React.useEffect(() => {
  //     const handleClickOutside = (event: MouseEvent) => {
  //       if (sharesEdited) {
  //         if (
  //           sharesRef.current.every(
  //             (ref) => ref && !ref.contains(event.target as Node)
  //           )
  //         ) {
  //           setShowModal(true);
  //         }
  //       }
  //     };

  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, [sharesEdited]);

  return (
    <div className="w-full relative flex flex-col items-start">
      <button
        onClick={() => {
          addLot();
        }}
        className=" mt-4 cursor-pointer text-xs px-2 py-1 text-white border border-white rounded-md flex flex-row items-center"
      >
        <Plus className="mr-1 w-3" />
        Add Lot
      </button>
      {lots.length > 0 && (
        <Table className="my-4 text-xs">
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Shares</TableHead>
              <TableHead>Cost/Share ($)</TableHead>
              <TableHead>Total Cost ($)</TableHead>
              <TableHead>Market Value ($)</TableHead>
              <TableHead>Day Gain UNRL (%)</TableHead>
              <TableHead>Day Gain UNRL ($)</TableHead>
              <TableHead>Tot Gain UNRL (%)</TableHead>
              <TableHead>Tot Gain UNRL ($)</TableHead>
              <TableHead>Ann Gain (%)</TableHead>
              <TableHead>Ann Gain ($)</TableHead>
              <TableHead>Low Limit</TableHead>
              <TableHead>High Limit</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lots.map((lot, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline2"}
                        className={cn(
                          "w-[240px] white  cursor-pointer justify-start text-left font-normal",
                          !lot.date && "text-muted-foreground"
                        )}
                      >
                        <Calendar1Icon />
                        {lot.date ? (
                          format(lot.date, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        className="bg-[#13131f] text-red"
                        mode="single"
                        selected={lot.date}
                        onSelect={(date) => updateDate(index, date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
                    value={lot.shares}
                    onChange={(e) =>
                      updateLotValue(index, "shares", Number(e.target.value))
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={lot.cost}
                    onChange={(e) =>
                      updateLotValue(index, "cost", Number(e.target.value))
                    }
                  />
                </TableCell>
                {calculateLotMetrics(lot, holding)}

                <TableCell>
                  <Input
                    type="number"
                    value={lot.lowLimit}
                    onChange={(e) =>
                      updateLotValue(index, "lowLimit", Number(e.target.value))
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={lot.highLimit}
                    onChange={(e) =>
                      updateLotValue(index, "highLimit", Number(e.target.value))
                    }
                  />
                </TableCell>
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

export default LotTable;
