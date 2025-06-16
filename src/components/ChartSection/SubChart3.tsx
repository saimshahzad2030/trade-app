import React from "react";
import ReactECharts from "echarts-for-react";

const SubChart3 = () => {
  const timeLabels = [
    "2023-01", "2023-03", "2023-05", "2023-07",
    "2023-09", "2023-11", "2024-01", "2024-03"
  ];
 const companySeries = Array.from({ length: 30 }, (_, i) => ({
    name: `Company ${i + 1}`,
    type: "line",
    data: timeLabels.map(() =>
      +(1 + Math.random() * 10).toFixed(2) // PE values between 8 and 28
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
  // Simulated WACC data for industry average
  const avgWACC = [6.5, 6.8, 6.7, 7.0, 7.2, 6.9, 7.1, 7.3];

  const option = {
    title: {
      text: "WACC Trend Over Time",
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
      data: ["WACC Overtime"],
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
    //   name: "Quarter",
      boundaryGap: false,
      data: timeLabels,
      axisLine: { lineStyle: { color: "#888" } },
      axisLabel: { color: "white" }
    },
    yAxis: {
      type: "value",
      name: "WACC (%)",
      min: 5,
      max: 9,
      axisLine: { lineStyle: { color: "#888" } },
      axisLabel: { color: "white" },
      splitLine: { lineStyle: { color: "#eee" } }
    },
    series: [
              ...companySeries,
      {
        name: "WACC Overtime",
        type: "line",
        data: avgWACC,
        smooth: true,
        lineStyle: {
          width: 3,
            type: "dashed",
          color: "#4caf50"
        },
        symbol: "circle",
        symbolSize: 6,
        itemStyle: {
          color: "#4caf50"
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

export default SubChart3;
