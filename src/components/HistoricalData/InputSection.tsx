"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { format, subDays, subMonths } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar"; // Make sure you have a date picker calendar
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import {
  Calendar1Icon,
  ArrowBigDown,
  ArrowDown,
  ChevronDown,
} from "lucide-react";

export function InputSection() {
  const [range, setRange] = React.useState("Daily");
  const [historicalPrice, setHistoryPrice] = React.useState("Historical Price");

  const [fromDate, setFromDate] = React.useState<Date | undefined>(new Date());
  const [toDate, setToDate] = React.useState<Date | undefined>(new Date());

  const predefinedRanges = [
    { label: "1d", value: 1, type: "day" },
    { label: "5d", value: 5, type: "day" },
    { label: "3m", value: 3, type: "month" },
    { label: "6m", value: 6, type: "month" },
    { label: "YTD", value: "ytd", type: "custom" },
    { label: "1y", value: 12, type: "month" },
    { label: "5y", value: 60, type: "month" },
    { label: "All", value: "all", type: "custom" },
  ];

  const handleQuickRange = (
    label: string,
    value: number | string,
    type: string
  ) => {
    const now = new Date();
    let startDate: Date;

    if (type === "day") {
      startDate = subDays(now, Number(value));
    } else if (type === "month") {
      startDate = subMonths(now, Number(value));
    } else if (label === "YTD") {
      startDate = new Date(now.getFullYear(), 0, 1);
    } else {
      startDate = new Date(2000, 0, 1); // "All" or fallback
    }

    setFromDate(startDate);
    setToDate(now);
  };

  const formattedRange =
    fromDate && toDate
      ? `${format(fromDate, "MMM-dd-yyyy")} to ${format(toDate, "MMM-dd-yyyy")}`
      : "Select Range";

  return (
    <div className="flex gap-2 my-3">
      {/* Historical Price Dropdown */}
      <div className="mr-2">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="dropdownButton">
              {historicalPrice}
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 ml-[50px]">
            <DropdownMenuLabel>Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={historicalPrice}
              onValueChange={setHistoryPrice}
            >
              <DropdownMenuRadioItem value="Historical Price">
                Historical Price
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Dividends Only">
                Dividends only
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Capital Gains">
                Capital Gains
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Range Dropdown */}
      <div className="mr-2">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="dropdownButton">
              {range}
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Range</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={range} onValueChange={setRange}>
              <DropdownMenuRadioItem value="Daily">Daily</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Weekly">
                Weekly
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Monthly">
                Monthly
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Quick Range + Date Picker Dropdown */}
      <div>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="dropdownButton">
              {formattedRange}
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[270px] p-4">
            <DropdownMenuLabel className="mb-2">Quick Ranges</DropdownMenuLabel>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {predefinedRanges.map((r) => (
                <Button
                  key={r.label}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickRange(r.label, r.value, r.type)}
                >
                  {r.label}
                </Button>
              ))}
            </div>
            <DropdownMenuSeparator />
            <div className="  flex flex-col items-center justify-between mt-4  ">
              <div className="w-full">
                <p className="text-sm font-medium mb-1">From</p>
                {/* <Calendar
                  mode="single"
                  selected={fromDate}
                  onSelect={setFromDate}
                /> */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !fromDate && "text-muted-foreground"
                      )}
                    >
                      <Calendar1Icon />
                      {fromDate ? (
                        format(fromDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      className="bg-white"
                      mode="single"
                      selected={fromDate}
                      onSelect={setFromDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="w-full">
                <p className="text-sm font-medium mb-1">To</p>
                {/* <Calendar
                  mode="single"
                  selected={toDate}
                  onSelect={setToDate}
                /> */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !toDate && "text-muted-foreground"
                      )}
                    >
                      <Calendar1Icon />
                      {toDate ? (
                        format(toDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center">
                    <Calendar
                      className="bg-white w-full "
                      mode="single"
                      selected={toDate}
                      onSelect={setToDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
