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
      <PortfolioSingle
        portfolio={{
          portfolioName: "Dividend Portfolio",
          symbols: 10,
          currency: "US$",
          costBasis: "$15,000",
          marketValue: "$16,200",
          dayChange: "+$200",
          unrealizedGainLoss: "+$1,200",
          realizedGainLoss: "+$800",
        }}
      />
    </div>
  );
};

export default PortfolioSinglePage;
