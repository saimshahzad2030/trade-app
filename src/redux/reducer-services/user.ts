import { config } from "../../../config/config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
export const fetchUserDetails = createAsyncThunk(
  "auth/fetchUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("accessToken"); 
      if (!token) {
        return rejectWithValue("No token found");
      }

      let response = await axios.get(`${config.BASE_URL}user-info`, {
        headers: {
           'Content-Type': 'application/json',  
          Authorization: `Bearer ${token}`,
        },
      });
     
       
     
      return response.data;
    } catch (error: unknown) {
  console.log(error);

  let errorMessage = "Failed to fetch user details";

  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    (error as AxiosError).response?.data &&
    typeof (error as AxiosError).response?.data === "object"
  ) {
    const errData = (error as AxiosError).response?.data as { message?: string };
    if (errData?.message) {
      errorMessage = errData.message;
    }
  }

  return rejectWithValue(errorMessage);
}
});
