import axios from "axios";
import axiosInstance,{axiosInstanceJson} from "../../axios/axiosInstance";
import Cookies from "js-cookie";
import { config } from "../../config/config";
export const searchStock = async (query:string) => {
  try {
    const response = await axiosInstanceJson.get(`company-search/${query}`);
     
    console.log(response.data)
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