import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import Chart1 from "@/components/Chart/Chart1";
import Sidebar from "@/components/Sidebar/Sidebar";
import Link from "next/link";
import NavSecond from "@/components/Navbar/NavSecond";
export default function Home() {
  return (
    <div className="flex flex-col items-center  w-full">
      <Navbar />

      <div className="relative flex flex-col    w-full overflow-x-hidden  pt-40 bg-[#13131f]">
        <NavSecond />
        <Chart1 />
      </div>
    </div>
  );
}
