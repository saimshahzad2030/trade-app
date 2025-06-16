import Navbar from "@/components/Navbar/Navbar";
import HistoricalData from "@/components/HistoricalData/HistoricalData";
import NavSecond from "@/components/Navbar/NavSecond";
export default function History() {
  return (
    <div className="flex flex-col items-center  w-full">
      <Navbar />

      <div className="relative flex flex-col    w-full overflow-x-hidden  pt-40 bg-[#13131f]">
        <NavSecond />
        <HistoricalData />
      </div>
    </div>
  );
}
