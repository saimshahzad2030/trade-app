export type companyData = {
    chart: {
        result: [
            {
                meta: {
                    chartColor?:string;
                    price: string; // e.g., "202.52"
                    priceChange: number; // e.g., 4.37
                    priceChangePercent: string; // e.g., "2.21%"
                    marketCap: string; // e.g., "$3.04T"
                    peRatio: string; // e.g., "29.06"
                    eps: string; // e.g., "6.97"
                    sharesOutstanding: string; // e.g., "$15.02B"
                    timestamp: string; // e.g., "2025-04-15 01:00:01"
                    previousClose: string; // e.g., "198.15"
                    open: string; // e.g., "211.44"
                    dayRange: string; // e.g., "201.1621 - 212.94"
                    week52Range: string; // e.g., "164.08 - 260.1"
                    volume: string; // e.g., "$100.65M"
                    avgVolume: string; // e.g., "$63.04M"
                    earningsDate: string; // e.g., "May 01, 2025"
                    companyName: string; // e.g., "Apple Inc."
                    website: string; // e.g., "https://www.apple.com"
                    fullTimeEmployees: string; // e.g., "$150000.00"
                    sector: string; // e.g., "Technology"
                    exDividendDate?: string;
                    industry: string; // e.g., "Consumer Electronics"
                    description: string; // Long text description
                    fiscalYearEnds: string; // e.g., "September 28, 2024"
                    currency: string; // e.g., "USD"
                    symbol: string; // e.g., "AAPL"
                    exchangeName: string; // e.g., "NASDAQ"
                    fullExchangeName: string; // e.g., "NASDAQ Global Select"
                    firstTradeDate: number; // e.g., 345409200
                    regularMarketTime: number; // e.g., 1744701285
                    hasPrePostMarketData: boolean; // e.g., true
                    gmtoffset: number; // e.g., -14400
                    timezone: string; // e.g., "EDT"
                    exchangeTimezoneName: string; // e.g., "America/New_York"
                    regularMarketPrice: number; // e.g., 202.52
                    fiftyTwoWeekHigh: number; // e.g., 260.1
                    fiftyTwoWeekLow: number; // e.g., 164.08
                    regularMarketDayHigh: number; // e.g., 212.94
                    regularMarketDayLow: number; // e.g., 201.1621
                    regularMarketVolume: number; // e.g., 100650083
                    priceAvg1Y: number; // e.g., 0
                    beta: number; // e.g., 1.259
                    longName: string; // e.g., "Apple Inc."
                    shortName: string; // e.g., "Apple Inc."
                    chartPreviousClose: number; // e.g., 198.15
                    priceHint: number; // e.g., 2
                    currentTradingPeriod: {
                        pre: {
                            timezone: string; // e.g., "EDT"
                            start: number; // e.g., 1744671600
                            end: number; // e.g., 1744691400
                            gmtoffset: number; // e.g., -14400
                        };
                        regular: {
                            timezone: string; // e.g., "EDT"
                            start: number; // e.g., 1744691400
                            end: number; // e.g., 1744714800
                            gmtoffset: number; // e.g., -14400
                        };
                        post: {
                            timezone: string; // e.g., "EDT"
                            start: number; // e.g., 1744714800
                            end: number; // e.g., 1744729200
                            gmtoffset: number; // e.g., -14400
                        };
                    };
                    dataGranularity: string; // e.g., "1m"
                    range: string; // e.g., "1d"
                    validRanges: string[]; // e.g., ["1d", "5d", "1m", ...]
                    instrumentType: string; // e.g., "EQUITY"
                };
                timestamp: number[]; // e.g., [1744628340, 1744628280, ...]
                events: {
                    dividends: {
                        [key: string]: {
                            amount: number; // e.g., 0.12
                            date: number; // e.g., 550695600
                        };
                    };
                };
                indicators: {
                    quote: [
                        {
                            adjclose: number[];
                        intrinsic?:number[];

                            close: number[]; // e.g., [202.51, 202.515, ...]
                            open: number[]; // e.g., [202.57, 202.54, ...]
                            high: number[]; // e.g., [202.72, 202.54, ...]
                            low: number[]; // e.g., [202.37, 202.4, ...]
                            volume: number[]; // e.g., [1522139, 606588, ...]
                        }
                    ];
                    // adjclose: [
                    //     {
                    //         adjclose: number[]; // e.g., [202.51, 202.515, ...]
                    //     }
                    // ];
                };
            }
        ];
        error: null;
    };
};
export type historicalDataType = {
    count: number; // e.g., 1
    next: string | null; // e.g., null
    previous: string | null; // e.g., null
    results: [
         
           {
    date: string,
    open: number,
    high:number,
    low: number,
    close: number,
    volume: number,
    adjClose: number
} 
    ];
};
interface Revenue {
    totalRevenue: string;
    operatingRevenue: string;
    nonOperatingRevenue: string;
}

