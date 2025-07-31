import { axiosInstanceJson } from "../../axios/axiosInstance";

export const getStockScreenerData = async (query:string) => {
  try {
   
    const response = await axiosInstanceJson.get(`stock-screener?${query}`);
     
    
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


export const get5YearRoc = async (symbol:string) => {
  try {
   
    const response = await axiosInstanceJson.get(`get-past-five-year-roc/${symbol}`);
     
    
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
export const get5YearGrossProfit = async (symbol:string) => {
  try {
   
    const response = await axiosInstanceJson.get(`get-past-five-year-gross-profit/${symbol}`);
     
    
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
export const get5YearRevenue = async (symbol:string) => {
  try {
   
    const response = await axiosInstanceJson.get(`get-past-five-year-revenue/${symbol}`);
      
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
export const get5YearWacc = async (symbol:string) => {
  try {
   
    const response = await axiosInstanceJson.get(`get-past-five-year-wacc/${symbol}`);
      
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
export const get5YearEps = async (symbol:string) => {
  try {
   
    const response = await axiosInstanceJson.get(`get-past-five-year-eps/${symbol}`);
      
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