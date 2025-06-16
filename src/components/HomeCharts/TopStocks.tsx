"use client";
import React from "react";
import ReactECharts from "echarts-for-react";
import { poppins } from "@/fonts/fonts";
import { topStocks } from "@/global/constants";
// Transform data for ECharts
const seriesData = topStocks.top_stocks.result.map((stock) => ({
  name: stock.symbol,
  value: stock.marketCap,
}));

const option = {
  tooltip: {
    trigger: "item",
    formatter: "{b}: ${c} ({d}%)",
  },
  legend: {
    top: "5%",
    left: "center",
    textStyle: {
      fontSize: 12,
    },
  },
  series: [
    {
      name: "Top Stocks",
      type: "pie",
      radius: ["20%", "50%"],
      avoidLabelOverlap: false,
      padAngle: 5,
      itemStyle: {
        borderRadius: 10,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 16,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: seriesData,
    },
  ],
};

const TopStocks = () => {
  return (
    <div className="col-span-2 w-full mt-4 flex flex-col items-center">
      <div className="bg-white w-full rounded-2xl p-4 shadow-md">
        <ReactECharts
          option={option}
          style={{ height: "40vh", width: "100%" }}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
      <h2
        className={`text-2xl font-bold text-center text-white mt-4 ${poppins.className}`}
      >
        Top 10 Stocks by Market Capitalization
      </h2>
    </div>
  );
};

export default TopStocks;