interface CostOfRevenue {
    costOfRevenue: string;
}

interface GrossProfit {
    grossProfit: string;
}

interface OperatingExpenses {
    researchAndDevelopment: string;
    sellingGeneralAndAdministrative: string;
    otherOperatingExpenses: string;
    totalOperatingExpenses: string;
}

interface OperatingIncome {
    operatingIncome: string;
}

interface OtherIncomeExpenses {
    netNonOperatingInterestIncomeExpense: string;
    otherNonOperatingIncomeExpense: string;
    totalOtherIncomeExpenses: string;
}

interface PretaxIncome {
    pretaxIncome: string;
}

interface TaxProvision {
    taxProvision: string;
}

interface NetIncome {
    netIncomeFromContinuingOperations: string;
    netIncomeFromDiscontinuedOperations: string;
    netIncome: string;
    netIncomeAvailableToCommonStockholders: string;
}

interface EarningsPerShare {
    basicEPS: number;
    dilutedEPS: number;
}

interface SharesOutstanding {
    weightedAverageSharesOutstandingBasic: string;
    weightedAverageSharesOutstandingDiluted: string;
}

export interface IncomeStatement {
    date: string;
    period: string;
    revenue: Revenue;
    costOfRevenue: CostOfRevenue;
    grossProfit: GrossProfit;
    operatingExpenses: OperatingExpenses;
    operatingIncome: OperatingIncome;
    otherIncomeExpenses: OtherIncomeExpenses;
    pretaxIncome: PretaxIncome;
    taxProvision: TaxProvision;
    netIncome: NetIncome;
    earningsPerShare: EarningsPerShare;
    sharesOutstanding: SharesOutstanding;
}

interface CurrentAssets {
    cashAndCashEquivalents: string;
    shortTermInvestments: string;
    accountsReceivable: string;
    inventory: string;
    otherCurrentAssets: string;
    totalCurrentAssets: string;
}

interface NonCurrentAssets {
    propertyPlantAndEquipmentNet: string;
    goodwill: string;
    intangibleAssets: string;
    longTermInvestments: string;
    otherNonCurrentAssets: string;
    totalNonCurrentAssets: string;
}

interface Assets {
    currentAssets: CurrentAssets;
    nonCurrentAssets: NonCurrentAssets;
    totalAssets: string;
}

interface CurrentLiabilities {
    accountsPayable: string;
    shortTermDebt: string;
    deferredRevenue: string;
    otherCurrentLiabilities: string;
    totalCurrentLiabilities: string;
}

interface NonCurrentLiabilities {
    longTermDebt: string;
    deferredTaxLiabilities: string;
    otherNonCurrentLiabilities: string;
    totalNonCurrentLiabilities: string;
}

interface ShareholdersEquity {
    commonStock: string;
    retainedEarnings: string;
    accumulatedOtherComprehensiveIncome: string;
    totalShareholdersEquity: string;
}

interface LiabilitiesAndShareholdersEquity {
    currentLiabilities: CurrentLiabilities;
    nonCurrentLiabilities: NonCurrentLiabilities;
    totalLiabilities: string;
    shareholdersEquity: ShareholdersEquity;
    totalLiabilitiesAndShareholdersEquity: string;
}

export interface BalanceSheet {
    date: string;
    period: string;
    assets: Assets;
    liabilitiesAndShareholdersEquity: LiabilitiesAndShareholdersEquity;
}

interface ChangesInOperatingAssetsAndLiabilities {
    accountsReceivable: string;
    inventory: string;
    accountsPayable: string;
    otherWorkingCapitalChanges: string;
}

