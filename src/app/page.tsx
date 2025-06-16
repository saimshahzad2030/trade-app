import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import Chart1 from "@/components/Chart/Chart1";
import Sidebar from "@/components/Sidebar/Sidebar";
import Link from "next/link";
import NavSecond from "@/components/Navbar/NavSecond";
import Landing from "@/components/Landing/Landing";
import InvestmentIdeas from "@/components/InvestmentIdeas/InvestmentIdeas";
import HomeCharts from "@/components/HomeCharts/HomeCharts";
import ThingsWeAnalyze from "@/components/ThingsWeAnalyze/ThingsWeAnalyze";
export default function Home() {
  return (
    <div className="flex flex-col items-center  w-full">
      <Navbar />
      <Landing />
      <InvestmentIdeas />
      <HomeCharts />
      <ThingsWeAnalyze />
    </div>
  );
}
