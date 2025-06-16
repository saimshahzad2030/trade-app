import Navbar from "@/components/Navbar/Navbar";
import NavSecond from "@/components/Navbar/NavSecond";
import CompareSection from "@/components/Compare/CompareSection";
import ChartSection from "@/components/ChartSection/ChartSection";
import { poppins } from "@/fonts/fonts";
import PremiumContent from "@/components/PremiumComponent/PremiumContent";
export default function Housing() {
  return (
    <div className={`flex flex-col items-center   w-full ${poppins.className}`}>
      <Navbar />

      <div className="relative flex flex-col    w-full overflow-x-hidden  pt-40 bg-[#13131f]">
        <NavSecond />
        {/* <div className="flex flex-col items-center justify-center w-full h-[80vh]">
          <p className="text-center text-white text-xl ">
            Housing Page is in progress
          </p>
        </div> */}
        <PremiumContent />
        {/* <ChartSection /> */}
      </div>
    </div>
  );
}
