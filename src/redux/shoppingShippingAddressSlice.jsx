import { createSlice } from "@reduxjs/toolkit";

export const shoppingBasketSlice = createSlice({
  name: "shoppingBasket",
  initialState: {
    additionalCost: 0.0,
    additionalRequest: "",
    value: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.value = state.value.some((e) => e.hash === action.payload.hash)
        ? state.value
        : [...state.value, action.payload];
    },
    removeItem: (state, action) => {
      state.value = state.value.filter((elem) => {
        if (action.payload === elem.url) return false;
        return true;
      });
    },
    modifyAdditionalCost: (state, action) => {
      if (typeof action.payload === "number")
        state.additionalCost = action.payload;
    },
    modifyAdditionalRequest: (state, action) => {
      if (typeof action.payload === "string")
        state.additionalRequest = action.payload;
    },
  },
});

export const {
  addItem,
  removeItem,
  modifyAdditionalCost,
  modifyAdditionalRequest,
} = shoppingBasketSlice.actions;
export default shoppingBasketSlice.reducer;
