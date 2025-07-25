"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Crown } from "lucide-react";
const NavSecond = () => {
  const pathName = usePathname();
  let parts = pathName.split("/")[2];  
  return (
    <div className="z-40 fixed top-[56px] mb-8 px-8 flex flex-row items-center justify-start text-white space-x-6 py-3 bg-[#13131f] duration-300 transition-all w-full   border border-amber-200 border-t-0 border-l-0 border-r-0 border-b-[var(--variant-4)] shadow-[0_2px_10px_var(--variant-2)]">
      <div className="flex flex-col items-start cursor-pointer group">
         
        <Link href={`/summary/${pathName.split("/")[2]}`}>
          <h1
            className={`text-sm ${
            pathName === `/summary/${pathName.split("/")[2]}`
      ? "text-[var(--variant-4)] font-semibold"
      : "text-current"
  }  group-hover:text-[var(--variant-4)] duration-300 transition-all`}
          >
            Summary
          </h1>
        </Link>
      </div>
      <div className="flex flex-col items-start cursor-pointer group">
        <Link href={`/chart/${pathName.split("/")[2]}`}>
          <h1
            className={`text-sm ${
             pathName === `/chart/${pathName.split("/")[2]}`
      ? "text-[var(--variant-4)] font-semibold"
      : "text-current"
  }  group-hover:text-[var(--variant-4)] duration-300 transition-all`}
          >
            Chart
          </h1>
        </Link>
      </div>
      <div className="flex flex-col items-start cursor-pointer group">
        <Link href={`/history/${pathName.split("/")[2]}`}>
          <h1
           className={`text-sm ${
    pathName === `/history/${pathName.split("/")[2]}`
      ? "text-[var(--variant-4)] font-semibold"
      : "text-current"
  } group-hover:text-[var(--variant-4)] duration-300 transition-all`}
          >
            History
          </h1>
        </Link>
      </div>
      <div className="flex flex-col items-start cursor-pointer group">
        <Link  href={`/statistics/${pathName.split("/")[2]}`} >
          <h1
            className={`text-sm 
              ${
    pathName === `/statistics/${pathName.split("/")[2]}`
      ? "text-[var(--variant-4)] font-semibold"
      : "text-current"
  }  group-hover:text-[var(--variant-4)] duration-300 transition-all`}
          >
            Statistics
          </h1>
        </Link>
      </div>
      <div className="flex flex-col items-start cursor-pointer group">
        <Link href={`/financials/${pathName.split("/")[2]}`}   className="flex flex-row items-center">
          <h1
            className={`text-sm ${
              pathName === `/financials/${pathName.split("/")[2]}`
      ? "text-[var(--variant-4)] font-semibold"
      : "text-current"
  }  group-hover:text-[var(--variant-4)] duration-300 transition-all`}
          >
            Financials
          </h1>
        </Link>
      </div>
      {/* <div className="flex flex-col items-start cursor-pointer group">
        <Link href={`/stock-screening/${pathName.split("/")[2]}`} className="flex flex-row items-center">
          <h1
            className={`text-sm ${
              pathName == "/stock-screening"
                ? "text-[var(--variant-4)] font-semibold"
                : " text-current "
            } group-hover:text-[var(--variant-4)] duration-300 transition-all`}
          >
            Stock Screening
          </h1>
        </Link>
      </div> */}
      {/* <div className="flex flex-col items-start cursor-pointer group">
        <Link href={`/housing/`}  className="flex flex-row items-center">
          <h1
            className={`text-sm ${
              pathName == "/housing"
                ? "text-[var(--variant-4)] font-semibold"
                : " text-current "
            } group-hover:text-[var(--variant-4)] duration-300 transition-all`}
          >
            Housing
          </h1>
          <Crown className="h-4 w-4 ml-1 text-amber-500 group-hover:text-[var(--variant-4)] duration-300 transition-all" />
        </Link>
      </div> */}
      <div className="flex flex-col items-start cursor-pointer group">
        <Link href={`/portfolio`}>
          <h1
            className={`text-sm ${
              pathName == "/portfolio"
                ? "text-[var(--variant-4)] font-semibold"
                : " text-current "
            } group-hover:text-[var(--variant-4)] duration-300 transition-all`}
          >
            Portfolio
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default NavSecond;
