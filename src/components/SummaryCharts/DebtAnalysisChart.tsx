"use client";
import React from "react";
import ReactECharts from "echarts-for-react";
import { poppins } from "@/fonts/fonts";
import { DebtCoverageEntry } from "@/types/types";
import RoundLoader from "../Loader/RoundLoader";
import SkeletonLoader from "../Loader/SkeletonLoader";
import { DebtAnalysisProps } from "@/types/types";
// Detect whether the value has B, M, or raw
import { UnitType } from "@/types/types";

const detectUnit = (value: string): UnitType => {
  if (value.endsWith("B")) return "B";
  if (value.endsWith("M")) return "M";
  return "RAW";
};

// Parse string value to raw number (in dollars)
const parseAmount = (value: string): number => {
  if (value.endsWith("B")) return parseFloat(value.replace("B", "")) * 1_000_000_000;
  if (value.endsWith("M")) return parseFloat(value.replace("M", "")) * 1_000_000;
  return parseFloat(value);
};

const DebtAnalysis: React.FC<DebtAnalysisProps> = ({ data,symbol, loading,error }) => {
  // Detect dominant unit type from first available entry
  const sampleValue = data?.[0]?.annual.totalDebt ?? "0";
  const unitType: UnitType = detectUnit(sampleValue);

  // Format Y-axis labels based on detected unit
  const yAxisFormatter = (value: number) => {
    switch (unitType) {
      case "B":
        return `${(value / 1_000_000_000).toFixed(1)}B`;
      case "M":
        return `${(value / 1_000_000).toFixed(0)}M`;
      case "RAW":
      default:
        return value.toString();
    }
  };

  // Prepare chart data (converted to raw numbers)
  const chartData = [
    ["Year", "Total Debt", "Cash & Cash Equivalents"],
    ...(data ?? []).map((entry) => [
      entry.annual.fiscalYear,
      parseAmount(entry.annual.totalDebt),
      parseAmount(entry.annual.cashAndCashEquivalents),
    ]),
  ];

  const option = {
    color: ["#e74c3c", "#2ecc71"],
    legend: {
      bottom: 10,
      textStyle: { color: "#ffffff" },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    dataset: {
      source: chartData,
    },
    xAxis: {
      type: "category",
      axisLabel: { color: "#ffffff" },
      axisLine: {
        lineStyle: { color: "#ffffff" },
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: yAxisFormatter,
        color: "#ffffff",
      },
      axisLine: {
        lineStyle: { color: "#ffffff" },
      },
      splitLine: {
        lineStyle: {
          color: "#2c3e50",
          type: "dashed",
        },
      },
    },
    series: [
      { type: "bar", name: "Total Debt" },
      { type: "bar", name: "Cash & Cash Equivalents" },
    ],
    backgroundColor: "#13131f",
  };

  return (
    <div className="w-full col-span-2 flex flex-col items-center">
      <div className="bg-[#13131f] w-full rounded-2xl p-4 flex flex-col items-center justify-center">
    {loading?
       <SkeletonLoader className="h-[60vh] w-full bg-gray-700"/>:
        
        error?
      <div className="flex flex-col items-center w-full bg-[#09090f] p-8 rounded-md">
          <p className="w-full text-center text-gray-700">{error}</p> 
        </div>:
      <ReactECharts
          option={option}
          style={{ height: "60vh", width: "100%" }}
          notMerge={true}
          lazyUpdate={true}
        />}
      </div>
      <h2 className={`text-2xl font-bold text-center mt-4 text-white ${poppins.className}`}>
        Debt Analysis
      </h2>
      <h2 className={`text-lg text-center text-white ${poppins.className}`}>
        ({symbol ?? "N/A"})
      </h2>
    </div>
  );
};

export default DebtAnalysis;
