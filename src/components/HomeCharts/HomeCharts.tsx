import React from "react";
import DailyMarketSectorPerformance from "./DailyMarketSectorPerformance";
import DailyIndustryPerformanceChart from "./DailyIndustryPerformance";
import TopStocks from "./TopStocks";
const HomeCharts = () => {
  return (
    <div className=" px-8  flex flex-col items-center justify-center w-full min-h-[100vh] bg-[#13131f]  text-white p-4">
      <div className="grid grid-cols-5 w-full gap-4">
        <div className="flex flex-row items-start col-span-5 justify-between">
          <DailyMarketSectorPerformance />
          <DailyIndustryPerformanceChart />
        </div>
        {/* <TopStocks /> */}
      </div>
    </div>
  );
};

export default HomeCharts;
