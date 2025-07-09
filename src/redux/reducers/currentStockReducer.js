"use client";
import { createSlice } from "@reduxjs/toolkit";

const currentStock = createSlice({
  name: "currentStock",
  initialState: {},
  reducers: {
    addCurrentStock(state, action) {
      
    },
 
  },
});
export const {addCurrentStock } = currentStock.actions;
export default currentStock.reducer;
