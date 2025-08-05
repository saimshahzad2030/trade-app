"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getStockScreenerData } from "@/services/stockScreening.services";
import { Industries } from "@/types/types";
 
const validationSchema = Yup.object({
  marketCapMoreThan: Yup.number().min(0),
  marketCapLowerThan: Yup.number().moreThan(Yup.ref("marketCapMoreThan")),
  sector: Yup.string(),
  industry: Yup.string(),
  betaMoreThan: Yup.number().min(0),
  betaLowerThan: Yup.number().moreThan(Yup.ref("betaMoreThan")),
  priceMoreThan: Yup.number().min(0),
  priceLowerThan: Yup.number().moreThan(Yup.ref("priceMoreThan")),
  // dividendMoreThan: Yup.number().min(0).nullable(),
  // dividendLowerThan: Yup.number().moreThan(Yup.ref("dividendMoreThan")),
  volumeMoreThan: Yup.number().min(0),
  volumeLowerThan: Yup.number().moreThan(Yup.ref("volumeMoreThan")),
  // exchange: Yup.string().required(),
  // country: Yup.string().required(),
  isEtf: Yup.boolean(),
  isFund: Yup.boolean(),
  isActivelyTrading: Yup.boolean(),
  limit: Yup.number().min(1).max(10000),
  includeAllShareClasses: Yup.boolean(),
});
type Props = {
  setLoading: React.Dispatch<React.SetStateAction<any>>; 
  setData: React.Dispatch<React.SetStateAction<any>>; 
  industries: Industries;
  setParams: React.Dispatch<React.SetStateAction<any>>; // You can replace `any` with a proper params type
  setQuerySubmit: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function StockScreeningInput({
  setParams,
  setData,
  setLoading,
  industries,
  setQuerySubmit,
}: Props) {
   const [open, setOpen] = React.useState(true);
  return (
    <div className="w-full p-4 space-y-4 text-white flex flex-col items-center bg-[#0a0a13]">
      <div className="flex items-center justify-between">
        <h1 className="font-extrabold text-3xl text-center">Stock Screening</h1>
        
      </div>
  <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
      <Formik
        initialValues={{
          marketCapMoreThan: 0,
          marketCapLowerThan: 10000,
          sector: "Technology",
          industry: "Consumer Electronics",
          betaMoreThan: 0.5,
          betaLowerThan: 1.5,
          priceMoreThan: 10,
          priceLowerThan: 200,
          // dividendMoreThan: 0.5,
          // dividendLowerThan: 2,
          volumeMoreThan: 100,
          volumeLowerThan: 1000000,
          // exchange: "NASDAQ",
          // country: "US",
          isEtf: false,
          isFund: false,
          isActivelyTrading: true,
          limit: 100,
          includeAllShareClasses: false,
        }}
        validationSchema={validationSchema}
        onSubmit={async(values) => {
          const query = Object.entries(values)
            .filter(
              ([, value]) =>
                value !== "" && value !== null && value !== undefined
            )
            .map(
              ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(
                  typeof value === "boolean" ? value : value
                )}`
            )
            .join("&");
            console.log(query,"query")
          setParams(query); 
          setLoading(true)
          let  screenerResponse= await getStockScreenerData(query);
          
          setData(screenerResponse.data)
          setLoading(false)
          setQuerySubmit(true);
          console.log(query);
        }}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form className="grid gap-x-4 gap-y-2 grid-cols-1 sm:grid-cols-6">
            {/* Market Cap */}
            <div>
              <label className="text-[10px]" htmlFor="marketCapMoreThan">
                Market Cap More Than
              </label>
              <Input
              type="number"
              className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none "
                name="marketCapMoreThan"
                id="marketCapMoreThan"
                placeholder="e.g., 1000000"
                value={values.marketCapMoreThan}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-[10px]" htmlFor="marketCapLowerThan">
                Market Cap Lower Than
              </label>
              <Input
              type="number"
              className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none "
              
                name="marketCapLowerThan"
                id="marketCapLowerThan"
                placeholder="e.g., 1000000000"
                value={values.marketCapLowerThan}
                onChange={handleChange}
              />
            </div>

            {/* Sector and Industry */}
            <div>
              <label className="text-[10px]" htmlFor="sector">
                Sector
              </label>
              <Input
                name="sector"
                id="sector"
                placeholder="e.g., Technology"
                value={values.sector}
                onChange={handleChange}
              />
            </div>
         <div>
  <label className="text-[10px]" htmlFor="industry">
    Industry
  </label>
  <Select
    value={values.industry}
    onValueChange={(value) =>
      handleChange({ target: { name: "industry", value } })
    }
  >
    <SelectTrigger id="industry" className="w-full text-sm">
      <SelectValue placeholder="e.g., Consumer Electronics" />
    </SelectTrigger>
    <SelectContent>
      {industries.map((item) => (
        <SelectItem key={item.industry} value={item.industry}>
          {item.industry}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>

 
            <div >
              <label className="text-[10px]" htmlFor="betaMoreThan">
                Beta More Than
              </label>
              <Input
                name="betaMoreThan"
                id="betaMoreThan"
                placeholder="e.g., 0.5"
                value={values.betaMoreThan}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-[10px]" htmlFor="betaLowerThan">
                Beta Lower Than
              </label>
              <Input
                name="betaLowerThan"
                id="betaLowerThan"
                placeholder="e.g., 1.5"
                value={values.betaLowerThan}
                onChange={handleChange}
              />
            </div>

            {/* Price */}
            <div>
              <label className="text-[10px]" htmlFor="priceMoreThan">
                Price More Than
              </label>
              <Input
                name="priceMoreThan"
                id="priceMoreThan"
                placeholder="e.g., 10"
                value={values.priceMoreThan}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-[10px]" htmlFor="priceLowerThan">
                Price Lower Than
              </label>
              <Input
                name="priceLowerThan"
                id="priceLowerThan"
                placeholder="e.g., 200"
                value={values.priceLowerThan}
                onChange={handleChange}
              />
            </div>

            {/* Dividend */}
            {/* <div>
              <label className="text-[10px]" htmlFor="dividendMoreThan">
                Dividend More Than
              </label>
              <Input
                name="dividendMoreThan"
                id="dividendMoreThan"
                placeholder="e.g., 0.5"
                value={values.dividendMoreThan}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-[10px]" htmlFor="dividendLowerThan">
                Dividend Lower Than
              </label>
              <Input
                name="dividendLowerThan"
                id="dividendLowerThan"
                placeholder="e.g., 2"
                value={values.dividendLowerThan}
                onChange={handleChange}
              />
            </div> */}

            {/* Volume */}
            <div>
              <label className="text-[10px]" htmlFor="volumeMoreThan">
                Volume More Than
              </label>
              <Input
                name="volumeMoreThan"
                id="volumeMoreThan"
                placeholder="e.g., 1000"
                value={values.volumeMoreThan}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-[10px]" htmlFor="volumeLowerThan">
                Volume Lower Than
              </label>
              <Input
                name="volumeLowerThan"
                id="volumeLowerThan"
                placeholder="e.g., 1000000"
                value={values.volumeLowerThan}
                onChange={handleChange}
              />
            </div>

             {/* <div className="flex flex-col items-start mt-2">
              <label className="text-[10px]" htmlFor="exchange">
                Exchange
              </label>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="dropdownButton2">
                    {values.exchange || "Select Exchange"}
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="overflow-y-scroll max-h-64 w-80 z-50 bg-white text-black p-4 rounded-lg shadow-lg">
                  <DropdownMenuLabel className="mb-1">
                    Exchange
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="border-gray-600 border-[1px] mb-1" />
                  <DropdownMenuRadioGroup
                    value={values.exchange}
                    onValueChange={(val) => setFieldValue("exchange", val)}
                  >
                    {["NASDAQ", "NYSE", "AMEX"].map((exchange) => (
                      <DropdownMenuRadioItem
                        key={exchange}
                        value={exchange}
                        className={`${
                          values.exchange === exchange
                            ? "bg-[var(--variant-4)] text-white"
                            : "text-gray-600 hover:border-[var(--variant-4)]"
                        } cursor-pointer p-2 ring-0 hover:ring-0 rounded-lg transition-colors duration-500`}
                      >
                        {exchange}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
 
            <div>
              <label className="text-[10px]" htmlFor="country">
                Country
              </label>
              <Input
                name="country"
                id="country"
                placeholder="e.g., US"
                value={values.country}
                onChange={handleChange}
              />
            </div> */}
            <div>
              <label className="text-[10px]" htmlFor="limit">
                Limit
              </label>
              <Input
                name="limit"
                id="limit"
                placeholder="e.g., 1000"
                value={values.limit}
                onChange={handleChange}
              />
            </div>
            <div></div> 
            {/* Booleans */}
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                checked={values.isEtf}
                onCheckedChange={(checked) => setFieldValue("isEtf", checked)}
                id="isEtf"
              />
              <label className="text-[10px]" htmlFor="isEtf">
                Is ETF
              </label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                checked={values.isFund}
                onCheckedChange={(checked) => setFieldValue("isFund", checked)}
                id="isFund"
              />
              <label className="text-[10px]" htmlFor="isFund">
                Is Fund
              </label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                checked={values.isActivelyTrading}
                onCheckedChange={(checked) =>
                  setFieldValue("isActivelyTrading", checked)
                }
                id="isActivelyTrading"
              />
              <label className="text-[10px]" htmlFor="isActivelyTrading">
                Actively Trading
              </label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                checked={values.includeAllShareClasses}
                onCheckedChange={(checked) =>
                  setFieldValue("includeAllShareClasses", checked)
                }
                id="includeAllShareClasses"
              />
              <label className="text-[10px]" htmlFor="includeAllShareClasses">
                Include All Share Classes
              </label>
            </div>

            {/* Limit */}

            <div className="col-span-full">
              <Button type="submit" className="cursor-pointer">
                Apply Filters
              </Button>
            </div>
          </Form>
        )}
      </Formik>
       </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setOpen((prev) => !prev)} className="bg-[#13131f] rounded-full p-2 cursor-pointer">
          {open ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
    </div>
  );
}
