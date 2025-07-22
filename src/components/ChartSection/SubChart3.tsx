"use client"
import React from "react";
import ReactECharts from "echarts-for-react";

// Generate distinct colors using HSL
const generateColorPalette = (count: number): string[] => {
  const hues = Array.from({ length: count }, (_, i) => (i * 360) / count);
  return hues.map(h => `hsl(${h}, 70%, 60%)`);
};

const SubChart3 = () => {
  const timeLabels = [
    "2023-01", "2023-03", "2023-05", "2023-07",
    "2023-09", "2023-11", "2024-01", "2024-03"
  ];

  const companyCount = 30;
  const companyNames = Array.from({ length: companyCount }, (_, i) => `Company ${i + 1}`);
  const colors = generateColorPalette(companyCount);

  const companySeries = companyNames.map((name, index) => ({
    name,
    type: "line",
    data: timeLabels.map(() => +(1 + Math.random() * 10).toFixed(2)), // WACC 1–11%
    lineStyle: {
      width: 1,
      opacity: 0.05,
      color: colors[index],
    },
    symbol: "circle",
    symbolSize: 4,
    showSymbol: true,
    emphasis: {
      focus: "series",
      lineStyle: {
        width: 2,
        opacity: 0.9
      }
    }
  }));

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
      trigger: "item",
      formatter: (params: any) => {
        return `
          <strong>${params.seriesName}</strong><br/>
          Period: ${params.name}<br/>
          WACC: ${params.value}%
        `;
      }
    },
    legend: {
      type: "scroll",
      data: [...companyNames, "WACC Overtime"],
      top: 10,
      textStyle: {
        color: "white"
      },
      pageIconColor: "#ffffff"
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
      boundaryGap: false,
      data: timeLabels,
      axisLine: { lineStyle: { color: "#888" } },
      axisLabel: { color: "white" },
      splitLine: {
    show: false,
     
  }
    },
    yAxis: {
      type: "value",
      name: "WACC (%)",
      min: 5,
      max: 11,
      axisLine: { lineStyle: { color: "#888" } },
      axisLabel: { color: "white" },
      splitLine: {
    show: true,
    lineStyle: {
      color: "#aaa", // ⬅ lighter vertical grid lines
      width: 0.1
    }
  }
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
        },
        z: 10
      }
    ],
    backgroundColor: "#1f1f2e"
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#1f1f2e" }} className="rounded-md">
      <ReactECharts option={option} style={{ height: "450px", width: "100%" }} />
    </div>
  );
};

export default SubChart3;