interface AdjustmentsToReconcileNetIncome {
    depreciationAndAmortization: string;
    deferredIncomeTax: string;
    stockBasedCompensation: string;
    changesInOperatingAssetsAndLiabilities: ChangesInOperatingAssetsAndLiabilities;
    otherNonCashItems: string;
}

interface CashFlowsFromOperatingActivities {
    netIncome: string;
    adjustmentsToReconcileNetIncomeToNetCashProvidedByOperatingActivities: AdjustmentsToReconcileNetIncome;
    netCashProvidedByOperatingActivities: string;
}

interface CashFlowsFromInvestingActivities {
    investmentsInPropertyPlantAndEquipment: string;
    acquisitionsNet: string;
    purchasesOfInvestments: string;
    salesMaturitiesOfInvestments: string;
    otherInvestingActivities: string;
    netCashProvidedByInvestingActivities: string;
}

interface CashFlowsFromFinancingActivities {
    debtIssuanceRepayment: string;
    commonStockIssuanceRepurchase: string;
    dividendsPaid: string;
    otherFinancingActivities: string;
    netCashProvidedByFinancingActivities: string;
}

interface OtherCashFlowItems {
    effectOfExchangeRateChangesOnCash: string;
    netChangeInCash: string;
    cashAtBeginningOfPeriod: string;
    cashAtEndOfPeriod: string;
}

export interface CashFlowStatement {
    period: string;
    date:String;
    cashFlowsFromOperatingActivities: CashFlowsFromOperatingActivities;
    cashFlowsFromInvestingActivities: CashFlowsFromInvestingActivities;
    cashFlowsFromFinancingActivities: CashFlowsFromFinancingActivities;
    otherCashFlowItems: OtherCashFlowItems;
}

export interface FinancialStatement {
    incomeStatement: IncomeStatement[];
    balanceSheet: BalanceSheet[];
    cashFlowStatement: CashFlowStatement[];
}
export type CompanyKey =
    | "pricePerformance"
    | "margin"
    | "earnings"
    | "financials"
    | "valuation"
    | "forwardDividendYield";

export interface Company {
    symbol: string;
    name: string;
    pricePerformance: {
        "1 Week": string;
        "3 Months": string;
        YTD: string;
        "1 Year": string;
        chartData?: any; // Replace `any` with the actual chart data structure if available
    };
    margin: {
        operating: string;
        gross: string;
        profit: string;
        chartData?: any;
    };
    earnings: {
        basicEPS: string;
        epsGrowth1Y: string;
        chartData?: any;
    };
    financials?: {
        revenueTTM: string;
        revenueGrowth3Y: string;
        chartData?: any;
    };
    valuation?: {
        peRatio: string;
        pbRatio: string;
        chartData?: any;
    };
    forwardDividendYield: {
        value: string;
        chartData?: any;
    };
    equityReturn: {
        returnOnAssets: string,
        returnOnCapital: string,
    };
    ownership: {
        institutional: string,
    };
    sector: string;
    ceo: string;
    industry: string;
    marketValue: {
        marketCap: string,
        chartData: { date: string, marketCap: number }[],
    };
    enterpriseValue: {
        value: string,
        chartData: { date: string, value: number }[
        ]
    };
    priceToEarnings: {
        ratio: string,
        chartData: { date: string, ratio: number }[
        ]
    };
    dilutedEPS: {
        value: string,
        chartData: { date: string, value: number }[
        ]
    }
}
export type GainerStock = {
    symbol: string;
    price: number;
    name: string;
    change: number;
    changesPercentage: string;
    exchange: string;
};

export type TopGainersResponse = {
    top_gainers: {
        result: GainerStock[];
        error: string | null;
    };
};
export type TopLosersResponse = {
    top_losers: {
        result: GainerStock[];
        error: string | null;
    };
};
export type TopTradedStockResponse = {
    top_traded_stocks: {
        result: GainerStock[];
        error: string | null;
    };
};
export type dailyMarketSectorPerformanceResponse = {
    daily_market_sector_performance: {
        result: {
            date: string,
            sector: string,
            exchange: string,
            averageChange: string
        }[]
        error: string | null;
    }
}
export type dailyIndustoryPerformanceResponse = {
    daily_industry_performance: {
        result: {
            date: string,
            industry: string,
            exchange: string,
            averageChange: string
        }[]
        error: string | null;
    }
}
export type TopStock = {
    symbol: string;
    companyName: string;
    marketCap: number;
    sector: string;
    industry: string;
    beta: number;
    price: number;
    lastAnnualDividend: number;
    volume: number;
    exchange: string;
    exchangeShortName: string;
    country: string;
    isEtf: boolean;
    isFund: boolean;
    isActivelyTrading: boolean;
};

