 
import axiosInstance,{axiosInstanceJson} from "../../axios/axiosInstance";
 
export const getcomparisonData = async (symbol:string) => {
  try {
    const response = await axiosInstanceJson.get(`comparison-data/${symbol}`);
     
    
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