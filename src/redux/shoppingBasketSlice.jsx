import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  additionalCost: 0.0,
  additionalRequest: "",
  depositMethod: "",
  value: [],
  shippingAddress: {
    recipient_name: "",
    street_address1: "",
    street_address2: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  },
};

export const shoppingBasketSlice = createSlice({
  name: "shoppingBasket",
  initialState,
  reducers: {
    resetState: (state, action) => {
      return initialState;
    },
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
    modifyItemAmount: (state, action) => {
      if (typeof action.payload.amount != "number") return;
      for (let i = 0; i < state.value.length; i++) {
        if (state.value[i].url === action.payload.url) {
          const newAmount = state.value[i].amount + action.payload.amount;
          if (newAmount < 1) return;
          state.value[i].amount = newAmount;
          break;
        }
      }
    },
    modifyAdditionalCost: (state, action) => {
      if (typeof action.payload === "number")
        state.additionalCost = action.payload;
    },
    modifyAdditionalRequest: (state, action) => {
      if (typeof action.payload === "string")
        state.additionalRequest = action.payload;
    },
    modifyShippingAddress: (state, action) => {
      if (Object.keys(action.payload).length < 1) return;

      const key = Object.keys(action.payload)[0];
      if (!(key in state.shippingAddress)) return;
      state.shippingAddress[key] = action.payload[key];
    },
    modifyShippingAddressCountry: (state, action) => {
      state.shippingAddress.country = action.payload;
    },
  },
});

export const {
  addItem,
  removeItem,
  modifyAdditionalCost,
  modifyAdditionalRequest,
  modifyItemAmount,
  modifyShippingAddress,
  modifyShippingAddressCountry,
  resetState,
} = shoppingBasketSlice.actions;
export default shoppingBasketSlice.reducer;
