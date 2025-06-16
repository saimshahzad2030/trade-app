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
import { companyData } from "@/types/types";
import { appleData1y, appleData5d, appleData6m } from "@/global/constants";
import ReactECharts from "echarts-for-react";
import { color } from "echarts";
const ChartFooter = () => {
  const companies = [appleData1y, appleData5d, appleData6m];
  const getChartOptions = (company: companyData, index: number) => {
    const chartData = company.chart.result[0];
    const timestamps = chartData.timestamp.map((ts) =>
      new Date(ts * 1000).toLocaleTimeString()
    );
    const prices = chartData.indicators.quote[0].close;
    const minPrice = Math.min(...prices.filter((p) => p != null)); // filter out nulls if any

    return {
      title: {
        text:
          index === 0
            ? "Apple Inc."
            : index === 1
            ? "Nvidia Inc."
            : "Amazon Inc.",
        left: "center",
        bottom: "10%",
        textStyle: {
          color: "#0A7075",
          fontSize: 18,
        },
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: timestamps,
        axisLabel: { show: false }, // ❌ hide X labels
        axisTick: { show: false }, // ❌ hide X ticks
        axisLine: { show: false }, // ❌ hide X line
      },
      yAxis: {
        type: "value",
        min: minPrice,
        axisLabel: { show: false }, // ❌ hide Y labels
        axisTick: { show: false }, // ❌ hide Y ticks
        axisLine: { show: false }, // ❌ hide Y line
        splitLine: { show: false }, // ❌ hide grid lines
      },
      series: [
        {
          color: "#0A7075",
          data: prices,
          type: "line",
          smooth: true,
          showSymbol: false,
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

  return (
    <div className="flex flex-col items-center h-auto mr-4">
      <div className="text-start text-white  pb-4">
        <h1 className="  font-bold ">Live Stocks</h1>
      </div>
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
          }),
        ]}
        className="w-full   h-[200px] "
      >
        <CarouselContent>
          {companies.map((company, index) => (
            <CarouselItem
              key={index}
              className="  flex flex-col justify-center items-center "
            >
              <div className="w-full h-[200px] ">
                <ReactECharts
                  option={getChartOptions(company, index)}
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious className="cursor-pointer w-4 h-auto " />
        <CarouselNext className="cursor-pointer  w-4 h-auto " /> */}
      </Carousel>
    </div>
  );
};

export default ChartFooter;
