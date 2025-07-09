"use client"
import { config } from "../../../config/config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
export const fetchUserDetails = createAsyncThunk(
  "auth/fetchUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      console.log(token,"token");
      if (!token) {
        return rejectWithValue("No token found");
      }

      let response = await axios.get(`${config.BASE_URL}auth/me/`, {
        headers: {
           'Content-Type': 'application/json', 
     'ngrok-skip-browser-warning': 'true',
          Authorization: `Bearer ${token}`,
        },
      });
       let instructorResponse;
       console.log('object')
    if(response.data.is_teacher == true){
         instructorResponse = await axios.get(`${config.BASE_URL}instructors/me/`, {
        headers: {
           'Content-Type': 'application/json', 
     'ngrok-skip-browser-warning': 'true',
          Authorization: `Bearer ${token}`,
        },
      });
    }
     response.data.teacher_profile = instructorResponse?.data || {};
     console.log(response.data) 
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user details"
      );
    }
  }
);
