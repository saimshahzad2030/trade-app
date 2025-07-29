// "use client";
// import React from "react";
// import ReactECharts from "echarts-for-react";
// import { CompanyFinancialMetrics } from "./SubChartParent";
// import { PlusIcon, X } from "lucide-react";
// import { Input } from "../ui/input";
// import { searchStock } from "@/services/search.services";
// import { mockData } from "../Searchbar/CompanySectionSearchbar";
// import RoundLoader from "../Loader/RoundLoader";
// import { getStockFinancialMetrices } from "@/services/stocksFinancialMetrics.services";

// // Generate distinguishable HSL colors
// const generateColorPalette = (count: number): string[] => {
//   const hues = Array.from({ length: count }, (_, i) => (i * 360) / count);
//   return hues.map(h => `hsl(${h}, 70%, 60%)`);
// };
// type EPSData = { date: string; eps: number };

// type Props = {
//   epsData:{eps:  { date: string; eps: number }[],symbol:string}[]
//   data: CompanyFinancialMetrics[];
//   handleAddEps:   (newData: { eps: EPSData[]; symbol: string }) => void;
// };

// const SubChart1 = ({ data ,handleAddEps,epsData}: Props) => {
//   console.log(epsData,"epsData")
//    const [showModal, setShowModal] = React.useState(false);
//    const [filterLoading, setFilterLoading] = React.useState(false);
//    const [loading, setLoading] = React.useState(false);
//   const [searchQuery, setSearchQuery] = React.useState("");
// const [filteredData, setFilteredData] = React.useState<typeof mockData>([]);
//   const allDates = Array.from(
//     new Set(
//       data.flatMap(company =>
//         company.eps.map(entry => entry.date)
//       )
//     )
//   ).sort();

//   const colors = generateColorPalette(data.length);

//   const companySeries = data.map((company, index) => {
//     const dateToEps: Record<string, number> = {};
//     company.eps.forEach(entry => {
//       const parsed = parseFloat(String(entry.eps).replace(/[$,]/g, ""));
//       if (!isNaN(parsed)) {
//         dateToEps[entry.date] = parsed;
//       }
//     });

//     const alignedSeries = allDates.map(date =>
//       dateToEps[date] !== undefined ? dateToEps[date] : null
//     );

//     return {
//       name: company.symbol.toUpperCase(),
//       type: "line",
//       data: alignedSeries,
//       symbol: "circle",
//       symbolSize: 5,
//       showSymbol: true,
//       connectNulls: true,
//       lineStyle: {
//         color: colors[index],
//         width: 1,
//         opacity: 0.05
//       },
//       itemStyle: {
//         color: colors[index]
//       },
//       emphasis: {
//         focus: "series",
//         lineStyle: {
//           width: 2,
//           opacity: 0.9
//         }
//       }
//     };
//   });
//   const averageEpsSeries = allDates.map(date => {
//   const values = data
//     .map(company => {
//       const entry = company.eps.find(e => e.date === date);
//       return entry ? parseFloat(String(entry.eps).replace(/[$,]/g, "")) : null;
//     })
//     .filter(v => v !== null && !isNaN(v)) as number[];

//   const sum = values.reduce((acc, val) => acc + val, 0);
//   return values.length > 0 ? +(sum / values.length).toFixed(2) : null;
// });
//   const averageSeries = {
//   name: "EPS Average",
//   type: "line",
//   data: averageEpsSeries,
//   smooth: true,
//   symbol: "none",
//   lineStyle: {
//     type: "dotted",
//     color: "white",
//     width: 2,
//     opacity: 0.8
//   },
//   emphasis: {
//     focus: "series",
//     lineStyle: {
//       width: 3
//     }
//   }
// };



//   const option = {
//     title: {
//       text: "EPS Trends Over Time",
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
//           EPS: ${params.value}
//         `;
//       }
//     },
//     legend: {
//       type: "scroll",
//       data: data.map(c => c.symbol.toUpperCase()),
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
//       data: allDates,
//       axisLine: { lineStyle: { color: "#888" } },
//       axisLabel: { color: "white" },
//       splitLine: {
//         show: false
//       }
//     },
//     yAxis: {
//       type: "value",
//       name: "EPS",
//       axisLine: { lineStyle: { color: "#888" } },
//       axisLabel: { color: "white" },
//       splitLine: {
//         show: true,
//         lineStyle: {
//           color: "#aaa",
//           width: 0.1
//         }
//       }
//     },
//    series: [...companySeries, averageSeries],

//     backgroundColor: "#1f1f2e"
//   };

//   return (
  
//     <div className="flex flex-col items-center w-full">
//       {/* Add Company Button */}
//       <div className="flex flex-row justify-end w-full">
//         <button
//           onClick={() => setShowModal(true)}
//           className="border border-[var(--variant-3)] border-2 rounded-md my-2 p-2 flex flex-row items-center text-xs text-[var(--variant-3)] cursor-pointer"
//         >
//           Add Company <PlusIcon className="h-4 ml-1" />
//         </button>
//       </div>

