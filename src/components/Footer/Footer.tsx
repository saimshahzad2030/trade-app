import React from "react";

import ChartFooter from "./ChartFooter";
import Link from "next/link";
import {
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandInstagram,
} from "@tabler/icons-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socials = [
    {
      icon: <IconBrandTwitter size={24} />,
      href: "https://x.com/YourProfile",
      label: "X (formerly Twitter)",
    },
    {
      icon: <IconBrandFacebook size={24} />,
      href: "https://facebook.com/YourPage",
      label: "Facebook",
    },
    {
      icon: <IconBrandInstagram size={24} />,
      href: "https://instagram.com/YourProfile",
      label: "Instagram",
    },
  ];
  return (
    <div className="flex flex-col items-center w-full bg-[#13131f] px-8 pt-20">
      <div className="w-full grid grid-cols-5 gap-2 pb-8">
        <ChartFooter />

        <div className="flex flex-col items-start w-full   text-white">
          <h1 className="mb-4 font-bold ">Analysis Tools</h1>
          <Link href={"#"} className="mt-2">
            Summary
          </Link>
          <Link href={"#"} className="mt-2">
            History
          </Link>
          <Link href={"#"} className="mt-2">
            Comparison
          </Link>
          <Link href={"#"} className="mt-2">
            Summary
          </Link>
          <Link href={"#"} className="mt-2">
            Portfolio
          </Link>
        </div>
        <div className="flex flex-col items-start w-full text-white">
          <h1 className="mb-4 font-bold ">Platform</h1>
          <Link href={"#"} className="mt-2">
            Home
          </Link>
          <Link href={"#"} className="mt-2">
            About Us
          </Link>
          <Link href={"/faq"} className="mt-2">
            FAQS
          </Link>
          <Link href={"#"} className="mt-2">
            News
          </Link>
          <Link href={"#"} className="mt-2">
            Contact Us
          </Link>
        </div>
        <div className="flex flex-col items-start w-full text-white  col-span-2 ">
          <h1 className="mb-4 font-bold ">Connect With Us</h1>

          <p className="text-sm">
            <strong>Trad Analysis</strong> is the all-in-one trading hub: live
            quotes, interactive charts, and in-depth analysis—all in one place.
            Power your decisions with customizable alerts, back-testing, and AI
            insights that adapt to your style. Start your free trial today and
            experience trading made simple.
          </p>
          <div className="flex flex-row items-center w-full  my-2">
            <input
              className="rounded-md rounded-r-none w-9/12 border border-r-0 border-white h-10 px-4"
              placeholder="Enter Any Message..."
            />
            <button className="cursor-pointer text-[var(--variant-4)] bg-white px-4  rounded-md rounded-l-none h-10 w-3/12">
              Subscribe
            </button>
          </div>
          <div className="w-full flex flex-row justify-start my-2">
            {socials.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="hover:text-white transition-colors mr-1"
              >
                {s.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[var(--variant-5)] w-full h-[0.1px] "></div>
      <div className="flex flex-row items-center justify-center py-4 text-sm text-white  x w-full">
        © {currentYear} Trad Analysis. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
