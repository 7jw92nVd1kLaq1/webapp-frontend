import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedEntry: null,
  number: 1,
  pageRange: [],
  entries: [],
  additionalEntriesDetails: {},
};

export const customerRequestsSlice = createSlice({
  name: "customerRequests",
  initialState,
  reducers: {
    resetState: (state, action) => {
      return initialState;
    },
    setPageRange: (state, action) => {
      if (!Array.isArray(action.payload)) return;
      state.pageRange = action.payload;
    },
    setDetail: (state, action) => {
      state.selectedEntry = action.payload;
    },
    unsetDetail: (state, action) => {
      state.selectedEntry = null;
    },
    addEntries: (state, action) => {
      state.entries = [...state.entries, action.payload];
    },
    deleteEntries: (state, action) => {
      state.entries = state.entries.filter(
        (entry) => entry.url_id != action.payload.url_id
      );
    },
    setEntries: (state, action) => {
      state.entries = action.payload;
    },
    unsetEntries: (state, action) => {
      state.entries = [];
    },
    modifyAdditionalEntriesDetails: (state, action) => {
      if (typeof action.payload != "object") return;
      state.additionalEntriesDetails = {
        ...state.additionalEntriesDetails,
        [action.payload.orderId]: {
          ...state.additionalEntriesDetails[action.payload.orderId],
          ...action.payload.payload,
        },
      };
    },

    resetAdditionalEntriesDetails: (state, action) => {
      state.additionalEntriesDetails = {};
    },
    setPageNumber: (state, action) => {
      if (typeof action.payload != "number") return;
      state.number = action.payload;
    },
  },
});

export const {
  resetState,
  setPageRange,
  setDetail,
  unsetDetail,
  addEntries,
  deleteEntries,
  setEntries,
  unsetEntries,
  modifyAdditionalEntriesDetails,
  resetAdditionalEntriesDetails,
  setPageNumber,
} = customerRequestsSlice.actions;
export default customerRequestsSlice.reducer;
