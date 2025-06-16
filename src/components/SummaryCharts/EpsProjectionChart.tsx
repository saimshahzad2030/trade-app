"use client";
import React from "react";
import ReactECharts from "echarts-for-react";
import { eps } from "@/global/chartConstants";
import { poppins } from "@/fonts/fonts";

const EPSProjectionChart = () => {
  // Sort ascending by year
  const sortedData = [...eps.eps_projection.result].sort(
    (a, b) => +a.year - +b.year
  );

  const years = sortedData.map((item) => item.year);
  const historicalData = sortedData.map((item) =>
    +item.year <= 2025 ? item.epsAvg : null
  );
  const forecastedData = sortedData.map((item) =>
    +item.year > 2025 ? item.epsAvg : null
  );

// import * as echarts from "echarts"; // make sure to import this at the top

const option = {
  title: {
    text: "EPS Projection (2020–2029)",
    left: "center",
    top: 10,
    textStyle: {
      fontFamily: poppins.className,
      fontSize: 18,
      color: "#ffffff",
    },
  },
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "shadow" },
    backgroundColor: "rgba(0,0,0,0.7)",
    textStyle: {
      color: "#fff",
    },
    formatter: (params: any) => {
      return params
        .map(
          (p: any) =>
            `${p.marker} ${p.seriesName}: <strong>$${p.value?.toFixed(2) ?? "-"}</strong>`
        )
        .join("<br/>");
    },
  },
  legend: {
    data: ["Historical EPS", "Forecasted EPS", "EPS Line"],
    top: 40,
    textStyle: {
      color: "#ffffff",
    },
  },
  xAxis: {
    type: "category",
    data: years,
    axisLabel: {
      rotate: 45,
      color: "#ffffff",
    },
    axisLine: {
      lineStyle: { color: "#ffffff" },
    },
  },
  yAxis: {
    type: "value",
    name: "EPS ($)",
    axisLabel: {
      formatter: "${value}",
      color: "#ffffff",
    },
    splitLine: {
      lineStyle: {
        type: "dashed",
        color: "#2c3e50",
      },
    },
    axisLine: {
      lineStyle: { color: "#ffffff" },
    },
  },
  series: [
  {
    name: "Historical EPS",
    type: "bar",
    data: historicalData,
    barGap: 0,
    itemStyle: {
      color: "#6ba3be",
    },
  },
  {
    name: "Forecasted EPS",
    type: "bar",
    data: forecastedData,
    barCategoryGap: "0%", // prevents category spacing

    barGap: 0,
    itemStyle: {
      color: "#0A7075",
    },
  },
  {
    name: "EPS Line (Historical)",
    type: "line",
    data: sortedData.map((item) =>
      +item.year <= 2025 ? item.epsAvg : null
    ),
     smooth: true,
    symbol: "circle",
    symbolSize: 8,
    lineStyle: {
      color: "#ffffff",
      width: 2,
    },
    itemStyle: {
      color: "#ffffff",
    },
    emphasis: {
      focus: "series",
    },
  },
  {
    name: "EPS Line (Forecasted)",
    type: "line",
     smooth: true,
    data: sortedData.map((item) =>
      +item.year > 2025 ? item.epsAvg : null
    ),
    symbol: "circle",
    symbolSize: 8,
    lineStyle: {
      color: "#ffffff",
      width: 2,
      type: "dashed", // optional for forecasted
    },
    itemStyle: {
      color: "#ffffff",
    },
    emphasis: {
      focus: "series",
    },
  },
],
  grid: {
    left: "10%",
    right: "10%",
    bottom: "15%",
  },
  backgroundColor: "#13131f",
};

  return (
    <div className="w-full col-span-2 flex flex-col items-center">
      <div className=" w-full rounded-2xl ">
        <ReactECharts
          option={option}
          style={{ height: "60vh", width: "100%" }}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
    </div>
  );
};

export default EPSProjectionChart;
