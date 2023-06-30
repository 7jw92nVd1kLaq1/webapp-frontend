import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  access_token: "",
};

export const userSessionSlice = createSlice({
  name: "userSession",
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.username = action.payload.username;
      state.access_token = action.payload.token;
    },
    unsetSession: (state, action) => {
      return initialState;
    },
  },
});

export const { setSession, unsetSession } = userSessionSlice.actions;
export default userSessionSlice.reducer;
