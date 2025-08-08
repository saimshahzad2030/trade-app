 
"use client";
import React from "react";
import ReactECharts from "echarts-for-react";
import { poppins } from "@/fonts/fonts";
import { EmaChartPoint } from "@/types/types";

type ChartComponentProps = {
  data: EmaChartPoint[];
  technicalIndicator: string;
};

const ChartComponent: React.FC<ChartComponentProps> = ({ data, technicalIndicator }) => {
  console.log(data, "data");

  const dates = data.map((item) => item.date);

  const candlestickData: [number, number, number, number][] = data.map((item) => [
    +item.open,
    +item.close,
    +item.low,
    +item.high,
  ]);

  const emaData = data.map((item) => +item.ema);

  const intrinsicData = data.map((item) =>
    parseFloat(item.intrinsicValue?item.intrinsicValue.replace("$", ""):"0")
  );

  // ✅ Custom series render function to draw the area between intrinsic and mid price
  const renderGreenArea = (params: any, api: any) => {
    const xValue = api.value(0);
    const intrinsicValue = api.value(1);
    const midPrice = api.value(2);

    const x = api.coord([xValue, intrinsicValue])[0];
    const y1 = api.coord([xValue, intrinsicValue])[1];
    const y2 = api.coord([xValue, midPrice])[1];

    const width = 6; // wider bar for visibility

    return {
      type: "polygon",
      shape: {
        points: [
          [x - width, y1],
          [x + width, y1],
          [x + width, y2],
          [x - width, y2],
        ],
      },
      style: {
        fill: y2 < y1 ? "rgba(28, 51, 36, 0.2)" : "rgba(119, 84, 84, 0.2)",
        stroke: "transparent",
      },
    };
  };

  const option = {
    backgroundColor: "#13131f",
    legend: {
      data: ["Price", technicalIndicator, "Intrinsic Value"],
      inactiveColor: "#777",
      textStyle: {
        color: "#ffffff",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        animation: false,
        lineStyle: {
          color: "#376df4",
          width: 2,
          opacity: 1,
        },
      },
    },
    xAxis: {
      type: "category",
      data: dates,
      scale: true,
      boundaryGap: false,
      axisLine: { lineStyle: { color: "#8392A5" } },
    },
    yAxis: {
      scale: true,
      axisLine: { lineStyle: { color: "#8392A5" } },
      splitLine: { show: false },
    },
    dataZoom: [
      {
        type: "slider",
        start: 0,
        end: 100,
        height: 30,
        bottom: 20,
        handleSize: "100%",
        handleStyle: {
          color: "#376df4",
        },
        textStyle: {
          color: "#8392A5",
        },
      },
      {
        type: "inside",
      },
    ],
    grid: {
      left: "3%",
      right: "4%",
      top: 40,
      bottom: 80,
      containLabel: true,
    },
    series: [
      // ✅ Custom shaded area
//       {
//         type: "custom",
//         name: "Intrinsic Fill",
//         renderItem: renderGreenArea,
//         data: data.map((item) => {
//           const intrinsic = parseFloat(item.intrinsicValue?item.intrinsicValue.replace("$", ""):"0")
//           const midPrice = (+item.open + +item.close) / 2;
//           return [item.date, intrinsic, midPrice];
//         }),
//         tooltip: {
//   show: false,
// },
//         z: 0,
//       },

      // ✅ Candlestick chart
      {
        name: "Price",
        type: "candlestick",
        data: candlestickData,
        itemStyle: {
          color: "#e91010ff",      // red (bull)
          color0: "#0d883aff",     // green (bear)
          borderColor: "#f87171",
          borderColor0: "#4ade80",
        },
        z: 2,
      },

      // ✅ EMA line
      {
        name: technicalIndicator,
        type: "line",
        data: emaData,
        smooth: true,
        tooltip: {
  show: false,
},
        showSymbol: false,
        lineStyle: {
          width: 2,
          color: "#38bdf8",
        },
        emphasis: {
          focus: "series",
        },
        z: 3,
      },

      // ✅ Intrinsic value line
      // {
      //   name: "Intrinsic Value",
      //   type: "line",
      //   data: intrinsicData,
      //   smooth: true,
      //   showSymbol: false,
      //   lineStyle: {
      //     width: 2,
      //     color: "#ffffff",
      //     type: "dotted",
      //     opacity: 0.7,
      //   },
      //   emphasis: {
      //     focus: "series",
      //   },
      //   z: 3,
      // },
    ],
  };

  return (
    <div className="w-full mx-auto flex flex-col items-center">
      <div className="w-full rounded-2xl p-2 flex flex-col items-center shadow-md">
        <ReactECharts
          option={option}
          style={{ height: "75vh", width: "100%" }}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
      <h2
        className={`text-2xl font-bold text-center mt-4 text-white ${poppins.className}`}
      >
        Price with EMA
      </h2>
      <h2
        className={`text-xl font-semibold text-center text-white ${poppins.className}`}
      >
        ({data[0].date.split(" ")[0]})
      </h2>
    </div>
  );
};

export default ChartComponent;
