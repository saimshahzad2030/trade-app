"use client";
import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import Select, { MultiValue } from "react-select";
import { getSpecificStockRadarChart } from "@/services/stock.services";
import RoundLoader from "../Loader/RoundLoader";
type ChartSectionProps = {
    symbol: string;
};
type OptionType = {
  label: string;
  value: string;
};
type FinancialIndicatorsData = {
  display: {
    [key: string]: string | number;
  };
  normalized: {
    [key: string]: number;
  };
};

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "#0d0d14",
    borderColor: "#0c969C",
    color: "#fff",
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: "#0A7075",
    color: "white",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "white",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: "black",
    backgroundColor: "none",
    cursor: "pointer",
    ":hover": {
      backgroundColor: "none",
      color: "white",
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#0A7075" : "#13131f",
    color: "#fff",
    cursor: "pointer",
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "#1a1a1a",
    color: "#fff",
  }),
  input: (provided: any) => ({
    ...provided,
    color: "#fff",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#fff",
  }),
};

const SingleStockRadarChart = ({symbol}:ChartSectionProps) => {
  console.log(symbol,"symbol")
  const appleColor = ["#ff7c7c", "#ffbcbc"];
const allIndicators = [
  { name: "roc", label: "ROC", max: 30 },
  { name: "peRatio", label: "PE", max: 100 },
  { name: "grossProfitMargin", label: "Gross Margin", max: 80 },
  { name: "wacc", label: "WACC", max: 15 },
  { name: "debtToEquityRatio", label: "D/E Ratio", max: 3 },
  { name: "eps", label: "EPS", max: 5 },
  { name: "dcf", label: "DCF", max: 300 },
  { name: "fcff", label: "FCFF", max: 100 },
];
 const [chartData, setChartData] = React.useState<FinancialIndicatorsData | null>(null);

  const [chartDataLoading,setChartDataLoading] = React.useState<boolean>(false)
 

  const optionsList = allIndicators.map((item) => ({
    label: item.name,
    value: item.name,
  }));
  const defaultSelected = optionsList.slice(0, 5);
 
  const [selectedIndicators, setSelectedIndicators] = useState<OptionType[]>(defaultSelected);

const normalizedValues = chartData
  ? selectedIndicators.map((indicator) => {
      const normValue = chartData.normalized[indicator.value] ?? 0;
      const scaled = normValue * 100;
      return scaled < 1 && scaled > 0 ? 1 : scaled; // ✅ show 1 if very small but > 0
    })
  : [];



const displayValues = selectedIndicators.map((indicator) => {
  return chartData?.display[indicator.value] ?? "N/A";
});


  const selectedNames = selectedIndicators.map((item) => item.value);
  const selectedIndexes = selectedNames.map(
    (name) => allIndicators.findIndex((ind) => ind.name === name)
  );

  const radarIndicators = allIndicators
    .filter((ind) => selectedNames.includes(ind.name))
    .map((ind) => ({ name: ind.name, max: 100 }));

 

  const handleChange = (selected: MultiValue<OptionType>) => {
    if (selected.length >= 5) {
      setSelectedIndicators([...selected]);
    }
  };

  const option = {
    color: [appleColor[0]],
    title: {
      text: chartData?.display.name,
      left: "center",
      bottom: 0,
      textStyle: {
        fontSize: 20,
        color: "#fff",
      },
    },
  tooltip: {
  formatter: (params: any) => {
    if (!params || !params.value) return "";

    const items = params.value.map((val: number, idx: number) => {
      const label = selectedIndicators[idx]?.label ?? "";
      const display = displayValues[idx];
      return `<strong>${label}</strong>: ${display}`;
    });

    return items.join("<br/>");
  },
  backgroundColor: "#1a1a1a",
  borderColor: "#0A7075",
  textStyle: {
    color: "#fff",
  },
},

    legend: {
      data: [symbol],
      textStyle: {
        color: "#fff",
      },
    },
    radar: {
      indicator: radarIndicators,
      name: {
        textStyle: {
          color: "#fff",
        },
      },
      axisLine: {
        lineStyle: {
          color: "#fff",
        },
      },
      splitLine: {
        lineStyle: {
          color: "#fff",
        },
      },
    },
    series: [
      {
        name: chartData?.display.name,
        type: "radar",
        data: [
          {
            value: normalizedValues,
            name: "AAPL",
            label: {
  show: true,
  formatter: (_: any, idx: number) => `${displayValues[idx]}`,
  color: appleColor[0],
  fontWeight: "bold",
},

            areaStyle: {
              color: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  { offset: 0, color: appleColor[0] },
                  { offset: 1, color: appleColor[1] },
                ],
              },
              opacity: 0.6,
            },
            lineStyle: {
              color: appleColor[0],
              width: 2,
            },
            symbol: "none",
          },
        ],
      },
    ],
  };
  React.useEffect(()=>{
        const fetchChartData = async()=>{
          setChartDataLoading(true)
          let response = await getSpecificStockRadarChart(symbol);
          setChartDataLoading(false)
          setChartData(response.data['financial_indicators_data'].result)
          
        }
        fetchChartData()

      },[])
  return (
    <div className="col-span-2 bg-[#0d0d14] p-4 rounded-xl mt-8">
      {chartDataLoading? <RoundLoader/>:
      <> 
      <div className="mb-4">
        <Select
          options={optionsList}
          isMulti
          styles={customStyles}
          value={selectedIndicators}
          onChange={handleChange}
          closeMenuOnSelect={false}
          className="text-black"
        />
        {selectedIndicators.length < 5 && (
          <p className="text-red-500 mt-1">Please select at least 5 indicators</p>
        )}
      </div>
      <ReactECharts option={option} style={{ height: "500px" }} /></>}
    </div>
  );
};

export default SingleStockRadarChart;
