import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  unreadCount: 0,
  totalCount: 0,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    incrementUnreadCount: (state) => {
      state.unreadCount += 1;
    },
    decrementUnreadCount: (state) => {
      state.unreadCount -= 1;
    },
    setUnreadCount: (state, action) => {
      state.unreadCount = action.payload;
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
  },
});

export const {
  setNotifications,
  incrementUnreadCount,
  decrementUnreadCount,
  setUnreadCount,
  setTotalCount,
} = notificationSlice.actions;
export default notificationSlice.reducer;
