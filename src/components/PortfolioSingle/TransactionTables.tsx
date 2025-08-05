"use client";
import { Calendar1Icon, ChevronDown, Plus } from "lucide-react";
import React from "react";
import { Transaction } from "@/types/types";
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
import { Holdings, HoldingSummary, HoldingTransaction, HoldingTransactions, Transactions, TransactionType } from "@/types/types";
import { createNewTransaction, deleteTransaction, FetchTransactions, updateTransaction } from "@/services/portfolio.services";
import SkeletonLoader from "../Loader/SkeletonLoader";
import ConfirmationModal from "../Modal/ConfirmationModal";
type Lot = {
  shares: number;
  cost: number;
  date: Date;
  highLimit: number;
  lowLimit: number;
};

type LotTableProps = {
   holdingId:number,
  holding: HoldingSummary; 
  updateHoldingsForAsset: (holdingId: number, updatedHoldings: HoldingSummary) => void;
};
const TransactionTables: React.FC<LotTableProps> = ({ 
  holding, 
  holdingId,
  updateHoldingsForAsset 
}) => {
    const [updatedTransaction, setUpdatedTransaction] = React.useState<number | null>(null)
  
  const sharesRef = React.useRef<HTMLInputElement[]>([]);
const [transactions, setTransactions] = React.useState< HoldingTransactions | []>([]);
  const [loading, setLoading] = React.useState<boolean>(true)
  const updateDate = (index: number, date: Date | undefined) => {
    if (!date) return;
    setTransactions((prevTrans) =>
      prevTrans.map((trans, i) => (i === index ? { ...trans, date } : trans))
    );
    toast("Lot has been updated.");
  };
  const updateLotValue = (
    index: number,
    field: "shares" | "cost_per_share" | "commission",
    value: number
  ) => {
     
    setTransactions((prevLots) =>
      prevLots.map((lot, i) => (i === index ? { ...lot, [field]: value } : lot))
  );
  setUpdatedTransaction(index);
    // setTransactions((prevLots) =>
    //   prevLots.map((transaction, i) =>
    //     i === index ? { ...transaction, [field]: value } : transaction
    //   )
    // );
    // if (field === "shares") {
    //   setTimeout(() => {
    //     setShowModal(true);
    //   }, 3000);
    // }
    // toast("Lot has been updated.");
  };
  const addLot = () => {
    setTransactions((prevLots) => {
          const lastId = prevLots.length > 0 ? prevLots[prevLots.length - 1].id : 0;
          const newLot: HoldingTransaction = {
            id: lastId + 1, 
            share:0,
            commission:null,
            shares: "0",
            transaction_type:"BUY",
            cost_per_share: holding.last_price,
            total_cost: "0",        
             realized_gain_percent: "0.00%",
  realized_gain_value: "0.00",  
 flag: "new",
            note: "",
            date: new Date(),
          };
    
          return [...prevLots, newLot];
        }); 
    
    
    toast("Transaction has been created.");
  };
  const deleteLot = (index: number) => {
    setTransactions((prevTrans) => prevTrans.filter((_, i) => i !== index));
    toast("Lot deleted.");
  };
  const [showModal, setShowModal] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
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
  const updateTransactionType = (index: number, value: TransactionType) => {
    setTransactions((prev) => {
      const updated = [...prev];
      updated[index].transaction_type = value;
      return updated;
    });
  };

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
 React.useEffect(() => {
    const fetchChartData = async () => {
      let response = await FetchTransactions(holdingId);
      console.log(response.data.results)
      setTransactions(response.data.results)
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
        Add Transaction
      </button>
      {loading ?
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
             
           { [...Array(3)].map((_, i) => (
              <TableRow key={i}>
                {[...Array(9)].map((_, j) => (
                  <TableCell key={j}>
                    <SkeletonLoader className="h-4 w-full bg-gray-700" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          
          </TableBody>
        </Table>
       :  <>{transactions.length > 0 ? (
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
              <TableRow key={index}
              
                 ref={(el) => {
  rowRefs.current[index] = el;
}}>
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
                        {transaction.date && !isNaN(new Date(transaction.date).getTime()) ? (
          format(new Date(transaction.date), "PPP")
        ) : (
          <span>Invalid Date</span>
        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        className="bg-[#13131f] text-red"
                        mode="single"
                          selected={
  transaction?.date && !isNaN(new Date(transaction.date).getTime())
    ? new Date(transaction.date)
    : undefined
}


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
                  {" "}
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="dropdownButton2" className="w-full">
                        {transaction.transaction_type}
                        <ChevronDown />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 ml-[50px]">
                      <DropdownMenuLabel>Type</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={transaction.transaction_type}
                        onValueChange={(value) =>
                    {         setEditingRowIndex(index);
                       updateTransactionType(index, value as TransactionType)
                          setHasEdited(true) 
                        }
                        }
                      >
                        {[
                          { name: "Buy", val: "BUY" },
                          { name: "Sell", val: "SELL" },
                          { name: "Sell Short", val: "SELL SHORT" },
                          { name: "buy To Cover", val: "BUY TO COVER" },
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
                    // ref={(el) => {
                    //   if (el) sharesRef.current[index] = el;
                    // }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setShowModal(true);
                      }
                    }}
                    onFocus={() => {
                        setEditingRowIndex(index);
                        setHasEdited(false);
                      }}
                    type="number"
                    className="w-[100px]"
                    value={transaction.shares}
                    onChange={(e) =>
                    {updateLotValue(index, "shares", Number(e.target.value))

                                              setHasEdited(true);}

                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={transaction.cost_per_share}
                    onFocus={() => {
                        setEditingRowIndex(index);
                        setHasEdited(false);
                      }}
                    onChange={(e) =>
                      {updateLotValue(
                        index,
                        "cost_per_share",
                        Number(e.target.value)
                      )  
                      setHasEdited(true);}
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={String(transaction.commission)}
                    onFocus={() => {
                        setEditingRowIndex(index);
                        setHasEdited(false);
                      }}
                    onChange={(e) =>
                      {updateLotValue(
                        index,
                        "commission",
                        Number(e.target.value)
                      )
                        setHasEdited(true);}
                    }
                  />
                </TableCell>
                <TableCell>{transaction.total_cost}</TableCell>
<TableCell>{transaction.realized_gain_percent}</TableCell>
<TableCell>{transaction.realized_gain_value}</TableCell>
        
                <TableCell>
                 <ConfirmationModal
                                       onConfirm={async () => {
                                         let deleteResponse = await deleteTransaction(holdingId, Number(transaction.id));
                                         if (deleteResponse.status === 204) {
                                           setTransactions(prev => prev.filter(p => p.id !== transaction.id));
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
          <p className="w-full text-center my-2">No Transactions Added Yet</p>
        }</>}
       
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/25 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-[#09090e] p-6 rounded-md w-4/12  space-y-4 text-white">
            <h2 className="text-xl font-semibold text-center mb-1">
              Are you sure?
            </h2>
            <p className="text-center text-gray-600 text-xs">
             Do u want to add this newly created transaction?
            </p>
            <div className="flex justify-end mt-4">
              
                 <button
                             className="bg-white text-[#09090e] px-4 py-2 rounded-md mr-2 text-xs cursor-pointer"
                              onClick={async () => { 
                              let updatedLotNew = transactions[updatedTransaction || 0] ?? null;
             
             
                            if(updatedLotNew.flag){
   let newLot = await createNewTransaction(holdingId,
                                  { shares: Number(updatedLotNew?.shares),
                                    cost_per_share: Number(updatedLotNew?.cost_per_share),transaction_type:updatedLotNew.transaction_type,   commission: Number(updatedLotNew?.commission), note: "", date: updatedLotNew?.date  }
                                 )
                               if (newLot.status == 201) {
                                 setShowModal(false);
                                 setIsEditing(false);
                                 console.log(newLot.data.holding_data)
                                 updateHoldingsForAsset(holdingId,newLot.data.holding_data)
                            setTransactions((prevLots) =>
  prevLots.map((txn) =>
    txn.id == updatedLotNew.id ? newLot.data : txn
  )
);
             
                               }
                               else{
                                 setShowModal(false);

                                toast.error("Unable to add new Transaction")
                               }
                            }
                            else{
                                 let newLot = await updateTransaction(holdingId,
                                  updatedLotNew.id,
                                  { shares: Number(updatedLotNew?.shares),
                                    cost_per_share: Number(updatedLotNew?.cost_per_share),transaction_type:updatedLotNew.transaction_type,   commission: Number(updatedLotNew?.commission), note: "", date: updatedLotNew?.date  }
                                 )
                               if (newLot.status == 200) {
                                 setShowModal(false);
                                 setIsEditing(false);
                                console.log(newLot.data.holding_data)
                                 updateHoldingsForAsset(holdingId,newLot.data.holding_data)

                           setTransactions((prevLots) =>
  prevLots.map((txn) =>
    txn.id == updatedLotNew.id ? newLot.data : txn
  )
);
             
                               }
                               else{
                                 setShowModal(false);

                                toast.error("Unable to add new Transaction")
                               }
                            }
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