export type TopStocksResponse = {
    top_stocks: {
        result: TopStock[];
    };
    error: string | null;
};
export type EmaChartPoint = {
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: number;
  ema: string;
  intrinsicValue: string;
};
 
export type EmaChartData = {
    "ema-chart-data": {
        result: EmaChartPoint[];
        error: null | string
    };
};

export type EPSProjectionData = {
    eps_projection: {
        result: {
            year: string;
            epsAvg: number;
        }[];
        error: null;
    };
};

export type Stock = {
  symbol: string;
  companyName: string;
  marketCap: number;
  sector: string | null;
  industry: string | null;
  beta: number;
  price: number;
  lastAnnualDividend: number;
  volume: number;
  exchange: string;
  exchangeShortName: string;
  country: string;
  isEtf: boolean;
  isFund: boolean;
  isActivelyTrading: boolean;

  // Newly added metrics
  grossProfitMargin: string;   // e.g., "46%"
  netProfitMargin: string;     // e.g., "24%"
  ROE: string;                 // e.g., "18%"
  deRatio: number;             // Debt-to-Equity Ratio
  interestExpense: string;     // e.g., "$5B"
  costOfDebt: string;          // e.g., "5%"
  fcffEbit: string;            // e.g., "$65B"
  eps: string;                 // e.g., "$5.25"
  epsGrowth: string;           // e.g., "12%"
  wacc: string;                // e.g., "8.7%"
};


export type StockScreeningResponse = {
    filtered_data: {
        result: Stock[];
    };
};
export type WatchList = {
    symbol: string;              // Symbol of the stock (e.g., "AAPL")
    lastPrice: number;           // Last price of the stock
    changePercent: number;       // Change percentage in the last trading day
    change: number;              // Absolute change in the stock price
    currency: string;            // Currency (e.g., "USD")
    marketTime: string;          // Market time (ISO 8601 or readable time format)
    volume: number;              // Trading volume in the last trading session
    avgVolume: number;           // Average trading volume over a period (e.g., 30 days)
    dayRange: string;            // Day's trading range (e.g., "135.00 - 145.00")
    yearRange: string;           // Year's trading range (e.g., "120.00 - 180.00")
    dayChart: string;            // Link or path to the day's chart (e.g., image URL or chart ID)
    marketCap: number;           // Market capitalization of the company
};
export type Holdings = {
    symbol: string;
    status: "Active" | "Sold";
    shares: number;
    lastPrice: number;
    avgCostPerShare: number;
    totalCost: number;
    marketValue: number;
    totalDividendIncome: number;
    dayGainPercent: number;
    dayGainAmount: number;
    totalGainPercent: number;
    totalGainAmount: number;
    realizedGainPercent: number;
};

export type TransactionType = "buy" | "sell" | "sellshort" | "buytocover";

export interface Transactions {
    date: Date; // ISO format recommended, e.g. '2025-04-30'
    type: TransactionType;
    shares: number;
    costPerShare: number;
    commission: number;
    totalCost: number;
    realizedGainPercent?: number;
    realizedGainDollar?: number;
}
export interface StockFundamentals {
    symbol: string;
    lastPrice: number;
    marketCap: string; // Could be in billions/trillions (e.g., "2.5T")
    avgVolume3M: string; // e.g., "25.3M"
    epsEstNextYr: number;
    forwardPE: number;
    divPaymentDate: string; // Use string for simplicity, e.g., "2025-05-10"
    exDivDate: string;
    divPerShare: number;
    fwdAnnDivRate: number;
    fwdAnnDivYield: number; // as percent, e.g., 1.52 means 1.52%
    trlAnnDivRate: number;
    trlAnnDivYield: number;
    priceToBook: number;
}
export interface Portfolio {
    portfolioName: string,
    symbols: number;
    costBasis: string;
    marketValue: string;
    dayChange: string;
    unrealizedGainLoss: string;
    realizedGainLoss: string;
}
export type PortfolioData = {
    portfolioName: string;
    symbols: number;
    costBasis: string; // e.g., "$25,000"
    marketValue: string; // e.g., "$24,500"
    dayChange: string; // e.g., "-$500"
    unrealizedGainLoss: string; // e.g., "-$500"
    realizedGainLoss: string; // e.g., "+$500"
    currency: string; // e.g., "USD"
};

