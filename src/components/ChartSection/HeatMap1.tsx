import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const mockData = [
  { name: "AAPL", value: 2.1, sector: "Technology" },
  { name: "MSFT", value: 1.5, sector: "Technology" },
  { name: "GOOGL", value: -0.6, sector: "Technology" },
  { name: "AMZN", value: 1.2, sector: "Consumer" },
  { name: "TSLA", value: -3.4, sector: "Auto" },
  { name: "JPM", value: 0.8, sector: "Financial" },
  { name: "NVDA", value: 4.6, sector: "Technology" },
  { name: "WMT", value: 0.5, sector: "Consumer" },
  { name: "F", value: -1.2, sector: "Auto" },
  { name: "BAC", value: -0.3, sector: "Financial" },
];

const HeatMap1 = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const grouped = mockData.reduce((acc, item) => {
        if (!acc[item.sector]) acc[item.sector] = [];
        acc[item.sector].push(item);
        return acc;
      }, {} as Record<string, typeof mockData>);

      const seriesData = Object.entries(grouped).map(([sector, companies]) => ({
        name: sector,
        children: companies.map((comp) => ({
          name: comp.name,
          value: Math.abs(comp.value),
          change: comp.value,
        })),
      }));

      chart.setOption({
        title: {
          text: "Company Performance Heat Map",
          left: "center",
          textStyle: { color: "#fff" },
        },
        tooltip: {
          formatter: (info: any) => {
            const { name, change } = info.data;
            return `<b>${name}</b><br/>Change: ${change}%`;
          },
        },
        series: [
          {
            type: "treemap",
            data: seriesData,
            label: {
              show: true,
              formatter: "{b}",
              color: "#fff",
            },
            upperLabel: {
              show: true,
              height: 20,
              color: "#fff",
            },
            levels: [
              {
                itemStyle: {
                  borderColor: "#333",
                  borderWidth: 1,
                  gapWidth: 3,
                },
              },
              {
                colorMappingBy: "value",
                itemStyle: {
                  borderColorSaturation: 0.6,
                  gapWidth: 1,
                  borderWidth: 1,
                },
              },
            ],
            color: ["#d32f2f", "#f44336", "#81c784", "#4caf50", "#2e7d32"],
            visualMin: 0,
            visualMax: 5,
            visualDimension: 2,
          },
        ],
        backgroundColor: "#1f1f2e",
      });

      window.addEventListener("resize", () => chart.resize());
    }
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: 500 }} />;
};

export default HeatMap1;
