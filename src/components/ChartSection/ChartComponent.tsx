"use client";
import React from "react";
import ReactECharts from "echarts-for-react";
import { emaChartData } from "@/global/chartConstants"; // adjust the import path as needed
import { poppins } from "@/fonts/fonts";

const ChartComponent = () => {
  const data = emaChartData["ema-chart-data"].result.reverse(); // Oldest to newest

  const dates = data.map((item) => item.date);
  const candlestickData = data.map((item) => [
    +item.open,
    +item.close,
    +item.low,
    +item.high,
  ]);
 const dottedLineData = [];

 
const avgBase = data.reduce((sum, d) => sum + (+d.low + +d.high) / 2, 0) / data.length;
let prev = avgBase + (Math.random() - 0.5); // small random start offset

for (let i = 0; i < data.length; i++) {
  const step = (Math.random() - 0.5) * 0.4; // max ±0.2 change
  prev += step;
  dottedLineData.push(+prev.toFixed(2));
}

  const emaData = data.map((item) => +item.ema);

  const option = {
    legend: {
      data: ["Price", "Intrinsic Value"],
      inactiveColor: "#777",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        animation: false,
        lineStyle: {
          color: "#376df4",
          width: 2,
          opacity: 1,
        },
      },
    },
    xAxis: {
      type: "category",
      data: dates,
      scale: true,
      boundaryGap: false,
      axisLine: { lineStyle: { color: "#8392A5" } },
    },
    yAxis: {
      scale: true,
      axisLine: { lineStyle: { color: "#8392A5" } },
      splitLine: { show: false },
    },
    dataZoom: [
      {
        type: "slider",
        start: 0,
        end: 100,
        height: 30,
        bottom: 20,
        handleSize: "100%",
        handleStyle: {
          color: "#376df4",
        },
        textStyle: {
          color: "#8392A5",
        },
      },
      {
        type: "inside",
      },
    ],
    grid: {
      left: "3%",
      right: "4%",
      top: 40,
      bottom: 80,
      containLabel: true,
    },
    series: [
    {
      name: "Price",
      type: "candlestick",
      data: candlestickData,
      itemStyle: {
        color: "#f87171",
        color0: "#4ade80",
        borderColor: "#f87171",
        borderColor0: "#4ade80",
      },
    },
    {
      name: "Intrinsic Value", // Updated from "Random Line"
 
      type: "line",
      data: dottedLineData,
      smooth: true,
      showSymbol: false,
      lineStyle: {
        width: 2,
        color: "#ffffff", // white
        type: "dotted",
        opacity: 0.7,
      },
      emphasis: {
        focus: "series",
      },
      z: 10, // ensure it's drawn on top
    },
  ],
    backgroundColor: "#13131f",
  };

  return (
    <div className="w-full mx-auto flex flex-col items-center">
      <div className="  w-full rounded-2xl p-2 flex flex-col items-center shadow-md">
        <ReactECharts
          option={option}
          style={{ height: "75vh", width: "100%" }}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
      <h2
        className={`text-2xl font-bold text-center mt-4 text-white ${poppins.className}`}
      >
        Price with EMA
      </h2>
      <h2
        className={`text-xl font-semibold text-center text-white ${poppins.className}`}
      >
        ({data[0].date.split(" ")[0]})
      </h2>
    </div>
  );
};

export default ChartComponent;
