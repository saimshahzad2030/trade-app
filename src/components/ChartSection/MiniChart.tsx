"use client";
import React from "react";
import ReactECharts from "echarts-for-react";
import { MiniChartProps } from "@/types/PropTypes";
const MiniChart: React.FC<MiniChartProps> = ({ symbol, data, x, y }) => {
  const option = {
    grid: { left: 10, right: 10, top: 10, bottom: 20 },
    xAxis: {
      type: "category",
      show: false,
      data: data.map((_, i) => i)
    },
    yAxis: {
      type: "value",
      show: false
    },
    series: [
      {
        data,
        type: "line",
        smooth: true,
        symbol: "none",
        lineStyle: {
          color: "#00e676",
          width: 2
        },
        areaStyle: {
          color: "rgba(0, 230, 118, 0.2)"
        }
      }
    ]
  };

  return (
    <div
      className="absolute z-50 bg-[#1f1f2e] p-2 border border-gray-600 rounded shadow-lg"
      style={{
        left: x + 20,
        top: y - 60,
        width: 200,
        height: 120
      }}
    >
      <div className="text-xs text-white mb-1">{symbol} – 1 Day</div>
      <ReactECharts option={option} style={{ height: 80, width: "100%" }} />
    </div>
  );
};

export default MiniChart;
