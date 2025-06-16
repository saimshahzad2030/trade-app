"use client";
import React from "react";
import { companyData } from "@/types/types";
import { appleData1y, appleData5d, appleData6m } from "@/global/constants";
import ReactECharts from "echarts-for-react";
import { color } from "echarts";
const WatchlistTableChart = () => {
  const companies = [appleData1y, appleData5d, appleData6m];
  const getChartOptions = (company: companyData, index: number) => {
    const chartData = company.chart.result[0];
    const timestamps = chartData.timestamp.map((ts) =>
      new Date(ts * 1000).toLocaleTimeString()
    );
    const prices = chartData.indicators.quote[0].close;
    const minPrice = Math.min(...prices.filter((p) => p != null)); // filter out nulls if any

    return {
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: timestamps,
        axisLabel: { show: false }, // ❌ hide X labels
        axisTick: { show: false }, // ❌ hide X ticks
        axisLine: { show: false }, // ❌ hide X line
      },
      yAxis: {
        type: "value",
        min: minPrice,
        axisLabel: { show: false }, // ❌ hide Y labels
        axisTick: { show: false }, // ❌ hide Y ticks
        axisLine: { show: false }, // ❌ hide Y line
        splitLine: { show: false }, // ❌ hide grid lines
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
    };
  };

  return (
    <div className="flex flex-col items-center h-auto mr-4">
      <div className="w-full h-[40px] ">
        <ReactECharts
          option={getChartOptions(appleData1y, 1)}
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
