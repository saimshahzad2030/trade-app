"use client";
import React from "react";
import { appleData1d ,financialStatement} from "@/global/constants";
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
import { Download, DownloadCloud } from "lucide-react";
import dynamic from 'next/dynamic';
import { getSpecificStockFinancialData, getSpecificStockSummaryData } from "@/services/stock.services";
import { useParams } from "next/navigation";
import RoundLoader from "../Loader/RoundLoader";
import CompanySummarySection from "../CompanySummarySection/CompanySummarySection";
import { downloadFinancialDataCsv } from "@/services/download.services";

const FinancialStatementPDFDownload = dynamic(
  () => import('@/components/FinancialsSection/DownloadPdf'),
  { ssr: false }
);
// import FinancialStatementPDFDownload from "./DownloadPdf";
const FinancialsSection = () => {
  const [financialData, setFinancialData] = React.useState<FinancialStatement | null>(null);
    const params = useParams<{ symbol: string}>()
      let symbol = params.symbol
  const [activeRange, setActiveRange] = React.useState<'incomeStatement' | 'balanceSheet' | 'cashFlowStatement'>("incomeStatement");
  const ranges = ["incomeStatement", "balanceSheet", "cashFlowStatement"];
  const [timeRange, setTimeRange] = React.useState("annual");
  const timeRanges = ["annual", "quarterly"];
  // const [financialData,setFinancialData] = React.useState<FinancialStatement | null>(null)
  const [incomeStatements, setIncomeStatements] = React.useState<
    IncomeStatement[] | BalanceSheet[] | CashFlowStatement[] | undefined
  >(financialData?.incomeStatement );
  const [loading,setLoading] = React.useState<boolean>(true)
  let getFieldValues = (
    fieldPath: (s: IncomeStatement | BalanceSheet | CashFlowStatement) => string
  ): string[] => {
    return incomeStatements?.map(fieldPath) ?? financialStatement?.balanceSheet.map(fieldPath);
  };

  // Helper to create rows
  const renderRow = (
    label: string,
    fieldPath: (s: IncomeStatement | BalanceSheet | CashFlowStatement) => string
  ) => (
    <TableRow key={label} className=" bg-[#13131f]">
      <TableCell className="font-medium">{label}</TableCell>
      {getFieldValues(fieldPath).map((value, index) => (
        <TableCell key={index} className="text-center">
          {value}
        </TableCell>
      ))}
    </TableRow>
  );
  const formatKey = (key: string): string =>
    key
      .replace(/([a-z\d])([A-Z])/g, "$1 $2") // Space before caps that follow lowercase/digits
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2") // Fix acronyms followed by capitalized words
      .replace(/^./, (char) => char.toUpperCase());
  function isCashFlowStatement(s: any): s is CashFlowStatement {
    return "cashFlowsFromFinancingActivities" in s;
  }
  function isIncomeStatement(s: any): s is IncomeStatement {
    return "revenue" in s;
  }
  const isBalanceSheet = (
    s: IncomeStatement | BalanceSheet | CashFlowStatement
  ): s is BalanceSheet => {
    return (s as BalanceSheet).assets !== undefined;
  };
const [mounted, setMounted] = React.useState(false);
 
   const [metaData,setMetaData] = React.useState<MetaDataType | null>(null)
   
 
React.useEffect(() => {
  const fetchChartData = async()=>{
   let response = await getSpecificStockFinancialData( symbol,timeRange);
   let response2 = await getSpecificStockSummaryData(symbol);
   setMetaData(response2.data)
   setIncomeStatements(response.data.incomeStatement)
   setFinancialData(response.data)
   setLoading(false)
      
          }
          fetchChartData()
  setMounted(true);
}, []);
function convertToCSV(data: Record<string, string | number>[]): string {
    if (!data.length) return "";
    const headers = Object.keys(data[0]);
    const rows = data.map(row =>
      headers.map(field => `"${(row[field] ?? "").toString().replace(/"/g, '""')}"`).join(",")
    );
    return [headers.join(","), ...rows].join("\n");
  }

function downloadCSV(data: any[], fileName: string) {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <div className="w-full flex flex-row items-start justify-between  px-8">
      <div className="w-9/12 flex flex-col items-center justify-start">
        <div className="w-full flex-col items-start text-white">
                              <CompanyDetails loading={loading} metaData={metaData}/>

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
           <>{financialData &&  <Table>
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
                  {/* Revenue */}
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center font-bold text-white"
                    >
                      Revenue
                    </TableCell>
                  </TableRow>
                  {renderRow("Total Revenue", (s) =>
                    isIncomeStatement(s) ? s.revenue.totalRevenue : ""
                  )}
                  {renderRow("Operating Revenue", (s) =>
                    isIncomeStatement(s) ? s.revenue.operatingRevenue : ""
                  )}
                  {renderRow("Non-Operating Revenue", (s) =>
                    isIncomeStatement(s) ? s.revenue.nonOperatingRevenue : ""
                  )}

                  {/* Cost of Revenue */}
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center font-bold text-white"
                    >
                      Cost of Revenue
                    </TableCell>
                  </TableRow>
                  {renderRow("Cost of Revenue", (s) =>
                    isIncomeStatement(s) ? s.costOfRevenue.costOfRevenue : ""
                  )}

                  {/* Gross Profit */}
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center font-bold text-white"
                    >
                      Gross Profit
                    </TableCell>
                  </TableRow>
                  {renderRow("Gross Profit", (s) =>
                    isIncomeStatement(s) ? s.grossProfit.grossProfit : ""
                  )}

                  {/* Operating Expenses */}
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center font-bold text-white"
                    >
                      Operating Expenses
                    </TableCell>
                  </TableRow>
                  {renderRow("R&D", (s) =>
                    isIncomeStatement(s)
                      ? s.operatingExpenses.researchAndDevelopment
                      : ""
                  )}

                  {renderRow("SG&A", (s) =>
                    isIncomeStatement(s)
                      ? s.operatingExpenses.sellingGeneralAndAdministrative
                      : ""
                  )}

                  {renderRow("Other Op. Expenses", (s) =>
                    isIncomeStatement(s)
                      ? s.operatingExpenses.otherOperatingExpenses
                      : ""
                  )}

                  {renderRow("Total Op. Expenses", (s) =>
                    isIncomeStatement(s)
                      ? s.operatingExpenses.totalOperatingExpenses
                      : ""
                  )}

                  {/* And so on for other sections... */}
                </TableBody>
              )}
              {activeRange === "balanceSheet" && (
                <TableBody>
                  {/* Assets */}
                  {/* <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center font-bold text-white"
                    >
                      Assets
                    </TableCell>
                  </TableRow> */}

                  {/* Current Assets */}
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center font-semibold text-white"
                    >
                      Current Assets
                    </TableCell>
                  </TableRow>
                  {renderRow("Cash & Cash Equivalents", (s) =>
                    isBalanceSheet(s)
                      ? s.assets.currentAssets.cashAndCashEquivalents
                      : ""
                  )}

                  {renderRow("Short-Term Investments", (s) =>
                    isBalanceSheet(s)
                      ? s.assets.currentAssets.shortTermInvestments
                      : ""
                  )}

                  {renderRow("Accounts Receivable", (s) =>
                    isBalanceSheet(s)
                      ? s.assets.currentAssets.accountsReceivable
                      : ""
                  )}

                  {renderRow("Inventory", (s) =>
                    isBalanceSheet(s) ? s.assets.currentAssets.inventory : ""
                  )}

                  {renderRow("Other Current Assets", (s) =>
                    isBalanceSheet(s)
                      ? s.assets.currentAssets.otherCurrentAssets
                      : ""
                  )}

                  {renderRow("Total Current Assets", (s) =>
                    isBalanceSheet(s)
                      ? s.assets.currentAssets.totalCurrentAssets
                      : ""
                  )}

                  {/* Non-Current Assets */}
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center font-semibold text-white"
                    >
                      Non-Current Assets
                    </TableCell>
                  </TableRow>
                  {renderRow("PPE (Net)", (s) =>
                    isBalanceSheet(s)
                      ? s.assets.nonCurrentAssets.propertyPlantAndEquipmentNet
                      : ""
                  )}

                  {renderRow("Goodwill", (s) =>
                    isBalanceSheet(s) ? s.assets.nonCurrentAssets.goodwill : ""
                  )}

                  {renderRow("Intangible Assets", (s) =>
                    isBalanceSheet(s)
                      ? s.assets.nonCurrentAssets.intangibleAssets
                      : ""
                  )}

                  {renderRow("Long-Term Investments", (s) =>
                    isBalanceSheet(s)
                      ? s.assets.nonCurrentAssets.longTermInvestments
                      : ""
                  )}

                  {renderRow("Other Non-Current Assets", (s) =>
                    isBalanceSheet(s)
                      ? s.assets.nonCurrentAssets.otherNonCurrentAssets
                      : ""
                  )}

                  {renderRow("Total Non-Current Assets", (s) =>
                    isBalanceSheet(s)
                      ? s.assets.nonCurrentAssets.totalNonCurrentAssets
                      : ""
                  )}

                  {/* Total Assets */}
                  {renderRow("Total Assets", (s) =>
                    isBalanceSheet(s) ? s.assets.totalAssets : ""
                  )}

                  {/* Liabilities */}
                  <TableRow>
                    {/* <TableCell
                      colSpan={6}
                      className="text-2xl text-center font-bold text-white"
                    >
                      Liabilities
                    </TableCell> */}
                  </TableRow>

                  {/* Current Liabilities */}
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center font-semibold text-white"
                    >
                      Current Liabilities
                    </TableCell>
                  </TableRow>
                  {renderRow("Accounts Payable", (s) =>
                    isBalanceSheet(s)
                      ? s.liabilitiesAndShareholdersEquity.currentLiabilities
                          .accountsPayable
                      : ""
                  )}

                  {renderRow("Short-Term Debt", (s) =>
                    isBalanceSheet(s)
                      ? s.liabilitiesAndShareholdersEquity.currentLiabilities
                          .shortTermDebt
                      : ""
                  )}

                  {renderRow("Deferred Revenue", (s) =>
                    isBalanceSheet(s)
                      ? s.liabilitiesAndShareholdersEquity.currentLiabilities
                          .deferredRevenue
                      : ""
                  )}

                  {renderRow("Other Current Liabilities", (s) =>
                    isBalanceSheet(s)
                      ? s.liabilitiesAndShareholdersEquity.currentLiabilities
                          .otherCurrentLiabilities
                      : ""
                  )}

                  {renderRow("Total Current Liabilities", (s) =>
                    isBalanceSheet(s)
                      ? s.liabilitiesAndShareholdersEquity.currentLiabilities
                          .totalCurrentLiabilities
                      : ""
                  )}

                  {/* Non-Current Liabilities */}
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center font-semibold text-white"
                    >
                      Non-Current Liabilities
                    </TableCell>
                  </TableRow>
                  {renderRow("Long-Term Debt", (s) =>
                    isBalanceSheet(s)
                      ? s.liabilitiesAndShareholdersEquity.nonCurrentLiabilities
                          .longTermDebt
                      : ""
                  )}

                  {renderRow("Deferred Tax Liabilities", (s) =>
                    isBalanceSheet(s)
                      ? s.liabilitiesAndShareholdersEquity.nonCurrentLiabilities
                          .deferredTaxLiabilities
                      : ""
                  )}

                  {renderRow("Other Non-Current Liabilities", (s) =>
                    isBalanceSheet(s)
                      ? s.liabilitiesAndShareholdersEquity.nonCurrentLiabilities
                          .otherNonCurrentLiabilities
                      : ""
                  )}

                  {renderRow("Total Non-Current Liabilities", (s) =>
                    isBalanceSheet(s)
                      ? s.liabilitiesAndShareholdersEquity.nonCurrentLiabilities
                          .totalNonCurrentLiabilities
                      : ""
                  )}

                  {/* Total Liabilities */}
                  {renderRow("Total Liabilities", (s) =>
                    isBalanceSheet(s)
                      ? s.liabilitiesAndShareholdersEquity.totalLiabilities
                      : ""
                  )}

                  {/* Shareholders' Equity */}
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center font-bold text-white"
                    >
                      Shareholders' Equity
                    </TableCell>
                  </TableRow>
                  {renderRow("Common Stock", (s) =>
                    isBalanceSheet(s)
                      ? s.liabilitiesAndShareholdersEquity.shareholdersEquity
                          .commonStock
                      : ""
                  )}

                  {renderRow("Retained Earnings", (s) =>
                    isBalanceSheet(s)
                      ? s.liabilitiesAndShareholdersEquity.shareholdersEquity
                          .retainedEarnings
                      : ""
                  )}

                  {renderRow("Accum. Other Comp. Income", (s) =>
                    isBalanceSheet(s)
                      ? s.liabilitiesAndShareholdersEquity.shareholdersEquity
                          .accumulatedOtherComprehensiveIncome
                      : ""
                  )}

                  {renderRow("Total Shareholders' Equity", (s) =>
                    isBalanceSheet(s)
                      ? s.liabilitiesAndShareholdersEquity.shareholdersEquity
                          .totalShareholdersEquity
                      : ""
                  )}

                  {/* Total Liabilities & Shareholders' Equity */}
                  {renderRow("Total Liabilities & Equity", (s) =>
                    isBalanceSheet(s)
                      ? s.liabilitiesAndShareholdersEquity
                          .totalLiabilitiesAndShareholdersEquity
                      : ""
                  )}
                </TableBody>
              )}
              {activeRange === "cashFlowStatement" && (
                <TableBody>
                  {/* Cash Flows from Operating Activities */}
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center font-bold text-white"
                    >
                      Cash Flows from Operating Activities
                    </TableCell>
                  </TableRow>
                  {renderRow("Net Income", (s) => {
                    if ("cashFlowsFromOperatingActivities" in s) {
                      return s.cashFlowsFromOperatingActivities.netIncome;
                    }
                    return "";
                  })}

                  {/* Adjustments to Reconcile Net Income */}
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center font-semibold text-white"
                    >
                      Adjustments to Reconcile Net Income
                    </TableCell>
                  </TableRow>
                  {renderRow("Depreciation & Amortization", (s) => {
                    if ("cashFlowsFromOperatingActivities" in s) {
                      return s.cashFlowsFromOperatingActivities
                        .adjustmentsToReconcileNetIncomeToNetCashProvidedByOperatingActivities
                        .depreciationAndAmortization;
                    }
                    return "";
                  })}
                  {renderRow("Deferred Income Tax", (s) => {
                    if ("cashFlowsFromOperatingActivities" in s) {
                      return s.cashFlowsFromOperatingActivities
                        .adjustmentsToReconcileNetIncomeToNetCashProvidedByOperatingActivities
                        .deferredIncomeTax;
                    }
                    return "";
                  })}
                  {renderRow("Stock-Based Compensation", (s) => {
                    if ("cashFlowsFromOperatingActivities" in s) {
                      return s.cashFlowsFromOperatingActivities
                        .adjustmentsToReconcileNetIncomeToNetCashProvidedByOperatingActivities
                        .stockBasedCompensation;
                    }
                    return "";
                  })}

                  {/* Changes in Operating Assets and Liabilities */}
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center font-semibold text-white"
                    >
                      Changes in Operating Assets and Liabilities
                    </TableCell>
                  </TableRow>
                  {renderRow("Accounts Receivable", (s) => {
                    if ("cashFlowsFromOperatingActivities" in s) {
                      return s.cashFlowsFromOperatingActivities
                        .adjustmentsToReconcileNetIncomeToNetCashProvidedByOperatingActivities
                        .changesInOperatingAssetsAndLiabilities
                        .accountsReceivable;
                    }
                    return "";
                  })}
                  {renderRow("Inventory", (s) => {
                    if ("cashFlowsFromOperatingActivities" in s) {
                      return s.cashFlowsFromOperatingActivities
                        .adjustmentsToReconcileNetIncomeToNetCashProvidedByOperatingActivities
                        .changesInOperatingAssetsAndLiabilities.inventory;
                    }
                    return "";
                  })}
                  {renderRow("Accounts Payable", (s) => {
                    if ("cashFlowsFromOperatingActivities" in s) {
                      return s.cashFlowsFromOperatingActivities
                        .adjustmentsToReconcileNetIncomeToNetCashProvidedByOperatingActivities
                        .changesInOperatingAssetsAndLiabilities.accountsPayable;
                    }
                    return "";
                  })}
                  {renderRow("Other Working Capital Changes", (s) => {
                    if ("cashFlowsFromOperatingActivities" in s) {
                      return s.cashFlowsFromOperatingActivities
                        .adjustmentsToReconcileNetIncomeToNetCashProvidedByOperatingActivities
                        .changesInOperatingAssetsAndLiabilities
                        .otherWorkingCapitalChanges;
                    }
                    return "";
                  })}

                  {renderRow("Other Non-Cash Items", (s) => {
                    if ("cashFlowsFromOperatingActivities" in s) {
                      return s.cashFlowsFromOperatingActivities
                        .adjustmentsToReconcileNetIncomeToNetCashProvidedByOperatingActivities
                        .otherNonCashItems;
                    }
                    return "";
                  })}
                  {renderRow(
                    "Net Cash Provided by Operating Activities",
                    (s) => {
                      if ("cashFlowsFromOperatingActivities" in s) {
                        return s.cashFlowsFromOperatingActivities
                          .netCashProvidedByOperatingActivities;
                      }
                      return "";
                    }
                  )}

                  {/* Cash Flows from Investing Activities */}
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center font-bold text-white"
                    >
                      Cash Flows from Investing Activities
                    </TableCell>
                  </TableRow>
                  {renderRow(
                    "Investments in Property, Plant & Equipment",
                    (s) => {
                      if ("cashFlowsFromOperatingActivities" in s) {
                        return s.cashFlowsFromInvestingActivities
                          .investmentsInPropertyPlantAndEquipment;
                      }
                      return "";
                    }
                  )}
                  {renderRow("Acquisitions (Net)", (s) => {
                    if ("cashFlowsFromOperatingActivities" in s) {
                      return s.cashFlowsFromInvestingActivities.acquisitionsNet;
                    }
                    return "";
                  })}
                  {renderRow("Purchases of Investments", (s) => {
                    if ("cashFlowsFromOperatingActivities" in s) {
                      return s.cashFlowsFromInvestingActivities
                        .purchasesOfInvestments;
                    }
                    return "";
                  })}
                  {renderRow("Sales/Maturities of Investments", (s) => {
                    if ("cashFlowsFromOperatingActivities" in s) {
                      return s.cashFlowsFromInvestingActivities
                        .salesMaturitiesOfInvestments;
                    }
                    return "";
                  })}
                  {renderRow("Other Investing Activities", (s) => {
                    if ("cashFlowsFromOperatingActivities" in s) {
                      return s.cashFlowsFromInvestingActivities
                        .otherInvestingActivities;
                    }
                    return "";
                  })}
                  {renderRow(
                    "Net Cash Provided by Investing Activities",
                    (s) => {
                      if ("cashFlowsFromOperatingActivities" in s) {
                        return s.cashFlowsFromInvestingActivities
                          .netCashProvidedByInvestingActivities;
                      }
                      return "";
                    }
                  )}

                  {/* Cash Flows from Financing Activities */}
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center font-bold text-white"
                    >
                      Cash Flows from Financing Activities
                    </TableCell>
                  </TableRow>
                  {renderRow("Debt Issuance/Repayment", (s) =>
                    isCashFlowStatement(s)
                      ? s.cashFlowsFromFinancingActivities.debtIssuanceRepayment
                      : ""
                  )}
                  {renderRow("Common Stock Issuance/Repurchase", (s) =>
                    isCashFlowStatement(s)
                      ? s.cashFlowsFromFinancingActivities
                          .commonStockIssuanceRepurchase
                      : ""
                  )}
                  {renderRow("Dividends Paid", (s) =>
                    isCashFlowStatement(s)
                      ? s.cashFlowsFromFinancingActivities.dividendsPaid
                      : ""
                  )}
                  {renderRow("Other Financing Activities", (s) =>
                    isCashFlowStatement(s)
                      ? s.cashFlowsFromFinancingActivities
                          .otherFinancingActivities
                      : ""
                  )}
                  {renderRow("Net Cash Provided by Financing Activities", (s) =>
                    isCashFlowStatement(s)
                      ? s.cashFlowsFromFinancingActivities
                          .netCashProvidedByFinancingActivities
                      : ""
                  )}

                  {/* Other Cash Flow Items */}
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center font-bold text-white"
                    >
                      Other Cash Flow Items
                    </TableCell>
                  </TableRow>

                  {renderRow("Effect of Exchange Rate Changes on Cash", (s) =>
                    isCashFlowStatement(s)
                      ? s.otherCashFlowItems.effectOfExchangeRateChangesOnCash
                      : ""
                  )}
                  {renderRow("Net Change in Cash", (s) =>
                    isCashFlowStatement(s)
                      ? s.otherCashFlowItems.netChangeInCash
                      : ""
                  )}
                  {renderRow("Cash at Beginning of Period", (s) =>
                    isCashFlowStatement(s)
                      ? s.otherCashFlowItems.cashAtBeginningOfPeriod
                      : ""
                  )}
                  {renderRow("Cash at End of Period", (s) =>
                    isCashFlowStatement(s)
                      ? s.otherCashFlowItems.cashAtEndOfPeriod
                      : ""
                  )}
                </TableBody>
              )}
            </Table>}</>}
          </div>
        </div>
      </div>
                <CompanySummarySection metaData={metaData} loading={loading}/>

    </div>
  );
};

export default FinancialsSection;
