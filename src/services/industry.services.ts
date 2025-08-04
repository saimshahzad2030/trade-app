

 
import {axiosInstanceJson} from "../../axios/axiosInstance"; 
export const fetchIndustries = async () => {
  try {
    const response = await axiosInstanceJson.get(`available-industries`);
      
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


