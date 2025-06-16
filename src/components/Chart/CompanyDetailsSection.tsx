import React from "react";
import { appleData1d } from "@/global/constants";
import Link from "next/link";
const CompanyDetails = () => {
  return (
    <>
      <p>{`${appleData1d.chart.result[0].meta.fullExchangeName} - ${appleData1d.chart.result[0].meta.currency}`}</p>
      <div className="w-full flex flex-row items-center mt-2">
        <h1 className="text-3xl font-bold">Apple Inc. (AAPL)</h1>
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
              {appleData1d.chart.result[0].meta.price}
            </h1>
            <p
              className={`ml-4 text-lg ${
                appleData1d.chart.result[0].meta.priceChange >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {appleData1d.chart.result[0].meta.priceChange >= 0 ? "+" : ""}
              {appleData1d.chart.result[0].meta.priceChange} (
              {appleData1d.chart.result[0].meta.priceChangePercent})
            </p>
          </div>
          <div>
            <p className="w-full text-gray-500 text-xs">
              As of{" "}
              {new Date(
                appleData1d.chart.result[0].meta.timestamp
              ).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="w-5/12 flex flex-col items-start ml-4">
          <div className="w-full flex flex-row items-center">
            <h1 className="text-4xl font-bold">
              {appleData1d.chart.result[0].meta.previousClose}
            </h1>
            <p className="ml-4 text-gray-500 text-lg">Previous Close</p>
          </div>
          <div>
            <p className="w-full text-gray-500 text-xs">At close</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyDetails;
