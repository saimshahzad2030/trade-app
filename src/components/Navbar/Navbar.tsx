"use client";
import React from "react";
import SearchBar from "../Searchbar/Searchbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  return (
    <div className=" fixed w-full  z-50">
      <div
        className={`px-8 flex flex-row items-center relative py-4 justify-between h-[10vh] ${
          pathName == "/"
            ? " backdrop-blur-md backdrop-saturate-150 bg-[rgba(19,19,31,0.15)] "
            : "bg-[#13131f]"
        } `}
      >
        {/* <img className="h-8 w-auto" src="/assets/logo.png" /> */}
        <Link href={"/"} className="text-3xl font-bold text-[var(--variant-3)]">
          LOGO 
        </Link>
        
        {pathName !== "/" && <SearchBar />}
 
        <div className="flex flex-row items-center justify-end  w-5/12  ">
           <div className="flex flex-row items-center mr-4">
          <Link href={"/chart"} className={ `font-bold ml-4 text-sm ${pathName=='/chart'?'text-[var(--variant-4)]':'text-white'} hover:text-[var(--variant-4)] transition-colors duration-300`}>
          Chart
        </Link>
        <Link href={"/housing"} className={ `font-bold ml-4 text-sm ${pathName=='/housing'?'text-[var(--variant-4)]':'text-white'} hover:text-[var(--variant-4)] transition-colors duration-300`}>
          Housing
        </Link>
        <Link href={"/stock-screening"} className={ `font-bold ml-4 text-sm ${pathName=='/stock-screening'?'text-[var(--variant-4)]':'text-white'} hover:text-[var(--variant-4)] transition-colors duration-300`}>
          Screener
        </Link>
        <Link href={"/pricing"} className={ `font-bold ml-4 text-sm ${pathName=='/pricing'?'text-[var(--variant-4)]':'text-white'} hover:text-[var(--variant-4)] transition-colors duration-300`}>
          Pricing
        </Link>
         <Link href={"/portfolio"} className={ `font-bold ml-4 text-sm ${pathName=='/portfolio'?'text-[var(--variant-4)]':'text-white'} hover:text-[var(--variant-4)] transition-colors duration-300`}>
          Portfolio
        </Link>
        </div>
          <Link href="/login">
            <Button
              size="lg"
              variant="second"
              className="mr-1 transition-colors duration-300"
            >
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              size="lg"
              variant="second"
              className="ml-1 transition-colors duration-300"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
