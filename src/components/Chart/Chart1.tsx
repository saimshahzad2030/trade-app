"use client";
import React, { useRef } from "react";
import ReactECharts from "echarts-for-react";
import { Button } from "@/components/ui/button";
// import { appleData1d, chartData } from "@/global/constants";
import { ZoomIn, RefreshCcw, Undo2, Download } from "lucide-react";
import CompanySummary from "./CompanySummary";
import CompanyDetails from "./CompanyDetailsSection";
import OwnershipStructure from "../SummaryCharts/OwnershipStructure";
import DebtCourageChart from "../SummaryCharts/DebtCourageChart";
import DebtAnalysis from "../SummaryCharts/DebtAnalysisChart";
import EPSProjectionChart from "../SummaryCharts/EpsProjectionChart";
import { companyData, MetaDataType } from "@/types/types";
import { getSpecificStockSummaryChart, getSpecificStockSummaryData } from "@/services/stock.services";
import RoundLoader from "../Loader/RoundLoader";
import DebtAnalysisAndDebtCourageChart from "../SummaryCharts/DebtAnalysis&DebtCourageChart";
import { useParams } from "next/navigation";
import CompanySummarySection from "../CompanySummarySection/CompanySummarySection";
import SearchBar from "../Searchbar/Searchbar";
 
