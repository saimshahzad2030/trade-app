import React from 'react'
import StockScreeningInput from './StockScreeningInput'
import StockScreeningTable from './StockScreeningTable'

import { Stock, StockScreeningResponse } from "@/types/types";
import RoundLoader from '../Loader/RoundLoader';
import { getStockScreenerData } from '@/services/stockScreening.services';
const StockScreening = () => {
    const [querySubmit, setQuerySubmit] = React.useState(false);
    let [data,setData] = React.useState<StockScreeningResponse | null>(null);
    let [loading,setLoading] = React.useState<boolean>(false);
  const [params, setParams] = React.useState(null);
   React.useEffect(()=>{
          const fetchChartData = async()=>{
            setLoading(true)
            let response = await getStockScreenerData("");
            setLoading(false)
            setData(response.data)
            
          }
          fetchChartData()
  
        },[])
  return (
    <div className="flex flex-col items-center w-full pt-20">
        <StockScreeningInput
          setParams={setParams}
          setData={setData}
          setLoading={setLoading}
          setQuerySubmit={setQuerySubmit}
        />
        { !loading?  <StockScreeningTable data={data}/>:
        <RoundLoader/>}
      </div>
  )
}

export default StockScreening