//       {/* Chart */}
//       <div style={{ padding: 20, backgroundColor: "#1f1f2e" }} className="rounded-md w-full">
//         <ReactECharts option={option} style={{ height: "500px", width: "100%" }} />
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/60
//  bg-opacity-10 z-50 flex items-center justify-center">
//           <div className="bg-white text-black p-6 rounded-lg w-full max-w-md shadow-lg">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold">Add Company</h2>
//               <button onClick={() => setShowModal(false)}>
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
//             <div className="flex flex-col space-y-4">
//               <label className="text-sm font-medium">Company Symbol</label>
//                <Input
//           placeholder="Search Company Name"
//           value={searchQuery}
//           onChange={async(e)=>{
//              const query = e.target.value;
//                 setSearchQuery(query);
//                 setLoading(true)
//                 const searchedStock = await searchStock(query)
//                 setFilteredData(searchedStock.data!=null?searchedStock.data:[])
//                 setLoading(false)
                
//                 if (!query.trim()) {
//                   setFilteredData([]);
//                   return;
//                 }
            
//           }}
//           className="pl-10 pr-4  h-8 w-full text-gray-300 bg-[#13131f] rounded-full border-none"
//         />
//         {searchQuery && !loading  && (filteredData.length>0?
        
//         <div className="  top-2/3 absolute w-full bg-white shadow-lg rounded-t-none   rounded-md mt-2 z-50 max-h-[300px] overflow-y-scroll">
//           {filteredData.map((item, index) => (
//            <button
//            onClick={async()=>{
//              setSearchQuery("")
//  let response2 = await getStockFinancialMetrices(item.symbol); 

//             handleAddEps(response2.data as {eps:EPSData[],symbol:string})

//   //         setStocks((prev) => {
//   //   const alreadyExists = prev.some((stock) => stock.symbol === item.symbol);
//   //   if (alreadyExists) return prev; 

//   //   const normalizedItem: StockItem = {
//   //     symbol: item.symbol,
//   //     name: item.name,
//   //     currency: item.currency,
//   //     stockExchange: item.exchange, // ✅ Mapping `exchange` to `stockExchange`
//   //     exchangeShortName: item.exchangeShortName,
//   //   };

//   //   return [...prev, normalizedItem];

   
//   // });
//   setSearchQuery("")
//            }}
//            key={index}   className="flex flex-col w-full items-start hover:bg-gray-50  p-3 ">
//             <div
//               key={index}
//               className="hover:text-[var(--variant-6)] flex flex-row items-center justify-between w-full cursor-pointer  "
//             >
//               <span className="text-xs">{item.name}</span>
//               <span className="text-xs text-gray-400">{item.symbol}</span>
//             </div>
//              <div
//               key={index}
//               className="hover:text-[var(--variant-6)] flex flex-row items-center justify-start w-full   cursor-pointer  "
//             >
//               <span className="text-xs text-gray-400">{item.exchangeShortName}</span>
//             </div></button>
//           ))}
//         </div>
//       :  <div className="  top-2/3 absolute w-full bg-gray-400 shadow-lg rounded-t-none   rounded-md mt-2 z-50 ">
//        <p className="  p-4">No Such Stock Exist</p>
//        </div>
//       )} 
     
//       {searchQuery && loading && (
//  <div className="  top-2/3 absolute w-full bg-white shadow-lg rounded-t-none  h-10  rounded-md mt-2 z-50">
//   <RoundLoader/>
//         </div>

//       )}
//               <button className="bg-black text-white px-4 py-2 rounded hover:opacity-90">
//                 Add
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
// export default SubChart1;
"use client";
import React from "react";
 import { mockData } from "../Searchbar/CompanySectionSearchbar";
