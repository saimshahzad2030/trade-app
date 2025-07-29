"use client"
import React from "react";
import ReactECharts from "echarts-for-react";
import { GrowthData } from "./SubChartParent";
import { mockData } from "../Searchbar/CompanySectionSearchbar";
import { PlusIcon, X } from "lucide-react";
import { Input } from "../ui/input";
import { searchStock } from "@/services/search.services";
import { getRevenueGrowthMetrices } from "@/services/stocksFinancialMetrics.services";
import RoundLoader from "../Loader/RoundLoader";

// Generate distinct colors using HSL
const generateColorPalette = (count: number): string[] => {
  const hues = Array.from({ length: count }, (_, i) => (i * 360) / count);
  return hues.map(h => `hsl(${h}, 70%, 60%)`);
};

type Props = {
  growthData: { growth: GrowthData[]; symbol: string }[];
  handleAddGrowth: (newData: { growth: GrowthData[]; symbol: string }) => void;
};

const SubChart3 = ({ growthData, handleAddGrowth }: Props) => { 
   const [showModal, setShowModal] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [filteredData, setFilteredData] = React.useState<typeof mockData>([]);
    const [loading, setLoading] = React.useState(false);
    const [filterLoading, setFilterLoading] = React.useState(false);
  const allDates = Array.from(
  new Set(growthData.flatMap(company => company.growth.map(entry => entry.date)))
).sort();
const averageGrowth = allDates.map((date) => {
  const values = growthData
    .map(c => c.growth.find(g => g.date === date)?.growth)
    .filter(v => v !== undefined) as number[];
  if (values.length === 0) return null;
  const sum = values.reduce((a, b) => a + b, 0);
  return +(sum / values.length).toFixed(2);
});

  const colors = generateColorPalette(growthData.length);



const companySeries = growthData.map((company, index) => {
  const dateToGrowth: Record<string, number> = {};
  company.growth.forEach(entry => {
    dateToGrowth[entry.date] = entry.growth;
  });

  const alignedSeries = allDates.map(date =>
    dateToGrowth[date] !== undefined ? dateToGrowth[date] : null
  );

  return {
    name: company.symbol.toUpperCase(),
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
      color: colors[index]
    },
    emphasis: {
      focus: "series",
      lineStyle: {
        width: 2,
        opacity: 0.9
      }
    }
  };
});

  const avgWACC = [6.5, 6.8, 6.7, 7.0, 7.2, 6.9, 7.1, 7.3];
const option = {
    title: {
      text: "WACC Trend Over Time",
      left: "center",
      bottom: 10,
      textStyle: {
        color: "white",
        fontSize: 14
      }
    },
    tooltip: {
      trigger: "item",
      formatter: (params: any) => `
        <strong>${params.seriesName}</strong><br/>
        Quarter: ${params.name}<br/>
        PE: ${params.value}
      `
    },
    legend: {
      type: "scroll",
      data: growthData.map(c => c.symbol.toUpperCase()),
      top: 0,
      textStyle: { color: "white" },
      pageIconColor: "#ffffff"
    },
    grid: {
      left: "5%",
      right: "15%",
      containLabel: true,
      top: "60",
      bottom: "60"
    },
    xAxis: {
      type: "category",
      name: "Quarter",
      boundaryGap: false,
      data: allDates,
      axisLine: { lineStyle: { color: "#888" } },
      axisLabel: { color: "white" },
      splitLine: { show: false }
    },
    yAxis: {
      type: "value",
      name: "PE Ratio",
      axisLine: { lineStyle: { color: "#888" } },
      axisLabel: { color: "white" },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#aaa",
          width: 0.1
        }
      }
    },
    series: [...companySeries,
      {
  name: "Average Growth",
  type: "line",
  data: averageGrowth,
  smooth: true,
  lineStyle: {
    width: 1,
    type: "dashed",
    opacity: 0.09,
    color: "#ffffff"
  },
  symbol: "circle",
    symbolSize: 0,

  itemStyle: {
    color: "#ffffff"
  },
  z: 10
}
    ],
    backgroundColor: "#1f1f2e"
  };
 
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-row justify-end w-full">
        <button
          onClick={() => setShowModal(true)}
          className="border border-[var(--variant-3)] border-2 rounded-md my-2 p-2 flex flex-row items-center text-xs text-[var(--variant-3)] cursor-pointer"
        >
          Add Company <PlusIcon className="h-4 ml-1" />
        </button>
      </div>

      <div style={{ padding: 20, backgroundColor: "#1f1f2e" }} className="rounded-md w-full">
        <ReactECharts option={option} style={{ height: "500px", width: "100%" }} />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-[#1f1f2e] text-black p-6 rounded-lg w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Add Company</h2>
              <button onClick={() => setShowModal(false)}>
                <X className="h-5 w-5 text-gray-300 cursor-pointer" />
              </button>
            </div>
            {filterLoading ? (
              <div className="flex flex-row items-center w-full my-2"><RoundLoader /></div>
            ) : (
              <div className="flex flex-col space-y-4 relative">
                <Input
                  placeholder="Search Company Name"
                  value={searchQuery}
                  onChange={async (e) => {
                    const query = e.target.value;
                    setSearchQuery(query);
                    setLoading(true);
                    const searchedStock = await searchStock(query);
                    setFilteredData(searchedStock.data || []);
                    setLoading(false);
                    if (!query.trim()) {
                      setFilteredData([]);
                    }
                  }}
                  className="pl-10 pr-4 h-10 w-full rounded-md text-gray-200 bg-[#13131f] border-none"
                />
                {searchQuery && !loading && (filteredData.length > 0 ? (
                  <div className="w-full bg-[#13131f] shadow-lg rounded-md mt-2 z-50 max-h-[300px] overflow-y-scroll">
                    {filteredData.map((item, index) => (
                      <button
                        key={index}
                        onClick={async () => {
                          setSearchQuery("");
                          setFilterLoading(true);
                          const response = await getRevenueGrowthMetrices(item.symbol);
                          if (typeof response.data === "object" && "growth" in response.data) {
                             handleAddGrowth(response.data as {growth:GrowthData[],symbol:string}) 
                             
} else {
  console.error("Invalid PE data:", response.data);
}
                          // handleAddPe(response.data as { eps: PEData[]; symbol: string });
                          setFilterLoading(false);
                          setShowModal(false);
                        }}
                        className="flex flex-col w-full items-start hover:bg-[#13131a] p-3"
                      >
                        <div className="flex flex-row justify-between w-full">
                          <span className="text-xs text-white">{item.name}</span>
                          <span className="text-xs text-gray-400">{item.symbol}</span>
                        </div>
                        <div className="flex flex-row justify-start w-full">
                          <span className="text-xs text-gray-400">{item.exchangeShortName}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="w-full bg-gray-400 shadow-lg rounded-md mt-2 z-50">
                    <p className="p-4">No Such Stock Exist</p>
                  </div>
                ))}
                {searchQuery && loading && (
                  <div className="w-full bg-[#13131f] shadow-lg h-10 rounded-md mt-2 z-50">
                    <RoundLoader />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubChart3;
