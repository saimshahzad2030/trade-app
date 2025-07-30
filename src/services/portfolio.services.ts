 
import { Currency } from "lucide-react";
import axiosInstance,{axiosInstanceJson} from "../../axios/axiosInstance";
import { TransactionType } from "@/types/types";
 
 
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
export const deletePortfolio = async (id:number) => {
  try {
    const response =  await axiosInstanceJson.delete(`portfolios/${id}/`); 
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
export const deletePortfolioHolding = async (portfolioId:number,id:number) => {
  try {
    const response =  await axiosInstanceJson.delete(`portfolio-holdings/${portfolioId}/${id}/`); 
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

export const FetchLots =  async (holdingId:number) => {
  try {
    const response =  await axiosInstanceJson.get(`holding-shares/${holdingId}`); 
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
export const deleteLot = async (holdingId:number,id:number) => {
  try {
    const response =  await axiosInstanceJson.delete(`holding-shares/${holdingId}/${id}/`); 
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
export const createNewLot =  async (holdingId:number,share:{ 
  shares:number,
  cost_per_share :number,
    low_limit :number,
    flag :"edit" | "new_transaction",
    high_limit:number,
    note:string, 
    date:Date | null | undefined }) => {
  try {
    const response =  await axiosInstanceJson.post(`holding-shares/${holdingId}/`,share); 
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



export const FetchTransactions =  async (holdingId:number) => {
  try {
    const response =  await axiosInstanceJson.get(`holding-transactions/${holdingId}`); 
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
export const deleteTransaction = async (holdingId:number,id:number) => {
  try {
    const response =  await axiosInstanceJson.delete(`holding-transactions/${holdingId}/${id}/`); 
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
export const createNewTransaction =  async (holdingId:number,share:{ 
  shares:number,
  transaction_type  :TransactionType,
    cost_per_share :number,
    commission :number, 
    note:string, 
    date:Date | null | undefined }) => {
  try {
    const response =  await axiosInstanceJson.post(`holding-transactions/${holdingId}/`,share); 
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
export const updateTransaction =  async (holdingId:number,transactionId:number,share:{ 
  shares:number,
  transaction_type  :TransactionType,
    cost_per_share :number,
    commission :number, 
    note:string, 
    date:Date | null | undefined }) => {
  try {
    const response =  await axiosInstanceJson.put(`holding-transactions/${holdingId}/${transactionId}/`,share); 
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