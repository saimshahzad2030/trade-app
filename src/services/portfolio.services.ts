 
import { Currency } from "lucide-react";
import axiosInstance,{axiosInstanceJson} from "../../axios/axiosInstance";
 
 
export const CreateNewPortfolio = async (data:{name:string,currency:string}) => {
  try {
    const response =  await axiosInstanceJson.post("portfolios/", {
  name:data.name, 
  Currency: `USD`,
}); 
    return {
      status: response.status,
      data: response.data,
    };
  } catch (err) {
  const error = err as { response:{status: number; data: string} };
    return {
      status: error.response.status,
      data: error.response?.data,
    };
  }
};
export const FetchPortfolios = async () => {
  try {
    const response =  await axiosInstanceJson.get("portfolios/"); 
    return {
      status: response.status,
      data: response.data.results,
    };
  } catch (err) {
  const error = err as { response:{status: number; data: string} };
    return {
      status: error.response.status,
      data: error.response?.data,
    };
  }
};
export const FetchSinglePortfolio = async (id:number) => {
  try {
    const response =  await axiosInstanceJson.get(`portfolios/${id}`); 
    return {
      status: response.status,
      data: response.data.results,
    };
  } catch (err) {
  const error = err as { response:{status: number; data: string} };
    return {
      status: error.response.status,
      data: error.response?.data,
    };
  }
};
export const FetchPortfolioHoldings = async (id:number) => {
  try {
    const response =  await axiosInstanceJson.get(`portfolio-holdings/${id}`); 
    return {
      status: response.status,
      data: response.data.results,
    };
  } catch (err) {
  const error = err as { response:{status: number; data: string} };
    return {
      status: error.response.status,
      data: error.response?.data,
    };
  }
};
export const cretateNewHolding = async (id:number,stock:{name:string,symbol:string}) => {
  try {
    const response =  await axiosInstanceJson.post(`portfolio-holdings/${id}/`,{
      asset_name:stock.name,
      asset_symbol:stock.symbol,
      asset_type:'equity',
    }); 
    return {
      status: response.status,
      data: response.data,
    };
  } catch (err) {
  const error = err as { response:{status: number; data: string} };
    return {
      status: error.response.status,
      data: error.response?.data,
    };
  }
};
