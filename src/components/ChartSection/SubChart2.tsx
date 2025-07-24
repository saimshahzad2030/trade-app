// "use client"
// import React from "react";
// import ReactECharts from "echarts-for-react";

// // Generate distinct colors using HSL
// const generateColorPalette = (count: number): string[] => {
//   const hues = Array.from({ length: count }, (_, i) => (i * 360) / count);
//   return hues.map(h => `hsl(${h}, 70%, 60%)`);
// };
// export type PEData = {
//   date: string;
//   pe_ratio: number | string;
// };
// type Props = {
//   peData: { eps: PEData[]; symbol: string }[];
//   handleAddPe: (newData: { eps: PEData[]; symbol: string }) => void;
// };
// const SubChart2 = ({ peData, handleAddPe }: Props) => {
//   const timeLabels = [
//     "2023-05", "2023-07", "2023-09", "2023-11",
//     "2024-01", "2024-03", "2024-05", "2024-07"
//   ];

//   const companyCount = 30;
//   const companyNames = Array.from({ length: companyCount }, (_, i) => `Company ${i + 1}`);
//   const colors = generateColorPalette(companyCount);

//   // Each company line
//   const companySeries = companyNames.map((name, index) => ({
//     name,
//     type: "line",
//     data: timeLabels.map(() => +(8 + Math.random() * 20).toFixed(2)), // PE values between 8–28
//     lineStyle: {
//       width: 1,
//       opacity: 0.05, // 🔽 ultra low initial visibility
//       color: colors[index],
//     },
//     symbol: "circle",
//     symbolSize: 5,
//     showSymbol: true,
//     emphasis: {
//       focus: "series",
//       lineStyle: {
//         width: 2,
//         opacity: 0.9 // 🔼 more visible on hover
//       }
//     }
//   }));

//   const avgPE = [18, 18.2, 18.1, 17.9, 17.8, 18, 18.2, 18.5];

//   const option = {
//     title: {
//       text: "PE Ratio Trends Over Time - Auto & Truck Companies",
//       left: "center",
//       bottom: 10,
//       textStyle: {
//         color: "white",
//         fontSize: 14
//       }
//     },
//     tooltip: {
//       trigger: "item",
//       formatter: (params: any) => {
//         return `
//           <strong>${params.seriesName}</strong><br/>
//           Quarter: ${params.name}<br/>
//           PE: ${params.value}
//         `;
//       }
//     },
//     legend: {
//       type: "scroll",
//       data: [...companyNames, "Industry Avg PE"],
//       top: 0,
//       textStyle: {
//         color: "white"
//       },
//       pageIconColor: "#ffffff"
//     },
//     grid: {
//       left: "5%",
//       right: "15%",
//       containLabel: true,
//       top: "60",
//       bottom: "60"
//     },
//     xAxis: {
//       type: "category",
//       name: "Quarter",
//       boundaryGap: false,
//       data: timeLabels,
//       axisLine: { lineStyle: { color: "#888" } },
//       axisLabel: { color: "white" },
//  splitLine: {
//     show: false,
//  }
//     },
//     yAxis: {
//       type: "value",
//       name: "PE Ratio",
//       min: 7.5,
//       max: 27.5,
//       axisLine: { lineStyle: { color: "#888" } },
//       axisLabel: { color: "white" },
//        splitLine: {
//     show: true,
//     lineStyle: {
//       color: "#aaa", // ⬅ lighter vertical grid lines
//       width: 0.1
//     }
//   }
//       // splitLine: { lineStyle: { color: "#eee" } }
//     },
//     series: [
//       ...companySeries,
//       {
//         name: "Industry Avg PE",
//         type: "line",
//         data: avgPE,
//         smooth: true,
//         lineStyle: {
//           width: 3,
//           type: "dashed",
//           color: "#d32f2f"
//         },
//         symbol: "none",
//         z: 10
//       }
//     ],
//     backgroundColor: "#1f1f2e"
//   };

//   return (
//     <div style={{ padding: 20, backgroundColor: "#1f1f2e" }} className="rounded-md">
//       <ReactECharts option={option} style={{ height: "500px", width: "100%" }} />
//     </div>
//   );
// };

// export default SubChart2;
"use client";
import React from "react";
import ReactECharts from "echarts-for-react";
import { Input } from "../ui/input";
import { PlusIcon, X } from "lucide-react";
import RoundLoader from "../Loader/RoundLoader";
import { searchStock } from "@/services/search.services"; 
import { mockData } from "../Searchbar/CompanySectionSearchbar";
import { getPeRatioMetrices } from "@/services/stocksFinancialMetrics.services";
import { PEData } from "./SubChartParent";

const generateColorPalette = (count: number): string[] => {
  const hues = Array.from({ length: count }, (_, i) => (i * 360) / count);
  return hues.map(h => `hsl(${h}, 70%, 60%)`);
};

 

type Props = {
  peData: { pe_ratio: PEData[]; symbol: string }[];
  handleAddPe: (newData: { pe_ratio: PEData[]; symbol: string }) => void;
};

const SubChart2 = ({ peData, handleAddPe }: Props) => {
  const [showModal, setShowModal] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredData, setFilteredData] = React.useState<typeof mockData>([]);
  const [loading, setLoading] = React.useState(false);
  const [filterLoading, setFilterLoading] = React.useState(false);

  const allDates = Array.from(
    new Set(peData.flatMap(company => company.pe_ratio.map(entry => entry.date)))
  ).sort();

  const colors = generateColorPalette(peData.length);

  const companySeries = peData.map((company, index) => {
    const dateToPE: Record<string, number> = {};
    company.pe_ratio.forEach(entry => {
      const parsed = parseFloat(String(entry.pe_ratio).replace(/[$,]/g, ""));
      if (!isNaN(parsed)) {
        dateToPE[entry.date] = parsed;
      }
    });

    const alignedSeries = allDates.map(date =>
      dateToPE[date] !== undefined ? dateToPE[date] : null
    );

    return {
      name: company.symbol.toUpperCase(),
      type: "line",
      data: alignedSeries,
      symbol: "circle",
      symbolSize: 5,
      showSymbol: true,
      connectNulls: true,
      lineStyle: {
        color: colors[index],
        width: 1,
        opacity: 0.05
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

  const option = {
    title: {
      text: "PE Ratio Trends Over Time",
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
      data: peData.map(c => c.symbol.toUpperCase()),
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
    series: [...companySeries],
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
                          const response = await getPeRatioMetrices(item.symbol);
                          if (typeof response.data === "object" && "pe_ratio" in response.data) {
                             handleAddPe(response.data as {pe_ratio:PEData[],symbol:string}) 
                             
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

export default SubChart2;
