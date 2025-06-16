export type statisticsSectionType = {
    currentRoute: string;
};
export type OwnershipStructureChartData = {
    ownership_structure_chart_data: {
        result: {
            symbol: string;
            freefloatShares: string;
            freeFloatPercentage: number;
            closelyHeldShares: string;
            closelyHeldPercentage: number;
        };
        error: string | null;
    };
};
export type GrowthProfitabilityChartData1 = {
    growth_profitability_chart_data: {
        result: {
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
        };
        error: null;
    };
};
export type GrowthProfitabilityChartData2 = {
    growth_profitability_chart_data: {
        result: {
            symbol: string;
            annual: {
                year: string;
                totalDebt: string;
                cashAndCashEquivalents: string;
            };
            quarterly: {
                year: string;
                totalDebt: string;
                cashAndCashEquivalents: string;
            };
        }[];
        error: null;
    };
};
