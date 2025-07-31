"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { companyData, RealtimePriceData } from "@/types/types";
import { appleData1d, CompanyData1} from "@/global/constants";
import ReactECharts from "echarts-for-react";
import { color } from "echarts";
import { getFooterStocksData } from "@/services/stocks.services";
import SkeletonLoader from "../Loader/SkeletonLoader";
const ChartFooter = () => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<RealtimePriceData | null>(null);

  React.useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      let response = await getFooterStocksData();
      if(response.status==200){
        setData(response.data);
      }
      else{
        setData(null)
      }
      setLoading(false);
    };
    fetchChartData();
  }, []);

const getChartOptions = (
  prices: { date: string; price: number }[],
  title: string
) => {
  const timestamps = prices?.map((item) => item.date);
  const values = prices?.map((item) => item.price);

  const upSeries: (number | null)[] = [values[0]];
  const downSeries: (number | null)[] = [null];

  for (let i = 1; i < values.length; i++) {
    const prev = values[i - 1];
    const curr = values[i];

    if (curr >= prev) {
      upSeries.push(curr);
      downSeries.push(null);
    } else {
      upSeries.push(null);
      downSeries.push(curr);
    }
  }

  const minPrice = Math.min(...values);

  return {
    title: {
      text: title,
      left: "center",
      bottom: "10%",
      textStyle: {
        color: "#ffffffff",
        fontSize: 18,
      },
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: timestamps,
      axisLabel: { show: false },
      axisTick: { show: false },
      axisLine: { show: false },
    },
    yAxis: {
      type: "value",
      min: minPrice,
      axisLabel: { show: false },
      axisTick: { show: false },
      axisLine: { show: false },
      splitLine: { show: false },
    },
    series: [
      {
        name: "Up",
        type: "line",
        data: upSeries,
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: "#00C49F", // green
          width: 2,
        },
      },
      {
        name: "Down",
        type: "line",
        data: downSeries,
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: "#FF4C4C", // red
          width: 2,
        },
      },
    ],
    grid: {
      top: 20,
      bottom: 60,
      left: 20,
      right: 20,
    },
  };
};


  const companySymbols = Object.keys(data || {}); // e.g., ["AAPL", "GOOG", ...]

  return (
    <div className="flex flex-col items-center h-auto mr-4">
      <div className="text-start text-white pb-4">
        <h1 className="font-bold">Live Stocks</h1>
      </div>

      {loading ? (
        <SkeletonLoader className="w-full h-[200px] bg-gray-900"/>
      ) : <>
      {data!=null?
          <Carousel
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full h-[200px]"
        >
          <CarouselContent>
            {companySymbols.map((symbol, index) => (
              <CarouselItem
                key={index}
                className="flex flex-col justify-center items-center"
              >
                <div className="w-full h-[200px]">
                  <ReactECharts
                    option={getChartOptions(data[symbol], symbol)}
                    style={{ height: "100%", width: "100%" }}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>:
        <p>no data to show</p>
        }</>}
    </div>
  );
};
export default ChartFooter
