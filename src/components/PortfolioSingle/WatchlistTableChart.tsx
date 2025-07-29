"use client";
import React from "react";
import { companyData } from "@/types/types";
import {appleData1d, CompanyData1 } from "@/global/constants";
import ReactECharts from "echarts-for-react";
import { color } from "echarts";
type props={
 data: Array<{
    date: string;
    price: number;
  }>; 
}
const WatchlistTableChart = ({data}:props) => {
  const timestamps = data.map((point) =>
    new Date(point.date).toLocaleTimeString()
  );

  const prices = data.map((point) => point.price);
  const validPrices = prices.filter((p) => p != null);
  const minPrice = Math.min(...validPrices);

  const getChartOptions = () => ({
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: timestamps,
      axisLabel: { show: false },
      axisTick: { show: false },
      axisLine: { show: false },
    },
    yAxis: {
      type: "value",
      min: minPrice,
      axisLabel: { show: false },
      axisTick: { show: false },
      axisLine: { show: false },
      splitLine: { show: false },
    },
    series: [
      {
        color: "#0A7075",
        data: prices,
        type: "line",
        smooth: true,
        showSymbol: false,
      },
    ],
    grid: {
      top: 2,
      bottom: 2,
      left: 2,
      right: 2,
    },
  });

  return (
    <div className="flex flex-col items-center h-auto mr-4">
      <div className="w-full h-[40px]">
        <ReactECharts
          option={getChartOptions()}
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </div>
    </div>
  );
};

export default WatchlistTableChart;
