 
"use client";
import React from "react";
import ReactECharts from "echarts-for-react";

const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

const getColor = (change: number) => {
  if (change > 0) {
    const lightness = clamp(30 - change * 5, 15, 30);
    return `hsl(140, 70%, ${lightness}%)`;
  } else if (change < 0) {
    const lightness = clamp(30 + change * 5, 15, 30);
    return `hsl(0, 70%, ${lightness}%)`;
  } else {
    return "#888888";
  }
};

const convertToTreemap = (stocks: any[]) =>
  stocks.map(stock => ({
    name: stock.name,
    value: stock.value,
    itemStyle: { color: getColor(stock.change) },
    label: { formatter: stock.name }
  }));

const SectorHeatmap = ({ title, children }: { title: string; children: any[] }) => {
  const option = {
    title: {
      text: title,
      left: "center",
      top: 10,
      textStyle: { color: "#fff" }
    },
    tooltip: {
      formatter: (info: any) => `${info.name}<br/>Market Cap: ${info.value}`
    },
    series: [
      {
       type: "treemap",
    data: convertToTreemap(children),
    roam: false,
    nodeClick: false,
    breadcrumb: { show: false },
    label: {
      show: true,
      color: "#fff",
      fontSize: 12,
      formatter: "{b}",
    },
    upperLabel: { show: false }, // hide non-leaf labels
    leafDepth: 2, // ensures children expand properly
    padding: 0, 
      }
    ],
    backgroundColor: "transparent"
  };

  return (
    <div className="w-full h-full rounded-md bg-[#1f1f2e]">
      <ReactECharts
        option={option}
        style={{ padding:'0',width: "100%", height: "100%" }}
      />
    </div>
  );
};


const data1 = [
  {
    name: "Technology",
    children: [
      {
        name: "Software - Infrastructure",
        children: [
          { name: "MSFT +0.45%", value: 150, change: 0.45 },
          { name: "ORCL +0.32%", value: 100, change: 0.32 },
          { name: "CRM -0.20%", value: 50, change: -0.2 },
          { name: "NOW +0.78%", value: 60, change: 0.78 },
          { name: "WDAY -0.15%", value: 30, change: -0.15 },
          { name: "SAP +0.60%", value: 9, change: 0.6 }
        ]
      },
      {
        name: "Consumer Electronics",
        children: [
          { name: "AAPL +0.55%", value: 180, change: 0.55 },
          { name: "SONY +0.28%", value: 95, change: 0.28 },
          { name: "SSNLF -0.40%", value: 100, change: -0.4 },
          { name: "GRMN +0.12%", value: 85, change: 0.12 },
          { name: "LPL -0.33%", value: 70, change: -0.33 },
          { name: "VIZIO +0.20%", value: 60, change: 0.2 }
        ]
      },
      {
        name: "Semiconductors",
        children: [
          { name: "NVDA -0.34%", value: 160, change: -0.34 },
          { name: "AMD +1.05%", value: 140, change: 1.05 },
          { name: "INTC -0.87%", value: 120, change: -0.87 },
          { name: "AVGO +0.67%", value: 130, change: 0.67 },
          { name: "QCOM +1.44%", value: 125, change: 1.44 },
          { name: "TXN -0.50%", value: 100, change: -0.5 }
        ]
      },
      {
        name: "Electronic Components",
        children: [
          { name: "ADI +0.50%", value: 110, change: 0.5 },
          { name: "MCHP +0.40%", value: 90, change: 0.4 },
          { name: "ON -0.45%", value: 95, change: -0.45 },
          { name: "STM +0.20%", value: 85, change: 0.2 },
          { name: "NXPI -0.10%", value: 105, change: -0.1 },
          { name: "MPWR +0.30%", value: 80, change: 0.3 }
        ]
      },
      {
        name: "Scientific & Technical Instruments",
        children: [
          { name: "KEYS +0.25%", value: 90, change: 0.25 },
          { name: "FLIR -0.10%", value: 70, change: -0.1 },
          { name: "TER +0.45%", value: 75, change: 0.45 },
          { name: "A +0.65%", value: 85, change: 0.65 },
          { name: "IIVI +0.30%", value: 80, change: 0.3 },
          { name: "COHR -0.15%", value: 78, change: -0.15 }
        ]
      },
      {
        name: "Software - Application",
        children: [
          { name: "ADBE +1.12%", value: 140, change: 1.12 },
          { name: "INTU +0.85%", value: 125, change: 0.85 },
          { name: "TEAM -0.40%", value: 95, change: -0.4 },
          { name: "DOCU +0.55%", value: 90, change: 0.55 },
          { name: "SQ -0.65%", value: 100, change: -0.65 },
          { name: "SNOW +0.90%", value: 115, change: 0.9 }
        ]
      },
      {
        name: "IT Services",
        children: [
          { name: "ACN +0.15%", value: 105, change: 0.15 },
          { name: "IBM --3.5%", value: 98, change: -3.5 },
          { name: "INFY +0.10%", value: 75, change: 0.1 },
          { name: "CTSH +0.35%", value: 80, change: 0.35 },
          { name: "DXC -0.55%", value: 70, change: -0.55 },
          { name: "GLOB +0.85%", value: 65, change: 0.85 }
        ]
      },
      {
        name: "Computer Hardware",
        children: [
          { name: "HPQ +0.72%", value: 90, change: 0.72 },
          { name: "DELL +1.03%", value: 110, change: 1.03 },
          { name: "ZBRA +0.10%", value: 85, change: 0.1 },
          { name: "LOGI +0.34%", value: 78, change: 0.34 },
          { name: "STX -0.45%", value: 95, change: -0.45 },
          { name: "WDC -0.38%", value: 88, change: -0.38 }
        ]
      },
      {
        name: "Semiconductor Materials",
        children: [
          { name: "ASML +0.65%", value: 130, change: 0.65 },
          { name: "AMAT -0.60%", value: 115, change: -0.6 },
          { name: "KLAC +0.75%", value: 105, change: 0.75 },
          { name: "LRCX -0.15%", value: 95, change: -0.15 },
          { name: "UCTT +0.50%", value: 80, change: 0.5 },
          { name: "AEHR +-3.5%", value: 70, change: -3.5 }
        ]
      },
      {
        name: "Communication Equipment",
        children: [
          { name: "CSCO -0.30%", value: 100, change: -0.3 },
          { name: "QCOM +1.44%", value: 125, change: 1.44 },
          { name: "JNPR +0.20%", value: 75, change: 0.2 },
          { name: "ERIC -0.25%", value: 80, change: -0.25 },
          { name: "NOK +0.10%", value: 70, change: 0.1 },
          { name: "VIAV +2.05%", value: 65, change: 2.05 }
        ]
      }
    ]
  }
];
export const MarketMapAll = () => {
  return (
    <div className="grid grid-cols-4 gap-0 w-full h-full">
      {data1[0].children.map((sub: any, i: number) => (
        <div key={i} className="w-full h-[400px] p-2">
          <SectorHeatmap title={sub.name} children={sub.children} />
        </div>
      ))}
    </div>
  );
};
