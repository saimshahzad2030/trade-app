

 
import {axiosInstanceJson} from "../../axios/axiosInstance"; 
export const fetchAvailableYearlyRanges = async (sticker:string,period:string,statement:string) => {
  try {
    const response = await axiosInstanceJson.get(`financial-statement_ranges/${sticker}/${period}/${statement}`);
      
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
 