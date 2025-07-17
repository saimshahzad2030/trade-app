"use client"
import React from "react";
import ReactECharts from "echarts-for-react";

// Utility to generate color palette
const generateColorPalette = (count: number): string[] => {
  const hues = Array.from({ length: count }, (_, i) => (i * 360) / count);
  return hues.map(h => `hsl(${h}, 70%, 60%)`);
};

const SubChart1 = () => {
  const timeLabels = [
    "2023-04", "2023-07", "2023-10", "2024-01",
    "2024-04", "2024-07", "2024-10", "2025-01"
  ];

  const industryAvgBeta = [1.55, 1.6, 1.63, 1.65, 1.66, 1.65, 1.63, 1.6];

  const companyCount = 20;
  const companyNames = Array.from({ length: companyCount }, (_, i) => `Company ${i + 1}`);
  const colors = generateColorPalette(companyCount);

  // Generate scatter data per company
  const scatterSeries = companyNames.map((company, index) => ({
    name: company,
    type: "scatter",
    data: timeLabels.map(label => [label, +(1 + Math.random() * 1.5).toFixed(2)]),
    symbolSize: 6,
    itemStyle: {
      color: colors[index]
    }
  }));

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
      trigger: "item", // show each dot info
      formatter: (params: any) => {
        return `
          <strong>${params.seriesName}</strong><br/>
          Date: ${params.data[0]}<br/>
          Beta: ${params.data[1]}
        `;
      }
    },
    legend: {
      data: ["Industry Avg Beta", ...companyNames],
      type: "scroll",
      top: 10,
      textStyle: {
        color: "#ffffff"
      },
      pageIconColor: "#ffffff"
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
      ...scatterSeries // spread each company scatter series
    ],
    backgroundColor: "#1f1f2e"
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#1f1f2e" }} className="rounded-md">
      <ReactECharts option={option} style={{ height: "500px", width: "100%" }} />
    </div>
  );
};

export default SubChart1;
