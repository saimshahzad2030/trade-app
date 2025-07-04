import React from "react";
import ReactECharts from "echarts-for-react";

// Generate distinct colors using HSL
const generateColorPalette = (count: number): string[] => {
  const hues = Array.from({ length: count }, (_, i) => (i * 360) / count);
  return hues.map(h => `hsl(${h}, 70%, 60%)`);
};

const SubChart5 = () => {
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
    data: timeLabels.map(() =>
      +(Math.random() * 30 - 5).toFixed(2) // Revenue growth from -5% to +25%
    ),
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
        opacity: 0.9,
      }
    }
  }));

  const avgRevenueGrowth = [5.2, 6.3, 7.1, 6.8, 7.5, 8.0, 8.2, 8.5];

  const option = {
    title: {
      text: "Revenue Growth Trends Over Time - Auto & Truck Companies",
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
        Growth: ${params.value}%
      `
    },
    legend: {
      type: "scroll",
      data: [...companyNames, "Revenue Growth Overtime"],
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
      name: "Revenue Growth (%)",
      min: -10,
      max: 30,
      axisLine: { lineStyle: { color: "#888" } },
      axisLabel: {
        color: "white",
        formatter: "{value}%"
      },
      splitLine: { lineStyle: { color: "#eee" } }
    },
    series: [
      ...companySeries,
      {
        name: "Revenue Growth Overtime",
        type: "line",
        data: avgRevenueGrowth,
        smooth: true,
        lineStyle: {
          width: 3,
          type: "dashed",
          color: "#ff9800"
        },
        symbol: "circle",
        symbolSize: 6,
        itemStyle: {
          color: "#ff9800"
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

export default SubChart5;
