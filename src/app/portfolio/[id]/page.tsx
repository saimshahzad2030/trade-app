import Navbar from "@/components/Navbar/Navbar";
import NavSecond from "@/components/Navbar/NavSecond";
import PortfolioSingle from "@/components/PortfolioSingle/PortfolioSingle";
import React from "react";

const PortfolioSinglePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <div className="flex flex-col items-center   w-full">
      <Navbar />

      <NavSecond />
      <PortfolioSingle />
    </div>
  );
};

export default PortfolioSinglePage;
