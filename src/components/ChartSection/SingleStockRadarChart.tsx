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

const SingleStockRadarChart = () => {
  const appleColor = ["#ff7c7c", "#ffbcbc"];

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

  const appleRawData = [25, 35, 60, 9, 1.2, 1.3, 250, 70];

  const optionsList = allIndicators.map((item) => ({
    label: item.name,
    value: item.name,
  }));

  const defaultSelected = optionsList.slice(0, 5);
  const [selectedIndicators, setSelectedIndicators] = useState<OptionType[]>(defaultSelected);

  const selectedNames = selectedIndicators.map((item) => item.value);
  const selectedIndexes = selectedNames.map(
    (name) => allIndicators.findIndex((ind) => ind.name === name)
  );

  const radarIndicators = allIndicators
    .filter((ind) => selectedNames.includes(ind.name))
    .map((ind) => ({ name: ind.name, max: 100 }));

  const normalizedValues = selectedIndexes.map((i) => {
    const value = appleRawData[i];
    const max = allIndicators[i].max;
    return (value / max) * 100;
  });

  const handleChange = (selected: MultiValue<OptionType>) => {
    if (selected.length >= 5) {
      setSelectedIndicators([...selected]);
    }
  };

  const option = {
    color: [appleColor[0]],
    title: {
      text: "Apple Financial Indicators",
      left: "center",
      bottom: 0,
      textStyle: {
        fontSize: 20,
        color: "#fff",
      },
    },
    tooltip: {},
    legend: {
      data: ["AAPL"],
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
        name: "AAPL",
        type: "radar",
        data: [
          {
            value: normalizedValues,
            name: "AAPL",
            label: {
              show: true,
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

export default SingleStockRadarChart;
