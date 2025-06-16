"use client";
import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import Select, { MultiValue } from "react-select";
type OptionType = {
  label: string;
  value: string;
};
const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "#0d0d14", // dark background
    borderColor: "#0c969C",
    color: "#fff",
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: "#0A7075", // light orange chip
    color: "white",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "white", // label text inside chip
    // fontWeight: "bold",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: "black",
    backgroundColor:'none',
    cursor:'pointer',
    ':hover': {
      backgroundColor: "none",
      color: "white",
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#0A7075" : "#13131f",
    color: state.isFocused ? "#fff" : "#fff",
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
const RadarCharts = () => {
  const colors = {
    AAPL: ["#ff7c7c", "#ffbcbc"],
    MSFT: ["#7cb5ff", "#cce4ff"],
    GOOGL: ["#7cffcb", "#b2f5df"],
  };

  const allIndicators = [
    { name: "ROC", max: 30 },
    { name: "PE", max: 100 },
    { name: "Gross Margin", max: 80 },
    { name: "WACC", max: 15 },
    { name: "D/E Ratio", max: 3 },
    { name: "BetaEPS", max: 5 },
    { name: "DCF", max: 300 },
    { name: "FCFF", max: 100 },
  ];

  const optionsList = allIndicators.map((item) => ({
    label: item.name,
    value: item.name,
  }));

  const defaultSelected = optionsList.slice(0, 5);
  const [selectedIndicators, setSelectedIndicators] = useState<OptionType[]>(defaultSelected);

  const stockData = [
    {
      name: "AAPL",
      value: [25, 35, 60, 9, 1.2, 1.3, 250, 70],
      color: colors.AAPL,
    },
    {
      name: "MSFT",
      value: [20, 40, 65, 10, 1.5, 1.7, 270, 75],
      color: colors.MSFT,
    },
    {
      name: "GOOGL",
      value: [22, 32, 55, 8, 1.1, 1.2, 240, 60],
      color: colors.GOOGL,
    },
  ];

  const selectedNames = selectedIndicators.map((item) => item.value);
  const selectedIndexes = selectedNames.map(
    (name) => allIndicators.findIndex((ind) => ind.name === name)
  );

  const radarIndicators = allIndicators
    .filter((ind) => selectedNames.includes(ind.name))
    .map((ind) => ({ name: ind.name, max: 100 })); // Normalized to 100

  const option = {
    title: {
      text: "Financial Radar Comparison",
      left: "center",
      bottom: 0,
      textStyle: { fontSize: 20, color: "#fff" },
    },
    tooltip: {},
    legend: {
      data: stockData.map((s) => s.name),
      textStyle: {
        color: "#fff",
        rich: {
          AAPL: { color: colors.AAPL[0], fontWeight: "bold" },
          MSFT: { color: colors.MSFT[0], fontWeight: "bold" },
          GOOGL: { color: colors.GOOGL[0], fontWeight: "bold" },
        },
      },
      formatter: function (name:string) {
        return `{${name}|${name}}`;
      },
    },

    radar: {
      indicator: radarIndicators,
      name: {
        formatter: (name:string) => name,
        textStyle: { color: "#fff" },
      },
      axisLine: { lineStyle: { color: "#fff" } },
      splitLine: { lineStyle: { color: "#fff" } },
    },

    series: [
      {
        type: "radar",
        data: stockData.map((stock) => {
          const normalizedValues = selectedIndexes.map((i) => {
            const value = stock.value[i];
            const max = allIndicators[i].max;
            return (value / max) * 100;
          });

          return {
            value: normalizedValues,
            name: stock.name,
            label: {
              show: true,
              color: stock.color[0],
              fontWeight: "bold",
            },
            areaStyle: {
              color: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  { offset: 0, color: stock.color[0] },
                  { offset: 1, color: stock.color[1] },
                ],
              },
              opacity: 0.4,
            },
            lineStyle: {
              color: stock.color[0],
              width: 2,
            },
            symbol: "none",
            itemStyle: { color: stock.color[0] },
          };
        }),
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
