"use client";
import Navbar from "@/components/Navbar/Navbar"; 
import React from "react";
import StockScreening from "@/components/StockScreeningInput/StockScreening";
export default function StockScreeningPage() {
  
  
  return (
    <div className="flex flex-col items-center  w-full">
      <Navbar />
      <StockScreening/>
      
    </div>
  );
}
