import axios from "axios";
import axiosInstance,{axiosInstanceJson} from "../../axios/axiosInstance";
import Cookies from "js-cookie";
import { format, subMonths } from "date-fns";

import { config } from "../../config/config";
export const getSpecificStockChart = async (symbol:string,period:string,indicator:string,fromDate:Date | undefined,toDate:Date | undefined) => {
  try {
    const formattedFromDate = format(fromDate!, "yyyy-MM-dd");
const formattedToDate = format(toDate!, "yyyy-MM-dd");

     console.log("fromDate",fromDate)
          console.log("toDate",toDate)
    const response = await axiosInstanceJson.get(`technical-indicators/${symbol}/${period}/${indicator}/10?start_date=${formattedFromDate}&end_date=${formattedToDate}`);
     
    console.log(response.data)
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
export const getSpecificStockKeyFinancialRatios = async (symbol:string,) => {
  try {
    const response = await axiosInstanceJson.get(`key-financials-ratios/${symbol}`);
     
    console.log(response.data)
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
export const getSpecificStockRadarChart = async (symbol:string) => {
  try {
   
    const response = await axiosInstanceJson.get(`financial-indicators/${symbol}`);
     
    console.log(response.data)
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
export const getSpecificStockSummaryChart = async (range:string,symbol:string) => {
  try {
   
    const response = await axiosInstanceJson.get(`chart-data/${symbol}/${range??'1d'}`);
     
    console.log(response.data)
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
export const getEPSProjectionChart = async (symbol:string) => {
  try {
   
    const response = await axiosInstanceJson.get(`eps-projection/${symbol}`);
     
    console.log(response.data)
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
export const getGrowthProfitabilityChart = async (symbol:string) => {
  try {
   
    const response = await axiosInstanceJson.get(`growth-profitability_and_debt_analysis/${symbol}`);
     
    console.log(response.data)
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
export const getOwnershipStructureChart = async (symbol:string) => {
  try {
   
    const response = await axiosInstanceJson.get(`ownership-structure/${symbol}`);
     
    console.log(response.data)
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
export const getSpecificStockSummaryData = async (symbol:string) => {
  try {
   
    const response = await axiosInstanceJson.get(`meta-data/${symbol}`);
     
    console.log(response.data)
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