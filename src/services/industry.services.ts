

 
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
export const getIndustryComparison = async (industry:string) => {
  try {
    const response = await axiosInstanceJson.get(`get-past-five-year-industry-growth/${industry}`); 
      
    return {
      status: response.status,
      data: {industry_growth_currency:response.data.industry_growth_currency,
        industry,
        
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

