import axios from "axios";
import axiosInstance,{axiosInstanceJson} from "../../axios/axiosInstance";
import Cookies from "js-cookie";
import { config } from "../../config/config";
export const getStockFinancialMetrices = async (symbol:string) => {
  try {
    const response1 = await axiosInstanceJson.get(`company-eps-quarterly/${symbol}`);
    const response2 = await axiosInstanceJson.get(`company-pe-ratio-quarterly/${symbol}`);
    const response3 = await axiosInstanceJson.get(`company-revenue-growth-quarterly/${symbol}`);
    const response4 = await axiosInstanceJson.get(`company-wacc/${symbol}`);
    const response5 = await axiosInstanceJson.get(`company-historical-beta-quarterly/${symbol}`);
      
    return {
      status: response1.status,
      data: {eps:response1.data.eps.result,
        symbol,
        pe:response2.data.pe_ratio.result,
        revenueGrowth:response3.data.revenue_growth.result,
        wacc:response4.data.wacc.result,
        historicalBeta:[],
      },
    };
  } catch (err) {
  const error = err as { response:{status: number; data: string} };
    return {
      status: error.response.status,
      data: error.response?.data,
    };
  }
};
export const getEpsDataMetrices = async (symbol:string) => {
  try {
    const response1 = await axiosInstanceJson.get(`company-eps-quarterly/${symbol}`); 
      
    return {
      status: response1.status,
      data: {eps:response1.data.eps.result,
        symbol,
        
      },
    };
  } catch (err) {
  const error = err as { response:{status: number; data: string} };
    return {
      status: error.response.status,
      data: error.response?.data,
    };
  }
};
export const getPeRatioMetrices = async (symbol:string) => {
  try {
       const response = await axiosInstanceJson.get(`company-pe-ratio-quarterly/${symbol}`);

      
    return {
      status: response.status,
      data: {pe_ratio:response.data.pe_ratio.result,
        symbol,
        
      },
    };
  } catch (err) {
  const error = err as { response:{status: number; data: string} };
    return {
      status: error.response.status,
      data: error.response?.data,
    };
  }
};
export const getRevenueGrowthMetrices = async (symbol:string) => {
  try {
    const response = await axiosInstanceJson.get(`company-revenue-growth-quarterly/${symbol}`); 
      
    return {
      status: response.status,
      data: {growth:response.data.revenue_growth.result,
        symbol,
        
      },
    };
  } catch (err) {
  const error = err as { response:{status: number; data: string} };
    return {
      status: error.response.status,
      data: error.response?.data,
    };
  }
};
export const getHistoricalBetaMetrices = async (symbol:string) => {
  try {
    const response = await axiosInstanceJson.get(`company-historical-beta-monthly/${symbol}`); 
      
    return {
      status: response.status,
      data: {beta:response.data.avg_beta_monthly.result,
        symbol,
        
      },
    };
  } catch (err) {
  const error = err as { response:{status: number; data: string} };
    return {
      status: error.response.status,
      data: error.response?.data,
    };
  }
};
export const getWaccMetrices = async (symbol:string) => {
  try {
    const response = await axiosInstanceJson.get(`company-wacc/${symbol}`); 
      
    return {
      status: response.status,
      data: {wacc:response.data.wacc.result,
        symbol,
        
      },
    };
  } catch (err) {
  const error = err as { response:{status: number; data: string} };
    return {
      status: error.response.status,
      data: error.response?.data,
    };
  }
};