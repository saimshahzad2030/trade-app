import { axiosInstanceJson } from "../../axios/axiosInstance";

export const getStockScreenerData = async (query:string) => {
  try {
   
    const response = await axiosInstanceJson.get(`stock-screener?${query}`);
     
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