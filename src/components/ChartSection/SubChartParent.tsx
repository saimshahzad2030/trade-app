import React from 'react'
import SubChart1 from './SubChart1'
import SubChart2 from './SubChart2'
import SubChart4 from './SubChart4'
import SubChart3 from './SubChart3'
import SubChart5 from './SubChart5'
import SearchBar from '../Searchbar/Searchbar'
import CompanySectionSearchbar from '../Searchbar/CompanySectionSearchbar'
import { searchStock } from '@/services/search.services'
import { Cross, X } from 'lucide-react'
import { getEpsDataMetrices, getPeRatioMetrices, getStockFinancialMetrices } from '@/services/stocksFinancialMetrics.services'
import RoundLoader from '../Loader/RoundLoader'
export type EPSData = { date: string; eps: number | string };
export type PEData = { date: string; pe_ratio: number | string };
type GrowthData = { date: string; growth: number };
type WACCData = { date: string; wacc: number };
type BetaData = { date: string; beta: number };

export type CompanyFinancialMetrics = {
  eps: EPSData[];
  pe: PEData[];
  symbol:string;
  revenueGrowth: GrowthData[];
  wacc: WACCData[];
  historicalBeta: BetaData[];
};
 

export type StockItem = {
  symbol: string;
  name: string;
  currency: string;
  stockExchange: string;
  exchangeShortName: string;
};
 
const SubChartParent = () => {
 
    const [stocks,setStocks] = React.useState<StockItem[]>([]) 
    const [chartData,setChartData] = React.useState<CompanyFinancialMetrics[] | []>([]) 
    const [epsData,setEpsData] = React.useState<{eps: EPSData[],symbol:string}[] >([]) 
    const [peData,setPeData] = React.useState<{pe_ratio: PEData[],symbol:string}[] >([]) 
    let handleNewData= (newData:CompanyFinancialMetrics)=>{
    let c = [...chartData]
    c.push(newData as CompanyFinancialMetrics)
                  setChartData(c);
  }
const handleAddEps = (newData: { eps: EPSData[]; symbol: string }) => { 
  setEpsData(prev => [...prev, newData]);
};
const handleAddPe = (newData: { pe_ratio: PEData[]; symbol: string }) => { 
  console.log("new data",newData)
  setPeData(prev => [...prev, newData]);
};
    const [loading,setLoading] = React.useState<boolean>(false)
     React.useEffect(()=>{
            const fetchChartData = async()=>{
              setLoading(true)
              let response = await searchStock('aapl'); 
              let response2 = await getEpsDataMetrices('aapl');   
              let response3 = await getPeRatioMetrices('aapl');   
              setChartData([response2.data as CompanyFinancialMetrics]);
if (
  typeof response2.data === "object" && "eps" in response2.data &&
  typeof response3.data === "object" && "pe_ratio" in response3.data
) {
  setEpsData([{ eps: response2.data.eps as EPSData[], symbol: 'aapl' }]);
  setPeData([{ pe_ratio: response3.data.pe_ratio as PEData[], symbol: 'aapl' }]);
} else {
  console.error("Invalid EPS or PE data", { epsData: response2.data, peData: response3.data });
}
              setStocks([response.data[0]])
              setLoading(false) 
              
            }
            fetchChartData()
    
          },[])
  return (
    <div className='flex flex-col items-center w-full pt-12'>
        {/* <CompanySectionSearchbar setStocks={setStocks} handleNewData={handleNewData}/>

        <div className='grid grid-cols-9 w-full gap-2 my-8 px-12'>{
stocks.map((stock,index)=>(
    <button
    key={index}
    onClick={async()=>{



       setStocks((prev) => prev.filter((s) => s.symbol !== stock.symbol));

    }}
    className='cursor-pointer text-white bg-[var(--variant-2)] rounded-md p-2 px-4 text-xs flex flex-row items-center justify-between'><p>{stock.symbol}</p>
    <X className={'w-4'}/></button>
))}
{loading && <button
    
    className='cursor-pointer text-white bg-[var(--variant-2)] rounded-md p-2 px-4 text-xs flex flex-row items-center justify-between'><RoundLoader/>
   </button>}</div> */}
        { 
        <div className="w-full grid grid-cols-2 gap-4  my-12 px-12">
            {loading?
            <div className='w-full flex flex-col items-center justify-center h-[500px] bg-[#0d0d14] rounded-md'><p className='text-white'>Loading EPS Data...</p><RoundLoader/></div>:
            stocks?.length>0 &&<SubChart1  epsData={epsData} handleAddEps={handleAddEps}/>}
            {loading?
            <div className='w-full flex flex-col items-center justify-center h-[500px] bg-[#0d0d14] rounded-md'><p className='text-white'>Loading PE Ratio Data...</p><RoundLoader/></div>:
            stocks?.length>0 &&<SubChart2 peData={peData} handleAddPe={handleAddPe}/>}
            {loading?
            <div className='w-full flex flex-col items-center justify-center h-[500px] bg-[#0d0d14] rounded-md'><p className='text-white'>Loading EPS Data...</p><RoundLoader/></div>:
            stocks?.length>0 &&<SubChart3 />}
            {loading?
            <div className='w-full flex flex-col items-center justify-center h-[500px] bg-[#0d0d14] rounded-md'><p className='text-white'>Loading EPS Data...</p><RoundLoader/></div>:
            stocks?.length>0 &&<SubChart4 />}
            {loading?
            <div className='w-full flex flex-col items-center justify-center h-[500px] bg-[#0d0d14] rounded-md'><p className='text-white'>Loading EPS Data...</p><RoundLoader/></div>:
            stocks?.length>0 &&<SubChart5 />}
             
                   
          </div>}
    </div>
  )
}

export default SubChartParent
