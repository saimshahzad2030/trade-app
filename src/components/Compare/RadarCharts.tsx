 
"use client";
import React, { useState, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import Select, { MultiValue } from "react-select";
import { ComparisonDataTypes } from "@/types/types";

type OptionType = { label: string; value: string };

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
    cursor: "pointer",
    ':hover': {
      color: "white",
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#0A7075" : "#13131f",
    color: "#fff",
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "#1a1a1a",
    color: "#fff",
  }),
  input: (provided: any) => ({ ...provided, color: "#fff" }),
  singleValue: (provided: any) => ({ ...provided, color: "#fff" }),
};

type Props = {
  stocks: {
    grossProfitMarginIndicator?:number,
            dcf?:number,
            debtToEquityRatioIndicator?:number,
            peRatioIndicator?:number,
            epsIndicator?:number,
            beta?:number,
            wacc?:number,
            fcff?:number,
            symbol?:string
  }[];
};
 

const RadarCharts = ({ stocks }: Props) => {
  const allIndicators = useMemo(() => {
    if (stocks.length === 0) return [];

    const keys = Object.keys(stocks[0]).filter((k) => k !== "symbol");

    const parseNumber = (val: any) => {
      const num = parseFloat(val);
      return isNaN(num) ? 0 : num;
    };

    const getMax = (key: string) =>
      Math.max(...stocks.map((s) => parseNumber((s as any)[key])), 0);

    // Convert camelCase to readable format: "grossProfitMarginIndicator" → "Gross Profit Margin Indicator"
    const toLabel = (key: string) =>
      key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .trim();

    return keys.map((key) => ({
      key,
      name: toLabel(key),
      max: getMax(key),
    }));
  }, [stocks]);

  const optionsList = allIndicators.map((item) => ({
    label: item.name,
    value: item.name,
  }));

  const defaultSelected = optionsList.slice(0, 5);
  const [selectedIndicators, setSelectedIndicators] = useState<OptionType[]>(defaultSelected);

  const radarIndicators = useMemo(() => {
    return allIndicators
      .filter((ind) => selectedIndicators.find((sel) => sel.value === ind.name))
      .map((ind) => ({ name: ind.name, max: 100 }));
  }, [selectedIndicators, allIndicators]);

  const normalizedStockData = useMemo(() => {
    return stocks.map((stock) => {
      const normalized = selectedIndicators.map((ind) => {
        const fullIndicator = allIndicators.find((i) => i.name === ind.value);
        if (!fullIndicator) return 0;

        let raw = (stock as any)[fullIndicator.key];

        if (typeof raw === "string") {
          raw = raw.replace("%", "").replace("$", "").replace("B", "").replace("T", "");
        }

        const val = parseFloat(raw);
        const max = fullIndicator.max;

        return isNaN(val) ? 0 : Math.min((val / max) * 100, 100);
      });

      return {
        value: normalized,
        name: stock.symbol,
      };
    });
  }, [stocks, selectedIndicators, allIndicators]);

  const option = {
    title: {
      text: "Financial Radar Comparison",
      left: "center",
      bottom: 0,
      textStyle: { fontSize: 20, color: "#fff" },
    },
    tooltip: {
      formatter: (params: any) => {
        const label = params.name;
        const stock = stocks.find((s) => s.symbol === label);

        const values = selectedIndicators.map((ind) => {
        const fullKey = ind.value;
  if (!fullKey) return `${ind.label}: N/A`; // or skip it entirely

  let raw = (stock as any)[fullKey];
          if (typeof raw === "string") {
            raw = raw.replace("%", "").replace("$", "").replace("B", "").replace("T", "");
          }

          const val = parseFloat(raw);
          const displayValue = isNaN(val) ? "N/A" : val.toLocaleString();

          return `${ind.value}: ${displayValue}`;
        });

        return `<strong>${label}</strong><br/>${values.join("<br/>")}`;
      },
    },
    legend: {
      data: stocks.map((s) => s.symbol),
      textStyle: { color: "#fff" },
    },
    radar: {
      indicator: radarIndicators,
      name: {
        textStyle: { color: "#fff" },
      },
      axisLine: { lineStyle: { color: "#fff" } },
      splitLine: { lineStyle: { color: "#444" } },
    },
    series: [
      {
        type: "radar",
        data: normalizedStockData,
        areaStyle: { opacity: 0.5 },
        symbol: "none",
        itemStyle: { borderColor: "#fff", borderWidth: 1 },
        lineStyle: { width: 2 },
      },
    ],
  };

  const handleChange = (selected: MultiValue<OptionType>) => {
    if (selected.length >= 5) {
      setSelectedIndicators([...selected]);
    }
  };

  return (
    <div className="col-span-2 bg-[#0d0d14] p-4 rounded-xl mt-8">
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
      <ReactECharts option={option} style={{ height: "500px" }} />
    </div>
  );
};


export default RadarCharts;
