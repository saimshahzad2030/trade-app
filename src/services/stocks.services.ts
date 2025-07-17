import { axiosInstanceJson } from "../../axios/axiosInstance";

export const getStocksGainLoss = async () => {
  try {
   
    const gainerResponse = await axiosInstanceJson.get(`top-gainers`);
    const loserResponse = await axiosInstanceJson.get(`top-losers`);
    const tradingResponse = await axiosInstanceJson.get(`top-traded-stocks`);
     
 
    return {
      status: gainerResponse.status,
      data: {gainerResponse:gainerResponse.data,loserResponse:loserResponse.data,tradingResponse:tradingResponse.data},
    };
  } catch (err) {
  const error = err as { response:{status: number; data: string} };
    return {
      status: error.response.status,
      data: error.response?.data,
    };
  }
};


export const getDailyMarketSectorPerformance = async () => {
  try {
   
    const response = await axiosInstanceJson.get(`daily-market-sector-performance`); 
     
 
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

export const getDailyIndustryPerformance = async () => {
  try {
   
    const response = await axiosInstanceJson.get(`daily-industry-performance`); 
     
 
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