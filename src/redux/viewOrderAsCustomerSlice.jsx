import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: null,
  orderUpdateAPI: null,
  chatOpen: false,
  chatRecipient: null,
};

export const viewOrderAsCustomerSlice = createSlice({
  name: "viewOrderAsCustomer",
  initialState,
  reducers: {
    resetState: (state, action) => {
      return initialState;
    },
    setChatOpen: (state, action) => {
      state.chatOpen = true;
    },
    setChatClose: (state, action) => {
      state.chatOpen = false;
    },
    setChatRecipient: (state, action) => {
      if (action.payload != null && typeof action.payload != "string") return;
      state.chatRecipient = action.payload;
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
  setChatOpen,
  setChatClose,
  setChatRecipient,
  setOrder,
  resetOrder,
  setOrderUpdateAPI,
  resetOrderUpdateAPI,
} = viewOrderAsCustomerSlice.actions;
export default viewOrderAsCustomerSlice.reducer;