export interface DebtCoverageEntry {
  symbol: string;
  annual: {
    fiscalYear: string;
    totalDebt: string;
    cashAndCashEquivalents: string;
  };
  quarterly: {
    fiscalYear: string;
    totalDebt: string;
    cashAndCashEquivalents: string;
  };
}

export interface FinancialPositionData {
  symbol: string;
  annual: {
    shortTerm: {
      totalCurrentAssets: string;
      totalCurrentLiabilities: string;
    };
    longTerm: {
      totalNonCurrentAssets: string;
      totalCurrentLiabilities: string;
    };
  };
  quarterly: {
    shortTerm: {
      totalCurrentAssets: string;
      totalCurrentLiabilities: string;
    };
    longTerm: {
      totalNonCurrentAssets: string;
      totalCurrentLiabilities: string;
    };
  };
}

export interface GrowthProfitabilityAndDebtAnalysisResult {
  debtCoverage: DebtCoverageEntry[];
  financialPosition: FinancialPositionData;
}

export interface GrowthProfitabilityAndDebtAnalysisChartData {
  result: GrowthProfitabilityAndDebtAnalysisResult;
  error: any; // Can change to more specific type if needed
}

export interface GrowthProfitabilityAndDebtAnalysisChartRootData {
  growth_profitability_and_debt_analysis_chart_data: GrowthProfitabilityAndDebtAnalysisChartData;
}
export type FinancialDataType = {
  financial_highlights: {
    fiscalYear: {
      fiscalYearEnd: string;
      mostRecentQuarter: string;
    };
    profitability: {
      profitMargin: string;
      operatingMarginTtm: string;
    };
    managementEffectiveness: {
      returnOnAssetsTtm: string;
      returnOnEquityTtm: string;
    };
    incomeStatement: {
      revenueTtm: string;
      revenuePerShareTtm: string;
      quarterlyRevenueGrowthYoy: string;
      grossProfitTtm: string;
      ebitdaTtm: string;
      netIncomeTtm: string;
      dilutedEpsTtm: string;
      quarterlyEarningsGrowthYoy: string;
    };
    balanceSheet: {
      totalCash: string;
      totalCashPerShare: string;
      totalDebt: string;
      debtToEquity: string;
      currentRatio: string;
      bookValuePerShare: string;
    };
    cashFlowStatement: {
      operatingCashFlowTtm: string;
      leveredFreeCashFlowTtm: string;
    };
  };
  trading_info: {
    stockPriceHistory: {
      beta5yMonthly: number;
      regularMarketPrice: number;
      fiftyTwoWeekHigh: number;
      fiftyTwoWeekLow: number;
      regularMarketDayHigh: number;
      regularMarketDayLow: number;
      regularMarketVolume: string;
      fiftyDayMovingAverage: number;
      twoHundredDayMovingAverage: number;
    };
    shareStatistics: {
      avgVol3Month: string;
      sharesOutstanding: string;
      impliedSharesOutstanding: string;
      float: string;
    };
    dividendsAndSplits: {
      forwardAnnualDividendRate: string;
      forwardAnnualDividendYield: string;
      trailingAnnualDividendRate: string;
      trailingAnnualDividendYield: string;
      payoutRatio: string;
      dividendDate: string;
      exDividendDate: string;
      lastSplitFactor: string;
      lastSplitDate: string;
    };
  };
};
export interface MetaDataType {
  meta: {
    ticker: string;
    exchange: string;
    previousClose: string;
    open: string;
    pricechange: number;
    changePercent: number;
    dayRange: string;
    week52Range: string;
    volume: string;
    avgVolume: string;
    marketCap: string;
    currency: string;
    symbol: string;
    exchangeName: string;
    regularMarketTime: string; // ISO date string
    exchangeTimezoneName: string;
    regularMarketPrice: string;
    fiftyTwoWeekHigh: string;
    fiftyTwoWeekLow: string;
    regularMarketDayHigh: string;
    regularMarketDayLow: string;
    regularMarketVolume: string;
    priceAvg1Y: string;
    beta: string;
    chartPreviousClose: string;
    priceHint: number;
    instrumentType: string;
    revenue: string;
    grossProfit: string;
    ebitda: string;
    peRatio: number;
    eps: number;
    earningsDate: string; // could be parsed to Date
    companyName: string;
    website: string;
    fullTimeEmployees: string;
    sector: string;
    industry: string;
    description: string;
    fiscalYearEnds: string;
    firstTradeDate: string;
    dividend: number;
    yield: string;
  };
  error: null | string;
}
// types.ts
export type ChartPoint = {
  date: string;
  period: string;
  marketCap?: string;
  enterpriseValue?: string;
  priceToEarnings?: number;
  dilutedepsDilutedEPS?: number;
  forwardDividendYield?: string;
};

