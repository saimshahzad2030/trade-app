"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
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

import { ChevronDown } from "lucide-react";

const validationSchema = Yup.object({
  marketCapMoreThan: Yup.number().min(0),
  marketCapLowerThan: Yup.number().moreThan(Yup.ref("marketCapMoreThan")),
  sector: Yup.string(),
  industry: Yup.string(),
  betaMoreThan: Yup.number().min(0),
  betaLowerThan: Yup.number().moreThan(Yup.ref("betaMoreThan")),
  priceMoreThan: Yup.number().min(0),
  priceLowerThan: Yup.number().moreThan(Yup.ref("priceMoreThan")),
  dividendMoreThan: Yup.number().min(0),
  dividendLowerThan: Yup.number().moreThan(Yup.ref("dividendMoreThan")),
  volumeMoreThan: Yup.number().min(0),
  volumeLowerThan: Yup.number().moreThan(Yup.ref("volumeMoreThan")),
  exchange: Yup.string().required(),
  country: Yup.string().required(),
  isEtf: Yup.boolean(),
  isFund: Yup.boolean(),
  isActivelyTrading: Yup.boolean(),
  limit: Yup.number().min(1).max(10000),
  includeAllShareClasses: Yup.boolean(),
});
type Props = {
  setParams: React.Dispatch<React.SetStateAction<any>>; // You can replace `any` with a proper params type
  setQuerySubmit: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function StockScreeningInput({
  setParams,
  setQuerySubmit,
}: Props) {
  return (
    <div className="w-full p-4 space-y-4 text-white ">
      <h1 className="font-extrabold text-3xl text-center">Stock Screening</h1>

      <Formik
        initialValues={{
          marketCapMoreThan: 1000000,
          marketCapLowerThan: 1000000000,
          sector: "Technology",
          industry: "Consumer Electronics",
          betaMoreThan: 0.5,
          betaLowerThan: 1.5,
          priceMoreThan: 10,
          priceLowerThan: 200,
          dividendMoreThan: 0.5,
          dividendLowerThan: 2,
          volumeMoreThan: 1000,
          volumeLowerThan: 1000000,
          exchange: "NASDAQ",
          country: "US",
          isEtf: false,
          isFund: false,
          isActivelyTrading: true,
          limit: 1000,
          includeAllShareClasses: false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const query = Object.entries(values)
            .filter(
              ([, value]) =>
                value !== "" && value !== null && value !== undefined
            )
            .map(
              ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(
                  typeof value === "boolean" ? Number(value) : value
                )}`
            )
            .join("&");

          setParams(query); // or you can navigate to a new route with this query string
          setQuerySubmit(true);
          console.log(query);
        }}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form className="grid gap-4 grid-cols-1 sm:grid-cols-4">
            {/* Market Cap */}
            <div>
              <label className="text-xs" htmlFor="marketCapMoreThan">
                Market Cap More Than
              </label>
              <Input
                name="marketCapMoreThan"
                id="marketCapMoreThan"
                placeholder="e.g., 1000000"
                value={values.marketCapMoreThan}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-xs" htmlFor="marketCapLowerThan">
                Market Cap Lower Than
              </label>
              <Input
                name="marketCapLowerThan"
                id="marketCapLowerThan"
                placeholder="e.g., 1000000000"
                value={values.marketCapLowerThan}
                onChange={handleChange}
              />
            </div>

            {/* Sector and Industry */}
            <div>
              <label className="text-xs" htmlFor="sector">
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
              <label className="text-xs" htmlFor="industry">
                Industry
              </label>
              <Input
                name="industry"
                id="industry"
                placeholder="e.g., Consumer Electronics"
                value={values.industry}
                onChange={handleChange}
              />
            </div>

            {/* Beta */}
            <div>
              <label className="text-xs" htmlFor="betaMoreThan">
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
              <label className="text-xs" htmlFor="betaLowerThan">
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
              <label className="text-xs" htmlFor="priceMoreThan">
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
              <label className="text-xs" htmlFor="priceLowerThan">
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
            <div>
              <label className="text-xs" htmlFor="dividendMoreThan">
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
              <label className="text-xs" htmlFor="dividendLowerThan">
                Dividend Lower Than
              </label>
              <Input
                name="dividendLowerThan"
                id="dividendLowerThan"
                placeholder="e.g., 2"
                value={values.dividendLowerThan}
                onChange={handleChange}
              />
            </div>

            {/* Volume */}
            <div>
              <label className="text-xs" htmlFor="volumeMoreThan">
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
              <label className="text-xs" htmlFor="volumeLowerThan">
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

            {/* Exchange */}
            <div className="flex flex-col items-start mt-2">
              <label className="text-xs" htmlFor="exchange">
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

            {/* Country */}
            <div>
              <label className="text-xs" htmlFor="country">
                Country
              </label>
              <Input
                name="country"
                id="country"
                placeholder="e.g., US"
                value={values.country}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-xs" htmlFor="limit">
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
              <label className="text-xs" htmlFor="isEtf">
                Is ETF
              </label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                checked={values.isFund}
                onCheckedChange={(checked) => setFieldValue("isFund", checked)}
                id="isFund"
              />
              <label className="text-xs" htmlFor="isFund">
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
              <label className="text-xs" htmlFor="isActivelyTrading">
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
              <label className="text-xs" htmlFor="includeAllShareClasses">
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
    </div>
  );
}
