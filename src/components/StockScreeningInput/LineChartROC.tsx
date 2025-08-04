 
"use client"
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { RevenueResponseType, RocResponseType, Stock } from '@/types/types';
import { get5YearRevenue, get5YearRoc } from '@/services/stockScreening.services';
import { log } from 'console';
import SkeletonLoader from '../Loader/SkeletonLoader';
const generateColorPalette = (count: number): string[] => {
  return Array.from({ length: count }, (_, i) => {
    const hue = (i * 360) / count;
    return `hsl(${hue}, 70%, 60%)`;
  });
};
type ScreenerRadarProps = {
  stocks: Stock[];
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
      const symbols = stocks.map((s) => s.symbol).join(",").toLowerCase();
      const res = await get5YearRoc(symbols);

      const data = res.data;
      const yearSet = new Set<string>();
      const mergedData: RocResponseType= {};

      for (const ticker of Object.keys(data)) {
        if (ticker === "msg") continue;

        const tickerData = data[ticker];
        const entries = tickerData.result;

        if (!entries || entries.length === 0) continue; // ✅ skip empty results

   const cleanedEntries = entries.map((entry: { year: string; roc: string }) => {
  const raw = entry.roc.replace('%', '').trim(); // Remove % only
  const numeric = parseFloat(raw); // Direct conversion to number

  return {
    year: entry.year,
    roc: numeric,
    display: entry.roc, // Keep the original for tooltip
  };
});

        mergedData[ticker] = cleanedEntries;
        cleanedEntries.forEach((entry:{year:string}) => yearSet.add(entry.year));
      }

      // Optional: filter out symbols with no valid data
      const validSymbols = Object.keys(mergedData);
      const filteredStocks = stocks.filter((s) =>
        validSymbols.includes(s.symbol.toUpperCase())
      );

      setRocData(mergedData);
      setYears(Array.from(yearSet).sort()); 
      setLoading(false);
    } catch (error) {
      console.error("Error fetching stock roc:", error);
      setLoading(false);
    }
  };

  if (stocks.length) {
    fetchAllStockData();
  }
}, [stocks]);

  
  const tickers = Object.keys(rocData);
  const colors = generateColorPalette(10);

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
 formatter: (params: any) => {
  const originalDisplay = rocData[params.seriesName]?.find(
    (e) => e.year === params.name
  )?.display;
console.log(params,"params")
  return `
    <strong>${params.seriesName}</strong><br/>
    Year: ${params.name}<br/>
    ROC: ${originalDisplay ?? "N/A"}
  `;
},

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
  name: "ROC",
  min: getMinRocValue(rocData),
  axisLine: { lineStyle: { color: "#888" } },
  axisLabel: {
    color: "white",
    formatter: (value: number) => `${value}%`

  },
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
    return <SkeletonLoader className='max-w-900 w-full h-[500px] bg-gray-700'/>;

 
  return <div style={{ width: '100%', maxWidth: 900, margin: 'auto', backgroundColor: "#1f1f2e", padding: 20, borderRadius: 8 }}>
    <ReactECharts option={option} style={{ height: '500px' }} /></div>
};

export default LineChartROC;

// export default LineChartROC;
