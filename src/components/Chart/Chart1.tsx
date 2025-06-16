"use client";
import React, { useRef } from "react";
import ReactECharts from "echarts-for-react";
import { Button } from "@/components/ui/button";
import { appleData1d, appleData5d } from "@/global/constants";
import { ZoomIn, RefreshCcw, Undo2, Download } from "lucide-react";
import CompanySummary from "./CompanySummary";
import CompanyDetails from "./CompanyDetailsSection";
import OwnershipStructure from "../SummaryCharts/OwnershipStructure";
import DebtCourageChart from "../SummaryCharts/DebtCourageChart";
import DebtAnalysis from "../SummaryCharts/DebtAnalysisChart";
import EPSProjectionChart from "../SummaryCharts/EpsProjectionChart";
const Chart1 = () => {
  const [activeRange, setActiveRange] = React.useState("1m");
  const ranges = ["5d", "1m", "6m", "ytd", "1y", "5y", "all"];
  const chartRef = useRef<ReactECharts | null>(null);
  const handleZoomIn = () => {
    if (chartRef.current) {
      const chart = chartRef.current.getEchartsInstance();
      chart.dispatchAction({
        type: "dataZoom",
        start: 10,
        end: 60,
      });
    }
  };

  const handleResetZoom = () => {
    if (chartRef.current) {
      const chart = chartRef.current.getEchartsInstance();
      chart.dispatchAction({
        type: "dataZoom",
        start: 0,
        end: 100,
      });
    }
  };

  const handleRestore = () => {
    if (chartRef.current) {
      const chart = chartRef.current.getEchartsInstance();
      chart.dispatchAction({
        type: "restore",
      });
    }
  };

  const handleSaveImage = () => {
    if (chartRef.current) {
      const chart = chartRef.current.getEchartsInstance();
      const dataURL = chart.getDataURL({
        type: "png",
        pixelRatio: 2,
        backgroundColor: "#fff",
      });
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "chart.png";
      link.click();
    }
  };

  // Prepare data for the chart
  const timestamps = appleData5d.chart.result[0].timestamp;
  const intrinsicValues  = appleData5d.chart.result[0].indicators.quote[0].intrinsic || [];
  const adjClosePrices =
    appleData5d.chart.result[0].indicators.adjclose[0].adjclose;
 const data = timestamps.map((timestamp, index) => [
  timestamp * 1000,
  adjClosePrices[index],
]);
const intrinsicData = timestamps.map((timestamp, index) => [
  timestamp * 1000,
  intrinsicValues[index],
]);

  const maxPrice = Math.max(...adjClosePrices);
  // Filter data based on activeRange
  const getFilteredData = () => {
    const now = new Date();
    let startDate;
    switch (activeRange) {
      // case "1d":
      //   startDate = new Date(now.setDate(now.getDate() - 1));
      //   break;
      case "5d":
        startDate = new Date(now.setDate(now.getDate() - 5));
        break;
      case "1mo":
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;

      case "6mo":
        startDate = new Date(now.setMonth(now.getMonth() - 6));
        break;
      case "1y":
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;

      case "5y":
        startDate = new Date(now.setFullYear(now.getFullYear() - 5));
        break;

      case "ytd":
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      case "all":
        return data; // Return all data
      default:
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
    }
    return data.filter(([timestamp]) => new Date(timestamp) >= startDate);
  };
  const filteredData = getFilteredData();
  const filteredMaxPrice = Math.max(...filteredData.map(([, price]) => price));
 
 const option = {
  tooltip: {
    trigger: "axis",
    position: function (pt: [number, number]): [number, string] {
      return [pt[0], "10%"];
    },
    formatter: function (params: { value: [string, number], seriesName: string }[]): string {
      const date = new Date(params[0].value[0]);
      let content = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}<br/>`;
      params.forEach(param => {
        content += `${param.seriesName}: $${param.value[1].toFixed(2)}<br/>`;
      });
      return content;
    },
  },
  xAxis: {
    type: "time",
    boundaryGap: false,
    position: "bottom",
    splitNumber: 5,
    axisLabel: {
      align: "bottom",
      formatter: (value: Date) => {
        const date = new Date(value);
        return `${date.getMonth() + 2}/${date.getDate()}/${date.getFullYear()}`;
      },
    },
  },
  yAxis: {
    type: "value",
    boundaryGap: [0, "100%"],
    position: "right",
    min: (value: { min: number }) => Math.floor(value.min - 10),
    max: (value: { max: number }) => Math.ceil(value.max + 10),
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(255, 255, 255, 0.1)",
        width: 0.5,
        type: "solid",
      },
    },
    axisLabel: {
      formatter: (value: Date) => `${value}`,
    },
  },
  series: [
    {
      name: "Apple Stock Price",
      type: "line",
      smooth: true,
      symbol: "none",
      areaStyle: {
        color: {
          type: "linear",
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(255, 255, 255, 0.2)" },
            { offset: 1, color: "rgba(255, 255, 255, 0)" },
          ],
        },
      },
      data: getFilteredData(),  // stock price data
      markLine: {
        silent: true,
        symbol: "none",
        label: {
          show: true,
          position: "end",
          formatter: `$${appleData5d.chart.result[0].meta.previousClose}`,
          color: "#ffffff",
        },
        lineStyle: {
          type: "dotted",
          color: "#ffffff99",
          width: 1,
        },
        data: [{ yAxis: appleData5d.chart.result[0].meta.previousClose }],
      },
    },
    {
      name: "Intrinsic Value",
      type: "line",
      smooth: true,
      symbol: "none",
      lineStyle: {
        color: "#FFD700", // gold/yellow color for intrinsic value
        width: 2,
      },
      data: intrinsicData, // intrinsic value data
    },
  ],
};

  return (
    <div className="w-full flex flex-row items-start justify-between px-8">
      <div className="w-9/12 flex flex-col items-center justify-start">
        <div className="w-full flex-col items-start text-white">
          <CompanyDetails />
          <div className="w-full flex flex-row items-center mt-4 px-8">
            <div className="w-9/12">
              {ranges.map((range) => (
                <Button
                  key={range}
                  variant="graphTab2"
                  size="mini"
                  onClick={() => setActiveRange(range)}
                  className={`mr-1  text-[var(--variant-4)] border hover:border-[var(--variant-3)] ${
                    activeRange === range
                      ? "  bg-[var(--variant-2)]/50   border-[var(--variant-3)]    "
                      : "text-[var(--variant-4)] border-l-transparent border-b-transparent border-r-transparent border-t-transparent hover:border-[var(--variant-3)] "
                  }  `}
                >
                  {range}
                </Button>
              ))}
            </div>
            <div className="w-4/12 flex flex-row items-center justify-end gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomIn}
                className="cursor-pointer hover:text-[var(--variant-4)]"
              >
                <ZoomIn className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleResetZoom}
                className="cursor-pointer hover:text-[var(--variant-4)]"
              >
                <RefreshCcw className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRestore}
                className="cursor-pointer hover:text-[var(--variant-4)]"
              >
                <Undo2 className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSaveImage}
                className="cursor-pointer hover:text-[var(--variant-4)]"
              >
                <Download className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <ReactECharts
          ref={chartRef}
          option={option}
          style={{ height: "60vh", width: "100%", marginRight: "20px" }}
          notMerge={true}
          lazyUpdate={true}
        />
        <CompanySummary
          companySummary={{
            name: `${appleData1d.chart.result[0].meta.longName} ${appleData1d.chart.result[0].meta.industry}`,
            description: appleData1d.chart.result[0].meta.description,
            fiscalYearEnds: appleData1d.chart.result[0].meta.fiscalYearEnds,
            currency: appleData1d.chart.result[0].meta.currency,
            exchangeName: appleData1d.chart.result[0].meta.exchangeName,
            sector: appleData1d.chart.result[0].meta.sector,
            industry: appleData1d.chart.result[0].meta.industry,
            website: appleData1d.chart.result[0].meta.website,
            employees: appleData1d.chart.result[0].meta.fullTimeEmployees,
          }}
        />
        <div className="grid grid-cols-4 w-full gap-4 mt-8">
          <div className="w-full col-span-4">
            <EPSProjectionChart />
          </div>
          <div className="col-span-2 w-full">
            <DebtAnalysis />
          </div>
          <div className="col-span-2 w-full">
            <DebtCourageChart />
          </div>
          <OwnershipStructure />
        </div>
      </div>

      <div className="w-3/12 flex flex-col items-center pl-4 py-4 text-white">
        <div className=" pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Previous close</p>
          <p>119.42</p>
        </div>

        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Open</p>
          <p>{appleData5d.chart.result[0].meta.open}</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Bid</p>
          <p>null</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Ask</p>
          <p>null</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Day's Range</p>
          <p>{appleData5d.chart.result[0].meta.dayRange}</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>52 Week Range</p>
          <p>{appleData5d.chart.result[0].meta.week52Range}</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Volume</p>
          <p>{appleData5d.chart.result[0].meta.volume}</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Avg. Volume</p>
          <p>{appleData5d.chart.result[0].meta.avgVolume}</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Market Cap (intraday)</p>
          <p>{appleData5d.chart.result[0].meta.marketCap}</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Beta (5Y Monthly)</p>
          <p>null</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>PE Ratio (TTM)</p>
          <p>{appleData5d.chart.result[0].meta.peRatio}</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>EPS (TTM)</p>
          <p>{appleData5d.chart.result[0].meta.eps}</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Earnings Date</p>
          <p>{appleData5d.chart.result[0].meta.earningsDate}</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Forward Dividend & Yield</p>
          <p>null</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>Ex-Dividend Date</p>
          <p>null</p>
        </div>
        <div className="mt-4 pb-1 w-full flex flex-row items-center justify-between text-xs border border-t-0 border-r-0 border-l-0 border-b-[var(--variant-5)] border-dashed">
          <p>1y Target Est</p>
          <p>null</p>
        </div>
      </div>
    </div>
  );
};

export default Chart1;
