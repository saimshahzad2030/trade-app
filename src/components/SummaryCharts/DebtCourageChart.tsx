"use client";
import React from "react";
import ReactECharts from "echarts-for-react";
import { poppins } from "@/fonts/fonts";
import { FinancialPositionData } from "@/types/types";
import RoundLoader from "../Loader/RoundLoader";
import SkeletonLoader from "../Loader/SkeletonLoader";
import { DebtAnalysisProps2 } from "@/types/types";
import { UnitType } from "@/types/types";

const detectUnit = (value: string): UnitType => {
  if (value.endsWith("B")) return "B";
  if (value.endsWith("M")) return "M";
  return "RAW";
};

const parseAmount = (value: string): number => {
  if (value.endsWith("B")) return parseFloat(value.replace("B", "")) * 1_000_000_000;
  if (value.endsWith("M")) return parseFloat(value.replace("M", "")) * 1_000_000;
  return parseFloat(value);
};

const DebtCourageChart: React.FC<DebtAnalysisProps2> = ({ data, loading,error }) => {
  const result = data;

  // Detect unit based on the first defined value in dataset
  const sampleValue =
    result?.annual?.shortTerm?.totalCurrentAssets ||
    result?.annual?.shortTerm?.totalCurrentLiabilities ||
    result?.annual?.longTerm?.totalNonCurrentAssets ||
    result?.annual?.longTerm?.totalCurrentLiabilities ||
    "0";

  const unitType: UnitType = detectUnit(sampleValue);

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

  const chartData = [
    ["Type", "Total Assets", "Total Liabilities"],
    [
      "Annual - Short Term",
      parseAmount(result?.annual?.shortTerm?.totalCurrentAssets ?? "0"),
      parseAmount(result?.annual?.shortTerm?.totalCurrentLiabilities ?? "0"),
    ],
    [
      "Annual - Long Term",
      parseAmount(result?.annual?.longTerm?.totalNonCurrentAssets ?? "0"),
      parseAmount(result?.annual?.longTerm?.totalCurrentLiabilities ?? "0"),
    ],
  ];

  const option = {
    color: ["#0c969C", "#0A7075"],
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
    series: [{ type: "bar" }, { type: "bar" }],
    backgroundColor: "#13131f",
  };

  return (
    <div className="w-full col-span-2 flex flex-col items-center">
      <div className="bg-[#13131f] w-full rounded-2xl p-4 flex flex-col items-center">
       {loading?
       <SkeletonLoader className="h-[60vh] w-full bg-gray-700"/>:
        error?
             <p className="text-gray-600">{error}</p>:
            <ReactECharts
          option={option}
          style={{ height: "60vh", width: "100%" }}
          notMerge={true}
          lazyUpdate={true}
        />
        }
      </div>
      <h2
        className={`text-2xl font-bold text-center mt-4 text-white ${poppins.className}`}
      >
        Growth & Profitability
      </h2>
      <h2 className={`text-lg text-center text-white ${poppins.className}`}>
        ({result?.symbol ?? "N/A"})
      </h2>
    </div>
  );
};

export default DebtCourageChart;
