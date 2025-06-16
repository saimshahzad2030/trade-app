"use client";
import React from "react";
import ReactECharts from "echarts-for-react";
import { ownershipStructureChartData } from "@/global/chartConstants";
import { poppins } from "@/fonts/fonts";

const OwnershipStructure = () => {
  const data =
    ownershipStructureChartData.ownership_structure_chart_data.result;

  const option = {
    color: ["#0c969C", "#0A7075"],
    tooltip: {
      trigger: "item",
      formatter: (params: any) =>
        `${params.name}: ${params.value}% (${params.percent}%)`,
    },
    legend: {
      orient: "vertical",
      left: "left",
      textStyle: { color: "#ffffff" }, 
    },
    series: [
      {
        name: "Ownership Structure",
        type: "pie",
        radius: "60%",
        center: ["50%", "60%"],
        data: [
          {
            name: "Free Float Shares",
            value: data.freeFloatPercentage,
          },
          {
            name: "Closely Held Shares",
            value: data.closelyHeldPercentage,
          },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        label: {
          formatter: "{b}: {d}%",
        },
      },
    ],
    backgroundColor: "#13131f",
  };

  return (
    <div className="w-full col-span-2 flex flex-col items-center">
      <div className="bg-[#13131f] w-full rounded-2xl p-4 flex flex-col items-center">
        <ReactECharts
          option={option}
          style={{ height: "60vh", width: "100%" }}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
      <h2
        className={`text-2xl font-bold text-center mt-4 text-white ${poppins.className}`}
      >
        Ownership Structure
      </h2>
      <h2 className={`text-lg text-center text-white ${poppins.className}`}>
        ({data.symbol})
      </h2>
    </div>
  );
};

export default OwnershipStructure;
