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
import { HoldingLot, HoldingLots, Holdings, HoldingSummary } from "@/types/types";
import { createNewLot, deleteLot, FetchLots } from "@/services/portfolio.services";
import SkeletonLoader from "../Loader/SkeletonLoader";
import ConfirmationModal from "../Modal/ConfirmationModal";
 

type LotTableProps = {
  holdingId: number;
  holding: HoldingSummary;
  updateHoldingsForAsset: (holdingId: number, updatedHoldings: HoldingSummary) => void;

};
const LotTable: React.FC<LotTableProps> = ({ holdingId,updateHoldingsForAsset, holding }) => {
   const sharesRef = React.useRef<HTMLInputElement[]>([]);
  const [updatedLot, SetUpdatedLot] = React.useState<number | null>(null)
  const updateDate = (index: number, date: Date | undefined) => {
    if (!date) return;
    setLots((prevLots) =>
      prevLots.map((lot, i) => (i === index ? { ...lot, date } : lot))
    );
    toast("Lot has been updated.");
  };
  const updateLotValue = (
    index: number,
    field: "shares" | "cost_per_share" | "low_limit" | "high_limit",
    value: number
  ) => {
    
    setLots((prevLots) =>
      prevLots.map((lot, i) => (i === index ? { ...lot, [field]: value } : lot))
  );
  SetUpdatedLot(index);

    
  };
  const [editingRowIndex, setEditingRowIndex] = React.useState<number | null>(null);
  const [hasEdited, setHasEdited] = React.useState(false);
  const rowRefs = React.useRef<(HTMLTableRowElement | null)[]>([]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editingRowIndex !== null && hasEdited) {
        const currentRow = rowRefs.current[editingRowIndex];
        if (currentRow && !currentRow.contains(event.target as Node)) {
          setShowModal(true);
          setEditingRowIndex(null); // reset
          setHasEdited(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [editingRowIndex, hasEdited]);
  const addLot = () => {
    setLots((prevLots) => {
      const lastId = prevLots.length > 0 ? prevLots[prevLots.length - 1].id : 0;
      const newLot: HoldingLot = {
        id: lastId + 1,
        holding: 0,
        shares: "0",
        cost_per_share: holding.last_price,
        total_cost: "0",
        market_value: "0",
        day_gain_unrealized_percent: "0%",
        day_gain_unrealized_value: "0",
        total_gain_unrealized_percent: "0%",
        total_gain_unrealized_value: "0",
        annual_gain_percent: "0",
        annual_gain_value: "0",
        low_limit: 0,
        high_limit: 0,
        flag: null,
        note: "",
        isNew:true,
        date: new Date(),
      };

      return [...prevLots, newLot];
    }); 
  };

 
  const [showModal, setShowModal] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [lots, setLots] = React.useState<HoldingLots | []>([]);
  const [loading, setLoading] = React.useState<boolean>(true)
   
  React.useEffect(() => {
    const fetchChartData = async () => {
      let response = await FetchLots(holdingId);
      setLots(response.data.results)
      setLoading(false)

    }
    fetchChartData()
  }, [])
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

      {loading?
<Table className="my-4  text-xs ">
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
             
           { [...Array(3)].map((_, i) => (
              <TableRow key={i}>
                {[...Array(13)].map((_, j) => (
                  <TableCell key={j}>
                    <SkeletonLoader className="h-4 w-full bg-gray-700" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          
          </TableBody>
        </Table>
      :
        <>{lots.length > 0 ? (
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
                <TableRow key={index}
                 ref={(el) => {
  rowRefs.current[index] = el;
}}
                >
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
                            format(new Date(lot.date), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          className="bg-[#13131f] text-red"
                          mode="single"
                          selected={lot.date ?? undefined}
                          onSelect={(date) => {
                            setEditingRowIndex(index);
                            updateDate(index, date)
                          setHasEdited(true)
                          }}
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
                      onFocus={() => {
                        setEditingRowIndex(index);
                        setHasEdited(false);
                      }}
                      onChange={(e) => {
                        updateLotValue(index, "shares", Number(e.target.value))
                        setHasEdited(true)
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"

                      value={lot.cost_per_share}
                      onFocus={() => {
                        setEditingRowIndex(index);
                        setHasEdited(false);
                      }}
                      onChange={(e) => {
                        updateLotValue(index, "cost_per_share", Number(e.target.value))
                        setHasEdited(true)
                      }}

                    />
                  </TableCell>
                  {/* {calculateLotMetrics(lot, holding)} */}

                  <TableCell className="  min-w-[100px]">
                    {lot.total_cost}
                  </TableCell>
                  <TableCell className="  min-w-[100px]">
                    {lot.market_value}
                  </TableCell>
                  <TableCell className="  min-w-[100px]">
                    {lot.day_gain_unrealized_percent}
                  </TableCell>
                  <TableCell className="  min-w-[100px]">
                    {lot.day_gain_unrealized_value}
                  </TableCell>
                  <TableCell className="  min-w-[100px]">
                    {lot.total_gain_unrealized_percent}
                  </TableCell><TableCell className="  min-w-[100px]">
                    {lot.total_gain_unrealized_value}
                  </TableCell><TableCell className="  min-w-[100px]">
                    {lot.annual_gain_percent}
                  </TableCell><TableCell className="  min-w-[100px]">
                    {lot.annual_gain_value}
                  </TableCell>
                  <TableCell className="  min-w-[100px]">
                    <Input
                      type="number"
                      value={lot.low_limit}
                      onFocus={() => {
                        setEditingRowIndex(index);
                        setHasEdited(false);
                      }}
                      onChange={(e) => {
                        updateLotValue(index, "low_limit", Number(e.target.value))
                        setHasEdited(true)
                      }}

                    />
                  </TableCell>
                  <TableCell className="  min-w-[100px]">
                    <Input
                      type="number"
                      value={lot.high_limit}
                      onFocus={() => {
                        setEditingRowIndex(index);
                        setHasEdited(false);
                      }}
                      onChange={(e) => {
                        updateLotValue(index, "high_limit", Number(e.target.value))
                        setHasEdited(true)
                      }}

                    />
                  </TableCell>
                  <TableCell>
                    <ConfirmationModal
                      onConfirm={async () => {
                        let deleteResponse = await deleteLot(holdingId, Number(lot.id));
                        if (deleteResponse.status === 204) {
                          setLots(prev => prev.filter(p => p.id !== lot.id));
                          toast("Lot deleted successfully");
                        } else {
                          toast.error("Failed to delete Lot");
                        }
                      }}
                      title="This action can't be undone?"
                      description="You want to delete this Lot?">
                      <Button
                        size="lg"
                        variant="second"
                      >
                        <Trash2 className="w-4" />
                      </Button>
                    </ConfirmationModal>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) :
          <p className="w-full text-center my-2">No Lots Added Yet</p>
      }</>
      }

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/25 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-[#09090e] p-6 rounded-md w-5/12 space-y-4 text-white">
            {lots[updatedLot || 0].isNew?
            <><h2 className="text-xl font-semibold text-center mb-1">
              Are you sure?
            </h2>
            <p className="text-center text-gray-600 text-xs">
              You want to save changes of this newly created lot?
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="  text-white px-4 py-2 rounded-md mr-2 text-xs cursor-pointer"
                onClick={async () => {
                  
                    setShowModal(false);
                    setIsEditing(false);
                     
                }}
              >
                No
              </button>
              <button
                className="bg-white text-[#09090e] px-4 py-2 rounded-md mr-2 text-xs cursor-pointer"
                 onClick={async () => {
                  console.log(updatedLot,"updated")
                 let updatedLotNew = lots[updatedLot || 0] ?? null;


                  let newLot = await createNewLot(holdingId,
                     { shares: Number(updatedLotNew?.shares),
                       cost_per_share: Number(updatedLotNew?.cost_per_share), low_limit: Number(updatedLotNew?.low_limit), high_limit: Number(updatedLotNew?.low_limit), note: "", flag: "new_transaction", date: updatedLotNew?.date  }
                    )
                  if (newLot.status == 201) {
                    setShowModal(false);
                    setIsEditing(false);
                                 updateHoldingsForAsset(holdingId,newLot.data.holding_data)

               setLots((prevLots) =>
                      prevLots.map((lot, i) => (lot.id === updatedLotNew?.id ? newLot.data : lot))

                    );
                  }
                }}
              >
                Yes
              </button>
            </div></>
            :<><h2 className="text-xl font-semibold text-center mb-1">
              Is this a new sell transaction?
            </h2>
            <p className="text-center text-gray-600 text-xs">
              We'll automatically generate a sell transaction of 1 shares. Feel
              free to adjust it afterward to ensure accuracy.
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="  text-white px-4 py-2 rounded-md mr-2 text-xs cursor-pointer"
                onClick={async () => {
                  console.log(updatedLot,"updated")
                 let updatedLotNew = lots[updatedLot || 0] ?? null;


                  let newLot = await createNewLot(holdingId,
                     { shares: Number(updatedLotNew?.shares),
                       cost_per_share: Number(updatedLotNew?.cost_per_share), low_limit: Number(updatedLotNew?.low_limit), high_limit: Number(updatedLotNew?.low_limit), note: "", flag: "edit", date: updatedLotNew?.date  }
                    )
                  if (newLot.status == 201) {
                    setShowModal(false);
                    setIsEditing(false);
                                 updateHoldingsForAsset(holdingId,newLot.data.holding_data)

                    setLots((prevLots) =>
                      prevLots.map((lot, i) => (lot.id === updatedLotNew?.id ? newLot.data : lot))

                    );
                  }
                }}
              >
                No, This is an edit
              </button>
              <button
                className="bg-white text-[#09090e] px-4 py-2 rounded-md mr-2 text-xs cursor-pointer"
                 onClick={async () => {
                  console.log(updatedLot,"updated")
                 let updatedLotNew = lots[updatedLot || 0] ?? null;


                  let newLot = await createNewLot(holdingId,
                     { shares: Number(updatedLotNew?.shares),
                       cost_per_share: Number(updatedLotNew?.cost_per_share), low_limit: Number(updatedLotNew?.low_limit), high_limit: Number(updatedLotNew?.low_limit), note: "", flag: "new_transaction", date: updatedLotNew?.date  }
                    )
                  if (newLot.status == 201) {
                    setShowModal(false);
                    setIsEditing(false);
                                 updateHoldingsForAsset(holdingId,newLot.data.holding_data)

               setLots((prevLots) => [...prevLots, newLot.data]);

                  }
                }}
              >
                Yes
              </button>
            </div></>}
            
          </div>
        </div>
      )}
    </div>
  );
};

export default LotTable;
