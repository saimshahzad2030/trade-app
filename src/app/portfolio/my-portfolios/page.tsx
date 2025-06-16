import Navbar from "@/components/Navbar/Navbar";
import NavSecond from "@/components/Navbar/NavSecond";
import CompareSection from "@/components/Compare/CompareSection";
import ChartSection from "@/components/ChartSection/ChartSection";
import Portfolio from "@/components/Portfolio/Portfolio";
import Portfolios from "@/components/Portfolio/Portfolios";
export default function MyPorfoliosPage() {
  return (
    <div className="flex flex-col items-center   w-full">
      <Navbar />

      <NavSecond />
      <Portfolios />
    </div>
  );
}
