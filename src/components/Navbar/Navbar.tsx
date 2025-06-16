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
        <div className="flex flex-row items-center justify-end  w-4/12  ">
          <Link href="/login">
            <Button
              size="lg"
              variant="second"
              className="mr-1 transition-colors duration-300"
            >
              Login
            </Button>
          </Link>
          <Link href="/login">
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
