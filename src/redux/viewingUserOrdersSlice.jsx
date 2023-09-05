import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  sortByRole: "",
  sortByAttr: "",
  searchText: "",
  currentPageNumber: 1,
  currentItemURLId: "",
};

export const userSessionSlice = createSlice({
  name: "viewingUserOrders",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items = [...state.items, ...action.payload];
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((elem) => {
        if (elem.url_id != action.payload) return true;
        return false;
      });
    },
    deleteAllItem: (state, action) => {
      state.items = [];
    },
    reset: (state, action) => {
      return initialState;
    },
  },
});

export const { setSession, unsetSession } = userSessionSlice.actions;
export default userSessionSlice.reducer;
