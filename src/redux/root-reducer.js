 

import { combineReducers } from "@reduxjs/toolkit";
import currentStockReducer from './reducers/currentStockReducer'
import authReducers from "./reducers/authReducer";
export default combineReducers({
  currentStock: currentStockReducer,
  user: authReducers,
});
