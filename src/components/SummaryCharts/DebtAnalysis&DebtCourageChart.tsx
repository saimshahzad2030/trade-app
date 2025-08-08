import React from 'react'
import DebtAnalysis from './DebtAnalysisChart'
import DebtCourageChart from './DebtCourageChart'
import { getGrowthProfitabilityChart } from '@/services/stock.services';
import { GrowthProfitabilityAndDebtAnalysisChartRootData } from '@/types/types';
type ChartSectionProps = {
    symbol: string;
};
const DebtAnalysisAndDebtCourageChart =({symbol}:ChartSectionProps) => {
    const [chartData,setChartData] = React.useState<GrowthProfitabilityAndDebtAnalysisChartRootData | null>(null)
      const [chartDataLoading,setChartDataLoading] = React.useState<boolean>(true)
      
      React.useEffect(()=>{
            const fetchChartData = async()=>{
              setChartDataLoading(true)
              let response = await getGrowthProfitabilityChart(symbol);
              setChartDataLoading(false)
                setChartData(response.data)
              
            }
            fetchChartData()
    
          },[])
  return (
    <>
    <div className="col-span-2 w-full">
            <DebtAnalysis symbol={symbol} error={chartData?.growth_profitability_and_debt_analysis_chart_data.error} loading={chartDataLoading} data={chartData?.growth_profitability_and_debt_analysis_chart_data.result.debtCoverage}/>
          </div>
          <div className="col-span-2 w-full">
            <DebtCourageChart symbol={symbol} error={chartData?.growth_profitability_and_debt_analysis_chart_data.error} loading={chartDataLoading} data={chartData?.growth_profitability_and_debt_analysis_chart_data.result.financialPosition}/>
          </div></>
  )
}

export default DebtAnalysisAndDebtCourageChart
