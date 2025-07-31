// "use client"
// import React from 'react';
// import ReactECharts from 'echarts-for-react';
// import { RocResponseType, Stock } from '@/types/types';
// import { get5YearRoc } from '@/services/stockScreening.services';
// type ScreenerRadarProps ={
//   stocks:Stock[]}
// const LineChartROC = ({stocks}:ScreenerRadarProps) => {
//   const [data, setData] = React.useState<RocResponseType[]>([]);
//       const [loading,setLoading] = React.useState(true)
//   const years = ['2020', '2021', '2022', '2023', '2024'];
 
//   const stockROCData = {
//     AAPL: [20, 23, 25, 26, 25],
//     MSFT: [18, 20, 22, 23, 22],
//     GOOGL: [16, 17, 19, 20, 18],
//     AMZN: [14, 18, 21, 20, 19],
//     TSLA: [12, 22, 28, 30, 28],
//   };
  
//   const stockColors = {
//     AAPL: '#ff7c7c',
//     MSFT: '#7cafff',
//     GOOGL: '#7cffd1',
//     AMZN: '#ffd97c',
//     TSLA: '#d07cff',
//   };

//   const series = Object.entries(stockROCData).map(([name, data]) => ({
//     name,
//     data,
//     type: 'line',
//     // smooth: true,
//     symbol: 'none',
//     lineStyle: {
//       width: 3,
//     },
//     itemStyle: {
//       color:stockColors[name as keyof typeof stockColors],
//     },
//   }));

//   const option = { 
//     title: {
//       text: 'ROC Over Last 5 Years',
//       left: 'center',
//       textStyle: {
//         color: 'white',
//         fontSize: 20,
//       },
//       bottom:'0'
//     },
//     tooltip: {
//       trigger: 'axis',
//     },
//     legend: {
//       top: '1%',
//        textStyle: {
//         color: 'white', 
//       },
//       data: Object.keys(stockROCData),
//     },
//     grid: {
//       left: '10%',
//       right: '10%',
//       bottom: '15%',
//     },
//     xAxis: {
//         boundaryGap: false, 
//               lineStyle: {
//     type: 'dotted',
//     width: 0.5,
//     color: '#999', // or any subtle gray
//   },
//       type: 'category',
//       data: years,
//     },
//     yAxis: {
//         min: Math.min(...Object.values(stockROCData).flat())-2,
//    splitLine: {
//       lineStyle: {
//         type: 'dotted', // 👈 dotted lines
//         width: 0.3,      // 👈 thin stroke
//         color: '#999',   // 👈 light gray
//       },
//     },
//       type: 'value',
//       name: 'ROC (%)',
//     },
//     series,
//   };
// React.useEffect(() => {
//   const fetchAllStockData = async () => {
//     try {
//       const responses = await Promise.all(
//         stocks.map((stock) =>
//           get5YearRoc(stock.symbol) 
//         )
//       );

//       // Keep only those with HTTP status 200
//       const validData = responses
//         .filter((res) => res.status === 200  )
//         .map((res) => res.data as RocResponseType); // cast type if API shape guaranteed
//       console.log(validData,"ValidData")
//       setData(validData);
//       setLoading(false)
//     } catch (error) {
//       console.error("Error fetching stock indicators:", error);
//     }
//   };

//   if (stocks.length) {
//     fetchAllStockData();
//   }
// }, [stocks]);
//   return <div style={{ width: '100%', maxWidth: 900, margin: 'auto', backgroundColor: '#0d0d14', padding: 20, borderRadius: 8 }}>
//     <ReactECharts option={option} style={{ height: '500px' }} />
//     </div>
// };

// export default LineChartROC;
"use client";
import React from "react";
import ReactECharts from "echarts-for-react";
import { RocResponseType, Stock } from "@/types/types";
import { get5YearRoc } from "@/services/stockScreening.services";
import SkeletonLoader from "../Loader/SkeletonLoader";

type ScreenerRadarProps = {
  stocks: Stock[];
};

