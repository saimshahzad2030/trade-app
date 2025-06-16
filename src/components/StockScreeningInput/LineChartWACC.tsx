"use client"
import React from "react";
import ReactECharts from "echarts-for-react";

const LineChartWACC = () => {
  const years = ["2020", "2021", "2022", "2023", "2024"];

  // Dummy WACC data (in %)
  const stockWACCData = {
    AAPL: [8.5, 8.3, 8.1, 8.0, 7.8],
    MSFT: [7.5, 7.3, 7.2, 7.0, 6.9],
    GOOGL: [9.0, 8.8, 8.6, 8.5, 8.4],
    AMZN: [10.0, 9.8, 9.5, 9.2, 9.0],
    TSLA: [12.0, 11.5, 11.0, 10.5, 10.0],
  };

  const stockColors = {
    AAPL: "#ff7c7c",
    MSFT: "#7cafff",
    GOOGL: "#7cffd1",
    AMZN: "#ffd97c",
    TSLA: "#d07cff",
  };

  const series = Object.entries(stockWACCData).map(([name, data]) => ({
    name,
    data,
    type: "line",
    smooth: true,
    symbol: "none",
    lineStyle: {
      width: 3,
    },
    itemStyle: {
      color: stockColors[name as keyof typeof stockColors],
    },
  }));

  const option = {
    title: {
      text: "WACC Over Last 5 Years",
      left: "center",
      textStyle: {
        color: "white",
        fontSize: 20,
      },
      bottom: "0",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      top: "1%",
      textStyle: {
        color: "white",
      },
      data: Object.keys(stockWACCData),
    },
    grid: {
      left: "10%",
      right: "10%",
      bottom: "15%",
    },
    xAxis: {
      boundaryGap: false,
      lineStyle: {
        type: "dotted",
        width: 0.5,
        color: "#999",
      },
      type: "category",
      data: years,
    },
    yAxis: {
      min: Math.min(...Object.values(stockWACCData).flat()) - 1,
      splitLine: {
        lineStyle: {
          type: "dotted",
          width: 0.3,
          color: "#999",
        },
      },
      type: "value",
      name: "WACC (%)",
    },
    series,
  };

  return <div style={{ width: '100%', maxWidth: 900, margin: 'auto', backgroundColor: '#0d0d14', padding: 20, borderRadius: 8 }}>
    <ReactECharts option={option} style={{ height: "500px" }} /></div>
};

export default LineChartWACC;
