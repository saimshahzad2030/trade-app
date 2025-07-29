import { axiosInstanceJson } from "../../axios/axiosInstance";

 

 

 
export const getSectorHeatMapData = async () => {
  try {
   
    const response = await axiosInstanceJson.get(`/sector-heatmap-data`); 
     
 
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