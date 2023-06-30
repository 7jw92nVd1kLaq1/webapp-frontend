import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 0,
};

export const orderCreationStepsSlice = createSlice({
  name: "orderCreationSteps",
  initialState,
  reducers: {
    setTotal: (state, action) => {
      if (typeof action.payload != "number") return;
      return { ...initialState, total: action.payload };
    },
    reset: (state, action) => {
      return initialState;
    },
    resetStep: (state, action) => {
      if (action.payload === 0) state.step = 0;
    },
    increment: (state, action) => {
      if (!state.hasOwnProperty("total")) return;
      if (state.total - 1 > state.step) state.step += 1;
    },
    decrement: (state, action) => {
      if (state.step > 0) state.step -= 1;
    },
  },
});

export const { setTotal, reset, resetStep, increment, decrement } =
  orderCreationStepsSlice.actions;
export default orderCreationStepsSlice.reducer;
