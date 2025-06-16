import React from "react";
import ReactECharts from "echarts-for-react";

const SubChart1 = () => {
  const timeLabels = [
    "2023-04", "2023-07", "2023-10", "2024-01",
    "2024-04", "2024-07", "2024-10", "2025-01"
  ];

  const industryAvgBeta = [1.55, 1.6, 1.63, 1.65, 1.66, 1.65, 1.63, 1.6];

  const scatterData = timeLabels.flatMap(label =>
    Array.from({ length: 20 }, () => [
      label,
      +(1 + Math.random() * 1.5).toFixed(2) // 1.00 to 2.50
    ])
  );

  const option = {
    title: {
      text: "Beta of Auto & Truck Companies Over Time vs. Industry Average",
      left: "center",
      bottom: 10,
      textStyle: {
        color: "#ffffff"
      }
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line"
      }
    },
    legend: {
      data: ["Industry Avg Beta"],
    //   right: 10,
      top: 10,
      textStyle: {
        color: "#ffffff"
      }
    },
    xAxis: {
      type: "category",
      data: timeLabels,
      axisLine: { lineStyle: { color: "#8392A5" } },
      axisLabel: { color: "#ffffff" }
    },
    yAxis: {
      type: "value",
      name: "Beta",
      min: 1.0,
      max: 2.5,
      axisLine: { lineStyle: { color: "#8392A5" } },
      axisLabel: { color: "#ffffff" },
      splitLine: { lineStyle: { color: "#333" } }
    },
    series: [
      {
        name: "Industry Avg Beta",
        type: "line",
        data: industryAvgBeta,
        smooth: true,
        lineStyle: {
          width: 3,
          color: "#3b82f6"
        },
        symbol: "circle",
        symbolSize: 6
      },
      {
        name: "Company Beta",
        type: "scatter",
        data: scatterData,
        symbolSize: 6,
        itemStyle: {
          color: "#999999"
        }
      }
    ],
    backgroundColor: "#1f1f2e"
  };

  return (
        <div style={{padding:20,  backgroundColor: "#1f1f2e"}}>
      <ReactECharts option={option} style={{ height: "400px", width: "100%" }} />
    </div>
  );
};

export default SubChart1;
