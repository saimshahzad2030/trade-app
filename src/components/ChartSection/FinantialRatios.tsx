// import React from "react";
// import ReactECharts from "echarts-for-react";
// const colorPalette = [
//   "#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#E96479",
//   "#845EC2", "#FFC75F", "#0081CF", "#C34A36", "#00C9A7"
// ];
// // Values now include units (as strings)
// // Add this type
// type RatioGroup = {
//   title: string;
//   data: Record<string, string>;
// };

// const groupedRatios: RatioGroup[] = [
//   {
//     title: "Profitability & Efficiency",
//     data: {
//       "Gross Profit Margin": "46%",
//       "Operating Profit Margin": "32%",
//       "Net Profit Margin": "24%",
//       ROE: "18%",
//       "Assets Turnover": "0.72",
//       "Equity Multiplier": "3.5",
//       "Leverage Ratio": "1.9",
//       "Total Debt": "$100B",
//       "Total Equity": "$50B",
//       "Debt + Equity": "$150B",
//     },
//   },
//   {
//     title: "Debt & Interest",
//     data: {
//       "D/E Ratio": "2.0",
//       "Interest Expense": "$5B",
//       "Cost of Debt": "5%",
//       "Tax Rate": "21%",
//       "INT(1-T)": "$3.95B",
//       "Working Assets": "$80B",
//       "Working Liabilities": "$45B",
//       "Working Capital": "$35B",
//       WCInv: "$2B",
//       "PPE Gross": "$200B",
//     },
//   },
//   {
//     title: "Cash Flow & Return",
//     data: {
//       FCInv: "$20B",
//       "EBIT(1-T)": "$90B",
//       "FCFF (EBIT)": "$65B",
//       "FCFF (INT)": "$68B",
//       ROC: "43%",
//       Reinvestment: "$10B",
//       EPS: "$5.25",
//       "EPS Growth": "12%",
//       WACC: "8.7%",
//       "Risk-Free Rate": "4%",
//     },
//   },
//   {
//     title: "Market Metrics",
//     data: {
//       "Unlevered Beta": "1.1",
//       "Levered Beta": "1.45",
//       "Market Risk Premium": "6%",
//       "Cost of Equity (Ke)": "12.7%",
//       "Cost of Debt (Kd)": "5%",
//       "Equity Weight (We)": "40%",
//       "Debt Weight (Wd)": "60%",
//       "EV/EBITDA": "12.5",
//       "P/E Ratio": "18.7",
//       "Price to Book": "4.2",
//     },
//   },
// ];


// // Helper: Extract numeric value from unit string (e.g., "$100B", "46%")
// const extractNumber = (value: string): number => {
//   if (typeof value !== "string") return 0;
//   let cleaned = value.replace(/[^\d.-]/g, ""); // Remove $, %, B, etc.
//   let num = parseFloat(cleaned);
//   if (value.includes("B")) num *= 1e9;
//   return isNaN(num) ? 0 : num;
// };

// const generatePolarOption = (
//   title: string,
//   data: Record<string, string>
// ): echarts.EChartsOption => {
//   const names = Object.keys(data);
//   const values = names.map((name) => extractNumber(data[name]));

//   return {
//     title: {
//       text: title,
//       left: "center",
//       textStyle: {
//         color: "white",
//         fontWeight: "bold",
//         fontSize: 20,
//       },
//     },
//     polar: {
//       radius: [30, "80%"],
//     },
//     angleAxis: {
//       max: Math.max(...values) * 1.1,
//       startAngle: 75,
//     },
//     radiusAxis: {
//       type: "category",
//       data: names,
//       axisLabel: {
//         show: false,
//       },
//       axisTick: {
//         show: false,
//       },
//       axisLine: {
//         show: false,
//       },
//     },
//     tooltip: {
//       trigger: "item",
//       formatter: (params: any) =>
//         `${params.name}: ${data[params.name]}`, // Show value with unit
//     },
//     series: {
//       type: "bar",
//       coordinateSystem: "polar",
//       data: values.map((v, i) => ({
//         value: v,
//         itemStyle: { color: colorPalette[i % colorPalette.length] },
//       })),
//       label: {
//         show: false,
//       },
//     //   itemStyle: {
//     //     color: "white",
//     //   },
//     },
//   };
// };

