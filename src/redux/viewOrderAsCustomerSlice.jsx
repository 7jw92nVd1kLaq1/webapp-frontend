import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: null,
  orderUpdateAPI: null,
};

export const viewOrderAsCustomerSlice = createSlice({
  name: "viewOrderAsCustomer",
  initialState,
  reducers: {
    resetState: (state, action) => {
      return initialState;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    resetOrder: (state, action) => {
      state.order = null;
    },
    setOrderUpdateAPI: (state, action) => {
      state.orderUpdateAPI = action.payload;
    },
    resetOrderUpdateAPI: (state, action) => {
      state.orderUpdateAPI = null;
    },
  },
});

export const {
  resetState,
  setOrder,
  resetOrder,
  setOrderUpdateAPI,
  resetOrderUpdateAPI,
} = viewOrderAsCustomerSlice.actions;
export default viewOrderAsCustomerSlice.reducer;
