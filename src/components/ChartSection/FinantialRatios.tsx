 


import { getSpecificStockKeyFinancialRatios } from "@/services/stock.services";
import React from "react";
import RoundLoader from "../Loader/RoundLoader";
interface RatioGroup {
  title: string;
  data: Record<string, string>;
}
const keyMappings: Record<string, Record<string, string>> = {
  "Profitability & Efficiency": {
    grossProfitMargin: "Gross Profit Margin",
    operatingProfitMargin: "Operating Profit Margin",
    netProfitMargin: "Net Profit Margin",
    returnOnEquity: "ROE",
    assetTurnover: "Assets Turnover",
    equityMultiplier: "Equity Multiplier",
    leverageRatio: "Leverage Ratio",
    totalDebt: "Total Debt",
    totalEquity: "Total Equity",
    debtPlusEquity: "Debt + Equity",
  },
  "Debt & Interest": {
    debtToEquityRatio: "D/E Ratio",
    interestExpense: "Interest Expense",
    taxRate: "Tax Rate",
    "int(1–T)": "INT(1-T)",
    workingAssets: "Working Assets",
    workingLiabilities: "Working Liabilities",
    workingCapital: "Working Capital",
    changeInWorkingCapital: "WCInv",
    propertyPlantEquipmentGross: "PPE Gross",
  },
  "Cash Flow & Return": {
    FCInv: "FCInv",
    "EBIT(1–T)": "EBIT(1-T)",
    "FCFF (EBIT)": "FCFF (EBIT)",
    "FCFF (INT)": "FCFF (INT)",
    ROC: "ROC",
    Reinvestment: "Reinvestment",
    EPS: "EPS",
    "EPS Growth": "EPS Growth",
  },
  "Market Ratios": {
    currentRatio: "Current Ratio",
    cashRatio: "Cash Ratio",
    ebtPerEbit: "EBT/EBIT",
    "P/E Ratio": "P/E Ratio",
    priceToSalesRatio: "Price to Sales",
    "Price to Book": "Price to Book",
  },
};

type ChartSectionProps = {
    symbol: string;
};
const FinancialRatiosTables = ({symbol}:ChartSectionProps) => {
  const [groupedRatios, setGroupedRatios] = React.useState<RatioGroup[]>([]);
  const [loading,setLoading] = React.useState<boolean>(false)
    React.useEffect(() => {
  const fetchChartData = async () => {
    setLoading(true)
    const response = await getSpecificStockKeyFinancialRatios(symbol);
    setLoading(false)
   const rawGroups = response?.data.ratios?.result as Record<string, Record<string, string | number>>;

    if (!rawGroups) return;

    const transformed: RatioGroup[] = Object.entries(rawGroups).map(
      ([sectionTitle, sectionData]) => {
        const displayKeys = keyMappings[sectionTitle] || {};

        const formattedData: Record<string, string> = {};
        for (const [rawKey, value] of Object.entries(sectionData)) {
          const displayName = displayKeys[rawKey] || rawKey;
          formattedData[displayName] = String(value);
        }

        return {
          title: sectionTitle,
          data: formattedData,
        };
      }
    );
    console.log(transformed,"transformed")
    setGroupedRatios(transformed);
  };

  fetchChartData();
}, [symbol]);

  
  return (
        <div className="flex flex-col w-full items-center p-6 rounded-xl  mt-8 bg-[#0f0e17]">
        <h1 className="text-center text-4xl font-bold mb-2 ">Key Financial Ratios (AAPL)</h1>
    <div className="  text-white grid grid-cols-2  w-full">
     <>
     {loading?
     <div className="col-span-2 w-full flex flex-row justify-center p-4">
      <RoundLoader/>
     </div>:
    groupedRatios.length<1?<p className="col-span-2 w-full text-center text-red-600">Error fetching Financial Ratios</p>: groupedRatios.map((group, idx) => {
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
      
      </>
    </div></div>
  );
};

export default FinancialRatiosTables;
