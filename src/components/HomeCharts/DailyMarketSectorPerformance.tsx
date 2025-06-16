"use client";
import React from "react";
import ReactECharts from "echarts-for-react";
import { dailyMarketSectorPerformance } from "../../global/constants";
import { poppins } from "@/fonts/fonts";

const DailyMarketSectorPerformance = () => {
  const data =
    dailyMarketSectorPerformance.daily_market_sector_performance.result;

  const sectors = data.map((item) => item.sector);
  const changes = data.map((item) =>
    parseFloat(item.averageChange.replace("%", ""))
  );

  const option = {
    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        const val = params[0].value;
        return `${params[0].axisValue}<br/>Change: ${
          val > 0 ? "+" : ""
        }${val.toFixed(3)}%`;
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: sectors,
      axisLabel: { rotate: 45, color: "white" },
    },
    yAxis: {
      type: "value",
      axisLabel: { formatter: "{value} %", color: "white" },
    },
    series: [
      {
        name: "Avg Change",
        type: "bar",
        data: changes,
        itemStyle: {
          color: (params: any) => (params.value >= 0 ? "#4ade80" : "#f87171"),
          borderRadius: (params: any) =>
            params.value >= 0 ? [6, 6, 0, 0] : [0, 0, 6, 6],
        },
        barWidth: "60%",
      },
    ],
    backgroundColor: "#0d0d14",
  };

  return (
    <div className="   w-[48%]    flex flex-col items-center">
      <div className="bg-[#0d0d14] w-full rounded-2xl p-2 flex flex-col items-center">
        <ReactECharts
          option={option}
          style={{ height: "60vh", width: "100%" }}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>

      <h2
        className={`text-2xl font-bold text-center  mt-4 text-white ${poppins.className}`}
      >
        {`Sector Performance As of ${dailyMarketSectorPerformance.daily_market_sector_performance.result[0].date}`}
      </h2>
    </div>
  );
};

export default DailyMarketSectorPerformance;
