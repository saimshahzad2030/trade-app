 
import {axiosInstanceJson} from "../../axios/axiosInstance"; 
export const searchStock = async (query:string) => {
  try {
    const response = await axiosInstanceJson.get(`company-search/${query}`);
     
    
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