import ReactECharts from "echarts-for-react";
import { Download, Plus, PlusIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { searchStock } from "@/services/search.services";
import { getEpsDataMetrices, getStockFinancialMetrices } from "@/services/stocksFinancialMetrics.services";
import RoundLoader from "../Loader/RoundLoader";
import { EPSData } from "./SubChartParent";
const generateColorPalette = (count: number): string[] => {
  const hues = Array.from({ length: count }, (_, i) => (i * 360) / count);
  return hues.map(h => `hsl(${h}, 70%, 60%)`);
};
 

type Props = {
  epsData: { eps: EPSData[]; symbol: string }[];
  handleAddEps: (newData: { eps: EPSData[]; symbol: string }) => void;
};

const SubChart1 = ({ epsData, handleAddEps }: Props) => {
   const [showModal, setShowModal] = React.useState(false);
   const [filterLoading, setFilterLoading] = React.useState(false);
   const [loading, setLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
const [filteredData, setFilteredData] = React.useState<typeof mockData>([]);
  const allDates = Array.from(
    new Set(
      epsData.flatMap(company =>
        company.eps.map(entry => entry.date)
      )
    )
  ).sort();

  const colors = generateColorPalette(epsData.length);
const companySeries = epsData.map((company, index) => {
  const dateToEps: Record<string, number> = {};
  company.eps.forEach(entry => {
    const parsed = parseFloat(String(entry.eps).replace(/[$,]/g, ""));
    if (!isNaN(parsed)) {
      dateToEps[entry.date] = parsed;
    }
  });

  const alignedSeries = allDates.map(date =>
    dateToEps[date] !== undefined ? dateToEps[date] : null
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
      opacity: 0.2
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

// You can still calculate averageEpsSeries here if needed for internal logic
// But DO NOT add averageSeries to the final series array

const option = {
  title: {
    text: "EPS Trends Over Time",
    left: "center",
    bottom: 10,
    textStyle: {
      color: "white",
      fontSize: 14
    }
  },
  tooltip: {
    trigger: "item",
    formatter: (params: any) => {
      return `
        <strong>${params.seriesName}</strong><br/>
        Quarter: ${params.name}<br/>
        EPS: ${params.value}
      `;
    }
  },
  legend: {
    type: "scroll",
    data: epsData.map(c => c.symbol.toUpperCase()), // Only companies, no EPS Average
    top: 0,
    textStyle: {
      color: "white"
    },
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
    splitLine: {
      show: false
    }
  },
  yAxis: {
    type: "value",
    name: "EPS",
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
      {/* Add Company Button */}
      <div className="flex flex-row justify-end w-full">
        <button
          onClick={() => setShowModal(true)}
          className="border border-[var(--variant-3)] border-2 rounded-md my-2 p-2 flex flex-row items-center text-xs text-[var(--variant-3)] cursor-pointer"
        >
          Add Company <PlusIcon className="h-4 ml-1" />
        </button>
      </div>

      {/* Chart */}
      <div style={{ padding: 20, backgroundColor: "#1f1f2e" }} className="rounded-md w-full">
        <ReactECharts option={option} style={{ height: "500px", width: "100%" }} />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60
 bg-opacity-10 z-50 flex items-center justify-center">
          <div className="bg-[#1f1f2e] text-black p-6 rounded-lg w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Add Company</h2>
              <button onClick={() => setShowModal(false)}>
                <X className="h-5 w-5 text-gray-300 cursor-pointer" />
              </button>
            </div>
            {filterLoading?<div className="flex flex-row items-center w-full my-2">
<RoundLoader/>

            </div>:
            <div className="flex flex-col space-y-4 relative">
                <Input
          placeholder="Search Company Name"
          value={searchQuery}
          onChange={async(e)=>{
             const query = e.target.value;
                setSearchQuery(query);
                setLoading(true)
                const searchedStock = await searchStock(query)
                setFilteredData(searchedStock.data!=null?searchedStock.data:[])
                setLoading(false)
                if (!query.trim()) {
                  setFilteredData([]);
                  return;
                }
            
          }}
          className="pl-10 pr-4    h-10 w-full rounded-md text-gray-200 bg-[#13131f] rounded-full border-none"
        />
        {searchQuery && !loading  && (filteredData.length>0?
        
        <div className="  t w-full bg-[#13131f] shadow-lg rounded-t-none   rounded-md mt-2 z-50 max-h-[300px] overflow-y-scroll">
          {filteredData.map((item, index) => (
           <button
           onClick={async()=>{
             setSearchQuery("")
             setFilterLoading(true)
 let response2 = await getEpsDataMetrices(item.symbol); 
 
 handleAddEps(response2.data as {eps:EPSData[],symbol:string}) 
 setFilterLoading(false)
 
 setSearchQuery("")
 setShowModal(false)
           }}
           key={index}   className="flex flex-col w-full items-start hover:bg-[#13131s]  p-3 ">
            <div
              key={index}
              className="hover:text-[var(--variant-6)] flex flex-row items-center justify-between w-full cursor-pointer  "
            >
              <span className="text-xs text-white">{item.name}</span>
              <span className="text-xs text-gray-400">{item.symbol}</span>
            </div>
             <div
              key={index}
              className="hover:text-[var(--variant-6)] flex flex-row items-center justify-start w-full   cursor-pointer  "
            >
              <span className="text-xs text-gray-400">{item.exchangeShortName}</span>
            </div></button>
          ))}
        </div>
      :  <div className="  top-2/3 absolute w-full bg-gray-400 shadow-lg rounded-t-none   rounded-md mt-2 z-50 ">
       <p className="  p-4">No Such Stock Exist</p>
       </div>
      )} 
     
      {searchQuery && loading && (
 <div className="   w-full bg-[#13131f] shadow-lg rounded-t-none  h-10  rounded-md mt-2 z-50">
  <RoundLoader/>
        </div>

      )}
               
            </div>}
          </div>
        </div>
      )}
    </div>
  )
}

export default SubChart1;
