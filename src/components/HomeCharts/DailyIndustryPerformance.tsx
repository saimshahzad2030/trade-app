"use client";
import React from "react";
import ReactECharts from "echarts-for-react";
import { dailyIndustryPerformance } from "@/global/constants";
import { poppins } from "@/fonts/fonts";
import { dailyIndustoryPerformanceResponse } from "@/types/types";
import { getDailyIndustryPerformance } from "@/services/stocks.services";
import RoundLoader from "../Loader/RoundLoader";

// Group industries

 
const DailyIndustryPerformanceChart = () => {
  const [dailyData,setDailyData] = React.useState<dailyIndustoryPerformanceResponse|null>(null)
       const [loading,setLoading] = React.useState(false)
       const industries = Array.from(
  new Set(
    dailyData?.daily_industry_performance.result.map(
      (item) => item.industry
    )
  )
);
const exchanges = Array.from(
  new Set(
    dailyData?.daily_industry_performance.result.map(
      (item) => item.exchange
    )
  )
);

// Prepare series data
const series = exchanges.map((exchange) => {
  const data = industries.map((ind) => {
    const match =
      dailyData?.daily_industry_performance.result.find(
        (item) => item.industry === ind && item.exchange === exchange
      );
    return match ? parseFloat(match.averageChange.replace("%", "")) : 0;
  });
  return {
    name: exchange,
    type: "bar",
    data,
    barGap: 0,
    itemStyle: {
      color: (params: any) => (params.value >= 0 ? "#4ade80" : "#f87171"),
      borderRadius: (params: any) =>
        params.value >= 0 ? [6, 6, 0, 0] : [0, 0, 6, 6],
    },
  };
});

const option = {
  
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "shadow" },
    formatter: (params: any) => {
      const industry = params[0].axisValue;
      const rows = params
        .map(
          (p: any) =>
            `${p.seriesName}: ${p.value >= 0 ? "+" : ""}${p.value.toFixed(2)}%`
        )
        .join("<br/>");
      return `<strong>${industry}</strong><br/>${rows}`;
    },
  },
  legend: {
    top: 10,
    textStyle: { color: "white" },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: industries,
    axisLabel: {
      show: false, // Hide X axis labels
    },
    axisTick: { show: false },
    axisLine: { show: false },
  },
  yAxis: {
    type: "value",
    axisLabel: { formatter: "{value} %", color: "white" },
  },
  series,
  backgroundColor: "#0d0d14",
};
        React.useEffect(()=>{
          const fetchChartData = async()=>{
            setLoading(true)
            let response:{data:dailyIndustoryPerformanceResponse}  = await getDailyIndustryPerformance();
setLoading(false)
          setDailyData(response.data)
          }
          fetchChartData()
  
        },[])
  return (
    <div className="w-[48%]    flex flex-col items-center">
    <div className="min-h-[60vh] bg-[#0d0d14] w-full rounded-2xl p-2 flex flex-col items-center">
         {loading?
     <div className="flex flex-col items-center my-4">
      <RoundLoader/>
      </div>
        :<ReactECharts
          option={option}
          style={{ height: "60vh", width: "100%" }}
          notMerge={true}
          lazyUpdate={true}
        />
         }
      </div>
      {loading?
     <div className="flex flex-col items-center my-4">
      <RoundLoader/>
      </div>:
      <>
      {dailyData &&
       <h2
        className={`text-2xl font-bold text-center  mt-4 text-white ${poppins.className}`}
      >
        {`Industry Performance As of ${dailyData.daily_industry_performance.result[0].date}`}
      </h2>}</>}
     
    </div>
  );
};

export default DailyIndustryPerformanceChart;
