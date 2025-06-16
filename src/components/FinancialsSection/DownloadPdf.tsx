 
import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { BalanceSheet, CashFlowStatement, FinancialStatement, IncomeStatement } from '@/types/types';
import { Download } from 'lucide-react';
 

// PDF styles
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 10 },
  header: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  subHeader: { fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 5, backgroundColor: '#f0f0f0', padding: 5 },
  table: { display: 'flex', flexDirection: 'column', width: '100%' },
  tableRow: { flexDirection: 'row', borderBottom: '1px solid #e0e0e0' },
  tableCell: { flex: 1, padding: 5, textAlign: 'left' },
  tableHeaderCell: { flex: 1, padding: 5, fontWeight: 'bold', backgroundColor: '#f0f0f0', textAlign: 'center' },
  nameCell: { flex: 2, padding: 5, fontWeight: 'bold' },
});

type TableRow<T> = {
  name: string;
  key: (s: T) => string | number | undefined;
};

interface FinancialPDFProps {
  activeRange: 'incomeStatement' | 'balanceSheet' | 'cashFlowStatement';
  financialStatement: FinancialStatement;
}

const FinancialPDF: React.FC<FinancialPDFProps> = ({ activeRange, financialStatement }) => {
  const getData = () => {
    switch (activeRange) {
      case 'incomeStatement':
        return [
          {
            section: 'Revenue',
            rows: [
              { name: 'Total Revenue', key: (s: IncomeStatement) => s.revenue.totalRevenue },
              { name: 'Operating Revenue', key: (s: IncomeStatement) => s.revenue.operatingRevenue },
              { name: 'Non-Operating Revenue', key: (s: IncomeStatement) => s.revenue.nonOperatingRevenue },
            ],
          },
          {
            section: 'Cost of Revenue',
            rows: [{ name: 'Cost of Revenue', key: (s: IncomeStatement) => s.costOfRevenue.costOfRevenue }],
          },
          {
            section: 'Gross Profit',
            rows: [{ name: 'Gross Profit', key: (s: IncomeStatement) => s.grossProfit.grossProfit }],
          },
          {
            section: 'Operating Expenses',
            rows: [
              { name: 'R&D', key: (s: IncomeStatement) => s.operatingExpenses.researchAndDevelopment },
              { name: 'SG&A', key: (s: IncomeStatement) => s.operatingExpenses.sellingGeneralAndAdministrative },
              { name: 'Other Op. Expenses', key: (s: IncomeStatement) => s.operatingExpenses.otherOperatingExpenses },
              { name: 'Total Op. Expenses', key: (s: IncomeStatement) => s.operatingExpenses.totalOperatingExpenses },
            ],
          },
        ];
      case 'balanceSheet':
        return [
          {
            section: 'Current Assets',
            rows: [
              { name: 'Cash & Cash Equivalents', key: (s: BalanceSheet) => s.assets.currentAssets.cashAndCashEquivalents },
              { name: 'Short-Term Investments', key: (s: BalanceSheet) => s.assets.currentAssets.shortTermInvestments },
              { name: 'Accounts Receivable', key: (s: BalanceSheet) => s.assets.currentAssets.accountsReceivable },
              { name: 'Inventory', key: (s: BalanceSheet) => s.assets.currentAssets.inventory },
              { name: 'Other Current Assets', key: (s: BalanceSheet) => s.assets.currentAssets.otherCurrentAssets },
              { name: 'Total Current Assets', key: (s: BalanceSheet) => s.assets.currentAssets.totalCurrentAssets },
            ],
          },
            {
            section: 'Non Current Assets',
            rows: [
              { name: 'PPE (Net)', key: (s: BalanceSheet) => s.assets.nonCurrentAssets.propertyPlantAndEquipmentNet },
              { name: 'Goodwill', key: (s: BalanceSheet) => s.assets.nonCurrentAssets.goodwill },
              { name: 'Intangible Assets', key: (s: BalanceSheet) => s.assets.nonCurrentAssets.intangibleAssets },
              { name: 'Long-Term Investments', key: (s: BalanceSheet) => s.assets.nonCurrentAssets.longTermInvestments },
              { name: 'Other Non-Current Assets	', key: (s: BalanceSheet) => s.assets.nonCurrentAssets.otherNonCurrentAssets },
            //   { name: 'Total Non-Current Assets', key: (s: BalanceSheet) => s.assets.nonCurrentAssets.total },
            ],
          },
            {
            section: 'Total Assets',
            rows: [{ name: 'Total Assets', key: (s: BalanceSheet) => s.assets.totalAssets }],
          },
            {
            section: 'Current Liabilities',
            rows: [
              { name: 'Accounts Payable', key: (s: BalanceSheet) =>  s.liabilitiesAndShareholdersEquity.currentLiabilities.accountsPayable },
              { name: 'Short-Term Debt', key: (s: BalanceSheet) =>  s.liabilitiesAndShareholdersEquity.currentLiabilities.shortTermDebt },
              { name: 'Deferred Revenue', key: (s: BalanceSheet) =>  s.liabilitiesAndShareholdersEquity.currentLiabilities.deferredRevenue },
              { name: 'Other Current Liabilities', key: (s: BalanceSheet) =>  s.liabilitiesAndShareholdersEquity.currentLiabilities.otherCurrentLiabilities },
              { name: 'Total Current Liabilities', key: (s: BalanceSheet) =>  s.liabilitiesAndShareholdersEquity.currentLiabilities.totalCurrentLiabilities },
            //   { name: 'Total Non-Current Assets', key: (s: BalanceSheet) => s.assets.nonCurrentAssets.total },
            ],
          },
             {
            section: 'Non Current Liabilities',
            rows: [
              { name: 'Long-Term Debt', key: (s: BalanceSheet) =>  s.liabilitiesAndShareholdersEquity.nonCurrentLiabilities.longTermDebt },
              { name: 'Deferred Tax Liabilities	', key: (s: BalanceSheet) =>  s.liabilitiesAndShareholdersEquity.nonCurrentLiabilities.deferredTaxLiabilities },
              { name: 'Other Non-Current Liabilities	', key: (s: BalanceSheet) =>  s.liabilitiesAndShareholdersEquity.nonCurrentLiabilities.otherNonCurrentLiabilities },
              { name: 'Total Non-Current Liabilities', key: (s: BalanceSheet) =>  s.liabilitiesAndShareholdersEquity.nonCurrentLiabilities.totalNonCurrentLiabilities },
                //   { name: 'Total Non-Current Assets', key: (s: BalanceSheet) => s.assets.nonCurrentAssets.total },
            ],
          },
           {
            section: 'Total Liabilities',
            rows: [{ name: 'Total Liabilites', key: (s: BalanceSheet) => s.liabilitiesAndShareholdersEquity.totalLiabilities }],
          },
           {
            section: `Shareholders' Equity`,
            rows: [
              { name: 'Common Stock', key: (s: BalanceSheet) =>  s.liabilitiesAndShareholdersEquity.shareholdersEquity.commonStock },
              { name: 'Retained Earnings', key: (s: BalanceSheet) =>  s.liabilitiesAndShareholdersEquity.shareholdersEquity.retainedEarnings },
              { name: 'Accum. Other Comp. Income		', key: (s: BalanceSheet) =>  s.liabilitiesAndShareholdersEquity.shareholdersEquity.accumulatedOtherComprehensiveIncome},
              { name: `Total Shareholders' Equity`, key: (s: BalanceSheet) =>  s.liabilitiesAndShareholdersEquity.shareholdersEquity.totalShareholdersEquity },
              { name: `Total Liabilities & Equity`, key: (s: BalanceSheet) =>  s.liabilitiesAndShareholdersEquity.totalLiabilitiesAndShareholdersEquity },
                ],
          },
        ];
      case 'cashFlowStatement':
        return [
          {
            section: 'Cash Flows from Operating Activities',
            rows: [
              { name: 'Net Income', key: (s: CashFlowStatement) => s.cashFlowsFromOperatingActivities.netIncome },
            ],
          },
           {
            section: 'Adjustments to Reconcile Net Incomes',
            rows: [
              { name: 'Depreciation & Amortization', key: (s: CashFlowStatement) => s.cashFlowsFromOperatingActivities.adjustmentsToReconcileNetIncomeToNetCashProvidedByOperatingActivities.depreciationAndAmortization },
              { name: 'Deferred Income Tax', key: (s: CashFlowStatement) => s.cashFlowsFromOperatingActivities.adjustmentsToReconcileNetIncomeToNetCashProvidedByOperatingActivities.deferredIncomeTax },
              { name: 'Stock-Based Compensation', key: (s: CashFlowStatement) => s.cashFlowsFromOperatingActivities.adjustmentsToReconcileNetIncomeToNetCashProvidedByOperatingActivities.stockBasedCompensation },
            ],
          },
           {
            section: 'Changes in Operating Assets and Liabilities',
            rows: [
              { name: 'Accounts Receivable', key: (s: CashFlowStatement) => s.cashFlowsFromOperatingActivities.adjustmentsToReconcileNetIncomeToNetCashProvidedByOperatingActivities.changesInOperatingAssetsAndLiabilities.accountsReceivable },
              { name: 'Inventory', key: (s: CashFlowStatement) => s.cashFlowsFromOperatingActivities.adjustmentsToReconcileNetIncomeToNetCashProvidedByOperatingActivities.changesInOperatingAssetsAndLiabilities.inventory },
              { name: 'Accounts Payable', key: (s: CashFlowStatement) => s.cashFlowsFromOperatingActivities.adjustmentsToReconcileNetIncomeToNetCashProvidedByOperatingActivities.changesInOperatingAssetsAndLiabilities.accountsPayable},
              { name: 'Other Working Capital Changes', key: (s: CashFlowStatement) => s.cashFlowsFromOperatingActivities.adjustmentsToReconcileNetIncomeToNetCashProvidedByOperatingActivities.changesInOperatingAssetsAndLiabilities.otherWorkingCapitalChanges },
              { name: 'Other Non-Cash Items', key: (s: CashFlowStatement) => s.cashFlowsFromOperatingActivities.adjustmentsToReconcileNetIncomeToNetCashProvidedByOperatingActivities.otherNonCashItems },
              { name: 'Net Cash Provided by Operating Activities', key: (s: CashFlowStatement) => s.cashFlowsFromOperatingActivities.netCashProvidedByOperatingActivities },
            ],
          },
           {
            section: 'Cash Flows from Investing Activities',
            rows: [
              { name: 'Investments in Property, Plant & Equipment', key: (s: CashFlowStatement) =>s.cashFlowsFromInvestingActivities.investmentsInPropertyPlantAndEquipment },
              { name: 'Acquisitions (Net)', key: (s: CashFlowStatement) => s.cashFlowsFromInvestingActivities.acquisitionsNet },
              { name: 'Purchases of Investments', key: (s: CashFlowStatement) =>s.cashFlowsFromInvestingActivities.purchasesOfInvestments },
              { name: 'Sales/Maturities of Investments', key: (s: CashFlowStatement) => s.cashFlowsFromInvestingActivities.salesMaturitiesOfInvestments },
              { name: 'Other Investing Activities', key: (s: CashFlowStatement) =>s.cashFlowsFromInvestingActivities.otherInvestingActivities},
              { name: 'Net Cash Provided by Investing Activities	', key: (s: CashFlowStatement) =>s.cashFlowsFromInvestingActivities.netCashProvidedByInvestingActivities},
            ],
          },
           {
            section: 'Cash Flows from Financing Activities',
            rows: [
              { name: 'Debt Issuance/Repayment', key: (s: CashFlowStatement) => s.cashFlowsFromFinancingActivities.debtIssuanceRepayment },
              { name: 'Common Stock Issuance/Repurchase', key: (s: CashFlowStatement) => s.cashFlowsFromFinancingActivities.commonStockIssuanceRepurchase },
              { name: 'Dividends Paid', key: (s: CashFlowStatement) =>s.cashFlowsFromFinancingActivities.dividendsPaid },
              { name: 'Other Financing Activities', key: (s: CashFlowStatement) => s.cashFlowsFromFinancingActivities.otherFinancingActivities },
              { name: 'Net Cash Provided by Financing Activities', key: (s: CashFlowStatement) => s.cashFlowsFromFinancingActivities.netCashProvidedByFinancingActivities },
              ],
          },
           {
            section: 'Other Cash Flow Items',
            rows: [
              { name: 'Effect of Exchange Rate Changes on Cash', key: (s: CashFlowStatement) => s.otherCashFlowItems.effectOfExchangeRateChangesOnCash },
              { name: 'Net Change in Cash', key: (s: CashFlowStatement) =>  s.otherCashFlowItems.netChangeInCash},
              { name: 'Cash at Beginning of Period', key: (s: CashFlowStatement) =>  s.otherCashFlowItems.cashAtBeginningOfPeriod },
              { name: 'Cash at End of Period', key: (s: CashFlowStatement) =>  s.otherCashFlowItems.cashAtEndOfPeriod },
                ],
          },
        ];
      default:
        return     [
          {
            section: 'Revenue',
            rows: [
              { name: 'Total Revenue', key: (s: IncomeStatement) => s.revenue.totalRevenue },
              { name: 'Operating Revenue', key: (s: IncomeStatement) => s.revenue.operatingRevenue },
              { name: 'Non-Operating Revenue', key: (s: IncomeStatement) => s.revenue.nonOperatingRevenue },
            ],
          },
          {
            section: 'Cost of Revenue',
            rows: [{ name: 'Cost of Revenue', key: (s: IncomeStatement) => s.costOfRevenue.costOfRevenue }],
          },
          {
            section: 'Gross Profit',
            rows: [{ name: 'Gross Profit', key: (s: IncomeStatement) => s.grossProfit.grossProfit }],
          },
          {
            section: 'Operating Expenses',
            rows: [
              { name: 'R&D', key: (s: IncomeStatement) => s.operatingExpenses.researchAndDevelopment },
              { name: 'SG&A', key: (s: IncomeStatement) => s.operatingExpenses.sellingGeneralAndAdministrative },
              { name: 'Other Op. Expenses', key: (s: IncomeStatement) => s.operatingExpenses.otherOperatingExpenses },
              { name: 'Total Op. Expenses', key: (s: IncomeStatement) => s.operatingExpenses.totalOperatingExpenses },
            ],
          },
        ];
    }
  };

  const data =
    activeRange === 'incomeStatement'
      ? financialStatement.incomeStatement
      : activeRange === 'balanceSheet'
      ? financialStatement.balanceSheet
      : financialStatement.cashFlowStatement;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>
          {activeRange === 'incomeStatement' ? 'Income Statement' : activeRange === 'balanceSheet' ? 'Balance Sheet' : 'Cash Flow Statement'}
        </Text>
        <View style={styles.table}>
          {/* Header Row */}
          <View style={styles.tableRow}>
            <Text style={styles.nameCell}>Name</Text>
            {data.map((s, i) => {
              const date = new Date('date' in s ? s.date : s.period);
              const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
              return <Text key={i} style={styles.tableHeaderCell}>{formattedDate}</Text>;
            })}
          </View>

          {/* Data Rows */}
          {getData().map((section, index) => (
            <View key={index}>
              <Text style={styles.subHeader}>{section.section}</Text>
              {section.rows.map((row, rowIndex) => (
                <View style={styles.tableRow} key={rowIndex}>
                  <Text style={styles.nameCell}>{row.name}</Text>
                  {data.map((s, i) => {
                    let value: string | number | undefined;

                    if (activeRange === 'incomeStatement') {
                      value = (row as TableRow<IncomeStatement>).key(s as IncomeStatement);
                    } else if (activeRange === 'balanceSheet') {
                      value = (row as TableRow<BalanceSheet>).key(s as BalanceSheet);
                    } else {
                      value = (row as TableRow<CashFlowStatement>).key(s as CashFlowStatement);
                    }

                    return (
                      <Text key={i} style={styles.tableCell}>
                        {value ?? '-'}
                      </Text>
                    );
                  })}
                </View>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

// Download Button Component
const FinancialStatementPDFDownload: React.FC<FinancialPDFProps> = ({ activeRange, financialStatement }) => {
  return (
    <div>
      <PDFDownloadLink
        document={<FinancialPDF activeRange={activeRange} financialStatement={financialStatement} />}
        fileName={`${activeRange}-statement.pdf`}
      >
        {({ loading }) => (loading ? '...' : <Download/>)}
      </PDFDownloadLink>
    </div>
  );
};

export default FinancialStatementPDFDownload;
