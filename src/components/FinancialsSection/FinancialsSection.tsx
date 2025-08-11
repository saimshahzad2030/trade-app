"use client";
import React from "react";
import {    financialStatement} from "@/global/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FinancialStatement,
  IncomeStatement,
  BalanceSheet,
  CashFlowStatement,
  MetaDataType,
} from "@/types/types";
import { Button } from "../ui/button";
import Link from "next/link";
import CompanyDetails from "../Chart/CompanyDetailsSection";
import { CloudCog, Download, DownloadCloud } from "lucide-react";
import dynamic from 'next/dynamic';
import { getSpecificStockFinancialData, getSpecificStockSummaryData } from "@/services/stock.services";
import { useParams } from "next/navigation";
import RoundLoader from "../Loader/RoundLoader";
import CompanySummarySection from "../CompanySummarySection/CompanySummarySection";
import { downloadFinancialDataCsv } from "@/services/download.services"; 
function getValueFromPath(obj: any, path: string): string {
 
  return path
    .split(".")
      .reduce((acc, part) => {
      if (acc && typeof acc === "object" && part in acc) {
        return acc[part];
      }
      else{
      console.log(`obj ${JSON.stringify(obj)} part "${part}"`);

      }
      // console.warn(`Path "${path}" failed at "${part}".`, acc);
      return "";
    }, obj);
}
const financialConfig = {
   incomeStatement : [
     {
      section: "Revenue",
      rows: [
        { label: "Total Revenue", path: "revenue.total" },
        { label: "Operating Revenue", path: "revenue.operating" },
        { label: "Cost  Of Revenue", path: "revenue.costOfRevenue" },
        { label: "Gross Profit", path: "revenue.grossProfit" },
      ],
    },
  {
    section: "Operating Expenses",
    rows: [
      { label: "R&D", path: "operatingExpenses.researchAndDevelopment" },
      { label: "SG&A", path: "operatingExpenses.sellingGeneralAndAdministrative" },
      { label: "G&A", path: "operatingExpenses.generalAndAdministrative" },
      { label: "Sales & Marketing", path: "operatingExpenses.sellingAndMarketing" },
      { label: "Other Op. Expenses", path: "operatingExpenses.other" },
      { label: "Depreciation & Amortization", path: "operatingExpenses.depreciationAndAmortization" },
      { label: "Total Op. Expenses", path: "operatingExpenses.total" },
      { label: "Cost & Expenses", path: "operatingExpenses.costAndExpenses" },
    ],
  },
  {
    section: "Profitability",
    rows: [
      { label: "Operating Income", path: "profitability.operatingIncome" },
      { label: "EBITDA", path: "profitability.ebitda" },
      { label: "EBIT", path: "profitability.ebit" },
    ],
  },
  {
    section: "Non-Operating Income",
    rows: [
      { label: "Net Interest Income", path: "nonOperatingIncome.netInterestIncome" },
      { label: "Interest Income", path: "nonOperatingIncome.interestIncome" },
      { label: "Interest Expense", path: "nonOperatingIncome.interestExpense" },
      { label: "Other Non-Operating", path: "nonOperatingIncome.otherNonOperating" },
      { label: "Total Other Income/Expenses", path: "nonOperatingIncome.totalOtherIncomeExpenses" },
    ],
  },
  {
    section: "Net Income",
    rows: [
      { label: "Income Before Tax", path: "netIncome.incomeBeforeTax" },
      { label: "Tax Provision", path: "netIncome.taxProvision" },
      { label: "Net Income - Continuing Ops", path: "netIncome.continuingOperations" },
      { label: "Net Income - Discontinued Ops", path: "netIncome.discontinuedOperations" },
      { label: "Adjustments", path: "netIncome.adjustments" },
      { label: "Deductions", path: "netIncome.deductions" },
      { label: "Total Net Income", path: "netIncome.total" },
      { label: "Available to Common", path: "netIncome.availableToCommon" },
    ],
  },
  {
    section: "Earnings Per Share",
    rows: [
      { label: "Basic EPS", path: "earningsPerShare.basic" },
      { label: "Diluted EPS", path: "earningsPerShare.diluted" },
    ],
  },
  {
    section: "Shares Outstanding",
    rows: [
      { label: "Basic Shares", path: "sharesOutstanding.basic" },
      { label: "Diluted Shares", path: "sharesOutstanding.diluted" },
    ],
  },
],

 balanceSheet: [
  {
    section: "Assets",
    rows: [
      { label: "Cash & Equivalents", path: "assets.cashAndCashEquivalents" },
      { label: "Short-Term Investments", path: "assets.shortTermInvestments" },
      { label: "Accounts Receivable", path: "assets.accountsReceivable" },
      { label: "Inventory", path: "assets.inventory" },
      { label: "Other Current Assets", path: "assets.otherCurrentAssets" },
      { label: "Total Current Assets", path: "assets.totalCurrentAssets" },
      { label: "Property, Plant & Equipment", path: "assets.propertyPlantAndEquipmentNet" },
      { label: "Goodwill", path: "assets.goodwill" },
      { label: "Intangible Assets", path: "assets.intangibleAssets" },
      { label: "Long-Term Investments", path: "assets.longTermInvestments" },
      { label: "Other Non-Current Assets", path: "assets.otherNonCurrentAssets" },
      { label: "Total Non-Current Assets", path: "assets.totalNonCurrentAssets" },
      { label: "Total Assets", path: "assets.totalAssets" },
    ],
  },
  {
    section: "Liabilities",
    rows: [
      { label: "Accounts Payable", path: "liabilities.accountsPayable" },
      { label: "Short-Term Debt", path: "liabilities.shortTermDebt" },
      { label: "Deferred Revenue", path: "liabilities.deferredRevenue" },
      { label: "Other Current Liabilities", path: "liabilities.otherCurrentLiabilities" },
      { label: "Total Current Liabilities", path: "liabilities.totalCurrentLiabilities" },
      { label: "Long-Term Debt", path: "liabilities.longTermDebt" },
      { label: "Deferred Tax Liabilities", path: "liabilities.deferredTaxLiabilities" },
      { label: "Other Non-Current Liabilities", path: "liabilities.otherNonCurrentLiabilities" },
      { label: "Total Non-Current Liabilities", path: "liabilities.totalNonCurrentLiabilities" },
      { label: "Total Liabilities", path: "liabilities.totalLiabilities" },
    ],
  },
  {
    section: "Equity",
    rows: [
      { label: "Common Stock", path: "shareholdersEquity.commonStock" },
      { label: "Retained Earnings", path: "shareholdersEquity.retainedEarnings" },
      { label: "Accumulated Other Comprehensive Income", path: "shareholdersEquity.accumulatedOtherComprehensiveIncome" },
      { label: "Total Shareholders’ Equity", path: "shareholdersEquity.totalShareholdersEquity" },
      { label: "Total Liabilities and Shareholders’ Equity", path: "shareholdersEquity.totalLiabilitiesAndShareholdersEquity" },
    ],
  },
   {
  section: "Others",
    rows: [
    { label: "Cash and Short Term Investments", path: "others.cashAndShortTermInvestments" },
    { label: "Net Receivables", path: "others.netReceivables" },
    { label: "Other Receivables", path: "others.otherReceivables" },
    { label: "Prepaids", path: "others.prepaids" },
    { label: "Goodwill and Intangible Assets", path: "others.goodwillAndIntangibleAssets" },
    { label: "Tax Assets", path: "others.taxAssets" },
    { label: "Other Assets", path: "others.otherAssets" },
    { label: "Total Payables", path: "others.totalPayables" },
    { label: "Other Payables", path: "others.otherPayables" },
    { label: "Accrued Expenses", path: "others.accruedExpenses" },
    { label: "Capital Lease Obligations (Current)", path: "others.capitalLeaseObligationsCurrent" },
    { label: "Tax Payables", path: "others.taxPayables" },
    { label: "Capital Lease Obligations (Non-Current)", path: "others.capitalLeaseObligationsNonCurrent" },
    { label: "Deferred Revenue (Non-Current)", path: "others.deferredRevenueNonCurrent" },
    { label: "Other Liabilities", path: "others.otherLiabilities" },
    { label: "Capital Lease Obligations", path: "others.capitalLeaseObligations" },
    { label: "Treasury Stock", path: "others.treasuryStock" },
    { label: "Preferred Stock", path: "others.preferredStock" },
    { label: "Additional Paid-In Capital", path: "others.additionalPaidInCapital" },
    { label: "Other Total Stockholders Equity", path: "others.otherTotalStockholdersEquity" },
    { label: "Total Equity", path: "others.totalEquity" },
    { label: "Minority Interest", path: "others.minorityInterest" },
    { label: "Total Investments", path: "others.totalInvestments" },
    { label: "Total Debt", path: "others.totalDebt" },
    { label: "Net Debt", path: "others.netDebt" }
  ],
}
],

 cashFlowStatement:[
  {
    section: "Cash Flows from Operating Activities",
    rows: [
      { label: "Net Income", path: "cashFlowsFromOperatingActivities.netIncome" },
      { label: "Depreciation & Amortization", path: "cashFlowsFromOperatingActivities.depreciationAndAmortization" },
      { label: "Deferred Income Tax", path: "cashFlowsFromOperatingActivities.deferredIncomeTax" },
      { label: "Stock-Based Compensation", path: "cashFlowsFromOperatingActivities.stockBasedCompensation" },
      { label: "Accounts Receivable", path: "cashFlowsFromOperatingActivities.accountsReceivable" },
      { label: "Inventory", path: "cashFlowsFromOperatingActivities.inventory" },
      { label: "Accounts Payable", path: "cashFlowsFromOperatingActivities.accountsPayable" },
      { label: "Other Working Capital", path: "cashFlowsFromOperatingActivities.otherWorkingCapital" },
      { label: "Other Non-Cash Items", path: "cashFlowsFromOperatingActivities.otherNonCashItems" },
      { label: "Net Cash Provided by Operating Activities", path: "cashFlowsFromOperatingActivities.netCashProvidedByOperatingActivities" },
    ],
  },
  {
    section: "Cash Flows from Investing Activities",
    rows: [
      { label: "Investments in Property, Plant & Equipment", path: "cashFlowsFromInvestingActivities.investmentsInPropertyPlantAndEquipment" },
      { label: "Acquisitions (Net)", path: "cashFlowsFromInvestingActivities.acquisitionsNet" },
      { label: "Purchases of Investments", path: "cashFlowsFromInvestingActivities.purchasesOfInvestments" },
      { label: "Sales/Maturities of Investments", path: "cashFlowsFromInvestingActivities.salesMaturitiesOfInvestments" },
      { label: "Other Investing Activities", path: "cashFlowsFromInvestingActivities.otherInvestingActivities" },
      { label: "Net Cash Provided by Investing Activities", path: "cashFlowsFromInvestingActivities.netCashProvidedByInvestingActivities" },
    ],
  },
  {
    section: "Cash Flows from Financing Activities",
    rows: [
      { label: "Net Debt Issuance", path: "cashFlowsFromFinancingActivities.netDebtIssuance" },
      { label: "Net Common Stock Issuance", path: "cashFlowsFromFinancingActivities.netCommonStockIssuance" },
      { label: "Dividends Paid", path: "cashFlowsFromFinancingActivities.dividendsPaid" },
      { label: "Other Financing Activities", path: "cashFlowsFromFinancingActivities.otherFinancingActivities" },
      { label: "Net Cash Provided by Financing Activities", path: "cashFlowsFromFinancingActivities.netCashProvidedByFinancingActivities" },
    ],
  },
  {
    section: "Other Cash Flow Items",
    rows: [
      { label: "Effect of Exchange Rate Changes on Cash", path: "others.effectOfExchangeRateChangesOnCash" },
      { label: "Net Change in Cash", path: "others.netChangeInCash" },
      { label: "Cash at Beginning of Period", path: "others.cashAtBeginningOfPeriod" },
      { label: "Cash at End of Period", path: "others.cashAtEndOfPeriod" },
      { label: "Change in Working Capital", path: "others.changeInWorkingCapital" },
      { label: "Long-Term Net Debt Issuance", path: "others.longTermNetDebtIssuance" },
      { label: "Short-Term Net Debt Issuance", path: "others.shortTermNetDebtIssuance" },
      { label: "Net Stock Issuance", path: "others.netStockIssuance" },
      { label: "Common Stock Issuance", path: "others.commonStockIssuance" },
      { label: "Common Stock Repurchased", path: "others.commonStockRepurchased" },
      { label: "Net Preferred Stock Issuance", path: "others.netPreferredStockIssuance" },
      { label: "Net Dividends Paid", path: "others.netDividendsPaid" },
      { label: "Preferred Dividends Paid", path: "others.preferredDividendsPaid" },
      { label: "Operating Cash Flow", path: "others.operatingCashFlow" },
      { label: "Capital Expenditure", path: "others.capitalExpenditure" },
      { label: "Free Cash Flow", path: "others.freeCashFlow" },
      { label: "Income Taxes Paid", path: "others.incomeTaxesPaid" },
      { label: "Interest Paid", path: "others.interestPaid" },
    ],
  },
] 

};
 
