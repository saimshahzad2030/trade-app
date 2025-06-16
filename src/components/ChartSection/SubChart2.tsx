import React from "react";
import ReactECharts from "echarts-for-react";

const SubChart2 = () => {
  const timeLabels = [
    "2023-05", "2023-07", "2023-09", "2023-11",
    "2024-01", "2024-03", "2024-05", "2024-07"
  ];

  // Simulate 30 company lines
  const companySeries = Array.from({ length: 30 }, (_, i) => ({
    name: `Company ${i + 1}`,
    type: "line",
    data: timeLabels.map(() =>
      +(8 + Math.random() * 20).toFixed(2) // PE values between 8 and 28
    ),
    lineStyle: {
      width: 1,
      opacity: 0.1,
    },
    showSymbol: false,
    emphasis: {
      lineStyle: { width: 2 }
    }
  }));
 
  const avgPE = [18, 18.2, 18.1, 17.9, 17.8, 18, 18.2, 18.5];

  const option = {
    title: {
      text: "PE Ratio Trends Over Time - Auto & Truck Companies",
      left: "center",
      bottom: 10,
      textStyle: {
        color: "white",
        fontSize: 14
      }
    },
    tooltip: {
      trigger: "axis"
    },
    legend: {
      data: ["Industry Avg PE"],
      top: 10,
    //   right: 10,
      textStyle: {
        color: "white"
      }
    },
    grid: {
      left: "5%",
      right: "5%",
       containLabel: true,
      top: "50",
      bottom: "60"
    },
    xAxis: {
      type: "category",
      name: "Quarter",
       boundaryGap: false,
      data: timeLabels,
      axisLine: { lineStyle: { color: "#888" } },
      axisLabel: { color: "white" }
    },
    yAxis: {
      type: "value",
      name: "PE Ratio",
      min: 7.5,
      max: 27.5,
      axisLine: { lineStyle: { color: "#888" } },
      axisLabel: { color: "white" },
      splitLine: { lineStyle: { color: "#eee" } }
    },
    series: [
      ...companySeries,
      {
        name: "Industry Avg PE",
        type: "line",
        data: avgPE,
        smooth: true,
        lineStyle: {
          width: 3,
          type: "dashed",
          color: "#d32f2f"
        },
        symbol: "none"
      }
    ],
    backgroundColor: "#1f1f2e"
  };

  return (
          <div style={{padding:20,  backgroundColor: "#1f1f2e"}}>
      <ReactECharts option={option} style={{ height: "450px", width: "100%" }} />
    </div>
  );
};

export default SubChart2;