// const FinancialRatiosGrid = () => {
//   return (
//    <div className="flex flex-col gap-10 bg-[#0f0e17] p-6 rounded-xl">
//       {groupedRatios.map((group, index) => {
//         const names = Object.keys(group.data);
//         return (
//           <div key={index} className="flex gap-6 items-start">
//             {/* Chart on Left */}
//             <div className="w-1/2">
//               <ReactECharts
//                 option={generatePolarOption(group.title, group.data)}
//                 style={{ height: "400px", width: "100%" }}
//               />
//             </div>
//             {/* Stat list on Right */}
//             <div className="w-1/2 text-white">
//               {names.map((key, idx) => (
//                 <div key={idx} className="flex items-center gap-2 mb-2">
//                   <div
//                     className="w-3 h-3 rounded-full"
//                     style={{ backgroundColor: colorPalette[idx % colorPalette.length] }}
//                   />
//                   <span className="font-semibold">{key}:</span>
//                   <span>{group.data[key]}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default FinancialRatiosGrid;




import React from "react";
interface RatioGroup {
  title: string;
  data: Record<string, string>;
}
const groupedRatios:RatioGroup[] = [
  {
    title: "Profitability & Efficiency",
    data: {
      "Gross Profit Margin": "46%",
      "Operating Profit Margin": "32%",
      "Net Profit Margin": "24%",
      ROE: "18%",
      "Assets Turnover": "0.72",
      "Equity Multiplier": "3.5",
      "Leverage Ratio": "1.9",
      "Total Debt": "$100B",
      "Total Equity": "$50B",
      "Debt + Equity": "$150B",
    },
  },
  {
    title: "Debt & Interest",
    data: {
      "D/E Ratio": "2.0",
      "Interest Expense": "$5B",
      "Cost of Debt": "5%",
      "Tax Rate": "21%",
      "INT(1-T)": "$3.95B",
      "Working Assets": "$80B",
      "Working Liabilities": "$45B",
      "Working Capital": "$35B",
      WCInv: "$2B",
      "PPE Gross": "$200B",
    },
  },
  {
    title: "Cash Flow & Return",
    data: {
      FCInv: "$20B",
      "EBIT(1-T)": "$90B",
      "FCFF (EBIT)": "$65B",
      "FCFF (INT)": "$68B",
      ROC: "43%",
      Reinvestment: "$10B",
      EPS: "$5.25",
      "EPS Growth": "12%",
      WACC: "8.7%",
      "Risk-Free Rate": "4%",
    },
  },
  {
    title: "Market Metrics",
    data: {
      "Unlevered Beta": "1.1",
      "Levered Beta": "1.45",
      "Market Risk Premium": "6%",
      "Cost of Equity (Ke)": "12.7%",
      "Cost of Debt (Kd)": "5%",
      "Equity Weight (We)": "40%",
      "Debt Weight (Wd)": "60%",
      "EV/EBITDA": "12.5",
      "P/E Ratio": "18.7",
      "Price to Book": "4.2",
    },
  },
];

const FinancialRatiosTables = () => {
  return (
        <div className="flex flex-col w-full items-center p-6 rounded-xl  mt-8 bg-[#0f0e17]">
        <h1 className="text-center text-4xl font-bold mb-2 ">Key Financial Ratios (AAPL)</h1>
    <div className="  text-white grid grid-cols-2  w-full">
      {groupedRatios.map((group, idx) => {
        const keys = Object.keys(group.data) as string[];
        return (
          <div key={idx}>
            <h2 className="text-xl font-bold mb-4  mt-8">{group.title}</h2>
            <table className="w-full border-collapse border border-gray-700">
              <thead>
                <tr className="bg-gray-800">
                  <th className="border border-gray-600 p-2 text-left w-1/2">Metric</th>
                  <th className="border border-gray-600 p-2 text-left w-1/2">Value</th>
                </tr>
              </thead>
              <tbody>
               {keys.map((key, i) => (
  <tr key={i} className={i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}>
    <td className="border border-gray-600 p-2">{key}</td>
    <td className="border border-gray-600 p-2">{(group.data as Record<string, string>)[key]}</td>
  </tr>
))}

              </tbody>
            </table>
          </div>
        );
      })}
    </div></div>
  );
};

export default FinancialRatiosTables;
