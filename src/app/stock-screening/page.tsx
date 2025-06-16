"use client";
import Navbar from "@/components/Navbar/Navbar";
import NavSecond from "@/components/Navbar/NavSecond";
import CompareSection from "@/components/Compare/CompareSection";
import ChartSection from "@/components/ChartSection/ChartSection";
import StockScreeningInput from "@/components/StockScreeningInput/StockScreeningInput";
import StockScreeningTable from "@/components/StockScreeningInput/StockScreeningTable";
import React from "react";
import { Stock, StockScreeningResponse } from "@/types/types";
export default function StockScreeningPage() {
  const [stockScreeningData, setStockScreeningData] =
    React.useState<Stock | null>(null);
  const [querySubmit, setQuerySubmit] = React.useState(false);
  const [params, setParams] = React.useState(null);
  return (
    <div className="flex flex-col items-center  w-full">
      <Navbar />
      <NavSecond />
      <div className="flex flex-col items-center w-full pt-28">
        <StockScreeningInput
          setParams={setParams}
          setQuerySubmit={setQuerySubmit}
        />
        {querySubmit && <StockScreeningTable />}
      </div>
    </div>
  );
}
