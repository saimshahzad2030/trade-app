import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { fetchUserDetails } from "../reducer-services/user";
import { User } from "@/types/types";
export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null; // <-- make error optionally hold a message
}
const initialState:AuthState  = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      Cookies.set("user", JSON.stringify(action.payload), { expires: 7 }); // Cookie expires in 7 days
    },
    logout: (state) => {
      Cookies.remove("user");
      Cookies.remove("accessToken");

      state.user = null;
    },
    setUser(state, action) {
     state.user = {
    ...(state.user || {}), // ✅ fallback to empty object
    ...action.payload,
  };
  
  },
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false; 
        state.user = action.payload;
        Cookies.set("user", JSON.stringify(action.payload), { expires: 7 });
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error =
  typeof action.payload === "string"
    ? action.payload
    : "An unknown error occurred";
      });
  },
});

export const {
  login,
  logout,
  setUser,   
} = authSlice.actions;
export default authSlice.reducer;