const FinancialsSection = () => {
  const [financialData, setFinancialData] = React.useState<FinancialStatement | null>(null);
    const params = useParams<{ symbol: string}>()
      let symbol =   params.symbol != "undefined"?params.symbol:'AAPL'
  const [activeRange, setActiveRange] = React.useState<'incomeStatement' | 'balanceSheet' | 'cashFlowStatement'>("incomeStatement");
   const [timeRange, setTimeRange] = React.useState("annual");
  const timeRanges = ["annual", "quarterly"];
  // const [financialData,setFinancialData] = React.useState<FinancialStatement | null>(null)
  const [incomeStatements, setIncomeStatements] = React.useState<
    IncomeStatement[] | BalanceSheet[] | CashFlowStatement[] | undefined
  >(financialData?.incomeStatement );
  const [loading,setLoading] = React.useState<boolean>(true)
  const [normalLoading,setNormalLoading] = React.useState<boolean>(true)
  let getFieldValues = (
    activeRange1:string,
    fieldPath: (s: IncomeStatement | BalanceSheet | CashFlowStatement) => string
  ): string[] => {
  if (activeRange1 === "incomeStatement") {
    return (financialData?.incomeStatement as IncomeStatement[])?.map(fieldPath) ?? [];
  }
  if (activeRange1 === "balanceSheet") { 
    return (financialData?.balanceSheet as BalanceSheet[])?.map(fieldPath) ?? [];
  }
  return (financialData?.cashFlowStatement as CashFlowStatement[])?.map(fieldPath) ?? [];
};
const formatValue = (val: string): string => {
if (!val || typeof val !== "string") return val;

  // Remove commas and trim spaces
  const cleaned = val.replace(/,/g, '').trim();

  // Try parsing it
  const num = parseFloat(cleaned);

  if (isNaN(num)) return val;

  const absNum = Math.abs(num);

  if (absNum >= 1_000_000_000_000) return `${num < 0 ? '-' : ''}${(absNum / 1_000_000_000_000).toFixed(2)}T`;
  if (absNum >= 1_000_000_000) return `${num < 0 ? '-' : ''}${(absNum / 1_000_000_000).toFixed(2)}B`;
  if (absNum >= 1_000_000) return `${num < 0 ? '-' : ''}${(absNum / 1_000_000).toFixed(2)}M`;

  return `${num < 0 ? '-' : ''}${absNum.toLocaleString()}`;
};
  // Helper to create rows
  const renderRow = (
    label: string,
    fieldPath: (s: IncomeStatement | BalanceSheet | CashFlowStatement) => string
  ) => (
    <TableRow key={label} className=" bg-[#13131f]">
      <TableCell className="font-medium">{label}</TableCell>
      {getFieldValues(activeRange,fieldPath).map((value, index) => (
        <TableCell key={index} className="text-center">
          {formatValue(value)}
        </TableCell>
      ))}
    </TableRow>
  );
  const formatKey = (key: string): string =>
    key
      .replace(/([a-z\d])([A-Z])/g, "$1 $2") // Space before caps that follow lowercase/digits
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2") // Fix acronyms followed by capitalized words
      .replace(/^./, (char) => char.toUpperCase());
 
 
   const [metaData,setMetaData] = React.useState<MetaDataType | null>(null)
   
 
React.useEffect(() => {
  const fetchChartData = async()=>{
  

   let response = await getSpecificStockFinancialData( symbol,timeRange);
   let response2 = await getSpecificStockSummaryData(symbol);
   setMetaData(response2.data)
   setIncomeStatements(response.data.incomeStatement)
   setFinancialData(response.data)
   setLoading(false) 
   setNormalLoading(false) 
          }
          fetchChartData() 
}, []);
 
  return (
    <div className="w-full flex flex-row items-start justify-between  px-8">
      <div className="w-9/12 flex flex-col items-center justify-start">
        <div className="w-full flex-col items-start text-white">
                              <CompanyDetails loading={normalLoading} metaData={metaData}/>

          {!loading && financialData && 
          <>
          <div className="w-full flex flex-row items-center justify-between mt-4">
            {financialData && <div className="flex flex-row w-10/12">
              {(
                Object.keys(financialData) as (keyof FinancialStatement)[]
              ).map((range) => (
                <Button
                  key={range}
                  variant="graphTab2"
                  onClick={() => {
                    setActiveRange(range);
                    setIncomeStatements(financialData[range]);
                    console.log("financialData[range]",financialData[range])
                  }}
                  className={`mr-1  text-[var(--variant-4)] border hover:border-[var(--variant-3)] ${
                    activeRange === range
                      ? "  bg-[var(--variant-2)]/50   border-[var(--variant-3)]    "
                      : "text-[var(--variant-4)] border-l-transparent border-b-transparent border-r-transparent border-t-transparent hover:border-[var(--variant-3)] "
                  }  `}
                >
                  {formatKey(range)}
                </Button>
              ))}
            </div>}
            <p className="text-sm">Currency in USD</p>
          </div>
         
           
          <div className="w-full flex flex-row items-center justify-between my-4">
            <p className="text-sm w-2/12">All in Thousand</p>

            <div className="flex flex-row justify-end w-10/12">
             <TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button 
        variant="graphTab2" 
         onClick={async() => {
         
              await downloadFinancialDataCsv(symbol,timeRange=="annual"?"annual":"quarter",
            activeRange=='incomeStatement'?"income":activeRange=='balanceSheet'?"balance":"cashflow"
            );
          }}
        className={`cursor-pointer text-[var(--variant-4)] border-l-transparent border-b-transparent border-r-transparent border-t-transparent hover:border-[var(--variant-3)]`}
      >
        <DownloadCloud className="cursor-pointer" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>{`Download ${activeRange} `}</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

          

              {timeRanges.map((range) => (
                <Button
                  key={range}
                  variant="graphTab2"
                  onClick={async() => {
                        setLoading(true)
                    
                       let response = await getSpecificStockFinancialData( symbol,range);
                        setLoading(false)

            setIncomeStatements(response.data.incomeStatement)
            setFinancialData(response.data)
                    setActiveRange("incomeStatement")
                    setTimeRange(range)}}
                  className={`mr-1  text-[var(--variant-4)] border hover:border-[var(--variant-3)] ${
                    timeRange === range
                      ? "  bg-[var(--variant-2)]/50   border-[var(--variant-3)]    "
                      : "text-[var(--variant-4)] border-l-transparent border-b-transparent border-r-transparent border-t-transparent hover:border-[var(--variant-3)] "
                  }  `}
                >
                  {formatKey(range)}
                </Button>
              ))}
            </div>
          </div></>}
          <div className="w-full flex flex-col items-center mt-2 mb-10">
           {loading?<div className="w-full py-20 flex flex-col items-center">
            <RoundLoader/>
           </div>:
           <>{financialData &&  
           <Table>
              <TableHeader>
                {activeRange === "incomeStatement" && (
                  <TableRow>
  <TableHead className="w-[200px]">Name</TableHead>
  {financialData?.incomeStatement?.map((s, i) => {
    if (!s.date) {
      return (
        <TableHead key={i} className="text-center text-red-400">
          No Date
        </TableHead>
      );
    }

    const date = new Date(s.date);
    const formattedDate = isNaN(date.getTime())
      ? 'TTM'
      : `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

    return (
      <TableHead key={i} className="text-center">
        {formattedDate}
      </TableHead>
    );
  })}
</TableRow>
                )}
                {activeRange === "balanceSheet" && (
                  <TableRow>
                    <TableHead className="w-[200px]">Name</TableHead>
                    {financialData.balanceSheet.map((s, i) => {
                      const date = new Date(s.date);
                        // const date = new Date(s.date);
    const formattedDate = isNaN(date.getTime())
      ? 'TTM'
      : `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
                       

                      return (
                        <TableHead key={i} className="text-center">
                          {formattedDate}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                )}
                {activeRange === "cashFlowStatement" && (
                  <TableRow>
                    <TableHead className="w-[200px]">Name</TableHead>
                    {financialData.cashFlowStatement.map((s, i) => {
                      const rawDate = s?.date;
const date = rawDate ? new Date(String(rawDate)) : null;
               const formattedDate =
  date && !isNaN(date.getTime())
    ? `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    : "TTM";

                      return (
                        <TableHead key={i} className="text-center">
                          {formattedDate}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                )}
              </TableHeader>
              {activeRange === "incomeStatement" && (
 

<TableBody>
  {financialConfig[activeRange]?.map((section, i) => (
  <React.Fragment key={i}>
    <TableRow>
      <TableCell
        colSpan={6}
        className="text-center font-bold text-white"
      >
        {section.section} 
      </TableCell>
    </TableRow>
    {section.rows.map((row, j) =>
      (renderRow(row.label, (s) => getValueFromPath(s, row.path))
     
    )
    )}
  </React.Fragment>
))}
</TableBody>
              )}
              {activeRange === "balanceSheet" && (
             
                <TableBody>
                   {financialConfig[activeRange]?.map((section, i) => (
  <React.Fragment key={i}>
    <TableRow>
      <TableCell
        colSpan={6}
        className="text-center font-bold text-white"
      >
        {section.section} 
      </TableCell>
    </TableRow>
    {section.rows.map((row, j) =>
      (

        
        renderRow(row.label, (s) => getValueFromPath(s, row.path)) 
        
      )

    )}
  </React.Fragment>
))}
                </TableBody>
              )}
              {activeRange === "cashFlowStatement" && (
                 
                <TableBody>
                   {financialConfig[activeRange]?.map((section, i) => (
  <React.Fragment key={i}>
    <TableRow>
      <TableCell
        colSpan={6}
        className="text-center font-bold text-white"
      >
        {section.section}
      </TableCell>
    </TableRow>
    {section.rows.map((row, j) =>
      renderRow(row.label, (s) => getValueFromPath(s, row.path))
    )}

      
  </React.Fragment>
))}
 
                </TableBody>
              )}
            </Table>}</>}
          </div>
        </div>
      </div>
                <CompanySummarySection metaData={metaData} loading={normalLoading}/>

    </div>
  );
};

export default FinancialsSection;

  