const Chart1 = () => {
    const params = useParams<{ symbol: string}>()
    let {symbol} = params;
  const [activeRange, setActiveRange] = React.useState("1d");
  const ranges = ["1d","1m", "6m","1y", "5y",  "ytd",  "all"];
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
  const [chartData,setChartData] = React.useState<companyData | null>(null)
  const [chartDataLoading,setChartDataLoading] = React.useState<boolean>(true)
  // Prepare data for the chart
  const timestamps = chartData?.chart?.result[0]?.timestamp;
  const intrinsicValues  = chartData?.chart.result[0]?.indicators?.quote[0]?.intrinsic || [];

  const adjClosePrices:number[] = chartData?.chart?.result[0]?.indicators?.quote[0]?.adjclose ?? [];
 const data = timestamps?.map((timestamp, index:number) => [
  timestamp * 1000,
  adjClosePrices[index],
]);
const intrinsicData = timestamps?.map((timestamp, index) => [
  timestamp * 1000,
  intrinsicValues[index],
]);

  const maxPrice = Math.max(...adjClosePrices);
  // Filter data based on activeRange
  const getFilteredData = () => {
    const now = new Date();
    let startDate = new Date(now);
    switch (activeRange) {
       case "1d":
        startDate.setDate(startDate.getDate() - 1);
      case "5d":
        startDate.setDate(startDate.getDate() - 5);
    break;
      case "1m":
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;

      case "6m":
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
    return data?.filter(([timestamp]) => new Date(timestamp) >= startDate);
  };
  const filteredData = getFilteredData() || [];
  const filteredMaxPrice = Math.max(...filteredData.map(([, price]) => price));
 
const option = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross", // 👈 helps hover accuracy
      label: {
        backgroundColor: "#6a7985"
      }
    },
    formatter: function (params: { value: [number, number], seriesName: string }[]): string {
      if (!params || !params.length) return "";
      const date = new Date(params[0].value[0]);
      let content = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}<br/>`;
      params.forEach(param => {
        content += `<strong>${param.seriesName}:</strong> $${param.value[1]?.toFixed(2) ?? "N/A"}<br/>`;
      });
      return content;
    },
    backgroundColor: "#1a1a1a",
    borderColor: "#0A7075",
    textStyle: {
      color: "#fff",
    },
  },
  xAxis: {
    type: "time",
    boundaryGap: false,
    position: "bottom",
    splitNumber: 5,
    axisLabel: {
      align: "bottom",
      formatter: (value: number) => {
        const date = new Date(value);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      },
    },
    axisLine: {
      lineStyle: {
        color: "#888"
      }
    },
     axisPointer: {
    snap: false, // avoid snapping across gaps
  }
  },
 yAxis: {
  type: "value",
  boundaryGap: false, // ✅ eliminates padding
  position: "right",
  min: (value: { min: number }) => Math.floor(value.min), // use actual min
  max: (value: { max: number }) => Math.ceil(value.max),  // use actual max
  axisLabel: {
    formatter: (val: number) => `$${val}`,
  },
  splitLine: {
    show: true,
    lineStyle: {
      color: "rgba(255, 255, 255, 0.1)",
      width: 0.5,
      type: "solid",
    },
  },
  axisLine: {
    lineStyle: {
      color: "#888",
    },
  },
},

  series: [
    {
       connectNulls: true,
      name: "Apple Stock Price",
      type: "line",
      smooth: true,
      symbol: "circle", // ✅ show hoverable points
      symbolSize: 2,
      lineStyle: {
        color: "#4cc9f0",
        width: 2,
      },
      itemStyle: {
        color: "#4cc9f0"
      },
      areaStyle: {
        color: {
          type: "linear",
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(76, 201, 240, 0.2)" },
            { offset: 1, color: "rgba(76, 201, 240, 0)" },
          ],
        },
      },
      data: filteredData,
      markLine: {
        silent: true,
        symbol: "none",
        label: {
          show: true,
          position: "end",
          formatter: `$${chartData?.chart?.result[0]?.meta?.previousClose}`,
          color: "#ffffff",
        },
        lineStyle: {
          type: "dotted",
          color: "#ffffff99",
          width: 1,
        },
        data: [{ yAxis: chartData?.chart?.result[0]?.meta?.previousClose }],
      },
    } 
  ],
};
  const [metaData,setMetaData] = React.useState<MetaDataType | null>(null)

  React.useEffect(()=>{
        const fetchChartData = async()=>{
          setChartDataLoading(true)
          let response = await getSpecificStockSummaryChart(activeRange,symbol);
          let response2 = await getSpecificStockSummaryData(symbol);
          setMetaData(response2.data)
          setChartDataLoading(false)
            setChartData(response.data)
          
        }
        fetchChartData()

      },[])
  return (<>
  {!chartData?.chart.error &&  <><div className="w-full flex flex-row items-start justify-between px-8">
      <div className="w-9/12 flex flex-col items-center justify-start">
        <div className="w-full flex-col items-start text-white">
          <CompanyDetails loading={chartDataLoading} metaData={metaData}/>
         {!chartDataLoading && 
         <> <div className="w-full flex flex-row items-center mt-4 px-8">
            <div className="w-9/12">
              {ranges.map((range) => (
                <Button
                  key={range}
                  variant="graphTab2"
                  size="mini"
                  onClick={async() => {
                 setActiveRange(range)
          setChartDataLoading(true)
          let response = await getSpecificStockSummaryChart(range,symbol );
          setChartDataLoading(false)
          setChartData(response.data)
          
        
                    }}
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
          </div></>}
        </div>

        {chartDataLoading ?<div className="w-full h-[60vh] flex flex-col items-center justify-center">
          <RoundLoader/>
        </div>:
       <> 
      {chartData?.chart &&  <>
         {chartData?.chart?.error?
       <div className="w-full h-[60vh] flex flex-col items-center justify-center bg-[#13131f]">
          <p className="text-gray-700">{chartData?.chart?.error}</p>
        </div>:
        <>
        <ReactECharts
          ref={chartRef}
          option={option}
          style={{ height: "60vh", width: "100%", marginRight: "20px" }}
          notMerge={true}
          lazyUpdate={true}
        />
        <CompanySummary
          companySummary={{
            name: `${chartData?.chart?.result[0]?.meta?.longName} ${chartData?.chart?.result[0]?.meta?.industry}`,
            description: chartData?.chart?.result[0]?.meta?.description || 'null',
            fiscalYearEnds: chartData?.chart?.result[0]?.meta?.fiscalYearEnds || 'null',
            currency: chartData?.chart?.result[0]?.meta?.currency,
            exchangeName: chartData?.chart?.result[0]?.meta?.exchangeName,
            sector: chartData?.chart?.result[0]?.meta?.sector || 'null',
            industry: chartData?.chart?.result[0]?.meta?.industry || 'null',
            website: chartData?.chart?.result[0]?.meta?.website || 'null',
            employees: chartData?.chart?.result[0]?.meta?.fullTimeEmployees || 'null',
          }}
        /> 
        </>} </>}
    
       </>
        }
       { !chartDataLoading && !chartData?.chart?.error &&  <div className="grid grid-cols-4 w-full gap-4 mt-8">
          <div className="w-full col-span-4">
            <EPSProjectionChart symbol={symbol}/>
          </div>
          <DebtAnalysisAndDebtCourageChart symbol={symbol}/>
          <OwnershipStructure  symbol={symbol}/>
        </div>}
      </div>

       <CompanySummarySection loading={chartDataLoading} metaData={metaData}/> 
    </div></>}
  {chartData?.chart.error &&<div className="z-50 w-full flex flex-col items-center justify-between px-8 text-gray-400"><p className="mb-2">{`${chartData?.chart.error }. Try Seaching some other thing other than ${symbol}`}</p>
  {/* <SearchBar className="w-9/12"/>
   */}
 </div>} </>
     
  );
};

export default Chart1;