const generateColorPalette = (count: number): string[] => {
  return Array.from({ length: count }, (_, i) => {
    const hue = (i * 360) / count;
    return `hsl(${hue}, 70%, 60%)`;
  });
};
const getMinRocValue = (data: RocResponseType): number => {
  const allRocs = Object.values(data).flat().map(entry => entry.roc);
  const minRoc = Math.min(...allRocs);
  return Math.floor(minRoc * 100) / 100; // Optional: round down to 2 decimals
};
const LineChartROC = ({ stocks }: ScreenerRadarProps) => {
  const [rocData, setRocData] = React.useState<RocResponseType>({});
  const [loading, setLoading] = React.useState(true);
  const [years, setYears] = React.useState<string[]>([]);

  React.useEffect(() => {
    const fetchAllStockData = async () => {
      try {
        const responses = await Promise.all(
          stocks.map((stock) => get5YearRoc(stock.symbol))
        );

        const mergedData: RocResponseType = {};
        const yearSet = new Set<string>();

        responses.forEach((res) => {
          if (res.status === 200) {
            const ticker = Object.keys(res.data)[0];
            const entries = res.data[ticker];

            mergedData[ticker] = entries;
            entries.forEach((entry:{year:string}) => yearSet.add(entry.year));
          }
        });

        setRocData(mergedData);
        setYears(Array.from(yearSet).sort());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock ROC:", error);
      }
    };

    if (stocks.length) {
      fetchAllStockData();
    }
  }, [stocks]);

  const tickers = Object.keys(rocData);
  const colors = generateColorPalette(tickers.length);

  const companySeries = tickers.map((ticker, index) => {
    const entryMap: Record<string, number> = {};
    rocData[ticker].forEach((entry) => {
      entryMap[entry.year] = entry.roc;
    });

    const alignedSeries = years.map((year) =>
      entryMap[year] !== undefined ? entryMap[year] : null
    );

    return {
      name: ticker,
      type: "line",
      data: alignedSeries,
      symbol: "circle",
      symbolSize: 4,
      showSymbol: true,
      connectNulls: true,
      lineStyle: {
        width: 1,
        opacity: 0.2,
        color: colors[index],
      },
      itemStyle: {
        color: colors[index],
      },
      emphasis: {
        focus: "series",
        lineStyle: {
          width: 2,
          opacity: 0.9,
        },
      },
    };
  });

  // Calculate average ROC per year
  const averageGrowth = years.map((year) => {
    const values = tickers
      .map((ticker) =>
        rocData[ticker].find((entry) => entry.year === year)?.roc
      )
      .filter((v): v is number => v !== undefined);
    if (!values.length) return null;
    const sum = values.reduce((a, b) => a + b, 0);
    return +(sum / values.length).toFixed(2);
  });

  const allValues = Object.values(rocData)
    .flatMap((arr) => arr.map((e) => e.roc))
    .filter((v) => typeof v === "number");

  const option = {
    title: {
      text: `ROC Over Time (${tickers.length} Stocks)`,
      left: "center",
      top: 8,
      textStyle: {
        color: "white",
        fontSize: 14,
      },
    },
    tooltip: {
      trigger: "item",
      formatter: (params: any) => `
        <strong>${params.seriesName}</strong><br/>
        Year: ${params.name}<br/>
        ROC: ${params.value}
      `,
    },
    legend: {
      type: "scroll",
      data: tickers,
      top: 28,
      textStyle: { color: "white" },
      pageIconColor: "#ffffff",
    },
    grid: {
      left: "5%",
      right: "15%",
      top: 100,
      bottom: 20,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      name: "Year",
      boundaryGap: false,
      data: years,
      axisLine: { lineStyle: { color: "#888" } },
      axisLabel: { color: "white" },
      splitLine: { show: false },
    },
    yAxis: {
      type: "value",
      name: "ROC (%)",
      min: getMinRocValue(rocData),
      axisLine: { lineStyle: { color: "#888" } },
      axisLabel: { color: "white" },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#aaa",
          width: 0.1,
        },
      },
    },
    series: [
      ...companySeries,
      {
        name: "Average ROC",
        type: "line",
        data: averageGrowth,
        smooth: true,
        symbol: "circle",
        symbolSize: 0,
        lineStyle: {
          width: 1,
          type: "dashed",
          opacity: 0.1,
          color: "#ffffff",
        },
        itemStyle: {
          color: "#ffffff",
        },
        z: 10,
      },
    ],
    backgroundColor: "#1f1f2e",
  };

  if (loading)
    return   <SkeletonLoader className='max-w-900 w-full h-[500px] bg-gray-700'/>;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 900,
        margin: "auto",
        backgroundColor: "#1f1f2e",
        padding: 20,
        borderRadius: 8,
      }}
    >
      <ReactECharts option={option} style={{ height: "500px", width: "100%" }} />
    </div>
  );
};

export default LineChartROC;
