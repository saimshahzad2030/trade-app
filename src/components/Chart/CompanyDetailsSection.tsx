import React from "react";
import { appleData1d } from "@/global/constants";
import Link from "next/link";
import { companyData, MetaDataType } from "@/types/types";
import { getSpecificStockSummaryData } from "@/services/stock.services";
import RoundLoader from "../Loader/RoundLoader";
import { useParams } from "next/navigation";
type CompanyMeta = companyData["chart"]["result"][0]["meta"];
export type StockMetaResponse = {
  meta: {
    ticker: string;
    exchange: string;
    previousClose: string;
    open: string;
    changePercent: string;
    dayRange: string;
    week52Range: string;
    volume: string;
    avgVolume: string;
    marketCap: string;
    currency: string;
    symbol: string;
    exchangeName: string;
    regularMarketTime: string;
    exchangeTimezoneName: string;
    regularMarketPrice: string;
    fiftyTwoWeekHigh: string;
    fiftyTwoWeekLow: string;
    regularMarketDayHigh: string;
    regularMarketDayLow: string;
    regularMarketVolume: string;
    priceAvg1Y: string;
    beta: string;
    chartPreviousClose: string;
    priceHint: number;
    instrumentType: string;
    revenue: string;
    grossProfit: string;
    ebitda: string;
    peRatio: string;
    eps: string;
    earningsDate: string;
    companyName: string;
    website: string;
    fullTimeEmployees: string;
    sector: string;
    industry: string;
    priceChange:number;
    description: string;
    fiscalYearEnds: string;
    firstTradeDate: number;
    dividend: string;
    yield: string;
    expenseRatio: string;
  };
  error: null | string;
};

type CompanyDetailsProps = {
  // chartData: CompanyMeta;
  metaData?:MetaDataType | null;
  loading:boolean
};

const CompanyDetails = ({loading,metaData  }: CompanyDetailsProps) => {
  const params = useParams<{ symbol: string}>()
      let {symbol} = params;
   
  return (
    <>{loading?<div className="flex flex-col items-center w-full py-12"><RoundLoader/></div>:
     <>
      <p>{`${metaData?.meta.exchangeName} - ${metaData?.meta.currency}`}</p>
      <div className="w-full flex flex-row items-center mt-2">
        <h1 className="text-3xl font-bold">{metaData?.meta.companyName}</h1>
        <Link href={"/compare"}>
          <button className="ml-4 cursor-pointer p-1 px-2 text-xs rounded-full bg-[#13131f] border text-white border-white hover:border-[var(--variant-4)] hover:text-[var(--variant-4)]">
            Compare
          </button>
        </Link>
      </div>
      <div className="w-full bg-[var(--variant-4)] h-[0.2px] my-2"></div>
      <div className="w-full flex flex-row items-center">
        <div className="w-5/12 flex flex-col items-start">
          <div className="w-full flex flex-row items-center">
            <h1 className="text-4xl font-bold">
              {metaData?.meta.open}
                </h1>
            <p
              className={`ml-4 text-lg ${
              metaData?.meta.pricechange !== undefined && metaData?.meta.pricechange >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              { metaData?.meta.pricechange !== undefined &&  metaData?.meta.pricechange >= 0 ? "+" : ""}
              { metaData?.meta.pricechange} (
              { metaData?.meta.changePercent}%)
            </p>
          </div>
          <div>
            <p className="w-full text-gray-500 text-xs">
              As of{" "}
              {/* {new Date(
                appleData1d.chart.result[0].meta.timestamp
              ).toLocaleString()} */}
              {new Date().toLocaleString()}

            </p>
          </div>
        </div>
        <div className="w-5/12 flex flex-col items-start ml-4">
          <div className="w-full flex flex-row items-center">
            <h1 className="text-4xl font-bold">
              {metaData?.meta.previousClose}
            </h1>
            <p className="ml-4 text-gray-500 text-lg">Previous Close</p>
          </div>
          <div>
            <p className="w-full text-gray-500 text-xs">At close</p>
          </div>
        </div>
      </div>
    </>
    }</>
  );
};

export default CompanyDetails;
