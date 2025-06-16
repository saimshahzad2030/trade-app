import Navbar from "@/components/Navbar/Navbar";
import HistoricalData from "@/components/HistoricalData/HistoricalData";
import NavSecond from "@/components/Navbar/NavSecond";
import StatisticsSection from "@/components/Statistics/StatisticsSection";
export default function Statistics() {
  return (
    <div className="flex flex-col items-center   w-full">
      <Navbar />

      <div className="relative flex flex-col    w-full overflow-x-hidden  pt-40 bg-[#13131f]">
        <NavSecond />
        <StatisticsSection />
      </div>
    </div>
  );
}
