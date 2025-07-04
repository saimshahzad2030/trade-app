"use client";
import React from "react";
import ReactECharts from "echarts-for-react";
import { emaChartData } from "@/global/chartConstants"; // adjust the import path as needed
import { poppins } from "@/fonts/fonts";

const ChartComponent = () => {
const data = emaChartData["ema-chart-data"].result.reverse(); // Oldest to newest

const dates = data.map((item) => item.date);

const candlestickData: [number, number, number, number][] = data.map((item) => [
  +item.open,
  +item.close,
  +item.low,
  +item.high,
]);

const emaData = data.map((item) => +item.ema);

let dottedLineData: number[] = [];

const avgBase = data.reduce((sum, d) => sum + (+d.low + +d.high) / 2, 0) / data.length;
let prev = avgBase + (Math.random() - 0.5);

for (let i = 0; i < data.length; i++) {
  const step = (Math.random() - 0.5) * 0.4;
  prev += step;
  dottedLineData.push(+prev.toFixed(2));
}

// ✅ Custom series render function to draw the area
const renderGreenArea = (params: any, api: any) => {
  const xValue = api.value(0);
  const y1Value = api.value(1); // intrinsic
  const y2Value = api.value(2); // mid price

  const x = api.coord([xValue, y1Value])[0];
  const y1 = api.coord([xValue, y1Value])[1];
  const y2 = api.coord([xValue, y2Value])[1];

  return {
    type: "polygon",
    shape: {
      points: [
        [x - 2, y1],
        [x + 2, y1],
        [x + 2, y2],
        [x - 2, y2],
      ],
    },
    style: {
   fill: y2 < y1 ? "rgba(93, 249, 150, 0.1)" : "rgba(255, 171, 171, 0.1)",
 stroke: "transparent",
    },
  };
};

// ✅ Final chart option
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
    // ✅ Custom fill area
    {
      type: "custom",
      name: "Intrinsic Fill",
      renderItem: renderGreenArea,
      encode: {
        x: 0,
        y: [1, 2],
      },
      data: data.map((item, i) => {
        const intrinsic = dottedLineData[i];
        const midPrice = (candlestickData[i][0] + candlestickData[i][1]) / 2;
        return [item.date, intrinsic, midPrice];
      }),
      z: 0,
    },

    // ✅ Candlestick chart
    {
      name: "Price",
      type: "candlestick",
      data: candlestickData,
      itemStyle: {
        color: "#f87171",      // red for up
        color0: "#4ade80",     // green for down
        borderColor: "#f87171",
        borderColor0: "#4ade80",
      },
      z: 2,
    },

    // ✅ Dotted line for intrinsic value
    {
      name: "Intrinsic Value",
      type: "line",
      data: dottedLineData,
      smooth: true,
      showSymbol: false,
      lineStyle: {
        width: 2,
        color: "#ffffff",
        type: "dotted",
        opacity: 0.7,
      },
      emphasis: {
        focus: "series",
      },
      z: 3,
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
