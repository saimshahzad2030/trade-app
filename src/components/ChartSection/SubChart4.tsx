import React from "react";
import ReactECharts from "echarts-for-react";

// Generate distinct colors using HSL
const generateColorPalette = (count: number): string[] => {
  const hues = Array.from({ length: count }, (_, i) => (i * 360) / count);
  return hues.map(h => `hsl(${h}, 70%, 60%)`);
};

const SubChart4 = () => {
  const timeLabels = [
    "2023-Q1", "2023-Q2", "2023-Q3", "2023-Q4",
    "2024-Q1", "2024-Q2", "2024-Q3", "2024-Q4"
  ];

  const companyCount = 30;
  const companyNames = Array.from({ length: companyCount }, (_, i) => `Company ${i + 1}`);
  const colors = generateColorPalette(companyCount);

  const companySeries = companyNames.map((name, index) => ({
    name,
    type: "line",
    data: timeLabels.map(() => +(0.5 + Math.random() * 5).toFixed(2)), // EPS values between 0.5 and 5.5
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
      trigger: "item",
      formatter: (params: any) => `
        <strong>${params.seriesName}</strong><br/>
        Quarter: ${params.name}<br/>
        EPS: $${params.value}
      `
    },
    legend: {
      type: "scroll",
      data: [...companyNames, "EPS Overtime"],
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
        },
        z: 10
      }
    ],
    backgroundColor: "#1f1f2e"
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#1f1f2e" }}>
      <ReactECharts option={option} style={{ height: "450px", width: "100%" }} />
    </div>
  );
};

export default SubChart4;
