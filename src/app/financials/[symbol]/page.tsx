import Navbar from "@/components/Navbar/Navbar";
import NavSecond from "@/components/Navbar/NavSecond";
import FinancialsSection from "@/components/FinancialsSection/FinancialsSection";
export default function Financials() {
  return (
    <div className="flex flex-col items-center    w-full">
      <Navbar />

      <div className="relative flex flex-col    w-full overflow-x-hidden  pt-40 bg-[#13131f]">
        <NavSecond />
        <FinancialsSection />
      </div>
    </div>
  );
}
