 
import Navbar from "@/components/Navbar/Navbar";
import NavSecond from "@/components/Navbar/NavSecond"; 
import ChartSection from "@/components/ChartSection/ChartSection";
 

 
export default function ChartPage() {
 

  return (
    <div className="flex flex-col items-center w-full">
      <Navbar />
      <div className="relative flex flex-col w-full overflow-x-hidden pt-40 bg-[#13131f]">
        <NavSecond />
        <ChartSection />
        {/* Optional: CompareSection if needed */}
        {/* <CompareSection /> */}
      </div>
    </div>
  );
}
