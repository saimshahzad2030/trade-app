import React from "react";
import ReactECharts from "echarts-for-react";

const SubChart4 = () => {
  const timeLabels = [
    "2023-Q1", "2023-Q2", "2023-Q3", "2023-Q4",
    "2024-Q1", "2024-Q2", "2024-Q3", "2024-Q4"
  ];

  // Generate zigzag EPS data for 30 companies
  const companySeries = Array.from({ length: 30 }, (_, i) => ({
    name: `Company ${i + 1}`,
    type: "line",
    data: timeLabels.map(() =>
      +(0.5 + Math.random() * 5).toFixed(2) // EPS values between 0.5 and 5.5
    ),
    lineStyle: {
      width: 1,
      opacity: 0.1
    },
    showSymbol: false,
    emphasis: {
      lineStyle: { width: 2 }
    }
  }));

  // Simulated industry average EPS (smoother line)
  const avgEPS = [2.1, 2.4, 2.3, 2.7, 2.9, 3.0, 3.2, 3.5];

  const option = {
    title: {
      text: "EPS Trends Over Time",
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
      data: ["EPS Overtime"],
      top: 10,
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
      name: "EPS ($)",
      min: 0,
      max: 6,
      axisLine: { lineStyle: { color: "#888" } },
      axisLabel: { color: "white" },
      splitLine: { lineStyle: { color: "#eee" } }
    },
    series: [
      ...companySeries,
      {
        name: "EPS Overtime",
        type: "line",
        data: avgEPS,
        smooth: true,
        lineStyle: {
          width: 3,
          type: "dashed",
          color: "#2196f3"
        },
        symbol: "circle",
        symbolSize: 6,
        itemStyle: {
          color: "#2196f3"
        }
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

export default SubChart4;
