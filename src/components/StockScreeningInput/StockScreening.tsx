import React from 'react'
import StockScreeningInput from './StockScreeningInput'
import StockScreeningTable from './StockScreeningTable'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Industries, Stock, StockScreeningResponse } from "@/types/types";
import RoundLoader from '../Loader/RoundLoader';
import { getStockScreenerData } from '@/services/stockScreening.services';
import SkeletonLoader from '../Loader/SkeletonLoader';
import { fetchIndustries } from '@/services/industry.services';
const StockScreening = () => {
    const [querySubmit, setQuerySubmit] = React.useState(false);
    let [data,setData] = React.useState<StockScreeningResponse | null>(null);
    let [loading,setLoading] = React.useState<boolean>(false);
    let [industryLoading,setIndustryLoading] = React.useState<boolean>(false);
    let [industries,setIndustries] = React.useState<Industries>([]);
  const [params, setParams] = React.useState(null);
  React.useEffect(()=>{
          const fetchChartData = async()=>{
            setLoading(true)
            setIndustryLoading(true)

            let response = await getStockScreenerData("");
            let ind = await fetchIndustries();
            setData(response.data)
setIndustries(ind.data)
setIndustryLoading(false)
            setLoading(false)
          }
          fetchChartData()
  
        },[])


  return (
    <div className="flex flex-col items-center w-full pt-20">
       {!industryLoading && <StockScreeningInput
          setParams={setParams}
          setData={setData}
          industries={industries}
          setLoading={setLoading}
          setQuerySubmit={setQuerySubmit}
        />}
        { !loading? 
        <>  <StockScreeningTable data={data}/></>:
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Sector</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Market Cap</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Dividend</TableHead>
            <TableHead>Volume</TableHead>
            <TableHead>Beta</TableHead>
            <TableHead>Exchange</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Gross Profit Margin</TableHead>
            <TableHead>Net Profit Margin</TableHead>
            <TableHead>ROE</TableHead>
            <TableHead>D/e Ratio</TableHead>
            <TableHead>Interest Expense</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(10)].map((stock,index) => (
            <TableRow key={index}>
              {[...Array(16)].map((stock,index) => (
                <TableCell>
               <SkeletonLoader className='w-20 h-4 bg-gray-700'/>
              </TableCell>))
              }
            
            </TableRow>
          ))}
        </TableBody>
      </Table>}
      </div>
  )
}

export default StockScreening
