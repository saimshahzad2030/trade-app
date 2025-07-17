import Navbar from "@/components/Navbar/Navbar";
import NavSecond from "@/components/Navbar/NavSecond";
import CompareSection from "@/components/Compare/CompareSection";
import ChartSection from "@/components/ChartSection/ChartSection";
import Portfolio from "@/components/Portfolio/Portfolio";
export default function Porfolio() {
  return (
    <div className="flex flex-col items-center   w-full">
      <Navbar />

      <div className="relative flex flex-col    w-full overflow-x-hidden  pt-20 bg-[#13131f]">
        {/* <NavSecond /> */}
        <Portfolio />
      </div>
    </div>
  );
}
