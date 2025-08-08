"use client";
import React from "react";
import ReactECharts from "echarts-for-react";
import { poppins } from "@/fonts/fonts";
import { getOwnershipStructureChart } from "@/services/stock.services";
import { OwnershipStructureChartData } from "@/types/componentTypes";
import SkeletonLoader from "../Loader/SkeletonLoader";

type ChartSectionProps = {
  symbol: string;
};

const OwnershipStructure = ({ symbol }: ChartSectionProps) => {
  const [chartData, setChartData] =
    React.useState<OwnershipStructureChartData | null>(null);
  const [chartDataLoading, setChartDataLoading] =
    React.useState<boolean>(false);

  const data = chartData?.ownership_structure_chart_data.result;

  const pieOption = {
    color: ["#0c969C", "#0A7075"],
    tooltip: {
      trigger: "item",
      formatter: (params: any) => {
        const shareCount =
          params.name === "Free Float Shares"
            ? data?.freefloatShares
            : data?.closelyHeldShares;
        return `${params.name}<br/>${params.percent}%<br/>${shareCount}`;
      },
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
            value: data?.freeFloatPercentage,
          },
          {
            name: "Closely Held Shares",
            value: data?.closelyHeldPercentage,
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

  React.useEffect(() => {
    const fetchChartData = async () => {
      setChartDataLoading(true);
      let response = await getOwnershipStructureChart(symbol);
      setChartDataLoading(false);
      setChartData(response.data);
    };
    fetchChartData();
  }, []);

  return (
    <div className="w-full col-span-2 flex flex-col items-center">
      {chartDataLoading?
       <SkeletonLoader className="h-[80vh] w-full bg-gray-700"/>:
       <>{
        chartData?.ownership_structure_chart_data.error!=null  ?
        <div className="flex flex-col items-center w-full bg-[#09090f] p-8 rounded-md">
          <p className="w-full text-center text-gray-700">{chartData?.ownership_structure_chart_data.error}</p>
         </div>:
      <>
       <div className="bg-[#13131f] w-full rounded-2xl p-4 flex flex-col items-center">
        <ReactECharts
          option={pieOption}
          style={{ height: "50vh", width: "100%" }}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
      <div className="bg-[#1e1e2f] w-full rounded-2xl p-4 mt-4 text-white text-center">
        <h3 className="text-lg font-semibold mb-2">Share Count Summary</h3>
        <p>
          <strong>Free Float Shares:</strong> {data?.freefloatShares}
        </p>
        <p>
          <strong>Closely Held Shares:</strong> {data?.closelyHeldShares}
        </p>
      </div></>
} </>
}
      

      <h2
        className={`text-2xl font-bold text-center mt-4 text-white ${poppins.className}`}
      >
        Ownership Structure
      </h2>
      <h2 className={`text-lg text-center text-white ${poppins.className}`}>
        ({symbol})
      </h2>
    </div>
  );
};

export default OwnershipStructure;