export type PricePerformance = {
  "5D": number;
  "3M": number;
  ytd: number;
  "1Y": number;
};

export type IncomeStatement2 = {
  date: string;
  revenue: string;
  operatingexpenses: string;
  operatingIncome: string;
  revenueGrowth: string;
  costOfRevenue: string;
  grossProfit: string;
  researchAndDevelopmentExpenses: string;
  sellingGeneralAndAdministrativeExpenses: string;
  depreciationAndAmortization: string;
  totalOtherIncomeExpensesNet: string;
  incomeBeforeTax: string;
  incomeTaxExpense: string;
  netIncome: string;
  eps: number;
  epsDiluted: number;
  weightedAverageShsOut: string;
  weightedAverageShsOutDil: string;
};

export type BalanceSheet2 = {
  date: string;
  inventory: string;
  cashAndCashEquivalents: string;
  shortTermInvestments: string;
  netReceivables: string;
  accountsReceivables: string;
  accountsReceivableTurnover: string;
  totalCurrentAssets: string;
  longTermInvestments: string;
  totalAssets: string;
  totalPayables: string;
  accountsPayables: string;
  totalLiabilities: string;
  taxPayables: string;
  commonStock: string;
  totalLiabilitiesAndTotalEquity: string;
  totalEquity: string;
  totalDebt: string;
  netDebt: string;
};

export type CashFlowStatement2 = {
  operatingCashFlow: string;
  capitalExpenditure: string;
  freeCashFlow: string;
  cashFromInvestingActivities: string;
  cashFromFinancingActivities: string;
  netChangeInCash: string;
  cashAtEndOfPeriod: string;
};

export type PriceRatios = {
  priceToEarnings: number;
  priceToBook: number;
  priceToSales: number;
  dividendYield: number;
  evToEbitda: number;
};

export type Margins = {
  grossProfitMargin: string;
  operatingProfitMargin: string;
  netProfitMargin: string;
  ebitdaMargin: string;
};

export type EquityReturn = {
  returnOnEquity: string;
  returnOnAssets: string;
  returnOnInvestedCapital: string;
};

export type Earnings = {
  earningsPerShare: number;
};

export type ComparisonStockData = {
  as_of_today_date: string;
  companyName: string;
  symbol: string;
  price: number;
  priceChange: number;
  changePercentage: number;
  marketValueHead: string;
  enterpriseValueHead: string;
  priceToEarnings: number;
  priceToBook: number;
  priceToSales: number;
  earningspersharediluted: number;
  dividendYield: number;
  sector: string;
  industry: string;
  ceo: string;
  marketValueChart: ChartPoint[];
  enterpriseValueChart: ChartPoint[];
  peRatioChart: ChartPoint[];
  dilutedEPSChart: ChartPoint[];
  dividendYieldChart: ChartPoint[];
  pricePerformance: PricePerformance;
  incomeStatement: IncomeStatement2;
  balanceSheet: BalanceSheet2;
  cashFlowStatement: CashFlowStatement2;
  priceRatios: PriceRatios;
  margins: Margins;
  earnings: Earnings;
  equityReturn: EquityReturn;
};

export type ComparisonDataTypes = ComparisonStockData[];

export type RealtimePriceData = {
  [symbol: string]: {
    date: string;  // or consider using `Date` if you'll parse it
    price: number;
  }[];
};
