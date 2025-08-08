"use client"
import React from "react";
import ReactECharts from "echarts-for-react";
import {   IndustryData } from "./SubChartParent"; 
import { PlusIcon, X } from "lucide-react";
import RoundLoader from "../Loader/RoundLoader";  
import { getIndustryComparison } from "@/services/industry.services";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Industries } from "@/types/types";
import FullScreenLoader from "../Loader/FullScreenLoader";
import { toast } from "sonner"; 
const generateColorPalette = (count: number): string[] => {
  const hues = Array.from({ length: count }, (_, i) => (i * 360) / count);
  return hues.map(h => `hsl(${h}, 70%, 60%)`);
};

type Props = {
  industryData: { data: IndustryData[]; industry: string }[];
  industries:Industries;
  handleAddIndustry: (newData: { data: IndustryData[]; industry: string }) => void;
};
type FormValues = {
  industry: string;
};
const IndustryComparison = ({industries, industryData, handleAddIndustry }: Props) => {
  console.log(industryData,"industryData")
    const [values, setValues] = React.useState<FormValues>({ industry: "" });
const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };
   const [showModal, setShowModal] = React.useState(false);  
      const [loading, setLoading] = React.useState(false);
      const [filterLoading, setFilterLoading] = React.useState(false);
    
      const allDates = Array.from(
        new Set(industryData.flatMap(company => company.data.map(entry => entry.year)))
      ).sort();
    const averageGrowth = allDates.map((date) => {
    const values = industryData
      .map(c => c.data.find(g => g.year === date)?.value)
      .filter(v => v !== undefined) as number[];
    if (values.length === 0) return null;
    const sum = values.reduce((a, b) => a + b, 0);
    return +(sum / values.length).toFixed(2);
  });
  
      const colors = generateColorPalette(industryData.length);
    
      const companySeries = industryData.map((company, index) => {
        const dateToPE: Record<string, number> = {};
        company.data.forEach(entry => {
          const parsed = parseFloat(String(entry.value).replace(/[$,]/g, ""));
          if (!isNaN(parsed)) {
            dateToPE[entry.year] = parsed;
          }
        });
    
        const alignedSeries = allDates.map(date =>
          dateToPE[date] !== undefined ? dateToPE[date] : null
        );
    
        return {
          name: company.industry.toUpperCase(),
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
    
   const option = {
      title: {
        text: "Growth Trend",
        left: "center",
        bottom: 10,
        textStyle: {
          color: "white",
          fontSize: 14
        }
      },
      tooltip: {
  trigger: 'axis',
  valueFormatter: (value: number) => {
    if (Math.abs(value) >= 1_000_000_000_000) {
      return (value / 1_000_000_000_000).toFixed(2) + 'T';
    } else if (Math.abs(value) >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(2) + 'B';
    } else if (Math.abs(value) >= 1_000_000) {
      return (value / 1_000_000).toFixed(2) + 'M';
    } else if (Math.abs(value) >= 1_000) {
      return (value / 1_000).toFixed(2) + 'K';
    }
    return value.toString();
  }
}

  ,
      legend: {
        type: "scroll",
         data: [...industryData.map(c => c.industry.toUpperCase()) ],
  
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
        name: "",
        boundaryGap: false,
        data: allDates,
        axisLine: { lineStyle: { color: "#888" } },
        axisLabel: { color: "white" },
        splitLine: { show: false }
      },
      yAxis: {
        type: "value", 
    name: "Industry Growth",
  
        axisLine: { lineStyle: { color: "#888" } },
        axisLabel: {
    formatter: (value: number) => {
      if (Math.abs(value) >= 1_000_000_000_000) {
        return (value / 1_000_000_000_000).toFixed(2) + 'T';
      } else if (Math.abs(value) >= 1_000_000_000) {
        return (value / 1_000_000_000).toFixed(2) + 'B';
      } else if (Math.abs(value) >= 1_000_000) {
        return (value / 1_000_000).toFixed(2) + 'M';
      } else if (Math.abs(value) >= 1_000) {
        return (value / 1_000).toFixed(2) + 'K';
      }
      return value.toString();
    }
  }
,
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
    opacity: 0.09,

      type: "dashed",
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
          Add Industry <PlusIcon className="h-4 ml-1" />
        </button>
      </div>

      <div style={{ padding: 20, backgroundColor: "#1f1f2e" }} className="rounded-md w-full">
        <ReactECharts option={option} style={{ height: "500px", width: "100%" }} />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-[#1f1f2e] text-black p-6 rounded-lg w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Add Industry</h2>
              <button onClick={() => setShowModal(false)}>
                <X className="h-5 w-5 text-gray-300 cursor-pointer" />
              </button>
            </div>
            {filterLoading ? (
              <div className="flex flex-row items-center w-full my-2"><RoundLoader /></div>
            ) : (
              <div className="flex flex-col space-y-4 relative">
                    <div>
   
  <Select
    
    value={values.industry}
    onValueChange={async (value) => {
      setLoading(true)
      handleChange({ target: { name: "industry", value } });
        const fetchIndData:
    | { status: number; data: { industry_growth_currency: IndustryData[]; industry: string } }
    | { status: number; data: string } = await getIndustryComparison(value);

  if (typeof fetchIndData.data === "string") {
    // handle error case
    console.error("Error fetching industry data:", fetchIndData.data);
    return;
  }
 
  console.log(fetchIndData.data);

  handleAddIndustry({
    data: fetchIndData.data.industry_growth_currency,
    industry: value,
  });

  toast.success("Industry Added succesfully")
  setLoading(false)
  setShowModal(false)

}}
  >
    <SelectTrigger id="industry" className="w-full text-sm text-white ">
      <SelectValue placeholder="e.g., Consumer Electronics" />
    </SelectTrigger>
    <SelectContent>
      {industries.map((item) => (
        <SelectItem key={item.industry} value={item.industry}>
          {item.industry}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>
               
              
                {  loading && (
                  <div className="w-full bg-[#13131f] shadow-lg h-10 rounded-md mt-2 z-50">
                    <FullScreenLoader />
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

export default IndustryComparison;
